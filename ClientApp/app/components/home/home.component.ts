import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyService } from '../../service/property.service';
import { ToasterService } from '../../service/toaster.service';
import { Globals } from '../../app.global';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectOption } from '../../model/selectOption.model';
import { PropertyTypeService } from '../../service/propertyType.service';
import { PropertyOperationService } from '../../service/propertyOperation.service';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { EventEmitter } from 'events';
import { Property } from '../../model/property.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
    properties = [];
    urlBase = "";
    searchFilterForm: FormGroup;
    searchForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    propertyTypes: SelectOption[] = [];
    propertyOperations: SelectOption[] = [];

    titleOne = "Ultimas Propiedades";
    titleTwo = "Publicadas";
    subtitleOne = "Encuentra el inmueble que buscas.";

    constructor(
        private propertyTypeService: PropertyTypeService,
        private propertyOperationService: PropertyOperationService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private propertyService: PropertyService,
        private toasterService: ToasterService,
        private globals: Globals,
        private router: Router
    ) {
        this.searchFilterForm = this.createFormGroup();
        this.searchForm = this.createSearchFormGroup();
    }

    ngOnInit() {
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
        this.propertyService.getProperties(1).subscribe(data => {
            if (data.code == 100) {
                this.titleOne = "Ultimas Propiedades";
                this.titleTwo = "Publicadas";
                this.subtitleOne = "Encuentra el inmueble que buscas.";
                this.properties = data.result;
                this.spinner.hide();
            } else {
            }
        }, (err) => console.error('Failed! ' + err));

        this.propertyTypeService.getPropertyType().subscribe(data => {
            if (data.code == 100) {
                let propertyType: SelectOption[] = [];
                data.result.forEach(function (value) {
                    propertyType.push({
                        value: value.id,
                        viewValue: value.name
                    });
                });
                this.propertyTypes = propertyType;
            } else {
            }
        }, (err) => console.error('Failed! ' + err));

        this.propertyOperationService.getPropertyOperation().subscribe(data => {
            if (data.code == 100) {
                let propertyOperation: SelectOption[] = [];
                data.result.forEach(function (value) {
                    propertyOperation.push({
                        value: value.id,
                        viewValue: value.name
                    });
                });
                this.propertyOperations = propertyOperation;
            } else {
            }
        }, (err) => console.error('Failed! ' + err));
    }

    viewProperty(propertyId): void {
        this.router.navigate(['/propertyDetail'], { queryParams: { propertyId: propertyId } });
    }

    get f() { return this.searchFilterForm.controls; }

    createFormGroup() {
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
    }

    createSearchFormGroup() {
        return new FormGroup({
            search: new FormGroup({
                word: new FormControl()
            })
        });
    }

    searchFilter() {
        let model = this.searchFilterForm.value;
        if (model.municipality == "" && model.price == "" && model.propertyOperationId == "" &&
            model.propertyTypeId == "" && model.state == "")
            this.toasterService.showToaster('Debe seleccionar almenos un filtro de busqueda.');
        else {
            this.spinner.show();
            this.submitted = true;
            this.propertyService.searchFilter(this.searchFilterForm.value)
                .subscribe(data => {
                    if (data.code == 100) {
                        setTimeout(() => {
                            this.titleOne = "Resultados de";
                            this.titleTwo = "Busqueda";
                            this.subtitleOne = "Estos son los resultados de busqueda por filtros.";
                            this.spinner.hide();
                            this.properties = data.result;
                            if (data.result.length == 0)
                                this.toasterService.showToaster('No se encontraron resultados de busqueda.');
                        }, 300);
                    } else {
                        setTimeout(() => {
                            this.toasterService.showToaster('Error al buscar.');
                            this.spinner.hide();
                        }, 300);
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }

    search() {
        if (!this.searchForm.invalid) {
            this.submitted = true;
            this.spinner.show();
            this.propertyService.search(this.searchForm.value.word)
                .subscribe(data => {
                    if (data.code == 100) {
                        setTimeout(() => {
                            this.titleOne = "Resultados de";
                            this.titleTwo = "Busqueda";
                            this.subtitleOne = "Estos son los resultados de busqueda de " + this.searchForm.value.word + '.';
                            this.spinner.hide();
                            this.properties = data.result;
                            if (data.result.length == 0)
                                this.toasterService.showToaster('No se encontraron resultados de busqueda.');
                        }, 300);
                    } else {
                        setTimeout(() => {
                            this.toasterService.showToaster('Error al buscar.');
                            this.spinner.hide();
                        }, 300);
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }

    states: SelectOption[] = [
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
}


