﻿import { Component, Optional, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MyErrorStateMatcher } from "../../helpers/MyErrorStateMatcher";
import { LoginService } from "../../service/login.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "../../service/toaster.service";
import { CropImage } from "../../model/cropImage.model";
import { SelectOption } from "../../model/selectOption.model";
import { Globals } from "../../app.global";
import { ActivatedRoute, Router } from "@angular/router";
import { Property } from "../../model/property.model";
import { PropertyService } from "../../service/property.service";
import { PropertyTypeService } from "../../service/propertyType.service";
import { PropertyOperationService } from "../../service/propertyOperation.service";
import { MatDialog } from "@angular/material";
import { CutImageComponent } from "../shared/cut-image.component";

@Component({
    selector: 'app-property-update',
    templateUrl: './property-update.component.html',
})
export class PropertyUpdateComponent implements OnInit {

    urlBase = "";
    cropImage: CropImage;
    breakpoint: any;
    propertyUpdateForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    property: any;
    propertyTypes: SelectOption[] = [];
    propertyOperations: SelectOption[] = [];
    currentSession = localStorage.getItem('currentUser');
    valueOperation = 0;
    valueType = 0;
    valueState = "";
    croppedImage1: any = '';
    croppedImage2: any = '';
    croppedImage3: any = '';
    croppedImage4: any = '';
    croppedImage5: any = '';
    croppedImage6: any = '';
    croppedImage7: any = '';
    croppedImage8: any = '';
    croppedImage9: any = '';
    croppedImage10: any = '';

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private propertyService: PropertyService,
        private propertyTypeService: PropertyTypeService,
        private propertyOperationService: PropertyOperationService,
        private toasterService: ToasterService,
        private route: ActivatedRoute,
        private globals: Globals
    ) {
        this.propertyUpdateForm = this.createFormGroup();
    }

    ngOnInit() {

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
            phoneTwo: ['', [
            ]],
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
    }

    getPropertyType() {
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
                this.getPropertyOperation();
            } else {
            }
        }, (err) => console.error('Failed! ' + err));
    }

    getPropertyOperation() {
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
                this.getPropertyDetail();
            } else {
            }
        }, (err) => console.error('Failed! ' + err));
    }

    getPropertyDetail() {
        this.spinner.show();
        let propertyId;
        this.urlBase = this.globals.urlImage;
        this.route.queryParams
            .subscribe(params => {
                propertyId = params.propertyId;
            });

        this.propertyService.getPropertyUpdateDetail(propertyId).subscribe(data => {
            if (data.code == 100) {
                Object.keys(this.propertyUpdateForm.controls).forEach(name => {
                    if (this.propertyUpdateForm.controls[name]) {
                        this.propertyUpdateForm.controls[name].patchValue(data.result[name]);
                    }
                });
                this.orderImage(data.result.propertyImage);
                this.spinner.hide();
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    orderImage(images) {
        (images).forEach(image => {
            if (image.order == 1) this.croppedImage1 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 2) this.croppedImage2 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 3) this.croppedImage3 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 4) this.croppedImage4 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 5) this.croppedImage5 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 6) this.croppedImage6 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 7) this.croppedImage7 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 8) this.croppedImage8 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 9) this.croppedImage9 = 'data:image/jpg;base64,' + image.url;
            if (image.order == 10) this.croppedImage10 = 'data:image/jpg;base64,' + image.url;
        });
    }

    get f() { return this.propertyUpdateForm.controls; }

    createFormGroup() {
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
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 5;
    }

    onUpdateProperty() {
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
                    .subscribe(data => {
                        console.log(data);
                        if (data.code == 100) {
                            setTimeout(() => {
                                this.toasterService.showToaster('Se edito el inmueble correctamente.');
                                this.spinner.hide();
                                this.router.navigate(['/property']);
                            }, 300);
                        } else {
                            setTimeout(() => {
                                this.toasterService.showToaster('Error al editar inmueble.');
                                this.spinner.hide();
                            }, 300);
                        }
                    }, (err) => console.error('Failed! ' + err));
            }
        } else
            this.toasterService.showToaster('Debe cargar almenos 2 imagenes del Inmueble.');
    }

    openCutDialog(event: any, numberImage: number): void {
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type:'publish' };
        const dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });

        dialogRef.afterClosed().subscribe(result => {
            switch (result.numberImage) {
                case 1:
                    this.croppedImage1 = result.imageSRC;
                    break;
                case 2:
                    this.croppedImage2 = result.imageSRC;
                    break;
                case 3:
                    this.croppedImage3 = result.imageSRC;
                    break;
                case 4:
                    this.croppedImage4 = result.imageSRC;
                    break;
                case 5:
                    this.croppedImage5 = result.imageSRC;
                    break;
                case 6:
                    this.croppedImage6 = result.imageSRC;
                    break;
                case 7:
                    this.croppedImage7 = result.imageSRC;
                    break;
                case 8:
                    this.croppedImage8 = result.imageSRC;
                    break;
                case 9:
                    this.croppedImage9 = result.imageSRC;
                    break;
                case 10:
                    this.croppedImage10 = result.imageSRC;
                    break;
            }
        });
    }

    imagesValidate() {
        let counter: number = 0;
        if (this.croppedImage1 !== '') counter++;
        if (this.croppedImage2 !== '') counter++;
        if (this.croppedImage3 !== '') counter++;
        if (this.croppedImage4 !== '') counter++;
        if (this.croppedImage5 !== '') counter++;
        if (this.croppedImage6 !== '') counter++;
        if (this.croppedImage7 !== '') counter++;
        if (this.croppedImage8 !== '') counter++;
        if (this.croppedImage9 !== '') counter++;
        if (this.croppedImage10 !== '') counter++;
        return counter;
    }

    removeImage(numberImage) {
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
    }

    fileChangeEvent(event: any, imageNumber: number): void {
        this.openCutDialog(event, imageNumber);
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

    options: SelectOption[] = [
        { value: 0, viewValue: 'n/a' },
        { value: 1, viewValue: '1' },
        { value: 2, viewValue: '2' },
        { value: 3, viewValue: '3' },
        { value: 4, viewValue: '4' },
        { value: 5, viewValue: '5 o más' },
    ];
}