import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="`/assets/svg/${this.icon()}.svg#${this.icon()}`"></svg:use>',
  styles: [''],
})
export class SvgIconComponent {
  public readonly icon: InputSignal<string> = input.required<string>();
}
