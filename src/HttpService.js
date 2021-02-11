import { END_POINT } from './config';
import User from './User';
import emitter from './EventEmitter';

export default class HttpService {
  static async request({ method = 'GET', path, body }) {
    const url = `${END_POINT}${path}`;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...(User.token && {
          Authorization: `Bearer ${User.token}`,
        }),
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    };

    return fetch(url, options)
      .then((res) => {
        if ([401, 403].includes(res.status)) {
          User.token = '';
          emitter.emit('unauthorizedRequest');
          throw new Error('Unauthorized');
        }

        return res.json();
      })
      .catch(console.log);
  }
}
