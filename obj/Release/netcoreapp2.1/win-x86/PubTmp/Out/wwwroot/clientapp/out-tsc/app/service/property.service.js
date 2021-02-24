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
var PropertyService = /** @class */ (function () {
    function PropertyService(httpClient, globals) {
        this.httpClient = httpClient;
        this.globals = globals;
    }
    PropertyService.prototype.setProperty = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'Property', body);
    };
    PropertyService.prototype.getProperties = function (page) {
        var params = new HttpParams().set("page", page);
        return this.httpClient.get(this.globals.url + 'Property', { params: params });
    };
    PropertyService.prototype.getPropertyDetail = function (propertyId) {
        var params = new HttpParams().set("propertyId", propertyId);
        return this.httpClient.get(this.globals.url + 'PropertyDetail', { params: params });
    };
    PropertyService.prototype.getPropertyUpdateDetail = function (propertyId) {
        var params = new HttpParams().set("propertyId", propertyId);
        return this.httpClient.get(this.globals.url + 'PropertyUpdate', { params: params });
    };
    PropertyService.prototype.getPropertyPublished = function () {
        return this.httpClient.get(this.globals.url + 'PropertyPublished');
    };
    PropertyService.prototype.updatePropertyStatus = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.put(this.globals.url + 'Property', body);
    };
    PropertyService.prototype.updateProperty = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.put(this.globals.url + 'PropertyUpdate', body);
    };
    PropertyService.prototype.searchFilter = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'PopertySearch', body);
    };
    PropertyService.prototype.search = function (word) {
        var params = new HttpParams().set("word", word);
        return this.httpClient.get(this.globals.url + 'PopertySearch', { params: params });
    };
    PropertyService.prototype.send = function (model) {
        var body = JSON.stringify(model);
        return this.httpClient.post(this.globals.url + 'PropertyDetail', body);
    };
    PropertyService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [HttpClient, Globals])
    ], PropertyService);
    return PropertyService;
}());
export { PropertyService };
//# sourceMappingURL=property.service.js.map