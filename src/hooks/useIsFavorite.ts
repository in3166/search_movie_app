import { favoritesState } from 'states/favoriteItem'
import { IMovieItem } from 'types/movie'
import { useRecoil } from './state'

export function useIsFavorite(movieItem: IMovieItem) {
  const [favoriteMovies] = useRecoil(favoritesState)

  const isFavorite = favoriteMovies.findIndex(
    (value) => value.imdbID === movieItem.imdbID && value.title === movieItem.title
  )
  if (isFavorite !== -1) return true

  return false
}
