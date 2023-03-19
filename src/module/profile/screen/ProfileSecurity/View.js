import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import Shadow from 'ca-component-container/Shadow';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import { NAVIGATION } from 'ca-util/constant';
import {
  ArrowRight2,
  DeletePerson,
  Device,
  Key,
  Pin,
  Message,
  ArrowRight2Black,
  Handphone,
  ResetPin,
} from 'ca-config/Svg';
import {
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
} from 'ca-module-profile/profileConstant';
import { useDefaultBackHandler } from 'ca-util/common';
import ModalTooFrequentlyOtp from 'ca-component-modal/ModalTooFrequentlyOtp';
import Style from './style';
import locale from './locale';

function ProfileSecurity(props) {
  const {
    navigation,
    lang,
    profileAction,
    userData,
    alreadyKYC,
    alreadySetPin,
    setLoading,
    getPersonalDataResponse,
    alreadySetMPin,
    setProfileRequestOtp,
    setProfileRequestOtpFailed,
    setProfileRequestOtpClear,
    setProfileRequestOtpParam,
  } = props;

  const [isOtpOptionModalVisible, setIsOtpOptionModalVisible] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [reqOtpSendTo, setReqOtpSendTo] = useState('');
  const [reqOtpType, setReqOtpType] = useState('');

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [isSubmit, setIsSubmit] = useState(false);
  const [otpAction, setOtpAction] = useState('');

  const menuList = [
    {
      icon: <Key />,
      title: trans(locale, lang, 'ubahKataSandi'),
      onPress: () => {
        navigation.navigate(NAVIGATION.PROFILE.ProfileChangePassword);
      },
    },
    {
      icon: <Pin />,
      title:
        !alreadySetPin || !alreadySetMPin
          ? trans(locale, lang, 'buatPin')
          : trans(locale, lang, 'ubahPin'),
      onPress: () => {
        if (!alreadyKYC) {
          navigation.replace(NAVIGATION.KYC.KycMain);
        } else if (!alreadySetPin) {
          navigation.navigate(NAVIGATION.PROFILE.ProfileCreateNewPin);
        } else if (!alreadySetMPin) {
          navigation.navigate(NAVIGATION.PROFILE.ProfileChangeNewPin);
        } else {
          navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
            nextRoute: NAVIGATION.PROFILE.ProfileChangeNewPin,
          });
        }
      },
    },
    {
      icon: <ResetPin />,
      title: trans(locale, lang, 'resetPin'),
      onPress: () => {
        setOtpAction('RESET_PIN');
        setIsOtpOptionModalVisible(true);
      },
    },
    {
      icon: <Device />,
      title: trans(locale, lang, 'deviceKamu'),
      onPress: () => navigation.navigate(NAVIGATION.PROFILE.ProfileDevice),
    },

    {
      icon: <DeletePerson />,
      title: trans(locale, lang, 'hapusAkun'),
      onPress: () => {
        if (!alreadyKYC) {
          setOtpAction('VERIFY_DELETE_ACCOUNT');
          setIsOtpOptionModalVisible(true);
        } else {
          navigation.navigate(NAVIGATION.PROFILE.ProfileDeleteAccount);
        }
      },
    },
  ];

  useDefaultBackHandler(navigation);

  useEffect(() => {
    setProfileSecurityResult(profileAction);
  }, [profileAction, setProfileSecurityResult]);

  const setProfileSecurityResult = useCallback(
    (action) => {
      if (action === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        if (setProfileRequestOtpParam.action === 'VERIFY_DELETE_ACCOUNT') {
          navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
            action: 'VERIFY_DELETE_ACCOUNT',
            otpSendTo: reqOtpSendTo,
            otpType: reqOtpType,
            nextRoute: NAVIGATION.PROFILE.ProfileDeleteAccount,
          });
        }
        if (setProfileRequestOtpParam.action === 'RESET_PIN') {
          navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
            action: 'RESET_PIN',
            otpSendTo: reqOtpSendTo,
            otpType: reqOtpType,
            nextRoute: NAVIGATION.PROFILE.ProfileCreateNewPin,
          });
        }
      }
      if (action === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        if (setProfileRequestOtpFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (setProfileRequestOtpFailed?.message?.match('TOO_FREQUENTLY_')) {
            setRemainingSeconds(
              Number(setProfileRequestOtpFailed?.message?.substring(15))
            );
            setTimeout(
              () => {
                setIsTooFrequentlyModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          Alert.alert('Error', setProfileRequestOtpFailed?.message);
        }
      }
    },
    [
      navigation,
      reqOtpSendTo,
      reqOtpType,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
      setProfileRequestOtpParam.action,
    ]
  );

  function renderMenuCard(menu, index) {
    if (index === 0 && userData?.authType !== 'CONVENTIONAL') {
      return null;
    }
    return (
      <TouchableNativeFeedback key={index} onPress={menu.onPress}>
        <View style={[Style.menu.card.container]}>
          <View style={Style.menu.card.card}>
            {menu.icon}
            <View style={Style.menu.card.content.container}>
              <View>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  letterSpacing={0.5}
                  color={Color.blackProfile.light.blackProfile}>
                  {trans(locale, lang, menu.title)}
                </Text>
              </View>
              <ArrowRight2 />
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  function renderMenuContainer() {
    return (
      <View style={Style.menu.container}>
        {menuList.map((menu, index) => {
          if (index === 2 && !userData.alreadyKYC) {
            return null;
          }
          return renderMenuCard(menu, index);
        })}
      </View>
    );
  }

  function renderOtpOptionModal() {
    const emailUser = getPersonalDataResponse?.email || userData?.email;
    const mobilePhoneNumberUser =
      getPersonalDataResponse?.mobilePhoneNumber || userData?.mobilePhoneNumber;
    return (
      <BottomSheet
        isVisible={isOtpOptionModalVisible}
        swipeable={false}
        title={trans(locale, lang, 'konfirmasiOtp')}
        onClosePress={() => setIsOtpOptionModalVisible(false)}>
        <View>
          {emailUser ? (
            <Shadow animated borderRadius={16} style={Style.mb16}>
              <TouchableOpacity
                disabled={isSubmit}
                onPress={() => {
                  if (!isSubmit) {
                    setIsSubmit(true);
                    setLoading(true);
                    setReqOtpType('email');
                    setReqOtpSendTo(emailUser);
                    setProfileRequestOtp({
                      id: emailUser,
                      action: otpAction,
                    });
                    setIsOtpOptionModalVisible(false);
                  }
                }}>
                <Padder style={Style.modal.otpOption.card.container}>
                  <View style={Style.modal.otpOption.card.col.container}>
                    <Message style={Style.modal.otpOption.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={Style.modal.otpOption.card.col.text}>
                      {emailUser}
                    </Text>
                  </View>
                  <ArrowRight2Black />
                </Padder>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          {mobilePhoneNumberUser ? (
            <Shadow animated borderRadius={16} style={Style.mb16}>
              <TouchableOpacity
                disabled={isSubmit}
                onPress={() => {
                  if (!isSubmit) {
                    setIsSubmit(true);
                    setLoading(true);
                    setReqOtpType('number');
                    setReqOtpSendTo(mobilePhoneNumberUser);
                    setProfileRequestOtp({
                      id: mobilePhoneNumberUser,
                      action: otpAction,
                    });
                    setIsOtpOptionModalVisible(false);
                  }
                }}>
                <Padder style={Style.modal.otpOption.card.container}>
                  <View style={Style.modal.otpOption.card.col.container}>
                    <Handphone style={Style.modal.otpOption.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={Style.modal.otpOption.card.col.text}>
                      {mobilePhoneNumberUser}
                    </Text>
                  </View>
                  <ArrowRight2Black />
                </Padder>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          <AlertDialogue
            leftIcon
            type="warning"
            title={trans(locale, lang, 'pastikanEmailAtau')}
          />
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'keamanan')}>
      <Padder>
        {renderMenuContainer()}
        {renderOtpOptionModal()}
        <ModalTooFrequentlyOtp
          lang={lang}
          isVisible={isTooFrequentlyModal}
          swipeable={false}
          onTryAgainPress={() => {
            setIsTooFrequentlyModal(false);
          }}
          remainingSeconds={remainingSeconds}
        />
      </Padder>
    </Base>
  );
}

export default ProfileSecurity;

ProfileSecurity.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  alreadySetMPin: PropTypes.bool.isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpParam: PropTypes.objectOf(Object).isRequired,
};
