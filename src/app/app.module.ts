import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableComponent } from './observable/observable.component';
import { OperatorsComponent } from './operators/operators.component';
import { SubjectComponent } from './subject/subject.component';
import { PollingComponent } from './polling/polling.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    OperatorsComponent,
    SubjectComponent,
    PollingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
