import { RECEIVE_CUSTOM_POSTS } from '../actions'

export const DEFAULT_CUSTOM_POST = 'defaultPost'

let defaultCustomPost = {
    page:0,
    gotAll: false,
    posts: [{
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
    }],
}

let defaultState = {
    [DEFAULT_CUSTOM_POST]: defaultCustomPost,
}

export default function customposts(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_CUSTOM_POSTS:
            const { posts, postType, page, gotAll } = action.payload
            const allPosts = state.hasOwnProperty(postType) ? state[postType].posts : []
            return Object.assign({}, state, {
                [postType]: {
                    page: page,
                    gotAll: gotAll,
                    posts: [...allPosts, ...posts]
                },
            });

        default:
            return state
    }
}