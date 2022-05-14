import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useClickOutsideListenerRef } from 'hooks/outsideClick'
import { useRecoil } from 'hooks/state'
import { FaSearch } from 'react-icons/fa'
import { getMoviesList } from 'services/movie'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { cx } from 'styles'
import styles from './SearchBar.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { favoritesState } from 'states/favoriteItem'
import { IMovieItem } from 'types/movie'

interface ISearchBarProps {
  hadleMainScrollTop?: () => void
}

const SearchBar = ({ hadleMainScrollTop }: ISearchBarProps) => {
  const { pathname } = useLocation()
  const [searchText, setSearchText] = useState('')
  // TODO: set만 쓰게 바꾸기
  const [, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [, setMovies, resetMovies] = useRecoil(moviesState)
  const [favorites, ,] = useRecoil(favoritesState)
  const [, setError, resetError] = useRecoil(errorMovieState)
  const navigate = useNavigate()
  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const focusRef = useRef<HTMLInputElement>(null)

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleOpenSearchBar = () => {
    setToggleSearchBar(true)
    focusRef.current?.focus()
  }

  // Search bar 외부 선택 시 닫기
  const handleCloseSearchBar = () => {
    setToggleSearchBar(false)
    setSearchText('')
  }

  const checkLiked = (movieList: IMovieItem[]) => {
    let isLiked = false
    const tempList = movieList.map((value: IMovieItem) => {
      isLiked = favorites.some(
        (favorite: IMovieItem) => favorite.title === value.title && favorite.imdbID === value.imdbID
      )
      return { ...value, isLiked }
    })
    return tempList
  }

  const formRef = useClickOutsideListenerRef(handleCloseSearchBar)

  // TODO: 이전과 동일한 검색어 일 때 RETURN?, TOP 버튼
  // React. => 위에서 한번에 갖고 오기, FormEvent
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hadleMainScrollTop) hadleMainScrollTop()
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
        const totalResults = parseInt(res.data.totalResults, 10)
        resetError()
        const tempList = checkLiked(res.data.movieList)
        setMovies(tempList)
        setCurrentPage({ searchText: text, page: 1, totalResults })
      })
      .catch((err) => {
        setError(err.data.error)
        resetMovies()
        resetCurrentPage()
      })
      .finally(() => {
        setSearchText('')
        handleCloseSearchBar()
        if (pathname !== '/') navigate('/', { replace: true })
      })
  }

  return (
    <div className={cx(styles.searchBox)} ref={formRef}>
      <button
        type='button'
        onClick={handleOpenSearchBar}
        className={cx(styles.searchToggleButton, { [styles.hideToggleButton]: toggleSearchBar })}
      >
        <FaSearch size='1.1em' />
      </button>

      <form
        onSubmit={handleSubmitSearch}
        className={cx(styles.searchForm, { [styles.searchBarOpen]: toggleSearchBar })}
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
        <button type='submit' className={cx({ [styles.searchButton]: !toggleSearchBar })}>
          <FaSearch size='1.1em' />
        </button>
      </form>
    </div>
  )
}

export default SearchBar