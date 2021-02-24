import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../app.global';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private httpClient: HttpClient,
        private globals: Globals,
        private router: Router) { }

    getUser(id): Observable<any> {
        let params = new HttpParams().set("id", id);
        return this.httpClient.get(this.globals.url + 'User', { params: params });
    }

    getUsers(): Observable<any> {
        return this.httpClient.get(this.globals.url + 'Users');
    }
}