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
import { Router } from '@angular/router';
import { PropertyService } from 'ClientApp/app/service/property.service';
import { Globals } from 'ClientApp/app/app.global';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { MatDialog } from '@angular/material';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SendPropertyComponent } from 'ClientApp/app/components/shared/send-property.component';
var PropertyComponent = /** @class */ (function () {
    function PropertyComponent(dialog, spinner, router, propertyService, globals, toasterService, formBuilder, propertyDetailService) {
        this.dialog = dialog;
        this.spinner = spinner;
        this.router = router;
        this.propertyService = propertyService;
        this.globals = globals;
        this.toasterService = toasterService;
        this.formBuilder = formBuilder;
        this.propertyDetailService = propertyDetailService;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.currentSession = localStorage.getItem('currentUser');
        this.properties = [];
        this.urlBase = "";
    }
    PropertyComponent.prototype.ngOnInit = function () {
        if (this.currentSession == null)
            this.router.navigate(['/home']);
        this.urlBase = this.globals.urlImage;
        this.getProperties();
        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                    Validators.required,
                    Validators.email
                ]],
        });
    };
    PropertyComponent.prototype.getProperties = function () {
        var _this = this;
        this.propertyService.getPropertyPublished().subscribe(function (data) {
            if (data.code == 100) {
                _this.properties = data.result;
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyComponent.prototype.editProperty = function (propertyId) {
        this.router.navigate(['/propertyUpdate'], { queryParams: { propertyId: propertyId } });
    };
    PropertyComponent.prototype.updatePropertyStatus = function (property) {
        property.isActive = !property.isActive;
        this.updateProperty(property);
    };
    PropertyComponent.prototype.updateProperty = function (model) {
        var _this = this;
        this.spinner.show();
        this.propertyService.updatePropertyStatus(model)
            .subscribe(function (data) {
            console.log(data);
            if (data.code == 100) {
                setTimeout(function () {
                    _this.toasterService.showToaster('Se cambo el estatus del inmueble correctamente.');
                    _this.spinner.hide();
                    _this.router.navigate(['/property']);
                }, 300);
            }
            else {
                setTimeout(function () {
                    _this.toasterService.showToaster('Error al cambiar estatus del inmueble.');
                    _this.spinner.hide();
                }, 300);
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyComponent.prototype.shareDetail = function (id) {
        var _this = this;
        this.propertyService.getPropertyDetail(id).subscribe(function (data) {
            if (data.code == 100) {
                if (data.result != null) {
                    _this.buildPdf(data.result);
                }
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyComponent.prototype.buildPdf = function (property) {
        var doc = this.propertyDetailService.buildPdf(property);
        doc.save('DetallePropiedad-' + property.id + '.pdf');
    };
    Object.defineProperty(PropertyComponent.prototype, "f", {
        get: function () { return this.sendDetailForm.controls; },
        enumerable: true,
        configurable: true
    });
    PropertyComponent.prototype.sendDetail = function (id) {
        var dialogRef = this.dialog.open(SendPropertyComponent, {
            width: '350px',
            data: { id: id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    PropertyComponent = __decorate([
        Component({
            selector: 'app-property',
            templateUrl: './property.component.html'
        }),
        __metadata("design:paramtypes", [MatDialog,
            NgxSpinnerService,
            Router,
            PropertyService,
            Globals,
            ToasterService,
            FormBuilder,
            PropertyDetailService])
    ], PropertyComponent);
    return PropertyComponent;
}());
export { PropertyComponent };
//# sourceMappingURL=property.component.js.map