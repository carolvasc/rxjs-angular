import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "src/app/shared/models/todo.model";
import { StateService } from "src/app/shared/services/state.service";

interface TodoState {
  todos: Todo[];
  selectedTodoId: number;
}

const initialState: TodoState = {
  todos: [],
  selectedTodoId: undefined,
};

@Injectable({
  providedIn: "root",
})
export class TodoService extends StateService<TodoState> {
  todos$: Observable<Todo[]> = this.select((state) => state.todos);

  selectedTodo$: Observable<Todo> = this.select((state) =>
    state.todos.find((item) => item.id === state.selectedTodoId)
  );

  constructor() {
    super(initialState);
  }

  addTodo(todo: Todo) {
    this.setState({
      todos: [...this.state.todos, todo],
    });
  }

  selectTodo(todo: Todo) {
    this.setState({
      selectedTodoId: todo.id,
    });
  }
}
