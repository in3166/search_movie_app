import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import FavoritePage from './FavoritePage'
import Container from 'components/container'
import Header from 'components/Header'
import GNB from './_shared/GNB'

// TODO: 추후 라우팅, outlet
const App = () => {
  console.log(process.env.PUBLIC_URL)
  console.log(process.env.REACT_APP_MOVIE_API_KEY)
  console.log(process.env.REACT_PUBLIC_URL)
  return (
    <div className={styles.app}>
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='favorites' element={<FavoritePage />} />
          <Route path='*' element={<div className={styles.notFound}>404: Page Not found.</div>} />
        </Routes>
        <GNB />
      </Container>
    </div>
  )
}

export default App
