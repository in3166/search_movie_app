import { useCallback } from 'react'
import store from 'store'

import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state'
import { favoritesState } from 'states/favoriteItem'
import { LOCAL_STORAGE_KEY } from 'utils/constants'

interface IUseFavoriteUpdateProps {
  selectedMovie: IMovieItem | null
}

const useFavoriteUpdate = ({ selectedMovie }: IUseFavoriteUpdateProps) => {
  const [, setFavoriteMovies] = useRecoil(favoritesState)

  const removeFromFavorite = useCallback(() => {
    if (!selectedMovie) return

    let localFavorites = store.get(LOCAL_STORAGE_KEY)
    localFavorites = localFavorites.filter(
      (favoriteItem: IMovieItem) =>
        favoriteItem.title !== selectedMovie.title && favoriteItem.imdbID !== selectedMovie.imdbID
    )

    store.remove(LOCAL_STORAGE_KEY)
    store.set(LOCAL_STORAGE_KEY, localFavorites)
    setFavoriteMovies(localFavorites)
  }, [setFavoriteMovies, selectedMovie])

  const addToFavorite = useCallback(() => {
    if (!selectedMovie) return
    const localFavorites = store.get(LOCAL_STORAGE_KEY)
    if (localFavorites) {
      localFavorites.push({ ...selectedMovie, isLiked: true })
      store.set(LOCAL_STORAGE_KEY, localFavorites)
    } else {
      store.set(LOCAL_STORAGE_KEY, [selectedMovie])
    }
    setFavoriteMovies(localFavorites)
  }, [setFavoriteMovies, selectedMovie])

  return { removeFromFavorite, addToFavorite }
}

export default useFavoriteUpdate
