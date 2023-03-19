import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import { ButtonIcon, ButtonIconRed, IconSuccess } from 'ca-config/Svg';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import {
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
} from 'ca-module-register/registerConstant';
import { regexMobile } from 'ca-util/common';
import Style from './style';
import locale from './locale';

function ProfileNewMobileNumber(props) {
  const {
    navigation,
    lang,
    registerAction,
    setRequestOtp,
    setRequestOtpClear,
    setRequestOtpFailed,
  } = props;
  const iconProps = {
    width: 64,
    height: 40,
  };

  const [mobileNumber, setMobileNumber] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    setNavigation(registerAction);
  }, [registerAction, setNavigation]);

  const setNavigation = useCallback(
    (act) => {
      if (act === SET_REGISTER_OTP_SUCCESS) {
        setSuccessModalVisible(true);
      }
      if (act === SET_REGISTER_OTP_FAILED) {
        Alert.alert(
          trans(locale, lang, 'warning'),
          trans(locale, lang, setRequestOtpFailed?.message)
        );
      }
      setRequestOtpClear();
    },
    [lang, setRequestOtpClear, setRequestOtpFailed?.message]
  );

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.h6.size}
          textStyle="bold"
          line={27}
          letterSpacing={0.5}
          color={Color.neutral.light.neutral60}
          style={Style.headerTitle}>
          {trans(locale, lang, 'Masukkan Nomor Baru')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(
            locale,
            lang,
            'Silakan masukkan nomor telepon baru yang akan digunakan'
          )}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View>
        <Input
          value={mobileNumber}
          suffixIcon={
            isDisabled ? (
              <ButtonIcon {...iconProps} />
            ) : (
              <ButtonIconRed {...iconProps} />
            )
          }
          placeholder={trans(locale, lang, 'Masukkan nomor handphone')}
          handleSuffixIcon={() => {
            setRequestOtp({
              id: mobileNumber,
              action: 'CHANGE_MOBILE_PHONE_NUMBER',
            });
          }}
          suffixIconDisabled={isDisabled}
          onChangeText={(text) => {
            setMobileNumber(text);
            setDisabled(!regexMobile.test(text));
          }}
          keyboardType="number-pad"
          height={64}
        />
      </View>
    );
  }

  function renderSuccessModal() {
    const onBackPress = () => {
      setSuccessModalVisible(false);
      navigation.navigate(NAVIGATION.PROFILE.ProfileMobileNumberOtp, {
        otpSendTo: mobileNumber,
      });
    };
    return (
      <BottomSheet
        isVisible={isSuccessModalVisible}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={[Style.modal.success.container, Style.alignItemsCenter]}>
          <IconSuccess
            width={146}
            height={146}
            style={Style.modal.success.icon}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.success.text1}>
            {trans(locale, lang, 'Kode Verifikasi Berhasil Dikirim')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.success.text2}>
            {trans(
              locale,
              lang,
              'Kode verifikasi telah dikirimkan ke nomor handphone mohon untuk di cek '
            )}
            <Text textStyle="semi" color={Color.primary.light.primary90}>
              {mobileNumber}
            </Text>
          </Text>
        </View>
        <Button
          shadow
          onPress={() => {
            setSuccessModalVisible(false);
            navigation.navigate(NAVIGATION.PROFILE.ProfileMobileNumberOtp, {
              otpSendTo: mobileNumber,
            });
          }}>
          {trans(locale, lang, 'Lanjut')}
        </Button>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'Ubah Nomor HP')}>
      <Padder>
        <View>
          {renderHeaderContainer()}
          {renderInputCard()}
        </View>
      </Padder>
      {renderSuccessModal()}
    </Base>
  );
}

export default ProfileNewMobileNumber;

ProfileNewMobileNumber.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setRequestOtp: PropTypes.func.isRequired,
  registerAction: PropTypes.string.isRequired,
  setRequestOtpClear: PropTypes.func.isRequired,
  setRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
};
