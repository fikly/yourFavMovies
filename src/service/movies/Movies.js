import axios from 'axios'
import { API_URL } from '../../utils/Variable';

export const getMoviesBySearch = async (param, page) =>{
    let result = []
    const headers = {
        'content-type': 'application/json'
    }

    await axios.get(API_URL+'&s='+param+'&page='+page, {headers : headers})
    .then(function (response) {
        result = response.data
    })
    .catch(function (error) {
        console.log(error)
    });

    return result
}

export const getMoviesById = async (id) =>{
    let result = []
    const headers = {
        'content-type': 'application/json'
    }

    await axios.get(API_URL+'&i='+id, {headers : headers})
    .then(function (response) {
        result = response.data
    })
    .catch(function (error) {
        console.log(error)
    });

    return result
}