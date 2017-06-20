// Action Types
const CREATE_TAG = 'exbo/tags/CREATE_TAG';

// Reducer
const initialState = {
  tags: []
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CREATE_TAG:
    return Object.assign({}, state, {
      tags: [
        ...state.tags,
        {
          name: action.tagName
        }
      ]
    });
  default:
    return state;
  }
}

// Action Creators
export const createTag = (tagName) => {
  return {
    type: CREATE_TAG,
    tagName: tagName
  }
};

