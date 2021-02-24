var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { PropertyService } from 'ClientApp/app/service/property.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from 'ClientApp/app/service/toaster.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
var SendPropertyComponent = /** @class */ (function () {
    function SendPropertyComponent(dialog, spinner, propertyService, toasterService, formBuilder, propertyDetailService, dialogRef, data) {
        this.dialog = dialog;
        this.spinner = spinner;
        this.propertyService = propertyService;
        this.toasterService = toasterService;
        this.formBuilder = formBuilder;
        this.propertyDetailService = propertyDetailService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SendPropertyComponent.prototype.ngOnInit = function () {
        this.sendDetailForm = this.formBuilder.group({
            email: ['', [
                    Validators.required,
                    Validators.email
                ]],
        });
    };
    SendPropertyComponent.prototype.shareDetail = function () {
        var _this = this;
        var id = this.data.id;
        this.propertyService.getPropertyDetail(id).subscribe(function (data) {
            if (data.code == 100) {
                if (data.result != null) {
                    _this.sendDetail(data.result);
                    _this.onNoClick();
                }
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    Object.defineProperty(SendPropertyComponent.prototype, "f", {
        get: function () { return this.sendDetailForm.controls; },
        enumerable: true,
        configurable: true
    });
    SendPropertyComponent.prototype.sendDetail = function (property) {
        if (!this.sendDetailForm.invalid) {
            this.toasterService.showToaster('Se envi\u00F3 el detalle de la propiedad correctamente.');
            var doc = this.propertyDetailService.buildPdf(property);
            var binary = doc.output();
            var pdf = binary ? btoa(binary) : "";
            var model = {
                email: this.sendDetailForm.value.email,
                name: 'DetallePropiedad-' + property.id + '.pdf',
                pdf: pdf,
                id: property.id.toString()
            };
            this.propertyService.send(model).subscribe(function (data) {
                if (data.code == 100) {
                }
                else {
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    SendPropertyComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SendPropertyComponent = __decorate([
        Component({
            selector: 'app-send-property',
            templateUrl: './send-property.component.html'
        }),
        __param(7, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialog,
            NgxSpinnerService,
            PropertyService,
            ToasterService,
            FormBuilder,
            PropertyDetailService,
            MatDialogRef, Object])
    ], SendPropertyComponent);
    return SendPropertyComponent;
}());
export { SendPropertyComponent };
//# sourceMappingURL=send-property.component.js.map