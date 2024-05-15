import { User } from "./user";

export class PossibleConnection {
    constructor(
      public user: User,
      public friendsInCommon: number
    ) {}
  }