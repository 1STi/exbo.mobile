// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Modal,
  TextInput,
  TouchableOpacity
} from 'react-native';

// Components
import MainBtn from './mainBtn';
import Tag from './tag';

class PhotoInfoModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photoComment: undefined,
      selectedTags: [],
      selectedExbo: undefined
    };

    this.savePhotoComment = this.savePhotoComment.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.selectedExbo = this.selectExbo.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
  }

  componentWillMount() {
    this.setState({
      selectedTags: this.props.selectedTags,
      selectedExbo: this.props.selectedExbo,
      photoComment: this.props.comment
    });
  }

  savePhotoComment(photoComment) {
    this.setState({
      photoComment: photoComment
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

  selectExbo(exboName) {
    console.log(exboName)
    this.setState({
      selectedExbo: exboName
    });
  }

  updatePicture() {
    this.props.updatePicture({
      exboName: this.state.selectedExbo,
      uri: this.props.imgUri,
      comment: this.state.photoComment,
      isFavorite: this.state.isPhotoFavorite,
      tags: this.state.selectedTags
    });
    this.props.closeModal();
  }
  
  renderExbo(exbos) {
    return exbos.map((exbo, index) => {
      if (exbo.name === this.props.selectedExbo) {
        return (
          <TouchableOpacity
            key={index}
            style={styles.exboContainer}>
            <Text style={styles.exboName}>
              {exbo.name}
            </Text>
          </TouchableOpacity>
        );
      }
    });
  }

  renderTags() {
    return this.props.exbos.map((exbo, index) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.tags.map((tag, index) => {
          return (
            <Tag
              key={index}
              type='info'
              selectedExbo={this.state.selectedExbo}
              selectTag={this.props.type === 'info' 
                ? this.selectTag 
                : this.props.selectTag}
              removeTag={this.props.type === 'info' 
                ? this.removeTag 
                : this.props.removeTag}
              selectedTags={this.props.type === 'info' 
                ? this.state.selectedTags 
                : this.props.selectedTags}
              label={tag.name} />
          );
        });
      }
    });
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        style={styles.modal}
        visible={this.props.modalIsOpen}
        multiline={true}
        onRequestClose={() => {console.log('modal closed')}}>
        <View style={styles.modalLayer}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              Selected Exbo
            </Text>
            <View style={styles.exboList}>
              {this.renderExbo(this.props.exbos)}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              Insert a comment to your photo
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                defaultValue={this.props.type === 'info' 
                  ? this.state.photoComment
                  : this.props.photoComment}
                onChangeText={this.props.type === 'info' 
                  ? this.savePhotoComment
                  : this.props.savePhotoComment}
                underlineColorAndroid='transparent'
                style={{flex: 1}}/>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              Select your categories
            </Text>
            <View style={styles.tagsList}>
              {this.renderTags()}
            </View>
          </View>
          <View style={styles.row}>
            <MainBtn
              onPress={this.props.type === 'info' 
                ? this.updatePicture 
                : this.props.closeModal}
              type='modal'
              label='Done' />
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = {
  modal: {
    flex: 1
  },
  modalLayer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .8)'
  },
  row: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  rowText: {
    marginBottom: 5,
    textAlign: 'center',
    color: 'rgba(255,255,255, .6)',
    fontSize: 12
  },
  exboList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%'
  },
  exboContainer: {
    justifyContent: 'center',
    width: '30%',
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    backgroundColor: '#fff'
  },
  exboName: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14
  },
  inputContainer: {
    width: '97%',
    height: 110,
    backgroundColor: '#fff'
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '97%',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

export default PhotoInfoModal;