import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  interval,
  map,
  combineLatest,
  share,
} from 'rxjs';

@Injectable()
export class TimerService {
  #totalSeconds = new BehaviorSubject<number>(0);
  #stopTimer = new BehaviorSubject<boolean>(true);

  private ellapsedSeconds: number = 0;

  set totalSeconds(count: number) {
    this.#totalSeconds.next(count);
  }

  readonly secondsLeft$: Observable<number> = combineLatest([
    interval(1000),
    this.#totalSeconds,
    this.#stopTimer,
  ]).pipe(
    map(([_, totalSeconds, stopTimer]) => {
      if (!stopTimer) {
        this.ellapsedSeconds += 1;
      }
      const remainingSeconds = Math.max(totalSeconds - this.ellapsedSeconds, 0);
      return remainingSeconds * 1000;
    }),
    share()
  );

  stopTimer(): void {
    this.#stopTimer.next(true);
  }

  resetTimer(seconds = 60): void {
    this.#totalSeconds.next(seconds);
    this.ellapsedSeconds = 0;
    this.#stopTimer.next(false);
  }
}
