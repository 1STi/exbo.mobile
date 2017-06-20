// Libs
import React from 'react';
import {
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';

const GalleryImage = (props) => {

  const selectPhoto = () => {
    props.selectPhoto(props.photo);
  };

  return (
    <TouchableOpacity
      onPress={selectPhoto}
      style={styles.imgContainer}>
      <Image 
        source={{uri: props.photo}}
        style={styles.img} />
    </TouchableOpacity>
  );
};

const styles = {
  imgContainer: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.35
  },
  img: {
    flex: 1
  }
};

export default GalleryImage;