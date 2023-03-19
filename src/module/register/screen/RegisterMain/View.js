import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Alert, Image, Platform } from 'react-native';
import { Google1, Kite, Lock, Apple } from 'ca-config/Svg';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import {
  NAVIGATION,
  RESPONSE_STATUS,
  TOAST,
  LOGIN_TYPE,
} from 'ca-util/constant';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Button from 'ca-component-generic/Button';
import { setCheckEmail } from 'ca-module-profile/profileApi';
import DeviceInfo from 'react-native-device-info';
import { getLocation } from 'ca-util/location';
import BottomSheet from 'ca-component-container/BottomSheet';
import { SET_LOGIN_SOCIAL_SUCCESS } from 'ca-module-login/loginConstant';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/min/moment-with-locales';
import { RegisterIllustration } from 'ca-config/Image';
import jwt_decode from 'jwt-decode';
import { setDobGoogle, setSignInSocial } from 'ca-util/common';
import locale from './locale';
import Style from './style';

function RegisterMain(props) {
  const {
    route: { params },
    navigation,
    lang,
    isComingFromScreen,
    setLoading,
    deviceId,
    setLoginSocial,
    loginAction,
    setToastMsg,

    setIsComingFromScreen,
    appConfig,
  } = props;

  moment.locale(lang);
  const { FACEBOOK, GOOGLE, APPLE } = LOGIN_TYPE;
  const [isFailedModal, setFailedModal] = useState(false);

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);

  const setBothLoginResult = useCallback(
    (act) => {
      if (act === SET_LOGIN_SOCIAL_SUCCESS) {
        if (isComingFromScreen?.screen) {
          goToSourceScreen(isComingFromScreen.screen);
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            })
          );
        }
      }
      setLoading(false);
    },
    [goToSourceScreen, isComingFromScreen?.screen, navigation, setLoading]
  );

  /**
   * @param {String} source the source screen name
   * Resets the navigation and navigate to source to force screens hydration
   * Clears isComingFromScreen to remove lingering effect
   */
  const goToSourceScreen = useCallback(
    (source) => {
      setIsComingFromScreen({});
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }, { name: source }],
        })
      );
    },
    [navigation, setIsComingFromScreen]
  );

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    const { email: newEmail } = jwt_decode(
      appleAuthRequestResponse.identityToken
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const {
        fullName,
        email: emailResponse,
        user,
        identityToken,
      } = appleAuthRequestResponse;
      setCheckEmail({
        token: identityToken,
        channelType: APPLE,
        email: appleAuthRequestResponse.email || newEmail,
      })
        .then(() => {
          // 200 => Akun telah terdaftar maka login
          getLocation().then((p) => {
            setLoginSocial({
              name:
                fullName?.givenName !== null
                  ? `${fullName?.givenName} ${fullName?.familyName}`
                  : '',
              dob: null,
              email: emailResponse || newEmail,
              channelUid: user,
              token: identityToken,
              channelType: APPLE,
              deviceId: deviceId,
              deviceType: DeviceInfo.getModel(),
              deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
            });
          });
        })
        .catch((error) => {
          // 400 => Akun belum terdaftar maka register
          setLoading(false);
          if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
            getLocation().then((p) => {
              navigation.navigate(NAVIGATION.REGISTER.RegisterNextStep, {
                name: `${fullName?.givenName} ${fullName?.familyName}`,
                dob: null,
                email: emailResponse || newEmail,
                channelUid: user,
                token: identityToken,
                channelType: APPLE,
                deviceId: deviceId,
                deviceType: DeviceInfo.getModel(),
                deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
              });
            });
          } else {
            Alert.alert('Check Email', 'INTERNAL_SERVER_ERROR');
          }
        });
    }
  }

  // eslint-disable-next-line no-unused-vars
  function setSignInFacebook() {
    setLoading(true);
    setSignInSocial(FACEBOOK).then((r) => {
      const { email: emailFb, userID, accessToken, res, p } = r;
      const dob = res?.data?.birthday
        ? `${res?.data?.birthday.split('/')[2]}-${
            res?.data?.birthday.split('/')[0]
          }-${res?.data?.birthday.split('/')[1]}`
        : undefined;
      setCheckEmail({
        token: accessToken,
        channelType: FACEBOOK,
        email: emailFb,
      })
        .then(() => {
          // 200 => Akun telah terdaftar maka login
          setLoginSocial({
            name: res?.data?.name,
            dob: dob,
            email: emailFb,
            channelUid: userID,
            token: accessToken,
            channelType: 'FACEBOOK',
            deviceId: deviceId,
            deviceType: DeviceInfo.getModel(),
            deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
          });
        })
        .catch((error) => {
          // 400 => Akun belum terdaftar maka register
          setLoading(false);
          if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
            navigation.navigate(NAVIGATION.REGISTER.RegisterNextStep, {
              name: res?.data?.name,
              dob: dob,
              email: emailFb,
              channelUid: userID,
              token: accessToken,
              channelType: FACEBOOK,
            });
          } else {
            Alert.alert('Check Email', 'INTERNAL_SERVER_ERROR');
          }
        });
    });
  }

  function setSignInGoogle() {
    try {
      setLoading(true);
      setTimeout(() => {
        setSignInSocial(GOOGLE)
          .then((r) => {
            const { names, birthdays, emailAddresses, accessToken, p } = r;
            setCheckEmail({
              token: accessToken,
              channelType: GOOGLE,
              email: emailAddresses[0].value,
            })
              .then(() => {
                // 200 => Akun terdaftar maka login
                setLoginSocial({
                  name: names?.length ? names[0].displayName : '',
                  dob: setDobGoogle(birthdays),
                  email: emailAddresses[0].value,
                  channelUid: emailAddresses[0].metadata.source.id,
                  token: accessToken,
                  channelType: GOOGLE,
                  deviceId: deviceId,
                  deviceType: DeviceInfo.getModel(),
                  deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
                });
              })
              .catch((error) => {
                // 400 => Akun belum terdaftar maka register
                setLoading(false);
                if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
                  navigation.navigate(NAVIGATION.REGISTER.RegisterNextStep, {
                    name: names?.length ? names[0].displayName : '',
                    dob: setDobGoogle(birthdays),
                    email: emailAddresses[0].value,
                    channelUid: emailAddresses[0].metadata.source.id,
                    token: accessToken,
                    channelType: GOOGLE,
                  });
                }
                if (error.response.status === RESPONSE_STATUS.ERR_NETWORK) {
                  setToastMsg({
                    type: TOAST.type.error,
                    text1: 'Internet Kamu sedang bermasalah',
                  });
                }
              });
          })
          .catch(() => {
            setLoading(false);
          });
      }, 1000);
    } catch (error) {
      setLoading(false);
      setToastMsg({
        type: TOAST.type.error,
        text1: 'Internet Kamu sedang bermasalah',
      });
    }
  }

  function renderImageContainer() {
    return (
      <View style={Style.imageContainer}>
        <Image
          source={RegisterIllustration}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 360, height: 360 }}
          resizeMode="contain"
        />
      </View>
    );
  }

  function renderCaptionContainer() {
    return (
      <View style={Style.captionContainer}>
        <Text
          align="center"
          size={Size.text.h6.size}
          textStyle="bold"
          style={Style.caption}>
          {trans(locale, lang, 'selamatDatangDiLife')}
        </Text>
        <Text
          align="center"
          size={Size.text.body2.size}
          line={23.8}
          color={Color.mediumGray.light.mediumGray}
          textStyle="medium">
          {trans(locale, lang, 'daftarkanDiriKamu')}
        </Text>
      </View>
    );
  }

  function renderButtonContainer() {
    const parameter = params?.phoneNumber
      ? { phoneNumber: params?.phoneNumber }
      : null;
    return (
      <View>
        <Button
          prefixIcon={
            <Kite
              width={24}
              height={24}
              fill={Color.primary.light.primary90}
              style={Style.buttonIcon}
            />
          }
          shadow
          color={Color.main.light.white}
          titleColor={Color.darkGray.light.darkGray}
          borderColor={Color.main.light.white}
          style={Style.mb20}
          onPress={() => {
            navigation.navigate(NAVIGATION.REGISTER.RegisterInput, parameter);
          }}>
          {trans(locale, lang, 'daftarDengan')}
        </Button>
        <Button
          color={Color.main.light.white}
          shadow
          titleColor={Color.darkGray.light.darkGray}
          prefixIcon={
            <Google1 width={24} height={24} style={Style.buttonIcon} />
          }
          style={Style.mb20}
          onPress={() => setSignInGoogle()}>
          {trans(locale, lang, 'daftarLewatGoogle')}
        </Button>

        {Platform.OS === 'ios' && appConfig?.features?.appleSignIn && (
          <Button
            color={Color.main.light.white}
            shadow
            titleColor={Color.darkGray.light.darkGray}
            prefixIcon={
              <Apple width={24} height={24} style={Style.buttonIcon} />
            }
            style={Style.mb20}
            onPress={() => onAppleButtonPress()}>
            {trans(locale, lang, 'loginLewatApple')}
          </Button>
        )}

        {/* <Button
          outline
          color={Color.lightGray.light.lightGray}
          borderColor={Color.main.light.white}
          titleColor={Color.darkGray.light.darkGray}
          prefixIcon={
            <Facebook1 width={24} height={24} style={Style.buttonIcon} />
          }
          style={[Style.mb20, { elevation: 2 }]}
          onPress={() => setSignInFacebook()}>
          {trans(locale, lang, 'daftarLewatFacebook')}
        </Button> */}
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <View style={Style.footerContainer}>
        <Text
          color={Color.mediumGray.light.mediumGray}
          size={Size.text.body2.size}
          textStyle="semi"
          line={23.8}
          letterSpacing={0.5}>
          {trans(locale, lang, 'sudahPunyaAkun')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.LOGIN.Login)}>
          <Text
            color={Color.primary.light.primary90}
            size={Size.text.body2.size}
            textStyle="semi"
            line={23.8}
            letterSpacing={0.5}
            textDecorationLine="underline">
            {trans(locale, lang, 'masuk')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFailedModal() {
    return (
      <BottomSheet isVisible={isFailedModal} swipeable={false}>
        <View style={Style.failedModal.container}>
          <Lock width={150} height={150} />
          <Text
            textStyle="bold"
            size={Size.text.body1.size}
            line={25.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.failedModal.text1}>
            {trans(locale, lang, 'maafAkunSosial')}
          </Text>
          <Button
            style={Style.mb20}
            outline
            block
            onPress={() => {
              setFailedModal(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            block
            onPress={() => {
              setFailedModal(false);
              navigation.navigate(NAVIGATION.LOGIN.Login);
            }}>
            {trans(locale, lang, 'login')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      bordered
      isPaddingBottom={false}
      onBackPress={() => {
        navigation.pop();
        setIsComingFromScreen({});
      }}
      title={trans(locale, lang, 'registrasi')}>
      <View style={[Style.wrapper, Style.baseBackground]}>
        <Padder>
          <View style={[Style.wrapper]}>
            {renderImageContainer()}
            {renderCaptionContainer()}
            {renderButtonContainer()}
            {renderFooterContainer()}
          </View>
        </Padder>
      </View>
      {renderFailedModal()}
    </Base>
  );
}

export default RegisterMain;

RegisterMain.propTypes = {
  route: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  deviceId: PropTypes.string.isRequired,
  loginAction: PropTypes.string.isRequired,
  setLoginSocial: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
};
