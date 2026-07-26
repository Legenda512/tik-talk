import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { Observable, take } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interface';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, SubscriberCard, RouterLink, AsyncPipe, NgOptimizedImage],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  private readonly _profileService: ProfileService = inject(ProfileService);

  protected readonly subscribers$: Observable<Profile[]> =
    this._profileService.getSubscribersShortList();

  protected readonly myProfile: WritableSignal<Profile | null> = this._profileService.myProfile;

  protected readonly menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit(): void {
    this._profileService.getMe().pipe(take(1)).subscribe();
  }
}
