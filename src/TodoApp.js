import authUI from './AuthUI';
import todoUI from './TodoUI';

export default class TodoApp {
  static init() {
    authUI.render();
    todoUI.render();
  }
}
