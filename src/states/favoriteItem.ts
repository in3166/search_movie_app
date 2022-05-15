import store from 'store'
import { IMovieItem } from 'types/movie'
import { atom } from 'hooks/state/index'
import { LOCAL_STORAGE_KEY } from 'utils/constants'

const storedFavoriteMovies = store.get(LOCAL_STORAGE_KEY)

export const favoritesState = atom<IMovieItem[]>({
  key: 'favoriteMovies',
  default: storedFavoriteMovies ?? [],
})
