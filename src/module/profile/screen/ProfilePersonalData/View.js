import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableNativeFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import {
  ArrowRight2,
  DummyProfile,
  EditRed,
  Male,
  Female,
  EditGray,
  ImageIcon,
  CameraIcon,
  DeleteIcon,
  Message,
  ArrowRight2Black,
  Handphone,
} from 'ca-config/Svg';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  GET_PERSONAL_DATA_SUCCESS,
  GET_USER_ID_CARD_INFO_FAILED,
  GET_USER_ID_CARD_INFO_SUCCESS,
  SET_DELETE_FOTO_PROFILE_SUCCESS,
  SET_PERSONAL_DATA_FAILED,
  SET_PERSONAL_DATA_SUCCESS,
  SET_PROFILE_REQUEST_OTP_FAILED,
  SET_PROFILE_REQUEST_OTP_SUCCESS,
  SET_UPLOAD_PROFILE_SUCCESS,
} from 'ca-module-profile/profileConstant';
import ImagePicker from 'react-native-image-crop-picker';
import { BASE_URL, NAVIGATION, API } from 'ca-util/constant';
import moment from 'moment/min/moment-with-locales';
import { ClockOTP, Ekyc3d, TempatSampah, BadgeTick } from 'ca-config/Image';
import Shadow from 'ca-component-container/Shadow';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { useIsFocused } from '@react-navigation/native';
import { regexName, useDefaultBackHandler } from 'ca-util/common';
import Style from './style';
import locale from './locale';

function ProfilePersonalData(props) {
  const {
    navigation,
    lang,
    colorScheme,
    userData,
    currentScreen,
    setPersonalData,
    setPersonalDataClear,
    profileAction,
    setPersonalDataFailed,
    setIsShowModalComingSoon,
    getPersonalData,
    setLoading,
    getPersonalDataResponse,
    setUploadProfile,
    setDeleteFotoProfile,
    accessToken,
    getUserIDCardInfo,
    getUserIDCardInfoClear,
    getUserIDCardInfoResponse,
    getUserIDCardInfoFailed,
    setProfileRequestOtp,
    setProfileRequestOtpClear,
    setProfileRequestOtpFailed,
    alreadyKYC,
  } = props;

  moment.locale(lang);

  const [name, setName] = useState(
    getPersonalDataResponse?.name || userData?.name
  );
  const [nameMessage, setNameMessage] = useState(null);
  const [isValidName, setIsValidName] = useState(false);

  // Modal
  const [isCompleteListModalHide, setIsCompleteListModalHide] = useState(false);
  const [isUploadOptionModalVisible, setUploadOptionModalVisible] =
    useState(false);
  const [isEditPhotoSuccessModalVisible, setEditPhotoSuccessModalVisible] =
    useState(false);
  const [isDeletePhotoConfModalVisible, setDeletePhotoConfModalVisible] =
    useState(false);
  const [isSuccModal, setSuccModal] = useState(false);
  const [isOtpOptionModalVisible, setIsOtpOptionModalVisible] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isVerified, setIsVerified] = useState(null);

  const [changeAction, setChangeAction] = useState('');
  const [nextRoute, setNextRoute] = useState('');
  const [isSubmitOtp, setIsSubmitOtp] = useState(false);
  const [reqOtpSendTo, setReqOtpSendTo] = useState('');
  const [reqOtpType, setReqOtpType] = useState('');

  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  // Tab
  const [selectedTab, setSelectedTab] = useState('dataAkun');

  const isFocused = useIsFocused();

  useDefaultBackHandler(navigation);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getPersonalData();
      getUserIDCardInfo({});
    }
  }, [getPersonalData, getUserIDCardInfo, isFocused, navigation, setLoading]);

  useEffect(() => {
    if (currentScreen === 'ProfilePersonalData') {
      setProfileResult(profileAction);
    }
  }, [currentScreen, profileAction, setProfileResult]);

  const setProfileResult = useCallback(
    (act) => {
      if (act === GET_PERSONAL_DATA_SUCCESS) {
        setName(getPersonalDataResponse?.name);
      }
      if (act === SET_PERSONAL_DATA_SUCCESS) {
        setTimeout(() => {
          setSuccModal(true);
        }, 500);
        setPersonalDataClear();
      }
      if (act === SET_PERSONAL_DATA_FAILED) {
        if (setPersonalDataFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert(
            trans(locale, lang, 'warning'),
            trans(locale, lang, setPersonalDataFailed?.message)
          );
        }
        setPersonalDataClear();
      }
      if (act === SET_DELETE_FOTO_PROFILE_SUCCESS) {
        setLoading(true);
        setTimeout(() => {
          // setLastAction(SET_DELETE_FOTO_PROFILE_SUCCESS);
          getPersonalData();
        }, 1000);
      }
      if (act === SET_UPLOAD_PROFILE_SUCCESS) {
        setLoading(true);
        setTimeout(() => {
          // setLastAction(SET_UPLOAD_PROFILE_SUCCESS);
          getPersonalData();
        }, 1000);
      }
      if (act === GET_USER_ID_CARD_INFO_SUCCESS) {
        if (getUserIDCardInfoResponse?.data) {
          setIsVerified(true);
        }
      }
      if (act === GET_USER_ID_CARD_INFO_FAILED) {
        const errorMessage = getUserIDCardInfoFailed?.message;
        if (errorMessage !== 'INTERNAL_SERVER_ERROR') {
          setIsVerified(false);
          if (
            errorMessage === 'NOT_VERIFIED' ||
            errorMessage === 'DATA_NOT_EXISTS'
          ) {
            return;
          }
          Alert.alert(
            trans(locale, lang, 'warning'),
            trans(locale, lang, errorMessage)
          );
        }
      }
      if (act === SET_PROFILE_REQUEST_OTP_SUCCESS) {
        setIsSubmitOtp(false);
        setLoading(false);
        setProfileRequestOtpClear();
        navigation.navigate(NAVIGATION.PROFILE.ProfileOtp, {
          action: changeAction,
          otpSendTo: reqOtpSendTo,
          otpType: reqOtpType,
          nextRoute: nextRoute,
        });
      }
      if (act === SET_PROFILE_REQUEST_OTP_FAILED) {
        setIsSubmitOtp(false);
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
      setIsCompleteListModalHide(false);
      setIsSubmit(false);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    [
      getPersonalDataResponse?.name,
      setLoading,
      getPersonalData,
      setPersonalDataClear,
      setPersonalDataFailed?.message,
      lang,
      getUserIDCardInfoResponse?.data,
      getUserIDCardInfoFailed?.message,
      setProfileRequestOtpClear,
      navigation,
      changeAction,
      reqOtpSendTo,
      reqOtpType,
      nextRoute,
      setProfileRequestOtpFailed?.message,
    ]
  );

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
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

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

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (isTooFrequentlyModal) {
        setIsTooFrequentlyModal(false);
      }
    }
  }, [isTooFrequentlyModal, minutes, seconds]);

  function validateName(text) {
    if (text.length < 1) {
      setNameMessage({ error: trans(locale, lang, 'nameRequired') });
      return false;
    }
    if (!regexName.test(text)) {
      setNameMessage({ warning: trans(locale, lang, 'nameInvalid') });
      return false;
    }
    if (text.length > 100) {
      setNameMessage({
        error: trans(locale, lang, 'nameLengthTooLong'),
      });
      return false;
    }
    setNameMessage(null);
    return true;
  }

  function renderHeaderContainer() {
    return (
      <View style={Style.header.container}>
        <View style={Style.header.userProfile.container}>
          <Shadow borderRadius={100}>
            <View>
              {getPersonalDataResponse?.thumbnailPhotoKey &&
              getPersonalDataResponse?.thumbnailPhotoKey !== '' ? (
                <Image
                  style={Style.header.userProfile.photo}
                  source={{
                    uri: `${BASE_URL}${API.USER.photoThumbnail}/${getPersonalDataResponse?.thumbnailPhotoKey}`,
                    headers: {
                      Authorization: `Bearer ${accessToken?.token?.access_token}`,
                    },
                  }}
                  width={100}
                  height={100}
                  resizeMode="cover"
                />
              ) : (
                <DummyProfile
                  width={100}
                  height={100}
                  style={Style.header.userProfile.photo}
                />
              )}
            </View>
          </Shadow>
          <TouchableOpacity
            style={Style.header.userProfile.button}
            onPress={() => setUploadOptionModalVisible(true)}>
            <EditGray />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderTabContainer() {
    const textBadge = {
      textStyle: 'semi',
      size: Size.text.body2.size,
      line: 17,
      letterSpacing: 0.5,
      color: Color.badgeMagenta.light.badgeMagenta,
    };
    const tabList = [
      {
        key: 'dataAkun',
        title: trans(locale, lang, 'dataAkun'),
        onPress: () => setSelectedTab('dataAkun'),
      },
      {
        key: 'dataKTP',
        title: trans(locale, lang, 'dataKTP'),
        onPress: () => setSelectedTab('dataKTP'),
      },
    ];
    return (
      <Shadow animated borderRadius={16} style={Style.mb24}>
        <View style={Style.tab.container}>
          {tabList.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={item.onPress}
              style={[
                Style.tab.tab,
                selectedTab === item.key && {
                  backgroundColor: Color.badgePink.light.badgePink,
                },
              ]}>
              <Text {...textBadge}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Shadow>
    );
  }

  function renderTabContentContainer() {
    if (selectedTab === 'dataAkun') {
      return renderDataAkunContainer();
    }
    if (selectedTab === 'dataKTP') {
      return renderDataKTPContainer();
    }
    return null;
  }

  function renderDataAkunContainer() {
    return (
      <View>
        <View style={Style.mb16}>
          <Input
            value={name}
            height={56}
            label={trans(locale, lang, 'namaLengkap')}
            placeholder={trans(locale, lang, 'masukkanNamaLengkap')}
            onChangeText={(text) => {
              setName(text);
              setIsValidName(validateName(text));
            }}
            message={nameMessage}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            defaultValue={
              getPersonalDataResponse?.mobilePhoneNumber ||
              userData?.mobilePhoneNumber
            }
            height={56}
            editable={false}
            label={trans(locale, lang, 'nomorHP')}
            placeholder={trans(locale, lang, 'masukkanNomorHP')}
            suffixIcon={<EditRed />}
            handleSuffixIcon={() => {
              setChangeAction('REQUEST_CHANGE_MOBILE_PHONE_NUMBER');
              setNextRoute(NAVIGATION.PROFILE.ProfilePhoneEdit);
              setIsOtpOptionModalVisible(true);
            }}
          />
        </View>
        <View style={Style.mb16}>
          <Input
            defaultValue={getPersonalDataResponse?.email || userData?.email}
            height={56}
            editable={false}
            label={trans(locale, lang, 'email')}
            placeholder={trans(locale, lang, 'masukkanEmail')}
            suffixIcon={<EditRed />}
            handleSuffixIcon={() => {
              setChangeAction('REQUEST_CHANGE_EMAIL');
              setNextRoute(NAVIGATION.PROFILE.ProfileEmailEdit);
              setIsOtpOptionModalVisible(true);
            }}
          />
        </View>
        <AlertDialogue
          title={trans(locale, lang, 'emailDanNomorhp')}
          type="warning"
          leftIcon
        />
      </View>
    );
  }

  function renderDataKTPContainer() {
    if (isVerified === false || !alreadyKYC) {
      return (
        <View>
          <Padder style={Style.dataKTP.notVerified.container}>
            <Image
              source={Ekyc3d}
              style={Style.dataKTP.notVerified.image}
              resizeMode="contain"
            />
            <Text
              textStyle="bold"
              size={Size.text.body1.size}
              line={28}
              letterSpacing={0.5}
              align="center"
              color={Color.neutral.light.neutral40}
              style={Style.dataKTP.notVerified.title}>
              {trans(locale, lang, 'kamuBelumMelakukan')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.mediumGray.light.mediumGray}>
              {trans(locale, lang, 'katanyaTakKenal')}
            </Text>
          </Padder>
          <Button
            type="linear-gradient"
            onPress={() => navigation.navigate(NAVIGATION.KYC.KycMain)}>
            {trans(locale, lang, 'verifikasiSekarang')}
          </Button>
        </View>
      );
    }
    if (isVerified === true || alreadyKYC) {
      const resIDCard = getUserIDCardInfoResponse?.data;
      const isMale = resIDCard?.gender === 'LAKI-LAKI';
      return (
        <View>
          {/* Nama */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.name}
              label={trans(locale, lang, 'namaLengkapSesuaiKTP')}
            />
          </View>
          {/* NIK */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.idCardNo}
              label={trans(locale, lang, 'nomorIndukKependudukan')}
            />
          </View>
          {/* Jenis Kelamin */}
          <View style={Style.mb16}>
            <Text
              size={Size.text.caption1.size}
              textStyle="semi"
              line={18}
              letterSpacing={0.5}
              color={Color.mediumGray.light.mediumGray}
              style={Style.mb4}>
              {trans(locale, lang, 'jenisKelamin')}
            </Text>
            <View style={Style.dataKTP.jenisKelamin.container}>
              <View
                style={
                  isMale
                    ? Style.dataKTP.jenisKelamin.card.active
                    : Style.dataKTP.jenisKelamin.card.inactive
                }>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={
                    isMale
                      ? Color.grayTextDisabled.light.grayTextDisabled
                      : Color.grayIcon.light.grayIcon
                  }>
                  {trans(locale, lang, 'lakiLaki')}
                </Text>
                <Male
                  fill={
                    isMale
                      ? Color.grayTextDisabled.light.grayTextDisabled
                      : Color.grayIcon.light.grayIcon
                  }
                  style={Style.dataKTP.jenisKelamin.cardIcon}
                />
              </View>
              <View
                style={
                  !isMale
                    ? Style.dataKTP.jenisKelamin.card.active
                    : Style.dataKTP.jenisKelamin.card.inactive
                }>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={
                    !isMale
                      ? Color.grayTextDisabled.light.grayTextDisabled
                      : Color.grayIcon.light.grayIcon
                  }>
                  {trans(locale, lang, 'perempuan')}
                </Text>
                <Female
                  fill={
                    !isMale
                      ? Color.grayTextDisabled.light.grayTextDisabled
                      : Color.grayIcon.light.grayIcon
                  }
                  style={Style.dataKTP.jenisKelamin.cardIcon}
                />
              </View>
            </View>
          </View>
          {/* Tanggal Lahir */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.dob}
              label={trans(locale, lang, 'tanggalLahir')}
            />
          </View>
          {/* Nama Jalan */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.address}
              label={trans(locale, lang, 'namaJalan')}
            />
          </View>
          {/* Provinsi */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.province}
              label={trans(locale, lang, 'provinsi')}
            />
          </View>
          {/* Kota/Kabupaten */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.city}
              label={trans(locale, lang, 'kotaKabupaten')}
            />
          </View>
          {/* Kecamatan */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.district}
              label={trans(locale, lang, 'kecamatan')}
            />
          </View>
          {/* Kelurahan */}
          <View style={Style.mb16}>
            <Input
              disabled
              height={56}
              editable={false}
              value={resIDCard?.subDistrict}
              label={trans(locale, lang, 'kelurahan')}
            />
          </View>
          {/* RT/RW */}
          <View style={Style.dataKTP.rtRw.container}>
            <View style={Style.dataKTP.rtRw.rt}>
              <Input
                disabled
                height={56}
                editable={false}
                value={resIDCard?.neighborhood}
                label={trans(locale, lang, 'rt')}
              />
            </View>
            <View style={Style.dataKTP.rtRw.rw}>
              <Input
                disabled
                height={56}
                editable={false}
                value={resIDCard?.hamlet}
                label={trans(locale, lang, 'rw')}
              />
            </View>
          </View>
        </View>
      );
    }
    return null;
  }

  function renderUploadOptionModal() {
    return (
      <BottomSheet
        isVisible={isUploadOptionModalVisible}
        title={trans(locale, lang, 'ubahFotoUploadOpt')}
        leftTitle
        onRequestClose={() => {
          setUploadOptionModalVisible(false);
          setIsCompleteListModalHide(false);
        }}
        onClosePress={() => {
          setUploadOptionModalVisible(false);
          setIsCompleteListModalHide(false);
        }}
        onModalHide={() => {
          // eslint-disable-next-line no-unused-expressions
          isCompleteListModalHide && setDeletePhotoConfModalVisible(true);
          setIsCompleteListModalHide(false);
        }}>
        <View>
          <TouchableNativeFeedback
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                forceJpg: true,
              })
                .then((image) => {
                  setUploadOptionModalVisible(false);
                  setTimeout(() => {
                    setLoading(true);
                  }, 1000);
                  setUploadProfile({
                    uri: image.path,
                    name: image.filename ?? 'foto-profile.jpg',
                    type: 'image/jpeg',
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1500);
                });
            }}>
            <View style={[Style.modal.uploadOption.card.container]}>
              <View style={Style.modal.uploadOption.card.card}>
                <ImageIcon width={24} height={24} />
                <View style={Style.modal.uploadOption.card.content.container}>
                  <View>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={21}
                      letterSpacing={0.5}
                      color={Color.blackProfile.light.blackProfile}>
                      {trans(locale, lang, 'ambilGaleri')}
                    </Text>
                  </View>
                  <ArrowRight2 />
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                mediaType: 'photo',
                forceJpg: true,
              })
                .then((image) => {
                  setUploadOptionModalVisible(false);
                  setTimeout(() => {
                    setLoading(true);
                  }, 1000);
                  setUploadProfile({
                    uri: image.path,
                    name: image.filename ?? 'foto-profile.jpg',
                    type: 'image/jpeg',
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1500);
                });
            }}>
            <View style={[Style.modal.uploadOption.card.container]}>
              <View style={Style.modal.uploadOption.card.card}>
                <CameraIcon width={24} height={24} />
                <View style={Style.modal.uploadOption.card.content.container}>
                  <View>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={21}
                      letterSpacing={0.5}
                      color={Color.blackProfile.light.blackProfile}>
                      {trans(locale, lang, 'ambilKamera')}
                    </Text>
                  </View>
                  <ArrowRight2 />
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
          {getPersonalDataResponse?.thumbnailPhotoKey &&
            getPersonalDataResponse?.thumbnailPhotoKey !== '' && (
              <TouchableNativeFeedback
                onPress={() => {
                  setIsCompleteListModalHide(true);
                  setUploadOptionModalVisible(false);
                }}>
                <View style={[Style.modal.uploadOption.card.container]}>
                  <View style={Style.modal.uploadOption.card.card}>
                    <DeleteIcon width={24} height={24} />
                    <View
                      style={Style.modal.uploadOption.card.content.container}>
                      <View>
                        <Text
                          textStyle="semi"
                          size={Size.text.body2.size}
                          line={21}
                          letterSpacing={0.5}
                          color={Color.blackProfile.light.blackProfile}>
                          {trans(locale, lang, 'hapusFotoIni')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            )}
        </View>
      </BottomSheet>
    );
  }

  function renderEditPhotoSuccessModal() {
    return (
      <BottomSheet isVisible={isEditPhotoSuccessModalVisible} swipeable={false}>
        <View style={Style.modal.editPhotoSuccess.container}>
          <Image
            source={BadgeTick}
            resizeMode="contain"
            style={Style.modal.editPhotoSuccess.icon}
          />
          <Text
            align="center"
            style={[Style.modal.editPhotoSuccess.title, Style.mb20]}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}>
            {trans(locale, lang, 'suksesMelakukanPerubahanPhoto')}
          </Text>
          <Button block onPress={() => setEditPhotoSuccessModalVisible(false)}>
            {trans(locale, lang, 'ok')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderDeletePhotoConfModal() {
    return (
      <BottomSheet
        isVisible={isDeletePhotoConfModalVisible}
        swipeable={false}
        onClosePress={() => setDeletePhotoConfModalVisible(false)}
        onRequestClose={() => setDeletePhotoConfModalVisible(false)}>
        <View style={Style.modal.editPhotoSuccess.container}>
          <Image
            source={TempatSampah}
            style={Style.modal.editPhotoSuccess.icon}
            resizeMode="contain"
          />
          <Text
            align="center"
            style={[Style.modal.editPhotoSuccess.title, Style.mb20]}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}>
            {trans(locale, lang, 'apaKamuIngin')}
          </Text>
          <Button
            style={Style.mb20}
            outline
            block
            onPress={() => setDeletePhotoConfModalVisible(false)}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            block
            onPress={() => {
              setDeleteFotoProfile({
                photoKey: getPersonalDataResponse?.photoKey,
              });
              setDeletePhotoConfModalVisible(false);
            }}>
            {trans(locale, lang, 'hapusConf')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderSuccessModal() {
    return (
      <BottomSheet
        isVisible={isSuccModal}
        swipeable={false}
        onClosePress={() => setSuccModal(false)}
        onRequestClose={() => setSuccModal(false)}>
        <View style={Style.modalSM.container}>
          <Image source={BadgeTick} style={Style.modalSM.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            color={Color.neutral[colorScheme].neutral80}
            style={Style.modalSM.text1}>
            {trans(locale, lang, 'suksesMelakukanPerubahanData')}
          </Text>
        </View>
        <Button
          onPress={() => {
            setSuccModal(false);
            navigation.pop();
          }}
          style={Style.modalSM.button1}>
          {trans(locale, lang, 'ok')}
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
            <Shadow animated borderRadius={16} style={Style.mb16}>
              <TouchableOpacity
                disabled={isSubmitOtp}
                onPress={() => {
                  if (!isSubmitOtp) {
                    setIsSubmitOtp(true);
                    setLoading(true);
                    setReqOtpType('email');
                    setReqOtpSendTo(emailUser);
                    setProfileRequestOtp({
                      id: emailUser,
                      action: changeAction,
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
                disabled={isSubmitOtp}
                onPress={() => {
                  if (!isSubmitOtp) {
                    setIsSubmitOtp(true);
                    setLoading(true);
                    setReqOtpType('number');
                    setReqOtpSendTo(mobilePhoneNumberUser);
                    setProfileRequestOtp({
                      id: mobilePhoneNumberUser,
                      action: changeAction,
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

  function renderTooFrequentlyModal() {
    const onBackPress = () => setIsTooFrequentlyModal(false);
    return (
      <BottomSheet
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={Style.modal.tooFrequently.container}>
          <Image
            source={ClockOTP}
            style={Style.modal.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={Style.modal.tooFrequently.title}
            textStyle="bold"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'andaTerlaluSering')}
          </Text>
          <Text
            style={Style.modal.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'untukSementaraWaktu')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {showRemainingTime()}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}
            style={Style.modal.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderButton() {
    if (selectedTab === 'dataAkun') {
      return (
        <View style={[Style.mx16, Style.mb48]}>
          <Button
            loading={isSubmit}
            disabled={
              name === getPersonalDataResponse?.name ||
              name === userData?.name ||
              !isValidName ||
              isSubmit
            }
            onPress={() => {
              setIsSubmit(true);
              setLoading(true);
              setPersonalData({
                name,
              });
            }}>
            {trans(locale, lang, 'simpan')}
          </Button>
        </View>
      );
    }
    return null;
  }

  return (
    <Base
      title={trans(locale, lang, 'personalData')}
      onBackPress={() => {
        navigation.pop();
        setPersonalDataClear();
      }}
      renderBottom={renderButton()}>
      <Padder>
        {renderHeaderContainer()}
        {renderTabContainer()}
        {renderTabContentContainer()}
      </Padder>
      {renderUploadOptionModal()}
      {renderEditPhotoSuccessModal()}
      {renderDeletePhotoConfModal()}
      {renderSuccessModal()}
      {renderOtpOptionModal()}
      {renderTooFrequentlyModal()}
    </Base>
  );
}

export default ProfilePersonalData;

ProfilePersonalData.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  currentScreen: PropTypes.string.isRequired,
  setPersonalDataFailed: PropTypes.objectOf(Object).isRequired,
  setPersonalData: PropTypes.func.isRequired,
  setPersonalDataClear: PropTypes.func.isRequired,
  profileAction: PropTypes.string.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  getPersonalData: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPersonalDataResponse: PropTypes.objectOf(Object).isRequired,
  getPersonalDataFailed: PropTypes.objectOf(Object).isRequired,
  setUploadProfile: PropTypes.func.isRequired,
  setDeleteFotoProfile: PropTypes.func.isRequired,
  accessToken: PropTypes.objectOf(Object).isRequired,
  getUserIDCardInfo: PropTypes.func.isRequired,
  getUserIDCardInfoClear: PropTypes.func.isRequired,
  getUserIDCardInfoResponse: PropTypes.objectOf(Object).isRequired,
  getUserIDCardInfoFailed: PropTypes.objectOf(Object).isRequired,
  setProfileRequestOtp: PropTypes.func.isRequired,
  setProfileRequestOtpClear: PropTypes.func.isRequired,
  setProfileRequestOtpFailed: PropTypes.objectOf(Object).isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
};
