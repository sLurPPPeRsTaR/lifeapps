import React from 'react';
import { View, Image } from 'react-native';
import { PengkinianData, VerificationCard } from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import { NAVIGATION } from 'ca-util/constant';
import locale from '../locale';
import style from '../style';

function DialogBelumdialogNotEkyc({
  lang,
  isVisible,
  setIsVisible,
  navigation,
  alreadyKYC,
  userId,
  alreadySetPin,
  setComingFrom,
  route,
}) {
  const onNantiduluPress = () => {
    navigation.navigate(NAVIGATION.TABMAIN.TabMain);
    setIsVisible(false);
  };
  const onYukPress = () => {
    setComingFrom(route.name);
    setIsVisible(false);
    if (!alreadyKYC && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycMain);
    } else if (!alreadySetPin && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycCreatePin);
    }
  };

  return (
    <BottomSheet isVisible={isVisible} swipeable={false}>
      <View style={style.dialogNotEkyc.iconContainer}>
        <Image
          source={VerificationCard}
          style={style.dialogNotEkyc.icon}
          resizeMode="contain"
        />
      </View>
      <View style={style.mt55}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={style.dialogNotEkyc.title}>
          {trans(locale, lang, 'yukVerifikasi')}
        </Text>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={style.dialogNotEkyc.title}>
          {trans(locale, lang, 'dataDirimu')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={style.dialogNotEkyc.subtitle}>
          {trans(locale, lang, 'katanyaTakKenal')}
        </Text>
        <Button type="linear-gradient" onPress={onYukPress}>
          {trans(locale, lang, 'yuk')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default DialogBelumdialogNotEkyc;

DialogBelumdialogNotEkyc.defaultProps = {
  isVisible: false,
};

DialogBelumdialogNotEkyc.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  setComingFrom: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};
