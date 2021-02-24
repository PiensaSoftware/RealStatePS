import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../app.global';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(
        private httpClient: HttpClient,
        private globals: Globals,
        private router: Router) { }

    setLogin(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'Login', body);
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    }

    passwordRecover(email): Observable<any> {
        const body = JSON.stringify(email);
        return this.httpClient.post(this.globals.url + 'PasswordRecover', body);
    }

    codeCheck(code): Observable<any> {
        let params = new HttpParams().set("code", code);
        return this.httpClient.get(this.globals.url + 'PasswordRecover', { params: params });
    }

    setNewPassword(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'NewPassword', body);
    }
}