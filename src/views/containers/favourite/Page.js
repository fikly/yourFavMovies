import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"

import {SET_LIST_MOVIES} from "../../../store/actions/moviesAction"
import ListMovies from "../../components/movies/List"

const FavouritePage = (props) =>{

    const dispatch = useDispatch()
    const movieReducer = useSelector(state => state.movies)
    const favMovies = movieReducer.favMovies

    useEffect(() => {

        const setListMovies = (data) => dispatch({type: SET_LIST_MOVIES, data})

        setListMovies(favMovies)

    }, [dispatch, favMovies]);

    return(
        <div className="w-100">
            <div className="container">
                <div className="list-content">
                    <ListMovies />
                </div>
            </div>
        </div>
    )
}

export default FavouritePage