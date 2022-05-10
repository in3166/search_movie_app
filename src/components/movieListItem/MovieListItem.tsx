import React from 'react'
import { cx } from 'styles'
import styles from './MovieListItem.module.scss'

interface IMovieItems {
  Title: string,
  Year: string,
  Type: string,
  Poster: string,
}

interface MovieListItemProps {
  movie: IMovieItems
  onClick: React.MouseEventHandler<HTMLElement>
}

const MovieListItem = ({ movie, onClick }: MovieListItemProps) => {
  return (
    <div className={cx(styles.itemWrapper)} onClick={onClick} role="button" tabIndex={0}>
      <div className={cx(styles.poster)}><img src={movie.Poster} alt="movie poster" /></div>
      <div>
        <div>{movie.Title}</div>
        <div>{movie.Year}</div>
        <div>{movie.Type}</div>
      </div>
    </div>
  )
}

export default MovieListItem