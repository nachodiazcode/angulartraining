import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpLogStore } from '../services/http-log-store';

export const pokeApiLoggerInterceptor: HttpInterceptorFn = (req, next) => {
  const logStore = inject(HttpLogStore);
  const started = performance.now();
  const shortUrl = req.url.replace('https://pokeapi.co/api/v2', '');

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          logStore.addLog({
            url: shortUrl,
            status: event.status,
            durationMs: Math.round(performance.now() - started),
            timestamp: new Date().toLocaleTimeString(),
          });
        }
      },
      error: (err: unknown) => {
        const status = err instanceof HttpErrorResponse ? err.status || 'ERR' : 'ERR';
        logStore.addLog({
          url: shortUrl,
          status,
          durationMs: Math.round(performance.now() - started),
          timestamp: new Date().toLocaleTimeString(),
        });
      },
    })
  );
};
