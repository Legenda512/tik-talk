import { Service, signal, WritableSignal } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';

@Service()
export class GlobalStoreService {
  public readonly myProfile: WritableSignal<Profile | null> = signal<Profile | null>(null);
}
