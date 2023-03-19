import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, View } from 'react-native';
import { trans } from 'ca-util/trans';
import { NAVIGATION } from 'ca-util/constant';
import CameraVision from 'ca-component-container/CameraVision';
import {
  SET_UPDATA_KK_FAILED,
  SET_UPDATA_KK_SUCCESS,
} from 'ca-module-updata/updataConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import Color from 'ca-config/Color';
import {
  GagalTerkirim,
  KtpBerlaku,
  KtpBingkai,
  KtpBlur,
} from 'ca-config/Image';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

function UpdataKKCam(props) {
  const {
    navigation,
    lang,
    updataAction,
    setUpdataKK,
    setUpdataKKClear,
    setUpdataKKFailed,
    setLoading,
  } = props;

  useDefaultBackHandler(navigation);

  // Modal
  const [isBlurModal, setIsBlurModal] = useState(false);
  const [isImageInvalidModal, setIsImageInvalidModal] = useState(false);

  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCamera(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [showCamera]);

  useEffect(() => {
    setUpdataResult(updataAction);
  }, [updataAction, setUpdataResult]);

  const setUpdataResult = useCallback(
    (act) => {
      if (act === SET_UPDATA_KK_SUCCESS) {
        setLoading(false);
        setUpdataKKClear();
        navigation.replace(NAVIGATION.UPDATA.UpdataReview);
      }
      if (act === SET_UPDATA_KK_FAILED) {
        setLoading(false);
        setUpdataKKClear();
        if (setUpdataKKFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (
            setUpdataKKFailed?.message === 'OCR_NO_RESULT' ||
            setUpdataKKFailed?.message === 'FILE_SIZE_TOO_SMALL'
          ) {
            setIsBlurModal(true);
            return;
          }
          if (
            setUpdataKKFailed?.message === 'FILE_SIZE_TOO_LARGE' ||
            setUpdataKKFailed?.message === 'FILE_EXTENSION_NOT_SUPPORTED'
          ) {
            setIsImageInvalidModal(true);
            return;
          }
          Alert.alert('Error', setUpdataKKFailed?.message);
        }
      }
    },
    [navigation, setLoading, setUpdataKKClear, setUpdataKKFailed?.message]
  );

  function renderBlurModal() {
    const onBackPress = () => {
      setIsBlurModal(false);
      setTimeout(
        () => {
          navigation.pop();
        },
        Size.isAndroid ? 200 : 600
      );
    };
    return (
      <BottomSheet
        isVisible={isBlurModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
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
              {trans(locale, lang, 'pastikanKartuKeluarga')}
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
              {trans(locale, lang, 'pastikanFotoKartuKeluargaBerada')}
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
              {trans(locale, lang, 'pastikanFotoKartuKeluargaTerlihat')}
            </Text>
          </View>
          <Button type="linear-gradient" onPress={onBackPress}>
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
        onClosePress={() => setIsImageInvalidModal(false)}
        onRequestClose={() => setIsImageInvalidModal(false)}>
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

  return (
    <View style={[style.flex1, style.backgroundColorBlack]}>
      {showCamera && (
        <CameraVision
          baseTitle={trans(locale, lang, 'fotoKK')}
          buttonTitle={trans(locale, lang, 'ulangi')}
          buttonSecondTitle={trans(locale, lang, 'gunakanFoto')}
          cameraFrame="kk"
          getFromGalery
          flash={false}
          navigation={navigation}
          onCaptured={(data) => {
            setLoading(true);
            setUpdataKK({
              uri: data.uri,
              name: data.filename ?? 'foto-kk.jpg',
              type: 'image/jpeg',
            });
          }}
        />
      )}

      {renderBlurModal()}
      {renderImageInvalidModal()}
    </View>
  );
}

export default UpdataKKCam;

UpdataKKCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  setUpdataKK: PropTypes.func.isRequired,
  setUpdataKKClear: PropTypes.func.isRequired,
  setUpdataKKFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
};
