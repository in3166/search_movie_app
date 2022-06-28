import { IMovieItem } from 'types/movie'
import { atom } from 'hooks/state/index'

export const favoritesState = atom<IMovieItem[]>({
  key: 'favoriteMovies',
  default: [],
})
