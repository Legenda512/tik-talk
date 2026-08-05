import { Component, inject, Signal } from '@angular/core';
import { ProfileFilters } from '../profile-filters/profile-filters';
import { ProfileCardComponent } from '../../ui';
import {
  profileActions,
  //profileStore,
  selectFilteredProfiles,
} from '../../data';
import { Profile } from '@tt/interfaces/profile';
//NgRX store
import { Store } from '@ngrx/store';
import { InfiniteScrollTriggerComponent } from '@tt/common-ui';
import {
  WaIntersectionObservee,
  WaIntersectionObserverDirective,
} from '@ng-web-apis/intersection-observer';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFilters,
    InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    InfiniteScrollDirective,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  // NgRX store
  private readonly _store = inject(Store);
  protected profiles: Signal<Profile[]> = this._store.selectSignal(selectFilteredProfiles);

  /*
  // NgRX signal store
  private readonly _store = inject(profileStore);
  protected profiles: Signal<Profile[]> = this._store.profiles;
  */

  protected timeToFetch(): void {
    this._store.dispatch(profileActions.setPage({}));
  }

  protected onIntersection(entries: IntersectionObserverEntry[]): void {
    if (!entries.length) {
      return;
    }

    if (entries[0].intersectionRatio > 0) {
      this.timeToFetch();
    }
  }

  protected onScroll(): void {
    this.timeToFetch();
  }
}
