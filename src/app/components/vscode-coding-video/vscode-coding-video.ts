import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NarratorVoiceId } from '../../pages/tutorial/tutorial-audiobook.data';
import { StepId } from '../../pages/tutorial/tutorial-steps';
import {
  VSCODE_SCENES,
  VscodeKeyframe,
  VscodeScene,
} from '../../pages/tutorial/tutorial-vscode-scenes';
import { CodeToken, tokenizeCodeLine } from './code-tokenizer';

export interface RenderedCodeLine {
  lineNumber: number;
  isFocus: boolean;
  hasCursor: boolean;
  tokens: CodeToken[];
}

const STANDALONE_DEMO_DURATION_SEC = 18;

@Component({
  selector: 'app-vscode-coding-video',
  templateUrl: './vscode-coding-video.html',
})
export class VscodeCodingVideo {
  private readonly destroyRef = inject(DestroyRef);

  readonly stepId = input.required<StepId>();
  readonly voiceId = input<NarratorVoiceId>('gonzalo');
  readonly audioPlaying = input<boolean>(false);
  readonly audioTimeSec = input<number>(0);
  readonly audioDurationSec = input<number>(50);
  readonly activeSubtitle = input<string>('');

  readonly requestToggleAudiobook = output<void>();
  readonly pauseAudiobook = output<void>();

  protected readonly viewMode = signal<'live' | 'mp4'>('live');
  protected readonly localPlaying = signal<boolean>(false);
  protected readonly localProgress = signal<number>(0);
  protected readonly demoSpeed = signal<1 | 1.5 | 2>(1);
  protected readonly showExplorer = signal<boolean>(true);
  protected readonly manualTabOverride = signal<'ts' | 'html' | null>(null);
  private readonly preferLocalClock = signal<boolean>(false);

  private rafId: number | null = null;
  private lastTickMs = 0;

  protected readonly scene = computed<VscodeScene>(
    () => VSCODE_SCENES.find((s) => s.stepId === this.stepId()) ?? VSCODE_SCENES[0]
  );

  protected readonly mp4VideoUrl = computed(() => {
    const padded = String(this.stepId()).padStart(2, '0');
    return `videos/${this.voiceId()}/modulo-${padded}.mp4`;
  });

  protected readonly mp4DownloadName = computed(() => {
    const padded = String(this.stepId()).padStart(2, '0');
    return `angular22-vscode-mod-${padded}-${this.voiceId()}.mp4`;
  });

  protected readonly isAudioSyncActive = computed(
    () =>
      this.audioPlaying() ||
      (!this.preferLocalClock() && !this.localPlaying() && this.audioTimeSec() > 0.15)
  );

  protected readonly effectiveProgress = computed(() => {
    if (this.isAudioSyncActive()) {
      const dur = Math.max(1, this.audioDurationSec());
      return Math.min(1, Math.max(0, this.audioTimeSec() / dur));
    }
    return this.localProgress();
  });

  protected readonly timelineState = computed(() => {
    const sc = this.scene();
    const kfs = sc.keyframes;
    const p = this.effectiveProgress();

    let prevIdx = 0;
    for (let i = 0; i < kfs.length; i++) {
      if (p >= kfs[i].at) {
        prevIdx = i;
      }
    }

    const prevKf: VscodeKeyframe = kfs[prevIdx] ?? kfs[0];
    const nextKf: VscodeKeyframe | undefined = kfs[prevIdx + 1];

    let tsFrac = prevKf.tsProgress;
    let htmlFrac = prevKf.htmlProgress;
    let focusLine = prevKf.focusLine;

    if (nextKf && nextKf.at > prevKf.at) {
      const span = nextKf.at - prevKf.at;
      const local = Math.min(1, Math.max(0, (p - prevKf.at) / span));
      tsFrac = prevKf.tsProgress + (nextKf.tsProgress - prevKf.tsProgress) * local;
      htmlFrac = prevKf.htmlProgress + (nextKf.htmlProgress - prevKf.htmlProgress) * local;
      if (nextKf.activeTab === prevKf.activeTab) {
        focusLine = Math.round(prevKf.focusLine + (nextKf.focusLine - prevKf.focusLine) * local);
      }
    }

    const activeTab = this.manualTabOverride() ?? prevKf.activeTab;

    return {
      activeTab,
      autoTab: prevKf.activeTab,
      tsFrac: Math.min(1, Math.max(0, tsFrac)),
      htmlFrac: Math.min(1, Math.max(0, htmlFrac)),
      focusLine,
      hint: prevKf.hint ?? null,
      terminalLines: prevKf.terminalLines,
      stageIndex: prevIdx,
      stageCount: kfs.length,
    };
  });

  protected readonly activeTabFile = computed(() => {
    const sc = this.scene();
    const active = this.timelineState().activeTab;
    return sc.tabs.find((t) => t.id === active) ?? sc.tabs[0];
  });

  protected readonly renderedCodeLines = computed<RenderedCodeLine[]>(() => {
    const tab = this.activeTabFile();
    const state = this.timelineState();
    const fullCode = tab.code;

    const frac =
      this.manualTabOverride() !== null && this.manualTabOverride() !== state.autoTab
        ? 1
        : tab.id === 'ts'
          ? state.tsFrac
          : state.htmlFrac;

    const totalChars = fullCode.length;
    const revealedChars =
      frac >= 0.995 ? totalChars : Math.max(1, Math.round(totalChars * frac));
    const visibleText = fullCode.slice(0, revealedChars);
    const isTyping = revealedChars < totalChars;

    const rawLines = visibleText.split('\n');
    const lang = tab.id;

    return rawLines.map((lineText, idx) => {
      const lineNumber = idx + 1;
      const isLastVisible = idx === rawLines.length - 1;
      const hasCursor = isTyping ? isLastVisible : lineNumber === state.focusLine;
      const isFocus = hasCursor || lineNumber === state.focusLine;

      return {
        lineNumber,
        isFocus,
        hasCursor,
        tokens: tokenizeCodeLine(lineText, lang),
      };
    });
  });

  protected readonly typingPercentLabel = computed(() =>
    Math.round(this.effectiveProgress() * 100)
  );

  constructor() {
    effect(() => {
      this.stepId();
      untracked(() => {
        this.stopLocalLoop();
        this.localPlaying.set(false);
        this.localProgress.set(0);
        this.manualTabOverride.set(null);
        this.preferLocalClock.set(false);
      });
    });

    effect(() => {
      const t = this.audioTimeSec();
      const playing = this.audioPlaying();
      untracked(() => {
        if (playing) {
          this.stopLocalLoop();
          this.localPlaying.set(false);
          this.manualTabOverride.set(null);
          this.preferLocalClock.set(false);
        } else if (t > 0.15) {
          this.preferLocalClock.set(false);
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      this.stopLocalLoop();
    });
  }

  protected setViewMode(mode: 'live' | 'mp4'): void {
    this.viewMode.set(mode);
    if (mode === 'mp4' && this.localPlaying()) {
      this.stopLocalLoop();
      this.localPlaying.set(false);
    }
  }

  protected toggleDemoPlayback(): void {
    if (this.audioPlaying()) {
      this.requestToggleAudiobook.emit();
      return;
    }

    if (this.localPlaying()) {
      this.stopLocalLoop();
      this.localPlaying.set(false);
      return;
    }

    this.preferLocalClock.set(true);
    if (this.localProgress() >= 0.995) {
      this.localProgress.set(0);
    }
    this.manualTabOverride.set(null);
    this.localPlaying.set(true);
    this.startLocalLoop();
  }

  protected restartDemo(): void {
    this.preferLocalClock.set(true);
    this.manualTabOverride.set(null);
    if (this.audioPlaying()) {
      this.requestToggleAudiobook.emit();
    }
    this.localProgress.set(0);
    this.localPlaying.set(true);
    this.startLocalLoop();
  }

  protected cycleSpeed(): void {
    const current = this.demoSpeed();
    const next: 1 | 1.5 | 2 = current === 1 ? 1.5 : current === 1.5 ? 2 : 1;
    this.demoSpeed.set(next);
  }

  protected scrubToPercent(rawPercent: string | number): void {
    const parsed =
      typeof rawPercent === 'number' ? rawPercent : Number.parseFloat(rawPercent);
    if (!Number.isFinite(parsed)) {
      return;
    }
    const norm = Math.min(1, Math.max(0, parsed / 100));
    this.preferLocalClock.set(true);
    this.stopLocalLoop();
    this.localPlaying.set(false);
    this.manualTabOverride.set(null);
    this.localProgress.set(norm);
  }

  protected jumpToKeyframe(kf: VscodeKeyframe): void {
    this.preferLocalClock.set(true);
    this.stopLocalLoop();
    this.localPlaying.set(false);
    this.manualTabOverride.set(null);
    this.localProgress.set(Math.min(1, Math.max(0, kf.at + 0.005)));
  }

  protected selectTab(tabId: 'ts' | 'html'): void {
    this.manualTabOverride.set(tabId);
  }

  protected toggleExplorer(): void {
    this.showExplorer.update((v) => !v);
  }

  private startLocalLoop(): void {
    if (typeof requestAnimationFrame === 'undefined') {
      return;
    }
    this.stopLocalLoop();
    this.lastTickMs = performance.now();

    const step = (now: number) => {
      if (!this.localPlaying()) {
        return;
      }
      const dtSec = Math.min(0.1, (now - this.lastTickMs) / 1000);
      this.lastTickMs = now;

      const delta = (dtSec * this.demoSpeed()) / STANDALONE_DEMO_DURATION_SEC;
      const next = Math.min(1, this.localProgress() + delta);
      this.localProgress.set(next);

      if (next >= 1) {
        this.localPlaying.set(false);
        this.rafId = null;
        return;
      }

      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  private stopLocalLoop(): void {
    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
