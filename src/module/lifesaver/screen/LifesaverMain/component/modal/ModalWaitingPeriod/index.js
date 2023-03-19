import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import style from './style';
import locale from './locale';

function ModalWaitingPeriod(props) {
  const { lang, isVisible, onClosePress, onRequestClose } = props;

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          isBorderBottom
          title={trans(locale, lang, 'infoMasaTunggu')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View style={style.mv40}>
        <Text textStyle="medium" color={Color.neutral.light.neutral60}>
          {trans(locale, lang, 'proteksiMedis')}
        </Text>
      </View>
    </BottomSheet>
  );
}

ModalWaitingPeriod.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalWaitingPeriod;
