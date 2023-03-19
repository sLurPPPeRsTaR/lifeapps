import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, View } from 'react-native';
import { trans } from 'ca-util/trans';
import CameraVision from 'ca-component-container/CameraVision';
import {
  SET_UPDATA_FACECOMPARE_FAILED,
  SET_UPDATA_FACECOMPARE_SUCCESS,
  SET_UPDATA_KTP_FAILED,
  SET_UPDATA_KTP_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import {
  GagalTerkirim,
  KTPMukatidakcocok,
  KtpBerlaku,
  KtpBingkai,
  KtpBlur,
} from 'ca-config/Image';
import locale from './locale';
import style from './style';

function UpdataKTPCam(props) {
  const {
    navigation,
    lang,
    updataAction,
    setUpdataKTP,
    setUpdataKTPClear,
    setUpdataKTPFailed,
    setLoading,
    setUpdataFaceCompare,
    setUpdataFaceCompareFailed,
    setUserData,
  } = props;

  // Modal
  const [isBlurModal, setIsBlurModal] = useState(false);
  const [isImageInvalidModal, setIsImageInvalidModal] = useState(false);
  const [isCompareFailModalVisible, setCompareFailModalVisible] =
    useState(false);

  useEffect(() => {
    setUpdataResult(updataAction);
  }, [updataAction, setUpdataResult]);

  const setUpdataResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_KTP_SUCCESS) {
        setLoading(false);
        setUpdataFaceCompare();
      }
      if (act === SET_UPDATA_KTP_FAILED) {
        setLoading(false);
        setUpdataKTPClear();
        if (setUpdataKTPFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (
            setUpdataKTPFailed?.message === 'OCR_NO_RESULT' ||
            setUpdataKTPFailed?.message === 'FILE_SIZE_TOO_SMALL'
          ) {
            setIsBlurModal(true);
            return;
          }
          if (
            setUpdataKTPFailed?.message === 'FILE_SIZE_TOO_LARGE' ||
            setUpdataKTPFailed?.message === 'FILE_EXTENSION_NOT_SUPPORTED'
          ) {
            setIsImageInvalidModal(true);
            return;
          }
          Alert.alert('Error', setUpdataKTPFailed?.message);
        }
      }
      // FACE COMPARE
      if (act === SET_UPDATA_FACECOMPARE_SUCCESS) {
        setUpdataKTPClear();
        navigation.replace(NAVIGATION.UPDATA.UpdataKK);
      }
      if (act === SET_UPDATA_FACECOMPARE_FAILED) {
        setLoading(false);
        if (setUpdataFaceCompareFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          setCompareFailModalVisible(true);
        }
      }
    },
    [
      navigation,
      setLoading,
      setUpdataFaceCompare,
      setUpdataFaceCompareFailed?.message,
      setUpdataKTPClear,
      setUpdataKTPFailed?.message,
    ]
  );

  function renderBlurModal() {
    return (
      <BottomSheet isVisible={isBlurModal} swipeable={false}>
        <View style={style.modal.blur.container}>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={22}
            letterSpacing={0.5}
            style={style.modal.blur.title}>
            {trans(locale, lang, 'fotoKamuBelum')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.blur.subtitle}>
            {trans(locale, lang, 'ikutiPanduanDibawah')}
          </Text>
          <View style={style.modal.blur.card.container}>
            <Image source={KtpBerlaku} style={style.modal.blur.card.icon} />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'gunakanKtpYang')}
            </Text>
          </View>
          <View style={style.modal.blur.card.container}>
            <Image source={KtpBingkai} style={style.modal.blur.card.icon} />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanKTPBerada')}
            </Text>
          </View>
          <View style={style.modal.blur.card.container}>
            <Image source={KtpBlur} style={style.modal.blur.card.icon} />
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanFotoKTP')}
            </Text>
          </View>
          <Button
            type="linear-gradient"
            onPress={() => {
              setIsBlurModal(false);
              setTimeout(
                () => {
                  navigation.pop();
                },
                Size.isAndroid ? 200 : 600
              );
            }}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderImageInvalidModal() {
    return (
      <BottomSheet
        isVisible={isImageInvalidModal}
        swipeable={false}
        onClosePress={setIsImageInvalidModal(false)}
        onRequestClose={setIsImageInvalidModal(false)}>
        <View>
          <View style={style.modal.imageInvalid.image}>
            <Image
              source={GagalTerkirim}
              resizeMode="contain"
              style={style.modal.imageInvalid.imageSize}
            />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.imageInvalid.title}>
            {trans(locale, lang, 'gagalUploadDokumen')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            align="center"
            style={style.modal.imageInvalid.subtitle}>
            {trans(locale, lang, 'dokumenYangKamu')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => setIsImageInvalidModal(false)}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </BottomSheet>
    );
  }

  function renderCompareFailModal() {
    const onBackPress = () => {
      setCompareFailModalVisible(false);
      setUserData({
        userData: {
          alreadyLivenessTest: false,
        },
      });
      navigation.replace(NAVIGATION.UPDATA.UpdataSelf);
    };
    return (
      <BottomSheet
        isVisible={isCompareFailModalVisible}
        swipeable={false}
        onBackPress={onBackPress}
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
          <Button style={style.mT20} block onPress={onBackPress}>
            {trans(locale, lang, 'cobaLagiCompareFail')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <View style={style.flex1}>
      <CameraVision
        baseTitle={trans(locale, lang, 'fotoKTP')}
        buttonTitle={trans(locale, lang, 'ulangi')}
        buttonSecondTitle={trans(locale, lang, 'gunakanFoto')}
        cameraFrame="ktp"
        getFromGalery
        flash={false}
        navigation={navigation}
        onCaptured={(data) => {
          setLoading(true);
          setUpdataKTP({
            uri: data.uri,
            name: data.filename ?? 'foto-ktp.jpg',
            type: 'image/jpeg',
          });
        }}
      />
      {renderBlurModal()}
      {renderImageInvalidModal()}
      {renderCompareFailModal()}
    </View>
  );
}

export default UpdataKTPCam;

UpdataKTPCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  setUpdataKTP: PropTypes.func.isRequired,
  setUpdataKTPClear: PropTypes.func.isRequired,
  setUpdataKTPFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setUpdataFaceCompare: PropTypes.func.isRequired,
  setUpdataFaceCompareFailed: PropTypes.objectOf(Object).isRequired,
  setUserData: PropTypes.func.isRequired,
};
