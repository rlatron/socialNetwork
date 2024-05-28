import { Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { inject } from '@angular/core';
import { AuthenticationService } from './services/authenticationService';
import { FeedComponent } from './feed/feed.component';
import { FriendsListComponent } from './friends-list/friends-list.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch:'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: SubscriptionFormComponent },
    { path: 'home', component: HomeComponent, canActivate: [() => inject(AuthenticationService).isAuthenticated()],
     children: [
        { path: '', redirectTo: 'feed', pathMatch: 'full' },
        { path: 'feed', component: FeedComponent, canActivate: [() => inject(AuthenticationService).isAuthenticated()] },
        { path: 'friends-list', component: FriendsListComponent, canActivate: [() => inject(AuthenticationService).isAuthenticated()] }
    ] },
        ];
