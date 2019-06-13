import { UserActionTypes, UserActions } from './username.actions';

const initialState = null;

export function reducer(state: string = initialState, action: UserActions) {

    console.dir(action);
    switch (action.type) {
        case UserActionTypes.CreateUser: {
            return action.payload;
        }
        case UserActionTypes.DeleteUser: {
            return initialState;
        }
        default: return initialState;
    }
}
