// Libs
import { Platform, AsyncStorage } from 'react-native';
import { 
  compose, 
  createStore, 
  applyMiddleware, 
  combineReducers 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';

// Reducers
import Auth from './modules/auth-module';
import Gallery from './modules/gallery-module';
import Tags from './modules/tags-module';

const reducers = combineReducers({
  auth: Auth,
  gallery: Gallery,
  tags: Tags
});

export default function configureStore (initialState) {

  let enhancer = compose(
    applyMiddleware(logger, thunkMiddleware),
    autoRehydrate({log:true})
  );

  return createStore(reducers, initialState, enhancer);
};

