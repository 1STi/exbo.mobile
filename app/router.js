// Libs
import { StackNavigator } from 'react-navigation';

// Screens
import LoginScreen from './screens/loginScreen';
import FirstExboScreen from './screens/firstExboScreen';
import HomeScreen from './screens/homeScreen';
import SplashScreen from './screens/splashScreen';
import ValidateScreen from './screens/validateScreen';
import CameraScreen from './screens/cameraScreen';
import CameraRollScreen from './screens/cameraRollScreen';
import ImageInfo from './screens/imageInfo';
import TagScreen from './screens/tagsScreen';
import GalleryScreen from './screens/galleryScreen';

const AuthStack = StackNavigator({
  Validate: {
    screen: ValidateScreen,
    navigationOptions: {
      navigationOptions: {
        headerVisible: false
      }
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  FirstExbo: {
    screen: FirstExboScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  CameraRoll: {
    screen: CameraRollScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  ImageInfo: {
    screen: ImageInfo,
    navigationOptions: {
      headerVisible: false
    }
  },
  Tag: {
    screen: TagScreen,
    navigationOptions: {
      headerVisible: false
    }
  },
  Gallery: {
    screen: GalleryScreen,
    navigationOptions: {
      headerVisible: false
    }
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Validate'
});

const prevGetStateForAction = AuthStack.router.getStateForAction;

AuthStack.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Login
  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Login') {
    return null;
  }
  if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Home') {
    return null;
  }
  // Do not allow to go back to Login
  if (action.type === 'Navigation/BACK' && state) {
    const newRoutes = state.routes.filter(r => r.routeName !== 'Login' && r.routeName !== 'Validate');
    const newIndex = newRoutes.length - 1;
    return prevGetStateForAction(action, { index: newIndex, routes: newRoutes });
  }
  return prevGetStateForAction(action, state);
};

export default AuthStack;