// Libs
import React, {Component} from 'react';
import {
  View, 
  Text, 
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import 
  Share, 
  {
    ShareSheet, 
    Button
  } from 'react-native-share';

// Redux Things
import { 
  updatePicture,
  favoritePicture 
} from '../modules/gallery-module';

const mapDispatchTopProps = (dispatch) => {
  return {
    updatePicture: (pictureInfo) => {
      dispatch(updatePicture(pictureInfo));
    },
    favoritePicture: (pictureInfo) => {
      dispatch(favoritePicture(pictureInfo));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    selectedExbo: state.gallery.selectedExbo,
    exbos: state.gallery.exbos
  };
};

// Components
import MainBtn from '../components/mainBtn';
import Tag from '../components/tag';
import PhotoInfoModal from '../components/photoInfoModal';
import FavoriteImage from '../components/favoriteImage';

// Images
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';

class ImageInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      isPhotoFavorite: false,
      selectedTags: []
    };

    this.navigateBack = this.navigateBack.bind(this);
    this.setInfoModal = this.setInfoModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.shareImage = this.shareImage.bind(this);
    this.savePhotoFavorite = this.savePhotoFavorite.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.filterFavoriteStatus = this.filterFavoriteStatus.bind(this);
    this.navigateGallery = this.navigateGallery.bind(this);
  }

  componentDidMount() {
    this.filterTags();
    this.filterComment();
  }

  shareImage() {
    let options = {
      title: 'Exbo Image',
      message: `${this.state.photoComment}`,
      url: `${this.props.navigation.state.params.image}`,
      subject: 'Share Link' //  for email
    };

    Share.open(options).catch((err) => { err && console.log(err); });
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

  savePhotoFavorite() {
    this.setState({
      isPhotoFavorite: !this.state.isPhotoFavorite
    });
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  navigateGallery() {
    this.props.navigation.navigate('Gallery', {img: this.props.navigation.state.params.image});
  }

  renderImage() {
    return this.props.exbos.map((exbo, index) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo) => {
          if (photo.uri === this.props.navigation.state.params.image) {
            return (
              <View style={styles.smallImgContainer}>
                <TouchableOpacity
                  style={styles.smallImgInnerContainer}
                  onPress={this.navigateGallery}>
                <Image
                  style={styles.smallImg}
                  source={{uri: photo.uri}} />
                </TouchableOpacity>
                <Text style={styles.smallImgText}>
                  {photo.comment}
                </Text>
              </View>
            );
          }
        });
      }
    });
  }

  filterTags() {
    let imgUri = this.props.navigation.state.params.image;
    let tags;
    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo, index) => {
          if (photo.uri === imgUri) {
            this.setState({
              selectedTags: photo.tags
            });
          }
        });
      }
    });  
  }

  filterComment() {
    let imgUri = this.props.navigation.state.params.image;
    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo, index) => {
          if (photo.uri === imgUri) {
            this.setState({
              photoComment: photo.comment
            })
          }
        });
      }
    });
  }
 
  renderTags() {
    let imgUri = this.props.navigation.state.params.image;

    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo, index) => {
          if (photo.uri === imgUri) {
            return photo.tags.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  label={tag} />
              );
            });
          }
        });
      }
    });
  }

  filterFavoriteStatus() {
    let imgUri = this.props.navigation.state.params.image;

    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo, index) => {
          if (photo.uri === imgUri) {
            console.log(exbo.photos);
            return (
              <FavoriteImage
                isFavorite={photo.isFavorite}
                photoUri={photo.uri}
                selectedExbo={this.props.selectedExbo}
                favoriteImage={this.props.favoritePicture} />
            );
          }
        });
      }
    });
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
            {this.props.selectedExbo}
          </Text>
          <View style={styles.ghostIcon} />
        </Image>
        <ScrollView style={{flex: 1}}>
          {this.renderImage()}
          <View style={styles.tagsList}>
            {this.renderTags()}
            {this.filterFavoriteStatus()}
          </View>
          <View style={styles.btnContainer}>
            <MainBtn
              type='smallImg' 
              label='edit'
              onPress={this.setInfoModal} />
            <MainBtn
              type='smallImg' 
              label='share'
              onPress={this.shareImage} />
          </View>
        </ScrollView>
        {this.state.modalIsOpen 
          ? <PhotoInfoModal
              type='info'
              exbos={this.props.exbos}
              modalIsOpen={this.state.modalIsOpen}
              closeModal={this.closeModal}
              updatePicture={this.props.updatePicture}
              selectedTags={this.state.selectedTags}
              comment={this.state.photoComment}
              selectedExbo={this.props.selectedExbo}
              imgUri={this.props.navigation.state.params.image} />
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
  smallImgContainer: {
    alignItems: 'center',
    width: '95%',
    height: 350,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    transform: [{rotate: '-2deg'}],
    elevation: 3
  },
  smallImgInnerContainer: {
    width: '96%',
    height: '85%',
    marginTop: '2%'
  },
  smallImg: {
    flex: 1
  },
  smallImgText: {
    marginTop: 5,
    textAlign: 'center',
    color: 'rgba(0,0,0, .6)',
    fontWeight: '300',
    fontSize: 14
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 15
  },
  tagsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '95%',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

export default connect(mapStateToProps, mapDispatchTopProps)(ImageInfo);