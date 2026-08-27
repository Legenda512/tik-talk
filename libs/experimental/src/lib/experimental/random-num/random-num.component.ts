import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'lib-random-num',
  template: `
    <div class="random-num">
      <div class="random-num__label">Random number:</div>
      <div class="random-num__value">{{ randomNum() }}</div>
    </div>
  `,
  styles: [
    `
      .random-num {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
      }

      .random-num__label {
        font-size: 14px;
        color: #666;
      }

      .random-num__value {
        font-size: 32px;
        font-weight: 700;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomNumComponent {
  public readonly randomNum: WritableSignal<number> = signal<number>(this.generateRandomNum());

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  public constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.randomNum.set(this.generateRandomNum());
      });
  }

  private generateRandomNum(): number {
    return Math.floor(Math.random() * 1000);
  }
}
