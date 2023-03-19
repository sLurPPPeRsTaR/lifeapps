import {
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import {
  BgCampaign,
  CardVoucher,
  LifeSAVERActive,
  SpiralLine,
} from 'ca-config/Image';
import { Attention2, BtnBack } from 'ca-config/Svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import {
  APP,
  EVENT_CODE,
  NAVIGATION,
  PRODUCT,
  RESPONSE_STATE,
} from 'ca-util/constant';
import { formatNumber } from 'ca-util/numbro';
import {
  GET_CAMPAIGN_SUCCESS,
  GET_ELIGIBLE_SUBMISSION,
  GET_ELIGIBLE_SUBMISSION_FAILED,
  GET_ELIGIBLE_SUBMISSION_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import locale from './locale';
import style from './style';
import { ModalErrorSubmission } from '../LifesaverOrderPage/components/Modal';
import DialogAlreadySubs from './components/DialogAlreadySubs';

function LifesaverVoucher(props) {
  const {
    navigation,
    colorScheme,
    lang,
    userData,
    setIsComingFromScreen,
    setLoading,
    lifesaverAction,
    route,
    getCampaign,
    getCampaignResponse,
    getEligibleSubmission,
    getEligibleSubmissionResponse,
    getEligibleSubmissionError,
    isComingFromScreen,
    alreadySetPin,
    alreadyKYC,
    userId,
  } = props;

  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [isEligible, setIsEligible] = useState(undefined);
  const [isAlreadySubsVisible, setIsAlreadySubsVisible] = useState(false);
  const [isFromAuth, setIsFromAuth] = useState(false);
  const [isEKYCIdInvalid, setIsEKYCIdInvalid] = useState(false);

  // Memo isLogin
  const isLogin = useMemo(() => {
    return userData?.userId !== '';
  }, [userData?.userId]);

  // Memo Data Campaign
  const campaign = useMemo(() => {
    if (getCampaignResponse[0]) {
      const {
        eventTitleId,
        eventTitleEn,
        eventSubtitleId,
        eventSubtitleEn,
        eventDescId,
        eventDescEn,
        disclaimerId,
        disclaimerEn,
        eventBanner,
        eventName,
        eventFreeFor,
        eventPrice,
        eventProductGet,
      } = getCampaignResponse[0];
      if (lang === 'id') {
        return {
          title: eventTitleId,
          subTitle: eventSubtitleId,
          eventDesc: eventDescId,
          image: eventBanner,
          eventFor: eventFreeFor,
          product: eventProductGet,
          biayaLangganan: eventPrice,
          event: eventName,
          disclaimer: disclaimerId,
        };
      }
      if (lang === 'en') {
        return {
          title: eventTitleEn,
          subTitle: eventSubtitleEn,
          eventDesc: eventDescEn,
          image: eventBanner,
          eventFor: eventFreeFor,
          product: eventProductGet,
          biayaLangganan: eventPrice,
          event: eventName,
          disclaimer: disclaimerEn,
        };
      }
    }
    return false;
  }, [getCampaignResponse, lang]);

  // On Mount
  useEffect(() => {
    getCampaign(EVENT_CODE.BAJO2022);
    setLoading(true);
    if (userId !== '' || alreadyKYC) {
      getEligibleSubmission('bajo');
    }
  }, [alreadyKYC, getCampaign, getEligibleSubmission, setLoading, userId]);

  // Automaticly open modal at focus
  useEffect(() => {
    if (
      isFocused &&
      isFromAuth &&
      // if user already subcribed not go anywhere
      isEligible !== undefined
    ) {
      setIsComingFromScreen({});
      setShowModal(isEligible);
      setIsFromAuth(false);
    }
  }, [
    alreadyKYC,
    alreadySetPin,
    getEligibleSubmission.eligible,
    isFromAuth,
    isEligible,
    isFocused,
    setIsComingFromScreen,
    setShowModal,
    userId,
  ]);

  // Automaticly open modal at focus
  const setShowModal = useCallback(
    (isEligibleCall) => {
      if (isEligibleCall === RESPONSE_STATE.INVALID_EKYC && userId !== '') {
        return onPressNotKyc();
      }
      if (isEligibleCall === RESPONSE_STATE.POLICY_IN_SUBMIT_STATUS_NOT_FOUND) {
        return setIsEKYCIdInvalid(true);
      }
      if (isEligibleCall === 'SUCCESS') {
        return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverOrderPage, {
          product: PRODUCT.LIFESAVER.LIFESAVER,
          from: 'bajoRun',
          recurring: false,
          eventCode: getEligibleSubmissionResponse?.eligible?.eventCode,
        });
      }
      // clear if user already passed, avoid redirect at focus
    },
    [
      getEligibleSubmissionResponse?.eligible?.eventCode,
      navigation,
      onPressNotKyc,
      userId,
    ]
  );

  useEffect(() => {
    setEligibleResult(lifesaverAction);
  }, [
    getEligibleSubmissionResponse?.getCurrentSubs,
    lifesaverAction,
    setEligibleResult,
  ]);

  const setEligibleResult = useCallback(
    (act) => {
      if (act === GET_CAMPAIGN_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (act === GET_ELIGIBLE_SUBMISSION) {
        if (isComingFromScreen?.screen) {
          setIsFromAuth(true);
        }
      }
      if (act === GET_ELIGIBLE_SUBMISSION_SUCCESS) {
        if (getEligibleSubmissionResponse?.eligible?.isSubscribed) {
          setIsAlreadySubsVisible(true);
          return setIsEligible(RESPONSE_STATE.ALREADY_SUBSCRIBE);
        }
        return setIsEligible('SUCCESS');
      }
      if (act === GET_ELIGIBLE_SUBMISSION_FAILED) {
        setIsEligible(getEligibleSubmissionError?.message);
      }
    },
    [
      getEligibleSubmissionError?.message,
      getEligibleSubmissionResponse?.eligible?.isSubscribed,
      isComingFromScreen?.screen,
      setLoading,
    ]
  );

  const onPressNotKyc = useCallback(() => {
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.LifesaverVoucher,
    });
    if (userId === '') {
      return null;
    }
    if (!alreadyKYC && userId !== '') {
      return navigation.navigate(NAVIGATION.KYC.KycMain);
    }
    return navigation.navigate(NAVIGATION.KYC.KycCreatePin);
  }, [alreadyKYC, navigation, setIsComingFromScreen, userId]);

  function onPressStart() {
    if (!isLogin) {
      setIsComingFromScreen({
        screen: route.name,
      });
      navigation.navigate(NAVIGATION.REGISTER.Register);
      return null;
    }
    if (isEligible === RESPONSE_STATE.INVALID_EKYC) {
      return onPressNotKyc();
    }
    if (isEligible === RESPONSE_STATE.POLICY_IN_SUBMIT_STATUS_NOT_FOUND) {
      return setIsEKYCIdInvalid(true);
    }
    if (isEligible === 'SUCCESS') {
      return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverOrderPage, {
        product: PRODUCT.LIFESAVER.LIFESAVER,
        from: 'bajoRun',
        recurring: false,
        eventCode: getEligibleSubmissionResponse?.eligible?.eventCode,
      });
    }
    return Alert.alert(getEligibleSubmissionError?.message);
  }

  function renderBanner() {
    return (
      <View style={style.banner.container}>
        <Image
          style={style.banner.image}
          source={{
            uri: campaign?.image,
          }}
          borderRadius={8}
        />
        <View style={style.banner.labelContainer}>
          <Text textStyle="bold" size={20}>
            {campaign?.title}
          </Text>
          <View style={style.banner.subTitle}>
            <Text textStyle="medium">{campaign?.subTitle}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderDescHeader() {
    return (
      <View style={style.descHeader.container}>
        <View style={style.descHeader.product}>
          <Image source={LifeSAVERActive} style={style.descHeader.logo} />
        </View>
        <View style={style.descHeader.gratis}>
          <Text
            size={Size.text.caption1.size}
            textStyle="medium"
            color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'gratis')} {campaign?.eventFor}{' '}
            {trans(locale, lang, 'bulan')}
          </Text>
        </View>
      </View>
    );
  }

  function renderDescMain() {
    return (
      <View style={style.mt20}>
        <Text textStyle="medium" size={13}>
          {campaign?.eventDesc}
        </Text>

        <View style={style.mt40}>
          <Button
            onPress={() => onPressStart()}
            disabled={isEligible === RESPONSE_STATE.ALREADY_SUBSCRIBE}
            type="linear-gradient"
            height={39}
            rounded="lg">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'startSubscribe')}
            </Text>
          </Button>
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral20}
            style={style.mt5}
            size={Size.text.caption1.size}
            align="center">
            {trans(locale, lang, 'hanya')}{' '}
            {formatNumber(campaign?.biayaLangganan, lang)}{' '}
            {trans(locale, lang, 'selanjutnya')}
          </Text>
        </View>
      </View>
    );
  }

  function renderDesc() {
    return (
      <View style={style.desc.container}>
        {renderDescHeader()}
        {renderDescMain()}
      </View>
    );
  }

  function renderHalf() {
    return (
      <View style={style.main.circleHalfContainer}>
        <View style={style.main.circleHalfItem} />
        <Image style={style.banner.spiralLine} source={SpiralLine} />
        <View style={style.main.circleHalfItem} />
      </View>
    );
  }

  function renderBottom() {
    return (
      <View style={style.bottom.container}>
        <Text
          textStyle="medium"
          color={Color.whiteCard[colorScheme].color}
          style={style.mt20}>
          {trans(locale, lang, 'bilaKesulitan')}?
        </Text>
        <View style={style.bottom.callCenterContainer}>
          <Text textStyle="medium" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'hubungi')}{' '}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
            }}>
            <Text
              textStyle="medium"
              color={Color.whiteCard[colorScheme].color}
              textDecorationLine="underline">
              {trans(locale, lang, 'customerCare')}{' '}
            </Text>
          </TouchableWithoutFeedback>
          <Text textStyle="medium" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'kami')}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={style.flex1}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={style.main.container}>
        <View
          style={[
            style.main.header,
            { height: APP.header.height + insets.top, paddingTop: insets.top },
          ]}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsComingFromScreen({});
              navigation.replace(NAVIGATION.TABMAIN.TabMain);
            }}>
            <BtnBack fill="white" />
          </TouchableWithoutFeedback>
        </View>
        <Image style={style.main.headerImage} source={BgCampaign} />
        <ScrollView style={style.flex1} showsVerticalScrollIndicator={false}>
          <View style={style.containerScrollView}>
            <View style={style.main.contentContainer}>
              {renderBanner()}
              {renderHalf()}
              {renderDesc()}
            </View>
            <View style={style.bottom.attentionContainer}>
              <View style={style.bottom.attentionLabel}>
                <Attention2 />
                <Text
                  textStyle="regular"
                  color={Color.whiteCard[colorScheme].color}
                  style={style.bottom.textLabel}>
                  {campaign.disclaimer}
                </Text>
              </View>
            </View>
          </View>

          {Size.screen.height <= 770 ? renderBottom() : null}
        </ScrollView>
        {Size.screen.height > 770 ? renderBottom() : null}
      </View>
      <ModalErrorSubmission
        {...props}
        isVisible={isEKYCIdInvalid}
        onBackPress={() => {
          setIsEKYCIdInvalid(false);
        }}
        isTips
        message={RESPONSE_STATE.POLICY_IN_SUBMIT_STATUS_NOT_FOUND}
      />
      <DialogAlreadySubs
        isVisible={isAlreadySubsVisible}
        onBackPress={() => {
          setIsAlreadySubsVisible(false);
        }}
        {...props}
      />
    </View>
  );
}

LifesaverVoucher.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setClearAuth: PropTypes.func.isRequired,
  setLoginClear: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getCampaign: PropTypes.func.isRequired,
  getCampaignResponse: PropTypes.arrayOf(Object).isRequired,
  isAgreementVisible: PropTypes.bool.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  loginAction: PropTypes.string.isRequired,
  isComingFromScreen: PropTypes.func.isRequired,
  getEligibleSubmission: PropTypes.func.isRequired,
  getEligibleSubmissionResponse: PropTypes.objectOf(Object).isRequired,
  getEligibleSubmissionError: PropTypes.objectOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  getEligibleSubmissionClear: PropTypes.func.isRequired,
};

export default LifesaverVoucher;
