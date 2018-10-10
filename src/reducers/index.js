import { combineReducers } from 'redux';
import comments from './comments';
import posts from './posts';
import users from './users';

export default combineReducers({
    comments,
    posts,
    users,
});
