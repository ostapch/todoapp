import User from './User';
import AuthService from './AuthService';
import emitter from './EventEmitter';

class AuthUI {
  constructor() {
    this.loginForm = document.getElementById('loginForm');
    this.authorized = document.getElementById('authorized');
    this.username = document.getElementById('username');
    this.password = document.getElementById('password');

    this.render = this.render.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    this.loginFormSubmit = this.loginFormSubmit.bind(this);

    this.registerListeners();
  }

  render() {
    if (User.token) {
      this.loginForm.classList.add('hide');
      this.authorized.classList.remove('hide');
    } else {
      this.loginForm.classList.remove('hide');
      this.authorized.classList.add('hide');
    }
  }

  loginFormSubmit(e) {
    e.preventDefault();

    AuthService.login({
      username: this.username.value,
      password: this.password.value,
    });
  }

  registerListeners() {
    this.loginForm.addEventListener('submit', this.loginFormSubmit);

    emitter.subscribe('loggedIn', this.render);
    emitter.subscribe('unauthorizedRequest', this.render);
  }
}

export default new AuthUI();
