import { __decorate } from "tslib";
import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
let ProfileService = class ProfileService {
    http = inject(HttpClient);
    baseApiUrl = 'https://icherniakov.ru/yt-course/';
    getTestAccounts() {
        return this.http.get(`${this.baseApiUrl}account/test_accounts`);
    }
};
ProfileService = __decorate([
    Service()
], ProfileService);
export { ProfileService };
