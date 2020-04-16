import React from "react"
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"

const HeaderLayout = (props) =>{

    const movieReducer = useSelector(state => state.movies)
    const favMovies = movieReducer.favMovies

    return(
        <div className="header-content">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="title-content">
                        <h2 className="mb-0">
                            YFM
                            <span className="ml-1">(Your Favourite Movies)</span>
                        </h2>
                    </div>
                    <div className="menu-content">
                        <ul className="d-flex p-0 m-0">
                            <li><NavLink to="/">Search Movie</NavLink></li>
                            <li><NavLink to="/favourite">My Favourite <span class="badge badge-pil badge-primary">{ favMovies.length }</span></NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderLayout