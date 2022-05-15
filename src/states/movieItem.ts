import { IMovieErrorResponse, IMovieItem, ICurrentMovie } from 'types/movie'
import { atom } from 'hooks/state/index'

export const currentPageState = atom<ICurrentMovie>({
  key: 'currentMovieState',
  default: {
    searchText: '',
    page: 1,
    totalResults: 0,
  },
})

export const errorMovieState = atom<IMovieErrorResponse>({
  key: 'errorMovieState',
  default: {
    isError: false,
    message: '',
    code: '',
    error: '',
  },
})

export const moviesState = atom<IMovieItem[]>({
  key: 'movies',
  default: [],
})
