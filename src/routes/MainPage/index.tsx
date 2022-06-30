import { lazy, Suspense, useRef, useState } from 'react'

import { IMovieItem } from 'types/movie'
import { useRecoil } from 'hooks/state/'
import { errorMovieState, moviesState } from 'states/movieItem'

import { Modal, Loading, SearchBar, Header } from 'components'
import { cx } from 'styles'
import styles from './MainPage.module.scss'
import { useIntersectionObserver } from 'hooks'
import { favoritesState } from 'states/favoriteItem'

const LazyMovieItem = lazy(() => import('components/MovieItem'))

const MainPage = () => {
  const [movies, ,] = useRecoil(moviesState)
  const [searchError] = useRecoil(errorMovieState)
  const [favoriteMovies, setFavoriteMovies] = useRecoil(favoritesState)

  const listRef = useRef<HTMLUListElement>(null)

  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isLikeModal, setIsLikeModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = (value: IMovieItem, isLike: boolean) => {
    setIsLikeModal(isLike)
    setSelectedMovie(value)
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const setTarget = useIntersectionObserver(
    ref,
    { root: listRef.current, rootMargin: '10px', threshold: 0 },
    setIsLoading
  )

  return (
    <>
      <Header listRef={listRef} title='Movies' />
      <SearchBar listRef={listRef} />
      <main className={styles.wrapper}>
        {searchError.isError && (
          <div className={styles.infoText}>
            <p>{searchError.error}</p>
          </div>
        )}

        {isLoading && <Loading />}

        {!searchError.isError && !isLoading && movies.length === 0 && (
          <div className={styles.infoText}>
            <p>검색 결과가 없습니다.</p>
          </div>
        )}

        {movies.length > 0 && (
          <ul className={cx({ [styles.movieLists]: movies.length > 0 })} ref={listRef}>
            <Suspense fallback={<Loading />}>
              {movies.map((value, index) => {
                return (
                  <LazyMovieItem
                    index={index}
                    key={`${value.imdbID}-${index + 1}`}
                    movie={value}
                    isDraggable={false}
                    onClick={handleOpenModal}
                    favoriteMovies={favoriteMovies}
                    setFavoriteMovies={setFavoriteMovies}
                  />
                )
              })}
              {!isLoading && <li ref={setTarget} className={styles.scrollTargetLi} />}
            </Suspense>
          </ul>
        )}

        {modalVisible && selectedMovie && (
          <Modal onCancel={handleCloseModal} isRemove={isLikeModal} movie={selectedMovie} />
        )}
      </main>
    </>
  )
}

export default MainPage
