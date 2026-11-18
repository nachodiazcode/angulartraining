import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import {
  AUDIOBOOK_CHAPTERS,
  AUDIOBOOK_VOICES,
  AudiobookChapter,
  AudiobookCue,
  NarratorVoiceId,
} from '../../pages/tutorial/tutorial-audiobook.data';
import { StepId } from '../../pages/tutorial/tutorial-steps';

const VOICE_STORAGE_KEY = 'pokedex_2026_audiobook_voice';
const RATE_STORAGE_KEY = 'pokedex_2026_audiobook_rate';

@Component({
  selector: 'app-audiobook-player',
  templateUrl: './audiobook-player.html',
})
export class AudiobookPlayer {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly voices = AUDIOBOOK_VOICES;
  protected readonly chapters = AUDIOBOOK_CHAPTERS;
  protected readonly speeds = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;

  // Sincronización bidireccional con TutorialPage
  readonly stepId = model.required<StepId>();
  readonly voiceId = model<NarratorVoiceId>(this.loadInitialVoice());
  readonly playing = model<boolean>(false);

  // Avisa al padre cuando finaliza un capítulo completo
  readonly chapterCompleted = output<StepId>();

  protected readonly playbackRate = signal<number>(this.loadInitialRate());
  protected readonly autoAdvance = signal<boolean>(true);
  protected readonly showTranscript = signal<boolean>(false);
  protected readonly currentTime = signal<number>(0);
  protected readonly liveDuration = signal<number>(0);

  protected readonly activeVoiceMeta = computed(
    () => this.voices.find((v) => v.id === this.voiceId()) ?? this.voices[0]
  );

  protected readonly currentChapter = computed<AudiobookChapter>(
    () => this.chapters.find((c) => c.stepId === this.stepId()) ?? this.chapters[0]
  );

  protected readonly currentTrack = computed(
    () => this.currentChapter().tracks[this.voiceId()]
  );

  protected readonly effectiveDuration = computed(() =>
    this.liveDuration() > 0 ? this.liveDuration() : this.currentTrack().durationSec
  );

  protected readonly remainingTime = computed(() =>
    Math.max(0, this.effectiveDuration() - this.currentTime())
  );

  protected readonly activeCueIndex = computed(() => {
    const cues = this.currentTrack().cues;
    const t = this.currentTime();
    for (let i = cues.length - 1; i >= 0; i--) {
      if (t >= cues[i].start - 0.05) {
        return i;
      }
    }
    return 0;
  });

  protected readonly activeCue = computed<AudiobookCue | null>(() => {
    const cues = this.currentTrack().cues;
    return cues[this.activeCueIndex()] ?? cues[0] ?? null;
  });

  readonly currentTimeSec = computed(() => this.currentTime());
  readonly currentDurationSec = computed(() => this.effectiveDuration());
  readonly currentCueText = computed(() => this.activeCue()?.text ?? '');

  protected readonly chapterDownloadName = computed(() => {
    const padded = String(this.stepId()).padStart(2, '0');
    return `angular22-pokemon-capitulo-${padded}-${this.voiceId()}.mp3`;
  });

  protected readonly fullAudiobookDownloadName = computed(
    () => `audiolibro-completo-angular22-pokemon-${this.voiceId()}.mp3`
  );

  private audio: HTMLAudioElement | null = null;
  private lastLoadedStepId: StepId | null = null;
  private lastLoadedVoiceId: NarratorVoiceId | null = null;
  private pendingAutoPlay = false;
  private isSwitchingTrack = false;
  private pendingMetadataHandler: (() => void) | null = null;

  constructor() {
    this.initAudioElement();

    // Reacciona cuando cambia el módulo activo o la voz IA seleccionada
    effect(() => {
      const step = this.stepId();
      const voice = this.voiceId();
      this.syncTrack(step, voice);
    });

    this.destroyRef.onDestroy(() => {
      this.teardownAudio();
    });
  }

  togglePlay(): void {
    const audio = this.audio;
    if (!audio) {
      return;
    }

    if (this.playing()) {
      this.isSwitchingTrack = false;
      audio.pause();
      this.playing.set(false);
      return;
    }

    audio.playbackRate = this.playbackRate();
    void audio
      .play()
      .then(() => {
        this.playing.set(true);
      })
      .catch(() => {
        this.playing.set(false);
      });
  }

  pausePlayback(): void {
    const audio = this.audio;
    if (!audio || !this.playing()) {
      return;
    }
    this.isSwitchingTrack = false;
    audio.pause();
    this.playing.set(false);
  }

  protected selectVoice(voice: NarratorVoiceId): void {
    if (this.voiceId() === voice) {
      return;
    }
    this.voiceId.set(voice);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(VOICE_STORAGE_KEY, voice);
    }
  }

  protected setSpeed(rate: number): void {
    this.playbackRate.set(rate);
    if (this.audio) {
      this.audio.playbackRate = rate;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(RATE_STORAGE_KEY, String(rate));
    }
  }

  protected toggleAutoAdvance(): void {
    this.autoAdvance.update((v) => !v);
  }

  protected seekTo(rawSeconds: string | number): void {
    const parsed = typeof rawSeconds === 'number' ? rawSeconds : Number.parseFloat(rawSeconds);
    if (!Number.isFinite(parsed)) {
      return;
    }
    const clamped = Math.max(0, Math.min(parsed, this.effectiveDuration()));
    this.currentTime.set(clamped);
    if (this.audio) {
      this.audio.currentTime = clamped;
    }
  }

  protected skipSeconds(delta: number): void {
    this.seekTo(this.currentTime() + delta);
  }

  protected jumpToCue(cue: AudiobookCue): void {
    this.seekTo(cue.start);
    if (!this.playing()) {
      this.togglePlay();
    }
  }

  protected prevChapter(): void {
    const cur = this.stepId();
    if (cur > 1) {
      this.stepId.set((cur - 1) as StepId);
    }
  }

  protected nextChapter(): void {
    const cur = this.stepId();
    if (cur < 12) {
      this.stepId.set((cur + 1) as StepId);
    }
  }

  protected formatTime(seconds: number): string {
    const safe = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  protected formatMinutes(seconds: number): string {
    const mins = Math.round(seconds / 60);
    return `${mins} min`;
  }

  private initAudioElement(): void {
    if (typeof Audio === 'undefined') {
      return;
    }
    const audio = new Audio();
    audio.preload = 'metadata';

    audio.addEventListener('timeupdate', () => {
      if (!this.isSwitchingTrack) {
        this.currentTime.set(audio.currentTime);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        this.liveDuration.set(audio.duration);
      }
    });

    audio.addEventListener('play', () => {
      this.playing.set(true);
    });

    audio.addEventListener('pause', () => {
      if (!this.isSwitchingTrack && !audio.ended) {
        this.playing.set(false);
      }
    });

    audio.addEventListener('ended', () => {
      const completedId = this.stepId();
      this.chapterCompleted.emit(completedId);

      if (this.autoAdvance() && completedId < 12) {
        this.pendingAutoPlay = true;
        this.stepId.set((completedId + 1) as StepId);
      } else {
        this.playing.set(false);
        this.currentTime.set(0);
      }
    });

    this.audio = audio;
  }

  private syncTrack(step: StepId, voice: NarratorVoiceId): void {
    const chapter = this.chapters.find((c) => c.stepId === step) ?? this.chapters[0];
    const nextTrack = chapter.tracks[voice];

    // Primera carga inicial
    if (this.lastLoadedStepId === null || this.lastLoadedVoiceId === null) {
      this.lastLoadedStepId = step;
      this.lastLoadedVoiceId = voice;
      this.liveDuration.set(nextTrack.durationSec);
      this.currentTime.set(0);
      if (this.audio) {
        this.audio.src = nextTrack.audioUrl;
        this.audio.playbackRate = untracked(() => this.playbackRate());
      }
      return;
    }

    if (step === this.lastLoadedStepId && voice === this.lastLoadedVoiceId) {
      return;
    }

    const wasVoiceOnlySwitch = step === this.lastLoadedStepId && voice !== this.lastLoadedVoiceId;
    const prevVoice = this.lastLoadedVoiceId;
    const prevTime = untracked(() => this.currentTime());
    const shouldPlay = this.pendingAutoPlay || untracked(() => this.playing());
    this.pendingAutoPlay = false;

    let targetTime = 0;
    if (wasVoiceOnlySwitch && prevTime > 0.25) {
      targetTime = this.mapTimestampAcrossVoices(chapter, prevVoice, voice, prevTime);
    }

    this.lastLoadedStepId = step;
    this.lastLoadedVoiceId = voice;
    this.liveDuration.set(nextTrack.durationSec);
    this.currentTime.set(targetTime);

    const audio = this.audio;
    if (!audio) {
      return;
    }

    if (this.pendingMetadataHandler) {
      audio.removeEventListener('loadedmetadata', this.pendingMetadataHandler);
      this.pendingMetadataHandler = null;
    }

    this.isSwitchingTrack = shouldPlay;
    if (shouldPlay) {
      this.playing.set(true);
    }

    audio.src = nextTrack.audioUrl;
    const rate = untracked(() => this.playbackRate());

    const applySeekAndPlay = () => {
      this.pendingMetadataHandler = null;
      audio.playbackRate = rate;
      if (targetTime > 0) {
        const maxDur =
          Number.isFinite(audio.duration) && audio.duration > 0
            ? audio.duration
            : nextTrack.durationSec;
        audio.currentTime = Math.min(targetTime, Math.max(0, maxDur - 0.1));
      }
      if (shouldPlay) {
        void audio
          .play()
          .then(() => {
            this.isSwitchingTrack = false;
            this.playing.set(true);
          })
          .catch(() => {
            this.isSwitchingTrack = false;
            this.playing.set(false);
          });
      } else {
        this.isSwitchingTrack = false;
      }
    };

    if (audio.readyState >= 1) {
      applySeekAndPlay();
    } else {
      this.pendingMetadataHandler = applySeekAndPlay;
      audio.addEventListener('loadedmetadata', applySeekAndPlay, { once: true });
    }
  }

  private mapTimestampAcrossVoices(
    chapter: AudiobookChapter,
    fromVoice: NarratorVoiceId,
    toVoice: NarratorVoiceId,
    timeSec: number
  ): number {
    const fromTrack = chapter.tracks[fromVoice];
    const toTrack = chapter.tracks[toVoice];

    let cueIdx = 0;
    for (let i = fromTrack.cues.length - 1; i >= 0; i--) {
      if (timeSec >= fromTrack.cues[i].start - 0.05) {
        cueIdx = i;
        break;
      }
    }

    const fromCue = fromTrack.cues[cueIdx];
    const toCue = toTrack.cues[cueIdx];
    if (fromCue && toCue) {
      const span = Math.max(0.1, fromCue.end - fromCue.start);
      const frac = Math.max(0, Math.min(1, (timeSec - fromCue.start) / span));
      return Number((toCue.start + frac * Math.max(0.1, toCue.end - toCue.start)).toFixed(2));
    }

    return Number(((timeSec / fromTrack.durationSec) * toTrack.durationSec).toFixed(2));
  }

  private teardownAudio(): void {
    if (!this.audio) {
      return;
    }
    this.isSwitchingTrack = false;
    if (this.pendingMetadataHandler) {
      this.audio.removeEventListener('loadedmetadata', this.pendingMetadataHandler);
      this.pendingMetadataHandler = null;
    }
    if (!this.audio.paused) {
      this.audio.pause();
    }
    this.audio.removeAttribute('src');
    this.audio = null;
  }

  private loadInitialVoice(): NarratorVoiceId {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(VOICE_STORAGE_KEY);
      if (saved === 'gonzalo' || saved === 'dalia') {
        return saved;
      }
    }
    return 'gonzalo';
  }

  private loadInitialRate(): number {
    if (typeof localStorage !== 'undefined') {
      const saved = Number(localStorage.getItem(RATE_STORAGE_KEY));
      if ([0.75, 1, 1.25, 1.5, 1.75, 2].includes(saved)) {
        return saved;
      }
    }
    return 1;
  }
}
