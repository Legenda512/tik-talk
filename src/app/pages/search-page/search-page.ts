import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage implements OnInit {
  private readonly _profileService: ProfileService = inject(ProfileService);

  protected profiles: WritableSignal<Profile[]> = signal([]);

  ngOnInit(): void {
    this._profileService.getTestAccounts().subscribe((profiles: Profile[]): void => {
      this.profiles.set(profiles);
    });
  }
}
