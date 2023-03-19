import React, { useState } from 'react';
import Text from 'ca-component-generic/Text';
import { Image, View, Modal, StyleSheet } from 'react-native';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import { KtpBerlaku, KtpBingkai, KtpBlur } from 'ca-config/Image';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import locale from '../../../locale';

function ModalKtpScanFailed(props) {
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
          <Text textStyle="bold" size={Size.text.h6.size} style={styles.mb30}>
            {trans(locale, lang, 'failedScan')}
          </Text>
          <View style={styles.itemContainer}>
            <Image style={styles.mr10} source={KtpBerlaku} />
            <Text textStyle="medium" size={Size.text.body2.size}>
              {trans(locale, lang, 'useValidIDCard')}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Image style={styles.mr10} source={KtpBingkai} />
            <Text textStyle="medium" size={Size.text.body2.size}>
              {trans(locale, lang, 'cardOnFrame')}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Image style={styles.mr10} source={KtpBlur} />
            <Text textStyle="medium" size={Size.text.body2.size}>
              {trans(locale, lang, 'cardBrightAndClear')}
            </Text>
          </View>
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
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 35,
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
  itemContainer: {
    width: 300,
    flexDirection: 'row',
    borderBottomColor: Color.grayLine.light.color,
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mr10: {
    marginRight: 10,
  },
  mt10: {
    marginTop: 10,
  },
});

ModalKtpScanFailed.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

export default ModalKtpScanFailed;
