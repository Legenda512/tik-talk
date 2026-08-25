import { Component, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { take } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SvgIconComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { MenuItem } from '../data';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'lib-sidebar',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly _profileService: ProfileService = inject(ProfileService);

  protected readonly subscribers: Signal<Profile[] | undefined> = toSignal<Profile[] | undefined>(
    this._profileService.getSubscribersShortList(),
  );

  protected readonly myProfile: WritableSignal<Profile | null> = this._profileService.myProfile;

  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      route: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      route: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      route: 'search',
    },
  ];

  ngOnInit(): void {
    this._profileService.getMe().pipe(take(1)).subscribe();
  }
}
