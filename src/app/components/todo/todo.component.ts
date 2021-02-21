import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Todo } from "src/app/shared/models/todo.model";
import { TodoStateService } from "./services/todo-state.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(
    private todosState: TodoStateService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.todosState.todos$.subscribe((todos) => {
      this.todos = todos;
      this.changeDetector.markForCheck();
    });
  }
}
