import { IMovieItem } from 'types/movie'

export function getIsFavorite(favoriteMovies: IMovieItem[], movieItem: IMovieItem) {
  const result = favoriteMovies.findIndex(
    (value) => value.imdbID === movieItem.imdbID && value.title === movieItem.title
  )
  if (result !== -1) return true

  return false
}
