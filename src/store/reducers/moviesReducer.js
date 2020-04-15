import {
    SET_FAV_MOVIES
} from '../actions/moviesAction'


const initialState = {
    favMovies : []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FAV_MOVIES:
            return {
                ...state,
                favMovies: action.data
            }
        default:
            return state
    }
}