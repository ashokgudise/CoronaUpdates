import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {Events} from './models/events'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventSource: EventSource;
  private eventsDataSource: BehaviorSubject<Array<Events>> = new BehaviorSubject([]);

  eventsData = this.eventsDataSource.asObservable();
  constructor(private zone: NgZone) {}

 public getEvents(): void {
  let url = ['http://localhost:8080', 'events'].join('/');

  this.eventSource = new EventSource(url);
  this.eventSource.onmessage = (event) => {

    console.log('got event data', event['data']);
    const newArrays = [...this.eventsDataSource.value, JSON.parse(event['data'])];

    this.zone.run(() => {
      this.eventsDataSource.next(newArrays);
    })

  }

  this.eventSource.onerror = (error) => {

    this.zone.run( () => {
      // readyState === 0 (closed) means the remote source closed the connection,
      // so we can safely treat it as a normal situation. Another way of detecting the end of the stream
      // is to insert a special element in the stream of events, which the client can identify as the last one.
      if(this.eventSource.readyState === 0) {
        this.eventSource.close();
        this.eventsDataSource.complete();
      } else {
        this.eventsDataSource.error('EventSource error: ' + error);
      }
    });
  }
}

public onClose() {
  this.eventSource.close();
  this.eventsDataSource.complete();

}
}
