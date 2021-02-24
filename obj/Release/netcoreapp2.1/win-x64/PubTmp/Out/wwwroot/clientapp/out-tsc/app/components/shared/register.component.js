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
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { RegisterService } from '../../service/register.service';
import { ToasterService } from '../../service/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CutImageComponent } from './cut-image.component';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(dialog, spinner, registerService, formBuilder, toasterService, router) {
        this.dialog = dialog;
        this.spinner = spinner;
        this.registerService = registerService;
        this.formBuilder = formBuilder;
        this.toasterService = toasterService;
        this.router = router;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.currentSession = localStorage.getItem('currentUser');
        this.btnAccept = true;
        this.panelOpenState = false;
        this.croppedImage = '';
        this.registerForm = this.createFormGroup();
    }
    RegisterComponent.prototype.ngOnInit = function () {
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
            secondLastName: ['', []],
            phoneOne: ['', [
                    Validators.required
                ]],
            phoneTwo: ['', []],
            webSite: ['', []],
            company: ['', []],
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
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.createFormGroup = function () {
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
    };
    RegisterComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    };
    RegisterComponent.prototype.accept = function () {
        this.btnAccept = !this.btnAccept;
    };
    RegisterComponent.prototype.onRegister = function () {
        var _this = this;
        this.submitted = true;
        if (!this.registerForm.invalid) {
            this.spinner.show();
            this.registerForm.value.avatar = this.croppedImage;
            this.registerService.setRegister(this.registerForm.value)
                .subscribe(function (data) {
                console.log(data);
                if (data.code == 100) {
                    setTimeout(function () {
                        _this.toasterService.showToaster('Se ha enviado un correo a la dirección ingresada para completar el registro.');
                        _this.spinner.hide();
                        _this.router.navigate(['/home']);
                    }, 300);
                }
                else {
                    setTimeout(function () {
                        _this.toasterService.showToaster(data.message);
                        _this.spinner.hide();
                    }, 300);
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    RegisterComponent.prototype.removeImage = function () {
        this.croppedImage = '';
    };
    RegisterComponent.prototype.fileChangeEvent = function (event, imageNumber) {
        this.openCutDialog(event, imageNumber);
    };
    RegisterComponent.prototype.openCutDialog = function (event, numberImage) {
        var _this = this;
        this.cropImage = { event: event, numberImage: numberImage, imageSRC: '', type: 'register' };
        var dialogRef = this.dialog.open(CutImageComponent, {
            width: '500px',
            data: this.cropImage
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.croppedImage = result.imageSRC;
        });
    };
    RegisterComponent = __decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html'
        }),
        __metadata("design:paramtypes", [MatDialog,
            NgxSpinnerService,
            RegisterService,
            FormBuilder,
            ToasterService,
            Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map