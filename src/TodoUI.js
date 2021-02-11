import emitter from './EventEmitter';
import User from './User';
import TodoService from './TodoService';
import { debounce } from './utils';

class TodoUI {
  constructor() {
    this.todoListContainer = document.getElementById('todoListContainer');
    this.todoList = document.getElementById('todoList');
    this.addTodoForm = document.getElementById('addTodoForm');
    this.newTodoTitle = document.getElementById('newTodoTitle');
    this.newTodoCompleted = document.getElementById('newTodoCompleted');

    this.render = this.render.bind(this);
    this.registerListeners = this.registerListeners.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.createTodoElement = this.createTodoElement.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.updateTodo = debounce(this.updateTodo, 500);

    this.getTodos();
    this.registerListeners();
  }

  getTodos() {
    return TodoService.getTodos().then((items) =>
      items.forEach(this.createTodoElement)
    );
  }

  createTodoElement({ title, completed, id }) {
    const todoElement = document.createElement('li');
    const todoInput = document.createElement('input');
    const todoCheckbox = document.createElement('input');
    const todoDeleteButton = document.createElement('button');
    todoInput.type = 'text';
    todoInput.value = title;
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = completed;
    todoDeleteButton.innerText = 'x';
    todoElement.append(todoInput);
    todoElement.append(todoCheckbox);
    todoElement.append(todoDeleteButton);

    const changeHandler = (e) => {
      e.preventDefault();
      this.updateTodo({
        id,
        title: todoInput.value,
        completed: todoCheckbox.checked,
      });
    };

    const deleteHandler = (e) => {
      e.preventDefault();
      this.deleteTodo(id)
        .then(() => todoElement.remove())
        .catch(console.log);
    };

    todoInput.addEventListener('input', changeHandler);
    todoCheckbox.addEventListener('change', changeHandler);
    todoDeleteButton.addEventListener('click', deleteHandler);

    this.todoList.append(todoElement);
  }

  addNewTodo(e) {
    e.preventDefault();

    return TodoService.createTodo({
      title: this.newTodoTitle.value,
      completed: this.newTodoCompleted.checked,
    })
      .then(this.createTodoElement)
      .catch(console.log);
  }

  deleteTodo(id) {
    return TodoService.deleteTodo(id);
  }

  updateTodo(todo) {
    TodoService.updateTodo(todo).catch(console.log);
  }

  render() {
    if (User.token) {
      this.todoListContainer.classList.remove('hide');
    } else {
      this.todoListContainer.classList.add('hide');
    }
  }

  registerListeners() {
    emitter.subscribe('loggedIn', () => {
      this.getTodos();
      this.render();
    });

    emitter.subscribe('unauthorizedRequest', this.render);

    this.addTodoForm.addEventListener('submit', this.addNewTodo);
  }
}

export default new TodoUI();
