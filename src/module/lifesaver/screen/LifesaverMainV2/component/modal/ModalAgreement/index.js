import React from 'react';
import { View } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';

function ModalAgreement(props) {
  const {
    colorScheme,
    lang,
    isVisible,
    onClosePress,
    onPressTnc,
    onPressRiplay,
    onSubs,
    onRequestClose,
  } = props;
  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          title={trans(locale, lang, 'header')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View>
        <Text style={style.mt16}>
          <Text
            line={20}
            textStyle="medium"
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'sayaMenyatakan')}{' '}
          </Text>
          <Text
            textStyle="semi"
            textDecorationLine="underline"
            color={Color.primary[colorScheme].primary90}
            onPress={onPressTnc}>
            {trans(locale, lang, 'syaratKetentuan')}{' '}
          </Text>
          <Text textStyle="medium" color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'serta')}{' '}
          </Text>
          <Text
            textStyle="semi"
            textDecorationLine="underline"
            color={Color.primary[colorScheme].primary90}
            onPress={onPressRiplay}>
            {trans(locale, lang, 'riplay')}{' '}
          </Text>
          <Text
            line={20}
            textStyle="medium"
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'terkaitProduk')}
          </Text>
        </Text>
        <View style={[style.mt24, style.mbMin16]}>
          <Button onPress={onSubs} rounded="lg" type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'sayaSetuju')}
            </Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

export default ModalAgreement;

ModalAgreement.defaultProps = {
  colorScheme: 'light',
};

ModalAgreement.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onSubs: PropTypes.func.isRequired,
  onPressTnc: PropTypes.func.isRequired,
  onPressRiplay: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
