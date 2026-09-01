import { Component, inject } from '@angular/core';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ActivatedRoute, Data, RouterOutlet } from '@angular/router';
import { HasChanges } from '../../../../../shared/src/lib/data';

@Component({
  selector: 'lib-chats',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
// Пример работы canDeactivate - здесь мы явно написать логику возврата, например форма не сохранена
export class ChatsPageComponent implements HasChanges {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  get hasChanges() {
    return false;
  }

  constructor() {
    this.route.data.subscribe((data: Data): void => {
      console.log(data);
    });
  }
}
