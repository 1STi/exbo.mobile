// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

// Images
import university from '../../assets/university.png';
import trips from '../../assets/trips.png';
import sports from '../../assets/sports.png';
import party from '../../assets/party.png';
import nature from '../../assets/nature.png';
import home from '../../assets/home.png';
import food from '../../assets/food.png';
import drinks from '../../assets/drinks.png';
import buddies from '../../assets/buddies.png';

const Tag = (props) => {

  const setTag = () => {
    if (props.selectedTags.includes(props.label)) {
      props.removeTag(props.label);
    } else {
      props.selectTag(props.label);
    }
  }

  const countImages = () => {
    let imgs = 0;
    props.exbos.map((exbo) => {
      if (exbo.name === props.selectedExbo) {
        exbo.photos.map((photo) => {
          if (photo.tags.includes(props.label)) {
            imgs = imgs + 1;
          }
        });
      }
    });
    return imgs;
  }

  const renderIcon = (label) => {
    switch(label) {
      case 'university':
        return (
          <Image
            source={university}
            style={styles.tagIcon} />
        );
      case 'trips':
        return (
          <Image
            source={trips}
            style={styles.tagIcon} />
        );
      case 'sports':
        return (
          <Image
            source={sports}
            style={styles.tagIcon} />
        );
      case 'party':
        return (
          <Image
            source={party}
            style={[styles.tagIcon, {width: 25, height: 25}]} />
        );
      case 'nature':
        return (
          <Image
            source={nature}
            style={styles.tagIcon} />
        );
      case 'home':
        return (
          <Image
            source={home}
            style={styles.tagIcon} />
        );
      case 'food':
        return (
          <Image
            source={food}
            style={styles.tagIcon} />
        );
      case 'drinks':
        return (
          <Image
            source={drinks}
            style={styles.tagIcon} />
        );
      case 'buddies':
        return (
          <Image
            source={buddies}
            style={styles.tagIcon} />
        );
      default:
        return null;
    }
  };
  
  const chooseTagType = (type) => {
    if (type === 'new') {
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.tag, {backgroundColor: '#fff'}]}>
          <Text style={styles.tagText}>New Tag</Text>
        </TouchableOpacity>
      );
    } else if(type === 'info') {
      return (
        <TouchableOpacity
          onPress={setTag}
          style={[styles.tag, props.selectedTags.includes(props.label)
            ? {backgroundColor: '#fff'} 
            : {backgroundColor: 'rgba(255,255,255, .4)'}]}>
          <View style={styles.tagRow}>
            {renderIcon(props.label)}
            <Text style={styles.tagText}>{props.label}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.tag, {backgroundColor: '#fff'}]}>
          <View style={styles.tagRow}>
            {renderIcon(props.label)}
            <Text style={styles.tagText}>{props.label}</Text>
          </View>
          {props.type === 'home' 
            ? <Text style={styles.textCount}>
                {countImages()}
              </Text>
            : null
          }
        </TouchableOpacity>
      );
    }
  };

  return chooseTagType(props.type);
};

const styles = {
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 18
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tagIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
    resizeMode: 'contain'
  },
  tagText: {
    color: '#1D1C57',
    fontSize: 14
  },
  textCount: {
    color: '#1D1C57',
    fontSize: 11
  }
};

export default Tag;