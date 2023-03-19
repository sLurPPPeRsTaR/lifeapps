import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import { Alert, Image, View } from 'react-native';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { KKPMBanner } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Button from 'ca-component-generic/Button';
import Shadow from 'ca-component-container/Shadow';
import { ChevronRight } from 'ca-config/Svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import {
  GET_UPDATA_VALIDATION_CHECK_FAILED,
  GET_UPDATA_VALIDATION_CHECK_SUCCESS,
} from 'ca-module-updata/updataConstant';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import style from './style';

function UpdataMain(props) {
  const {
    navigation,
    lang,
    colorScheme,
    width,
    setIsShowModalCustomerCare,
    updataAction,
    getUpdataValidationCheckResponse,
    getUpdataValidationCheckFailed,
    getUpdataValidationCheck,
    setLoading,
    route: { params },
  } = props;

  useDefaultBackHandler(navigation);

  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;

  const getValidationCheck = useCallback(() => {
    const { category, certificateNo, policyNo, source } = params;
    setLoading(true);
    getUpdataValidationCheck({ category, certificateNo, policyNo, source });
  }, [getUpdataValidationCheck, params, setLoading]);

  useEffect(() => {
    getValidationCheck();
  }, [getValidationCheck]);

  useEffect(() => {
    updataResult(updataAction);
  }, [updataAction, updataResult]);

  const updataResult = useCallback(
    (act) => {
      if (act === GET_UPDATA_VALIDATION_CHECK_SUCCESS) {
        setLoading(false);
        navigation.replace(NAVIGATION.UPDATA.UpdataSelf);
      }
      if (act === GET_UPDATA_VALIDATION_CHECK_FAILED) {
        setLoading(false);
        const message = getUpdataValidationCheckFailed?.message;
        if (message !== INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
        }
        navigation.pop();
      }
    },
    [
      INTERNAL_SERVER_ERROR,
      getUpdataValidationCheckFailed?.message,
      navigation,
      setLoading,
    ]
  );

  function renderKKPMBanner() {
    const imageSize = { width: 343, height: 160 };
    const adjustedImageSize = {
      width: width - 32,
      height: ((width - 32) * imageSize.height) / imageSize.width,
    };
    return (
      <View style={style.kkpmBanner.container}>
        <Image
          source={KKPMBanner}
          style={[adjustedImageSize, style.kkpmBanner.image]}
          resizeMode="cover"
        />
        <View style={style.kkpmBanner.text.container}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            color={Color.main.light.white}>
            {trans(locale, lang, 'konfirmasiKeabsahan')}
          </Text>
          <Text
            textStyle="bold"
            size={Size.text.h5.size - 2}
            color={Color.main.light.white}>
            {trans(locale, lang, 'penerimaManfaat')}
          </Text>
        </View>
      </View>
    );
  }

  function renderDescContainer() {
    return (
      <View style={style.descContainer}>
        <Text textStyle="medium" size={Size.text.body2.size} line={21}>
          {trans(locale, lang, 'loremIpsum')}
        </Text>
      </View>
    );
  }

  function renderAlertDialogueContainer() {
    return (
      <View style={style.alertDialogueContainer}>
        <AlertDialogue
          leftIcon
          type="warning"
          title={trans(locale, lang, 'loremIpsum')}
        />
      </View>
    );
  }

  function renderNextButtonContainer() {
    const validationCheckRes = getUpdataValidationCheckResponse?.data;
    const onNextButtonPress = () => {
      if (validationCheckRes?.isValid !== undefined) {
        navigation.navigate(NAVIGATION.UPDATA.UpdataSelf);
      } else {
        getValidationCheck();
      }
    };
    return (
      <View style={style.buttonContainer}>
        <Button onPress={onNextButtonPress}>
          {trans(locale, lang, 'berikutnya')}
        </Button>
      </View>
    );
  }

  function renderFooterContainer() {
    const onSyaratDanKetentuanPress = () => {
      navigation.navigate(NAVIGATION.UPDATA.UpdataTermsConditions);
    };
    const onCustomerCarePress = () => {
      setIsShowModalCustomerCare(true);
    };
    return (
      <View>
        <TouchableOpacity
          style={style.mb24}
          onPress={onSyaratDanKetentuanPress}>
          <Shadow borderRadius={12}>
            <View style={style.footer.syaratDanKetentuan}>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {trans(locale, lang, 'syaratDanKetentuan')}
              </Text>
              <ChevronRight />
            </View>
          </Shadow>
        </TouchableOpacity>
        <View style={style.footer.customerCare}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            line={18}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'butuhBantuan')}
            {'\n'}
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              textDecorationLine="underline"
              color={Color.primary.light.primary90}
              align="center"
              onPress={onCustomerCarePress}>
              {trans(locale, lang, 'customerCare')}
            </Text>
          </Text>
        </View>
        <View>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={20}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'ptAsuransiJiwa')}
          </Text>
        </View>
      </View>
    );
  }

  return null;

  // return (
  //   <Base15
  //     backgroundColor={Color.greyBackround[colorScheme].greyBackground}
  //     isScroll
  //     animated
  //     title={trans(locale, lang, 'pengkinianData')}
  //     onBackPress={() => navigation.pop()}>
  //     <View style={style.baseContainer}>
  //       <Padder style={style.container}>
  //         {renderKKPMBanner()}
  //         {renderDescContainer()}
  //         {renderAlertDialogueContainer()}
  //         {renderNextButtonContainer()}
  //         {renderFooterContainer()}
  //       </Padder>
  //     </View>
  //   </Base15>
  // );
}

export default UpdataMain;

UpdataMain.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  updataAction: PropTypes.string.isRequired,
  getUpdataValidationCheckResponse: PropTypes.objectOf(Object).isRequired,
  getUpdataValidationCheckFailed: PropTypes.objectOf(Object).isRequired,
  getUpdataValidationCheck: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
