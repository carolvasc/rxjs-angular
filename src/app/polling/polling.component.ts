import { Component, OnInit } from "@angular/core";
import { interval, Observable, of, Subject } from "rxjs";
import { exhaustMap, switchMap, takeUntil, tap } from "rxjs/operators";

export enum StatusBackgroundTasks {
  NotStarted = 0,
  Started = 1,
  Cancelled = 2,
  Concluded = 3,
  ConcludedWithWarnings = 4,
  Error = 5,
}

@Component({
  selector: "app-polling",
  templateUrl: "./polling.component.html",
  styleUrls: ["./polling.component.css"],
})
export class PollingComponent implements OnInit {
  pollFinished$ = new Subject<void>();
  backgroundProgress$: Observable<StatusBackgroundTasks> = of(
    StatusBackgroundTasks.NotStarted,
    StatusBackgroundTasks.Error,
    StatusBackgroundTasks.Concluded,
    StatusBackgroundTasks.ConcludedWithWarnings
  );

  constructor() {}
  ngOnInit() {}

  startPolling() {
    interval(500)
      .pipe(
        takeUntil(this.pollFinished$),
        exhaustMap(() =>
          this.backgroundProgress$.pipe(
            tap((val) => console.log(val)),
            switchMap(async (backgroundTask) =>
              this.processBackgroundTask(backgroundTask)
            )
          )
        )
      )
      .subscribe(() => {
        console.log("entra aqui após ler todos os valores do Observable");
      });
  }

  processBackgroundTask(backgroundTask) {
    if (backgroundTask === StatusBackgroundTasks.Concluded)
      this.pollFinished$.next();
  }
}
