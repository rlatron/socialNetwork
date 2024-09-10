import { Post } from "./post";
import { User } from "./user";

export class Comment {
  constructor(
    private author: User,
    private text: string,
    private date: Date,
    private post: Post
  ) { }

  public get authorName(): string {
    return this.author.name;
  }

  public get Text(): string {
    return this.text;
  }

  public get Date(): Date {
    return this.date;
  }

  public get Post(): Post {
    return this.post;
  }

  public get PostId(): number {
    return this.Post.id;
  }
}