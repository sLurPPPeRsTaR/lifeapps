import { View } from 'react-native';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { Google1, Kite } from 'ca-config/Svg';
import style from './style';
import locale from './locale';

function LifesaverAgreement(props) {
  const {
    colorScheme,
    lang,
    isVisible,
    isComingFromDeepLink,
    onClosePress,
    onSignInPress,
    onSignUpPress,
    onSignUpWithGooglePress,
    onPressTnc,
    onPressRiplay,
    onRequestClose,
  } = props;

  const renderText = useMemo(() => {
    if (!isComingFromDeepLink) {
      return (
        <Text style={style.mt16}>
          <Text
            line={20}
            textStyle="semi"
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'proteksiIni')}{' '}
          </Text>
          {'\n\n'}
          <Text
            line={20}
            textStyle="medium"
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'ayoMasuk')}{' '}
          </Text>
        </Text>
      );
    }
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
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
      </>
    );
  }, [colorScheme, isComingFromDeepLink, lang, onPressRiplay, onPressTnc]);

  function renderButtonNotLogin() {
    return (
      <View style={[style.mt24]}>
        <Button
          color={Color.whiteCard.light.color}
          shadow
          onPress={onSignUpPress}
          rounded="lg"
          prefixIcon={
            <Kite style={style.mr10} fill={Color.primary.light.primary90} />
          }>
          <Text
            style={style.mr10}
            textStyle="semi"
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'daftarDenganId')}
          </Text>
        </Button>
        <Button
          color={Color.whiteCard.light.color}
          style={style.mt10}
          shadow
          rounded="lg"
          onPress={onSignUpWithGooglePress}
          prefixIcon={<Google1 style={style.mr10} />}>
          <Text
            style={style.ml10}
            textStyle="semi"
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'daftarDenganGoogle')}
          </Text>
        </Button>
        <View style={[style.mt16, style.mbMin16]}>
          <Button
            onPress={onSignInPress}
            rounded="lg"
            prefixIcon={<Kite style={style.mr10} fill="white" />}
            type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'loginDenganIFG')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          title={
            isComingFromDeepLink
              ? trans(locale, lang, 'header')
              : trans(locale, lang, 'Informasi')
          }
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View>
        {renderText}
        {renderButtonNotLogin()}
      </View>
    </BottomSheet>
  );
}

LifesaverAgreement.defaultProps = {
  colorScheme: 'light',
};

LifesaverAgreement.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onSignInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
  onSignUpWithGooglePress: PropTypes.func.isRequired,
  onPressTnc: PropTypes.func.isRequired,
  onPressRiplay: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default LifesaverAgreement;
