import { Component, OnInit } from '@angular/core';
import { Subject, from, ConnectableObservable, BehaviorSubject, fromEvent, interval, merge, AsyncSubject } from 'rxjs';
import { multicast, map, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject = new Subject<number>();

  addHtmlElement = coords =>
    (document.body.innerHTML += `
  <div 
    id=${coords.id}
    style="
      position: absolute;
      height: 30px;
      width: 30px;
      text-align: center;
      top: ${coords.y}px;
      left: ${coords.x}px;
      background: silver;
      border-radius: 80%;"
    >
  </div>`);

  constructor() { }

  ngOnInit() {
    // this.firstExample();
    // this.secondExample();
    // this.multicastedSubject();
    // this.behaviorSubject();
    // this.behaviorSubject2();
    this.asyncSubject();
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

  behaviorSubject2() {
    const subject = new BehaviorSubject(123);

    subject.subscribe({ next: (v) => this.addItem(v) });
    subject.subscribe({ next: (v) => this.addItem(v) });

    subject.next(456);

    subject.subscribe({ next: (v) => this.addItem(v) });

    subject.next(789);
  }

  behaviorSubject3() {
    const setElementText = (elemId = 'output', text) =>
      (document.getElementById(elemId).innerText = text.toString());


    const subject = new BehaviorSubject(0);

    const click$ = fromEvent(document, 'click').pipe(
      map((e: MouseEvent) => ({
        x: e.clientX,
        y: e.clientY,
        id: Math.random()
      })),
      tap(this.addHtmlElement),
      mergeMap(coords => subject.pipe(tap(v => setElementText(coords.id, v))))
    );

    const interval$ = interval(1000).pipe(
      tap(v => subject.next(v)),
      tap(v => setElementText('intervalValue', v))
    );

    merge(click$, interval$).subscribe();
  }

  asyncSubject() {
    const sub = new AsyncSubject();

    sub.subscribe({ next: (v) => this.addItem(v) });

    sub.next(123);

    sub.subscribe({ next: (v) => this.addItem(v) });

    sub.next(456);
    sub.complete();
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }
}
