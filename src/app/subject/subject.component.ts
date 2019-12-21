import { Component, OnInit } from '@angular/core';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject = new Subject<number>();

  constructor() { }

  ngOnInit() {
    this.firstExample();
    this.secondExample();
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


  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }
}
