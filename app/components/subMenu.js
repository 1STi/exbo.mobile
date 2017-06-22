// Libs
import React from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

// Images
import book from '../../assets/book-color.png';
import bookAdd from '../../assets/book-add.png';
import feedback from '../../assets/feedback-submenu.png';
import logoutArrow from '../../assets/logout-arrow.png';

const SubMenu = (props) => {

  const createExbo = () => {
    props.navigation.navigate('FirstExbo');
  };

  const openEmail = () => {
    Linking.openURL('mailto:?to=exbogroup@gmail.com');
  };

  const renderRows = () => {
    return props.exbos.map((exbo, index) => {
      
      const setExbo = () => {
        props.selectExbo(exbo.name);
        props.setExboSubMenu();
      };

      return (
        <TouchableOpacity
          key={index}
          onPress={setExbo}
          style={styles.row}>
          <Image 
            source={book}
            style={[styles.bookIcon, {width: 15, height: 15}]} />
          <Text style={styles.exboText}>
            {exbo.name}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  const renderExbos = (exbos) => {
    if (props.exbos.length <= 3) {
      return (
        <View style={[styles.subMenu, {flex: 1, left: 'auto', right: '2.5%', width: '50%'}]}>
          <ScrollView style={{flex: 1}}>
            {renderRows()}
            <TouchableOpacity
              onPress={createExbo}
              style={styles.row}>
              <Image 
                source={bookAdd}
                style={styles.bookIcon} />
              <Text style={styles.exboText}>
                Create New Exbo
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={[styles.subMenu, {flex: 1, left: 'auto', right: '2.5%', bottom: '50%', width: '50%'}]}>
          <ScrollView style={{flex: 1}}>
            {renderRows()}
            <TouchableOpacity
              onPress={createExbo}
              style={styles.row}>
              <Image 
                source={bookAdd}
                style={styles.bookIcon} />
              <Text style={styles.exboText}>
                Create New Exbo
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  };
  
  const renderSubMenu = (type) => {
    if (type === 'social') {
      return (
        <View style={styles.subMenu}>
          <View style={[styles.row, {backgroundColor: '#FAFAFA'}]}>
            <Image 
              source={{uri: `https://graph.facebook.com/me/picture?access_token=${props.token}`}} 
              style={styles.socialImage} />
            <View style={styles.nameContainer}>
              <Text style={styles.subMenuText}>
                {props.facebookName}
              </Text>
              <Text>Facebook Login</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={openEmail}
            style={styles.row}>
            <Image 
              source={feedback}
              style={styles.icon} />
            <Text>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.logout}
            style={styles.row}>
            <Image 
              source={logoutArrow}
              style={styles.icon} />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return renderExbos();
    }
  }

  return renderSubMenu(props.type);
};

const styles = {
  subMenu: {
    flex: 1,
    position: 'absolute',
    top: 62,
    left: '2.5%',
    width: '55%',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 3,
    backgroundColor: '#EFEFEF',
    zIndex: 2,
    elevation: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    width: '100%',
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFF'
  },
  socialImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    resizeMode: 'contain'
  },
  subMenuText: {
    color: '#1D1C57',
    fontWeight: '600',
    fontSize: 15
  },
  exboText: {
    color: '#808080',
    fontWeight: '600',
    fontSize: 15
  },
  bookIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    resizeMode: 'cover'
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
    resizeMode: 'contain'
  }
};

export default SubMenu;