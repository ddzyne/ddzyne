import { LOADING_PAGES, LOADING_MENU, LOADING_CUSTOM_POSTS, LOADING_POST_TAGS, LOADING_MORE_CUSTOM_POSTS } from '../actions'

let defaultState = {
    loadingPages: false,
    loadingMenu: true,
    loadingCustomPosts: false,
    loadingPostTags: false,
    loadingMoreCustomPosts: false,
}

export default function loader(state = defaultState, action) {
    switch(action.type) {
        case LOADING_PAGES:
            return Object.assign({}, state, {
                loadingPages: action.payload.loading
            })

        case LOADING_MENU:
            return Object.assign({}, state, {
                loadingMenu: action.payload.loading
            })

        case LOADING_CUSTOM_POSTS:
            return Object.assign({}, state, {
                loadingCustomPosts: action.payload.loading
            })

        case LOADING_POST_TAGS:
            return Object.assign({}, state, {
                loadingPostTags: action.payload.loading
            })

        case LOADING_MORE_CUSTOM_POSTS:
            return Object.assign({}, state, {
                loadingMoreCustomPosts: action.payload.loading
            })

        default:
            return state
    }
}