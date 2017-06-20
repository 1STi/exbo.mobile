// Libs
import React, { Component } from 'react';
import {
  View, 
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';

// Redux Things
const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    isFirstExboCreated: state.gallery.isFirstExboCreated
  }
};

// Images
import bcFull from '../../assets/background.png';
import exbo from '../../assets/exbo.png';

class ValidateScreen extends Component {
  
  componentWillMount() {
    if (this.props.isLogged && this.props.isFirstExboCreated) {
      this.props.navigation.navigate('Home');
    } else if(this.props.isLogged && this.props.isFirstExboCreated === false) {
      this.props.navigation.navigate('FirstExbo');
    } else {
      this.props.navigation.navigate('Login');
    }
  }

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

export default connect(mapStateToProps, null)(ValidateScreen);