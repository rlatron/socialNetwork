import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authenticationService';
import { User } from '../model/user';
import { PossibleConnection } from '../model/possible-connection';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})  
export class HomeComponent {
  user: User;
  friends: User[] = [];
  possibleConnections: PossibleConnection[] = [];
  friendRequests: PossibleConnection[] = [];

  constructor (
    private authenticationService: AuthenticationService
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {}

  logout() : void {
    this.authenticationService.logout();  
  }

}
