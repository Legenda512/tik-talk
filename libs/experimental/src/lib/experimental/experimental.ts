import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, scan, takeUntil, timer } from 'rxjs';
import { DestroyService } from './destroy.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    timer(0, 100)
      .pipe(
        map((val) => {
          return factorialize(val * 10);
        }),
        scan((acc, curr: number) => {
          return acc + curr;
        }, 0),
        takeUntilDestroyed(),
      )
      .subscribe((val) => {
        console.log(123123);
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
