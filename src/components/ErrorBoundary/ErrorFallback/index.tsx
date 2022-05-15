import styles from './ErrorFallback.module.scss'
import { IMovieErrorResponse } from 'types/movie'

interface IErrorFallbackProps {
  error?: Error | null
  myError: IMovieErrorResponse
}

const ErrorFallback = ({ myError }: IErrorFallbackProps) => {
  const myErrorHandler = () => {
    window.location.reload()
  }

  return (
    <div role='alert' className={styles.wrapper}>
      <dl>
        <dt className={styles.errorTitle}>[Error]: {myError.error}</dt>
        <dd>{myError.code}</dd>
        <dd className={styles.errorText}>{myError.message}</dd>
      </dl>
      <button type='button' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  )
}

export default ErrorFallback
