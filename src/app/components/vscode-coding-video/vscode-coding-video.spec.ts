import { TestBed } from '@angular/core/testing';
import { VSCODE_SCENES } from '../../pages/tutorial/tutorial-vscode-scenes';
import { StepId } from '../../pages/tutorial/tutorial-steps';
import { VscodeCodingVideo } from './vscode-coding-video';

describe('VscodeCodingVideo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VscodeCodingVideo],
    }).compileComponents();
  });

  it('defines complete VS Code scenes with explorer, tabs, and keyframes for all 12 modules', () => {
    expect(VSCODE_SCENES.length).toBe(12);
    for (let id = 1; id <= 12; id++) {
      const scene = VSCODE_SCENES.find((s) => s.stepId === id);
      expect(scene).toBeTruthy();
      expect(scene?.tabs.length).toBe(2);
      expect(scene?.explorer.length).toBeGreaterThanOrEqual(2);
      expect(scene?.keyframes.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('animates VS Code timeline across keyframes, syncs with audio time, and switches to MP4 view', async () => {
    const fixture = TestBed.createComponent(VscodeCodingVideo);
    fixture.componentRef.setInput('stepId', 1 as StepId);
    fixture.componentRef.setInput('voiceId', 'gonzalo');
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('ficha-inicial.ts');
    expect(el.textContent).toContain('feat/mod-01-component');
    expect(el.textContent).toContain('0%');

    // Sincronizar con tiempo de audio al 86% (cambia a pestaña HTML y muestra compilación final)
    fixture.componentRef.setInput('audioDurationSec', 50);
    fixture.componentRef.setInput('audioTimeSec', 43);
    fixture.componentRef.setInput('audioPlaying', true);
    await fixture.whenStable();

    expect(el.textContent).toContain('86%');
    expect(el.textContent).toContain('Compiled successfully');
    expect(el.textContent).toContain('pesoKg * 1000');

    // Cambiar al modo Vídeo MP4 sin cámara
    const mp4Tab = Array.from(el.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Vídeo MP4')
    );
    expect(mp4Tab).toBeTruthy();
    mp4Tab?.click();
    await fixture.whenStable();

    const videoEl = el.querySelector('video') as HTMLVideoElement | null;
    expect(videoEl).toBeTruthy();
    expect(videoEl?.getAttribute('src')).toContain('videos/gonzalo/modulo-01.mp4');
  });
});
