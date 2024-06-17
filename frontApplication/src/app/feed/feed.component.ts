import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/postService';
import { Post } from '../model/post';
import { User } from '../model/user';
import { PostComponent } from "../post/post.component";

@Component({
    selector: 'app-feed',
    standalone: true,
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.css',
    imports: [FormsModule, PostComponent]
})
export class FeedComponent {

  currentUser: User;
  message: string = '';
  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.postService.getFeed().subscribe({
      next: next => {
        this.posts = next;
      },
      error: error => {
        console.error('Error making GET request:', error);
        const errorElement = document.getElementById("error-message-posts");
        errorElement.textContent = "An error occured while loading the most recent posts";
      }
    });    
  }

  makePost() {
    if (this.message.trim()) {
      const post: Post = new Post(this.currentUser, this.message, new Date);
      this.postService.makePost(post).subscribe({
        next: next => {
          this.message = '';
          this.posts = next;
        },
        error: error => {
          console.error('Error making POST request:', error);}
      });
    }
  }

}
