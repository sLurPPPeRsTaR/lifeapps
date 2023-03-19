import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import React from 'react';
import { AkunTidakDitemukan } from 'ca-config/Image';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import Style from './style';

const locale = {
  en: {
    maafAkunKamu: 'Sorry Your Account Not Found',
    silahkanLakukanRegistrasiPada:
      'Please register on your social media account.',
    silahkanLakukanRegistrasi:
      'Please register or\nEnter the correct email password!',
    kembali: 'Back',
    registrasiAkun: 'Register Your Account',
  },
  id: {
    maafAkunKamu: 'Maaf Akun Kamu Tidak Ditemukan',
    silahkanLakukanRegistrasiPada:
      'Silakan lakukan registrasi pada akun sosial media Kamu.',
    silahkanLakukanRegistrasi:
      'Silakan lakukan registrasi atau\nmasukkan email/nomor HP dan password yang benar',
    kembali: 'Kembali',
    registrasiAkun: 'Registrasi Akun',
  },
};

function ModalFailedLogin({
  lang,
  isVisible,
  isLoginSocialFailed,
  onPressButtonBack,
  onPressButtonRegister,
  onRequestClose,
}) {
  return (
    <BottomSheet
      isVisible={isVisible}
      swipeable={false}
      onClosePress={onPressButtonBack}
      onRequestClose={onPressButtonBack}>
      <View style={Style.fail.container}>
        <Image source={AkunTidakDitemukan} style={Style.fail.icon} />
        <Text
          textStyle="bold"
          size={Size.text.body1.size}
          line={25.6}
          align="center"
          color={Color.neutral.light.neutral80}
          style={Style.fail.text1}>
          {trans(locale, lang, 'maafAkunKamu')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={23.8}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.fail.text2}>
          {trans(
            locale,
            lang,
            isLoginSocialFailed
              ? 'silahkanLakukanRegistrasiPada'
              : 'silahkanLakukanRegistrasi'
          )}
        </Text>
        <Button block outline style={Style.mb16} onPress={onPressButtonBack}>
          {trans(locale, lang, 'kembali')}
        </Button>
        {isLoginSocialFailed ? (
          <Button block onPress={onPressButtonRegister}>
            {trans(locale, lang, 'registrasiAkun')}
          </Button>
        ) : null}
      </View>
    </BottomSheet>
  );
}

export default ModalFailedLogin;

ModalFailedLogin.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  isLoginSocialFailed: PropTypes.bool.isRequired,
  onPressButtonBack: PropTypes.func.isRequired,
  onPressButtonRegister: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
