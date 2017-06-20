// Libs
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LoginBtn = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress} 
      style={props.type === 'facebook' 
        ? [styles.btn, {backgroundColor: '#4460A0'}]
        : [styles.btn, {backgroundColor: '#EB4335'}]}>
      <Text style={styles.btnText}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 55,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6
  },
  btnText: {
    color: '#fff',
    fontWeight: '700'
  }
};

export default LoginBtn;