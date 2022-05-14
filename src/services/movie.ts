import axios from 'axios'

const MOVIE_BASE_URL = 'http://www.omdbapi.com'

interface Params {
  searchText: string
  pageNumber: number
}

const axiosInstance = axios.create({
  baseURL: MOVIE_BASE_URL,
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    apikey: process.env.REACT_APP_MOVIE_API_KEY,
    s: config.params.searchText,
    page: config.params.pageNumber,
  }
  return config
})

interface ISearchResponse {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}
// object로 넘기기

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data.Response === 'False') {
      res.data.error = {
        isError: true,
        error: res?.data?.Error,
        code: res?.status,
        message: res?.data?.Error,
      }
      return Promise.reject(res)
    }

    res.data.movieList = res.data.Search.map((value: ISearchResponse) => {
      return {
        poster: value.Poster,
        title: value.Title,
        type: value.Type,
        year: value.Year,
        imdbID: value.imdbID,
        isLiked: false,
      }
    })
    return Promise.resolve(res)
  },
  (error) => {
    error.data = error.data || {}
    error.data.error = error.data.error || {}
    error.data.error = {
      isError: error?.response.data.response !== 'False',
      error: error?.response.data.Error,
      code: error.code,
      message: error.message,
    }
    return Promise.reject(error)
  }
)

const getMoviesList = (params: Params) =>
  axiosInstance('/', {
    params: {
      ...params,
      apikey: process.env.REACT_APP_MOVIE_API_KEY,
    },
  })

const getMoreMoviesList = (params: Params) =>
  axiosInstance.get(`/`, {
    params: {
      ...params,
      apikey: process.env.REACT_APP_MOVIE_API_KEY,
    },
  })

export { getMoviesList, getMoreMoviesList }
