import { Component, inject, Signal } from '@angular/core';
import { ProfileFilters } from '../profile-filters/profile-filters';
import { ProfileCardComponent } from '../../ui';
import { selectFilteredProfiles } from '../../data';
import { Profile } from '@tt/interfaces/profile';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFilters],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly _store = inject(Store);
  protected profiles: Signal<Profile[]> = this._store.selectSignal(selectFilteredProfiles);
}
