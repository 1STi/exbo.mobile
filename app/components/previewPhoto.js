// Libs
import React from 'react';
import {
  View, 
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

const PreviewPhoto = (props) => {
  
  const navigateImageInfo = () => {
    props.navigation.navigate('ImageInfo', {image: props.data.photo});
  };

  return (
    <View
    style={styles.sliderItem}>
      <TouchableOpacity
        onPress={navigateImageInfo}>
        <Image
        source={{uri: props.data.photo}}
        style={styles.sliderItemImg} />
      </TouchableOpacity>
      <Text style={styles.sliderItemText}>
        {props.data.comment}
      </Text>
    </View>
  );
};

const styles = {
  sliderItem: {
    width: 110,
    height: 125,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: .1,
    shadowRadius: 3,
    elevation: 3
  },
  sliderImg: {
    width: 110,
    height: 125,
    marginBottom: 20,
    marginLeft: 10
  },
  sliderItemImg: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '85%',
    marginTop: 5
  },
  sliderItemText: {
    position: 'relative',
    bottom: 7,
    flexDirection: 'row',
    marginLeft: '5%',
    fontSize: 11
  }
};

export default PreviewPhoto;