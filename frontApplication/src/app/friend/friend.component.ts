import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { WebSocketService } from '../services/webSocketService';
import { ChatMessage } from '../model/chatMessage';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss'
})

export class FriendComponent {
  @Input({ required: true })
  currentUser: User;

  @Input({ required: true })
  friend: User;

  sessionId: string;
  messageList: any[] = [];
  isChatVisible: boolean;
  messageInput: string = '';

  constructor(public webSocketService: WebSocketService) {
    this.isChatVisible = false;
  }
  
  formatSessionId(): void {
      const min = Math.min(this.currentUser.id, this.friend.id);
      const max = Math.max(this.currentUser.id, this.friend.id);
      this.sessionId = (`${min},${max}`);
  }

  ngOnInit(): void {
    this.formatSessionId();
    this.webSocketService.connect(this.sessionId);
    this.webSocketService.joinChat(this.sessionId);
    this.listenToMessages();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect(this.sessionId);
  }

  sendMessage(message: string): void {
    const chatMessage = {
      text: message,
      from: this.currentUser.id,
    }as ChatMessage
    this.webSocketService.sendMessage(this.sessionId, chatMessage);
    this.messageInput = '';
  }

  listenToMessages() {
    this.webSocketService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.from == this.currentUser.id ? 'sender': 'receiver'
      }))
    });
  }

  openChat(): void {
    this.isChatVisible = true;
  }
  closeChat(): void {
    this.isChatVisible = false;
  }
}
