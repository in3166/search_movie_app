import styles from './Routes.module.scss'
import { Routes, Route, useLocation } from 'react-router-dom'
import Container from 'components/container'
import Header from 'components/Header'
import GNB from './_shared/GNB'

import MainPage from './MainPage'
import FavoritePage from './FavoritePage'
import ErrorBoundary from 'components/ErrorBoundary'
import { useRecoil } from 'hooks/state'
import { errorMovieState } from 'states/movieItem'

const App = () => {
  const location = useLocation()
  const [error, ,] = useRecoil(errorMovieState)
  return (
    <div className={styles.app}>
      <Container>
        <ErrorBoundary myError={error} key={location.pathname}>
          <Header />
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
