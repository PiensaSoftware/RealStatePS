var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../app.global';
import { Router } from '@angular/router';
var LoginService = /** @class */ (function () {
    function LoginService(httpClient, globals, router) {
        this.httpClient = httpClient;
        this.globals = globals;
        this.router = router;
    }
    LoginService.prototype.setLogin = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'Login', body);
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    };
    LoginService.prototype.passwordRecover = function (email) {
        var body = JSON.stringify(email);
        return this.httpClient.post(this.globals.url + 'PasswordRecover', body);
    };
    LoginService.prototype.codeCheck = function (code) {
        var params = new HttpParams().set("code", code);
        return this.httpClient.get(this.globals.url + 'PasswordRecover', { params: params });
    };
    LoginService.prototype.setNewPassword = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'NewPassword', body);
    };
    LoginService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [HttpClient,
            Globals,
            Router])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map