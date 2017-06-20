// Libs
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

// Store
import configureStore from './store';
const store = configureStore({});

// Routes
import AuthStack from './router';

// Screens
import Splash from './screens/splashScreen';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isRehydrated: false
    };
  }
  
  componentWillMount() {
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({ isRehydrated: true });
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.isRehydrated
          ? <AuthStack/>
          : <Splash />
        }
      </Provider>
    );
  }
};

export default App;