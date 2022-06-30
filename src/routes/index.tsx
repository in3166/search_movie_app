import store from 'store'
import styles from './Routes.module.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import Container from 'components/container'
import GNB from './_shared/GNB'

import MainPage from './MainPage'
import FavoritePage from './FavoritePage'
import ErrorBoundary from 'components/ErrorBoundary'
import { useRecoil } from 'hooks/state'
import { errorMovieState } from 'states/movieItem'
import { useMount } from 'hooks'
import { LOCAL_STORAGE_KEY } from 'utils/constants'
import { favoritesState } from 'states/favoriteItem'

const App = () => {
  const location = useLocation()
  const [, setFavoriteMovies] = useRecoil(favoritesState)
  const [error, ,] = useRecoil(errorMovieState)

  useMount(() => {
    const storedFavoriteMovies = store.get(LOCAL_STORAGE_KEY)
    if (storedFavoriteMovies?.length > 0) setFavoriteMovies(storedFavoriteMovies)
  })

  return (
    <div className={styles.app}>
      <Container>
        <ErrorBoundary myError={error} key={location.pathname}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='favorites' element={<FavoritePage />} />
            <Route path='*' element={<div className={styles.notFound}>404: Page Not found.</div>} />
          </Routes>
        </ErrorBoundary>
        <GNB />
      </Container>
    </div>
  )
}

export default App
