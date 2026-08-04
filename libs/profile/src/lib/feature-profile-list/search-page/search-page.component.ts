import { Component, inject, WritableSignal } from '@angular/core';
import { ProfileFilters } from '../profile-filters/profile-filters';
import { ProfileCardComponent } from '../../ui';
import { ProfileService } from '../../data';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFilters],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  protected profiles: WritableSignal<Profile[]> = inject(ProfileService).filtersProfiles;
}
