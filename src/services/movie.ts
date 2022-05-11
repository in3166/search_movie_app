import axios from "axios"
import { IMovieAPIRes } from 'types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
    searchText: string
    pageNumber: number
}

const api = axios.create({ baseURL: `${MOVIE_BASE_URL}` })// ??

// after request 를 만들어서 앞에 대문자거나 snake case 처리
// 통일된 형태로
// axios 인터셉터 - npm camel case
const getMoviesList = (params: Params) => {
    return axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${params.searchText}&page=${params.pageNumber}`)
}
// object로 넘기기

export { getMoviesList }