export const POSTS_REQUEST = 'posts/POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'posts/POSTS_REQUEST_SUCCESS';
export const POSTS_TOGGLE_FAVORITE = 'posts/POSTS_TOGGLE_FAVORITE';
export const CHANGE_PAGE = 'posts/CHANGE_PAGE';
export const CHANGE_IPP = 'posts/CHANGE_IPP';

const initialState = {
    posts        : [],
    activePage   : 0,
    itemsPerPage : 10,
    pageCount    : 0,
    favorite     : JSON.parse(localStorage.getItem('upci_posts_favorite')) || {},
    inProcess    : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case POSTS_REQUEST:
        return {
            ...state,
            inProcess : true,
        };

    case POSTS_REQUEST_SUCCESS:
        return {
            ...state,
            posts     : action.payload,
            pageCount : Math.floor(action.payload.length / state.itemsPerPage) - 1,
            inProcess : false,
        };

    case CHANGE_IPP:
        return {
            ...state,
            itemsPerPage : action.payload,
            pageCount    : Math.floor(state.posts.length / action.payload) - 1,
            activePage   : 0,
        };

    case CHANGE_PAGE:
        return {
            ...state,
            activePage : action.payload,
        };

    case POSTS_TOGGLE_FAVORITE:
        let post = action.payload;
        let favorite = state.favorite;

        if (favorite[post.id]) {
            delete favorite[post.id];
        }
        else {
            favorite[post.id] = true;
        }

        localStorage.setItem('upci_posts_favorite', JSON.stringify(favorite));

        return {
            ...state,
            favorite : { ...favorite },
        };

    default:
        return state;
    }
};

export const changePage = (newPage) => {
    return dispatch => {
        dispatch({
            type    : CHANGE_PAGE,
            payload : newPage,
        });
    };
};

export const changeIPP = (itemsPerPage) => {
    return dispatch => {
        dispatch({
            type    : CHANGE_IPP,
            payload : itemsPerPage,
        });
    };
};

export const toggleFavorite = (post) => {
    return dispatch => {
        dispatch({
            type    : POSTS_TOGGLE_FAVORITE,
            payload : post,
        });
    };
};

export const postsRequest = () => {
    return (dispatch, getState) => {
        let state = getState();

        if (!state.posts.posts.length) {
            dispatch({ type: POSTS_REQUEST });

            let posts = localStorage.getItem('upci_posts');

            if (posts && posts.length) {
                dispatch({
                    type    : POSTS_REQUEST_SUCCESS,
                    payload : JSON.parse(posts),
                });
            }
            else {
                return fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then((json) => {
                        console.log(json);
                        localStorage.setItem('upci_posts', JSON.stringify(json));
                        dispatch({
                            type    : POSTS_REQUEST_SUCCESS,
                            payload : json,
                        });
                    });
            }

        }

    };
};

