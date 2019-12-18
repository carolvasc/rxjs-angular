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

  ngOnInit() {
    this.firstMapExample();
    this.secondMapExample();
    this.thirdMapExample();

    this.firstFromExample();
    this.secondFromExample();
    this.thirdFromExample();
  }

  /**
   * MAP
   * Aplica projeção em cada valor dos dados fornecidos
   */
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

  thirdMapExample() {
    const source = of(2, 4, 6);

    const example = source.pipe(map((x: number) => x * x));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  /**
   * FROM
   * Transforma array, promise ou iteraveis em um Observable
   */
  firstFromExample() {
    const promiseSource = from(new Promise(resolve => resolve('Hello World')));

    const subscribe = promiseSource.subscribe(val => this.addItem(val));
  }

  secondFromExample() {
    const map = new Map();
    map.set(1, 'Hi');
    map.set(2, 'Bye');

    const mapSource = from(map);

    const subscribe = mapSource.subscribe(val => this.addItem(val));
  }

  thirdFromExample() {
    const source = from('Hello World');

    const subscribe = source.subscribe(val => this.addItem(val));
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
