import { RECEIVE_PAGE } from '../actions'

export const DEFAULT_PAGE = 'defaultPage'

let defaultPage = {
    content: {
        rendered: ''
    },
    title: {
        rendered: ''
    },
    cmb2: {
        column_metabox: {
            column_content: ''
        },
        titel_metabox: {
            titel_project: ''
        }
    }
};

let defaultState = {
    [DEFAULT_PAGE]: defaultPage
};

export default function pages(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_PAGE:
            const { pageName, page } = action.payload

            return Object.assign({}, state, {
                [pageName]: page
            });

        default:
            return state
    }
}