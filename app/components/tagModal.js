// Libs
import React from 'react';
import { 
  View, 
  Text, 
  Modal,
  TouchableOpacity, 
  TextInput 
} from 'react-native';

// Components
import MainBtn from './mainBtn';

const TagModal = (props) => {

  const setTag = () => {
    if (props.tagName === '' || props.tagName === undefined) {
      props.raiseError('Choose a name for your tag...');
      return;
    }
    for(let i = 0; i < props.exbos.length; i++) {
      if (props.exbos[i].name === props.selectedExbo) {
        for (let j = 0; j < props.exbos[i].tags.length; j++) {
          if (props.exbos[i].tags[j].name.toUpperCase() === props.tagName.toUpperCase()) {
            props.raiseError('Tag already created...');
            return;
          }
        }
      }
    }
    props.setTagModal();
    props.createTag({
      exboName: props.selectedExbo,
      name: props.tagName
    });
    props.saveTag('');
    props.cleanError();
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      style={styles.modal}
      visible={props.modalIsOpen}
      multiline={true}
      onRequestClose={() => {console.log('modal closed')}}>
      <TouchableOpacity
        onPress={props.setTagModal}
        style={styles.modalLayer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, props.isTagAlreadyCreated 
              ? {borderWidth: 1, borderColor: 'red'} 
              : null]}
            defaultValue={props.tagName}
            placeholder='Insert your tag name'
            onChangeText={props.saveTag}
            underlineColorAndroid='transparent' />
        </View>
        <MainBtn
          onPress={setTag}
          label='Done' />
        {props.isTagAlreadyCreated 
          ? <Text style={styles.errorMessage}>
              {props.errorMessage}
            </Text>
          : null
        }
      </TouchableOpacity>
    </Modal>
  );
};

const styles = {
  modal: {
    flex: 1
  },
  modalLayer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .8)'
  },
  inputContainer: {
    width: '80%',
    height: 55,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontWeight: '600',
    fontSize: 15
  }
};

export default TagModal;