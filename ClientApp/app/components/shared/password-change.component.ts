import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../service/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';
import { LoginService } from '../../service/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';

@Component({
    selector: 'app-password-change',
    templateUrl: './password-change.component.html',
})
export class PasswordChangeComponent implements OnInit {

    passwordChangeForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    code = "";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private registerService: RegisterService,
        private loginService: LoginService,
        private toasterService: ToasterService,
        private spinner: NgxSpinnerService,
        private router: Router) {
        this.passwordChangeForm = this.createFormGroup();
    }

    ngOnInit() {
        this.spinner.show();
        this.route.queryParams
            .subscribe(params => {
                this.codeCheck(params.code);
                this.code = params.code;
            });

        this.passwordChangeForm = this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50)
            ]],
            confirmPassword: ['', []],
        }, { validator: this.checkPasswords });
    }

    get f() { return this.passwordChangeForm.controls; }

    checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;

        return pass === confirmPass ? null : { notSame: true }
    }

    createFormGroup() {
        return new FormGroup({
            passwordChange: new FormGroup({
                confirmPassword: new FormControl(),
                password: new FormControl()
            })
        });
    }

    codeCheck(code) {
        this.loginService.codeCheck(code).subscribe(data => {
            if (data.code == 100) {
                if (!data.result) {
                    this.toasterService.showToaster('El link de para recuperar la contraseña es invalido o ha caducado.');
                    this.router.navigate(['/home']);
                    this.spinner.hide();
                }
                this.spinner.hide();
            } else {
                this.toasterService.showToaster('Error al recuperar cuenta.');
                this.router.navigate(['/home']);
                this.spinner.hide();
            }
        }, (err) => console.error('Failed! ' + err));
    }

    passwordChange() {
        this.submitted = true;
        if (!this.passwordChangeForm.invalid) {
            this.spinner.show();
            var model = {
                password: this.passwordChangeForm.value.password,
                code: this.code
            }
            this.loginService.setNewPassword(model)
                .subscribe(data => {
                    if (data.code == 100) {
                        this.toasterService.showToaster('Se ha cambiado la contraseña correctamente.');
                        this.spinner.hide();
                        this.router.navigate(['/home']);
                    } else {
                        this.toasterService.showToaster('Error al cambiar contraseña.');
                        this.spinner.hide();
                        this.router.navigate(['/home']);
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }
}