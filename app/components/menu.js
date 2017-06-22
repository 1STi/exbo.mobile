// Libs
import React from 'react';
import { 
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

// Images
import menuBckg from '../../assets/menuBckg.png';
import wand from '../../assets/wand.png';
import globe from '../../assets/globe.png';
import frontCam from '../../assets/front-cam.png';
import flashOn from '../../assets/flash-on.png';
import flashOff from '../../assets/flash-off.png';
import flashAuto from '../../assets/flash-auto.png';
import capture from '../../assets/capture.png';
import save from '../../assets/save-photo.png';

const Menu = (props) => {
  
  const chooseNavigatePath = () => {
    if(props.type === 'camera') {
      //props.takePicture();
    } else if(props.type === 'camera roll') {
      props.savePictureInfo();
    } else {
      props.navigation.navigate('Camera');
    }
  };

  const changeFlashMode = () => {
    switch(props.flash) {
      case 'flash':
        return flashOn;
      case 'flash-off':
        return flashOff;
      case 'flash-auto':
        return flashAuto;
      default:
        return null;
    }
  };

  const chooseCenterIcon = () => {
    if (props.type === 'camera' || props.type === 'home') {
      console.log('camera');
      return <Image source={capture} style={styles.camIcon} />
    } else if(props.type === 'camera roll') {
      console.log('camera roll');
      return <Image source={save} style={styles.camIcon} />
    }
  };

  const chooseNavigateText = () => {
    switch(props.type) {
      case 'camera':
        return 'Take photo';
      case 'home':
        return 'Take photo';
      case 'camera roll':
        return 'Save photo';
    };
  };

  const navigateOrganize = () => {
    props.navigation.navigate('Organize');
  };

  const navigateDiscover = () => {
    props.navigation.navigate('Discover');
  };

  const chooseLeftIcon = () => {
    if (props.type !== 'camera roll') {
      return (
        <TouchableOpacity
          onPress={props.type === 'camera' 
            ?  props.changeFlashMode 
            : navigateOrganize}
          style={styles.smallIconContainer}>
          <Image
            source={props.type === 'camera' ? changeFlashMode() : wand} 
            style={styles.smallIcon} />
          {props.type !== 'camera' 
            ? <Text style={styles.label}>Organize</Text>
            : null
          }
        </TouchableOpacity>
      );
    }
  };

  const chooseRightIcon = () => {
    if (props.type !== 'camera roll') {
      return (
        <TouchableOpacity
          onPress={props.type === 'camera' 
            ? props.changeCameraTarget 
            : navigateDiscover}
          style={styles.smallIconContainer}>
          <Image
            source={props.type=== 'camera' ? frontCam : globe} 
            style={styles.smallIcon} />
          {props.type !== 'camera' 
            ? <Text style={styles.label}>Explore</Text>
            : null
          }
        </TouchableOpacity>
      );
    }
  };

  return (
    <Image
      source={menuBckg}
      style={[styles.menu, props.type === 'camera roll' 
        ? {justifyContent: 'center'}
        : null]}>
      {chooseLeftIcon()}
      <View style={styles.photoItem}>
        <TouchableOpacity
          onPress={props.type !== 'camera' 
            ? chooseNavigatePath 
            : null}
          onPressOut={props.type === 'camera' 
            ? props.saveMedia
            : null}
          style={[styles.photoIconContainer, {width: 50, height: 50}]}>
          {chooseCenterIcon()}
        </TouchableOpacity>
        <Text style={[styles.label, {position: 'relative', bottom: 5}]}>
          {chooseNavigateText()}
        </Text>
      </View>
      {chooseRightIcon()}
    </Image>
  );
};

const styles = {
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 65,
    paddingLeft: '5%',
    paddingRight: '5%',
    resizeMode: 'stretch'
  },
  smallIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 60,
    marginTop: 10
  },
  smallIcon: {
    width: 40,
    height: 40,
    resizeMode: 'center'
  },
  photoItem: {
    alignItems: 'center'
  },
  photoIconContainer: {
    position: 'relative',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60/2
  },
  camIcon: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  photoIcon: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 25
  },
  label: {
    marginBottom: 5,
    color: '#1D1C57',
    fontFamily: 'opensans_light',
    fontSize: 14
  }
};

export default Menu;