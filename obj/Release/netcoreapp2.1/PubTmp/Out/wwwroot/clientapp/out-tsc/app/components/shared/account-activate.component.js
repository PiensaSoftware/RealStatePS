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
var AccountActivateComponent = /** @class */ (function () {
    function AccountActivateComponent(route, registerService, toasterService, spinner, router) {
        this.route = route;
        this.registerService = registerService;
        this.toasterService = toasterService;
        this.spinner = spinner;
        this.router = router;
    }
    AccountActivateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.route.queryParams
            .subscribe(function (params) {
            _this.accountActivate(params.code);
        });
    };
    AccountActivateComponent.prototype.accountActivate = function (code) {
        var _this = this;
        this.registerService.accountActivate(code).subscribe(function (data) {
            if (data.code == 100) {
                _this.toasterService.showToaster('Se activo la cuenta correctamente, ya puedes iniciar sesión.');
                _this.router.navigate(['/home']);
                _this.spinner.hide();
            }
            else if (data.code == -50) {
                _this.toasterService.showToaster('La cuenta ya ha sido activada.');
                _this.router.navigate(['/home']);
                _this.spinner.hide();
            }
            else {
                _this.toasterService.showToaster('Error al activar cuenta.');
                _this.router.navigate(['/home']);
                _this.spinner.hide();
            }
        }, function (err) { return console.error('Failed! ' + err); });
    };
    AccountActivateComponent = __decorate([
        Component({
            selector: 'app-account-activate',
            templateUrl: './account-activate.component.html',
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            RegisterService,
            ToasterService,
            NgxSpinnerService,
            Router])
    ], AccountActivateComponent);
    return AccountActivateComponent;
}());
export { AccountActivateComponent };
//# sourceMappingURL=account-activate.component.js.map