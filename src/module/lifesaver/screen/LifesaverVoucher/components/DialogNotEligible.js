import { Image, View } from 'react-native';
import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import locale from '../locale';
import style from '../style';
import { NAVIGATION } from 'ca-util/constant';
import { LPSpeakerLock } from 'ca-config/Image';
import { CommonActions } from '@react-navigation/native';

function DialogNotEligible({
  isVisible,
  setIsVisible,
  dispatch,
  colorScheme,
  navigation,
  lang,
  route,
}) {
  function onGantiAkun() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: NAVIGATION.LIFESAVER.LifesaverVoucher },
          { name: NAVIGATION.REGISTER.Register },
        ],
      })
    );
    // dispatch.setLoading(true);
    // dispatch.setClearAuth();
    dispatch.getEligibleSubmissionClear();
    dispatch.setLoginClear();
    dispatch.setIsComingFromScreen({
      screen: route.name,
    });
  }
  return (
    <BottomSheet swipeable={false} isVisible={isVisible}>
      <View style={style.dialogNotEligible.imageContainer}>
        style={style.dialogNotEligible.image} />
      </View>

      <View style={style.dialogNotEligible.container}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          style={style.dialogNotEligible.title}>
          {trans(locale, lang, 'gunakanAkunTerdaftar')}
        </Text>
        <Text
          style={style.w267}
          align="center"
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}>
          {trans(locale, lang, 'gunakanEmail')}{' '}
          <Text
            align="center"
            textStyle="semi"
            color={Color.neutralLifeSaver[colorScheme].neutral40}>
            {trans(locale, lang, 'bajoMarathon')}
          </Text>
        </Text>
        <View style={style.dialogNotEligible.buttonContainer}>
          <Button
            color={Color.whiteCard[colorScheme].color}
            outline
            onPress={() => {
              setIsVisible(false);
            }}
            borderColor={Color.primary[colorScheme].primary90}>
            <Text textStyle="semi" color={Color.primary[colorScheme].primary90}>
              {trans(locale, lang, 'batalkan')}
            </Text>
          </Button>
          <View style={style.mt16}>
            <Button
              onPress={() => {
                onGantiAkun();
              }}
              type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'gantiAkun')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}

DialogNotEligible.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  dispatch: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};

export default DialogNotEligible;
