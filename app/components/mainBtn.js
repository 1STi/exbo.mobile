// Libs
import React from 'react';
import {
  View, 
  Text,
  TouchableOpacity
} from 'react-native';

const MainBtn = (props) => {
  
  const chooseWidth = (type) => {
    switch(type) {
      case 'modal':
        return {width: '97%'};
      case 'smallImg':
        return {width: '45%'};
      case 'galery':
        return {width: '95%'};
      default:
      return null;
    };
  };

  return (
    <TouchableOpacity
      style={[styles.mainBtn, chooseWidth(props.type), props.type === 'galery' 
        ? {marginLeft: 'auto', marginRight: 'auto', marginBottom: 30}
        : null]}
      onPress={props.onPress}>
      <Text style={styles.mainBtnText}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  mainBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 55,
    borderRadius: 4,
    backgroundColor: '#FFDC5A'
  },
  mainBtnText: {
    color: '#1D1C57',
    fontWeight: '600',
    fontSize: 16
  }
};

export default MainBtn;