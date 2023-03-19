import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import {
  UpdataStep4Inactive,
  RedTick,
  UpdataStep1Active,
  UpdataStep3Inactive,
  UpdataStep2Inactive,
  Headset2,
} from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import { VerpicBenar, VerpicSalah } from 'ca-config/Image';
import {
  GET_UPDATA_DETAIL_EKYC_FAILED,
  GET_UPDATA_DETAIL_EKYC_SUCCESS,
} from 'ca-module-updata/updataConstant';
import _ from 'lodash';
import Base from 'ca-component-container/Base';
import { useDefaultBackHandler } from 'ca-util/common';
import style from './style';
import locale from './locale';

function UpdataSelf(props) {
  const {
    navigation,
    lang,
    updataAction,
    setLoading,
    getUpdataDetailEKycResponse,
    getUpdataDetailEKycFailed,
    getUpdataDetailEKyc,
    getUpdataDetailEKycClear,
    setIsKTPSame,
    getUpdataValidationCheckResponse,
  } = props;

  useDefaultBackHandler(navigation);

  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;

  const [isSubmit, setIsSubmit] = useState(null);

  const [isDark, setIsDark] = useState(false);

  const isExecuted = useRef(false);
  useEffect(() => {
    if (!isExecuted.current) {
      setLoading(true);
      setIsSubmit(true);
      getUpdataDetailEKyc();
      isExecuted.current = true;
    }
  }, [getUpdataDetailEKyc, setLoading]);

  useEffect(() => {
    getUpdataDetailEKycResult(updataAction);
  }, [getUpdataDetailEKycResult, updataAction]);

  const getUpdataDetailEKycResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_DETAIL_EKYC_SUCCESS) {
        const res = getUpdataDetailEKycResponse?.data;
        const validationCheckRes = getUpdataValidationCheckResponse?.data;

        setLoading(false);
        setIsSubmit(false);
        setIsKTPSame(true);

        if (res?.isTodayLivenessTest) {
          if (validationCheckRes?.isValid === true) {
            navigation.replace(NAVIGATION.UPDATA.UpdataInformation);
          } else {
            navigation.replace(NAVIGATION.UPDATA.UpdataKK);
          }
        }
      }
      if (act === GET_UPDATA_DETAIL_EKYC_FAILED) {
        setLoading(false);
        setIsSubmit(false);
        const message = getUpdataDetailEKycFailed?.message;
        if (getUpdataDetailEKycFailed && message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', getUpdataDetailEKycFailed?.message);
        }
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      getUpdataDetailEKycFailed,
      getUpdataDetailEKycResponse?.data,
      getUpdataValidationCheckResponse?.data,
      navigation,
      setIsKTPSame,
      setLoading,
    ]
  );

  function renderStepsContainer() {
    return (
      <View style={style.steps.container}>
        <View style={style.steps.step.container}>
          <UpdataStep1Active />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep2Inactive />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep3Inactive />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep4Inactive />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.primary.light.primary90}>
          {trans(locale, lang, 'verifikasiDiri')}
        </Text>
      </View>
    );
  }

  function renderImageContainer() {
    return (
      <View style={style.image.container}>
        <View>
          <Image
            source={VerpicBenar}
            style={style.image.image}
            resizeMode="contain"
          />
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={19.6}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'benar')}
          </Text>
        </View>
        <View>
          <Image
            source={VerpicSalah}
            style={style.image.image}
            resizeMode="contain"
          />
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={19.6}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'salah')}
          </Text>
        </View>
      </View>
    );
  }

  function renderContentContainer() {
    return (
      <View>
        <Text
          ellipsizeMode="clip"
          numberOfLines={1}
          color={Color.grayE0E0E0.light.grayE0E0E0}
          style={style.mb24}>
          {trans(locale, lang, 'dash')}
        </Text>
        <View style={style.mb16}>
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            line={22.4}
            align="center">
            {trans(locale, lang, 'uploadYourSelfie')}
          </Text>
        </View>
        <View style={style.content.container}>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'janganGunakanKacamata')}
            </Text>
          </View>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanWajahTerlihat')}
            </Text>
          </View>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanFotoTidak')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={style.mb48}>
        <Button
          type="linear-gradient"
          onPress={() => {
            navigation.navigate(NAVIGATION.UPDATA.UpdataSelfCam);
          }}>
          {trans(locale, lang, 'uploadYourSelfie')}
        </Button>
      </Padder>
    );
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2
          fill={isDark ? Color.main.light.black : Color.main.light.white}
        />
      </TouchableOpacity>
    );
  }

  if (
    _.isEmpty(getUpdataDetailEKycResponse) &&
    (isSubmit === null || isSubmit === true)
  ) {
    return null;
  }

  if (_.isEmpty(getUpdataDetailEKycResponse) && isSubmit === false) {
    return (
      <Base>
        <View style={style.cobaLagiContainer}>
          <TouchableOpacity
            disabled={isSubmit}
            onPress={() => {
              setLoading(true);
              setIsSubmit(true);
              getUpdataDetailEKyc();
            }}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {trans(locale, lang, 'cobaLagi')}
            </Text>
          </TouchableOpacity>
        </View>
      </Base>
    );
  }

  if (getUpdataDetailEKycResponse?.data?.isTodayLivenessTest) {
    return null;
  }

  return (
    <Base15
      isScroll
      animated
      rightHeaderContent={renderRightHeaderContent()}
      title={trans(locale, lang, 'pengkinianData')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      onBackPress={() => {
        if (navigation.canGoBack()) {
          navigation.pop();
        } else {
          navigation.replace(NAVIGATION.TABMAIN.TabMain);
        }
        getUpdataDetailEKycClear();
      }}
      onChangeHeaderToDark={(value) => {
        setIsDark(value);
      }}
      renderBottom={renderFooterContainer()}>
      <Padder style={style.container}>
        {renderStepsContainer()}
        {renderImageContainer()}
        {renderContentContainer()}
      </Padder>
    </Base15>
  );
}

export default UpdataSelf;

UpdataSelf.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  updataAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getUpdataDetailEKycResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataDetailEKycFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataDetailEKyc: PropTypes.func.isRequired,
  getUpdataDetailEKycClear: PropTypes.func.isRequired,
  setIsKTPSame: PropTypes.func.isRequired,
  getUpdataValidationCheckResponse: PropTypes.objectOf(Object).isRequired,
};
