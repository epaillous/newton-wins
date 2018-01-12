export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;


  get valid() {
    return !!(this.firstName && this.lastName && this.email && this.password);
  }
}
