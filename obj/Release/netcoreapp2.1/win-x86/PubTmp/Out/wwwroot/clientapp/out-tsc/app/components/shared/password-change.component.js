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
import { ToasterService } from '../../service/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';
import { LoginService } from '../../service/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
var PasswordChangeComponent = /** @class */ (function () {
    function PasswordChangeComponent(formBuilder, route, registerService, loginService, toasterService, spinner, router) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.registerService = registerService;
        this.loginService = loginService;
        this.toasterService = toasterService;
        this.spinner = spinner;
        this.router = router;
        this.submitted = false;
        this.matcher = new MyErrorStateMatcher();
        this.code = "";
        this.passwordChangeForm = this.createFormGroup();
    }
    PasswordChangeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.route.queryParams
            .subscribe(function (params) {
            _this.codeCheck(params.code);
            _this.code = params.code;
        });
        this.passwordChangeForm = this.formBuilder.group({
            password: ['', [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(50)
                ]],
            confirmPassword: ['', []],
        }, { validator: this.checkPasswords });
    };
    Object.defineProperty(PasswordChangeComponent.prototype, "f", {
        get: function () { return this.passwordChangeForm.controls; },
        enumerable: true,
        configurable: true
    });
    PasswordChangeComponent.prototype.checkPasswords = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { notSame: true };
    };
    PasswordChangeComponent.prototype.createFormGroup = function () {
        return new FormGroup({
            passwordChange: new FormGroup({
                confirmPassword: new FormControl(),
                password: new FormControl()
            })
        });
    };
    PasswordChangeComponent.prototype.codeCheck = function (code) {
        var _this = this;
        this.loginService.codeCheck(code).subscribe(function (data) {
            if (data.code == 100) {
                if (!data.result) {
                    _this.toasterService.showToaster('El link de para recuperar la contraseña es invalido o ha caducado.');
                    _this.router.navigate(['/home']);
                    _this.spinner.hide();
                }
                _this.spinner.hide();
            }
            else {
                _this.toasterService.showToaster('Error al recuperar cuenta.');
                _this.router.navigate(['/home']);
                _this.spinner.hide();
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    PasswordChangeComponent.prototype.passwordChange = function () {
        var _this = this;
        this.submitted = true;
        if (!this.passwordChangeForm.invalid) {
            this.spinner.show();
            var model = {
                password: this.passwordChangeForm.value.password,
                code: this.code
            };
            this.loginService.setNewPassword(model)
                .subscribe(function (data) {
                if (data.code == 100) {
                    _this.toasterService.showToaster('Se ha cambiado la contraseña correctamente.');
                    _this.spinner.hide();
                    _this.router.navigate(['/home']);
                }
                else {
                    _this.toasterService.showToaster('Error al cambiar contraseña.');
                    _this.spinner.hide();
                    _this.router.navigate(['/home']);
                }
            }, function (err) { return console.error('Failed! ' + err); });
        }
    };
    PasswordChangeComponent = __decorate([
        Component({
            selector: 'app-password-change',
            templateUrl: './password-change.component.html',
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            RegisterService,
            LoginService,
            ToasterService,
            NgxSpinnerService,
            Router])
    ], PasswordChangeComponent);
    return PasswordChangeComponent;
}());
export { PasswordChangeComponent };
//# sourceMappingURL=password-change.component.js.map