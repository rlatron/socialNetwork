import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../environment';
import { PossibleConnection } from '../model/possible-connection';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getFriends(id: number) {
        let params = new HttpParams()
        .set('id', id);

        return this.http.get<User[]>(`${environment.apiUrl}/friends/${id}`);
    }

    getPossibleConnections(id: number) {
        let params = new HttpParams()
        .set('id', id);

        return this.http.get<PossibleConnection[]>(`${environment.apiUrl}/possibleConnections/${id}`);
    }

    getFriendRequests(id: number) {
        let params = new HttpParams()
        .set('id', id);

        return this.http.get<PossibleConnection[]>(`${environment.apiUrl}/friendRequests/${id}`);
    }

    requestFriend(id: number, idFriend: number) {
        let params = new HttpParams()
        .set('id', id)
        .set('idFriend', idFriend);

        return this.http.post<any>(`${environment.apiUrl}/requestFriend/${id}/${idFriend}`, {});
    }

    addFriend(id: number, idFriend: number) {
        let params = new HttpParams()
        .set('id', id)
        .set('idFriend', idFriend);

        return this.http.post<any>(`${environment.apiUrl}/addFriend/${id}/${idFriend}`, {});
    }
}