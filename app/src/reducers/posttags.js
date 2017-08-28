import { RECEIVE_POST_TAGS } from '../actions'

export const DEFAULT_POST_TAGS = 'defaultTags'

let defaultTags = [{
        id: '',
        name: '',
    }]

let defaultState = {
    [DEFAULT_POST_TAGS]: defaultTags
}

export default function posttags(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_POST_TAGS:
            const { tags } = action.payload

            return Object.assign({}, state, {
                tags: tags
            });

        default:
            return state
    }
}