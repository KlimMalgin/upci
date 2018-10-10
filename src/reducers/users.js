export const USERS_REQUEST = 'users/USERS_REQUEST';
export const USERS_REQUEST_SUCCESS = 'users/USERS_REQUEST_SUCCESS';
export const USERS_FILTER = 'users/USERS_FILTER';

const initialState = {
    users          : [],
    favorite       : [],
    usernameFilter : localStorage.getItem('upci_filter') || '',
    inProcess      : false,
};

export default (state = initialState, action) => {
    switch (action.type) {
    case USERS_REQUEST:
        return {
            ...state,
            inProcess : true,
        };

    case USERS_REQUEST_SUCCESS:
        return {
            ...state,
            users     : action.payload,
            inProcess : false,
        };

    case USERS_FILTER:
        return {
            ...state,
            usernameFilter : action.payload,
        };

    default:
        return state;
    }
};

export const filterByUsername = (username) => {
    return dispatch => {
        localStorage.setItem('upci_filter', username);
        dispatch({
            type    : USERS_FILTER,
            payload : username,
        });
    };
};

export const usersRequest = () => {
    return (dispatch, getState) => {
        let state = getState();

        if (!state.users.users.length) {
            dispatch({ type: USERS_REQUEST });

            let users = localStorage.getItem('upci_users');

            if (users && users.length) {
                dispatch({
                    type    : USERS_REQUEST_SUCCESS,
                    payload : JSON.parse(users),
                });
            }
            else {
                return fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then((json) => {
                        console.log(json);
                        localStorage.setItem('upci_users', JSON.stringify(json));
                        dispatch({
                            type    : USERS_REQUEST_SUCCESS,
                            payload : json,
                        });
                    });
            }

        }

    };
};

