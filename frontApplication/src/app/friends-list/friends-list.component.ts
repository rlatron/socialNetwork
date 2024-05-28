import { Component } from '@angular/core';
import { FriendComponent } from '../friend/friend.component';
import { User } from '../model/user';
import { UserService } from '../services/userService';
import { PossibleConnection } from '../model/possible-connection';
import { PossibleConnectionsComponent } from '../possible-connection/possible-connections.component';
import { FriendRequestComponent } from '../friend-request/friend-request.component';

@Component({
    selector: 'app-friends-list',
    standalone: true,
    templateUrl: './friends-list.component.html',
    styleUrl: './friends-list.component.css',
    imports: [FriendComponent, FriendRequestComponent, PossibleConnectionsComponent]
})
export class FriendsListComponent {
  user: User;
  friends: User[] = [];
  possibleConnections: PossibleConnection[] = [];
  friendRequests: PossibleConnection[] = [];

  constructor (
    private userService: UserService
    ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.userService.getFriends(this.user.id)
      .subscribe({
        next: next => {
          this.friends = next;
        },
        error: error =>  {
          console.error('Error making GET request:', error);
          const errorElement = document.getElementById("error-message-friends");
          errorElement.textContent = "An error occured while loading your friends";
        }
      });
    
    this.userService.getPossibleConnections(this.user.id)
      .subscribe({
        next: next => {
          this.possibleConnections = next;
        },
        error: error =>  {
          console.error('Error making GET request:', error);
        }
      });
    
    this.userService.getFriendRequests(this.user.id)
      .subscribe({
        next: next => {
          console.log("Getting friend requests")
          this.friendRequests = next;
        },
        error: error =>  {
          console.error('Error making GET request:', error);
        }
      });
  }

}
