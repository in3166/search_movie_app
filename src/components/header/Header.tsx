import React, { MouseEventHandler, useRef, useState } from 'react'
import { BsFillMoonFill } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { IoMdSunny } from 'react-icons/io'

import { useRecoilState } from 'hooks/state/'
import { currentMovieState, errorMovieState, MoviesState } from 'states/movieItem'
import { cx } from 'styles'
import styles from './Header.module.scss'
import { getMoviesList } from 'services/movie'
import { useClickOutsideListenerRef } from 'hooks/outsideClick/oustsideClick'

// search bar 분리?
const Header = () => {
  const [toggleDarkMode, settoggleDarkMode] = useState(false)
  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const [searchText, setSearchText] = useState('')

  const focusRef = useRef<HTMLInputElement>(null)

  // set만 쓰게 바꾸기
  const [currentMovie, setCurrentMovie] = useRecoilState(currentMovieState)
  const [movies, setMovies] = useRecoilState(MoviesState)
  const [findError, setFindError] = useRecoilState(errorMovieState)

  // form event?
  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleOpenSearchBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setToggleSearchBar(true)
    focusRef.current?.focus()
  }

  const handleCloseSearchBar = () => {
    setToggleSearchBar(false)
  }

  // Search bar 외부 선택 시 닫기
  const formRef = useClickOutsideListenerRef(handleCloseSearchBar)

  const handleClickDarkMode = () => {
    settoggleDarkMode(prev => !prev)
  }
  // React. => 위에서 한번에 갖고 오기, FormEvent
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.currentTarget as typeof e.currentTarget & {
      searchInputText: { value: string };
    }

    const text = target.searchInputText.value
    if (text === '') {
      handleCloseSearchBar()
      return
    }

    setCurrentMovie({ title: text, page: 1 })
    // async - await?
    getMoviesList({ searchText: text, pageNumber: 1 }).then(
      res => {
        console.log('res: ', res)
        if (res.data.Error) {
          setFindError({ response: false, message: res.data.Error })
          setMovies([]) // reset으로 수정
        } else {
          setFindError({ response: true, message: '' })
          setMovies(res.data.Search)
        }
      }
    ).catch((err) => {
      console.log('err: ', err)
      setFindError({ response: false, message: err.message })
    })
      .finally(() => {
        setSearchText('')
        handleCloseSearchBar()
      })
  }

  return (
    <header className={cx(styles.wrapper)}>
      <div className={cx(styles.search)} ref={formRef} >
        <button type="button" onClick={handleOpenSearchBar} className={cx(styles.searchToggleButton, { [styles.hideToggleButton]: toggleSearchBar })}>
          <FaSearch size="1.1em" />
        </button>

        <form onSubmit={handleSubmitSearch} className={cx(styles.searchForm, { [styles.searchBarOpen]: toggleSearchBar })}>
          <input type="text" title="Search Bar" ref={focusRef} name="searchInputText" value={searchText} onChange={handleChangeSearchText} className={cx(styles.searchInput)} />
          <button type="submit" className={cx({ [styles.searchButton]: !toggleSearchBar })}>
            <FaSearch size="1.1em" />
          </button>
        </form>
      </div>

      {!toggleSearchBar && <h3 className={cx(styles.title)}><strong>Movies</strong></h3>}

      <div className={cx(styles.darkMode)}>
        <button type="button" onClick={handleClickDarkMode}>
          {toggleDarkMode ?
            <BsFillMoonFill size="1.1em" color='yellow' />
            :
            <IoMdSunny size="1.5em" color='white' />
          }
        </button>
      </div>
    </header>
  )
}

export default Header
