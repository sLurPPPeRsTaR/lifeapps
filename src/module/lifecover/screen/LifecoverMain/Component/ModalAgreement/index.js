import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { Close } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import style from './style';
import locale from './locale';

function Header(props) {
  const { title, onClose } = props;

  return (
    <View>
      <View style={style.header}>
        <TouchableOpacity style={style.closeIcon} onPress={() => onClose()}>
          <Close width={30} height={30} />
        </TouchableOpacity>
        <Text textStyle="semi" size={16}>
          {title}
        </Text>
      </View>
      <Padder style={style.horizontalLinePadder}>
        <HorizontalLine height={1} />
      </Padder>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

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
      isVisible={isVisible}
      swipeable={false}
      renderHeader={
        <Header title={trans(locale, lang, 'header')} onClose={onClosePress} />
      }>
      <View>
        <Text style={style.container}>
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
        <View style={[style.mt28, style.mbMin16]}>
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

export default ModalAgreement;
