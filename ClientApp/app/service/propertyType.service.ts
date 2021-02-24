﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Globals } from '../app.global';

@Injectable({
    providedIn: 'root',
})
export class PropertyTypeService {

    constructor(private httpClient: HttpClient, private globals: Globals) { }

    getPropertyType(): Observable<any> {
        return this.httpClient.get(this.globals.url + 'PropertyType');
    }
}