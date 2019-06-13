import { Component, NgModule, OnDestroy, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  TodosState,
} from './store/reducers';

import * as mouseClickActions from './store/reducers/userInfo/mouseclick.actions';
import * as userActions from './store/reducers/userInfo/username.actions';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  currentUser: string;
  mouseClicks: number;

  constructor(private _todoStore: Store<TodosState>) {

    _todoStore.select(s => s.mouseClicks).subscribe(m => {
      this.mouseClicks = m;
    });

    _todoStore.select(c => c.currentUser).subscribe(u => {
        this.currentUser = u;
    });

  }

  public loginUser(input) {

    if (input.value.length === 0) {
      return;
    }

    console.dir(input.value);

    this._todoStore.dispatch(new userActions.CreateUser(input.value));
    this._todoStore.dispatch(new mouseClickActions.ClickMouse());

    console.dir(this._todoStore);


  }


}
