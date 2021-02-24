import { Component, Inject, EventEmitter, Output, Optional, OnInit } from '@angular/core';
import { MatButtonModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconModule, MatBottomSheet } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../service/login.service';
import { ToasterService } from '../../service/toaster.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    passwordRecoverForm: FormGroup;
    submitted = false;
    matcher = new MyErrorStateMatcher();
    isLogin = true;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        @Optional() public dialogRef: MatDialogRef<LoginComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public sessionActive: boolean,
        @Optional() @Inject(MAT_DIALOG_DATA) public userName: string,
        @Optional() @Inject(MAT_DIALOG_DATA) public viewUsers: boolean,
        private loginService: LoginService,
        private spinner: NgxSpinnerService,
        private toasterService: ToasterService
    ) {
        this.loginForm = this.createFormGroup();
        this.passwordRecoverForm = this.createPasswordRecoverFormGroup();
    }

    ngOnInit() {
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
    }

    get f() { return this.loginForm.controls; }

    createFormGroup() {
        return new FormGroup({
            login: new FormGroup({
                email: new FormControl(),
                password: new FormControl()
            })
        });
    }

    createPasswordRecoverFormGroup() {
        return new FormGroup({
            passwordRecover: new FormGroup({
                email: new FormControl(),
                password: new FormControl()
            })
        });
    }

    onNoClick(): void {
        this.dialogRef.close({ sessionActive: this.sessionActive, userName: this.userName, viewUsers: this.viewUsers });
    }

    onLogin() {
        this.submitted = true;
        if (!this.loginForm.invalid) {
            this.spinner.show();
            this.loginService.setLogin(this.loginForm.value)
                .subscribe(data => {
                    if (data.code == 100) {
                        localStorage.setItem('currentUser', JSON.stringify(data.result));
                        this.sessionActive = true;
                        this.userName = data.result.name;
                        this.viewUsers = data.result.viewUsers;
                        setTimeout(() => {
                            this.router.navigate(['/home']);
                            this.spinner.hide();
                            this.onNoClick();
                        }, 300);
                    } else {
                        this.sessionActive = false;
                        setTimeout(() => {
                            this.toasterService.showToaster(data.message);
                            this.spinner.hide();
                        }, 300);
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }

    onRecover() {
        this.submitted = true;
        if (!this.passwordRecoverForm.invalid) {
            this.spinner.show();
            this.loginService.passwordRecover(this.passwordRecoverForm.value.email)
                .subscribe(data => {
                    if (data.code == 100) {
                        this.toasterService.showToaster('Se ha enviado un correo a la dirección registrada.');
                        this.spinner.hide();
                        this.onNoClick();
                    } else if (data.code == -50) {
                        this.toasterService.showToaster('Correo eléctronico no registrado.');
                        this.spinner.hide();
                    } else {
                        this.toasterService.showToaster('Error al recuperar cuenta.');
                        this.spinner.hide();
                    }
                }, (err) => console.error('Failed! ' + err));
        }
    }
}