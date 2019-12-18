import { Component, OnInit } from '@angular/core';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  observable = new Observable();

  ngOnInit() {
    this.firstMapExample();
    this.secondMapExample();
    this.thirdMapExample();
  }

  firstMapExample() {
    const source = from([1, 2, 3, 4, 5]);

    const example = source.pipe(map((val: number) => val + 10));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondMapExample() {
    const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
    ]);

    const example = source.pipe(map(({ name }) => name));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  thirdMapExample(){
    const source = of(2, 4, 6);

    const example = source.pipe(map((x: number) => x * x));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
