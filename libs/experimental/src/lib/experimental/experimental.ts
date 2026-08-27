import { Component, signal, WritableSignal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RandomNumComponent } from './random-num/random-num.component';

@Component({
  selector: 'lib-experimental',
  imports: [NgComponentOutlet],
  templateUrl: './experimental.html',
  styleUrl: './experimental.css',
})
export class ExperimentalComponent {
  protected readonly lazeComponent: WritableSignal<typeof RandomNumComponent | null> = signal<
    typeof RandomNumComponent | null
  >(null);
  protected loadComponent(): void {
    import('./random-num/random-num.component').then((c): void => {
      this.lazeComponent.set(c.RandomNumComponent);
    });
  }
}
