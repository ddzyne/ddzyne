import { RECEIVE_MENUITEMS } from '../actions'

export const DEFAULT_MENU = 'defaultMenu'

let defaultMenu = [{
        attr_title: '',
        title: '',
    }]

let defaultState = {
    [DEFAULT_MENU]: defaultMenu
}

export default function menu(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_MENUITEMS:
            const { menuItems } = action.payload

            return Object.assign({}, state, {
                menuItems: menuItems
            });

        default:
            return state
    }
}