import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheet } from '@angular/material';
import { LoginComponent } from './components/shared/login.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './service/toaster.service';
import { LoginService } from './service/login.service';
import { PropertyService } from './service/property.service';
import { Globals } from './app.global';
import { WelcomeComponent } from './components/shared/welcome.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Welcome to Angular';
    subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';

    properties = [];
    urlBase = "";
    userName = "";
    currentSession = localStorage.getItem('currentUser');
    sessionActive: boolean = false;
    viewUsers = false;

    constructor(
        private propertyService: PropertyService,
        public dialog: MatDialog,
        private spinner: NgxSpinnerService,
        private toasterService: ToasterService,
        private globals: Globals,
        private router: Router,
        private loginService: LoginService,
        private bottomSheet: MatBottomSheet) { }

    onActivate(event) {
        window.scroll(0, 0);
    }

    ngOnInit() {
        if (this.currentSession != null) {
            this.sessionActive = true;
            let user = JSON.parse(this.currentSession);
            this.userName = user.name;
            this.viewUsers = user.viewUsers;
        }
        else
            this.sessionActive = false;

        this.urlBase = this.globals.urlImage;
        this.propertyService.getProperties(1).subscribe(data => {
            if (data.code == 100) {
                this.properties = data.result;
            } else {
            }
        }, (err) => console.error('Failed! ' + err));
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
            width: '500px',
            data: this.sessionActive
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.sessionActive = result.sessionActive;
                this.userName = result.userName;
                this.viewUsers = result.viewUsers;

                if (this.sessionActive) {
                    this.bottomSheet.open(WelcomeComponent);

                    setTimeout(() => {
                        this.bottomSheet.dismiss();
                    }, 2000);
                }
            }
        });
    }

    viewProperty(propertyId): void {
        this.router.navigate(['/propertyDetail'], { queryParams: { propertyId: propertyId } });
    }

    closeSession() {
        this.spinner.show();
        this.loginService.logout();
        this.sessionActive = false;
        this.viewUsers = false;
        this.userName = "";
        setTimeout(() => {
            this.toasterService.showToaster('Sesion cerrada correctamente.');
            this.spinner.hide();
        }, 300);
    }

    subscribe() {
        this.toasterService.showToaster('Se ha suscrito correctamente.');
    }
}
