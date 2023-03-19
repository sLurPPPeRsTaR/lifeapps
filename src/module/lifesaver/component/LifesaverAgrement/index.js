import { View } from 'react-native';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import { GET_PRODUCTS_FAILED } from 'ca-module-lifesaver/lifesaverConstant';
import style from './style';
import locale from './locale';

function LifesaverAgreement(props) {
  const {
    navigation,
    colorScheme,
    lang,
    isVisible,
    onClosePress,
    product,
    from,
    action,
    onSubmit,
    dispatch,
    alreadyKYC,
    userId,
    alreadySetPin,
    route,
    setIsAgreementVisible,
    loginFrom,
  } = props;

  useEffect(() => {
    if (action === GET_PRODUCTS_FAILED) {
      onClosePress();
    }
  }, [action, onClosePress]);

  function onMasukPress() {
    dispatch.setIsComingFromScreen({
      screen: route.name,
      params: {
        product,
        from,
        recurring: false,
      },
    });
    onClosePress();
    navigation.navigate(NAVIGATION.AUTH.LoginMain);
    setIsAgreementVisible(false);
  }

  function onDaftarPress() {
    dispatch.setIsComingFromScreen({
      screen: route.name,
      params: {
        product,
        from,
        recurring: false,
      },
    });
    onClosePress();
    navigation.navigate(NAVIGATION.REGISTER.Register);
    setIsAgreementVisible(false);
  }

  function onRegisById() {
    dispatch.setIsComingFromScreen({
      screen: route.name,
      params: {
        product,
        from,
        recurring: false,
      },
    });
    onClosePress();
    navigation.navigate(NAVIGATION.REGISTER.RegisterInput, null);
    setIsAgreementVisible(false);
  }

  function onEKYCPress() {
    dispatch.setIsComingFromScreen({
      screen: route.name,
      params: {
        product,
        from,
        recurring: false,
      },
    });
    setIsAgreementVisible(false);
    onClosePress();
    if (!alreadyKYC && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycMain);
    } else if (!alreadySetPin && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycCreatePin);
    }
  }

  function renderAllTrue() {
    return (
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
            onPress={() => {
              onClosePress();
              navigation.navigate(
                NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan
              );
            }}>
            {trans(locale, lang, 'syaratKetentuan')}{' '}
          </Text>
          <Text textStyle="medium" color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'serta')}{' '}
          </Text>
          <Text
            textStyle="semi"
            textDecorationLine="underline"
            color={Color.primary[colorScheme].primary90}
            onPress={() => {
              onClosePress();
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
                personalURL: false,
              });
            }}>
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
          <Button
            onPress={() => {
              onSubmit();
              onClosePress();
              if (setIsAgreementVisible) {
                setIsAgreementVisible();
              }
            }}
            rounded="lg"
            type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'sayaSetuju')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  function renderIsNotEKYC() {
    return (
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
            onPress={() => {
              onClosePress();
              navigation.navigate(
                NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan
              );
            }}>
            {trans(locale, lang, 'syaratKetentuan')}{' '}
          </Text>
          <Text textStyle="medium" color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'serta')}{' '}
          </Text>
          <Text
            textStyle="semi"
            textDecorationLine="underline"
            color={Color.primary[colorScheme].primary90}
            onPress={() => {
              onClosePress();
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
                personalURL: false,
              });
            }}>
            {trans(locale, lang, 'riplay')}{' '}
          </Text>
          <Text
            line={20}
            textStyle="medium"
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'terkaitProduk')}
          </Text>
        </Text>
        <Text textStyle="medium">{trans(locale, lang, 'selanjutnyaEKYC')}</Text>
        <View style={[style.mt24, style.mbMin16]}>
          <Button
            onPress={() => {
              onEKYCPress();
            }}
            rounded="lg"
            type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'sayaSetujuDanEKYC')}
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  function renderConditional() {
    if (alreadyKYC) {
      return renderAllTrue();
    }
    return renderIsNotEKYC();
  }

  return (
    <BottomSheet
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          title={trans(locale, lang, 'header')}
          onClose={() => {
            onClosePress();
            setIsAgreementVisible(false);
          }}
        />
      }
      isVisible={isVisible}>
      {renderConditional()}
    </BottomSheet>
  );
}

LifesaverAgreement.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  product: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.objectOf(Object).isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setIsAgreementVisible: PropTypes.func.isRequired,
  loginFrom: PropTypes.string.isRequired,
};

export default LifesaverAgreement;
