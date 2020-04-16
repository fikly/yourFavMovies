import React, {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import Notifications, {notify} from "react-notify-toast"

import {SET_LIST_MOVIES} from "../../../store/actions/moviesAction"
import { getMoviesBySearch } from "../../../service/movies/Movies"
import ListMovies from "../../components/movies/List"
import Pagination from "../../components/pagination/Pagination"

const Homepage = (props) =>{

    const dispatch = useDispatch()

    const params = new URLSearchParams(props.location.search)
    const page = (params.get('page') === null ? 1 : parseInt(params.get('page')))

    const [searchText, setSearchText] = useState((params.get('param') === null ? "" : params.get('param')))
    const [totalPage, setTotalPage] = useState(0)

    const handleGetMovies = () =>{
        if(searchText === ""){
            notify.show('Fill blank text !!!', 'error', 2000)
        }else{
            props.history.push("/?param="+searchText)
        }
    }

    useEffect(() => {
        const setListMovies = (data) => dispatch({type: SET_LIST_MOVIES, data})

        const params = new URLSearchParams(props.location.search)
        const page = (params.get('page') === null ? 1 : parseInt(params.get('page')))
        const searchText = (params.get('param') === null ? "" : params.get('param'))

        getMoviesBySearch(searchText, page).then(res => {
            if(res.Response === "True"){
                setListMovies(res.Search)

                let totalPage = Math.ceil(res.totalResults / 10)
                if (totalPage < 2) {
                    totalPage = 0
                }
                setTotalPage(totalPage)
            }else{
                setListMovies([])
                console.log(res)
            }

            window.scrollTo(0, 0)
        })
    }, [props.location.search, dispatch]);

    return(
        <div className="w-100">
            <Notifications />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="search-content">
                            <div className="d-flex align-items-center">
                                <input type="text" className="form-control custom-form" placeholder="Enter movie title here..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                <button className="btn btn-primary" onClick={() => handleGetMovies()}>Search Movies</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-content">
                    <ListMovies />
                    <div className="mt-5 d-flex justify-content-center">
                        <Pagination totalPage={totalPage} currentPage={page} locationName={props.location.pathname} params={params} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage