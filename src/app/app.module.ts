import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ObservableComponent } from "./observable/observable.component";
import { OperatorsComponent } from "./operators/operators.component";
import { SubjectComponent } from "./subject/subject.component";
import { PollingComponent } from "./polling/polling.component";
import { TodoComponent } from "./components/todo/todo.component";

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    OperatorsComponent,
    SubjectComponent,
    PollingComponent,
    TodoComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
