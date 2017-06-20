// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// Images
import headerBc from '../../assets/bc-header.png';
import exbo from '../../assets/exbo.png';
import menuIcon from '../../assets/menu-icon.png';
import allBooks from '../../assets/all-books.png';

class Header extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        source={headerBc}
        style={styles.header}>
        <TouchableOpacity
          onPress={this.props.setVisibleMenu}
          style={styles.menuIconContainer}>
          <Image 
            source={menuIcon} 
            style={styles.menuIcon} />
        </TouchableOpacity>
        <Image 
          source={exbo} 
          style={styles.exboLogo} />
        <TouchableOpacity
          onPress={this.props.setExboSubMenu}
          style={styles.menuIconContainer}>
          <Image 
            source={allBooks} 
            style={styles.menuIcon} />
        </TouchableOpacity>
      </Image>
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
    resizeMode: 'stretch'
  },
  exboLogo: {
    width: '45%',
    height: '50%',
    resizeMode: 'contain'
  },
  menuIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40
  },
  menuIcon: {
    flex: 1,
    resizeMode: 'contain'
  }
};

export default Header;