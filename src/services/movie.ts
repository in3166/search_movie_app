import axios from "axios"
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
    searchText: string
    pageNumber: number
}


const getMoviesList = (params: Params) => {
    return axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${params.searchText}&page=${params.pageNumber}`)
}

export { getMoviesList }