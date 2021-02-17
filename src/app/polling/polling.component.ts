import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, interval, Subject, timer } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-polling",
  templateUrl: "./polling.component.html",
  styleUrls: ["./polling.component.css"],
})
export class PollingComponent implements OnInit {
  pollFinished$ = new Subject<void>();

  constructor() {}
  ngOnInit() {}

  startPolling() {
    interval(2000)
      .pipe(
        takeUntil(this.pollFinished$),
        tap(() => console.log("tapping"))
      )
      .subscribe(() => {
        console.log("verifica o status do polling aqui");
      });
  }

  finishPolling() {
    this.pollFinished$.next();
  }
}
