import { IMovieItem } from 'types/movie'

const changeMovieItemLike = (movieList: IMovieItem[], movieItem: IMovieItem) => {
  const newList = movieList.map((value) => {
    if (value.imdbID === movieItem.imdbID && value.title === movieItem.title) {
      return { ...value, isLiked: !value.isLiked }
    }
    return value
  })
  return newList
}

const changeMovieListLike = (movieList: IMovieItem[], favorites: IMovieItem[]) => {
  let isLiked = false
  const tempList = movieList.map((value: IMovieItem) => {
    isLiked = favorites.some(
      (favorite: IMovieItem) => favorite.title === value.title && favorite.imdbID === value.imdbID
    )
    return { ...value, isLiked }
  })
  return tempList
}

export { changeMovieItemLike, changeMovieListLike }
