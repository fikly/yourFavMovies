import {
    SET_FAV_MOVIES,
    SET_LIST_MOVIES
} from '../actions/moviesAction'


const initialState = {
    favMovies : (localStorage.getItem("favourite") === null ? [] : JSON.parse(localStorage.getItem("favourite"))),
    listMovies : []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FAV_MOVIES:
            localStorage.setItem("favourite", JSON.stringify(action.data))
            return {
                ...state,
                favMovies: action.data
            }
        case SET_LIST_MOVIES:
            return {
                ...state,
                listMovies: action.data
            }
        default:
            return state
    }
}