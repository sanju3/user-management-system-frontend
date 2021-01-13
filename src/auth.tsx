interface User {
  username: string;
  firstname: string;
  lastname: string;
}
class Auth {
  authenticated: boolean;
  user: User;

  constructor() {
    this.authenticated = false;
    this.user = {
      username: "",
      firstname: "",
      lastname: "",
    };
  }

  setUser(user: User) {
    this.user.username = user.username;
    this.user.firstname = user.firstname;
    this.user.lastname = user.lastname;
  }

  getUser() {
    return this.user;
  }

  login(cb: Function) {
    this.authenticated = true;
    cb();
  }

  logout(cb: Function) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
