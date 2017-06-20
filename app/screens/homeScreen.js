// Libs
import React, {Component} from 'react';
import {
  View, 
  Text, 
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

// Redux Things
import { logout } from '../modules/auth-module';
import {
  selectExbo,
  createTag,
  savePicture
} from '../modules/gallery-module';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    createTag: (tagName) => {
      dispatch(createTag(tagName));
    },
    selectExbo: (exboName) => {
      dispatch(selectExbo(exboName));
    },
    savePicture: (pictureInfo) => {
      dispatch(savePicture(pictureInfo));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    myFirstExbo: state.gallery.myFirstExbo,
    token: state.auth.token,
    exbos: state.gallery.exbos,
    facebookName: state.auth.facebookProfileName,
    selectedExbo: state.gallery.selectedExbo
  };
};

// Components
import Header from '../components/header';
import SubMenu from '../components/subMenu';
import PreviewPhoto from '../components/previewPhoto';
import FavoritePhoto from '../components/favoritePhoto';
import Menu from '../components/menu';
import TagModal from '../components/tagModal';
import Tag from '../components/tag';
import MainBtn from '../components/mainBtn';

// image
import example from '../../assets/gallery-image.png';

class HomeScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isSubMenuVisible: false,
      isExboSubMenuVisible: false,
      modalIsOpen: false,
      tagName: undefined,
      isTagAlreadyCreated: false
    };

    this.setVisibleMenu = this.setVisibleMenu.bind(this);
    this.setExboSubMenu = this.setExboSubMenu.bind(this);
    this.setSubMenus = this.setSubMenus.bind(this);
    this.setTagModal = this.setTagModal.bind(this);
    this.saveTag = this.saveTag.bind(this);
    this.raiseError = this.raiseError.bind(this);
    this.cleanError = this.cleanError.bind(this);
    this.navigateTags = this.navigateTags.bind(this);
    this.openGallery = this.openGallery.bind(this);
    this.logout = this.logout.bind(this);
  }

  openGallery() {
    let options = {
      title: 'Select your Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.openPicker({
      multiple: true
    }).then((images) => {
      images.map((image) => {
        this.props.savePicture({
          exboName: this.props.selectedExbo,
          uri: image.path,
          comment: '',
          isFavorite: false,
          tags: []
        });
      });
    });
  }

  setVisibleMenu() {
    this.setState({
      isSubMenuVisible: !this.state.isSubMenuVisible,
      isExboSubMenuVisible: false
    });
  }

  setExboSubMenu() {
    this.setState({
      isExboSubMenuVisible: !this.state.isExboSubMenuVisible,
      isSubMenuVisible: false
    });
  }

  setSubMenus() {
    this.setState({
      isExboSubMenuVisible: false,
      isSubMenuVisible: false
    });
  }

  setTagModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  saveTag(tagName) {
    this.setState({
      tagName: tagName
    });
  }

  raiseError(errorMessage) {
    this.setState({
      errorMessage: errorMessage,
      isTagAlreadyCreated: true,
      tagName: undefined
    });
  }

  cleanError() {
    this.setState({
      errorMessage: undefined,
      isTagAlreadyCreated: false
    });
  }

  navigateTags() {
    this.props.navigation.navigate('Tags');
  }

  logout() {
    this.props.logout();
    this.props.navigation.navigate('Login');
  }

  renderTags() {
    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.tags.map((tag, index) => {
          
          const navigateTag = () => {
            console.log(tag.name);
            this.props.navigation.navigate('Tag', {tagName: tag.name});
          }

          if (tag) {
            return (
              <Tag
                key={index}
                type='home'
                onPress={navigateTag}
                label={tag.name}
                exbos={this.props.exbos}
                selectedExbo={this.props.selectedExbo} />
            );
          }
        });
      }
    });
  }

  renderGallery() {
    return this.props.exbos.map((exbo, index) => {
      if (exbo.name === this.props.selectedExbo) {
        if (exbo.photos.length > 0) {
          
          let reversedPhotos = exbo.photos.slice().reverse().map((photo) => {
            return {
              key: `photo-${photo.uri}`,
              photo: photo.uri,
              comment: photo.comment
            }
          });

          return (
            <FlatList
              key={index} 
              data={reversedPhotos}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.previewList}
              renderItem={({item}) => (
                <PreviewPhoto
                  navigation={this.props.navigation} 
                  data={item} />
              )} />
          );
        } else {
          return (
            <Text
              key={index} 
              style={styles.picturesMessage}>
              You don't have pictures yet...
            </Text>
          );
        }
      } else {
        return null;
      }
    });
  }

  renderPhotos(photos) {
    return photos.map((photo, index) => {
      return (
        <Image
          key={index}
          source={{uri: photo.uri}}
          style={styles.favoritePhoto}/>
      );
    });
  }

  renderFavoritesGallery() {
    return this.props.exbos.map((exbo, index) => {
      if (exbo.name === this.props.selectedExbo) {
        let filteredPhotos = exbo.photos.slice().filter(photo => {return photo.isFavorite === true});
        if (exbo.photos.length > 0 && filteredPhotos.length > 0) {

          let filteredPhotos = exbo.photos.slice().reverse().filter((photo) => {
            return photo.isFavorite === true;
          }).map((photo) => {
            return {
              key: `photo-${photo.uri}`,
              photo: photo.uri
            }
          });

          return (
            <FlatList
              key={index}
              data={filteredPhotos}
              horizontal={true}
              style={styles.favoritesList}
              renderItem={({item}) => (
                <FavoritePhoto 
                  data={item}
                  navigation={this.props.navigation} />
              )}/>
          );
        } else {
          return (
            <Text
              key={index} 
              style={styles.picturesMessage}>
              You don't have favorites pictures yet...
            </Text>
          );
        }
      }
    });
  }

  render() {
    return (
      <View
        style={{flex: 1}}
        onPress={this.setSubMenus}>
      <View
        style={styles.container}>
        <View style={styles.innerContainer}>
          <Header
            setExboSubMenu={this.setExboSubMenu} 
            setVisibleMenu={this.setVisibleMenu} />
          <ScrollView style={{flex: 1}}>
            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={this.setSubMenus}>
              <View style={{flex: 1}}>
                <Text style={styles.title}>
                  {this.props.selectedExbo}
                </Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    Recent
                  </Text>
                </View>
                {this.renderGallery()}
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    Favorites
                  </Text>
                </View>
                {this.renderFavoritesGallery()}
                <View style={styles.tag}>
                  <Text style={styles.tagText}>
                    Categories
                  </Text>
                </View>
                <View style={styles.tagsList}>
                  {this.renderTags()}
                  <Tag 
                    type='new'
                    onPress={this.setTagModal} />
                </View>
                <MainBtn
                  type='galery'
                  label='Import from galery'
                  onPress={this.openGallery} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <Menu
          type='home' 
          navigation={this.props.navigation} />
        {this.state.modalIsOpen 
          ? <TagModal
              modalIsOpen={this.state.modalIsOpen}
              setTagModal={this.setTagModal}
              saveTag={this.saveTag}
              createTag={this.props.createTag}
              raiseError={this.raiseError}
              cleanError={this.cleanError}
              tagName={this.state.tagName}
              exbos={this.props.exbos}
              selectedExbo={this.props.selectedExbo}
              errorMessage={this.state.errorMessage}
              isTagAlreadyCreated={this.state.isTagAlreadyCreated} />
          : null
        }
        {this.state.isSubMenuVisible 
          ? <SubMenu
              type='social'
              token={this.props.token}
              facebookName={this.props.facebookName}
              logout={this.logout} />
          : null
        }
        {this.state.isExboSubMenuVisible 
          ? <SubMenu
              setExboSubMenu={this.setExboSubMenu}
              navigation={this.props.navigation}
              selectExbo={this.props.selectExbo}
              exbos={this.props.exbos} />
          : null
        }
      </View>
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },
  innerContainer: {
    width: '100%',
    height: Dimensions.get('window').height - 85
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#1D1C57',
    fontWeight: '700',
    fontSize: 20
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 35,
    backgroundColor: '#FFDC5A'
  },
  picturesMessage: {
    marginTop: 25,
    marginBottom: 45,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14
  },
  previewList: {
    marginTop: 10,
    marginLeft: 5
  },
  favoritesList: {
    marginTop: 10,
    marginBottom: 10
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  scrollContainer: {
    width: '100%',
    height: 110
  },
  tagText: {
    fontFamily: 'Sriracha'
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);