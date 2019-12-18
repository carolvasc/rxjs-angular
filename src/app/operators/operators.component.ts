import { Component, OnInit } from '@angular/core';
import { of, Observable, from, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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

    this.firstOfExample();
    this.secondOfExample();

    this.firstFilterExample();
    this.secondFilterExample();
    this.thirdFilterExample();
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

  /**
   * OF
   * Emite uma quantidade variável de valores em uma sequência e emite uma notificação completa
   */
  firstOfExample() {
    const source = of(1, 2, 3, 4, 5);

    const subscribe = source.subscribe(val => this.addItem(val));
  }

  secondOfExample() {
    const source = of({ name: 'Brian' }, [1, 2, 3], function hello() { return 'Hello' });

    const subscribe = source.subscribe(val => this.addItem(val));
  }

  /**
   * FILTER
   * Emite valores que passam de determianda condição
   */
  firstFilterExample() {
    const source = from([1, 2, 3, 4, 5]);

    const example = source.pipe(filter((num => num % 2 === 0)));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondFilterExample() {
    const source = from([
      { name: 'Joe', age: 31 },
      { name: 'Bob', age: 25 },
      { name: 'Emily', age: 35 }
    ]);

    const example = source.pipe(filter(person => person.age >= 30));

    const subscribe = example.subscribe(val => this.addItem(`Over 30: ${val.name}`));
  }

  thirdFilterExample(){
    const source = interval(1000);

    const example = source.pipe(filter(num => num < 5));

    const subscribe = example.subscribe(val => this.addItem(`Number less than 5: ${val}`));
  }


  
  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
