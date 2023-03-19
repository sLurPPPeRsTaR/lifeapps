import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import { NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import {
  GET_POLICY_FAILED,
  GET_POLICY_SUCCESS,
} from 'ca-module-home/homeConstant';
import {
  CloudBackground,
  EmailIlang,
  SertifikatCek,
  SertifikatIlang,
} from 'ca-config/Image';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { ArrowRight2, Handphone, Message } from 'ca-config/Svg';
import Style from './style';
import locale from './locale';

function RegisterSertifikat(props) {
  const {
    navigation,
    lang,
    homeAction,
    getPolicyParam,
    getPolicy,
    getPolicyClear,
    route: { params },
    getPolicyResponse,
    getPolicyError,
    setResendPolicyOtp,
    setLoading,
    setIsShowModalCustomerCare,
  } = props;

  const inputRef = useRef(null);

  const [sertifikat, setSertifikat] = useState('');
  const [otpOpt, setOtpOpt] = useState();
  const [isCompleteListModalHide, setIsCompleteListModalHide] = useState(false);
  const [isOtpOptModalVisible, setOtpOptModalVisible] = useState(false);
  const [isPUModalVisible, setPUModalVisible] = useState(false);
  const [isNFModalVisible, setNFModalVisible] = useState(false);
  const [notFoundPIC, setNotFoundPIC] = useState('');
  const [failMsg, setFailMsg] = useState('sertifikatTidakDitemukanSilahkan');
  const [failTitle, setFailTitle] = useState('sertifikatTidakDitemukan');
  const [isCertifFound, setIsCertifFound] = useState(false);
  const [isSubmitCheck, setIsSubmitCheck] = useState(false);
  const [isSubmitRequestOtp, setIsSubmitRequestOtp] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      getPolicyClear();
      setIsCertifFound(false);
    });
    return unsubscribe;
  }, [getPolicyClear, navigation]);

  useEffect(() => {
    if (!setResendPolicyOtp) {
      getPolicyResult(homeAction);
    }
  }, [getPolicyResult, homeAction, setResendPolicyOtp]);

  const getPolicyResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SUCCESS && getPolicyParam?.certificateNo !== '') {
        setLoading(false);
        if (getPolicyResponse?.data.exists) {
          if (getPolicyParam?.requestOtp === false) {
            setIsCertifFound(true);
          } else {
            navigation.navigate(NAVIGATION.REGISTER.RegisterPolisOtp, {
              otpSendTo: otpOpt,
              id: params?.id,
              certificateNo: sertifikat,
            });
          }
        } else {
          setIsCertifFound(false);
          setPUModalVisible(true);
          setFailTitle('sertifikatTidakDitemukan');
          setFailMsg('sertifikatTidakDitemukanSilahkan');
        }
      }
      if (act === GET_POLICY_FAILED && getPolicyParam?.certificateNo !== '') {
        setLoading(false);
        setIsCertifFound(false);
        if (getPolicyError?.message?.match('TOO_FREQUENTLY_')) {
          setFailTitle('TOO_FREQUENTLY_TITLE');
          setFailMsg('TOO_FREQUENTLY_MESSAGE');
          setPUModalVisible(true);
        } else if (
          getPolicyError?.message.match(
            'EMAIL_OR_MOBILE_PHONE_NUMBER_NOT_FOUND'
          )
        ) {
          setNFModalVisible(true);
          const arrNotFound = (
            getPolicyError?.message.match(/\{.+?\}/g) || []
          ).map((s) => {
            return s.slice(1, -1);
          });
          setNotFoundPIC(arrNotFound[0]);
        } else {
          setFailTitle('sertifikatTidakDitemukan');
          setFailMsg(getPolicyError?.message);
          setPUModalVisible(true);
        }
      }
      setIsSubmitCheck(false);
      setIsSubmitRequestOtp(false);
    },
    [
      getPolicyError?.message,
      getPolicyParam?.certificateNo,
      getPolicyParam?.requestOtp,
      getPolicyResponse?.data.exists,
      navigation,
      otpOpt,
      params?.id,
      sertifikat,
      setLoading,
    ]
  );

  function renderOTPoptModal() {
    return (
      <BottomSheet
        isVisible={isOtpOptModalVisible}
        title={trans(locale, lang, 'konfirmasiOtp')}
        onClosePress={() => setOtpOptModalVisible(false)}
        leftCloseButton
        swipeable={false}>
        {getPolicyResponse?.data?.email !== '' && (
          <View style={[Style.mb20, Style.mT35]}>
            <Input
              value={getPolicyResponse?.data?.email}
              prefixIcon={<Message />}
              suffixIcon={<ArrowRight2 />}
              editable={false}
              pressable
              height={64}
              onInputPress={() => {
                setOtpOptModalVisible(false);
                setOtpOpt(getPolicyResponse?.data?.email);
                setLoading(true);
                getPolicy({
                  id: params?.id,
                  certificateNo: sertifikat,
                  requestOtp: true,
                  sendTo: getPolicyResponse?.data?.email,
                  setResendPolicyOtp: false,
                });
              }}
            />
          </View>
        )}
        {getPolicyResponse?.data?.mobilePhoneNumber !== '' && (
          <View style={Style.mb20}>
            <Input
              value={getPolicyResponse?.data?.mobilePhoneNumber}
              prefixIcon={<Handphone />}
              suffixIcon={<ArrowRight2 />}
              editable={false}
              pressable
              height={64}
              onInputPress={() => {
                setOtpOptModalVisible(false);
                setOtpOpt(getPolicyResponse?.data?.mobilePhoneNumber);
                setLoading(true);
                getPolicy({
                  id: params?.id,
                  certificateNo: sertifikat,
                  requestOtp: true,
                  sendTo: getPolicyResponse?.data?.mobilePhoneNumber,
                  setResendPolicyOtp: false,
                });
              }}
            />
          </View>
        )}
        <AlertDialogue
          type="warning"
          leftIcon
          title={trans(locale, lang, 'pastikanEmailAtau')}
        />
      </BottomSheet>
    );
  }

  function renderImageContainer() {
    return (
      <View style={[Style.placeCenter]}>
        <Image source={SertifikatCek} style={Style.imageContainer.image} />
      </View>
    );
  }

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.body2.size}
          textStyle="medium"
          line={21}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'masukkanNomorSertifikat')}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View style={Style.mb8}>
        <Input
          keyboardType="number-pad"
          value={sertifikat}
          ref={inputRef}
          suffixIcon={
            <Button
              disabled={sertifikat.length === 0 && !isSubmitCheck}
              onPress={() => {
                setIsSubmitCheck(true);
                setLoading(true);
                getPolicy({
                  id: params?.id,
                  certificateNo: sertifikat,
                  requestOtp: false,
                  setResendPolicyOtp: false,
                });
              }}
              style={Style.inputCard.button}>
              {trans(locale, lang, 'cek')}
            </Button>
          }
          placeholder={trans(locale, lang, 'nomorSertifikat')}
          onChangeText={(text) => {
            setSertifikat(text);
            setIsCertifFound(false);
          }}
          height={56}
          handleSuffixIcon={() => {
            if (sertifikat.length !== 0 && !isSubmitCheck) {
              setIsSubmitCheck(true);
              setLoading(true);
              getPolicy({
                id: params?.id,
                certificateNo: sertifikat,
                requestOtp: false,
                setResendPolicyOtp: false,
              });
            }
          }}
        />
      </View>
    );
  }

  function renderAlertContainer() {
    return (
      <View>
        <AlertDialogue
          title={
            isCertifFound
              ? trans(locale, lang, 'nomorSertifikatKamu')
              : trans(locale, lang, 'pastikanSertifikatKamu')
          }
          type={isCertifFound ? 'success' : 'warning'}
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
        <Button
          disabled={!isCertifFound || isSubmitRequestOtp}
          onPress={() => {
            setIsSubmitRequestOtp(true);
            if (
              getPolicyResponse?.data?.mobilePhoneNumber === '' &&
              getPolicyResponse?.data?.email === ''
            ) {
              getPolicy({
                id: params?.id,
                certificateNo: sertifikat,
                requestOtp: true,
                sendTo: '',
                setResendPolicyOtp: false,
              });
            } else if (
              getPolicyResponse?.data.type === 'C' &&
              getPolicyParam?.requestOtp === false
            ) {
              setOtpOptModalVisible(true);
            }
          }}>
          {trans(locale, lang, 'lanjut')}
        </Button>
      </ImageBackground>
    );
  }

  function renderPolisUnsuccessModal() {
    return (
      <BottomSheet
        swipeable={false}
        isVisible={isPUModalVisible}
        onRequestClose={() => setPUModalVisible(false)}>
        <View style={[Style.modal.unsuccess.container, Style.alignItemsCenter]}>
          <Image source={SertifikatIlang} style={Style.modal.unsuccess.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.unsuccess.text1}>
            {trans(locale, lang, failTitle)}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.unsuccess.text2}>
            {trans(locale, lang, failMsg)}
          </Text>
        </View>
        <Button
          outline
          onPress={() => {
            setPUModalVisible(false);
          }}
          style={Style.modal.unsuccess.button1}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
        <Button
          shadow
          onPress={() => {
            setPUModalVisible(false);
            setIsShowModalCustomerCare(true);
          }}>
          {trans(locale, lang, 'hubungiCustomerCare')}
        </Button>
      </BottomSheet>
    );
  }

  function renderPolisEmailNotFoundModal() {
    return (
      <BottomSheet
        isVisible={isNFModalVisible}
        onModalHide={() => {
          // eslint-disable-next-line no-unused-expressions
          isCompleteListModalHide && setIsShowModalCustomerCare(true);
          setIsCompleteListModalHide(false);
        }}
        swipeable={false}
        onClosePress={() => {
          setNFModalVisible(false);
          setIsCompleteListModalHide(false);
        }}>
        <View style={Style.polisNotFoundModal.container}>
          <Image source={EmailIlang} style={Style.polisNotFoundModal.image} />
        </View>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={Style.polisNotFoundModal.title}>
          {trans(locale, lang, 'emailAtauNomor')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.polisNotFoundModal.subtitle}>
          {`${trans(locale, lang, 'silahkanHubungiPIC')} ${notFoundPIC} ${trans(
            locale,
            lang,
            'atauEmailKe'
          )}`}
        </Text>
        <Button
          onPress={() => {
            setNFModalVisible(false);
            setIsCompleteListModalHide(true);
          }}>
          {trans(locale, lang, 'hubungiCustomerCare')}
        </Button>
      </BottomSheet>
    );
  }

  return (
    <Base
      leftTitle
      title={trans(locale, lang, 'temukanSertifikat')}
      onBackPress={
        navigation.canGoBack()
          ? () => navigation.pop()
          : () => navigation.replace(NAVIGATION.TABMAIN.TabMain)
      }>
      <Padder>
        <View>
          {renderImageContainer()}
          {renderHeaderContainer()}
          {renderInputCard()}
          {renderAlertContainer()}
        </View>
      </Padder>
      {renderFooterContainer()}
      {renderPolisUnsuccessModal()}
      {renderPolisEmailNotFoundModal()}
      {renderOTPoptModal()}
    </Base>
  );
}

export default RegisterSertifikat;

RegisterSertifikat.propTypes = {
  lang: PropTypes.string.isRequired,
  homeAction: PropTypes.string.isRequired,
  getPolicyParam: PropTypes.objectOf(Object).isRequired,
  getPolicyResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyError: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicy: PropTypes.func.isRequired,
  getPolicyClear: PropTypes.func.isRequired,
  setResendPolicyOtp: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
};
