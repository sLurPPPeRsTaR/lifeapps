import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from 'react';
import { View, Alert, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { Attention1, Eye1, EyeOff1, Logo } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import { APP, NAVIGATION, TOAST } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import {
  SET_REGISTER_OTP_FAILED,
  SET_REGISTER_OTP_SUCCESS,
} from 'ca-module-register/registerConstant';
import {
  regexGlobalPhoneNumber,
  regexName,
  regexPassword,
  useMount,
} from 'ca-util/common';
import { BackgroundInput, OTP_Request, TextBox } from 'ca-config/Image';
import { getCheckPhoneEmail } from 'ca-module-register/registerApi';
import BottomSheet from 'ca-component-container/BottomSheet';
import Base15 from 'ca-component-container/Base15';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Style from './style';
import locale from './locale';

function RegisterInput(props) {
  const {
    route: { params },
    navigation,
    lang,
    setRequestOtp,
    registerAction,
    setRequestOtpFailed,
    setResendRegisterOtp,
    setRegisterClear,
    setLoading,
    deviceId,
    setToastMsg,
    isComingFromScreen,
    width,
  } = props;
  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };

  const warningBajo = {
    warning: trans(locale, lang, 'mohonGunakanEmailOrHp'),
  };

  // COUNTDOWN
  const [seconds, setSeconds] = useState();

  const [phoneNumber, setPhoneNumber] = useState(params?.phoneNumber || '');
  const [fullName, setFullName] = useState('');
  const [referral, setReferral] = useState('');
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);

  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const [fullNameMessage, setFullNameMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confPasswordMessage, setConfPasswordMessage] = useState(null);

  const [isValidEmail, setValidPhoneNumber] = useState(false);
  const [isValidFullName, setValidFullName] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const [isValidConfPassword, setValidConfPassword] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setConfPasswordVisibility] = useState(true);

  const [isSubmitCheckPhoneEmail, setIsSubmitCheckPhoneEmail] = useState(false);
  const [isSubmitRequestOtp, setIsSubmitRequestOtp] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [isShowFloatingMsg, setShowFloatingMsg] = useState(false);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setValidPassword(validatePassword(password));
    setValidConfPassword(validateConfPassword(confPassword));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confPassword, validateConfPassword]);

  useEffect(() => {
    if (isTermsAccepted === true) {
      setLoading(true);
      setIsTermsAccepted(false);
      setRequestOtpCallback();
    }
  }, [isTermsAccepted, setLoading, setRequestOtpCallback]);

  const setRequestOtpCallback = useCallback(() => {
    if (!isSubmitRequestOtp) {
      setRequestOtp({
        id: phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
        password,
        passwordConfirmation: confPassword,
        name: fullName,
        dob: null,
        action: 'REGISTER',
        setResendRegisterOtp: false,
        referralCode: referral,
      });
      setIsSubmitRequestOtp(true);
    }
  }, [
    confPassword,
    phoneNumber,
    fullName,
    isSubmitRequestOtp,
    password,
    setRequestOtp,
    referral,
  ]);

  useEffect(() => {
    if (!setResendRegisterOtp) {
      setRegisterResult(registerAction);
    }
  }, [setResendRegisterOtp, registerAction, setRegisterResult]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        setIsTooFrequentlyModal(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const setRegisterResult = useCallback(
    (act) => {
      if (act === SET_REGISTER_OTP_SUCCESS) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        setRegisterClear();
        navigation.navigate(NAVIGATION.REGISTER.RegisterOtp, {
          otpSendTo:
            phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
          ...params,
        });
      }
      if (act === SET_REGISTER_OTP_FAILED) {
        setLoading(false);
        setIsSubmitRequestOtp(false);
        setRegisterClear();
        if (setRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
          setSeconds(setRequestOtpFailed?.message?.substring(15));
          setIsTooFrequentlyModal(true);
        } else if (setRequestOtpFailed?.message?.match('ALREADY_REGISTERED')) {
          setPhoneNumberMessage({
            error: trans(locale, lang, setRequestOtpFailed?.message),
          });
          setValidPhoneNumber(false);
        } else {
          Alert.alert(
            trans(locale, lang, 'warning'),
            trans(locale, lang, setRequestOtpFailed?.message)
          );
        }
      }
    },
    [
      setLoading,
      setRegisterClear,
      navigation,
      phoneNumber,
      params,
      setRequestOtpFailed?.message,
      lang,
    ]
  );

  function checkPhoneAndEmail() {
    getCheckPhoneEmail({
      id: phoneNumber?.charAt(0) !== '+' ? `+${phoneNumber}` : phoneNumber,
      deviceId: deviceId,
    })
      .then((res) => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res.data.data.exist) {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'ALREADY_REGISTERED'),
          });
          setValidPhoneNumber(false);
        }
        if (!res.data.data.exist) {
          navigation.navigate(NAVIGATION.REGISTER.RegisterTerms, {
            returnResult,
          });
        }
      })
      .catch((res) => {
        setLoading(false);
        setIsSubmitCheckPhoneEmail(false);
        if (res?.code === 'ERR_BAD_REQUEST') {
          setPhoneNumberMessage({
            error: trans(locale, lang, 'kodenegaratidakterdaftar'),
          });
          return;
        }
        Alert.alert('Error', res?.code);
      });
  }

  useEffect(() => {
    if (params?.isComingFromDeepLink) {
      setPhoneNumberMessage({
        warning: trans(locale, lang, 'gunakanNomorTerundang'),
      });
    }
  }, [lang, params]);

  function validatePhoneNumber(text) {
    if (text.length < 1) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberRequired'),
      });
      return false;
    }
    if (text.length > 15) {
      setPhoneNumberMessage({
        error: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    if (!regexGlobalPhoneNumber.test(text)) {
      setPhoneNumberMessage({
        warning: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    if (params?.isComingFromDeepLink) {
      setPhoneNumberMessage({
        warning: trans(locale, lang, 'gunakanNomorTerundang'),
      });
    } else {
      setPhoneNumberMessage(null);
    }
    return true;
  }

  function validateFullName(text) {
    if (text.length < 1) {
      setFullNameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (!regexName.test(text)) {
      setFullNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
      return false;
    }
    if (text.length > 100) {
      setFullNameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setFullNameMessage(null);
    return true;
  }

  function validatePassword(text) {
    if (text === null) {
      return null;
    }
    if (text.length < 1) {
      setPasswordMessage({ error: trans(locale, lang, 'passwordRequired') });
      return false;
    }
    if (!regexPassword.test(text)) {
      setPasswordMessage({
        warning: trans(locale, lang, 'passwordInvalid'),
      });
      return false;
    }
    setPasswordMessage(null);
    return true;
  }

  const validateConfPassword = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text.length < 1) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confPasswordRequired'),
        });
        return false;
      }
      if (text !== password) {
        setConfPasswordMessage({
          error: trans(locale, lang, 'confPasswordNotSame'),
        });
        return false;
      }
      setConfPasswordMessage(null);
      return true;
    },
    [lang, password]
  );

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.h6.size}
          textStyle="bold"
          line={30.6}
          color={Color.neutral.light.neutral60}>
          {trans(locale, lang, 'dataDiri')}
        </Text>
        <Logo width={124} height={45} />
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View>
        <View style={Style.mb16}>
          <Input
            keyboardType="phone-pad"
            value={phoneNumber}
            label={trans(locale, lang, 'noHp')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            placeholder={trans(locale, lang, 'noHpKamu')}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setValidPhoneNumber(validatePhoneNumber(text));
            }}
            message={
              isComingFromScreen?.screen ===
                NAVIGATION.LIFESAVER.LifesaverVoucher && !phoneNumberMessage
                ? warningBajo
                : phoneNumberMessage
            }
            prefixPhoneNumber={phoneNumber?.charAt(0) !== '+' && true}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            value={fullName}
            label={trans(locale, lang, 'namaPanggilan')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            placeholder={trans(locale, lang, 'namaPanggilanKamu')}
            onChangeText={(text) => {
              setFullName(text);
              setValidFullName(validateFullName(text));
            }}
            message={fullNameMessage}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            label={trans(locale, lang, 'password')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            suffixIcon={
              !passwordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'buatKataSandi')}
            secureTextEntry={passwordVisibility}
            handleSuffixIcon={() => {
              setPasswordVisibility(!passwordVisibility);
            }}
            onChangeText={(text) => {
              setPassword(text);
              setValidPassword(validatePassword(text));
            }}
            message={passwordMessage}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            value={confPassword}
            label={trans(locale, lang, 'konfirmasiPassword')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            suffixIcon={
              !confPasswordVisibility ? (
                <Eye1 {...iconProps} />
              ) : (
                <EyeOff1 {...iconProps} />
              )
            }
            placeholder={trans(locale, lang, 'ulangiKataSandi')}
            secureTextEntry={confPasswordVisibility}
            handleSuffixIcon={() => {
              setConfPasswordVisibility(!confPasswordVisibility);
            }}
            onChangeText={(text) => {
              setConfPassword(text);
              setValidConfPassword(validateConfPassword(text));
            }}
            message={confPasswordMessage}
          />
        </View>
        <View>
          <Input
            suffixIconLabel={
              <Attention1 fill={Color.neutral.light.neutral40} />
            }
            handleSuffixIcon={() => {
              setShowFloatingMsg(!isShowFloatingMsg);
            }}
            value={referral}
            label={trans(locale, lang, 'kodeReferral')}
            placeholder={trans(locale, lang, 'kodeReferralKamu')}
            maxLength={50}
            onChangeText={(text) => {
              setReferral(text);
            }}
          />
          {isShowFloatingMsg && (
            <View style={Style.renderInputCard.isShowFloatingMsg.container}>
              <Image
                source={TextBox}
                style={Style.renderInputCard.isShowFloatingMsg.image}
              />
              <View style={Style.renderInputCard.isShowFloatingMsg.content}>
                <Text
                  align="left"
                  textStyle="regular"
                  line={17.07}
                  letterSpacing={0.5}>
                  {trans(locale, lang, 'namaNoHpEmailKodeAgen')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <View style={Style.footerContainerWrapper}>
        <Button
          loading={false}
          disabled={
            !isValidEmail ||
            !isValidFullName ||
            !isValidPassword ||
            !isValidConfPassword ||
            isSubmitCheckPhoneEmail
          }
          onPress={() => {
            setLoading(true);
            setIsSubmitCheckPhoneEmail(true);
            checkPhoneAndEmail();
          }}>
          {trans(locale, lang, 'daftarSekarang')}
        </Button>
      </View>
    );
  }

  function returnResult(result) {
    setIsTermsAccepted(result);
  }

  function renderTooFrequentlyModal() {
    return (
      <BottomSheet isVisible={isTooFrequentlyModal} swipeable={false}>
        <View style={Style.tooFrequently.container}>
          <Image
            source={OTP_Request}
            style={Style.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={Style.tooFrequently.title}
            fontWeight="700"
            textStyle="bold"
            size={Size.text.h6.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </Text>
          <Text
            fontWeight="500"
            style={Style.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'andaTelahMeminta')}
            {seconds && <Text>{seconds}</Text>}
            <Text
              fontWeight="500"
              textStyle="medium"
              size={Size.text.body1.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.mediumGray.light.mediumGray}>
              {trans(locale, lang, 'detik')}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}
            style={Style.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
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
      title={trans(locale, lang, 'registrasi')}
      onBackPress={
        navigation.canGoBack()
          ? () => navigation.pop()
          : () => navigation.replace(NAVIGATION.AUTH.Auth)
      }
      backgroundHeaderImage={renderBackgroundHeaderImage()}
      backgroundColor={Color.main.light.white}
      renderBottom={renderFooterContainer()}>
      <Pressable
        style={Style.TouchableWithoutFeedback.container}
        onPressIn={() => {
          setShowFloatingMsg(false);
        }}>
        <Padder style={Style.baseBackground}>
          <View>
            {renderHeaderContainer()}
            {renderInputCard()}
            {renderTooFrequentlyModal()}
          </View>
        </Padder>
      </Pressable>
    </Base15>
  );
}

export default RegisterInput;

RegisterInput.propTypes = {
  route: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setRequestOtp: PropTypes.func.isRequired,
  setRegisterClear: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  registerAction: PropTypes.string.isRequired,
  setRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  colorScheme: PropTypes.string.isRequired,
  setResendRegisterOtp: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
};
