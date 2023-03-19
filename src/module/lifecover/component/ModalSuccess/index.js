import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import { CheckSuccess2 } from 'ca-config/Svg';
import Text from 'ca-component-generic/Text';
import style from './style';

function ModalSuccess({ visible, message, onRequestClose }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={style.container}>
        <CheckSuccess2 width="160" height="160" />
        <Text textStyle="bold" style={style.text}>
          {message}
        </Text>
      </View>
    </Modal>
  );
}
ModalSuccess.defaultProps = {
  visible: false,
  onRequestClose: () => {},
};
ModalSuccess.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func,
};

export default ModalSuccess;
