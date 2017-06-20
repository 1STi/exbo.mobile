// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image 
} from 'react-native';
import { connect } from 'react-redux';

// Components
import LoginBtn from '../components/loginBtn';

// Images
import logo from '../../assets/exbo.png';
import background from '../../assets/background.png';

// Redux Things
import { 
  facebookLogin,
  googleLogin
} from '../modules/auth-module';

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    token: state.auth.token,
    isFirstExboCreated: state.gallery.isFirstExboCreated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    facebookLogin: () => {
      dispatch(facebookLogin());
    },
    googleLogin: () => {
      dispatch(googleLogin());
    },
    getFacebookName: (token) =>{
      dispatch(getFacebookName(token));
    }
  };
};

class LoginScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  componentDidUpdate() {
    console.log(this.props);
    if(this.props.isLogged && this.props.token && !this.props.isFirstExboCreated) {
      this.props.navigation.navigate('FirstExbo');
    } else if(this.props.isLogged && this.props.token && this.props.isFirstExboCreated) {
      this.props.navigation.navigate('Home');
    }
  }

  render () {
    return (
      <Image 
        source={background} 
        style={styles.background}>
        <View style={styles.container}>
          <Image 
            source={logo}
            style={styles.logo} />
          <Text style={styles.loginText}>
            Sign in with social media
          </Text>
          <LoginBtn
            onPress={this.props.googleLogin}
            type='google'
            label='Sign in with Google' />
          <LoginBtn
            onPress={this.props.facebookLogin}
            type='facebook'
            label='Sign in with Facebook' />
        </View>
      </Image>
    );
  }
};

const styles = {
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    top: 40,
    width: '70%',
    height: 60,
    resizeMode: 'contain'
  },
  loginText: {
    marginBottom: 15,
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);