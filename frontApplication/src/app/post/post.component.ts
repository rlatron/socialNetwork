import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { Post } from '../model/post';
import { Comment } from '../model/comment';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/postService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input({ required: true })
  currentUser: User;

  @Input({ required: true })
  post: Post;

  authorName: string;
  commentMessage: string = '';
  comments: Comment[] = [];
  isCommentInputVisible: boolean = false;

  constructor(private postService: PostService) {}

  displayInput(): void {
    this.isCommentInputVisible = !this.isCommentInputVisible;
  }  

  makeComment() {
    if (this.commentMessage.trim()) {
      const comment: Comment = new Comment(this.currentUser, this.commentMessage, new Date, this.post);
      this.postService.makeComment(comment).subscribe({
        next: next => {
          this.commentMessage = '';
        },
        error: error => {
          console.error('Error making POST request:', error);}
      });
    }
  }
}
