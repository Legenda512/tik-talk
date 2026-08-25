import { Component, ElementRef, inject, input, InputSignal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO переделать компонент, не понятно почему неправильно грузилась картинка
@Component({
  selector: 'lib-svg-icon',
  imports: [],
  template: '',
  styles: [':host { display: contents; }'],
})
export class SvgIconComponent implements OnInit {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public readonly icon: InputSignal<string> = input.required<string>();

  ngOnInit(): void {
    this._http.get(`/assets/svg/${this.icon()}.svg`, { responseType: 'text' }).subscribe((raw) => {
      this._elementRef.nativeElement.innerHTML = raw;
    });
  }
}
