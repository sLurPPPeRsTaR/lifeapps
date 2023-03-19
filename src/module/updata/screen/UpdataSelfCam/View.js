import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, NativeModules, Platform, Image } from 'react-native';
import Text from 'ca-component-generic/Text';
import {
  LIVENESS_SDK_KEY,
  LIVENESS_SECRET_KEY,
  NAVIGATION,
  RESPONSE_STATE,
  LIVENESS_ERROR_CODE,
} from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import AAIIOSLivenessView from 'react-native-aaiios-liveness-sdk';
import Button from 'ca-component-generic/Button';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import {
  SET_UPDATA_LIVENESS_FAILED,
  SET_UPDATA_LIVENESS_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { useDefaultBackHandler, useMount } from 'ca-util/common';
import {
  ClockOTP,
  WajahBlur,
  WajahCahaya,
  WajahKacamataHitam,
  WajahMasker,
  KTPMukatidakcocok,
} from 'ca-config/Image';
import { setLivenessLicenseApi } from 'ca-module-kyc/kycApi';
import Color from 'ca-config/Color';
import Dash from 'react-native-dash';
import {
  SET_KYC_FACECOMPARE_FAILED,
  SET_KYC_FACECOMPARE_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import locale from './locale';
import style from './style';

function UpdataSelfCam(props) {
  const {
    navigation,
    lang,
    updataAction,
    setUpdataLiveness,
    setUpdataLivenessFailed,
    setUpdataLivenessResponse,
    setUpdataLivenessClear,
    setLoading,
    setIsShowModalInternalServerError,
    setIsKTPSame,
    kycAction,
    setKycFaceCompare,
    setKycFaceCompareClear,
    setKycFaceCompareFailed,
    getUpdataValidationCheckResponse,
  } = props;

  useDefaultBackHandler(navigation);

  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;
  const {
    ACTION_TIMEOUT,
    MULTIPLE_FACE,
    FACE_MISSING,
    CHECKING_OVER_QUERY_LIMIT,
    USER_GIVE_UP,
  } = LIVENESS_ERROR_CODE;

  const [isTimeOutModal, setIsTimeOutModal] = useState(false);
  const [isLivenessFailModal, setIsLivenessFailModal] = useState(false);
  const [isCompareFailModalVisible, setCompareFailModalVisible] =
    useState(false);

  useEffect(() => {
    setUpdataResult(updataAction, setUpdataLivenessResponse);
  }, [updataAction, setUpdataResult, setUpdataLivenessResponse]);

  const setUpdataResult = useCallback(
    (act, res) => {
      if (act === SET_UPDATA_LIVENESS_SUCCESS) {
        if (res?.data?.score < 50) {
          setLoading(false);
          setUpdataLivenessClear();
          setIsLivenessFailModal(true);
        } else {
          setLoading(false);
          setUpdataLivenessClear();
          setLoading(true);
          setKycFaceCompare({ category: 'E_KYC_UPDATE_DATA' });
        }
      }
      if (act === SET_UPDATA_LIVENESS_FAILED) {
        setLoading(false);
        setUpdataLivenessClear();
        if (setUpdataLivenessFailed?.message !== INTERNAL_SERVER_ERROR) {
          setIsLivenessFailModal(true);
        } else {
          navigation.pop();
        }
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      navigation,
      setKycFaceCompare,
      setLoading,
      setUpdataLivenessClear,
      setUpdataLivenessFailed?.message,
    ]
  );

  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_FACECOMPARE_SUCCESS) {
        setLoading(false);
        setKycFaceCompareClear();
        setIsKTPSame(true);

        const validationCheckRes = getUpdataValidationCheckResponse?.data;
        if (validationCheckRes?.isValid === true) {
          navigation.replace(NAVIGATION.UPDATA.UpdataInformation);
        } else {
          navigation.replace(NAVIGATION.UPDATA.UpdataKK);
        }
      }
      if (act === SET_KYC_FACECOMPARE_FAILED) {
        setLoading(false);
        if (setKycFaceCompareFailed?.message !== INTERNAL_SERVER_ERROR) {
          setCompareFailModalVisible(true);
        }
        setKycFaceCompareClear();
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      getUpdataValidationCheckResponse?.data,
      navigation,
      setIsKTPSame,
      setKycFaceCompareClear,
      setKycFaceCompareFailed?.message,
      setLoading,
    ]
  );

  useMount(() => {
    if (Platform.OS === 'ios') {
      NativeModules.RNAAILivenessSDK.init(
        LIVENESS_SDK_KEY,
        LIVENESS_SECRET_KEY,
        'Indonesia'
      );
    }
    if (Platform.OS === 'android') {
      NativeModules.LivenessModule.initSDKByKey(
        LIVENESS_SDK_KEY,
        LIVENESS_SECRET_KEY,
        'Indonesia',
        true
      );
      setLivenessLicenseApi().then((res) => {
        NativeModules.LivenessModule.setLicenseAndCheck(
          res?.data?.data?.license,
          () => setStartLiveness(),
          (errorCode) => {
            console.log(errorCode);
          }
        );
      });
    }
  });

  const setStartLiveness = useCallback(() => {
    NativeModules.LivenessModule.startLiveness(
      (livenessId) => {
        setLoading(true);
        setUpdataLiveness({
          livenessId: livenessId?.livenessId,
          category: 'E_KYC_UPDATE_DATA',
        });
      },
      (cancel) => {
        const { errorCode } = cancel;
        if (errorCode === ACTION_TIMEOUT) {
          setIsTimeOutModal(true);
          return;
        }
        if (errorCode === MULTIPLE_FACE || errorCode === FACE_MISSING) {
          setIsLivenessFailModal(true);
          return;
        }
        if (errorCode === CHECKING_OVER_QUERY_LIMIT) {
          navigation.pop();
          setIsShowModalInternalServerError(true);
          return;
        }
        if (errorCode === USER_GIVE_UP) {
          navigation.pop();
        }
      }
    );
  }, [
    ACTION_TIMEOUT,
    CHECKING_OVER_QUERY_LIMIT,
    FACE_MISSING,
    MULTIPLE_FACE,
    USER_GIVE_UP,
    navigation,
    setIsShowModalInternalServerError,
    setLoading,
    setUpdataLiveness,
  ]);

  function renderTimeOutModal() {
    const onBackPress = () => {
      setIsTimeOutModal(false);
      navigation.pop();
    };
    return (
      <BottomSheet
        isVisible={isTimeOutModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.timeout.container}>
          <Image
            source={ClockOTP}
            style={style.modal.timeout.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'maafSesiWaktu')}
          </Text>
          <Text
            style={style.modal.timeout.text}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'silakanCobaLagi')}
          </Text>
        </View>
        <View style={style.modal.timeout.button}>
          <Button type="linear-gradient" onPress={onBackPress}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderLivenessFailModal() {
    const onBackPress = () => {
      setIsLivenessFailModal(false);
      navigation.pop();
    };
    return (
      <BottomSheet
        isVisible={isLivenessFailModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="left">
            {trans(locale, lang, 'verifikasiWajahKamu')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="left"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'ikutiPanduanDiBawah')}
          </Text>
          <View style={style.modal.livenessFail.containerIcon}>
            <Image
              source={WajahMasker}
              style={style.modal.livenessFail.iconGap}
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'wajahJanganMenggunakan')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.modal.livenessFail.containerIcon}>
            <Image
              source={WajahKacamataHitam}
              style={style.modal.livenessFail.iconGap}
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'janganGunakanKacamata')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.modal.livenessFail.containerIcon}>
            <Image
              source={WajahCahaya}
              style={style.modal.livenessFail.iconGap}
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanPencahayaanTelah')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.modal.livenessFail.containerIcon}>
            <Image
              source={WajahBlur}
              style={style.modal.livenessFail.iconGap}
            />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'wajahJanganTerlihat')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
        </View>
        <View style={style.modal.livenessFail.button}>
          <Button type="linear-gradient" onPress={onBackPress}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderCompareFailModal() {
    const onBackPress = () => {
      setCompareFailModalVisible(false);
      navigation.pop();
    };
    return (
      <BottomSheet
        isVisible={isCompareFailModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderCompareFailModal.container}>
          <Image
            source={KTPMukatidakcocok}
            style={style.renderCompareFailModal.image}
          />
          <Text
            align="center"
            style={style.renderCompareFailModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}>
            {trans(locale, lang, 'kamiMenemukanKtp')}
          </Text>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}
            style={style.mb16}>
            {trans(locale, lang, 'dataYangKamu')}
          </Text>
          <Button style={style.mT20} block onPress={onBackPress}>
            {trans(locale, lang, 'cobaLagiCompareFail')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View style={style.flex1}>
        {renderTimeOutModal()}
        {renderLivenessFailModal()}
        {renderCompareFailModal()}
      </View>
    );
  }
  return (
    <>
      <AAIIOSLivenessView
        showHUD
        style={style.sdkContent}
        onCameraPermissionDenied={(errorKey, errorMessage) => {
          console.log('>>>>> onCameraPermissionDenied', errorKey, errorMessage);
        }}
        livenessViewBeginRequest={() => {
          console.log('>>>> livenessViewBeginRequest');
        }}
        livenessViewEndRequest={() => {
          console.log('>>>>> livenessViewEndRequest');
        }}
        onDetectionComplete={(livenessId) => {
          setLoading(true);
          setUpdataLiveness({
            livenessId: livenessId,
            category: 'E_KYC_UPDATE_DATA',
          });
        }}
        onDetectionFailed={(errorCode) => {
          if (errorCode === 'fail_reason_prepare_timeout') {
            setIsTimeOutModal(true);
          } else {
            setIsLivenessFailModal(true);
          }
        }}
        onLivenessViewRequestFailed={(
          errorCode,
          errorMessage,
          transactionId
        ) => {
          console.log(
            '>>>>> onLivenessViewRequestFailed:',
            errorCode,
            errorMessage,
            transactionId
          );
        }}
      />
      {renderTimeOutModal()}
      {renderLivenessFailModal()}
      {renderCompareFailModal()}
    </>
  );
}

export default UpdataSelfCam;

UpdataSelfCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  setUpdataLiveness: PropTypes.func.isRequired,
  setUpdataLivenessFailed: PropTypes.objectOf(Object).isRequired,
  setUpdataLivenessResponse: PropTypes.objectOf(Object).isRequired,
  setUpdataLivenessClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
  setIsKTPSame: PropTypes.func.isRequired,
  kycAction: PropTypes.string.isRequired,
  setKycFaceCompare: PropTypes.func.isRequired,
  setKycFaceCompareClear: PropTypes.func.isRequired,
  setKycFaceCompareFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataValidationCheckResponse: PropTypes.objectOf(Object).isRequired,
};
