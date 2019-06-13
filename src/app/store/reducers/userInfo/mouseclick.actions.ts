import { Action } from '@ngrx/store';

export enum MouseClickActions {
    MouseClicked = '[Mouse] Click',
    MouseReset = '[Mouse] Reset'
}

export class ClickMouse implements Action {
    readonly type = MouseClickActions.MouseClicked;
}

export class MouseReset implements Action {
    readonly type = MouseClickActions.MouseReset;
}

export type MouseActions =
 ClickMouse | MouseReset;

