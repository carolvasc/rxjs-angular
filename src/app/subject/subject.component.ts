import { Component, OnInit } from '@angular/core';
import { Subject, from, ConnectableObservable, BehaviorSubject } from 'rxjs';
import { multicast } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject = new Subject<number>();

  constructor() { }

  ngOnInit() {
    // this.firstExample();
    // this.secondExample();
    // this.multicastedSubject();
    this.behaviorSubject();
  }

  createObservable(name: String) {
    this.subject.subscribe({
      next: (v) => this.addItem(`${name}: ${v}`)
    });
  }

  firstExample() {
    this.createObservable('observerA');
    this.createObservable('observerB');

    this.subject.next(1);
    this.subject.next(2);
  }

  secondExample() {
    this.createObservable('observerA');
    this.createObservable('observerB');

    const observable = from([1, 2, 3]);

    observable.subscribe(this.subject);
  }

  multicastedSubject() {
    const source = from([1, 2, 3]);
    const subject = new Subject();
    const multicasted = source.pipe(multicast(subject));

    multicasted.subscribe({
      next: (v) => this.addItem(`observerA: ${v}`)
    });
    multicasted.subscribe({
      next: (v) => this.addItem(`observerB: ${v}`)
    });

    (multicasted as ConnectableObservable<number>).connect();
  }

  behaviorSubject() {
    const subject = new BehaviorSubject(0); // Subject com valor inicial

    subject.subscribe({
      next: (v) => this.addItem(`observerA: ${v}`)
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe({
      next: (v) => this.addItem(`observerB: ${v}`)
    });

    subject.next(3);
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }
}
