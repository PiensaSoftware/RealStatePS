import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../service/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';

@Component({
    selector: 'app-account-activate',
    templateUrl: './account-activate.component.html',
})
export class AccountActivateComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private registerService: RegisterService,
        private toasterService: ToasterService,
        private spinner: NgxSpinnerService,
        private router: Router) {
    }

    ngOnInit() {
        this.spinner.show();
        this.route.queryParams
            .subscribe(params => {
                this.accountActivate(params.code);
            });
    }

    accountActivate(code) {
        this.registerService.accountActivate(code).subscribe(data => {
            if (data.code == 100) {
                this.toasterService.showToaster('Se activo la cuenta correctamente, ya puedes iniciar sesión.');
                this.router.navigate(['/home']);
                this.spinner.hide();
            } else if (data.code == -50) {
                this.toasterService.showToaster('La cuenta ya ha sido activada.');
                this.router.navigate(['/home']);
                this.spinner.hide();
            } else {
                this.toasterService.showToaster('Error al activar cuenta.');
                this.router.navigate(['/home']);
                this.spinner.hide();
            }
        }, (err) => console.error('Failed! ' + err));
    }
}