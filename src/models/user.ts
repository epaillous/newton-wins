export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  get valid() {
    return !!(this.firstName && this.lastName && this.email && this.password);
  }
}
