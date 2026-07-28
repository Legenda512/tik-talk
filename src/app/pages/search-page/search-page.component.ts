import { Component, inject, WritableSignal } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileFilters } from './profile-filters/profile-filters';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFilters],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  protected profiles: WritableSignal<Profile[]> = inject(ProfileService).filtersProfiles;
}
