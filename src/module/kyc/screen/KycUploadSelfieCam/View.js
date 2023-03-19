import React, { useCallback, useEffect, useState } from 'react';
import { NativeModules, View, Platform, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  LIVENESS_SDK_KEY,
  LIVENESS_SECRET_KEY,
  NAVIGATION,
  RESPONSE_STATE,
} from 'ca-util/constant';
import {
  setLivenessLicenseApi,
  setLivenessResultApi,
} from 'ca-module-kyc/kycApi';
import AAIIOSLivenessView from 'react-native-aaiios-liveness-sdk';
import { useMount } from 'ca-util/common';
import {
  SET_KYC_FACECOMPARE_FAILED,
  SET_KYC_FACECOMPARE_SUCCESS,
  SET_KYC_REFACECOMPARE_FAILED,
  SET_KYC_REFACECOMPARE_SUCCESS,
  SET_KYC_SELFIE,
  SET_KYC_SELFIE_FAILED,
  SET_KYC_SELFIE_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Dash from 'react-native-dash';
import {
  KTPMukatidakcocok,
  PlainClock,
  WajahBlur,
  WajahCahaya,
  WajahKacamataHitam,
  WajahMasker,
} from 'ca-config/Image';
import Splash from 'ca-component-container/Splash';
import locale from './locale';
import style from './style';

function KycUploadSelfieCam(props) {
  const {
    navigation,
    lang,
    setKycSelfie,
    setKycSelfieFailed,
    setLoading,
    kycAction,
    setKycSelfieClear,
    setUserData,
    setIsShowModalInternalServerError,
    setKycReFaceCompare,
    setKycReFaceCompareClear,
    setKycReFaceCompareFailed,
    userData,
    setKycFaceCompare,
    setKycFaceCompareClear,
    setKycFaceCompareFailed,
  } = props;

  const [isLivenessFailModal, setIsLivenessFailModal] = useState(false);
  const [isTimeOutModal, setIsTimeOutModal] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(false);
  const [isCompareFailModalVisible, setCompareFailModalVisible] =
    useState(false);

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
        <View style={style.renderTimeOutModal.container}>
          <Image source={PlainClock} style={style.renderTimeOutModal.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'maafKamiSesi')}
          </Text>
          <Text
            style={style.renderTimeOutModal.text}
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'silakanCobaLagi')}
          </Text>
        </View>
        <View style={style.renderTimeOutModal.button}>
          <Button
            type="linear-gradient"
            onPress={() => {
              setIsTimeOutModal(false);
              navigation.pop();
            }}>
            {trans(locale, lang, 'cobaLagiTimeOutModal')}
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
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            letterSpacing={0.5}
            align="left"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'ikutiPanduanDiBawah')}
          </Text>
          <View style={style.renderLivenessFailModal.containerIcon}>
            <Image
              source={WajahMasker}
              style={style.renderLivenessFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'wajahJanganMenggunakan')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.renderLivenessFailModal.containerIcon}>
            <Image
              source={WajahKacamataHitam}
              style={style.renderLivenessFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'janganGunakanKacamata')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.renderLivenessFailModal.containerIcon}>
            <Image
              source={WajahCahaya}
              style={style.renderLivenessFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'pastikanPencahayaanTelah')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.renderLivenessFailModal.containerIcon}>
            <Image
              source={WajahBlur}
              style={style.renderLivenessFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'wajahJanganTerlihat')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
        </View>
        <View style={style.renderLivenessFailModal.button}>
          <Button
            type="linear-gradient"
            onPress={() => {
              setIsLivenessFailModal(false);
              navigation.pop();
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
        title={trans(locale, lang, 'verifikasiWajahBerhasil')}
        desc={trans(locale, lang, 'kamuTelahMelakukan')}
        isVisible={isSplashVisible}
      />
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
            line={27}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'dataYangKamu')}
          </Text>
          <Button
            style={style.mT20}
            block
            onPress={() => {
              setCompareFailModalVisible(false);
              navigation.pop();
            }}>
            {trans(locale, lang, 'cobaLagiCompareFail')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

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
          () => {}
        );
      });
    }
  });

  // comment if there is a change for kyc provider
  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  const setStartLiveness = useCallback(() => {
    NativeModules.LivenessModule.startLiveness(
      (livenessId) => {
        setLivenessResult(livenessId);
      },
      (cancel) => {
        const { errorCode } = cancel;
        if (errorCode === 'ACTION_TIMEOUT') {
          setIsTimeOutModal(true);
          return;
        }
        if (errorCode === 'MULTIPLE_FACE' || errorCode === 'FACE_MISSING') {
          setIsLivenessFailModal(true);
          return;
        }
        if (errorCode === 'CHECKING_OVER_QUERY_LIMIT') {
          navigation.pop();
          setIsShowModalInternalServerError(true);
          return;
        }
        if (errorCode === 'USER_GIVE_UP') {
          navigation.pop();
        }
      }
    );
  }, [navigation, setIsShowModalInternalServerError, setLivenessResult]);

  const setLivenessResult = useCallback(
    (livenessId) => {
      setLivenessResultApi({
        livenessId:
          Platform.OS === 'android' ? livenessId?.livenessId : livenessId,
        resultType: 'IMAGE_URL',
      }).then((res) => {
        if (res?.data?.data?.livenessScore < 50) {
          setIsLivenessFailModal(true);
        } else {
          setKycSelfie({
            livenessId:
              Platform.OS === 'android' ? livenessId?.livenessId : livenessId,
            category: 'E_KYC_LIFE_PLUS',
          });
        }
      });
    },
    [setKycSelfie]
  );

  // comment if there is a change for kyc provider
  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_SELFIE) {
        setLoading(true);
      }
      if (act === SET_KYC_SELFIE_SUCCESS) {
        if (userData?.isReLivenessTest) {
          setLoading(false);
          setKycReFaceCompare();
        } else if (userData?.isReLivenessTestAndReUploadIdCard) {
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
          setUserData({
            userData: {
              alreadyReLivenessTest: true,
            },
          });
        } else {
          setLoading(false);
          setKycFaceCompare({ category: 'E_KYC_LIFE_PLUS' });
        }
      }
      if (act === SET_KYC_SELFIE_FAILED) {
        setLoading(false);
        setKycSelfieClear();
        if (
          setKycSelfieFailed?.message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setIsLivenessFailModal(true);
        } else {
          navigation.pop();
        }
      }
      if (act === SET_KYC_REFACECOMPARE_SUCCESS) {
        setUserData({
          userData: {
            isReLivenessTest: false,
            isReKYC: false,
          },
        });
        setSplashVisible(true);
        setTimeout(() => {
          setKycReFaceCompareClear();
          setKycSelfieClear();
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }, 3000);
      }
      if (act === SET_KYC_REFACECOMPARE_FAILED) {
        setLoading(false);
        setKycSelfieClear();
        if (
          setKycReFaceCompareFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setCompareFailModalVisible(true);
        } else {
          navigation.pop();
        }
      }
      if (act === SET_KYC_FACECOMPARE_SUCCESS) {
        setUserData({
          userData: {
            alreadyLivenessTest: true,
          },
        });
        setSplashVisible(true);
        setTimeout(() => {
          setKycFaceCompareClear();
          setKycSelfieClear();
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }, 3000);
      }
      if (act === SET_KYC_FACECOMPARE_FAILED) {
        setKycFaceCompareClear();
        setKycSelfieClear();
        if (
          setKycFaceCompareFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setCompareFailModalVisible(true);
        } else {
          navigation.pop();
        }
      }
    },
    [
      navigation,
      setKycFaceCompare,
      setKycFaceCompareClear,
      setKycFaceCompareFailed?.message,
      setKycReFaceCompare,
      setKycReFaceCompareClear,
      setKycReFaceCompareFailed?.message,
      setKycSelfieClear,
      setKycSelfieFailed?.message,
      setLoading,
      setUserData,
      userData?.isReLivenessTest,
      userData?.isReLivenessTestAndReUploadIdCard,
    ]
  );

  if (Platform.OS === 'android') {
    return (
      <>
        <View style={style.flex}>
          {renderLivenessFailModal()}
          {renderTimeOutModal()}
        </View>
        {renderSplash()}
        {renderCompareFailModal()}
      </>
    );
  }
  return (
    <>
      <AAIIOSLivenessView
        showHUD
        language={lang}
        style={styles.sdkContent}
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
          setLivenessResult(livenessId);
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
      {renderLivenessFailModal()}
      {renderTimeOutModal()}
      {renderSplash()}
      {renderCompareFailModal()}
    </>
  );
}

const styles = StyleSheet.create({
  sdkContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteCard.light.color,
  },
});

export default KycUploadSelfieCam;

KycUploadSelfieCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setKycSelfie: PropTypes.func.isRequired,
  setKycSelfieFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  kycAction: PropTypes.string.isRequired,
  setKycSelfieClear: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
  setKycReFaceCompare: PropTypes.func.isRequired,
  setKycReFaceCompareClear: PropTypes.func.isRequired,
  setKycReFaceCompareFailed: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setKycFaceCompare: PropTypes.func.isRequired,
  setKycFaceCompareClear: PropTypes.func.isRequired,
  setKycFaceCompareFailed: PropTypes.objectOf(Object).isRequired,
};
