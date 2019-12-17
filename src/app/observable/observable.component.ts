import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  observable: Observable<any>;
  shareObservable: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.createObservable();

    this.createShareObservable();

    // this.basicImplementation();

    this.coldAndHotObservables();
  }

  createObservable() {
    this.observable = Observable.create((observer: Observer<any>) => {
      try {
        observer.next('Apresentation');
        observer.next('Any question');
        setInterval(() => observer.next("Any answer"), 2000);
      } catch (err) {
        observer.error(err);
      }
    });
  }

  createShareObservable() {
    this.shareObservable = Observable.create((observer: Observer<any>) => {
      try {
        observer.next('Apresentation');
        observer.next('Any question');
        setInterval(() => observer.next("Any answer"), 2000);
      } catch (err) {
        observer.error(err);
      }
    }).share();
  }

  basicImplementation() {
    this.addItem('Basic Implementation');

    let observer = this.observable.subscribe(
      (value: any) => this.addItem(value),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed'),
    );

    let observer2 = this.observable.subscribe(
      (value: any) => this.addItem(value)
    );

    observer.add(observer2);

    this.unsubscribeObservable(observer);
  }

  coldAndHotObservables() {
    this.addItem('Cold and Hot Observables');

    let observer = this.shareObservable.subscribe(
      (value: any) => this.addItem(value),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed'),
    );

    let observer2;

    setTimeout(() => {
      observer2 = this.shareObservable.subscribe(
        (value: any) => this.addItem('Subscriber 2: ' + value)
      )
    }, 1000);

    setTimeout(() => {
      observer.add(observer2);
      this.unsubscribeObservable(observer);
    }, 1500);
  }

  unsubscribeObservable(observer) {
    setTimeout(() => observer.unsubscribe(), 6001);
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
