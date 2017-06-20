// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';

// Redux Things
import { savePicture } from '../modules/gallery-module';

const mapDispatchTopProps = (dispatch) => {
  return {
    savePicture: (pictureInfo) => {
      dispatch(savePicture(pictureInfo));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    selectedExbo: state.gallery.selectedExbo,
    lastPicture: state.gallery.lastPicture,
    exbos: state.gallery.exbos
  }
};

// Components
import Menu from '../components/menu';
import MenuRoll from '../components/menuRoll';
import PhotoInfoModal from '../components/photoInfoModal';

class CameraRollScreen extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      photoComment: undefined,
      isPhotoFavorite: false,
      selectedTags: []
    };

    this.setInfoModal = this.setInfoModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.savePhotoComment = this.savePhotoComment.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.savePictureInfo = this.savePictureInfo.bind(this);
    this.savePhotoFavorite = this.savePhotoFavorite.bind(this);
  }

  setInfoModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  savePhotoComment(photoComment) {
    this.setState({
      photoComment: photoComment
    });
  }

  savePhotoFavorite() {
    this.setState({
      isPhotoFavorite: !this.state.isPhotoFavorite
    });
  }

  selectTag(tagName) {
    if (this.state.selectedTags.includes(tagName)) {
      return;
    } else {
      this.setState({
        selectedTags: [
          ...this.state.selectedTags,
          tagName
        ]
      });
    }
  }

  removeTag(tagName) {
    let updatedTags = this.state.selectedTags;
    let index = this.state.selectedTags.indexOf(tagName);
    updatedTags.splice(index, 1);
    this.setState({
      selectedTags: updatedTags
    });
  }

  savePictureInfo() {
    this.props.savePicture({
      exboName: this.props.selectedExbo,
      uri: this.props.navigation.state.params.image,
      comment: this.state.photoComment,
      isFavorite: this.state.isPhotoFavorite,
      tags: this.state.selectedTags
    });
    this.setState({
      modalIsOpen: false
    });
    this.props.navigation.navigate('Home');
  }
 
  render() {
    return (
      <View contentContainerStyle={styles.container}>
        <View style={styles.lastPictureContainer}>
          <Image
            source={{uri: this.props.navigation.state.params.image}}
            style={styles.lastPicture} />
          <MenuRoll
            isPhotoFavorite={this.state.isPhotoFavorite}
            savePhotoFavorite={this.savePhotoFavorite}
            setInfoModal={this.setInfoModal}
            lastPicture={this.props.lastPicture} />
        </View>
        <Menu
          type='camera roll'
          savePictureInfo={this.savePictureInfo} />
        {this.state.modalIsOpen 
          ? <PhotoInfoModal
              exbos={this.props.exbos}
              modalIsOpen={this.state.modalIsOpen}
              photoComment={this.state.photoComment}
              closeModal={this.closeModal}
              savePhotoComment={this.savePhotoComment}
              selectTag={this.selectTag}
              removeTag={this.removeTag}
              selectedExbo={this.props.selectedExbo}
              selectedTags={this.state.selectedTags} />
          : null
        }
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1
  },
  lastPictureContainer: {
    width: '100%',
    height: '100%'
  },
  lastPicture: {
    width: '100%',
    height: '100%'
  }
};

export default connect(mapStateToProps, mapDispatchTopProps)(CameraRollScreen);