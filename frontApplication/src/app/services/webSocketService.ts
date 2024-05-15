import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../model/chatMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClients: Map<string, any> = new Map();
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  connect(sessionId: string) {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    this.stompClients.set(sessionId, stompClient);
  }

  joinChat(sessionId: string) {
    const stompClient = this.stompClients.get(sessionId);
    if (stompClient) {
      stompClient.connect({}, ()=>{
        stompClient.subscribe(`/topic/${sessionId}`, (messages: any) => {
            const messageContent = JSON.parse(messages.body);
            console.log(messageContent);
            const currentMessage = this.messageSubject.getValue();
            currentMessage.push(messageContent);
    
            this.messageSubject.next(currentMessage);
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

  getMessageSubject(){
    console.log("Getting message subject");
    return this.messageSubject.asObservable();
  }

  disconnect(sessionId: string) {
    const stompClient = this.stompClients.get(sessionId);
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log(`Disconnected from chat with user ID: ${sessionId}`);
        this.stompClients.delete(sessionId);
      });
    } else {
      console.error(`No connection found for user ID: ${sessionId}`);
    }
  }
}