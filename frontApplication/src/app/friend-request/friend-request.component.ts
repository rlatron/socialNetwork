import { Component, Input } from '@angular/core';
import { PossibleConnection } from '../model/possible-connection';
import { User } from '../model/user';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-friend-request',
  standalone: true,
  imports: [],
  templateUrl: './friend-request.component.html',
  styleUrl: './friend-request.component.css'
})
export class FriendRequestComponent {
@Input({ required: true })
friendRequest: PossibleConnection;

@Input({ required: true })
currentUser: User;

isVisible: boolean;

constructor(private userService: UserService) {
  this.isVisible = true;
}

addFriend(): void {
  this.userService.addFriend(this.currentUser.id, this.friendRequest.user.id)
    .subscribe({
      next: () => {
        this.isVisible = false;
      },
      error: error => {
        console.error('Error making POST request:', error);}
    });
}

}
