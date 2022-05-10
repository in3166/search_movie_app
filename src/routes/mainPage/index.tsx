import React, { useEffect, useState } from 'react'
import { cx } from 'styles'
import styles from './MainPage.module.scss'
import ListItem from 'components/movieListItem/MovieListItem'
import axios, { AxiosResponse } from 'axios'
import { useRecoilState } from 'hooks/state/'
import { getMoviesList } from 'services/movie'
import { IMovieError, IMovieItem } from 'types/movie'
import { errorMovieState, MoviesState } from 'recoil/movieItem'
import FavoriteModal from 'components/favoriteModal/FavoriteModal'

const MainPage = () => {
  const [movies, setMovies] = useRecoilState(MoviesState)
  const [findError, setfindError] = useRecoilState(errorMovieState)
  const [modalVisible, setModalVisible] = useState(false)

  // useEffect(() => {
  //   const result = getMoviesList({ searchText: 'iron', pageNumber: String(3) })

  //   result.then(res => {
  //     // console.log(res.data.Search)
  //     console.log(res.data)
  //     setMovies(res.data.Search)
  //     setTotalNumber(Number(res.data.totalResults))
  //   })
  //     .catch(err => {
  //       setError(err)
  //       console.log('err: ', err)
  //     })
  // }, [])

  const handleAddFavorite = () => {
    console.log('add fav')
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <div className={cx(styles.wrapper)}>
      {!findError.response && <div>Error: {findError.message}</div>}
      {findError.response && movies?.length === 0 && <div><p>검색 결과가 없습니다.</p></div>}
      {/* article? 확인 */}
      <article>
        {movies?.length > 0 && movies.map((value) => (
          <ListItem key={value.imdbID} movie={value} onClick={handleOpenModal} />
        ))}
      </article>
      {modalVisible && (
        <FavoriteModal onClick={handleAddFavorite} onCancel={handleCloseModal} content="추가" />
      )}
    </div>
  )
}

export default MainPage
