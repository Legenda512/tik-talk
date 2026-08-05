import { Component, inject, Signal } from '@angular/core';
import { ProfileFilters } from '../profile-filters/profile-filters';
import { ProfileCardComponent } from '../../ui';
import { profileStore, selectFilteredProfiles } from '../../data';
import { Profile } from '@tt/interfaces/profile';
/*
//NgRX store
import { Store } from '@ngrx/store';
*/

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFilters],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  /*
  // NgRX store
  private readonly _store = inject(Store);
  protected profiles: Signal<Profile[]> = this._store.selectSignal(selectFilteredProfiles);
  */

  // NgRX signal store
  private readonly _store = inject(profileStore);
  protected profiles: Signal<Profile[]> = this._store.profiles;
}
