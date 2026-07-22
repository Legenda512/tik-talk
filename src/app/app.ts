import {Component, inject, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProfileCard} from './common-ui/profile-card/profile-card';
import {ProfileService} from './data/services/profile';
import {Profile} from './data/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly profileService: ProfileService = inject(ProfileService);

  protected profiles: WritableSignal<Profile[]> = signal([]);

  constructor() {
    this.profileService.getTestAccounts().subscribe(profiles => {
      this.profiles.set(profiles);
    })
  }
}
