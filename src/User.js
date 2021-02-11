export default class User {
  static get token() {
    return window.localStorage.getItem('token');
  }

  static set token(value) {
    window.localStorage.setItem('token', value);
  }
}
