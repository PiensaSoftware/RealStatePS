import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material";
import { LoginComponent } from "./login.component";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: 'app-welcome',
    templateUrl: 'welcome.component.html',
})
export class WelcomeComponent {
    constructor(private bottomSheetRef: MatBottomSheetRef<LoginComponent>) {


    }
}