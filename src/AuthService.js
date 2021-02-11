import User from './User';
import HttpService from './HttpService';
import emitter from './EventEmitter';

export default class AuthService {
  static async login({ username, password }) {
    HttpService.request({
      method: 'POST',
      path: '/auth/local',
      body: {
        identifier: username,
        password,
      },
    }).then((data) => {
      User.token = data.jwt;
      emitter.emit('loggedIn');
    });
  }
}
