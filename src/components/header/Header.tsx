import React, { useState } from 'react'
import { BsFillMoonFill } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { IoMdSunny } from 'react-icons/io'
import { cx } from 'styles'
import styles from './Header.module.scss'

const Header = () => {
  const [toggleSearchBar, settoggleSearchBar] = useState(false)
  const [toggleDarkMode, settoggleDarkMode] = useState(false)

  const handleClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    settoggleSearchBar(prev => !prev)
  }

  const handleClickDarkMode = () => {
    settoggleDarkMode(prev => !prev)
  }

  const handleSubmitSearch = () => {
    console.log('submit')
  }

  return (
    <header className={cx(styles.wrapper)}>
      <div className={cx(styles.search)}>
        <form onSubmit={handleSubmitSearch} className={cx(styles.searchForm, {[styles.searchBarOpen]:toggleSearchBar})}>
          <input type="text" title="Search Bar" className={cx(styles.searchInput)}/>
          <button type={toggleSearchBar ? "submit" : "button"} onClick={handleClickSearch} className={cx(styles.searchButton)}>
            <FaSearch size="1.1em" />
          </button>
        </form>
      </div>
      {!toggleSearchBar && <h3 className={cx(styles.title)}>Movies</h3>}
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
