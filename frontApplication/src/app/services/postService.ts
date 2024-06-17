import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { Post } from "../model/post";
import {  Observable, map, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostService {  

    constructor(
        private http: HttpClient
    ) { }

    makePost(post: Post): Observable<Post[]> {
        return this.http.post<any>(`${environment.apiUrlPost}/new`, post).pipe(
            switchMap(() => this.getFeed())
        );
    }

    getFeed() {
        return this.http.get<any[]>(`${environment.apiUrlPost}/feed`).pipe(
            map(postArray => postArray.map(data => new Post(data.author, data.text, data.date)))
        );
    }
}