import { Injectable, signal } from '@angular/core';

export interface HttpLogEntry {
  id: number;
  url: string;
  status: number | 'ERR';
  durationMs: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpLogStore {
  private nextId = 1;
  private readonly entries = signal<HttpLogEntry[]>([]);

  readonly logs = this.entries.asReadonly();

  addLog(entry: Omit<HttpLogEntry, 'id'>): void {
    const item: HttpLogEntry = { ...entry, id: this.nextId++ };
    this.entries.update((prev) => [item, ...prev].slice(0, 5));
  }

  clear(): void {
    this.entries.set([]);
  }
}
