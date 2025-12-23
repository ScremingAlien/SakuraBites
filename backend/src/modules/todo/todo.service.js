// import your model

class TodoService {
  constructor() {
    this.todos = [];
    this.counter = 1;
  }

  /*
  //-- Dependency Injection
  constructor() {
    this.TODO = todoModel;
  }
  */

  async getAll() {
    return this.todos;
  }

  async create(title) {
    const todo = { id: this.counter++, title };
    this.todos.push(todo);
    return todo;
  }

  async delete(id) {
    const index = this.todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      throw new Error("Todo not found");
    }
    this.todos.splice(index, 1);
  }
}

export default new TodoService();
