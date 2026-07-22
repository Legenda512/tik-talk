import { __decorate } from "tslib";
import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
let ProfileCard = class ProfileCard {
    profile = input.required();
    get avatarSrc() {
        return this.profile().avatarUrl ?? 'assets/imgs/avatar-placeholder.png';
    }
    get avatarAlt() {
        return this.profile().lastName;
    }
};
ProfileCard = __decorate([
    Component({
        selector: 'app-profile-card',
        imports: [NgOptimizedImage],
        templateUrl: './profile-card.html',
        styleUrl: './profile-card.scss',
    })
], ProfileCard);
export { ProfileCard };
