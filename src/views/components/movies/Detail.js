import React, {useEffect, useState} from "react"
import { getMoviesById } from "../../../service/movies/Movies";

const DetailMovies = (props) =>{

    const [detail, setDetail] = useState([])

    useEffect(() => {
        getMoviesById(props.id).then(res => {
            if(res.Response === "True"){
                setDetail(res)
            }else{
                console.log(res)
            }
        })
    }, [props.id]);

    return(
        <div className="detail-content">
            <div className="row">
                <div className="col-md-6 align-self-center">
                    <div className="banner">
                        <img src={detail.Poster} alt={detail.Title} className="w-100" />
                    </div>
                </div>
                <div className="col-md-6">
                    <h3 className="font-weight-bold">{ detail.Title }</h3>
                    <table className="table mb-0">
                        <tbody>
                            <tr>
                                <td>Year</td>
                                <td>{ detail.Year }</td>
                            </tr>
                            <tr>
                                <td>Released</td>
                                <td>{ detail.Released }</td>
                            </tr>
                            <tr>
                                <td>Director</td>
                                <td>{ detail.Director }</td>
                            </tr>
                            <tr>
                                <td>Actors</td>
                                <td>{ detail.Actors }</td>
                            </tr>
                            <tr>
                                <td>Plot</td>
                                <td>{ detail.Plot }</td>
                            </tr>
                            <tr>
                                <td>Awards</td>
                                <td>{ detail.Awards }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailMovies