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

        return this.http.get<User[]>(`${environment.apiUrlUser}/friends/${id}`);
    }

    getPossibleConnections(id: number) {
        let params = new HttpParams()
        .set('id', id);

        return this.http.get<PossibleConnection[]>(`${environment.apiUrlUser}/possibleConnections/${id}`);
    }

    getFriendRequests(id: number) {
        let params = new HttpParams()
        .set('id', id);

        return this.http.get<PossibleConnection[]>(`${environment.apiUrlUser}/friendRequests/${id}`);
    }

    requestFriend(id: number, idFriend: number) {
        let params = new HttpParams()
        .set('id', id)
        .set('idFriend', idFriend);

        return this.http.post<any>(`${environment.apiUrlUser}/requestFriend/${id}/${idFriend}`, {});
    }

    addFriend(id: number, idFriend: number) {
        let params = new HttpParams()
        .set('id', id)
        .set('idFriend', idFriend);

        return this.http.post<any>(`${environment.apiUrlUser}/addFriend/${id}/${idFriend}`, {});
    }
}