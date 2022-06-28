import { MouseEvent, MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'

import defaultImg from 'assets/defaultImg.png'
import styles from './Modal.module.scss'
import { IMovieItem } from 'types/movie'
import useFavoriteUpdate from 'hooks/favoriteUpdate'

interface IBackDropProps {
  onCancel: MouseEventHandler<HTMLButtonElement>
}

interface IModalProps {
  isRemove: boolean
  movie: IMovieItem
  onCancel: MouseEventHandler<HTMLButtonElement>
}

const BackDrop = ({ onCancel }: IBackDropProps) => {
  return (
    <button type='button' onClick={onCancel} className={styles.backDropButton}>
      <div className={styles.backDrop} />
    </button>
  )
}

const ModalOverlay = ({ isRemove, movie, onCancel }: IModalProps) => {
  const handleImgOnError = (e: MouseEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImg
  }

  const { removeFromFavorite, addToFavorite } = useFavoriteUpdate({
    selectedMovie: movie,
  })

  const handleRemoveFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    removeFromFavorite()
    onCancel(e)
  }

  const handleAddFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    addToFavorite()
    onCancel(e)
  }

  const makeClickButton = () => {
    let onClick = handleAddFavorite
    let content = '추가'
    if (isRemove) {
      onClick = handleRemoveFavorite
      content = '제거'
    }

    return (
      <button type='button' onClick={onClick}>
        {content}
      </button>
    )
  }

  const clickButton = makeClickButton()

  return (
    <div className={styles.modal}>
      <div className={styles.modalActive}>
        <header className={styles.header}>
          <div>
            <img src={movie.poster} alt='movie poster' onError={handleImgOnError} />
          </div>
          <dl>
            <dt className={styles.title}>
              <p>{movie.title}</p>
            </dt>
            <dd className={styles.type}>
              <p>Type: {movie.type}</p>
            </dd>
            <dd className={styles.year}>
              <p>Year: {movie.year}</p>
            </dd>
          </dl>
        </header>
        <div className={styles.content}>
          <div>
            <p>
              즐겨찾기를 <strong>{isRemove ? '제거' : '추가'}</strong> 하시겠습니까?
            </p>
          </div>
        </div>
        <footer className={styles.footer}>
          {clickButton}
          <button type='button' onClick={onCancel}>
            취소
          </button>
        </footer>
      </div>
    </div>
  )
}

const Modal = ({ isRemove, movie, onCancel }: IModalProps) => {
  const backDropElement = document?.getElementById('backdrop-root')
  const modalElement = document?.getElementById('favorite-modal')

  return (
    <>
      {backDropElement && ReactDOM.createPortal(<BackDrop onCancel={onCancel} />, backDropElement)}

      {modalElement &&
        ReactDOM.createPortal(<ModalOverlay movie={movie} isRemove={isRemove} onCancel={onCancel} />, modalElement)}
    </>
  )
}

export default Modal
