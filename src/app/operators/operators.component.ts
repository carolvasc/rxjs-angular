import { Component, OnInit } from '@angular/core';
import { of, Observable, from, interval, fromEvent, merge, timer } from 'rxjs';
import { map, filter, pluck, mapTo, switchMap, mergeMap, take, tap, withLatestFrom, takeUntil, scan } from 'rxjs/operators';

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

    // this.firstPluckExample();
    // this.secondPluckExample();
    // this.thirdPluckExample();

    // this.firstFromEventExample();
    // this.secondFromEventExample();

    // this.firstMergeExample();
    // this.secondMergeExample();

    // this.firstSwitchMapExample();

    // this.firstMergeMapExample();

    // this.firstTakeExample();
    // this.secondTakeExample();

    this.firstTakeUntilExample();
    this.secondTakeUntilExample();
  }

  /**
   * map()
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
   * from()
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
   * of()
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
   * filter()
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
   * pluck()
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


  /**
   * fromEvent()
   * Cria um Observable que emite eventos de um tipo especifico
   */
  firstFromEventExample() {
    const source = fromEvent(document, 'click');

    const example = source.pipe(map(event => `Event time: ${event.timeStamp}`));

    example.subscribe(val => this.addItem(val));
  }

  secondFromEventExample() {
    const button = document.querySelector('button');
    const source = fromEvent(button, 'click');

    const example = source.pipe(map(val => '10 pontos para a Grifinória'));

    example.subscribe(val => this.addItem(val));
  }

  /**
   * merge()
   * Transforma multiplos Observables em apenas um
   */
  firstMergeExample() {
    const first = interval(2500);
    const second = interval(2000);
    const third = interval(1500);
    const fourth = interval(1000);

    const example = merge(
      first.pipe(mapTo(`Primeiro`)),
      second.pipe(mapTo(`Segundo`)),
      third.pipe(mapTo(`Terceiro`)),
      fourth.pipe(mapTo(`Quarto`)),
    );

    const subscription = example.subscribe(val => this.addItem(val));

    setTimeout(() => subscription.unsubscribe(), 10000);
  }

  secondMergeExample() {
    const obs = new Observable(item => item.next('Obs1'));
    const obs2 = new Observable(item => item.next('Obs2'));

    const results = merge(obs, obs2);

    results.subscribe(val => this.addItem(val));
  }

  /**
   * switchMap()
   * Projeta cada valor de origem em um Observable que é mesclado no Observable de saída,
   * emitindo valores apenas do Observable mais recente.
   */
  firstSwitchMapExample() {
    const subscription = fromEvent(document, 'click')
      .pipe(switchMap(() => interval(1000)))
      .subscribe(val => this.addItem(val));

    setTimeout(() => subscription.unsubscribe(), 10000);
  }

  /**
   * mergeMap()
   */
  firstMergeMapExample() {
    const source = of('a', 'b', 'c');

    const example = source.pipe(mergeMap(x => interval(1000).pipe(map(i => x + 1))));

    example.subscribe(x => this.addItem(x));
  }

  /**
   * take()
   */
  firstTakeExample() {
    const source = of(1, 2, 3, 4, 5);

    const example = source.pipe(take(1));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondTakeExample() {
    const interval$ = interval(1000);

    const example = interval$.pipe(take(5));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  /**
   * takeUntil()
   * 
   */
  firstTakeUntilExample() {
    const source = interval(1000);

    const timer$ = timer(5000);

    const example = source.pipe(takeUntil(timer$));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondTakeUntilExample() {
    const source = interval(1000);

    const isEven = val => val % 2 === 0;

    const evenSource = source.pipe(filter(isEven));

    const evenNumberCount = evenSource.pipe(scan((acc, _) => acc + 1, 0));

    const fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 5));

    const example = evenSource.pipe(

      withLatestFrom(evenNumberCount),
      map(([val, count]) => `Even number (${count}) : ${val}`),

      takeUntil(fiveEvenNumbers)
    );

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
