import { RefObject } from 'react'

import { cx } from 'styles'
import styles from './Header.module.scss'
import SearchBar from './SearchBar'

interface IHeaderProps {
  listRef: RefObject<HTMLElement>
  title: string
}

const Header = ({ listRef, title }: IHeaderProps) => {
  const handleClickTitle = () => {
    listRef?.current?.scrollTo(0, 0)
  }

  return (
    <header className={cx(styles.wrapper)}>
      <SearchBar listRef={listRef} />
      <button type='button' onClick={handleClickTitle} className={cx(styles.title)}>
        <strong>{title}</strong>
      </button>
    </header>
  )
}

export default Header
