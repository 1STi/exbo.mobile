// Libs
import React from 'react';
import {
  TouchableOpacity, 
  Image
} from 'react-native';

const FavoritePhoto = (props) => {
  
  const navigateInfoImage = () => {
    props.navigation.navigate('ImageInfo', {image: props.data.photo});
  };

  return (
    <TouchableOpacity
      onPress={navigateInfoImage}
      style={styles.favoritePhotoContainer}>
      <Image 
        source={{uri: props.data.photo}}
        style={styles.favoritePhoto} />
    </TouchableOpacity>
  );
};

const styles = {
  favoritePhotoContainer: {
    width: 90,
    height: 100
  },
  favoritePhoto: {
    flex: 1,
    resizeMode: 'cover'
  }
};

export default FavoritePhoto;