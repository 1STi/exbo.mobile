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

  const renderText = () => {
    if (props.data.comment) {
      if (props.data.comment.split(' ').length > 3 || props.data.comment.length > 10) {
        return (
          <Text style={styles.sliderItemText}>
            {`${props.data.comment.split(' ').slice(0, 2).join(' ')}...`}
          </Text>
        );
      } else {
        return (
          <Text style={styles.sliderItemText}>
            {props.data.comment}
          </Text>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View
    style={styles.sliderItem}>
      <TouchableOpacity
        style={styles.sliderItemImgContainer}
        onPress={navigateImageInfo}>
        <Image
        source={{uri: props.data.photo}}
        style={styles.sliderItemImg} />
      </TouchableOpacity>
      {renderText()}
    </View>
  );
};

const styles = {
  sliderItem: {
    width: 110,
    height: 135,
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
  sliderItemImgContainer: {
    height: '80%'
  },
  sliderItemImg: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    marginTop: 5
  },
  sliderItemText: {
    marginLeft: '5%',
    fontFamily: 'sriracha_regular',
    fontSize: 11
  }
};

export default PreviewPhoto;