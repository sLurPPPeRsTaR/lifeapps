import React, { useEffect, useCallback, useState } from 'react';
import { Image, View } from 'react-native';
import CameraVision from 'ca-component-container/CameraVision';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import {
  SET_KYC_IDCARD,
  SET_KYC_IDCARD_FAILED,
  SET_KYC_IDCARD_SUCCESS,
  SET_KYC_REFACECOMPARE,
  SET_KYC_REFACECOMPARE_SUCCESS,
  SET_KYC_REFACECOMPARE_FAILED,
} from 'ca-module-kyc/kycConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import {
  GagalTerkirim,
  KtpBerlaku,
  KtpBingkai,
  KtpBlur,
  KTP_tidakcocok,
} from 'ca-config/Image';
import Splash from 'ca-component-container/Splash';
import Dash from 'react-native-dash';
import locale from './locale';
import style from './style';

function KycUploadKTPCam(props) {
  const {
    navigation,
    lang,
    setKycIdCard,
    kycAction,
    setLoading,
    setKycIdCardClear,
    setUserData,
    setKycIdCardFailed,
    setKycReFaceCompare,
    setKycReFaceCompareClear,
    setKycReFaceCompareFailed,
    userData,
  } = props;

  const [isFotoKtpFailModalVisible, setIsFotoKtpFailModalVisible] =
    useState(false);
  const [isFotoKtpUploadFailModalVisible, setIsFotoKtpUploadFailModalVisible] =
    useState(false);
  const [isSplashVisible, setSplashVisible] = useState(false);
  const [isKtpNotValidModalVisible, setKtpNotValidModalVisible] =
    useState(false);

  useEffect(() => {
    setKycResult(kycAction);
  }, [kycAction, setKycResult]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setKycIdCardClear();
    });
    return unsubscribe;
  }, [navigation, setKycIdCardClear]);

  const setKycResult = useCallback(
    (act) => {
      if (act === SET_KYC_IDCARD) {
        setLoading(true);
      }
      if (act === SET_KYC_IDCARD_SUCCESS) {
        setLoading(false);
        if (
          userData?.isReUploadIdCard ||
          userData?.isReLivenessTestAndReUploadIdCard
        ) {
          setKycReFaceCompare();
        } else {
          navigation.navigate(NAVIGATION.KYC.KycForm);
        }
      }
      if (act === SET_KYC_IDCARD_FAILED) {
        setLoading(false);
        if (
          setKycIdCardFailed?.message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          if (
            setKycIdCardFailed?.message === 'FILE_EXTENSION_NOT_SUPPORTED' ||
            setKycIdCardFailed?.message === 'FILE_SIZE_TOO_LARGE' ||
            setKycIdCardFailed?.message === 'FILE_SIZE_TOO_SMALL'
          ) {
            setIsFotoKtpUploadFailModalVisible(true);
          } else {
            setIsFotoKtpFailModalVisible(true);
          }
        }
      }

      // REFACECOMPARE
      if (act === SET_KYC_REFACECOMPARE) {
        setLoading(true);
      }
      if (act === SET_KYC_REFACECOMPARE_SUCCESS) {
        setLoading(false);
        setUserData({
          userData: {
            isReUploadIdCard: false,
            isReKYC: false,
            isReLivenessTestAndReUploadIdCard: false,
            alreadyReLivenessTest: false,
          },
        });
        setSplashVisible(true);
        setTimeout(() => {
          setKycReFaceCompareClear();
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }, 3000);
      }
      if (act === SET_KYC_REFACECOMPARE_FAILED) {
        setLoading(false);
        if (
          setKycReFaceCompareFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          setKtpNotValidModalVisible(true);
        }
      }
    },
    [
      navigation,
      setKycIdCardFailed?.message,
      setKycReFaceCompare,
      setKycReFaceCompareClear,
      setKycReFaceCompareFailed?.message,
      setLoading,
      setUserData,
      userData?.isReLivenessTestAndReUploadIdCard,
      userData?.isReUploadIdCard,
    ]
  );

  function renderFotoKtpFailModal() {
    const onBackPress = () => {
      setIsFotoKtpFailModalVisible(false);
      setKycIdCardClear();
      navigation.pop();
    };
    return (
      <BottomSheet
        isVisible={isFotoKtpFailModalVisible}
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
            {trans(locale, lang, 'fotoKamuBelum')}
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
          <View style={style.renderFotoKtpFailModal.containerIcon}>
            <Image
              source={KtpBerlaku}
              style={style.renderFotoKtpFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'gunakanKtpYang')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.renderFotoKtpFailModal.containerIcon}>
            <Image
              source={KtpBingkai}
              style={style.renderFotoKtpFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'pastikanKtpYang')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
          <View style={style.renderFotoKtpFailModal.containerIcon}>
            <Image
              source={KtpBlur}
              style={style.renderFotoKtpFailModal.iconGap}
            />
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={27}
              letterSpacing={0.5}>
              {trans(locale, lang, 'pastikanFotoKtp')}
            </Text>
          </View>
          <Dash dashThickness={1} dashColor={Color.neutral.dark.neutral20} />
        </View>
        <View style={style.renderFotoKtpFailModal.button}>
          <Button
            type="linear-gradient"
            onPress={() => {
              setIsFotoKtpFailModalVisible(false);
              setKycIdCardClear();
              navigation.pop();
            }}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderFotoKtpUploadFailModal() {
    const onBackPress = () => {
      setIsFotoKtpUploadFailModalVisible(false);
      setKycIdCardClear();
      navigation.pop();
    };
    return (
      <BottomSheet
        isVisible={isFotoKtpUploadFailModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderFotoKtpFailModal.containerImg}>
          <Image
            source={GagalTerkirim}
            resizeMode="contain"
            style={style.renderFotoKtpFailModal.imgSize}
          />
        </View>
        <View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'gagalUploadDokumen')}
          </Text>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'dokumenYangKamu')}
          </Text>
        </View>
        <View style={style.renderFotoKtpFailModal.button}>
          <Button
            type="linear-gradient"
            onPress={() => {
              setIsFotoKtpUploadFailModalVisible(false);
              setKycIdCardClear();
              navigation.pop();
            }}>
            {trans(locale, lang, 'cobaLagiUploadFail')}
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

  function renderKtpNotValidModal() {
    const onBackPress = () => setKtpNotValidModalVisible(false);
    return (
      <BottomSheet
        isVisible={isKtpNotValidModalVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.renderKtpNotValidModal.container}>
          <Image
            source={KTP_tidakcocok}
            style={style.renderKtpNotValidModal.image}
          />
          <Text
            align="center"
            style={style.renderKtpNotValidModal.title}
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}>
            {trans(locale, lang, 'kamiMenemukanKartu')}
          </Text>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={27}
            align="center"
            color={Color.mediumGray.dark.mediumGray}>
            {trans(locale, lang, 'dataKtpKamu')}
          </Text>
          <Button
            style={style.mT20}
            block
            onPress={() => {
              setKtpNotValidModalVisible(false);
            }}>
            {trans(locale, lang, 'cobaLagiKtpNotValid')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <>
      <CameraVision
        baseTitle={trans(locale, lang, 'fotoDiri')}
        buttonTitle={trans(locale, lang, 'ulangi')}
        buttonSecondTitle={trans(locale, lang, 'gunakanFoto')}
        getFromGalery
        cameraFrame="ktp"
        navigation={navigation}
        onCaptured={(data) => {
          setKycIdCard({
            uri: data.uri,
            name: data.filename ?? 'foto-ktp.jpg',
            type: 'image/jpeg',
          });
        }}
      />
      {renderFotoKtpFailModal()}
      {renderFotoKtpUploadFailModal()}
      {renderKtpNotValidModal()}
      {renderSplash()}
    </>
  );
}

export default KycUploadKTPCam;

KycUploadKTPCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setKycIdCard: PropTypes.func.isRequired,
  kycAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setKycIdCardClear: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  setKycIdCardFailed: PropTypes.string.isRequired,
  setKycReFaceCompare: PropTypes.func.isRequired,
  setKycReFaceCompareClear: PropTypes.func.isRequired,
  setKycReFaceCompareFailed: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
};
