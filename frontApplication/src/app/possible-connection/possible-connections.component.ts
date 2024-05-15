import { Component, Input, Output } from '@angular/core';
import { PossibleConnection } from '../model/possible-connection';
import { UserService } from '../services/userService';
import { User } from '../model/user';

@Component({
  selector: 'app-possible-connection',
  standalone: true,
  imports: [],
  templateUrl: './possible-connections.component.html',
  styleUrl: './possible-connections.component.css'
})
export class PossibleConnectionsComponent {  
  @Input({ required: true })
  possibleConnection: PossibleConnection;

  @Input({ required: true })
  currentUser: User;

  isVisible: boolean;
  
  constructor(private userService: UserService) {
    this.isVisible = true;
  }

  requestFriend(): void {
    this.userService.requestFriend(this.currentUser.id, this.possibleConnection.user.id)
      .subscribe({
        next: () => {
          this.isVisible = false;
        },
        error: error => {
          console.error('Error making POST request:', error);}
      });
  }
}
