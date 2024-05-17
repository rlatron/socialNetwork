import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../model/chatMessage';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './message.Service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(public messageService: MessageService) {
  }
  
  private stompClients: Map<string, any> = new Map();
  private messageSubjects: Map<string, BehaviorSubject<ChatMessage[]>> = new Map();
  connect(sessionId: string) {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);
    const messageSubject = new BehaviorSubject<ChatMessage[]>([]);
    this.messageService.getMessages(sessionId).subscribe(messages => {
      messageSubject.next(messages);
    });

    this.stompClients.set(sessionId, stompClient);
    this.messageSubjects.set(sessionId, messageSubject);
  }

  joinChat(sessionId: string) {
    const stompClient = this.stompClients.get(sessionId);
    const messageSubject = this.messageSubjects.get(sessionId);
    if (stompClient && messageSubject) {
      stompClient.connect({}, ()=>{
        stompClient.subscribe(`/topic/${sessionId}`, (messages: any) => {
            const messageContent = JSON.parse(messages.body);
            console.log(messageContent);
            const currentMessage = messageSubject.getValue();
            currentMessage.push(messageContent);
    
            messageSubject.next(currentMessage);
        })
      })
    } else {
      console.error(`No connection found for: ${sessionId}`);
    }
  }

  sendMessage(sessionId: string, message: ChatMessage) {
    const stompClient = this.stompClients.get(sessionId);
    if (stompClient && stompClient.connected) {
      stompClient.send(`/app/chat/${sessionId}`, {}, JSON.stringify(message));
    } else {
      console.error(`No connected client found for user ID: ${sessionId}`);
    }
  }

  getMessageSubject(sessionId: string){
    return this.messageSubjects.get(sessionId).asObservable();
  }

  disconnect(sessionId: string) {
    const stompClient = this.stompClients.get(sessionId);
    const messageSubject = this.messageSubjects.get(sessionId);
    if (stompClient && messageSubject) {
      stompClient.disconnect(() => {
        console.log(`Disconnected from chat with user ID: ${sessionId}`);
        this.stompClients.delete(sessionId);
        this.messageSubjects.delete(sessionId);
      });
    } else {
      console.error(`No connection found for user ID: ${sessionId}`);
    }
  }
}