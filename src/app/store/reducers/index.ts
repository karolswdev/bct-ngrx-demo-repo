import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Store
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Todos } from './todo/todo.model';
import * as todos from './todo/todo.reducer';
import { Filter } from './currentFilter/currentFilter.model';
import { reducer as currentFilter } from './currentFilter/currentFilter.reducer';
import { reducer as userReducer } from './userInfo/username.reducer';
import { reducer as mouseReducer } from './userInfo/mouseclick.reducer';
import { select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as todoEntity from './todo/todo.reducer';
import { User, Click } from './userInfo/userinfo.model';

export interface TodosState extends Todos, Filter, User, Click { }

export const reducers: ActionReducerMap<TodosState> = {
  todos: todos.reducer,
  currentFilter: currentFilter,
  currentUser: userReducer,
  mouseClicks: mouseReducer
};

export const metaReducers: MetaReducer<TodosState>[] = !environment.production ? [] : [];

