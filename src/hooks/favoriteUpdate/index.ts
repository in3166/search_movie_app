import { useCallback } from 'react'
import store from 'store'

import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state'
import { favoritesState } from 'states/favoriteItem'
import { moviesState } from 'states/movieItem'
import { LOCAL_STORAGE_KEY } from 'utils/constants'
import { changeMovieItemLike } from 'utils/changeIsLiked'

interface IUseFavoriteUpdateProps {
  selectedMovie: IMovieItem | null
}

const useFavoriteUpdate = ({ selectedMovie }: IUseFavoriteUpdateProps) => {
  const [movies, setMovies] = useRecoil(moviesState)
  const [, setFavoriteMovies] = useRecoil(favoritesState)

  const removeFromFavorite = useCallback(() => {
    if (!selectedMovie) return
    setFavoriteMovies((prev) =>
      prev.filter(
        (prevFavorite) => prevFavorite.title !== selectedMovie.title && prevFavorite.imdbID !== selectedMovie.imdbID
      )
    )

    let localFavorites = store.get(LOCAL_STORAGE_KEY)
    localFavorites = localFavorites.filter(
      (favoriteItem: IMovieItem) =>
        favoriteItem.title !== selectedMovie.title && favoriteItem.imdbID !== selectedMovie.imdbID
    )

    store.remove(LOCAL_STORAGE_KEY)
    store.set(LOCAL_STORAGE_KEY, localFavorites)

    const newList = changeMovieItemLike(movies, selectedMovie)
    setMovies(newList)
  }, [setFavoriteMovies, selectedMovie, movies, setMovies])

  const addToFavorite = useCallback(() => {
    if (!selectedMovie) return
    const likeItem = { ...selectedMovie, isLiked: !selectedMovie.isLiked }
    setFavoriteMovies((prev) => [...prev, { ...likeItem, isLiked: true }])

    const localFavorites = store.get(LOCAL_STORAGE_KEY)
    if (localFavorites) {
      localFavorites.push({ ...selectedMovie, isLiked: true })
      store.set(LOCAL_STORAGE_KEY, localFavorites)
    } else {
      store.set(LOCAL_STORAGE_KEY, [likeItem])
    }

    const newList = changeMovieItemLike(movies, selectedMovie)
    setMovies(newList)
  }, [setFavoriteMovies, selectedMovie, movies, setMovies])

  return { removeFromFavorite, addToFavorite }
}

export default useFavoriteUpdate
