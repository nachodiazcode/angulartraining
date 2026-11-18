import { TestBed } from '@angular/core/testing';
import {
  AUDIOBOOK_CHAPTERS,
  AUDIOBOOK_VOICES,
} from '../../pages/tutorial/tutorial-audiobook.data';
import { AudiobookPlayer } from './audiobook-player';

describe('AudiobookPlayer', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AudiobookPlayer],
    }).compileComponents();
  });

  it('includes 12 narrated chapters with synchronized cues for both AI voices', () => {
    expect(AUDIOBOOK_VOICES.length).toBe(2);
    expect(AUDIOBOOK_CHAPTERS.length).toBe(12);

    for (const chapter of AUDIOBOOK_CHAPTERS) {
      expect(chapter.tracks.gonzalo.durationSec).toBeGreaterThan(30);
      expect(chapter.tracks.dalia.durationSec).toBeGreaterThan(30);
      expect(chapter.tracks.gonzalo.cues.length).toBeGreaterThan(4);
      expect(chapter.tracks.gonzalo.cues.length).toBe(chapter.tracks.dalia.cues.length);
    }
  });

  it('renders Audible-style controls, switches narrator voice, and opens synchronized transcript', async () => {
    const fixture = TestBed.createComponent(AudiobookPlayer);
    fixture.componentRef.setInput('stepId', 1);
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Modo Audiolibro IA');
    expect(el.textContent).toContain('Capítulo 1 · Anatomía de un Componente e Interpolación');

    // Cambiar a Mentora Dalia
    const buttons = Array.from(el.querySelectorAll('button'));
    const daliaBtn = buttons.find((b) => b.textContent?.includes('Mentora Dalia'));
    expect(daliaBtn).toBeTruthy();
    daliaBtn?.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.voiceId()).toBe('dalia');

    // Abrir guion sincronizado
    const transcriptBtn = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Guion sincronizado')
    );
    transcriptBtn?.click();
    await fixture.whenStable();
    expect(el.textContent).toContain('Transcripción interactiva');
  });
});
