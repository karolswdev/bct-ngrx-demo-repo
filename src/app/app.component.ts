import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';

import { Store } from '@ngrx/store';
import * as todoActions from './store/reducers/todo/todo.actions';
import * as filterActions from './store/reducers/currentFilter/currentFilter.actions';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import {
  TodosState,
  reducers as rootReducer,
} from './store/reducers';

import { map } from 'rxjs/operators';
import { Todo } from './store/reducers/todo/todo.model';
import * as todoEntity from './store/reducers/todo/todo.reducer';
import * as mouseClickActions from './store/reducers/userInfo/mouseclick.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  currentUser: string;
  mouseClicks: number;
  currentFilter: string;
  todos: Observable<Todo[]>;

  constructor(private _todoStore: Store<TodosState>) {

    this.todos = _todoStore.pipe(select(t => t.todos),
    map(todoEntity.selectAll));
    _todoStore.select(c => c.currentFilter).subscribe((filter: string) => {
      this.currentFilter = filter;
    });

    _todoStore.select(s => s.mouseClicks).subscribe(m => {
      this.mouseClicks = m;
    });

    _todoStore.select(u => u.currentUser).subscribe(u => {
      this.currentUser = u;
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
    };

    this._todoStore.dispatch(new todoActions.AddTodo({ todo }));
    this._todoStore.dispatch(new mouseClickActions.ClickMouse());
    input.value = '';
  }

  private onTodoClick (id, completed) {
    const todo = {
      id,
      changes: {
        completed: !completed,
      },
    };

    this._todoStore.dispatch(new todoActions.UpdateTodo({ todo }));
  }

  private removeTodo (id) {
    this._todoStore.dispatch(new mouseClickActions.ClickMouse());
    this._todoStore.dispatch(new todoActions.DeleteTodo({ id }));
  }

  private applyFilter (filter) {
    this._todoStore.dispatch(new mouseClickActions.ClickMouse());
    this._todoStore.dispatch(new filterActions.SetCurrentFilter({ filter }));
  }

  private setFilter(event) {
    const filter = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'][event.index];
    this.applyFilter(filter);
  }
}
