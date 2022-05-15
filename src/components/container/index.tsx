import { ReactNode } from 'react'

import { cx } from '../../styles'
import styles from './Container.module.scss'
import BackgroundUI from './BackgroundUI'

interface IContainerProps {
  children: ReactNode
}

const Container = ({ children }: IContainerProps) => {
  return (
    <div className={cx(styles.container)}>
      {children}
      <BackgroundUI />
    </div>
  )
}

export default Container
