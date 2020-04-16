import React, {useState, useRef} from "react"
import {useSelector, useDispatch} from "react-redux"

import { SET_FAV_MOVIES } from "../../../store/actions/moviesAction"
import OutSideClick from "../../../utils/helper/OutSideClick"
import DetailMovies from "./Detail"

const ListMovies = (props) =>{
    const dispatch = useDispatch()
    const movieReducer = useSelector(state => state.movies)
    const listMovies = movieReducer.listMovies
    const favMovies = movieReducer.favMovies

    const setFavMovies = (data) => dispatch({type: SET_FAV_MOVIES, data})

    const handleEditFavourite = (index, imdbID) => {
        let data = favMovies
        if(data.length === 0){
            data = [listMovies[index]]
        }else{
            if(favMovies.filter(fav => fav.imdbID === imdbID).length > 0){
                data = favMovies.filter(fav => fav.imdbID !== imdbID)
            }else{
                data.push(listMovies[index])
            }
        }
        setFavMovies(data)
    }

    const [showDetail, setShowDetail] = useState(false)
    const [selectedId, setSelectedId] = useState("")

    const popUpRef = useRef()
    OutSideClick(popUpRef, () =>{
        if(showDetail === true) setShowDetail(false)
    })

    const handleShowDetail = (imdbID) =>{
        setSelectedId(imdbID)
        setShowDetail(true)
    }

    return(
        <div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>imDB ID</th>
                        <th></th>
                    </tr>        
                </thead>
                {listMovies.length > 0 ? (
                <tbody>
                    {listMovies.map((row, index) => {
                        return(
                        <tr key={index}>
                            <td className="text-center"><img src={row.Poster} alt={row.Title} height="150px" /></td>
                            <td><b style={{cursor: 'pointer'}} onClick={() => handleShowDetail(row.imdbID)}>{ row.Title }</b></td>
                            <td className="text-center">{ row.Year }</td>
                            <td className="text-center">{ row.imdbID }</td>
                            <td className="text-center">
                                <i className={(favMovies.filter(fav => fav.imdbID === row.imdbID).length > 0 ? "fas" : "far")+" fa-star"} onClick={() => handleEditFavourite(index, row.imdbID)}></i>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
                ) : (
                <tbody>
                    <tr>
                        <td colSpan="5a" className="text-center">No List Movies</td>
                    </tr>
                </tbody>
                )}
            </table>
            {(showDetail && selectedId !== "") &&
            <div className="position-fixed overlay-popup h-100 w-100">
                <div className="d-flex justify-content-center align-items-center h-100 flex-column">
                    <div className="content-popup p-4 w-50" ref={popUpRef}>
                        <DetailMovies id={selectedId} />
                    </div>
                    <h5 className="mb-0 mt-2" style={{color: "#ffffff", fontSize: '12px', letterSpacing: '1.2px'}}>Tap anywhere to dismiss</h5>
                </div>
            </div>}
        </div>
    )
}

export default ListMovies