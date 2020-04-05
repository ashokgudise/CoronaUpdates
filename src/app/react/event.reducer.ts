import { createReducer, on } from '@ngrx/store';
import { ADD_EVENT, DELETE_EVENT, RESET_EVENT } from './event.actions';

export const initialState = 0;

const _eventReducer = createReducer(initialState,
  on(ADD_EVENT, state => state + 1),
  on(DELETE_EVENT, state => state - 1),
  on(RESET_EVENT, state => 0),
);

export function eventReducer(state, action) {
  return _eventReducer(state, action);
}
