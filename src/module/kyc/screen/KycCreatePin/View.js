import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { BackHandler, Image, Keyboard, View } from 'react-native';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { Eye1, Eyes1Gray, SuccessIcon } from 'ca-config/Svg';
import { GagalVerifikasi } from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import moment from 'moment/min/moment-with-locales';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import Input from 'ca-component-generic/Input';
import {
  SET_KYC_PIN_FAILED,
  SET_KYC_PIN_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import Splash from 'ca-component-container/Splash';
import { SET_EVENT_BUYTICKET_FAILED } from 'ca-module-event/eventConstant';
import { GET_IS_USER_ELIGIBLE_FAILED } from 'ca-module-lifesaver/lifesaverConstant';
import { AFLogEvent, AF_COMPLETE_EKYC } from 'ca-util/AppsFlyer';
import Base from 'ca-component-container/Base';
import locale from './locale';
import style from './style';

function KycCreatePin(props) {
  const {
    navigation,
    lang,
    setKycPin,
    kycAction,
    setKycPinFailed,
    setKycPinClear,
    setUserData,
    route: { params },
    isComingFromScreen,
    getUpdataLastKTPInfo,
    getUpdataLastKTPInfoResponse,
    getIsUserEligible,
    lifesaverAction,
    setPersonEligible,
    userData,
    setEventBuyTicket,
    eventAction,
    setIsComingFromScreen,
    setEventBuyTicketFailed,
    setLoading,
  } = props;

  moment.locale(lang);
  const [pin, setPin] = useState();
  const [confirmPin, setConfirmPin] = useState();

  const [pinMessage, setPinMessage] = useState(null);
  const [pinConfMessage, setPinConfMessage] = useState(null);

  const [isValidPin, setValidPin] = useState(false);
  const [isValidPinConf, setValidPinConf] = useState(false);

  const [pinVisible, setPinVisible] = useState(true);
  const [confirmPinVisible, setConfirmPinVisible] = useState(true);

  const [isFailModalVisible, setFailModalVisible] = useState(false);

  const [isSplashVisible, setSplashVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // Validate Pin & Pin Confirmation
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getUpdataLastKTPInfo({ category: 'reminder' });
    setValidPin(validatePin(pin));
    setValidPinConf(validatePinConf(confirmPin));
  }, [confirmPin, getUpdataLastKTPInfo, pin, validatePin, validatePinConf]);

  useEffect(() => {
    if (isComingFromScreen?.screen === 'EventDetail') {
      getIsUserEligible();
      setEventBuyTicket({
        eventId: isComingFromScreen?.params?.eventId,
        accessCode: isComingFromScreen?.params?.accessCode,
      });
    }
  }, [
    getIsUserEligible,
    isComingFromScreen?.params?.accessCode,
    isComingFromScreen?.params?.eventId,
    isComingFromScreen?.screen,
    setEventBuyTicket,
  ]);

  useEffect(() => {
    eventResult(eventAction);
  }, [eventAction, eventResult]);

  useEffect(() => {
    if (isComingFromScreen?.screen === 'EventDetail') {
      lifesaverResult(lifesaverAction);
    }
  }, [isComingFromScreen?.screen, lifesaverAction, lifesaverResult]);

  const lifesaverResult = useCallback(
    (act) => {
      if (act === GET_IS_USER_ELIGIBLE_FAILED) {
        setPersonEligible({
          channel: isComingFromScreen?.params?.channel,
          data: [
            {
              name: getUpdataLastKTPInfoResponse?.data?.name,
              phoneNo: userData?.mobilePhoneNumber,
              email: userData?.email || null,
              dob: getUpdataLastKTPInfoResponse?.data?.dob,
            },
          ],
        });
      }
    },
    [
      getUpdataLastKTPInfoResponse?.data?.dob,
      getUpdataLastKTPInfoResponse?.data?.name,
      isComingFromScreen?.params?.channel,
      setPersonEligible,
      userData?.email,
      userData?.mobilePhoneNumber,
    ]
  );

  const eventResult = useCallback(
    (act) => {
      if (act === SET_EVENT_BUYTICKET_FAILED) {
        if (
          setEventBuyTicketFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          if (
            setEventBuyTicketFailed?.message === RESPONSE_STATE.ALREADY_BOUGHT
          ) {
            setIsComingFromScreen({});
          }
        }
      }
    },
    [setEventBuyTicketFailed?.message, setIsComingFromScreen]
  );

  const validatePin = useCallback(
    (text) => {
      const regexNumber = /^[0-9]*$/;
      if (text === null) {
        return null;
      }
      if (text?.length < 1) {
        setPinMessage({ error: trans(locale, lang, 'newPINRequired') });
        return false;
      }
      if (!regexNumber.test(text)) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length < 6) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      if (text?.length > 6) {
        setPinMessage({ warning: trans(locale, lang, 'newPINInvalid') });
        return false;
      }
      setPinMessage(null);
      return true;
    },
    [lang]
  );

  const validatePinConf = useCallback(
    (text) => {
      if (text === null) {
        return null;
      }
      if (text?.length < 1) {
        setPinConfMessage({ error: trans(locale, lang, 'confPINRequired') });
        return false;
      }
      if (text !== pin) {
        setPinConfMessage({
          error: trans(locale, lang, 'confPINInvalid'),
        });
        return false;
      }
      setPinConfMessage(null);
      return true;
    },
    [lang, pin]
  );

  useEffect(() => {
    getKycResult(kycAction);
  }, [getKycResult, kycAction]);

  const getKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_PIN_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        // APPSFLYER LOG - COMPLETE EKYC
        AFLogEvent(AF_COMPLETE_EKYC, { af_user_id: userData?.userId });
        setSplashVisible(true);
        setUserData({
          userData: {
            alreadySetPin: true,
            alreadySetMPin: true,
          },
        });
        if (
          params?.nextRoute === '' &&
          isComingFromScreen?.screen === undefined
        ) {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            });
          }, 3000);
        } else if (isComingFromScreen?.screen) {
          navigation.navigate(isComingFromScreen?.screen);
        } else {
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
            });
          }, 3000);
        }
      }
      if (act === SET_KYC_PIN_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        if (setKycPinFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setFailModalVisible(true);
        }
      }
      setKycPinClear();
    },
    [
      isComingFromScreen?.screen,
      navigation,
      params?.nextRoute,
      setKycPinClear,
      setKycPinFailed?.message,
      setLoading,
      setUserData,
      userData?.userId,
    ]
  );

  useEffect(() => {
    const goTo = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation]);

  function renderMainContainer() {
    const iconProps = {
      fill: Color.grayIcon.light.grayIcon,
      width: 24,
      height: 24,
    };
    return (
      <Padder style={style.pT60}>
        <Text align="left" textStyle="regular" line={20} letterSpacing={0.5}>
          {trans(locale, lang, 'buatPinUntuk')}
        </Text>
        <View style={style.mT20}>
          <Input
            height={56}
            keyboardType="number-pad"
            maxLength={6}
            label={trans(locale, lang, 'buatPinForm')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            value={pin}
            placeholder={trans(locale, lang, 'masukkanPinBaru')}
            onChangeText={(txt) => {
              setPin(txt.replace(/[^0-9]/g, ''));
            }}
            suffixIcon={
              pinVisible ? (
                <Eyes1Gray {...iconProps} />
              ) : (
                <Eye1 {...iconProps} />
              )
            }
            handleSuffixIcon={() => setPinVisible(!pinVisible)}
            secureTextEntry={pinVisible}
            message={pinMessage}
            suffixContent={
              pin && !pinConfMessage && !pinMessage ? (
                <SuccessIcon style={style.me12} />
              ) : null
            }
          />
        </View>
        <View style={style.mT20}>
          <Input
            height={56}
            keyboardType="number-pad"
            maxLength={6}
            label={trans(locale, lang, 'konfirmasiUlangPin')}
            secondLabel={
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, '*')}
              </Text>
            }
            value={confirmPin}
            placeholder={trans(locale, lang, 'konfirmasiPinBaru')}
            onChangeText={(txt) => {
              setConfirmPin(txt.replace(/[^0-9]/g, ''));
            }}
            suffixIcon={
              confirmPinVisible ? (
                <Eyes1Gray {...iconProps} />
              ) : (
                <Eye1 {...iconProps} />
              )
            }
            handleSuffixIcon={() => setConfirmPinVisible(!confirmPinVisible)}
            secureTextEntry={confirmPinVisible}
            message={pinConfMessage}
            suffixContent={
              pin && !pinConfMessage && !pinMessage ? (
                <SuccessIcon style={style.me12} />
              ) : null
            }
          />
        </View>
      </Padder>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.mB48}>
        <Button
          disabled={!isValidPin || !isValidPinConf || isSubmit}
          type="linear-gradient"
          onPress={() => {
            setLoading(true);
            setIsSubmit(true);
            Keyboard.dismiss();
            setKycPin({
              pin: pin,
              pinConfirmation: confirmPin,
            });
          }}>
          {trans(locale, lang, 'buatPinBtn')}
        </Button>
      </Padder>
    );
  }

  function renderFailModal() {
    const onBackPress = () => {
      setFailModalVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
      });
    };
    return (
      <BottomSheet
        isVisible={isFailModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderFailModal.container}>
          <Image source={GagalVerifikasi} style={style.renderFailModal.image} />
          <Text
            align="center"
            style={style.renderFailModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}>
            {trans(locale, lang, 'andaTelahGagal')}
          </Text>
          <Button
            style={style.mT20}
            block
            onPress={() => {
              setFailModalVisible(false);
              navigation.reset({
                index: 0,
                routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
              });
            }}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderSplash() {
    return (
      <Splash
        title={trans(locale, lang, 'verifikasiDiriBerhasil')}
        desc={trans(locale, lang, 'kamuTelahMelakukan')}
        isVisible={isSplashVisible}
      />
    );
  }

  return (
    <>
      <Base
        isPaddingBottom={false}
        title={trans(locale, lang, 'buatPin')}
        renderBottom={renderFooterContainer()}>
        {renderMainContainer()}
        {renderFailModal()}
      </Base>
      {renderSplash()}
    </>
  );
}

export default KycCreatePin;

KycCreatePin.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setKycPin: PropTypes.func.isRequired,
  kycAction: PropTypes.string.isRequired,
  setKycPinFailed: PropTypes.objectOf(Object).isRequired,
  setKycPinClear: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setFlagEventTicket: PropTypes.func.isRequired,
  getUpdataLastKTPInfo: PropTypes.func.isRequired,
  getUpdataLastKTPInfoResponse: PropTypes.objectOf(Object).isRequired,
  getIsUserEligible: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  setPersonEligible: PropTypes.func.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setPersonEligibleError: PropTypes.objectOf(Object).isRequired,
  setEventBuyTicket: PropTypes.func.isRequired,
  eventAction: PropTypes.string.isRequired,
  setEventBuyTicketFailed: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
