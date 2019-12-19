import { Component, OnInit } from '@angular/core';
import { of, Observable, from, interval, fromEvent } from 'rxjs';
import { map, filter, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.firstMapExample();
    // this.secondMapExample();
    // this.thirdMapExample();

    // this.firstFromExample();
    // this.secondFromExample();
    // this.thirdFromExample();

    // this.firstOfExample();
    // this.secondOfExample();

    // this.firstFilterExample();
    // this.secondFilterExample();
    // this.thirdFilterExample();

    this.firstPluckExample();
    this.secondPluckExample();
    this.thirdPluckExample();
  }

  /**
   * MAP
   * Aplica projeção em cada valor dos dados fornecidos
   */
  firstMapExample() {
    const source = from([1, 2, 3, 4, 5]);

    const example = source.pipe(map((val: number) => val + 10));

    example.subscribe(val => this.addItem(val));
  }

  secondMapExample() {
    const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 }
    ]);

    const example = source.pipe(map(({ name }) => name));

    example.subscribe(val => this.addItem(val));
  }

  thirdMapExample() {
    const source = of(2, 4, 6);

    const example = source.pipe(map((x: number) => x * x));

    example.subscribe(val => this.addItem(val));
  }

  /**
   * FROM
   * Transforma array, promise ou iteraveis em um Observable
   */
  firstFromExample() {
    const promiseSource = from(new Promise(resolve => resolve('Hello World')));

    promiseSource.subscribe(val => this.addItem(val));
  }

  secondFromExample() {
    const map = new Map();
    map.set(1, 'Hi');
    map.set(2, 'Bye');

    const mapSource = from(map);

    mapSource.subscribe(val => this.addItem(val));
  }

  thirdFromExample() {
    const source = from('Hello World');

    source.subscribe(val => this.addItem(val));
  }

  /**
   * OF
   * Emite uma quantidade variável de valores em uma sequência e emite uma notificação completa
   */
  firstOfExample() {
    const source = of(1, 2, 3, 4, 5);

    source.subscribe(val => this.addItem(val));
  }

  secondOfExample() {
    const source = of({ name: 'Brian' }, [1, 2, 3], function hello() { return 'Hello' });

    source.subscribe(val => this.addItem(val));
  }

  /**
   * FILTER
   * Emite valores que passam de determianda condição
   */
  firstFilterExample() {
    const source = from([1, 2, 3, 4, 5]);

    const example = source.pipe(filter((num => num % 2 === 0)));

    example.subscribe(val => this.addItem(val));
  }

  secondFilterExample() {
    const source = from([
      { name: 'Joe', age: 31 },
      { name: 'Bob', age: 25 },
      { name: 'Emily', age: 35 }
    ]);

    const example = source.pipe(filter(person => person.age >= 30));

    example.subscribe(val => this.addItem(`Over 30: ${val.name}`));
  }

  thirdFilterExample() {
    const source = interval(1000);

    const example = source.pipe(filter(num => num < 5));

    example.subscribe(val => this.addItem(`Number less than 5: ${val}`));
  }

  /**
   * PLUCK
   * Mapeia casa valor de origem (de um objeto) para sua propriedade aninhada especificada.
   */
  firstPluckExample() {
    const source = from([
      { name: 'Joe', age: 30 },
      { name: 'Sarah', age: 35 }
    ]);

    const example = source.pipe(pluck('name'));

    example.subscribe(val => this.addItem(val));
  }

  secondPluckExample() {
    const source = from([
      { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
      { name: 'Sarah', age: 35 }
    ]);

    const example = source.pipe(
      filter(val => val.job !== undefined),
      pluck('job', 'title')
    );

    example.subscribe(val => this.addItem(val));
  }

  thirdPluckExample() {
    const source = fromEvent(document, 'click');

    const example = source.pipe(pluck('target', 'tagName'));

    example.subscribe(val => this.addItem(val));
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
