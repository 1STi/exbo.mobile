// Libs
import axios from 'axios';

// Action Types
const CREATE_FIRST_EXBO = 'exbo/gallery/CREATE_FIRST_EXBO';
const SELECT_EXBO = 'exbo/gallery/SELECT_EXBO';
const DELETE_EXBO = 'exbo/gallery/DELETE_EXBO';
const SAVE_LAST_PICTURE = 'exbo/gallery/SAVE_LAST_PICTURE';
const SAVE_PICTURE = 'exbo/gallery/SAVE_PICTURE';
const UPDATE_PICTURE = 'exbo/gallery/UPDATE_PICTURE';
const FAVORITE_PICTURE = 'exbo/gallery/FAVORITE_PICTURE';
const CREATE_TAG = 'exbo/tags/CREATE_TAG';

// Redducer
const initialState = {
  myFirstExbo: undefined,
  isFirstExboCreated: false,
  selectedExbo: undefined,
  exbos: [],
  lastPicture: undefined
};

export default function (state = initialState, action) {
  let exbos = state.exbos;
  let pictureInfo;
  switch (action.type) {
  case CREATE_FIRST_EXBO:
    return Object.assign({}, state, {
      selectedExbo: action.name,
      myFirstExbo: action.name,
      isFirstExboCreated: true,
      exbos: [
        ...state.exbos,
        {
          name: action.name,
          photos: [],
          tags: [{
            exboName: action.name,
            name: 'university',
            photos: []
          }, {
            exboName: action.name,
            name: 'trips',
            photos: []
          }, {
            exboName: action.name,
            name: 'sports',
            photos: []
          }, {
            exboName: action.name,
            name: 'party',
            photos: []
          }, {
            exboName: action.name,
            name: 'nature',
            photos: []
          }, {
            exboName: action.name,
            name: 'home',
            photos: []
          }, {
            exboName: action.name,
            name: 'food',
            photos: []
          }, {
            exboName: action.name,
            name: 'drinks',
            photos: []
          }, {
            exboName: action.name,
            name: 'buddies',
            photos: []
          }]
        }
      ]
    });
  case SELECT_EXBO:
    let selectedExbo;
    exbos.map((exbo) => {
      if (exbo.name === action.exboName) {
        selectedExbo = action.exboName;
      }
    });
    return Object.assign({}, state, {
      selectedExbo: selectedExbo
    });
  case DELETE_EXBO:
    let exboDelete = state.exbos;
    let exboDeleteUpdate;
    exboDelete.map((exbo, index) => {
      if (exbo.name === action.exboName) {
        exboDelete.splice(index, 1);
      }
    });
    return Object.assign({}, state, {
      ...state,
      selectedExbo: state.exbos[0].name,
      exbos: exboDelete
    });
  case SAVE_LAST_PICTURE:
    return Object.assign({}, state, {
      lastPicture: action.lastPicture
    });
  case SAVE_PICTURE:
    let exboSave;
    exbos.map((exbo, index) => {
      if (exbo.name === action.pictureInfo.exboName) {
        exboSave = exbos.splice(index, 1);
        exboSave[0].photos.push({
          exboName: action.pictureInfo.exboName,
          uri: action.pictureInfo.uri,
          comment: action.pictureInfo.comment,
          isFavorite: action.pictureInfo.isFavorite,
          tags: action.pictureInfo.tags
        });
      }
    });
    return Object.assign({}, state, {
      exbos: [
        ...state.exbos,
        exboSave[0]
      ]
    });
  case UPDATE_PICTURE:
    let exboUpdate;
    exbos.map((exbo, index) => {
      if (exbo.name === action.pictureInfo.exboName) {
        exboUpdate = exbos.splice(index, 1);
        exboUpdate[0].photos.map((photo) => {
          if (photo.uri === action.pictureInfo.uri) {
            photo.exboName = action.pictureInfo.exboName;
            photo.uri = action.pictureInfo.uri;
            photo.comment = action.pictureInfo.comment;
            photo.tags = action.pictureInfo.tags;
          }
        });
      }
    });
    return Object.assign({}, state, {
      exbos: [
        ...state.exbos,
        exboUpdate[0]
      ]
    });
  case FAVORITE_PICTURE:
    console.log(action);
    let exboFavorite;
    exbos.map((exbo, index) => {
      if (exbo.name === action.photoInfo.selectedExbo) {
        exbo.photos.map((photo) => {
          if (photo.uri === action.photoInfo.uri) {
            photo.isFavorite = !photo.isFavorite;
          }
        });
      }
    });

    return Object.assign({}, state, {
      exbos: [
        ...state.exbos
      ]
    });
  case CREATE_TAG:
    let exboTag;
    exbos.map((exbo, index) => {
      if (exbo.name === action.tagInfo.exboName) {
        exboTag = exbos.splice(index, 1);
        exboTag[0].tags.push({
          exboName: action.tagInfo.exboName,
          name: action.tagInfo.name,
          photos: []
        });
      }
    });
    return Object.assign({}, state, {
      exbos: [
        ...state.exbos,
        exboTag[0]
      ]
    });
  default:
    return state;
  }
}

// Actions Creators
export const createFirstExbo = (name) => {
  return {
    type: CREATE_FIRST_EXBO,
    name: name
  };
};

export const saveLastPicture = (lastPicture) => {
  return {
    type: SAVE_LAST_PICTURE,
    lastPicture: lastPicture
  };
};

export const savePicture = (pictureInfo) => {
  return {
    type: SAVE_PICTURE,
    pictureInfo: pictureInfo
  };
};

export const updatePicture = (pictureInfo) => {
  return {
    type: UPDATE_PICTURE,
    pictureInfo: pictureInfo
  }
};

export const createTag = (tagInfo) => {
  return {
    type: CREATE_TAG,
    tagInfo: tagInfo
  }
};

export const selectExbo = (exboName) => {
  return {
    type: SELECT_EXBO,
    exboName: exboName
  };
};

export const deleteExbo = (exboName) => {
  return {
    type: DELETE_EXBO,
    exboName: exboName
  }
};

export const favoritePicture = (photoInfo) => {
  return {
    type: FAVORITE_PICTURE,
    photoInfo: photoInfo
  };
};
