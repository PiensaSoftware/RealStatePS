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
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../service/toaster.service';
import { MatDialog } from '@angular/material';
import { CutImageComponent } from '../shared/cut-image.component';
import { PropertyService } from '../../service/property.service';
import { PropertyTypeService } from '../../service/propertyType.service';
import { PropertyOperationService } from '../../service/propertyOperation.service';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
var PublishComponent = /** @class */ (function () {
    function PublishComponent(router, dialog, spinner, formBuilder, propertyService, propertyTypeService, propertyOperationService, toasterService, userService, propertyDetailService) {
        this.router = router;
        this.dialog = dialog;
        this.spinner = spinner;
        this.formBuilder = formBuilder;
        this.propertyService = propertyService;
        this.propertyTypeService = propertyTypeService;
        this.propertyOperationService = propertyOperationService;
        this.toasterService = toasterService;
        this.userService = userService;
        this.propertyDetailService = propertyDetailService;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.propertyTypes = [];
        this.propertyOperations = [];
        this.currentSession = localStorage.getItem('currentUser');
        this.croppedImage1 = '';
        this.croppedImage2 = '';
        this.croppedImage3 = '';
        this.croppedImage4 = '';
        this.croppedImage5 = '';
        this.croppedImage6 = '';
        this.croppedImage7 = '';
        this.croppedImage8 = '';
        this.croppedImage9 = '';
        this.croppedImage10 = '';
        this.states = [
            { value: 'Aguascalientes', viewValue: 'Aguascalientes' },
            { value: 'Baja California', viewValue: 'Baja California' },
            { value: 'Baja California Sur', viewValue: 'Baja California Sur' },
            { value: 'Campeche', viewValue: 'Campeche' },
            { value: 'Coahuila de Zaragoza', viewValue: 'Coahuila de Zaragoza' },
            { value: 'Colima', viewValue: 'Colima' },
            { value: 'Chiapas', viewValue: 'Chiapas' },
            { value: 'Chihuahua', viewValue: 'Chihuahua' },
            { value: 'Distrito Federal', viewValue: 'Distrito Federal' },
            { value: 'Durango', viewValue: 'Durango' },
            { value: 'Guanajuato', viewValue: 'Guanajuato' },
            { value: 'Guerrero', viewValue: 'Guerrero' },
            { value: 'Hidalgo', viewValue: 'Hidalgo' },
            { value: 'Jalisco', viewValue: 'Jalisco' },
            { value: 'M\u00E9xico', viewValue: 'M\u00E9xico' },
            { value: 'Michoac\u00E1n de Ocampo', viewValue: 'Michoac\u00E1n de Ocampo' },
            { value: 'Morelos', viewValue: 'Morelos' },
            { value: 'Nayarit', viewValue: 'Nayarit' },
            { value: 'Nuevo Le\u00F3n', viewValue: 'Nuevo Le\u00F3n' },
            { value: 'Oaxaca', viewValue: 'Oaxaca' },
            { value: 'Puebla', viewValue: 'Puebla' },
            { value: 'Quer\u00E9taro', viewValue: 'Quer\u00E9taro' },
            { value: 'Quintana Roo', viewValue: 'Quintana Roo' },
            { value: 'San Luis Potos\u00ED', viewValue: 'San Luis Potos\u00ED' },
            { value: 'Sinaloa', viewValue: 'Sinaloa' },
            { value: 'Sonora', viewValue: 'Sonora' },
            { value: 'Tabasco', viewValue: 'Tabasco' },
            { value: 'Tamaulipas', viewValue: 'Tamaulipas' },
            { value: 'Tlaxcala', viewValue: 'Tlaxcala' },
            { value: 'Veracruz', viewValue: 'Veracruz' },
            { value: 'Yucat\u00E1n', viewValue: 'Yucat\u00E1n' },
            { value: 'Zacatecas', viewValue: 'Zacatecas' }
        ];
        this.options = [
            { value: '0', viewValue: 'n/a' },
            { value: '1', viewValue: '1' },
            { value: '2', viewValue: '2' },
            { value: '3', viewValue: '3' },
            { value: '4', viewValue: '4' },
            { value: '5', viewValue: '5 o más' },
        ];
    }
    PublishComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentSession == null)
            this.router.navigate(['/home']);
        this.breakpoint = (window.innerWidth <= 400) ? 2 : 5;
        this.spinner.show();
        this.publishForm = this.formBuilder.group({
            title: ['', [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(150)
                ]],
            description: ['', []],
            street: ['', [
                    Validators.required
                ]],
            number: ['', [
                    Validators.required
                ]],
            settlement: ['', [
                    Validators.required
                ]],
            municipality: ['', [
                    Validators.required
                ]],
            state: ['', [
                    Validators.required
                ]],
            metersLand: ['', [
                    Validators.required
                ]],
            metersBuilt: ['', [
                    Validators.required
                ]],
            bedrooms: ['', [
                    Validators.required
                ]],
            bathrooms: ['', [
                    Validators.required
                ]],
            garage: ['', [
                    Validators.required
                ]],
            level: ['', [
                    Validators.required
                ]],
            propertyTypeId: ['', [
                    Validators.required
                ]],
            propertyOperationId: ['', [
                    Validators.required
                ]],
            price: ['', [
                    Validators.required
                ]],
            phoneOne: ['', [
                    Validators.required
                ]],
            phoneTwo: ['', []],
            email: ['', [
                    Validators.required,
                    Validators.email
                ]],
            webSite: ['', []],
            company: ['', []],
        });
        this.propertyTypeService.getPropertyType().subscribe(function (data) {
            if (data.code == 100) {
                var propertyType_1 = [];
                data.result.forEach(function (value) {
                    propertyType_1.push({
                        value: value.id,
                        viewValue: value.name
                    });
                });
                _this.propertyTypes = propertyType_1;
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
        this.propertyOperationService.getPropertyOperation().subscribe(function (data) {
            if (data.code == 100) {
                var propertyOperation_1 = [];
                data.result.forEach(function (value) {
                    propertyOperation_1.push({
                        value: value.id,
                        viewValue: value.name
                    });
                });
                _this.propertyOperations = propertyOperation_1;
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
        var user = JSON.parse(this.currentSession);
        this.userService.getUser(user.id).subscribe(function (data) {
            if (data.code == 100) {
                _this.publishForm.controls['phoneOne'].patchValue(data.result.phoneOne);
                _this.publishForm.controls['phoneTwo'].patchValue(data.result.phoneTwo);
                _this.publishForm.controls['webSite'].patchValue(data.result.webSite);
                _this.publishForm.controls['company'].patchValue(data.result.company);
                _this.publishForm.controls['email'].patchValue(data.result.user.email);
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
        this.spinner.hide();
    };
    Object.defineProperty(PublishComponent.prototype, "f", {
        get: function () { return this.publishForm.controls; },
        enumerable: true,
        configurable: true
    });
    PublishComponent.prototype.onResize = function (event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 5;
    };
    PublishComponent.prototype.onPublish = function () {
        var _this = this;
        if (this.imagesValidate() >= 2) {
            this.submitted = true;
            if (!this.publishForm.invalid) {
                this.spinner.show();
                this.publishForm.value.image1 = this.croppedImage1;
                this.publishForm.value.image2 = this.croppedImage2;
                this.publishForm.value.image3 = this.croppedImage3;
                this.publishForm.value.image4 = this.croppedImage4;
                this.publishForm.value.image5 = this.croppedImage5;
                this.publishForm.value.image6 = this.croppedImage6;
                this.publishForm.value.image7 = this.croppedImage7;
                this.publishForm.value.image8 = this.croppedImage8;
                this.publishForm.value.image9 = this.croppedImage9;
                this.publishForm.value.image10 = this.croppedImage10;
                this.propertyService.setProperty(this.publishForm.value)
                    .subscribe(function (data) {
                    console.log(data);
                    if (data.code == 100) {
                        setTimeout(function () {
                            _this.toasterService.showToaster('Se publico el inmueble correctamente.');
                            _this.spinner.hide();
                            _this.router.navigate(['/property']);
                            _this.getPropertyDetail(data.result);
                        }, 300);
                    }
                    else {
                        setTimeout(function () {
                            _this.toasterService.showToaster('Error al crear inmueble.');
                            _this.spinner.hide();
                        }, 300);
                    }
                }, function (err) { return console.error('Failed! ' + err); });
            }
        }
        else
            this.toasterService.showToaster('Debe cargar por lo menos 2 imagenes del Inmueble.');
    };
    PublishComponent.prototype.getPropertyDetail = function (propertyId) {
        var _this = this;
        this.propertyService.getPropertyDetail(propertyId).subscribe(function (data) {
            if (data.code == 100) {
                _this.sendDetail(data.result);
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PublishComponent.prototype.sendDetail = function (property) {
        var doc = this.propertyDetailService.buildPdf(property);
        var binary = doc.output();
        var pdf = binary ? btoa(binary) : "";
        var model = {
            email: null,
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
    };
    PublishComponent.prototype.openCutDialog = function (event, numberImage) {
        var _this = this;
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type: 'publish' };
        var dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined)
                switch (result.numberImage) {
                    case 1:
                        _this.croppedImage1 = result.imageSRC;
                        break;
                    case 2:
                        _this.croppedImage2 = result.imageSRC;
                        break;
                    case 3:
                        _this.croppedImage3 = result.imageSRC;
                        break;
                    case 4:
                        _this.croppedImage4 = result.imageSRC;
                        break;
                    case 5:
                        _this.croppedImage5 = result.imageSRC;
                        break;
                    case 6:
                        _this.croppedImage6 = result.imageSRC;
                        break;
                    case 7:
                        _this.croppedImage7 = result.imageSRC;
                        break;
                    case 8:
                        _this.croppedImage8 = result.imageSRC;
                        break;
                    case 9:
                        _this.croppedImage9 = result.imageSRC;
                        break;
                    case 10:
                        _this.croppedImage10 = result.imageSRC;
                        break;
                }
        });
    };
    PublishComponent.prototype.imagesValidate = function () {
        var counter = 0;
        if (this.croppedImage1 !== '')
            counter++;
        if (this.croppedImage2 !== '')
            counter++;
        if (this.croppedImage3 !== '')
            counter++;
        if (this.croppedImage4 !== '')
            counter++;
        if (this.croppedImage5 !== '')
            counter++;
        if (this.croppedImage6 !== '')
            counter++;
        if (this.croppedImage7 !== '')
            counter++;
        if (this.croppedImage8 !== '')
            counter++;
        if (this.croppedImage9 !== '')
            counter++;
        if (this.croppedImage10 !== '')
            counter++;
        return counter;
    };
    PublishComponent.prototype.removeImage = function (numberImage) {
        switch (numberImage) {
            case 1:
                this.croppedImage1 = '';
                break;
            case 2:
                this.croppedImage2 = '';
                break;
            case 3:
                this.croppedImage3 = '';
                break;
            case 4:
                this.croppedImage4 = '';
                break;
            case 5:
                this.croppedImage5 = '';
                break;
            case 6:
                this.croppedImage6 = '';
                break;
            case 7:
                this.croppedImage7 = '';
                break;
            case 8:
                this.croppedImage8 = '';
                break;
            case 9:
                this.croppedImage9 = '';
                break;
            case 10:
                this.croppedImage10 = '';
                break;
        }
    };
    PublishComponent.prototype.fileChangeEvent = function (event, imageNumber) {
        this.openCutDialog(event, imageNumber);
    };
    PublishComponent = __decorate([
        Component({
            selector: 'app-publish',
            templateUrl: './publish.component.html'
        }),
        __metadata("design:paramtypes", [Router,
            MatDialog,
            NgxSpinnerService,
            FormBuilder,
            PropertyService,
            PropertyTypeService,
            PropertyOperationService,
            ToasterService,
            UserService,
            PropertyDetailService])
    ], PublishComponent);
    return PublishComponent;
}());
export { PublishComponent };
//# sourceMappingURL=publish.component.js.map