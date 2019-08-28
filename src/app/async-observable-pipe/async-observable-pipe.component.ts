import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-async-observable-pipe',
  template: `
  <div><code>observable|async</code>: Time: {{ time | async }}</div>
  <div><code>observable</code>: Time2: {{ time2 }}</div>
  `,
  styleUrls: ['./async-observable-pipe.component.css']
})
export class AsyncObservablePipeComponent implements OnInit {

  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  time2;

  constructor() {
    const ob = new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
    ob.subscribe(data => {
      this.time2 = data;
    });
  }

  ngOnInit() {
  }

}
