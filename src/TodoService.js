import HttpService from './HttpService';

const todosPath = '/todos';

export default class TodoService {
  static async getTodos() {
    return HttpService.request({ path: todosPath });
  }

  static async createTodo(todo) {
    return HttpService.request({
      path: todosPath,
      method: 'POST',
      body: todo,
    });
  }

  static async updateTodo(todo) {
    return HttpService.request({
      path: `${todosPath}/${todo.id}`,
      method: 'PUT',
      body: todo,
    });
  }

  static async deleteTodo(id) {
    return HttpService.request({
      path: `${todosPath}/${id}`,
      method: 'DELETE',
    });
  }
}
