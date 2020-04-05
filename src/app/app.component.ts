import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { EventService } from './event.service';
import {  Events } from './models/events';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'CoronaUpdates';
  eventInfo$: Observable<Events[]>;
  all: Events[];


  constructor(private eventsService: EventService){}

  /**
  ngOnInit(){
    console.log('inside init');
    this.eventsService.getEvents()
    .subscribe((data: any[]) => {
      console.log('service response');
      console.log(data);
      //this.products = data;
    });
    }
    **/
   ngOnInit() {
    this.eventsService.getEvents();
    this.eventInfo$ = this.eventsService.eventsData;
  }

  ngOnDestroy() {
    this.eventsService.onClose();
  }

  @HostListener('window:beforeunload', [ '$event' ])
  unloadHandler(event) {
    console.log('unloadHandler');
    this.eventsService.onClose();
  }

}
