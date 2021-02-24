var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var TermsComponent = /** @class */ (function () {
    function TermsComponent() {
        this.title = 'Welcome to Angular';
        this.subtitle = '.NET Core + Angular CLI v6 + Bootstrap & FontAwesome + Swagger Template';
    }
    TermsComponent = __decorate([
        Component({
            selector: 'app-terms',
            templateUrl: './terms.component.html'
        })
    ], TermsComponent);
    return TermsComponent;
}());
export { TermsComponent };
//# sourceMappingURL=terms.component.js.map