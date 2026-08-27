import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: '<span class="error">404</span>',
  styles: [
    `
      :host {
        display: grid;
        place-content: center;
        height: 100dvh;
      }

      .error {
        font-size: 150px;
        font-weight: 800;
      }
    `,
  ],
})
export class ErrorPageComponent {}
