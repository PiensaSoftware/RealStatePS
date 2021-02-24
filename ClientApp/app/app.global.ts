import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Globals {
    url: string = 'https://onlinepropiedades.com/api/';
    urlImage: string = 'https://onlinepropiedades.com/';

    //url: string = 'http://localhost:8840/api/';
    //urlImage: string = 'http://localhost:8840/';
}