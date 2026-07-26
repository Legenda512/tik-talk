import { Component, inject, WritableSignal } from '@angular/core';
import { ProfileCard } from '../../common-ui/profile-card/profile-card';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileFilters } from './profile-filters/profile-filters';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private readonly _profileService: ProfileService = inject(ProfileService);

  protected profiles: WritableSignal<Profile[]> = this._profileService.filtersProfiles;
}
