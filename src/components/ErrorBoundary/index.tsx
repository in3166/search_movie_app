import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'
import { IMovieErrorResponse } from 'types/movie'
import ErrorFallback from './ErrorFallback'

interface IErrorBoundaryProps {
  children: ReactNode
  myError: IMovieErrorResponse
}

const ErrorBoundary = ({ children, myError }: IErrorBoundaryProps) => {
  const handleFallback = (props: FallbackProps) => {
    return <ErrorFallback {...props} myError={myError} />
  }

  return <ReactErrorBoundary FallbackComponent={handleFallback}>{children}</ReactErrorBoundary>
}

export default ErrorBoundary
