import { LOADING_PAGES, LOADING_MENU, LOADING_CUSTOM_POSTS } from '../actions'

let defaultState = {
    loadingPages: false,
    loadingMenu: false,
    loadingCustomPosts: false,
}

export default function loader(state = defaultState, action) {
    switch(action.type) {
        case LOADING_PAGES:
            return Object.assign({}, state, {
                loadingPages: action.payload.loading
            });

        case LOADING_MENU:
            return Object.assign({}, state, {
                loadingMenu: action.payload.loading
            });

        case LOADING_CUSTOM_POSTS:
            return Object.assign({}, state, {
                loadingCustomPosts: action.payload.loading
            });

        default:
            return state
    }
}