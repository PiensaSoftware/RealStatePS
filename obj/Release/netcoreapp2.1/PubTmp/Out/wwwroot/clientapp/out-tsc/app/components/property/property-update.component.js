var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MyErrorStateMatcher } from "../../helpers/MyErrorStateMatcher";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "../../service/toaster.service";
import { Globals } from "../../app.global";
import { ActivatedRoute, Router } from "@angular/router";
import { PropertyService } from "../../service/property.service";
import { PropertyTypeService } from "../../service/propertyType.service";
import { PropertyOperationService } from "../../service/propertyOperation.service";
import { MatDialog } from "@angular/material";
import { CutImageComponent } from "../shared/cut-image.component";
var PropertyUpdateComponent = /** @class */ (function () {
    function PropertyUpdateComponent(router, dialog, spinner, formBuilder, propertyService, propertyTypeService, propertyOperationService, toasterService, route, globals) {
        this.router = router;
        this.dialog = dialog;
        this.spinner = spinner;
        this.formBuilder = formBuilder;
        this.propertyService = propertyService;
        this.propertyTypeService = propertyTypeService;
        this.propertyOperationService = propertyOperationService;
        this.toasterService = toasterService;
        this.route = route;
        this.globals = globals;
        this.urlBase = "";
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.propertyTypes = [];
        this.propertyOperations = [];
        this.currentSession = localStorage.getItem('currentUser');
        this.valueOperation = 0;
        this.valueType = 0;
        this.valueState = "";
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
            { value: 'México', viewValue: 'México' },
            { value: 'Michoacán de Ocampo', viewValue: 'Michoacán de Ocampo' },
            { value: 'Morelos', viewValue: 'Morelos' },
            { value: 'Nayarit', viewValue: 'Nayarit' },
            { value: 'Nuevo León', viewValue: 'Nuevo León' },
            { value: 'Oaxaca', viewValue: 'Oaxaca' },
            { value: 'Puebla', viewValue: 'Puebla' },
            { value: 'Querétaro', viewValue: 'Querétaro' },
            { value: 'Quintana Roo', viewValue: 'Quintana Roo' },
            { value: 'San Luis Potosí', viewValue: 'San Luis Potosí' },
            { value: 'Sinaloa', viewValue: 'Sinaloa' },
            { value: 'Sonora', viewValue: 'Sonora' },
            { value: 'Tabasco', viewValue: 'Tabasco' },
            { value: 'Tamaulipas', viewValue: 'Tamaulipas' },
            { value: 'Tlaxcala', viewValue: 'Tlaxcala' },
            { value: 'Veracruz de Ignacio de la Llave', viewValue: 'Veracruz de Ignacio de la Llave' },
            { value: 'Yucatán', viewValue: 'Yucatán' },
            { value: 'Zacatecas', viewValue: 'Zacatecas' }
        ];
        this.options = [
            { value: 0, viewValue: 'n/a' },
            { value: 1, viewValue: '1' },
            { value: 2, viewValue: '2' },
            { value: 3, viewValue: '3' },
            { value: 4, viewValue: '4' },
            { value: 5, viewValue: '5 o más' },
        ];
        this.propertyUpdateForm = this.createFormGroup();
    }
    PropertyUpdateComponent.prototype.ngOnInit = function () {
        if (this.currentSession == null)
            this.router.navigate(['/home']);
        this.breakpoint = (window.innerWidth <= 400) ? 2 : 5;
        this.propertyUpdateForm = this.formBuilder.group({
            id: ['', []],
            title: ['', [
                    Validators.required
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
            isActive: ['', []],
            userProfileId: ['', []],
            created: ['', []],
            creator: ['', []],
            company: ['', []]
        });
        this.getPropertyType();
    };
    PropertyUpdateComponent.prototype.getPropertyType = function () {
        var _this = this;
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
                _this.getPropertyOperation();
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyUpdateComponent.prototype.getPropertyOperation = function () {
        var _this = this;
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
                _this.getPropertyDetail();
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyUpdateComponent.prototype.getPropertyDetail = function () {
        var _this = this;
        this.spinner.show();
        var propertyId;
        this.urlBase = this.globals.urlImage;
        this.route.queryParams
            .subscribe(function (params) {
            propertyId = params.propertyId;
        });
        this.propertyService.getPropertyUpdateDetail(propertyId).subscribe(function (data) {
            if (data.code == 100) {
                Object.keys(_this.propertyUpdateForm.controls).forEach(function (name) {
                    if (_this.propertyUpdateForm.controls[name]) {
                        _this.propertyUpdateForm.controls[name].patchValue(data.result[name]);
                    }
                });
                _this.orderImage(data.result.propertyImage);
                _this.spinner.hide();
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PropertyUpdateComponent.prototype.orderImage = function (images) {
        var _this = this;
        (images).forEach(function (image) {
            if (image.order == 1)
                _this.croppedImage1 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 2)
                _this.croppedImage2 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 3)
                _this.croppedImage3 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 4)
                _this.croppedImage4 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 5)
                _this.croppedImage5 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 6)
                _this.croppedImage6 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 7)
                _this.croppedImage7 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 8)
                _this.croppedImage8 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 9)
                _this.croppedImage9 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 10)
                _this.croppedImage10 = 'data:image/jpg;base64,' + image.url;
        });
    };
    Object.defineProperty(PropertyUpdateComponent.prototype, "f", {
        get: function () { return this.propertyUpdateForm.controls; },
        enumerable: true,
        configurable: true
    });
    PropertyUpdateComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            propertyUpdate: new FormGroup({
                id: new FormControl(),
                title: new FormControl(),
                description: new FormControl(),
                street: new FormControl(),
                number: new FormControl(),
                settlement: new FormControl(),
                municipality: new FormControl(),
                state: new FormControl(),
                metersLand: new FormControl(),
                metersBuilt: new FormControl(),
                bedrooms: new FormControl(),
                bathrooms: new FormControl(),
                garage: new FormControl(),
                level: new FormControl(),
                propertyTypeId: new FormControl(),
                propertyOperationId: new FormControl(),
                price: new FormControl(),
                phoneOne: new FormControl(),
                phoneTwo: new FormControl(),
                email: new FormControl(),
                webSite: new FormControl(),
                isActive: new FormControl(),
                userProfileId: new FormControl(),
                created: new FormControl(),
                creator: new FormControl(),
                company: new FormControl()
            })
        });
    };
    PropertyUpdateComponent.prototype.onResize = function (event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 5;
    };
    PropertyUpdateComponent.prototype.onUpdateProperty = function () {
        var _this = this;
        if (this.imagesValidate() >= 2) {
            this.submitted = true;
            if (!this.propertyUpdateForm.invalid) {
                this.spinner.show();
                this.propertyUpdateForm.value.image1 = this.croppedImage1;
                this.propertyUpdateForm.value.image2 = this.croppedImage2;
                this.propertyUpdateForm.value.image3 = this.croppedImage3;
                this.propertyUpdateForm.value.image4 = this.croppedImage4;
                this.propertyUpdateForm.value.image5 = this.croppedImage5;
                this.propertyUpdateForm.value.image6 = this.croppedImage6;
                this.propertyUpdateForm.value.image7 = this.croppedImage7;
                this.propertyUpdateForm.value.image8 = this.croppedImage8;
                this.propertyUpdateForm.value.image9 = this.croppedImage9;
                this.propertyUpdateForm.value.image10 = this.croppedImage10;
                this.propertyService.updateProperty(this.propertyUpdateForm.value)
                    .subscribe(function (data) {
                    console.log(data);
                    if (data.code == 100) {
                        setTimeout(function () {
                            _this.toasterService.showToaster('Se edito el inmueble correctamente.');
                            _this.spinner.hide();
                            _this.router.navigate(['/property']);
                        }, 300);
                    }
                    else {
                        setTimeout(function () {
                            _this.toasterService.showToaster('Error al editar inmueble.');
                            _this.spinner.hide();
                        }, 300);
                    }
                }, function (err) { return console.error('Failed! ' + err); });
            }
        }
        else
            this.toasterService.showToaster('Debe cargar almenos 2 imagenes del Inmueble.');
    };
    PropertyUpdateComponent.prototype.openCutDialog = function (event, numberImage) {
        var _this = this;
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type: 'publish' };
        var dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });
        dialogRef.afterClosed().subscribe(function (result) {
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
    PropertyUpdateComponent.prototype.imagesValidate = function () {
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
    PropertyUpdateComponent.prototype.removeImage = function (numberImage) {
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
    PropertyUpdateComponent.prototype.fileChangeEvent = function (event, imageNumber) {
        this.openCutDialog(event, imageNumber);
    };
    PropertyUpdateComponent = __decorate([
        Component({
            selector: 'app-property-update',
            templateUrl: './property-update.component.html',
        }),
        __metadata("design:paramtypes", [Router,
            MatDialog,
            NgxSpinnerService,
            FormBuilder,
            PropertyService,
            PropertyTypeService,
            PropertyOperationService,
            ToasterService,
            ActivatedRoute,
            Globals])
    ], PropertyUpdateComponent);
    return PropertyUpdateComponent;
}());
export { PropertyUpdateComponent };
//# sourceMappingURL=property-update.component.js.map