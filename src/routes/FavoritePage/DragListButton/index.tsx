import { Dispatch } from 'react'
import { HiViewList } from 'react-icons/hi'

import styles from './DragListButton.module.scss'

interface IDragListButtonProps {
  setIsDraggable: Dispatch<React.SetStateAction<boolean>>
  isDraggable: boolean
}

const DragListButton = ({ setIsDraggable, isDraggable }: IDragListButtonProps): JSX.Element => {
  const handleClickDragButton = () => {
    setIsDraggable((prev) => !prev)
  }
  return (
    <button type='button' className={styles.editButton} onClick={handleClickDragButton}>
      {isDraggable ? '완료' : <HiViewList className={styles.editIcon} />}
    </button>
  )
}

export default DragListButton
