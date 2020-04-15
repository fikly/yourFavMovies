import { combineReducers } from 'redux'
import moviesReducer from './reducers/moviesReducer'
export default combineReducers({
    user : moviesReducer,
});