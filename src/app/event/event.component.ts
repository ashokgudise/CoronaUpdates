import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ADD_EVENT, DELETE_EVENT, RESET_EVENT } from '../react/event.actions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(ADD_EVENT());
  }

  decrement() {
    this.store.dispatch(DELETE_EVENT());
  }

  reset() {
    this.store.dispatch(RESET_EVENT());
  }
}


