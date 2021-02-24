import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../service/toaster.service';
import { SelectOption } from '../../model/selectOption.model';
import { MatButtonModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CutImageComponent } from '../shared/cut-image.component';
import { CropImage } from '../../model/cropImage.model';
import { PropertyService } from '../../service/property.service';
import { PropertyTypeService } from '../../service/propertyType.service';
import { PropertyOperationService } from '../../service/propertyOperation.service';
import { AllRoutes } from '../../app.route';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { PropertyDetailService } from 'ClientApp/app/service/propertyDetail.service';
@Component({
    selector: 'app-publish',
    templateUrl: './publish.component.html'
})
export class PublishComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';

    cropImage: CropImage;
    breakpoint: any;
    publishForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    propertyTypes: SelectOption[] = [];
    propertyOperations: SelectOption[] = [];
    currentSession = localStorage.getItem('currentUser');
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
        private userService: UserService,
        private propertyDetailService: PropertyDetailService) {
    }

    ngOnInit() {
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
            phoneTwo: ['', [
            ]],
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            webSite: ['', []],
            company: ['', []],
        });

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

        let user = JSON.parse(this.currentSession);
        this.userService.getUser(user.id).subscribe(data => {
            if (data.code == 100) {
                this.publishForm.controls['phoneOne'].patchValue(data.result.phoneOne);
                this.publishForm.controls['phoneTwo'].patchValue(data.result.phoneTwo);
                this.publishForm.controls['webSite'].patchValue(data.result.webSite);
                this.publishForm.controls['company'].patchValue(data.result.company);
                this.publishForm.controls['email'].patchValue(data.result.user.email);
            } else {
            }
        }, (err) => console.error('Failed! ' + err));

        this.spinner.hide();
    }

    get f() { return this.publishForm.controls; }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 5;
    }

    onPublish() {
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
                    .subscribe(data => {
                        console.log(data);
                        if (data.code == 100) {
                            setTimeout(() => {
                                this.toasterService.showToaster('Se publico el inmueble correctamente.');
                                this.spinner.hide();
                                this.router.navigate(['/property']);
                                this.getPropertyDetail(data.result);
                            }, 300);
                        } else {
                            setTimeout(() => {
                                this.toasterService.showToaster('Error al crear inmueble.');
                                this.spinner.hide();
                            }, 300);
                        }
                    }, (err) => console.error('Failed! ' + err));
            }
        } else
            this.toasterService.showToaster('Debe cargar por lo menos 2 imagenes del Inmueble.');
    }

    getPropertyDetail(propertyId) {
        this.propertyService.getPropertyDetail(propertyId).subscribe(data => {
            if (data.code == 100) {
                this.sendDetail(data.result);
            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    sendDetail(property) {
        var doc = this.propertyDetailService.buildPdf(property);
        var binary = doc.output();
        var pdf = binary ? btoa(binary) : "";

        var model = {
            email: null,
            name: 'DetallePropiedad-' + property.id + '.pdf',
            pdf: pdf,
            id: property.id.toString()
        };
        this.propertyService.send(model).subscribe(data => {
            if (data.code == 100) {

            } else {

            }
        }, (err) => console.error('Failed! ' + err));
    }

    openCutDialog(event: any, numberImage: number): void {
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type: 'publish' };
        const dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined)
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

    options: SelectOption[] = [
        { value: '0', viewValue: 'n/a' },
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5 o más' },
    ];
}
