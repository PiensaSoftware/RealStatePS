var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../service/property.service';
import { Globals } from '../../app.global';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
var PropertyDetailComponent = /** @class */ (function () {
    function PropertyDetailComponent(route, propertyService, globals, spinner, formBuilder, toasterService, propertyDetailService) {
        this.route = route;
        this.propertyService = propertyService;
        this.globals = globals;
        this.spinner = spinner;
        this.formBuilder = formBuilder;
        this.toasterService = toasterService;
        this.propertyDetailService = propertyDetailService;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.urlBase = "";
        this.imageView = "";
        this.panelOpenState = false;
        this.showSend = false;
    }
    PropertyDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.urlBase = this.globals.urlImage;
        this.route.queryParams
            .subscribe(function (params) {
            _this.getPropertyDetail(params.propertyId);
        });
        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                    Validators.required,
                    Validators.email
                ]],
        });
    };
    PropertyDetailComponent.prototype.getPropertyDetail = function (propertyId) {
        var _this = this;
        this.propertyService.getPropertyDetail(propertyId).subscribe(function (data) {
            if (data.code == 100) {
                _this.property = data.result;
                _this.imageView = _this.property.propertyImage[0].url;
                _this.spinner.hide();
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyDetailComponent.prototype.downloadDetail = function () {
        var doc = this.propertyDetailService.buildPdf(this.property);
        doc.save('DetallePropiedad-' + this.property.id + '.pdf');
    };
    Object.defineProperty(PropertyDetailComponent.prototype, "f", {
        get: function () { return this.sendDetailForm.controls; },
        enumerable: true,
        configurable: true
    });
    PropertyDetailComponent.prototype.sendDetail = function () {
        if (!this.sendDetailForm.invalid) {
            this.toasterService.showToaster('Se envi\u00F3 el detalle de la propiedad correctamente.');
            var doc = this.propertyDetailService.buildPdf(this.property);
            var binary = doc.output();
            var pdf = binary ? btoa(binary) : "";
            var model = {
                email: this.sendDetailForm.value.email,
                name: 'DetallePropiedad-' + this.property.id + '.pdf',
                pdf: pdf,
                id: this.property.id.toString()
            };
            this.propertyService.send(model).subscribe(function (data) {
                if (data.code == 100) {
                }
                else {
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    PropertyDetailComponent = __decorate([
        Component({
            selector: 'app-property-detail',
            templateUrl: './property-detail.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PropertyService,
            Globals,
            NgxSpinnerService,
            FormBuilder,
            ToasterService,
            PropertyDetailService])
    ], PropertyDetailComponent);
    return PropertyDetailComponent;
}());
export { PropertyDetailComponent };
//# sourceMappingURL=property-detail.component.js.map