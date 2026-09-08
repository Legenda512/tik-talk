import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  map,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  scan,
  takeUntil,
  timer,
} from 'rxjs';
import { DestroyService } from './destroy.service';

function factorialize(num: number): number {
  if (!Number.isInteger(num) || num < 0) {
    throw new TypeError('Нужно передать неотрицательное целое число');
  }

  let result = 1;

  for (let i = 2; i <= num; i++) {
    result *= i;
  }

  return result;
}

function customMap<T, K>(callback: (value: T) => K): OperatorFunction<T, K> {
  return (source) => {
    return new Observable((observer) => {
      return source.subscribe({
        next: (val) => observer.next(callback(val)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  };
}

function squaring(): MonoTypeOperatorFunction<number> {
  return (source) => {
    return new Observable((observer) => {
      return source.subscribe({
        next: (val) => observer.next(val * val),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  };
}

@Component({
  selector: 'lib-experimental',
  imports: [RouterLink],
  templateUrl: './experimental.html',
  styleUrl: './experimental.css',
  host: { ngSkipHydration: 'true' },
  providers: [DestroyService],
})
export class ExperimentalComponent {
  subNumber = 0;

  state: Record<string, number[]> = {};
  destroy$ = inject(DestroyService);

  constructor() {
    timer(0, 1000)
      .pipe(
        customMap((val) => val * val),
        // squaring(),
        takeUntil(this.destroy$),
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  addSub() {
    this.subNumber++;
    this.state[this.subNumber + ''] = [];
    timer(0, 100)
      .pipe(
        map((val) => {
          return factorialize(val * 10);
        }),
        scan((acc, curr: number) => {
          return acc + curr;
        }, 0),
        takeUntil(this.destroy$),
      )
      .subscribe((val) => {
        this.state[this.subNumber + ''].push(val);
        console.log(this.state);
      });
  }
}
