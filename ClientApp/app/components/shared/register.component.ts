import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Validators, FormGroup, FormBuilder, FormsModule, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { RegisterService } from '../../service/register.service';
import { ToasterService } from '../../service/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CropImage } from 'ClientApp/app/model/cropImage.model';
import { CutImageComponent } from './cut-image.component';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';

    registerForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    currentSession = localStorage.getItem('currentUser');
    btnAccept = true;
    panelOpenState = false;
    croppedImage: any = '';
    cropImage: CropImage;

    constructor(
        private dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private registerService: RegisterService,
        private formBuilder: FormBuilder,
        private toasterService: ToasterService,
        private router: Router) {
        this.registerForm = this.createFormGroup();
    }

    ngOnInit() {
        if (this.currentSession != null)
            this.router.navigate(['/home']);

        this.spinner.show();
        this.registerForm = this.formBuilder.group({
            name: ['', [
                Validators.required
            ]],
            lastName: ['', [
                Validators.required
            ]],
            secondLastName: ['', [
            ]],
            phoneOne: ['', [
                Validators.required
            ]],
            phoneTwo: ['', [
            ]],
            webSite: ['', [
            ]],
            company: ['', [
            ]],
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(50)
            ]],
            confirmPassword: ['', []],
        }, { validator: this.checkPasswords });
        this.spinner.hide();
    }

    get f() { return this.registerForm.controls; }
    createFormGroup() {
        return new FormGroup({
            user: new FormGroup({
                name: new FormControl(),
                lastName: new FormControl(),
                secondLastName: new FormControl(),
                email: new FormControl(),
                password: new FormControl(),
                confirmPassword: new FormControl(),
                phoneOne: new FormControl(),
                phoneTwo: new FormControl(),
                webSite: new FormControl(),
                company: new FormControl()
            })
        });
    }

    checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    accept() {
        this.btnAccept = !this.btnAccept;
    }

    onRegister() {
        this.submitted = true;
        if (!this.registerForm.invalid) {
            this.spinner.show();
            this.registerForm.value.avatar = this.croppedImage;
            this.registerService.setRegister(this.registerForm.value)
                .subscribe(data => {
                    console.log(data);
                    if (data.code == 100) {
                        setTimeout(() => {
                            this.toasterService.showToaster('Se ha enviado un correo a la dirección ingresada para completar el registro.');
                            this.spinner.hide();
                            this.router.navigate(['/home']);
                        }, 300);
                    } else {
                        setTimeout(() => {
                            this.toasterService.showToaster(data.message);
                            this.spinner.hide();
                        }, 300);
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }

    removeImage() {
        this.croppedImage = '';
    }

    fileChangeEvent(event: any, imageNumber: number): void {
        this.openCutDialog(event, imageNumber);
    }

    openCutDialog(event: any, numberImage: number): void {
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type:'register' };
        const dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });

        dialogRef.afterClosed().subscribe(result => {
            this.croppedImage = result.imageSRC;

        });
    }
}
