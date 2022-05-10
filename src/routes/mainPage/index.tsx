import React, { useEffect, useState } from 'react'
import { cx } from 'styles'
import styles from './MainPage.module.scss'
import ListItem from 'components/listItem/MovieListItem'
import axios, { AxiosResponse } from 'axios'
import { getMoviesList } from 'services/movie'
import { IMovieError, IMovieItem } from 'types/movie'

const MainPage = () => {
  const [movies, setMovies] = useState<IMovieItem[]>([])
  const [error, setError] = useState<IMovieError>()
  const [totalNumber, setTotalNumber] = useState(0)

  useEffect(() => {
    const result = getMoviesList({ searchText: 'iron', pageNumber: String(3) })

    result.then(res => {
      // console.log(res.data.Search)
      console.log(res.data)
      setMovies(res.data.Search)
      setTotalNumber(Number(res.data.totalResults))
    })
      .catch(err => {
        setError(err)
        console.log('err: ', err)
      })



  }, [])

  return (
    <div className={cx(styles.wrapper)}>
      {error && <div>Error: {error.response.data.Error}</div>}
      {!error && movies.length === 0 && <div>검색 결과가 없습니다.</div>}
      <div>
        <div>Total: {totalNumber}</div>
        {movies.length > 0 && movies.map((value) => (
          <ListItem key={value.imdbID} movie={value} />
        ))}
      </div>
    </div>
  )
}

export default MainPage
