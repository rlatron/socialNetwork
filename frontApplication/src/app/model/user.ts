export class User {
    authdata?: string;
    constructor(
      public name: string,
      public password: string,
      public email: string,
      public id?: number
    ) {}
  }