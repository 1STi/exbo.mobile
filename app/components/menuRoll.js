// Libs
import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

// Images
import star from '../../assets/star.png';
import starTransparent from '../../assets/star-transparent.png';
import feedback from '../../assets/feedback.png';

const MenuRoll = (props) => {
  return (
    <View style={styles.menuRoll}>
      <Image
        source={{uri: props.lastPicture}} 
        style={styles.picture} />
      <TouchableOpacity
        onPress={props.savePhotoFavorite}
        style={styles.menuRollIconContainer}>
        <Image
          source={props.isPhotoFavorite ? star : starTransparent}
          style={styles.menuRollIcon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.setInfoModal} 
        style={styles.menuRollIconContainer}>
        <Image
          source={feedback}
          style={styles.menuRollIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  menuRoll: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '20%',
    backgroundColor: 'rgba(0,0,0, .3)'
  },
  picture: {
    width: 45,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    resizeMode: 'cover'
  },
  menuRollIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 45/2,
    backgroundColor: 'rgba(255,255,255, .3)'
  },
  menuRollIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  }
};

export default MenuRoll;