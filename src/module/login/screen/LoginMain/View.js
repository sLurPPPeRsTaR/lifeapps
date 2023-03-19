import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import {
  Account,
  Clock,
  Eye1,
  EyeOff1,
  Google1,
  Apple,
  Lock1,
  Kite,
} from 'ca-config/Svg';
import { BackgroundInput, BadgeTick, ClockOTP } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import { NAVIGATION, RESPONSE_STATE, LOGIN_TYPE, APP } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import {
  SET_LOGIN_FAILED,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_SOCIAL_FAILED,
  SET_LOGIN_SOCIAL_SUCCESS,
} from 'ca-module-login/loginConstant';
import DeviceInfo from 'react-native-device-info';
import {
  regexEmail,
  regexGlobalPhoneNumber,
  setDobGoogle,
  setSignInSocial,
} from 'ca-util/common';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { CommonActions } from '@react-navigation/native';
import { getLocation } from 'ca-util/location';
import ModalFailedLogin from 'ca-component-modal/ModalFailedLogin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Base15 from 'ca-component-container/Base15';
import Style from './style';
import locale from './locale';

function LoginMain(props) {
  const {
    navigation,
    lang,
    deviceId,
    setLogin,
    loginAction,
    setLoginClear,
    setLoginFailed,
    setLoginSocialFailed,
    setLoginSocialClear,
    setLoading,
    setLoginSocial,
    route: { params },
    setIsShowModalCustomerCare,
    setToastMsg,
    alreadyKYC,
    isComingFromScreen,
    setIsShowFailedModalLogin,
    isShowFailedModalLogin,
    setIsComingFromScreen,
    appConfig,
    width,
    isComingFromDeepLink,
  } = props;

  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const warningBajo = {
    warning: trans(locale, lang, 'mohonGunakanEmailOrHp'),
  };

  const { INTERNAL_SERVER_ERROR, USER_BLOCKED_ } = RESPONSE_STATE;
  const { FACEBOOK, GOOGLE } = LOGIN_TYPE;
  const [email, setEmail] = useState(params?.phoneNumber || null);
  const [password, setPassword] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  // const [isSMVisible, setSMVisible] = useState(false);
  const [isFMVisible, setFMVisible] = useState(false);
  const [isLMVisible, setLMVisible] = useState(false);
  const [isSPVisible, setSPVisible] = useState(false);

  const [emailMessage, setEmailMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [isSubmit, setIsSubmit] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [isLoginSocialFailed, setIsLoginSocialFailed] = useState(false);

  useLayoutEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email, validateEmail]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoginClear();
      setLoginSocialClear();
    });
    return unsubscribe;
  }, [navigation, setLoginClear, setLoginSocialClear]);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setIsUserBlocked(false);
      setLMVisible(false);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    const goTo = () => {
      if (navigation.canGoBack()) {
        navigation.pop();
      } else {
        setIsComingFromScreen({});
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          })
        );
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromScreen]);

  const goToHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
      })
    );
  }, [navigation]);

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);

  const setBothLoginResult = useCallback(
    (act) => {
      if (act === SET_LOGIN_SOCIAL_SUCCESS || act === SET_LOGIN_SUCCESS) {
        setLoading(false);
        if (
          params?.id !== '' &&
          !alreadyKYC &&
          params?.id !== undefined &&
          isComingFromScreen?.screen === undefined
        ) {
          setSPVisible(true);
        }
        if (
          params?.id !== '' &&
          alreadyKYC &&
          params?.id !== undefined &&
          isComingFromScreen?.screen === undefined
        ) {
          goToHome();
        }
        if (
          (params?.id === '' || params?.id === undefined) &&
          isComingFromScreen?.screen === undefined
        ) {
          goToHome();
        }
        if (isComingFromScreen?.screen) {
          if (isComingFromScreen?.screen === NAVIGATION.LIFETAG.LifetagMain) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: isComingFromScreen?.screen,
                  params: isComingFromScreen?.params,
                },
              ],
            });
            return;
          }
          if (isComingFromScreen?.screen === NAVIGATION.POLICY.PolisMain) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'TabMain' }],
              })
            );
            setTimeout(() => {
              navigation.navigate(NAVIGATION.POLICY.PolisMain);
            }, 200);
            setIsComingFromScreen({});
            return;
          }
          navigation.navigate(isComingFromScreen?.screen);
        }
        if (isComingFromDeepLink) {
          if (
            isComingFromScreen?.screen ===
            NAVIGATION.LIFETAG.LifetagDetailProduct
          ) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: isComingFromScreen?.screen,
                },
              ],
            });
            setIsComingFromScreen({});
          }
          if (
            isComingFromScreen?.screen === NAVIGATION.PROFILE.ProfilePayments
          ) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: isComingFromScreen?.screen,
                },
              ],
            });
            setIsComingFromScreen({});
          }
          return;
        }
        setLoginClear();
        setLoginSocialClear();
      }
      if (act === SET_LOGIN_SOCIAL_FAILED) {
        setLoading(false);
        setIsLoginSocialFailed(true);
        if (setLoginFailed?.message !== INTERNAL_SERVER_ERROR) {
          if (setLoginSocialFailed?.message?.match(USER_BLOCKED_)) {
            setIsUserBlocked(true);
            setRemainingSeconds(
              Number(setLoginSocialFailed?.message?.substring(13))
            );
            setLMVisible(true);
          } else {
            setIsShowFailedModalLogin(true);
          }
        }
        setLoginSocialClear();
      }
      if (act === SET_LOGIN_FAILED) {
        setLoading(false);
        setIsLoginSocialFailed(false);
        if (setLoginFailed?.message !== INTERNAL_SERVER_ERROR) {
          if (setLoginFailed?.message?.match(USER_BLOCKED_)) {
            setIsUserBlocked(true);
            setRemainingSeconds(Number(setLoginFailed?.message?.substring(13)));
            setLMVisible(true);
          } else {
            setIsShowFailedModalLogin(true);
          }
        }
        setLoginClear();
      }
      setIsSubmit(false);
    },
    [
      INTERNAL_SERVER_ERROR,
      USER_BLOCKED_,
      alreadyKYC,
      goToHome,
      isComingFromDeepLink,
      isComingFromScreen?.params,
      isComingFromScreen?.screen,
      navigation,
      params?.id,
      setIsComingFromScreen,
      setIsShowFailedModalLogin,
      setLoading,
      setLoginClear,
      setLoginFailed?.message,
      setLoginSocialClear,
      setLoginSocialFailed?.message,
    ]
  );

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    const {
      fullName,
      email: emailResponse,
      user,
      identityToken,
    } = appleAuthRequestResponse;
    if (credentialState === appleAuth.State.AUTHORIZED) {
      try {
        if (!isSubmit) {
          setLoading(true);
          setIsSubmit(true);
          getLocation().then((p) => {
            setLoginSocial({
              name:
                fullName?.givenName !== null
                  ? `${fullName?.givenName} ${fullName?.familyName}`
                  : '',
              dob: '',
              email: emailResponse,
              channelUid: user,
              token: identityToken,
              channelType: 'APPLE',
              deviceId: deviceId,
              deviceType: DeviceInfo.getModel(),
              deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
            });
          });
        }
      } catch (error) {
        setIsSubmit(false);
        setLoading(false);
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  function setSignInFacebook() {
    setLoading(true);
    setSignInSocial(FACEBOOK).then((r) => {
      const { email: emailFb, userID, accessToken, res, p } = r;
      setLoginSocial({
        name: res?.data?.name,
        dob: res?.data?.birthday
          ? `${res?.data?.birthday.split('/')[2]}-${
              res?.data?.birthday.split('/')[0]
            }-${res?.data?.birthday.split('/')[1]}`
          : undefined,
        email: emailFb,
        channelUid: userID,
        token: accessToken,
        channelType: FACEBOOK,
        deviceId: deviceId,
        deviceType: DeviceInfo.getModel(),
        deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
      });
    });
  }

  function setSignInGoogle() {
    try {
      if (!isSubmit) {
        setLoading(true);
        setIsSubmit(true);
        setTimeout(() => {
          setSignInSocial(GOOGLE)
            .then((r) => {
              const { names, birthdays, emailAddresses, accessToken, p } = r;
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
            .catch(() => {
              setIsSubmit(false);
              setLoading(false);
            });
        }, 1000);
      }
    } catch (error) {
      setIsSubmit(false);
      setLoading(false);
    }
  }

  const validateEmail = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setEmailMessage({ error: trans(locale, lang, 'emailRequired') });
        return false;
      }
      if (!regexEmail.test(text) && !regexGlobalPhoneNumber.test(text)) {
        setEmailMessage({ warning: trans(locale, lang, 'emailInvalid') });
        return false;
      }
      setEmailMessage(null);
      return true;
    },
    [lang]
  );

  function validatePassword(text) {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'passwordRequired') });
      return false;
    }
    setPasswordMessage(null);
    return true;
  }

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.body2.size}
          textStyle="medium"
          line={23.8}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'masukkanIDKamu')}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View>
        <View style={Style.mb16}>
          <Input
            value={email}
            label={trans(locale, lang, 'emailLabel')}
            prefixIcon={<Account {...iconProps} />}
            placeholder={trans(locale, lang, 'emailPlaceholder')}
            message={
              isComingFromScreen?.screen ===
                NAVIGATION.LIFESAVER.LifesaverVoucher && !emailMessage
                ? warningBajo
                : emailMessage
            }
            onChangeText={(text) => {
              setEmail(text);
              setValidEmail(validateEmail(text));
            }}
          />
        </View>
        <View>
          <Input
            value={password}
            label={trans(locale, lang, 'passwordLabel')}
            prefixIcon={<Lock1 {...iconProps} />}
            suffixIcon={
              !passwordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'passwordPlaceholder')}
            message={passwordMessage}
            secureTextEntry={passwordVisibility}
            handleSuffixIcon={() => {
              setPasswordVisibility(!passwordVisibility);
            }}
            onChangeText={(text) => {
              setPassword(text);
              setValidPassword(validatePassword(text));
            }}
          />
        </View>
      </View>
    );
  }

  function renderFooterContainerResetPass() {
    return (
      <View>
        <View style={Style.forgotPassword.container}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            boxType="square"
            animationDuration={0.2}
            lineWidth={2}
            tintColors={{
              true: Color.red.dark.red90,
              false: Color.grayInput.light.grayInput,
            }}
            style={Style.forgotPassword.checkbox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text
            style={Style.forgotPassword.text}
            color={Color.mediumGray.light.mediumGray}
            size={Size.text.body2.size}
            textStyle="semi"
            line={23.8}
            letterSpacing={0.5}>
            {trans(locale, lang, 'rememberMe')}
          </Text> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION.FORPASS.Forpass);
            }}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={23.8}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}
              textDecorationLine="underline">
              {trans(locale, lang, 'lupaPassword')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderLimitModal() {
    const onBackPress = () => setLMVisible(false);
    return (
      <BottomSheet
        onClosePress={onBackPress}
        isVisible={isLMVisible}
        swipeable={false}
        onRequestClose={onBackPress}>
        <View style={Style.modal.limit.container}>
          <Image
            source={ClockOTP}
            style={Style.modal.limit.icon}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.body1.size}
            line={25.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.limit.text1}>
            {trans(locale, lang, 'andaTidakDapat')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.limit.text2}>
            {trans(locale, lang, 'silahkanCobaLagi')}{' '}
            <Text textStyle="semi" color={Color.primary.light.primary90}>
              {trans(locale, lang, showRemainingTime())}
            </Text>{' '}
            {trans(locale, lang, 'menit')}
          </Text>
          <Button
            block
            onPress={() => {
              setLMVisible(false);
              setIsShowModalCustomerCare(true);
            }}>
            {trans(locale, lang, 'hubungiCustomerCare')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderButtonContainer() {
    return (
      <View style={{ marginTop: Size.screen.height / 10 }}>
        <View style={Style.mb20}>
          <Button
            prefixIcon={
              <Kite
                fill={
                  !isValidEmail || !isValidPassword || isUserBlocked
                    ? Color.grayTitleButton.light.grayTitleButton
                    : Color.main.light.white
                }
                style={Style.mR5}
              />
            }
            type="linear-gradient"
            disabled={!isValidEmail || !isValidPassword || isUserBlocked}
            onPress={() => {
              setLoading(true);
              if (isNumeric(email) === true) {
                setLogin({
                  id: email?.charAt(0) !== '+' ? `+${email}` : email,
                  password,
                  deviceId,
                  deviceType: DeviceInfo.getModel(),
                });
              } else {
                setLogin({
                  id: email,
                  password,
                  deviceId,
                  deviceType: DeviceInfo.getModel(),
                });
              }
            }}>
            {trans(locale, lang, 'loginBtn')}
          </Button>
        </View>
        <View style={[Style.ButtonContainer.text, Style.mb20]}>
          <Text
            color={Color.mediumGray.light.mediumGray}
            size={Size.text.body2.size}
            textStyle="semi"
            line={23.8}
            letterSpacing={0.5}>
            {trans(locale, lang, 'atau')}
          </Text>
        </View>

        {/* <Button
          outline
          borderColor={Color.gray.light.gray}
          color={Color.lightGray.light.lightGray}
          titleColor={Color.darkGray.light.darkGray}
          prefixIcon={
            <Facebook1
              width={24}
              height={24}
              style={Style.ButtonContainer.buttonIcon}
            />
          }
          style={Style.mb20}
          onPress={() => setSignInFacebook()}>
          {trans(locale, lang, 'loginLewatFacebook')}
        </Button> */}

        <Button
          color={Color.main.light.white}
          shadow
          titleColor={Color.darkGray.light.darkGray}
          prefixIcon={
            <Google1
              width={24}
              height={24}
              style={Style.ButtonContainer.buttonIcon}
            />
          }
          style={Style.mb20}
          onPress={() => setSignInGoogle()}>
          {trans(locale, lang, 'loginLewatGoogle')}
        </Button>

        {Platform.OS === 'ios' && appConfig?.features?.appleSignIn && (
          <Button
            color={Color.main.light.white}
            shadow
            titleColor={Color.darkGray.light.darkGray}
            prefixIcon={
              <Apple
                width={24}
                height={24}
                style={Style.ButtonContainer.buttonIcon}
              />
            }
            style={Style.mb20}
            onPress={() => onAppleButtonPress()}>
            {trans(locale, lang, 'loginLewatApple')}
          </Button>
        )}
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
          {trans(locale, lang, 'belumPunyaAkun')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.REGISTER.Register)}>
          <Text
            color={Color.primary.light.primary90}
            size={Size.text.body2.size}
            textStyle="semi"
            line={23.8}
            letterSpacing={0.5}
            textDecorationLine="underline">
            {trans(locale, lang, 'register')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSuccessLoginPolis() {
    return (
      <BottomSheet isVisible={isSPVisible} swipeable={false}>
        <View style={Style.modal.successPolis.container}>
          <Image source={BadgeTick} style={Style.modal.successPolis.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={Style.modal.successPolis.title}>
            {trans(locale, lang, 'berhasilLogin')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.successPolis.subtitle}>
            {trans(locale, lang, 'andaBaruSaja')}
          </Text>
        </View>
        <Button
          outline
          style={Style.modal.successPolis.button1}
          onPress={() => {
            setSPVisible(false);
            goToHome();
          }}>
          {trans(locale, lang, 'lewati')}
        </Button>
        <Button
          shadow
          onPress={() => {
            setSPVisible(false);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: NAVIGATION.KYC.KycMain,
                },
              ],
            });
          }}>
          {trans(locale, lang, 'verifikasiDataDiri')}
        </Button>
      </BottomSheet>
    );
  }

  function isNumeric(string) {
    if (typeof string !== 'string') return false;
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(string) && !isNaN(parseFloat(string));
  }

  const insets = useSafeAreaInsets();
  const additionalHeight = 413;
  function renderBackgroundHeaderImage() {
    const imageSize = { width: 375, height: 813 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + insets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    return (
      <View style={backgroundStyle}>
        <Image
          source={BackgroundInput}
          style={{ width, height: adjustedHeight }}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <Base15
      isScroll
      animated
      onBackPress={() => {
        if (navigation.canGoBack()) {
          navigation.pop();
        } else {
          setIsComingFromScreen({});
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            })
          );
        }
      }}
      title={trans(locale, lang, 'login')}
      backgroundHeaderImage={renderBackgroundHeaderImage()}
      backgroundColor={Color.main.light.white}>
      <Padder style={Style.baseBackground}>
        <View style={([Style.wrapper], {})}>
          {renderHeaderContainer()}
          {renderInputCard()}
          {renderFooterContainerResetPass()}
          {renderButtonContainer()}
          {renderFooterContainer()}
          {renderLimitModal()}
        </View>
      </Padder>
      {renderSuccessLoginPolis()}
      <ModalFailedLogin
        isVisible={isShowFailedModalLogin}
        lang={lang}
        isLoginSocialFailed={isLoginSocialFailed}
        onPressButtonBack={() => setIsShowFailedModalLogin(false)}
        onPressButtonRegister={() => {
          setIsShowFailedModalLogin(false);
          navigation.replace(NAVIGATION.REGISTER.Register);
        }}
      />
    </Base15>
  );

  // return (
  //   <Base
  //     statusBarStyle="light-content"
  //     bgImage={BackgroundInput}
  //     leftTitle
  //     isLight
  //     isPaddingBottom={false}
  //     onBackPress={
  //       navigation.canGoBack()
  //         ? () => navigation.pop()
  //         : () => navigation.replace(NAVIGATION.AUTH.Auth)
  //     }
  //     title={trans(locale, lang, 'login')}
  //     topHeaderRadius>
  //     <Padder>
  //       <View style={([Style.wrapper], {})}>
  //         {renderHeaderContainer()}
  //         {renderInputCard()}
  //         {renderFooterContainerResetPass()}
  //         {renderButtonContainer()}
  //         {renderFooterContainer()}
  //         {renderLimitModal()}
  //       </View>
  //     </Padder>
  //     {renderSuccessLoginPolis()}
  //     <ModalFailedLogin
  //       isVisible={isShowFailedModalLogin}
  //       lang={lang}
  //       isLoginSocialFailed={isLoginSocialFailed}
  //       onPressButtonBack={() => setIsShowFailedModalLogin(false)}
  //       onPressButtonRegister={() => {
  //         setIsShowFailedModalLogin(false);
  //         navigation.replace(NAVIGATION.REGISTER.Register);
  //       }}
  //     />
  //   </Base>
  // );
}

export default LoginMain;

LoginMain.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired,
  setLoginClear: PropTypes.func.isRequired,
  loginAction: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  setLoginFailed: PropTypes.objectOf(Object).isRequired,
  setLoginSocial: PropTypes.func.isRequired,
  setLoginSocialClear: PropTypes.func.isRequired,
  setLoginSocialFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setIsShowFailedModalLogin: PropTypes.func.isRequired,
  isShowFailedModalLogin: PropTypes.bool.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
};
