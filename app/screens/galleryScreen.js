// Libs
import React, { Component } from 'react';
import {
  View, 
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

const horizontalMargin = 5;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + (horizontalMargin * 2);
const imgItemWidth = sliderWidth + (0 * 2);

// Redux things
const mapStateToProps = (state) => {
  return {
    selectedExbo: state.gallery.selectedExbo,
    exbos: state.gallery.exbos
  }
};

// Components
import GalleryImage from '../components/galleryImage';

// Images
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';

class GalleryScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: undefined,
      photos: []
    };

    this.selectPhoto = this.selectPhoto.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount() {
    this.filterImages();
    this.setState({
      selectedPhoto: this.props.navigation.state.params.img
    });
  }

  filterImages() {
    let imgUri = this.props.navigation.state.params.img;
    let photosData = [];

    this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        exbo.photos.map((photo, index) => {
          if (photo.uri !== imgUri) {
            photosData.push({
              key: `photo-${photo.uri}`,
              uri: photo.uri
            });
          }
        });
        photosData.unshift({
          key: `photo-${imgUri}`,
          uri: imgUri
        });
      }
    });
    this.setState({
      photos: photosData
    });
  }

  selectPhoto (uri) {
    this.setState({
      selectedPhoto: uri
    });
  }

  navigateBack() {
    this.props.navigation.goBack();
  }

  renderSelectedMedia() {
    if (this.state.selectedPhoto && this.state.selectedPhoto.substr(this.state.selectedPhoto.length - 4) === '.jpg') {
      return (
        <Image
          source={{uri: this.state.selectedPhoto}} 
          style={styles.fullImg} />
      );
    } else {
      return (
        <Video
          ref={(ref: Video) => { this.video = ref }}
          source={{uri: this.state.selectedPhoto}}
          style={styles.fullVideo}
          repeat={false}
          resizeMode='cover' />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.fullImgContainer}>
          {this.renderSelectedMedia()}
        </View>
        <FlatList
          data={this.state.photos}
          style={styles.imgsList}
          horizontal={true}
          removeClippedSubviews={false}
          renderItem={({item}) => (
            <GalleryImage
              selectPhoto={this.selectPhoto}
              photo={item.uri} />
          )}>
        </FlatList>
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#393643'
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
  fullImgContainer: {
    width: '100%',
    height: '60%'
  },
  fullImg: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  },
  fullVideo: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: '100%'
  },
  imgsList: {
    marginTop: 20,
    marginLeft: '5%'
  }
};

export default connect(mapStateToProps, null)(GalleryScreen);