import { Component, OnInit, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'lib-infinite-scroll-trigger',
  imports: [],
  templateUrl: './infinite-scroll-trigger.html',
  styleUrl: './infinite-scroll-trigger.scss',
})
export class InfiniteScrollTriggerComponent implements OnInit {
  public loaded: OutputEmitterRef<void> = output<void>();

  ngOnInit(): void {
    this.loaded.emit();
  }
}
