import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { Observable, take } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MenuItem } from '../../data/interfaces/menu-item.interface';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    NgOptimizedImage,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly _profileService: ProfileService = inject(ProfileService);

  protected readonly subscribers$: Observable<Profile[]> =
    this._profileService.getSubscribersShortList();

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
