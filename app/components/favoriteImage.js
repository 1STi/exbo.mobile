// Libs
import React from 'react';
import { 
  TouchableOpacity, 
  Text,
  Image
} from 'react-native';

// Images
import star from '../../assets/favorite.png';
import starOutline from '../../assets/favorite-outline.png';

const FavoriteImage = (props) => {

  const setFavorite = () => {
    props.favoriteImage({
      selectedExbo: props.selectedExbo,
      uri: props.photoUri
    });
  }

  return (
    <TouchableOpacity
      onPress={setFavorite}
      style={styles.starContainer}>
      <Image
        source={props.isFavorite 
          ? star
          : starOutline
        }
        style={[styles.icon, !props.isFavorite 
          ? {width: 32, height: 32} 
          : null
        ]}/>
    </TouchableOpacity>
  );
};

const styles = {
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  icon: {
    width: 35,
    height: 35
  }
};

export default FavoriteImage;