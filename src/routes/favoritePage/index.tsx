import FavoriteModal from 'components/favoriteModal/FavoriteModal'
import React, { useState } from 'react'

const FavoritePage = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleModalVisibleChange = () => {

  }

  const handleRemoveFavorite = () => {
    console.log('remove fav')
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <div>FavoritePage
      {modalVisible && (
        <FavoriteModal onClick={handleRemoveFavorite} onCancel={handleCloseModal} content="제거" />
      )}
    </div>
  )
}

export default FavoritePage