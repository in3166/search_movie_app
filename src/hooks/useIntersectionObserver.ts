import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useState } from 'react'
import { getMoreMoviesList } from 'services/movie'
import { currentPageState, errorMovieState, moviesState } from 'states/movieItem'
import { useRecoil } from './state'

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: Args,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  const [currentPage, setCurrentPage, resetCurrentPage] = useRecoil(currentPageState)
  const [movies, setMovies, resetMovies] = useRecoil(moviesState)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [, setSearchError] = useRecoil(errorMovieState)

  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entries]) => {
      if (entries.isIntersecting) {
        setIsLoading(true)
        const { searchText, page, totalResults } = currentPage

        if (totalResults <= movies.length) {
          setIsLoading(false)
          return
        }

        const pageNumber = page + 1

        getMoreMoviesList({ searchText, pageNumber })
          .then((res) => {
            const tempList = res.data.movieList
            setMovies((prev) => [...prev, ...tempList])
            setCurrentPage((prev) => {
              return { ...prev, page: pageNumber }
            })
          })
          .catch((err) => {
            resetMovies()
            resetCurrentPage()
            setSearchError(err.data.error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    },
    [currentPage, movies.length, resetCurrentPage, resetMovies, setCurrentPage, setIsLoading, setMovies, setSearchError]
  )

  useEffect(() => {
    if (!target) return undefined

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
    observer.observe(target)

    return () => observer.unobserve(target)
  }, [elementRef, root, rootMargin, threshold, onIntersect, target])

  return setTarget
}
