import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-angular';

  ngOnInit() {
    let observable = Observable.create((observer: Observer<any>) => {
      try {
        observer.next('Apresentation');
        observer.next('Any question');
        setInterval(() => observer.next("Any answer"), 2000);
      } catch (err) {
        observer.error(err);
      }
    });

    let observer = observable.subscribe(
      (x: any) => this.addItem(x),
      (error: any) => this.addItem(error),
      () => this.addItem('Completed'),
    );

    let observer2 = observable.subscribe(
      (x: any) => this.addItem(x)
    );

    observer.add(observer2);

    setTimeout(() => observer.unsubscribe(), 6001);
  }

  addItem(value: any) {
    let node = document.createElement("li");
    let textNode = document.createTextNode(value);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
  }
}
