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
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../service/login.service';
import { ToasterService } from '../../service/toaster.service';
import { Router } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, formBuilder, dialogRef, sessionActive, userName, viewUsers, loginService, spinner, toasterService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.sessionActive = sessionActive;
        this.userName = userName;
        this.viewUsers = viewUsers;
        this.loginService = loginService;
        this.spinner = spinner;
        this.toasterService = toasterService;
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.isLogin = true;
        this.loginForm = this.createFormGroup();
        this.passwordRecoverForm = this.createPasswordRecoverFormGroup();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', [
                    Validators.required,
                    Validators.email
                ]],
            password: ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(50)
                ]]
        });
        this.passwordRecoverForm = this.formBuilder.group({
            email: ['', [
                    Validators.required,
                    Validators.email
                ]]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            login: new FormGroup({
                email: new FormControl(),
                password: new FormControl()
            })
        });
    };
    LoginComponent.prototype.createPasswordRecoverFormGroup = function () {
        return new FormGroup({
            passwordRecover: new FormGroup({
                email: new FormControl(),
                password: new FormControl()
            })
        });
    };
    LoginComponent.prototype.onNoClick = function () {
        this.dialogRef.close({ sessionActive: this.sessionActive, userName: this.userName, viewUsers: this.viewUsers });
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.submitted = true;
        if (!this.loginForm.invalid) {
            this.spinner.show();
            this.loginService.setLogin(this.loginForm.value)
                .subscribe(function (data) {
                if (data.code == 100) {
                    localStorage.setItem('currentUser', JSON.stringify(data.result));
                    _this.sessionActive = true;
                    _this.userName = data.result.name;
                    _this.viewUsers = data.result.viewUsers;
                    setTimeout(function () {
                        _this.router.navigate(['/home']);
                        _this.spinner.hide();
                        _this.onNoClick();
                    }, 300);
                }
                else {
                    _this.sessionActive = false;
                    setTimeout(function () {
                        _this.toasterService.showToaster(data.message);
                        _this.spinner.hide();
                    }, 300);
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    LoginComponent.prototype.onRecover = function () {
        var _this = this;
        this.submitted = true;
        if (!this.passwordRecoverForm.invalid) {
            this.spinner.show();
            this.loginService.passwordRecover(this.passwordRecoverForm.value.email)
                .subscribe(function (data) {
                if (data.code == 100) {
                    _this.toasterService.showToaster('Se ha enviado un correo a la dirección registrada.');
                    _this.spinner.hide();
                    _this.onNoClick();
                }
                else if (data.code == -50) {
                    _this.toasterService.showToaster('Correo eléctronico no registrado.');
                    _this.spinner.hide();
                }
                else {
                    _this.toasterService.showToaster('Error al recuperar cuenta.');
                    _this.spinner.hide();
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
        }),
        __param(2, Optional()),
        __param(3, Optional()), __param(3, Inject(MAT_DIALOG_DATA)),
        __param(4, Optional()), __param(4, Inject(MAT_DIALOG_DATA)),
        __param(5, Optional()), __param(5, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Router,
            FormBuilder,
            MatDialogRef, Boolean, String, Boolean, LoginService,
            NgxSpinnerService,
            ToasterService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map