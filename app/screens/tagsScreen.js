// Libs
import React, { Component } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { connect } from 'react-redux';

// Redux Things
const mapStateToProps = (state) => {
  return {
    selectedExbo: state.gallery.selectedExbo,
    exbos: state.gallery.exbos
  };
};

// Images
import headerBc from '../../assets/bc-header.png';
import arrow from '../../assets/arrow.png';

class TagsScreen extends Component {
  
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
  }

  filterImages() {
    let tagName = this.props.navigation.state.params.tagName;
    return this.props.exbos.map((exbo) => {
      if (exbo.name === this.props.selectedExbo) {
        return exbo.photos.map((photo, index) => {
          if (photo.tags.includes(tagName)) {
            return (
              <Image
                key={index}
                source={{uri: photo.uri}} 
                style={styles.img} />
            );
          }
        });
      }
    });
  }

  navigateBack() {
    this.props.navigation.goBack();
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
          <View style={styles.tagContainer}>
            <Text style={styles.headerTitle}>
              {this.props.navigation.state.params.tagName}
            </Text>
          </View>
          <View style={styles.ghostIcon} />
        </Image>
        <ScrollView style={{flex: 1}}>
          <View style={styles.imgsList}>
            {this.filterImages()}
          </View>
        </ScrollView>
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
    height: 70,
    paddingLeft: 10,
    paddingRight: 10,
    resizeMode: 'cover'
  },
  tagContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255, .4)'
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
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
  imgsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  img: {
    width: '50%',
    height: 130,
    resizeMode: 'cover'
  }
};

export default connect(mapStateToProps, null)(TagsScreen);