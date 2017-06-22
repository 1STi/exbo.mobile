// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

// Components
import Menu from '../components/menu';

// Images
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';
import discover from '../../assets/discover-full.png';

class OrganizeScreen extends Component {
  
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={headerBc}
          style={styles.header}>
          <TouchableOpacity
            onPress={this.navigateBack}
            style={styles.arrowContainer}>
            <Image
              style={styles.arrow}
              source={arrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Discover
          </Text>
          <View style={styles.ghostIcon} />
        </Image>
        <Text style={styles.discoverText}>
          You’ll soon have a better way to discover new 
          experiences wherever you go
        </Text>
        <Image 
          source={discover}
          style={styles.discoverImg} />
        <Menu
          type='home'
          navigation={this.props.navigation} />
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
    resizeMode: 'cover'
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  },
  arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  ghostIcon: {
    width: 30,
    height: 30
  },
  discoverText: {
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    color: '#1D1C57',
    fontWeight: '600',
    fontSize: 18
  },
  discoverImg: {
    width: '100%',
    height: '45%',
    marginTop: 20,
    resizeMode: 'cover'
  }
};

export default OrganizeScreen;