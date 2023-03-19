/* eslint-disable max-depth */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { Clock } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import {
  CloudBackground,
  PolisCek,
  PolisDitemukan,
  PolisTidakDitemukan,
} from 'ca-config/Image';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { NAVIGATION } from 'ca-util/constant';
import {
  GET_CHECK_LINK_POLICY_NO_FAILED,
  GET_CHECK_LINK_POLICY_NO_SUCCESS,
  GET_INQUIRY_POLICY_NO_FAILED,
  GET_INQUIRY_POLICY_NO_SUCCESS,
} from 'ca-module-register/registerConstant';
import { CommonActions } from '@react-navigation/native';
import Style from './style';
import locale from './locale';

function RegisterPolis(props) {
  const {
    navigation,
    lang,
    registerAction,
    setLoading,
    userId,
    alreadyKYC,
    setIsShowModalCustomerCare,
    getInquiryPolicyNoResponse,
    getInquiryPolicyNoParam,
    getInquiryPolicyNoFailed,
    getCheckLinkPolicyNoResponse,
    getCheckLinkPolicyNoFailed,
    getInquiryPolicyNo,
    getInquiryPolicyNoClear,
    getCheckLinkPolicyNo,
    getCheckLinkPolicyNoClear,
  } = props;

  const [isPolicyFoundModal, setIsPolicyFoundModal] = useState(false);
  const [isPolicyNotFoundModal, setIsPolicyNotFoundModal] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);

  const [isSubmitCheck, setIsSubmitCheck] = useState(false);

  const [idInput, setIdInput] = useState(null);
  const [sertifikatInput, setSertifikatInput] = useState('');

  const [idInputMessage, setIdInputMessage] = useState(null);
  const [sertifikatInputMessage, setSertifkatInputMessage] = useState(null);

  const [isShowSertifikatField, setIsShowSertifikatField] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      getInquiryPolicyNoClear();
      getCheckLinkPolicyNoClear();
    });
    return unsubscribe;
  }, [getCheckLinkPolicyNoClear, getInquiryPolicyNoClear, navigation]);

  useEffect(() => {
    getBothResult(registerAction);
  }, [getBothResult, registerAction]);

  const getBothResult = useCallback(
    (act) => {
      if (act === GET_INQUIRY_POLICY_NO_SUCCESS) {
        setLoading(false);
        setIsSubmitCheck(false);
        const res = getInquiryPolicyNoResponse?.data;
        checkIdFoundResult(res);
      }
      if (act === GET_INQUIRY_POLICY_NO_FAILED) {
        setLoading(false);
        setIsSubmitCheck(false);
        if (getInquiryPolicyNoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', getInquiryPolicyNoFailed?.message);
        }
      }
      if (act === GET_CHECK_LINK_POLICY_NO_SUCCESS) {
        setLoading(false);
        setIsSubmitCheck(false);
        setIsPolicyFoundModal(true);
      }
      if (act === GET_CHECK_LINK_POLICY_NO_FAILED) {
        setLoading(false);
        setIsSubmitCheck(false);
        if (getCheckLinkPolicyNoFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Error', getCheckLinkPolicyNoFailed?.message);
        }
      }
    },
    [
      checkIdFoundResult,
      getCheckLinkPolicyNoFailed?.message,
      getInquiryPolicyNoFailed?.message,
      getInquiryPolicyNoResponse?.data,
      setLoading,
    ]
  );

  const checkIdFoundResult = useCallback(
    (res) => {
      // ID === Nomor Polis
      if (res?.isPolicyNo) {
        if (res?.exists) {
          if (res?.type === 'R') {
            if (userId !== '' && alreadyKYC) {
              setLoading(true);
              getCheckLinkPolicyNo({
                id: getInquiryPolicyNoParam?.id,
                certificateNo: '',
              });
            } else {
              setIsPolicyFoundModal(true);
            }
          }
          if (res?.type === 'C') {
            if (getInquiryPolicyNoParam?.certificateNo !== '') {
              if (userId !== '' && alreadyKYC) {
                setLoading(true);
                getCheckLinkPolicyNo({
                  id: getInquiryPolicyNoParam?.id,
                  certificateNo: getInquiryPolicyNoParam?.certificateNo,
                });
              } else {
                setIsPolicyFoundModal(true);
              }
            } else {
              setIsShowSertifikatField(true);
            }
          }
        } else {
          setIsPolicyNotFoundModal(true);
        }
      }
      // ID === KTP
      if (!res?.isPolicyNo) {
        if (res?.exists) {
          if (userId !== '' && alreadyKYC) {
            setLoading(true);
            getCheckLinkPolicyNo({
              id: getInquiryPolicyNoParam?.id,
              certificateNo: '',
            });
          } else {
            setIsPolicyFoundModal(true);
          }
        } else {
          setIsPolicyNotFoundModal(true);
        }
      }
    },
    [
      alreadyKYC,
      getCheckLinkPolicyNo,
      getInquiryPolicyNoParam?.certificateNo,
      getInquiryPolicyNoParam?.id,
      setLoading,
      userId,
    ]
  );

  const onLoginPress = () => {
    navigation.navigate(NAVIGATION.LOGIN.LoginMain, {
      id: getInquiryPolicyNoParam?.id,
      type: 'R',
    });
  };

  const validateIdInput = useCallback(
    (text) => {
      if (text === null) {
        return;
      }
      if (!text) {
        setIdInputMessage({ error: trans(locale, lang, 'idInputRequired') });
        return;
      }
      const regexIdInput = /[^a-zA-Z0-9\\/-]/;
      if (regexIdInput.test(text)) {
        setIdInputMessage({ error: trans(locale, lang, 'idInputInvalid') });
        return;
      }
      setIdInputMessage(null);
    },
    [lang]
  );

  const validateSertifikatInput = useCallback(
    (text) => {
      if (text === null) {
        return;
      }
      if (!text) {
        setSertifkatInputMessage({
          error: trans(locale, lang, 'sertifikatInputRequired'),
        });
        return;
      }
      const regexSertifikatInput = /[^a-zA-Z0-9\s,./\-+_]/;
      if (regexSertifikatInput.test(text)) {
        setSertifkatInputMessage({
          error: trans(locale, lang, 'sertifikatInputInvalid'),
        });
        return;
      }
      setSertifkatInputMessage(null);
    },
    [lang]
  );

  function renderImageContainer() {
    return (
      <View style={[Style.placeCenter, Style.mb8]}>
        <Image source={PolisCek} style={Style.imageContainer.image} />
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View style={Style.mb8}>
        <View>
          <Input
            value={idInput}
            disabled={isShowSertifikatField}
            label={trans(locale, lang, 'nomorPolisKTP')}
            placeholder={trans(locale, lang, 'masukkanNomorPolis')}
            onChangeText={(text) => {
              setIdInput(text);
              validateIdInput(text);
            }}
            height={56}
            message={idInputMessage}
          />
        </View>
        {isShowSertifikatField ? (
          <View style={Style.mt16}>
            <Input
              value={sertifikatInput}
              label={trans(locale, lang, 'nomorSertifikat')}
              placeholder={trans(locale, lang, 'masukkanNomorSertifikat')}
              onChangeText={(text) => {
                setSertifikatInput(text);
                validateSertifikatInput(text);
              }}
              height={56}
              message={sertifikatInputMessage}
            />
          </View>
        ) : null}
      </View>
    );
  }

  function renderAlertContainer() {
    return (
      <View>
        <AlertDialogue
          title={trans(locale, lang, 'pastikanPolisSudah')}
          type="warning"
          leftIcon
        />
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <ImageBackground
        source={CloudBackground}
        style={[Style.footer.container]}>
        <View style={Style.footer.text}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={25.2}
            color={Color.neutral.light.neutral20}>
            {trans(locale, lang, 'butuhBantuanHubungi')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsShowModalCustomerCare(true);
            }}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={25.2}
              color={Color.primary.light.primary90}
              textDecorationLine="underline">
              {trans(locale, lang, 'customerCare')}
            </Text>
          </TouchableOpacity>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={25.2}
            color={Color.neutral.light.neutral20}>
            {trans(locale, lang, 'kami')}
          </Text>
        </View>
        <Button
          disabled={
            !idInput ||
            idInputMessage !== null ||
            (isShowSertifikatField && !sertifikatInput) ||
            isSubmitCheck
          }
          onPress={() => {
            setIsSubmitCheck(true);
            setLoading(true);
            getInquiryPolicyNo({
              id: idInput,
              certificateNo: sertifikatInput,
            });
          }}>
          {trans(locale, lang, 'cekNomorPolis')}
        </Button>
      </ImageBackground>
    );
  }

  function renderPolicyFoundModal() {
    const isPolicyNo = getInquiryPolicyNoResponse?.data?.isPolicyNo;
    const total = getInquiryPolicyNoResponse?.data?.total;
    const subtitleProps = {
      textStyle: 'medium',
      size: Size.text.body2.size,
      line: 20,
      align: 'center',
      color: Color.mediumGray.light.mediumGray,
      style: Style.policyFoundModal.subtitle,
    };
    const button1Props = {
      outline: true,
      style: Style.policyFoundModal.button1,
      onPress: () => setIsPolicyFoundModal(false),
    };
    let title = (
      <Text
        textStyle="bold"
        size={Size.text.h6.size}
        line={27}
        letterSpacing={0.5}
        align="center"
        style={Style.policyFoundModal.title}>
        {trans(locale, lang, 'polisBerhasilDitemukan')}
      </Text>
    );
    let image = (
      <Image
        source={PolisDitemukan}
        style={Style.policyFoundModal.image}
        resizeMode="contain"
      />
    );
    let subtitle;
    let buttons;

    // Belum Login
    if (userId === '') {
      subtitle = isPolicyNo ? (
        <Text {...subtitleProps}>
          {trans(locale, lang, 'nomorPolis')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {getInquiryPolicyNoParam?.id}
          </Text>
          {trans(locale, lang, 'ditemukan')}
          {'. '}
          {trans(locale, lang, 'silahkanLogin')}
        </Text>
      ) : (
        <Text {...subtitleProps}>
          {trans(locale, lang, total > 1 ? 'terdapat1' : 'terdapat')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {total}
          </Text>
          {trans(
            locale,
            lang,
            total > 1 ? 'polisDitemukan1' : 'polisDitemukan'
          )}
          {trans(locale, lang, 'menggunakanNomorKTPLogin')}
        </Text>
      );
      buttons = (
        <View>
          <Button {...button1Props}>{trans(locale, lang, 'kembali')}</Button>
          <Button
            onPress={() => {
              setIsPolicyFoundModal(false);
              setTimeout(
                () => {
                  onLoginPress();
                },
                Size.isAndroid ? 200 : 600
              );
            }}>
            {trans(locale, lang, 'loginRegister')}
          </Button>
        </View>
      );
    }
    // Belum KYC
    if (userId !== '' && !alreadyKYC) {
      subtitle = isPolicyNo ? (
        <Text {...subtitleProps}>
          {trans(locale, lang, 'nomorPolis')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {getInquiryPolicyNoParam?.id}
          </Text>
          {trans(locale, lang, 'ditemukan')}
          {'. '}
          {trans(locale, lang, 'silahkanVerifikasi')}
        </Text>
      ) : (
        <Text {...subtitleProps}>
          {trans(locale, lang, total > 1 ? 'terdapat1' : 'terdapat')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {total}
          </Text>
          {trans(
            locale,
            lang,
            total > 1 ? 'polisDitemukan1' : 'polisDitemukan'
          )}
          {trans(locale, lang, 'menggunakanNomorKTPVerifikasi')}
        </Text>
      );
      buttons = (
        <View>
          <Button {...button1Props}>{trans(locale, lang, 'kembali')}</Button>
          <Button
            onPress={() => {
              setIsPolicyFoundModal(false);
              setTimeout(
                () => {
                  navigation.navigate(NAVIGATION.KYC.KycMain);
                },
                Size.isAndroid ? 200 : 600
              );
            }}>
            {trans(locale, lang, 'verifikasiDiri')}
          </Button>
        </View>
      );
    }
    // Polis tidak sesuai
    if (
      userId !== '' &&
      alreadyKYC &&
      !getCheckLinkPolicyNoResponse?.data?.exists
    ) {
      title = (
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center"
          style={Style.policyFoundModal.title}>
          {trans(locale, lang, 'polisTidakSesuai')}
        </Text>
      );
      image = (
        <Image
          source={PolisTidakDitemukan}
          style={Style.policyFoundModal.image}
          resizeMode="contain"
        />
      );
      subtitle = isPolicyNo ? (
        <Text {...subtitleProps}>
          {trans(locale, lang, 'nomorPolis')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {getInquiryPolicyNoParam?.id}
          </Text>
          {trans(locale, lang, 'ditemukan')}{' '}
          {trans(locale, lang, 'danTidakSesuaiDengan')}
        </Text>
      ) : (
        <Text {...subtitleProps}>
          {trans(locale, lang, total > 1 ? 'terdapat1' : 'terdapat')}
          <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
            {total}
          </Text>
          {trans(
            locale,
            lang,
            total > 1 ? 'polisDitemukan1' : 'polisDitemukan'
          )}
          {trans(locale, lang, 'danTidakSesuaiDenganKTP')}
        </Text>
      );
      buttons = (
        <View>
          <Button {...button1Props}>{trans(locale, lang, 'kembali')}</Button>
          <Button
            onPress={() => {
              setIsPolicyFoundModal(false);
              setTimeout(
                () => {
                  setIsShowModalCustomerCare(true);
                },
                Size.isAndroid ? 200 : 600
              );
            }}>
            {trans(locale, lang, 'hubungiCustomerCare')}
          </Button>
        </View>
      );
    }
    // Polis sudah terdaftar
    if (
      userId !== '' &&
      alreadyKYC &&
      getCheckLinkPolicyNoResponse?.data?.exists
    ) {
      title = (
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center"
          style={Style.policyFoundModal.title}>
          {trans(locale, lang, 'polisSudahTerdaftar')}
        </Text>
      );
      subtitle = isPolicyNo ? (
        <Text {...subtitleProps}>
          {trans(locale, lang, 'polisTelahTerhubung')}
        </Text>
      ) : (
        <Text {...subtitleProps}>{trans(locale, lang, 'semuaPolisTelah')}</Text>
      );
      buttons = (
        <View>
          <Button {...button1Props}>{trans(locale, lang, 'cobaLagi')}</Button>
          <Button
            onPress={() => {
              setIsPolicyFoundModal(false);
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: 'TabMain' }],
                })
              );
              setTimeout(() => {
                navigation.navigate(NAVIGATION.POLICY.PolisMain);
              }, 200);
            }}>
            {trans(locale, lang, 'pergiKeHalamanPolis')}
          </Button>
        </View>
      );
    }

    return (
      <BottomSheet
        isVisible={isPolicyFoundModal}
        swipeable={false}
        onClosePress={button1Props.onPress}
        onRequestClose={button1Props.onPress}>
        <View style={Style.policyFoundModal.container}>
          {image}
          {title}
          {subtitle}
        </View>
        {buttons}
      </BottomSheet>
    );
  }

  function renderPolicyNotFoundModal() {
    const isPolicyNo = getInquiryPolicyNoResponse?.data?.isPolicyNo;
    const subtitleProps = {
      textStyle: 'medium',
      size: Size.text.body2.size,
      line: 20,
      align: 'center',
      color: Color.mediumGray.light.mediumGray,
      style: Style.policyNotFoundModal.subtitle,
    };
    const button1Props = {
      outline: true,
      style: Style.policyNotFoundModal.button1,
      onPress: () => setIsPolicyNotFoundModal(false),
    };
    const onButtonPress = () => setIsPolicyNotFoundModal(false);
    return (
      <BottomSheet
        isVisible={isPolicyNotFoundModal}
        swipeable={false}
        onClosePress={onButtonPress}
        onRequestClose={onButtonPress}>
        <View style={Style.policyNotFoundModal.container}>
          <Image
            source={PolisTidakDitemukan}
            style={Style.policyNotFoundModal.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={Style.policyNotFoundModal.title}>
            {trans(locale, lang, 'polisTidakDitemukan')}
          </Text>
          {isPolicyNo ? (
            <Text {...subtitleProps}>
              {trans(locale, lang, 'nomorPolis')}
              <Text textStyle="semi" color={Color.mediumGray.light.mediumGray}>
                {getInquiryPolicyNoParam?.id}
              </Text>
              {trans(locale, lang, 'tidakDitemukan')}
              {trans(locale, lang, 'silakanCobaKembali')}
            </Text>
          ) : (
            <Text {...subtitleProps}>
              {trans(locale, lang, 'polisTidakDitemukanPadaKTP')}
            </Text>
          )}
        </View>
        <View>
          <Button {...button1Props}>{trans(locale, lang, 'kembali')}</Button>
          <Button
            onPress={() => {
              setIsPolicyNotFoundModal(false);
              setTimeout(
                () => {
                  setIsShowModalCustomerCare(true);
                },
                Size.isAndroid ? 200 : 600
              );
            }}>
            {trans(locale, lang, 'hubungiCustomerCare')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderTooFrequentlyModal() {
    return (
      <BottomSheet
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onRequestClose={() => setIsTooFrequentlyModal(false)}>
        <View style={Style.tooFrequentlyModal.container}>
          <Clock
            width={125}
            height={125}
            style={Style.tooFrequentlyModal.icon}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.tooFrequentlyModal.text1}>
            {trans(locale, lang, 'terlaluSeringMeminta')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.tooFrequentlyModal.text2}>
            {trans(locale, lang, 'andaTelahMeminta')}
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
            }}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      bordered
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'cekPolisKamu')}>
      <Padder>
        <View>
          {renderImageContainer()}
          {renderInputCard()}
          {renderAlertContainer()}
        </View>
        {renderPolicyFoundModal()}
        {renderPolicyNotFoundModal()}
        {renderTooFrequentlyModal()}
      </Padder>
      {renderFooterContainer()}
    </Base>
  );
}

export default RegisterPolis;

RegisterPolis.propTypes = {
  lang: PropTypes.string.isRequired,
  registerAction: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  getInquiryPolicyNoResponse: PropTypes.objectOf(Object).isRequired,
  getInquiryPolicyNoParam: PropTypes.objectOf(Object).isRequired,
  getInquiryPolicyNoFailed: PropTypes.objectOf(Object).isRequired,
  getCheckLinkPolicyNoResponse: PropTypes.objectOf(Object).isRequired,
  getCheckLinkPolicyNoFailed: PropTypes.objectOf(Object).isRequired,
  getInquiryPolicyNo: PropTypes.func.isRequired,
  getInquiryPolicyNoClear: PropTypes.func.isRequired,
  getCheckLinkPolicyNo: PropTypes.func.isRequired,
  getCheckLinkPolicyNoClear: PropTypes.func.isRequired,
};
