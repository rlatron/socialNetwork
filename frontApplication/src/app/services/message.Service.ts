import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment';
import { ChatMessage } from '../model/chatMessage';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(
        private http: HttpClient
    ) { }

    getMessages(sessionId: string) {
        let params = new HttpParams()
        .set('sessionId', sessionId);

        return this.http.get<ChatMessage[]>(`${environment.apiUrlMessage}/${sessionId}`);
    }
}