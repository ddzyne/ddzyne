import { RECEIVE_CUSTOM_POSTS } from '../actions'

export const DEFAULT_CUSTOM_POST = 'defaultPost'

let defaultCustomPost = [{
    content: {
        rendered: ''
    },
    title: {
        rendered: ''
    },
    tags: [],
    cmb2: {
        column_metabox: {
            column_content: ''
        },
        extra_metabox: {
            extra_klant: '',
            extra_project: ''
        }
    }
}]

let defaultState = {
    [DEFAULT_CUSTOM_POST]: defaultCustomPost
}

export default function menu(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_CUSTOM_POSTS:
            const { posts, postType } = action.payload
            return Object.assign({}, state, {
                [postType]:posts
            });

        default:
            return state
    }
}