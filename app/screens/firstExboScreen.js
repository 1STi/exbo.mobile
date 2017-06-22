// Libs
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// Redux Things
import {
  createFirstExbo
} from '../modules/gallery-module';

const mapDispatchToProps = (dispatch) => {
  return {
    createFirstExbo: (name) => {
      dispatch(createFirstExbo(name));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    exbos: state.gallery.exbos,
    isFirstExboCreated: state.gallery.isFirstExboCreated
  };
};

// Components
import MainBtn from '../components/mainBtn';

// Images
import logo from '../../assets/exbo.png';
import background from '../../assets/background.png';
import book from '../../assets/book.png';
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';

class FirstExboScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      error: false,
      isExboAlreadyCreated: false
    };

    this.validateExboName = this.validateExboName.bind(this);
    this.raiseError = this.raiseError.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  validateExboName() {
    if (this.state.text === '' || this.state.text === undefined) {
      this.raiseError('Choose a name for your exbo...');
      return;
    }
    for(let i = 0; i < this.props.exbos.length; i++) {
      if (this.props.exbos[i].name.toUpperCase() === this.state.text.toUpperCase()) {
        this.raiseError('Exbo already created...');
        return;
      }
    }
    this.props.createFirstExbo(this.state.text);
    this.props.navigation.navigate('Home');
  }

  raiseError(errorMessage) {
    this.setState({
      errorMessage: errorMessage,
      isExboAlreadyCreated: true,
      text: undefined
    });
  }

  onChangeText(text) {
    this.setState({
      text: text,
      error: text ? false : true
    });
  }

  navigateBack() {
    this.props.navigation.navigate('Home');
  }

  renderHeader() {
    return(
      <Image
        source={headerBc}
        style={styles.header}>
        <TouchableOpacity
          onPress={this.navigateBack}
          style={styles.menuIconContainer}>
          <Image
            source={arrow}
            style={styles.menuIcon} />
        </TouchableOpacity>
        <Image 
          source={logo} 
          style={styles.exboLogo} />
        <View style={styles.ghostIcon} />
      </Image>
    );
  }

  render() {
    return (
      <Image
        source={background}
        style={styles.background}>
        {this.props.isFirstExboCreated 
          ? this.renderHeader()
          : null
        }
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Image 
              source={book} 
              style={styles.bookIcon} />
            <Text style={styles.exboText}>
              {this.props.isFirstExboCreated 
                ? `Please enter a name for your experience book`
                : `Please enter a name for your first experience book`
              }
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus={true}
              defaultValue={this.state.text}
              onChangeText={this.onChangeText}
              style={[styles.input, this.state.isExboAlreadyCreated || this.state.error
                ? {borderWidth: 1, borderColor: 'red'}
                : null]}
              placeholder='Insert name here'
              underlineColorAndroid='transparent' />
          </View>
          <MainBtn
            onPress={this.validateExboName}
            label='Create exbo' />
          {this.state.isExboAlreadyCreated
            ? <Text style={styles.errorMessage}>
                {this.state.errorMessage}
              </Text>
            : null
          }
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
  textContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10
  },
  bookIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
    resizeMode: 'contain'
  },
  exboText: {
    width: '90%',
    marginBottom: 15,
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  inputContainer: {
    width: '80%',
    height: 55,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    paddingLeft: 10
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontWeight: '600',
    fontSize: 15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    resizeMode: 'stretch',
    elevation: 2
  },
  menuIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25
  },
  menuIcon: {
    flex: 1,
    resizeMode: 'contain'
  },
  ghostIcon: {
    width: 30,
    height: 30
  },
  exboLogo: {
    width: '45%',
    height: '50%',
    resizeMode: 'contain'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstExboScreen);