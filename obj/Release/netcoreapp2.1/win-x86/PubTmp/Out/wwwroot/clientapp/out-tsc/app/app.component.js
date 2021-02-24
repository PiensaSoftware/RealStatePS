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
import { Router } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { LoginComponent } from './components/shared/login.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from './service/toaster.service';
import { LoginService } from './service/login.service';
import { PropertyService } from './service/property.service';
import { Globals } from './app.global';
import { WelcomeComponent } from './components/shared/welcome.component';
var AppComponent = /** @class */ (function () {
    function AppComponent(propertyService, dialog, spinner, toasterService, globals, router, loginService, bottomSheet) {
        this.propertyService = propertyService;
        this.dialog = dialog;
        this.spinner = spinner;
        this.toasterService = toasterService;
        this.globals = globals;
        this.router = router;
        this.loginService = loginService;
        this.bottomSheet = bottomSheet;
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
        this.properties = [];
        this.urlBase = "";
        this.userName = "";
        this.currentSession = localStorage.getItem('currentUser');
        this.sessionActive = false;
        this.viewUsers = false;
    }
    AppComponent.prototype.onActivate = function (event) {
        window.scroll(0, 0);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentSession != null) {
            this.sessionActive = true;
            var user = JSON.parse(this.currentSession);
            this.userName = user.name;
            this.viewUsers = user.viewUsers;
        }
        else
            this.sessionActive = false;
        this.urlBase = this.globals.urlImage;
        this.propertyService.getProperties(1).subscribe(function (data) {
            if (data.code == 100) {
                _this.properties = data.result;
            }
            else {
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    AppComponent.prototype.openLoginDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(LoginComponent, {
            width: '500px',
            data: this.sessionActive
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result !== undefined) {
                _this.sessionActive = result.sessionActive;
                _this.userName = result.userName;
                _this.viewUsers = result.viewUsers;
                if (_this.sessionActive) {
                    _this.bottomSheet.open(WelcomeComponent);
                    setTimeout(function () {
                        _this.bottomSheet.dismiss();
                    }, 2000);
                }
            }
        });
    };
    AppComponent.prototype.viewProperty = function (propertyId) {
        this.router.navigate(['/propertyDetail'], { queryParams: { propertyId: propertyId } });
    };
    AppComponent.prototype.closeSession = function () {
        var _this = this;
        this.spinner.show();
        this.loginService.logout();
        this.sessionActive = false;
        this.viewUsers = false;
        this.userName = "";
        setTimeout(function () {
            _this.toasterService.showToaster('Sesion cerrada correctamente.');
            _this.spinner.hide();
        }, 300);
    };
    AppComponent.prototype.subscribe = function () {
        this.toasterService.showToaster('Se ha suscrito correctamente.');
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [PropertyService,
            MatDialog,
            NgxSpinnerService,
            ToasterService,
            Globals,
            Router,
            LoginService,
            MatBottomSheet])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map