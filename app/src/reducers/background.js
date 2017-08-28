import { CHANGE_BACKGROUND } from '../actions'

let defaultState = {
    color: 'black'
}

export default function background(state = defaultState, action) {
    switch(action.type) {
        case CHANGE_BACKGROUND:
            return Object.assign({}, state, {
                color: action.payload.color
            });

        default:
            return state
    }
}