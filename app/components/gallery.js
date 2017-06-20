// Libs
import React from 'react';
import {
  View, 
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const horizontalMargin = 5;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + (horizontalMargin * 2);
const imgItemWidth = sliderWidth + (0 * 2);

const Gallery = (props) => {
  
  const renderGallery = () => {
    return props.photos.reverse().map((slider, index) => {

      const navigateImageInfo = () => {
        props.navigation.navigate('ImageInfo', {
          image: slider.uri
        });
      };

      return (
         <View
          key={index}
          style={styles.sliderItem}>
            <TouchableOpacity
              onPress={navigateImageInfo}>
              <Image
              source={{uri: slider.uri}}
              style={styles.sliderItemImg} />
            </TouchableOpacity>
            <Text style={styles.sliderItemText}>
              {slider.comment}
            </Text>
        </View>
      );
    });
  }

  const renderImgs = () => {
    let favoritesPhotos = props.photos.filter((photo) => {
      return photo.isFavorite === true;
    });
    return favoritesPhotos.map((photo, index) => {
      return (
        <View
          key={index}
          style={styles.sliderImg}>
          <Image
            source={{uri: photo.uri}}
            style={{flex: 1}} />
        </View>
      );
    });
  }

  const chooseGallery = () => {
    if (props.type === 'img') {
      return renderImgs();
    } else {
      return renderGallery();
    }
  }

  return (
    <Carousel
      ref={(carousel) => { this._carousel = carousel; }}
      sliderWidth={sliderWidth}
      itemWidth={props.type === 'img' ? imgItemWidth : itemWidth}
      carouselHorizontalPadding={0}
      enableMomentum={false}>
      {props.photos 
        ? chooseGallery()
        : null 
      } 
    </Carousel>
  );
};

const styles = {
  sliderItem: {
    width: 110,
    height: 125,
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

export default Gallery;

