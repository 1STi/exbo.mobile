// Libs
import React, { Component } from 'react';
import {
  View, 
  Text,
  Image
} from 'react-native';

// Images
import bcFull from '../../assets/background.png';
import exbo from '../../assets/exbo.png';

class SplashScreen extends Component {
  render () {
    return (
      <Image 
        source={bcFull} 
        style={styles.bcFull}>
        <Image 
          source={exbo} 
          style={styles.logo} />
      </Image>
    );
  }
};

const styles = {
  bcFull: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  logo: {
    width: '70%',
    height: 60,
    resizeMode: 'contain'
  }
};

export default SplashScreen;