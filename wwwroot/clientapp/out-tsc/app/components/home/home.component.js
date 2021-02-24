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
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyService } from '../../service/property.service';
import { ToasterService } from '../../service/toaster.service';
import { Globals } from '../../app.global';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PropertyTypeService } from '../../service/propertyType.service';
import { PropertyOperationService } from '../../service/propertyOperation.service';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { Router } from '@angular/router';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(propertyTypeService, propertyOperationService, formBuilder, spinner, propertyService, toasterService, globals, router) {
        this.propertyTypeService = propertyTypeService;
        this.propertyOperationService = propertyOperationService;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.propertyService = propertyService;
        this.toasterService = toasterService;
        this.globals = globals;
        this.router = router;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.properties = [];
        this.urlBase = "";
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.propertyTypes = [];
        this.propertyOperations = [];
        this.titleOne = "Ultimas Propiedades";
        this.titleTwo = "Publicadas";
        this.subtitleOne = "Encuentra el inmueble que buscas.";
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
        this.searchFilterForm = this.createFormGroup();
        this.searchForm = this.createSearchFormGroup();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.searchFilterForm = this.formBuilder.group({
            propertyTypeId: ['', []],
            propertyOperationId: ['', []],
            state: ['', []],
            municipality: ['', []],
            settlement: ['', []],
            price: ['', []]
        });
        this.searchForm = this.formBuilder.group({
            word: ['', [Validators.required]]
        });
        this.urlBase = this.globals.urlImage;
        this.propertyService.getProperties(1).subscribe(function (data) {
            if (data.code == 100) {
                _this.titleOne = "Ultimas Propiedades";
                _this.titleTwo = "Publicadas";
                _this.subtitleOne = "Encuentra el inmueble que buscas.";
                _this.properties = data.result;
                _this.spinner.hide();
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
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
    };
    HomeComponent.prototype.viewProperty = function (propertyId) {
        this.router.navigate(['/propertyDetail'], { queryParams: { propertyId: propertyId } });
    };
    Object.defineProperty(HomeComponent.prototype, "f", {
        get: function () { return this.searchFilterForm.controls; },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            search: new FormGroup({
                propertyTypeId: new FormControl(),
                propertyOperationId: new FormControl(),
                state: new FormControl(),
                municipality: new FormControl(),
                settlement: new FormControl(),
                price: new FormControl()
            })
        });
    };
    HomeComponent.prototype.createSearchFormGroup = function () {
        return new FormGroup({
            search: new FormGroup({
                word: new FormControl()
            })
        });
    };
    HomeComponent.prototype.searchFilter = function () {
        var _this = this;
        var model = this.searchFilterForm.value;
        if (model.municipality == "" && model.price == "" && model.propertyOperationId == "" &&
            model.propertyTypeId == "" && model.state == "")
            this.toasterService.showToaster('Debe seleccionar almenos un filtro de busqueda.');
        else {
            this.spinner.show();
            this.submitted = true;
            this.propertyService.searchFilter(this.searchFilterForm.value)
                .subscribe(function (data) {
                if (data.code == 100) {
                    setTimeout(function () {
                        _this.titleOne = "Resultados de";
                        _this.titleTwo = "Busqueda";
                        _this.subtitleOne = "Estos son los resultados de busqueda por filtros.";
                        _this.spinner.hide();
                        _this.properties = data.result;
                        if (data.result.length == 0)
                            _this.toasterService.showToaster('No se encontraron resultados de busqueda.');
                    }, 300);
                }
                else {
                    setTimeout(function () {
                        _this.toasterService.showToaster('Error al buscar.');
                        _this.spinner.hide();
                    }, 300);
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    HomeComponent.prototype.search = function () {
        var _this = this;
        if (!this.searchForm.invalid) {
            this.submitted = true;
            this.spinner.show();
            this.propertyService.search(this.searchForm.value.word)
                .subscribe(function (data) {
                if (data.code == 100) {
                    setTimeout(function () {
                        _this.titleOne = "Resultados de";
                        _this.titleTwo = "Busqueda";
                        _this.subtitleOne = "Estos son los resultados de busqueda de " + _this.searchForm.value.word + '.';
                        _this.spinner.hide();
                        _this.properties = data.result;
                        if (data.result.length == 0)
                            _this.toasterService.showToaster('No se encontraron resultados de busqueda.');
                    }, 300);
                }
                else {
                    setTimeout(function () {
                        _this.toasterService.showToaster('Error al buscar.');
                        _this.spinner.hide();
                    }, 300);
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [PropertyTypeService,
            PropertyOperationService,
            FormBuilder,
            NgxSpinnerService,
            PropertyService,
            ToasterService,
            Globals,
            Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map