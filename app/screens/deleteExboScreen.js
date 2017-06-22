// Libs
import React, { Component } from 'react';
import { 
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// Redux Things
import {
  deleteExbo
} from '../modules/gallery-module';

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExbo: (exboName) => {
      dispatch(deleteExbo(exboName));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    exbos: state.gallery.exbos,
    selectedExbo: state.gallery.selectedExbo
  };
};

// Components
import MainBtn from '../components/mainBtn';

// Images
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';
import back from '../../assets/background.png';
import exbo from '../../assets/exbo.png';

class DeleteExboScreen extends Component {

  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
    this.deleteExbo = this.deleteExbo.bind(this);
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  deleteExbo() {
    this.props.deleteExbo(this.props.selectedExbo);
    this.navigateBack();
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
            source={exbo} 
            style={styles.exboLogo} />
          <View style={styles.ghostIcon} />
        </Image>
        <Image
          source={back}
          style={styles.back}>
          <Text style={styles.bigText}>
            Are you sure you want to
            delete this exbo?
          </Text>
          <MainBtn
            type='galery'
            onPress={this.deleteExbo}
            label='Yes, delete it' />
        </Image>
      </View>
    );
  }
};

const styles = {
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
  back: {
    position: 'relative',
    bottom: 10,
    width: '100%',
    height: '105%',
    resizeMode: 'cover'
  },
  bigText: {
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  exboLogo: {
    width: '45%',
    height: '50%',
    resizeMode: 'contain'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteExboScreen);