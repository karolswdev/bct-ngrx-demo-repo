import { MouseActions, MouseClickActions } from './mouseclick.actions';

const initialState = 0;

export function reducer(state: number = initialState, action: MouseActions) {
    switch (action.type) {
        case MouseClickActions.MouseClicked:
            return state + 1;
        default:
            return state;
    }
}
