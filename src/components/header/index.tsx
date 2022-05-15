import { useLocation } from 'react-router-dom'

import { cx } from 'styles'
import styles from './Header.module.scss'

const Header = () => {
  const { pathname } = useLocation()

  return (
    <header className={cx(styles.wrapper)}>
      <h3 className={cx(styles.title)}>
        <strong>{pathname === '/' ? 'Movies' : 'Favorites'}</strong>
      </h3>
    </header>
  )
}

export default Header
