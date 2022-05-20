import styles from './ErrorFallback.module.scss'
import { IMovieErrorResponse } from 'types/movie'

interface IErrorFallbackProps {
  error?: Error | null
  myError: IMovieErrorResponse
}

const ErrorFallback = ({ error, myError }: IErrorFallbackProps) => {
  const myErrorHandler = () => {
    window.location.reload()
  }

  return (
    <div role='alert' className={styles.wrapper}>
      <dl>
        <dt className={styles.errorTitle}>Error</dt>
        <dd>{myError.error}</dd>
        <dd>{error?.message}</dd>
      </dl>
      <dl>
        <dt>Error Code</dt>
        <dd>{myError.code}</dd>
      </dl>
      <dl>
        <dt>Error Message</dt>
        <dd className={styles.errorText}>{myError.message}</dd>
      </dl>
      <button type='button' onClick={myErrorHandler} className={styles.reloadButton}>
        새로고침
      </button>
    </div>
  )
}

export default ErrorFallback
