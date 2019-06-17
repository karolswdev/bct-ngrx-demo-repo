import { UserActionTypes, UserActions } from './username.actions';

const initialState = null;

export function reducer(state: string = initialState, action: UserActions) {

    switch (action.type) {
        case UserActionTypes.CreateUser: {
            return action.payload;
        }
        case UserActionTypes.DeleteUser: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}
