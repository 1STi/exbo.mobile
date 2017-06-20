// Libs
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import CameraComponent from 'react-native-camera';
import { NavigationActions } from 'react-navigation';
const timer = require('react-native-timer');

// Redux Things
import { saveLastPicture } from '../modules/gallery-module';

const mapDispatchTopProps = (dispatch) => {
  return {
    saveLastPicture: (picture) => {
      dispatch(saveLastPicture(picture));
    }
  };
};

// Components
import Menu from '../components/menu';

class CameraScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: undefined,
      type: 'back',
      flash: 'flash-off',
      isRecording: false
    };

    this.changeCameraTarget = this.changeCameraTarget.bind(this);
    this.changeFlashMode = this.changeFlashMode.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.saveMedia = this.saveMedia.bind(this);
    this.startTimeout = this.startTimeout.bind(this);
  }

  checkTime() {
    this.setState({
      counter: this.state.counter + 0.5
    });
  }

  changeFlashMode() {
    switch(this.state.flash) {
    case 'flash-off':
      this.setState({
        flash: 'flash'
      });
      break;
    case 'flash':
      this.setState({
        flash: 'flash-auto'
      });
      break;
    case 'flash-auto':
      this.setState({
        flash: 'flash-off'
      });
      break;
    default:
      break;
    }
  }

  flashMode() {
    switch(this.state.flash) {
    case 'flash-off':
      return CameraComponent.constants.FlashMode.off
    case 'flash':
      return CameraComponent.constants.FlashMode.on
    case 'flash-auto':
      return CameraComponent.constants.FlashMode.auto
    default:
      return null;
    }
  }

  changeCameraTarget() {
    if (this.state.type === 'back') {
      this.setState({
        type: 'front'
      });
    } else {
      this.setState({
        type: 'back'
      });
    }
  }

  takePicture() {
    //options.location = ...
    this.camera.capture({
      mode: CameraComponent.constants.CaptureMode.still
    }).then((data) => {

      timer.clearTimeout('photoTimer');

      // and you navigate to CameraRoll screen
      const resetNavigation = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Home'}),
          NavigationActions.navigate({routeName: 'CameraRoll', params: {image: data.path}})
        ]
      });
      this.props.navigation.dispatch(resetNavigation);
    }).catch((err) => {
      console.log(err);
    });
  }

  saveMedia() {
    if (this.state.isRecording) {
      this.camera.stopCapture();
    } else {
      this.takePicture();
    }
  }

  startTimeout() {
    timer.setTimeout('photoTimer', () => {
      this.camera.capture({
        mode: CameraComponent.constants.CaptureMode.video
      }).then((data) => {
        const resetNavigation = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({routeName: 'Home'}),
            NavigationActions.navigate({routeName: 'CameraRoll', params: {image: data.path}})
          ]
        });
        this.props.navigation.dispatch(resetNavigation);
        console.log(data);
      });
      this.setState({isRecording: true});
    }, 3000);
  }


  render() {
    return (
      <View style={styles.container}>
        <CameraComponent
          ref={(node) => this.camera = node}
          captureQuality={CameraComponent.constants.CaptureQuality.medium}
          type={this.state.type}
          style={styles.camPreview}
          flashMode={this.flashMode()}
          aspect={CameraComponent.constants.Aspect.fill} />
        <Menu
          type='camera'
          changeFlashMode={this.changeFlashMode}
          changeCameraTarget={this.changeCameraTarget}
          saveMedia={this.saveMedia}
          takePicture={this.takePicture}
          startTimeout={this.startTimeout} />
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1
  },
  camPreview: {
    flex: 1
  }
};

export default connect(null, mapDispatchTopProps)(CameraScreen);