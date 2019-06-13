import { Action } from '@ngrx/store';

export enum UserActionTypes {
    CreateUser = '[USER] Create user',
    DeleteUser = '[USER] Delete user'
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CreateUser;

    constructor(public payload: { user: string }) {}
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DeleteUser;
}

export type UserActions =
 CreateUser | DeleteUser;

