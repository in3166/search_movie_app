import { Dispatch, DragEvent, SetStateAction } from 'react'
import { SetterOrUpdater } from 'recoil'
import store from 'store'

import { IMovieItem } from 'types/movie'
import { LOCAL_STORAGE_KEY } from 'utils/constants'

interface IUseDragListProps {
  setDragVisible: Dispatch<SetStateAction<boolean>>
  setGrabbing: Dispatch<SetStateAction<boolean>>
  favoriteMovies: IMovieItem[]
  setFavoriteMovies: SetterOrUpdater<IMovieItem[]>
  grab?: HTMLLIElement | null
  setGrab?: Dispatch<SetStateAction<HTMLLIElement | null>>
}

const useDragList = ({
  setDragVisible,
  setGrab,
  setGrabbing,
  grab,
  favoriteMovies,
  setFavoriteMovies,
}: IUseDragListProps) => {
  const handleOnDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    setDragVisible(true)
  }

  const handleOnDragStart = (e: DragEvent<HTMLLIElement>) => {
    if (setGrab) setGrab(e.currentTarget)
    setGrabbing(true)
  }

  const handleOnDragEnd = () => {
    setGrabbing(false)
    if (setGrab) setGrab(null)
  }

  const handleOnDrop = (e: DragEvent<HTMLLIElement>) => {
    let grabPosition
    if (grab) {
      grabPosition = Number(grab.dataset.position)
      const targetPosition = Number(e.currentTarget.dataset.position)
      const list = [...favoriteMovies]

      if (grabPosition < targetPosition) {
        list.splice(targetPosition + 1, 0, list[grabPosition])
        list.splice(grabPosition, 1)
      } else if (grabPosition > targetPosition) {
        list.splice(targetPosition, 0, list[grabPosition])
        list.splice(grabPosition + 1, 1)
      }

      store.remove(LOCAL_STORAGE_KEY)
      store.set(LOCAL_STORAGE_KEY, list)
      setFavoriteMovies(list)
    }
    setDragVisible(false)
  }

  const handleOnDragEnter = () => {
    setDragVisible(false)
  }

  const handleOnDragLeave = () => {
    setDragVisible(false)
  }

  return { handleOnDragOver, handleOnDragStart, handleOnDragEnd, handleOnDrop, handleOnDragEnter, handleOnDragLeave }
}

export default useDragList
