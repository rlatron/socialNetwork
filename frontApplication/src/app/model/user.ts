export class User {
    authdata?: string;
    constructor(
      public name: string,
      private password: string,
      private email: string,
      private _id?: number
    ) {}

    public get id(): number {
      return this._id;
    }
  }