import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import { Post } from '../model/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input({ required: true })
  currentUser: User;

  @Input({ required: true })
  post: Post;

  authorName: string;

  constructor() {}
}
