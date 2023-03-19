import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import { AccountDelete, CloudBackground } from 'ca-config/Image';
import Size from 'ca-config/Size';
import {
  ArrowRight2Black,
  DummyProfile,
  Email,
  Handphone,
  Message,
  Warning,
} from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_DELETE_ACCOUNT_FAILED,
  SET_DELETE_ACCOUNT_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { BASE_URL, NAVIGATION, API } from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import ModalTooFrequentlyOtp from 'ca-component-modal/ModalTooFrequentlyOtp';
import locale from './locale';
import style from './style';

function ProfileLanguage(props) {
  const {
    navigation,
    lang,
    setDeleteAccount,
    setLoading,
    profileAction,
    userData,
    accessToken,
    getPoliciesClear,
    setProfileRequestOtp,
    getPersonalDataResponse,
    setProfileRequestOtpClear,
    setProfileRequestOtpFailed,
    route: { params },
  } = props;

  const [isConfModalVisible, setIsConfModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOtpOptionModalVisible, setIsOtpOptionModalVisible] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [reqOtpSendTo, setReqOtpSendTo] = useState('');
  const [reqOtpType, setReqOtpType] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(120);

  const CONFIRMATION_TIME = 10;
  const [seconds, setSeconds] = useState(CONFIRMATION_TIME);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (params?.isVerifyOtp && userData?.alreadyKYC) {
      setLoading(true);
      setIsSubmit(true);
      setDeleteAccount();
    }
  }, [params?.isVerifyOtp, setDeleteAccount, setLoading, userData?.alreadyKYC]);

  useEffect(() => {
    profileActionResult(profileAction);
  }, [profileAction, profileActionResult]);

  const profileActionResult = useCallback(
    (act) => {
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmit(false);
        setLoading(false);
        setProfileRequestOtpClear();
        navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
          action: 'VERIFY_DELETE_ACCOUNT',
          otpSendTo: reqOtpSendTo,
          otpType: reqOtpType,
          nextRoute: NAVIGATION.PROFILE.ProfileDeleteAccount,
        });
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
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
      if (act === SET_DELETE_ACCOUNT_SUCCESS) {
        setLoading(false);
        setIsSubmit(false);
        getPoliciesClear();
      }
      if (act === SET_DELETE_ACCOUNT_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        setIsConfModalVisible(false);
      }
    },
    [
      getPoliciesClear,
      navigation,
      reqOtpSendTo,
      reqOtpType,
      setLoading,
      setProfileRequestOtpClear,
      setProfileRequestOtpFailed?.message,
    ]
  );

  function renderCircleImage() {
    return (
      <View style={style.circleImage.container}>
        {userData?.thumbnailPhotoKey && userData?.thumbnailPhotoKey !== '' ? (
          <Image
            style={style.circleImage.image}
            source={{
              uri: `${BASE_URL}${API.USER.photoThumbnail}/${userData?.thumbnailPhotoKey}`,
              headers: {
                Authorization: `Bearer ${accessToken?.token?.access_token}`,
              },
            }}
            width={104}
            height={104}
            resizeMode="cover"
          />
        ) : (
          <DummyProfile
            width={104}
            height={104}
            style={style.circleImage.image}
          />
        )}
      </View>
    );
  }

  function renderHeaderContainer() {
    return (
      <View style={style.headerContainer}>
        <Text
          textStyle="semi"
          size={Size.text.body1.size}
          line={24}
          align="center">
          {trans(locale, lang, 'apakahKamuIngin')}
        </Text>
      </View>
    );
  }

  function renderListContainer() {
    return (
      <View style={style.listContainer.container}>
        <View style={style.listContainer.row}>
          <View>
            <Email style={style.listContainer.icon} />
          </View>
          <View style={style.listContainer.col}>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={20}
              style={style.listContainer.title}>
              {trans(locale, lang, 'seluruhDataAkan')}
            </Text>
            <Text
              textStyle="regular"
              size={Size.text.caption1.size}
              line={16}
              color={Color.neutral.light.neutral40}>
              {trans(locale, lang, 'andaDapatMenggunakan')}
            </Text>
          </View>
        </View>
        <View style={style.listContainer.row}>
          <View>
            <Warning style={style.listContainer.icon} />
          </View>
          <View style={style.listContainer.col}>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={20}
              style={style.listContainer.title}>
              {trans(locale, lang, 'andaHarusMelakukan')}
            </Text>
            <Text
              textStyle="regular"
              size={Size.text.caption1.size}
              line={16}
              color={Color.neutral.light.neutral40}>
              {trans(locale, lang, 'setelahMenghapusAkun')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBackgroundImage() {
    return (
      <ImageBackground source={CloudBackground} style={style.backgroundImage} />
    );
  }

  function renderBottom() {
    return (
      <Padder>
        <Button
          shadow
          style={style.bottom.button}
          onPress={() => {
            setSeconds(CONFIRMATION_TIME);
            setIsConfModalVisible(true);
          }}>
          {trans(locale, lang, 'hapusAkun')}
        </Button>
      </Padder>
    );
  }

  function renderDeleteConfirmationModal() {
    const onBackPress = () => setIsConfModalVisible(false);
    return (
      <BottomSheet
        isVisible={isConfModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.confirmation.container}>
          <Image
            source={AccountDelete}
            style={style.modal.confirmation.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.confirmation.title}>
            {trans(locale, lang, 'apakahKamuYakin')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            style={style.modal.confirmation.subtitle}>
            {trans(locale, lang, 'akunKamuAkan')}
          </Text>
        </View>
        <Button
          outline
          style={style.modal.confirmation.button1}
          onPress={() => setIsConfModalVisible(false)}>
          {trans(locale, lang, 'tidak')}
        </Button>
        <Button
          shadow
          disabled={seconds > 0 || isSubmit}
          onPress={() => {
            setIsConfModalVisible(false);
            if (userData?.alreadyKYC) {
              setTimeout(
                () => {
                  setIsOtpOptionModalVisible(true);
                },
                Size.isAndroid ? 200 : 600
              );
            } else {
              setDeleteAccount();
            }
          }}>
          {`${trans(locale, lang, 'konfirmasi')}${
            seconds > 0 ? ` (${seconds})` : ''
          }`}
        </Button>
      </BottomSheet>
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
            <Shadow animated borderRadius={16} style={style.mb16}>
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
                      action: 'VERIFY_DELETE_ACCOUNT',
                    });
                    setIsOtpOptionModalVisible(false);
                  }
                }}>
                <Padder style={style.modal.otpOption.card.container}>
                  <View style={style.modal.otpOption.card.col.container}>
                    <Message style={style.modal.otpOption.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={style.modal.otpOption.card.col.text}>
                      {emailUser}
                    </Text>
                  </View>
                  <ArrowRight2Black />
                </Padder>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          {mobilePhoneNumberUser ? (
            <Shadow animated borderRadius={16} style={style.mb16}>
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
                      action: 'VERIFY_DELETE_ACCOUNT',
                    });
                    setIsOtpOptionModalVisible(false);
                  }
                }}>
                <Padder style={style.modal.otpOption.card.container}>
                  <View style={style.modal.otpOption.card.col.container}>
                    <Handphone style={style.modal.otpOption.card.col.icon} />
                    <Text
                      textStyle="medium"
                      numberOfLines={1}
                      style={style.modal.otpOption.card.col.text}>
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
      renderBottom={renderBottom()}
      title={trans(locale, lang, 'hapusAkun')}>
      <Padder>
        {renderCircleImage()}
        {renderHeaderContainer()}
        {renderListContainer()}
        {renderDeleteConfirmationModal()}
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
      {renderBackgroundImage()}
    </Base>
  );
}

export default ProfileLanguage;

ProfileLanguage.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setDeleteAccount: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  accessToken: PropTypes.objectOf(Object).isRequired,
  getPoliciesClear: PropTypes.func.isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};
