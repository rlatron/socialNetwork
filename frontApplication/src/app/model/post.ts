import { User } from "./user";

export class Post {
  constructor(
    private author: User,
    private text: string,
    private date: Date
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
}