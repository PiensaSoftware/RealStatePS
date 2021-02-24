import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/shared/register.component';
import { PublishComponent } from './components/publish/publish.component';
import { PropertyComponent } from './components/property/property.component';
import { PropertyDetailComponent } from './components/property/property-detail.component';
import { PropertyUpdateComponent } from './components/property/property-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountActivateComponent } from './components/shared/account-activate.component';
import { PasswordChangeComponent } from './components/shared/password-change.component';
import { PrivacityComponent } from './components/legal/privacity.component';
import { TermsComponent } from './components/legal/terms.component';
import { UserComponent } from './components/account/user.component';
export var AllRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'publish', component: PublishComponent },
    { path: 'passwordChange', component: PasswordChangeComponent },
    { path: 'accountActivate', component: AccountActivateComponent },
    { path: 'property', component: PropertyComponent },
    { path: 'propertyDetail', component: PropertyDetailComponent },
    { path: 'propertyUpdate', component: PropertyUpdateComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'privacity', component: PrivacityComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'user', component: UserComponent },
];
//# sourceMappingURL=app.route.js.map