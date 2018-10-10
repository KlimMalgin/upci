export const COMMENTS_REQUEST = 'comments/COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESS = 'comments/COMMENTS_REQUEST_SUCCESS';
export const COMMENTS_TOGGLE_FAVORITE = 'comments/COMMENTS_TOGGLE_FAVORITE';
export const CHANGE_PAGE = 'comments/CHANGE_PAGE';
export const CHANGE_IPP = 'comments/CHANGE_IPP';

const initialState = {
    comments     : [],
    activePage   : 0,
    itemsPerPage : 10,
    pageCount    : 0,
    favorite     : JSON.parse(localStorage.getItem('upci_comments_favorite')) || {},
    inProcess    : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case COMMENTS_REQUEST:
        return {
            ...state,
            inProcess : true,
        };

    case COMMENTS_REQUEST_SUCCESS:
        return {
            ...state,
            comments  : action.payload,
            pageCount : Math.floor(action.payload.length / state.itemsPerPage) - 1,
            inProcess : false,
        };

    case CHANGE_IPP:
        return {
            ...state,
            itemsPerPage : action.payload,
            pageCount    : Math.floor(state.comments.length / action.payload) - 1,
            activePage   : 0,
        };

    case COMMENTS_TOGGLE_FAVORITE:
        let comment = action.payload;
        let favorite = state.favorite;

        if (favorite[comment.id]) {
            delete favorite[comment.id];
        }
        else {
            favorite[comment.id] = true;
        }

        localStorage.setItem('upci_comments_favorite', JSON.stringify(favorite));

        return {
            ...state,
            favorite : { ...favorite },
        };

    case CHANGE_PAGE:
        return {
            ...state,
            activePage : action.payload,
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

export const toggleFavorite = (comment) => {
    return dispatch => {
        dispatch({
            type    : COMMENTS_TOGGLE_FAVORITE,
            payload : comment,
        });
    };
};

export const commentsRequest = () => {
    return (dispatch, getState) => {
        let state = getState();

        if (!state.comments.comments.length) {
            dispatch({ type: COMMENTS_REQUEST });

            let comments = localStorage.getItem('upci_comments');

            if (comments && comments.length) {
                dispatch({
                    type    : COMMENTS_REQUEST_SUCCESS,
                    payload : JSON.parse(comments),
                });
            }
            else {
                return fetch('https://jsonplaceholder.typicode.com/comments')
                    .then(response => response.json())
                    .then((json) => {
                        console.log(json);
                        localStorage.setItem('upci_comments', JSON.stringify(json));
                        dispatch({
                            type    : COMMENTS_REQUEST_SUCCESS,
                            payload : json,
                        });
                    });
            }

        }
    };
};

