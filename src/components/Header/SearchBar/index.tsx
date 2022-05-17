import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import { cx } from 'styles'
import styles from './SearchBar.module.scss'
import { useClickOutsideListenerRef } from 'hooks/outsideClick'
import { useRecoil } from 'hooks/state'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { favoritesState } from 'states/favoriteItem'
import { getMoviesList } from 'services/movie'
import { changeMovieListLike } from 'utils/changeIsLiked'
import { useErrorHandler } from 'react-error-boundary'

const SearchBar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')
  const [toggleSearchBar, setToggleSearchBar] = useState(false)

  const [, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [, setMovies, resetMovies] = useRecoil(moviesState)
  const [favorites, ,] = useRecoil(favoritesState)
  const [, setError, resetError] = useRecoil(errorMovieState)

  // Search Input에 focus
  const focusRef = useRef<HTMLInputElement>(null)
  const handleError = useErrorHandler()

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleOpenSearchBar = () => {
    setToggleSearchBar(true)
    focusRef.current?.focus()
  }

  const handleCloseSearchBar = () => {
    setToggleSearchBar(false)
    setSearchText('')
  }

  const formRef = useClickOutsideListenerRef(handleCloseSearchBar)

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMovies([])
    const target = e.currentTarget as typeof e.currentTarget & {
      searchInputText: { value: string }
    }

    const text = target.searchInputText.value
    if (text.trim().length === 0) {
      handleCloseSearchBar()
      return
    }

    getMoviesList({ searchText: text, pageNumber: 1 })
      .then((res) => {
        // 결과가 없거나 너무 많은 경우 체크
        if (res.data.Response === 'False') {
          setError(res.data.error)
          resetMovies()
          resetCurrentPage()
          return
        }

        const totalResults = parseInt(res.data.totalResults, 10)
        resetError()
        const tempList = changeMovieListLike(res.data.movieList, favorites)
        setMovies(tempList)
        setCurrentPage({ searchText: text, page: 1, totalResults })
      })
      .catch((err) => {
        setError(err.data.error)
        resetMovies()
        resetCurrentPage()
        // error를 ErrorBoundary에 알림 (ex. api key가 다른 경우)
        handleError(err.data.error)
      })
      .finally(() => {
        setSearchText('')
        handleCloseSearchBar()
        if (pathname !== '/') navigate('/', { replace: true })
      })
  }

  return (
    <div className={styles.searchBox} ref={formRef}>
      <button
        type='button'
        onClick={handleOpenSearchBar}
        className={cx(styles.searchToggleButton, { [styles.hideToggleButton]: toggleSearchBar })}
      >
        <FaSearch size='1.1em' />
      </button>

      <form
        onSubmit={handleSubmitSearch}
        className={cx(styles.searchForm, { [styles.searchFormOpen]: toggleSearchBar })}
      >
        <input
          type='text'
          title='Search Bar'
          ref={focusRef}
          name='searchInputText'
          value={searchText}
          onChange={handleChangeSearchText}
          className={cx(styles.searchInput)}
        />
        <button type='submit' className={cx({ [styles.searchSubmitButton]: !toggleSearchBar })}>
          <FaSearch size='1.1em' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar
