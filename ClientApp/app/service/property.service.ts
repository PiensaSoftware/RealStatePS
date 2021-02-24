import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Globals } from '../app.global';

@Injectable({
    providedIn: 'root',
})
export class PropertyService {

    constructor(private httpClient: HttpClient, private globals: Globals) { }

    setProperty(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'Property', body);
    }

    getProperties(page): Observable<any> {
        let params = new HttpParams().set("page", page);
        return this.httpClient.get(this.globals.url + 'Property', { params: params });
    }

    getPropertyDetail(propertyId): Observable<any> {
        let params = new HttpParams().set("propertyId", propertyId);
        return this.httpClient.get(this.globals.url + 'PropertyDetail', { params: params });
    }

    getPropertyUpdateDetail(propertyId): Observable<any> {
        let params = new HttpParams().set("propertyId", propertyId);
        return this.httpClient.get(this.globals.url + 'PropertyUpdate', { params: params });
    }

    getPropertyPublished(): Observable<any> {
        return this.httpClient.get(this.globals.url + 'PropertyPublished');
    }

    updatePropertyStatus(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.put(this.globals.url + 'Property', body);
    }

    updateProperty(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.put(this.globals.url + 'PropertyUpdate', body);
    }

    searchFilter(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'PopertySearch', body);
    }

    search(word): Observable<any> {
        let params = new HttpParams().set("word", word);
        return this.httpClient.get(this.globals.url + 'PopertySearch', { params: params });
    }

    send(model): Observable<any> {
        const body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'PropertyDetail', body);
    }
}