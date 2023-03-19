import { Image, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Padder from 'ca-component-container/Padder';
import { Feedback, Looper } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NAVIGATION } from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  SET_UNSUBSCRIBE,
  SET_UNSUBSCRIBE_FAILED,
  SET_UNSUBSCRIBE_SUCCESS,
  GET_SUBSCRIPTION_DETAIL_SUCCESS,
  GET_SUBSCRIPTION_DETAIL_FAILED,
} from 'ca-module-subs/subsConstant';
import moment from 'moment/min/moment-with-locales';
import locale from './locale';
import style from './style';

function LifesaverUnSubs(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getSubscriptionDetail,
    subsAction,
    setUnsubscribe,
    setLoading,
    setIsShowModalInternalServerError,
    getSubscriptionDetailResponse,
    route,
  } = props;

  const { policyNo } = route.params;

  const reasonList = [
    'price',
    'lackOfValue',
    'productQuality',
    'poorExperience',
    'circumstance',
    'lainnya',
  ];
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [reason, setReason] = useState({
    price: false,
    lackOfValue: false,
    productQuality: false,
    poorExperience: false,
    circumstance: false,
    lainnya: false,
  });

  const [otherReason, setOtherReason] = useState('');
  const isHaveReason = () => {
    let haveReason;
    if (
      reason.price ||
      reason.lackOfValue ||
      reason.productQuality ||
      reason.poorExperience ||
      reason.circumstance ||
      reason.lainnya
    ) {
      if (reason.lainnya) {
        haveReason = otherReason?.length > 0;
      } else {
        haveReason = true;
      }
    }
    return haveReason;
  };

  useEffect(() => {
    setUnsubsResult(subsAction);
  }, [subsAction, setUnsubsResult, getSubscriptionDetail]);

  useEffect(() => {
    getSubscriptionDetail(policyNo);
  }, [getSubscriptionDetail, policyNo]);

  const setUnsubsResult = useCallback(
    (act) => {
      if (act === SET_UNSUBSCRIBE) {
        setLoading(true);
      }
      if (act === SET_UNSUBSCRIBE_SUCCESS) {
        navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
          policyNo: policyNo,
          planName: route?.params?.planName,
        });
      }
      if (act === SET_UNSUBSCRIBE_FAILED) {
        setLoading(false);
        setIsShowModalInternalServerError(true);
      }
      if (act === GET_SUBSCRIPTION_DETAIL_SUCCESS) {
        setLoading(false);
      }
    },
    [
      setLoading,
      navigation,
      policyNo,
      route?.params?.planName,
      setIsShowModalInternalServerError,
    ]
  );

  function unSubs() {
    const keys = Object.keys(reason).filter((k) => reason[k]);
    if (reason.lainnya === true && otherReason?.length > 0) {
      keys.push(otherReason);
    }
    setUnsubscribe({
      policyNo: policyNo,
      reasons: keys,
    });
  }

  function renderImage() {
    return (
      <View style={style.image.container}>
        <Image source={Feedback} style={style.image.image} />
        <Image source={Looper} style={style.image.image2} />
        <Text
          style={style.image.text}
          align="left"
          textStyle="semi"
          size={Size.text.body1.size}>
          {trans(locale, lang, 'kamiSedih')}
        </Text>
      </View>
    );
  }

  function renderReason() {
    return (
      <View style={style.mb10}>
        <Text textStyle="semi">
          {trans(locale, lang, 'alasan')}
          <Text color={Color.primary[colorScheme].primary90}>*</Text>
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          color={Color.neutralLifeSaver[colorScheme].neutral40}>
          {trans(locale, lang, 'pilihAlasan')}
        </Text>
        <View style={style.reason.container}>
          {reasonList.map((element) => (
            <Shadow
              borderRadius={64}
              key={element}
              style={[
                style.reason.shadow,
                {
                  borderColor: reason[element]
                    ? Color.primary[colorScheme].primary40
                    : 'transparent',
                },
              ]}>
              <TouchableWithoutFeedback
                style={style.reason.touchable}
                onPress={() => {
                  setReason({
                    ...reason,
                    [element]: !reason[element],
                  });
                }}>
                <Text
                  textStyle="semi"
                  align="center"
                  size={Size.text.caption1.size}
                  color={
                    reason[element]
                      ? Color.primary[colorScheme].primary60
                      : Color.neutralLifeSaver[colorScheme].neutral60
                  }>
                  {trans(locale, lang, element)}
                </Text>
              </TouchableWithoutFeedback>
            </Shadow>
          ))}
        </View>
        <View style={style.reason.textInput}>
          {reason.lainnya ? (
            <Input
              onChangeText={(text) => {
                setOtherReason(text);
              }}
              height={56}
              placeholder={trans(locale, lang, 'tulisAlasan')}
            />
          ) : (
            <View style={style.mb59} />
          )}
        </View>
      </View>
    );
  }

  function renderConfirmation() {
    return (
      <BottomSheet
        isVisible={isVisibleConfirm}
        onRequestClose={() => setIsVisibleConfirm(false)}>
        <View style={style.confirmation.textContainer}>
          <Text style={style.mt20} textStyle="bold" size={Size.text.h6.size}>
            {trans(locale, lang, 'konfirmasiPembatalan')}
          </Text>
          <Text
            align="center"
            style={[style.mt15, style.mb30]}
            line={21}
            textStyle="medium"
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'subPembatalan')}
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {moment(getSubscriptionDetailResponse?.policyDueDate).format(
                'D MMM YYYY'
              )}
            </Text>
            {trans(locale, lang, 'subPembatalan3')}
          </Text>
        </View>
        <Button
          onPress={() => {
            // getSubscriptionDetail();
            setIsVisibleConfirm(false);
            // navigation.navigate(NAVIGATION.SUBS.SubsDetail);
            unSubs();
          }}
          style={style.confirmation.buttonBatalkan}
          color={Color.whiteCard[colorScheme].color}
          type="linear-gradient"
          rounded="lg">
          <Text textStyle="semi" color={Color.primary[colorScheme].primary90}>
            {trans(locale, lang, 'batalkanLangganan')}
          </Text>
        </Button>
        <View style={style.mt16}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            type="linear-gradient"
            rounded="lg">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'kembali')}
            </Text>
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderBottom() {
    return (
      <View>
        <View style={style.bottom.tetapBatalkan}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (isHaveReason()) {
                setIsVisibleConfirm(true);
              }
            }}
            style={style.mt10}>
            <Text
              textStyle="semi"
              color={
                isHaveReason()
                  ? Color.primary[colorScheme].primary60
                  : Color.neutralLifeSaver[colorScheme].neutral60
              }
              style={style.underline}>
              {trans(locale, lang, 'tetapBatalkan')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => navigation.goBack()}
          rounded="lg">
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'kembali')}
          </Text>
        </Button>
      </View>
    );
  }
  return (
    <Base
      statusBarColor={Color.whiteLifesaverBg[colorScheme].color}
      title={trans(locale, lang, 'berhenti')}
      headerStyle={{
        backgroundColor: Color.whiteLifesaverBg[colorScheme].color,
      }}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      isPaddingBottom={false}
      onBackPress={() => {
        navigation.goBack();
      }}>
      <Padder style={style.main.padder}>
        {renderImage()}
        <View style={style.main.container}>
          {renderReason()}
          {renderBottom()}
        </View>
      </Padder>
      {renderConfirmation()}
    </Base>
  );
}

LifesaverUnSubs.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setUnsubscribe: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getSubscriptionDetailResponse: PropTypes.objectOf(Object).isRequired,
  subsAction: PropTypes.string.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
};

export default LifesaverUnSubs;
