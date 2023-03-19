import React, { useState } from 'react';
import Text from 'ca-component-generic/Text';
import { Image, View, Modal, StyleSheet } from 'react-native';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import { KTPMukatidakcocok } from 'ca-config/Image';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import locale from '../../../locale';

function ModalKtpNotValid(props) {
  const { isVisible, lang, onRetryPress } = props;

  const [modalVisible, setModalVisible] = useState(isVisible);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      animationInTiming={500}
      animationOutTiming={500}
      useNativeDriverForBackdrop
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
      }}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            source={KTPMukatidakcocok}
            width={100}
            height={160}
            style={styles.image}
          />
          <Text
            textStyle="bold"
            align="center"
            size={Size.text.body1.size}
            style={styles.mb10}>
            {trans(locale, lang, 'ktpNotValid')}
          </Text>
          <Text
            textStyle="medium"
            style={styles.mb10}
            size={Size.text.body2.size}
            align="center">
            {trans(locale, lang, 'notValidDukcapil')}
          </Text>
          <Button
            style={styles.mt10}
            block
            onPress={() => setModalVisible(!modalVisible)}>
            {trans(locale, lang, 'tryAgain')}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.eventGreyBgColor.light.color,
  },
  modalView: {
    width: Size.screen.width - 32,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 35,
    backgroundColor: Color.main.light.white,
    flexDirection: 'column',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 160,
    marginTop: -100,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
});

ModalKtpNotValid.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

export default ModalKtpNotValid;
