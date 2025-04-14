import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { VerifyDeviceComponent } from './features/verify-device/verify-device.component';
import { ContactComponent } from './layout/contact/contact.component';
import { LoginComponent } from './features/login/login.component';
import { AccountComponent } from './features/account/account.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddItemComponent } from './features/items/add-item/add-item.component';
import { SearchComponent } from './features/search/search.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MentionsLegalesComponent } from './layout/mentions-legales/mentions-legales.component';
import { PrivacyPolicyComponent } from './layout/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './layout/terms-of-use/terms-of-use.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    //{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],},
    //{path: 'verify', component: VerifyDeviceComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'report', component: AddItemComponent},
    {path: 'create-account', component: AccountComponent},
    {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard],},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'search', component: SearchComponent},
    {path: 'login', component: LoginComponent},
    {path: 'reset-password/:token', component: ResetPasswordComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},

    {path: 'mentions-legal', component: MentionsLegalesComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms-of-uses', component: TermsOfUseComponent},

    { path: '**', component: NotFoundComponent }

];
