import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Globals } from '../app.global';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {

    constructor(private httpClient: HttpClient, private globals: Globals) { }

    setRegister(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'User', body);
    }

    accountActivate(code): Observable<any> {
        const body = JSON.stringify(code);
        return this.httpClient.post(this.globals.url + 'AccountActivate', body);
    }
}