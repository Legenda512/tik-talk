import { __decorate } from "tslib";
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCard } from './common-ui/profile-card/profile-card';
import { ProfileService } from './data/services/profile';
let App = class App {
    profileService = inject(ProfileService);
    profiles = signal([]);
    constructor() {
        this.profileService.getTestAccounts().subscribe((profiles) => {
            this.profiles.set(profiles);
        });
    }
};
App = __decorate([
    Component({
        selector: 'app-root',
        imports: [RouterOutlet, ProfileCard],
        templateUrl: './app.html',
        styleUrl: './app.scss',
    })
], App);
export { App };
