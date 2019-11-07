import fetch from 'isomorphic-fetch'
import { WP_URL } from '../wp-url'

export const RECEIVE_PAGE = 'RECEIVE_PAGE'
export const RECEIVE_MENUITEMS = 'RECEIVE_MENUITEMS'
export const RECEIVE_CUSTOM_POSTS = 'RECEIVE_CUSTOM_POSTS'
export const RECEIVE_POST_TAGS = 'RECEIVE_POST_TAGS'

export const LOADING_PAGES = 'LOADING_PAGES'
export const LOADING_MENU = 'LOADING_MENU'
export const LOADING_CUSTOM_POSTS = 'LOADING_CUSTOM_POSTS'
export const LOADING_POST_TAGS = 'LOADING_POST_TAGS'
export const LOADING_MORE_CUSTOM_POSTS = 'LOADING_MORE_CUSTOM_POSTS'

export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'

// not needed for now
// export const RECEIVE_POSTS = 'RECEIVE_POSTS';
// const POSTS_PER_PAGE = 10;

export function changeBackground(color) {
    return {
        type: CHANGE_BACKGROUND,
        payload: {
            color: color
        }
    }
}


function loadingPage(bool) {
    return {
        type: LOADING_PAGES,
        payload: {
            loading: bool
        }
    }
}
function loadingMenu(bool) {
    return {
        type: LOADING_MENU,
        payload: {
            loading: bool
        }
    }
}
function loadingCustomPosts(bool) {
    return {
        type: LOADING_CUSTOM_POSTS,
        payload: {
            loading: bool
        }
    }
}

export function setLoadMore(bool) {
    return {
        type: LOADING_MORE_CUSTOM_POSTS,
        payload: {
            loading: bool
        }
    }
}

function loadingPostTags(bool) {
    return {
        type: LOADING_POST_TAGS,
        payload: {
            loading: bool
        }
    }
}

//get a page, based on its name
export function fetchPageIfNeeded(pageName) {
    return function(dispatch, getState) {
        if (shouldFetchPage(getState(), pageName)) {
            dispatch(loadingPage(true))
            return fetch(WP_URL + '/wp/v2/pages?slug=' + pageName)
                .then(response => response.json())
                .then(pages => dispatch(receivePage(dispatch, pageName, pages[0])))
        }
    }
}

function shouldFetchPage(state, pageName) {
    const pages = state.pages
    return !pages.hasOwnProperty(pageName)
}

function receivePage(dispatch, pageName, pageData) {
    dispatch(loadingPage(false))
    return {
        type: RECEIVE_PAGE,
        payload: {
            pageName: pageName,
            page: pageData
        }
    }
}

//get all the menu items, custom route needed for now
export function fetchMenuItems() {
    return function (dispatch, getState) {
        if (shouldFetchMenuItems(getState())) {
            dispatch(loadingMenu(true))
            return fetch(WP_URL + '/custom_routes/menu')
                .then(response => response.json())
                .then(menuData => dispatch(receiveMenuItems(dispatch, menuData)))
            }
    }
}

function shouldFetchMenuItems(state) {
    const menu = state.menu
    return !menu.hasOwnProperty('menuItems');
}

function receiveMenuItems(dispatch, menuData) {
    dispatch(loadingMenu(false))
    return {
        type: RECEIVE_MENUITEMS,
        payload: {
            menuItems: menuData
        }
    }
}

//custom posts, get them all for 'work' posttype, as these need to be displayed on one page
export function fetchCustomPostsIfNeeded(postType, page) {
    return function(dispatch, getState) {
        if (shouldFetchCustomPosts(getState(), postType, page)) {
            page < 2 && dispatch(loadingCustomPosts(true))
            return fetch(WP_URL + '/wp/v2/' + postType + '?page=' + page)
                .then(response => response.json())
                .then(posts => dispatch(receiveCustomPosts(dispatch, postType, posts, page)))
        }
    }
}

function shouldFetchCustomPosts(state, postType, page) {
    const posts = state.customposts;
    return ( !posts.hasOwnProperty(postType) || posts[postType].page !== page ) || 
           ( posts.hasOwnProperty(postType) && !posts.gotAll );
}

function receiveCustomPosts(dispatch, postType, posts, page) {
    dispatch(loadingCustomPosts(false))
    dispatch(setLoadMore(false))
    return {
        type: RECEIVE_CUSTOM_POSTS,
        payload: {
            postType: postType,
            posts: posts,
            page: page,
            gotAll: posts.length < 10 || ( posts.hasOwnProperty('code') && posts.code === 'rest_post_invalid_page_number')
        }
    }
}


//get all post tags
//custom posts, get them all for 'work' posttype, as these need to be displayed on one page
export function fetchPostTagsIfNeeded() {
    return function(dispatch, getState) {
        if (shouldFetchPostTags(getState())) {
            dispatch(loadingPostTags(true))
            return fetch(WP_URL + '/wp/v2/tags?per_page=100')
                .then(response => response.json())
                .then(tags => dispatch(receivePostTags(dispatch, tags)))
        }
    }
}

function shouldFetchPostTags(state) {
    const tags = state.posttags;
    return !tags.hasOwnProperty('tags');
}

function receivePostTags(dispatch, tags) {
    dispatch(loadingPostTags(false))
    return {
        type: RECEIVE_POST_TAGS,
        payload: {
            tags: tags
        }
    }
}


// get posts, not needed for now
// export function fetchPosts(pageNum = 1) {
//     return function (dispatch) {
//         return fetch(WP_URL + '/posts?filter[paged]=' + pageNum + '&filter[posts_per_page]=' + POSTS_PER_PAGE)
//             .then(response => Promise.all(
//                 [response.headers.get('X-WP-TotalPages'), response.json()]
//             ))
//             .then(postsData => dispatch(
//                 receivePosts(pageNum, postsData[0], postsData[1])
//             ));
//     }
// }

// function receivePosts(pageNum, totalPages, posts) {
//     return {
//         type: RECEIVE_POSTS,
//         payload: {
//             pageNum: pageNum,
//             totalPages: totalPages,
//             posts: posts
//         }
//     };
// }
