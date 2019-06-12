import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';

import { Store } from '@ngrx/store';
import * as todoActions from './reducers/todo/todo.actions';
import * as filterActions from './reducers/currentFilter/currentFilter.actions';
import { select } from '@ngrx/store';

import {
  TodosState,
  reducers as rootReducer,
} from './reducers';

import { map } from 'rxjs/operators';
import { Todo } from './reducers/todo/todo.model';
import * as todoEntity from './reducers/todo/todo.reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  currentFilter: string;
  todos: any;

  constructor(private _store: Store<TodosState>) {
    this.todos = _store.pipe(select(t => t.todos),
    map(todoEntity.selectAll));
    _store.select(c => c.currentFilter).subscribe((filter: string) => {
      this.currentFilter = filter;
    });
  }

  private addTodo(input) {

    if (input.value.length === 0) {
      return;
    }
    const todo: Todo = {
      id: null,
      text: input.value,
      completed: false,
    }

    this._store.dispatch(new todoActions.AddTodo({ todo }));
    input.value = '';
  }

  private onTodoClick (id, completed) {
    const todo = {
      id,
      changes: {
        completed: !completed,
      },
    }
    this._store.dispatch(new todoActions.UpdateTodo({ todo }));
  }

  private removeTodo (id) {
    this._store.dispatch(new todoActions.DeleteTodo({ id }));
  }

  private applyFilter (filter) {
    this._store.dispatch(new filterActions.SetCurrentFilter({ filter }));
  }

  private setFilter(event) {
    const filter = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'][event.index];
    this.applyFilter(filter);
  }
}
