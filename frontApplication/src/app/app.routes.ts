import { Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authenticationService';

export const routes: Routes = [
    { path: '', redirectTo:'login', pathMatch:'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'home', component: HomeComponent, canActivate: [() => inject(AuthenticationService).isAuthenticated()] },
    { path: 'register', component: SubscriptionFormComponent }
    ];
