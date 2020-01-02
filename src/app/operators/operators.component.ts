import { Component, OnInit } from '@angular/core';
import { of, Observable, from, interval, fromEvent, merge, timer, Subject, combineLatest, race, generate } from 'rxjs';
import { map, filter, pluck, mapTo, switchMap, mergeMap, take, tap, withLatestFrom, takeUntil, scan, delay, distinctUntilChanged } from 'rxjs/operators';

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

    // this.firstTakeUntilExample();
    // this.secondTakeUntilExample();

    // this.firstScanExample();
    // this.secondScanExample();
    // this.thirdScanExample();
    // this.fourthScanExample();

    // this.firstWithLatestFromExample();
    // this.secondWithLatestFromExample();

    // this.firstCombineLatestExample();
    // this.secondCombineLatestExample();

    this.firstGenerateExample();
    this.secondGenerateExample();
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
   * Mapeia para Observable, emite valores
   */
  firstMergeMapExample() {
    const source = of('a', 'b', 'c');

    const example = source.pipe(mergeMap(x => interval(1000).pipe(map(i => x + 1))));

    example.subscribe(x => this.addItem(x));
  }

  /**
   * take()
   * Emite o número de valores fornecido antes de concluir
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
   * Emite valores até que sejam emitidas os Observables.
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

  /**
   * scan()
   */
  firstScanExample() {
    const source = of(1, 2, 3);

    const example = source.pipe(scan((acc, curr) => acc + curr, 0));

    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondScanExample() {
    const subject = new Subject();

    const example = subject.pipe(
      scan((acc, curr) => Object.assign({}, acc, curr), {})
    );

    const subscribe = example.subscribe(val =>
      console.log('Accumulated object:', val)
    );
    //next values into subject, adding properties to object
    // {name: 'Joe'}
    subject.next({ name: 'Joe' });
    // {name: 'Joe', age: 30}
    subject.next({ age: 30 });
    // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
    subject.next({ favoriteLanguage: 'JavaScript' });
  }

  thirdScanExample() {
    const scanObs = interval(1000)
      .pipe(
        scan((a: any, c: any) => [...a, c], []),
        map(r => r[Math.floor(Math.random() * r.length)]),
        distinctUntilChanged()
      )
      .subscribe(this.addItem);
  }

  fourthScanExample() {
    const fakeRequest = of('response').pipe(delay(2000));

    interval(1000)
      .pipe(
        mergeMap(_ => fakeRequest),
        scan<string>((all, current) => [...all, current], [])
      )
      .subscribe({ next: (val) => this.addItem(val) });
  }

  /**
   * withLatestFrom()
   */
  firstWithLatestFromExample() {
    const source = interval(5000);

    const secondSource = interval(1000);
    const example = source.pipe(
      withLatestFrom(secondSource),
      map(([first, second]) => {
        return `First Source (5s): ${first} Second Source (1s): ${second}`;
      })
    );
    const subscribe = example.subscribe(val => this.addItem(val));
  }

  secondWithLatestFromExample() {
    const source = interval(5000);

    const secondSource = interval(1000);

    const example = secondSource.pipe(
      withLatestFrom(source),
      map(([first, second]) => {
        return `Source (1s): ${first} Latest From (5s): ${second}`;
      })
    );
    const subscribe = example.subscribe(val => this.addItem(val));
  }

  /**
   * combineLatest()
   */
  firstCombineLatestExample() {
    const timerOne$ = timer(1000, 4000);
    const timerTwo$ = timer(2000, 4000);
    const timerThree$ = timer(3000, 4000);

    combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
      ([timerValOne, timerValTwo, timerValThree]) => {
        console.log(
          `Timer One Latest: ${timerValOne},
          Timer Two Latest: ${timerValTwo},
          Timer Three Latest: ${timerValThree}`
        );
      }
    );
  }

  secondCombineLatestExample() {
    const timerOne$ = timer(1000, 4000);
    const timerTwo$ = timer(2000, 4000);
    const timerThree$ = timer(3000, 4000);

    combineLatest(
      timerOne$,
      timerTwo$,
      timerThree$,
      (one, two, three) => {
        return `Timer One (Proj) Latest: ${one}, 
                Timer Two (Proj) Latest: ${two}, 
                Timer Three (Proj) Latest: ${three}`;
      }
    ).subscribe(console.log);
  }

  /**
   * race()
   */
  firstRaceExample() {
    const example = race(
      interval(1500),
      interval(1000).pipe(<any>mapTo('1s won!')),
      interval(2000),
      interval(2500)
    );

    const subscribe = example.subscribe(val => console.log(val));
  }

  secondRaceExample() {
    const first = of('first').pipe(
      delay(100),
      map(_ => {
        throw 'error';
      })
    );
    const second = of('second').pipe(delay(200));
    const third = of('third').pipe(delay(300));

    race(first, second, third).subscribe(val => console.log(val));
  }

  /**
   * generate()
   */
  firstGenerateExample() {
    generate(2, x => x <= 8, x => x + 3).subscribe(
      val => this.addItem(val)
    );
  }

  secondGenerateExample() {
    generate(2, x => x <= 38, x => x + 3, x => '.'.repeat(x)).subscribe(
      val => this.addItem(val)
    );
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }

}
