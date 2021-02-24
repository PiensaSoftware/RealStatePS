import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatStepperModule,
    MatGridListModule,
    MatChipsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatListModule,
    MatNativeDateModule,
    MatSortModule,
    MatTreeModule,
    MatBadgeModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatRadioModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatDatepickerModule
} from '@angular/material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AllRoutes } from './app.route'
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/shared/register.component';
import { LoginComponent } from './components/shared/login.component';
import { AccountActivateComponent } from './components/shared/account-activate.component';
import { PasswordChangeComponent } from './components/shared/password-change.component';
import { PublishComponent } from './components/publish/publish.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertyDetailComponent } from './components/property/property-detail.component';
import { PropertyUpdateComponent } from './components/property/property-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CutImageComponent } from './components/shared/cut-image.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { WelcomeComponent } from './components/shared/welcome.component';
import { TermsComponent } from './components/legal/terms.component';
import { PrivacityComponent } from './components/legal/privacity.component';
import { UserComponent } from './components/account/user.component';
import { SendPropertyComponent } from './components/shared/send-property.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        AccountActivateComponent,
        PasswordChangeComponent,
        PublishComponent,
        PropertyDetailComponent,
        PropertyComponent,
        PropertyUpdateComponent,
        ProfileComponent,
        CutImageComponent,
        WelcomeComponent,
        TermsComponent,
        PrivacityComponent,
        UserComponent,
        SendPropertyComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgxSpinnerModule,
        MatMenuModule,
        ImageCropperModule,
        MatStepperModule,
        MatDividerModule,
        MatGridListModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatExpansionModule,
        RouterModule.forRoot(AllRoutes, { useHash: true })
    ],
    entryComponents: [LoginComponent, CutImageComponent, WelcomeComponent, SendPropertyComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
