/* eslint-disable max-depth */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { View, Image, Alert } from 'react-native';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import { LifetagHook, LifetagHookDisable } from 'ca-config/Image';
import { NAVIGATION, RESPONSE_STATE } from 'ca-util/constant';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import {
  GET_LIFETAG_LIST_OTHER_INFO_FAILED,
  GET_LIFETAG_LIST_OTHER_INFO_SUCCESS,
  GET_LIFETAG_PROFILE_FAILED,
  GET_LIFETAG_PROFILE_SUCCESS,
  LIFETAG_RESPONSE_STATE,
} from 'ca-module-lifetag/lifetagConstant';
import { GET_CURRENT_SUBS_SUCCESS } from 'ca-module-lifesaver/lifesaverConstant';
import { trans } from 'ca-util/trans';
import _ from 'lodash';
import style from './style';
import locale from './locale';

function LifetagPairingResult(props) {
  const {
    navigation,
    lang,
    route: { params },
    colorScheme,
    lifetagAction,
    getLifetagProfileFailed,
    setLoading,
    getLifetagProfile,
    getLifetagProfileClear,
    getLifetagListOtherInfoResponse,
    getLifetagListOtherInfoFailed,
    getLifetagListOtherInfo,
    getLifetagListOtherInfoClear,
    alreadyKYC,
    getCurrentSubs,
    setIsComingFromScreen,
    lifesaverAction,
    getCurrentSubsResponse,
  } = props;

  const { LIFE_TAG_NOT_LINKED, LIFE_TAG_NOT_FOUND } = LIFETAG_RESPONSE_STATE;

  const [isSuccessPairing, setIsSuccessPairing] = useState(null);

  const isExecuted = useRef(false);

  const lifetagId = useMemo(() => {
    if (!isExecuted.current) {
      return params?.lifetagId;
    }
    return '';
  }, [params?.lifetagId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      getLifetagProfileClear();
      getLifetagListOtherInfoClear();
    });
    return unsubscribe;
  }, [getLifetagListOtherInfoClear, getLifetagProfileClear, navigation]);

  useEffect(() => {
    if (!isExecuted.current) {
      if (lifetagId) {
        setLoading(true);
        const timeout = setTimeout(() => {
          getLifetagProfile({ id: lifetagId });
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }
      // if LifeTag ID from QR Code empty
      setIsSuccessPairing(false);
      isExecuted.current = true;
    }
    return () => {};
  }, [getLifetagProfile, lifetagId, setLoading]);

  useEffect(() => {
    getLifetagProfileResult(lifetagAction);
  }, [getLifetagProfileResult, lifetagAction]);

  const getLifetagProfileResult = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PROFILE_SUCCESS) {
        setLoading(false);
        // if LifeTag ID already linked
        setIsSuccessPairing(false);
      }
      if (act === GET_LIFETAG_PROFILE_FAILED) {
        setLoading(false);
        const message = getLifetagProfileFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          if (message === LIFE_TAG_NOT_LINKED) {
            if (alreadyKYC) {
              getCurrentSubs();
            } else {
              setIsComingFromScreen({});
              navigation.reset({
                index: 1,
                routes: [
                  { name: NAVIGATION.TABMAIN.TabMain },
                  { name: NAVIGATION.LIFESAVER.LifesaverMain },
                ],
              });
            }
            return;
          }
          // if LifeTag ID not exist on db master lifetag
          setIsSuccessPairing(false);
          if (message === LIFE_TAG_NOT_FOUND) {
            return;
          }
          Alert.alert('Error', message);
        }
      }
    },
    [
      LIFE_TAG_NOT_FOUND,
      LIFE_TAG_NOT_LINKED,
      alreadyKYC,
      getCurrentSubs,
      getLifetagProfileFailed?.message,
      navigation,
      setIsComingFromScreen,
      setLoading,
    ]
  );

  useEffect(() => {
    lifesaverResult(lifesaverAction, lifetagAction);
  }, [lifesaverAction, lifetagAction, lifesaverResult]);

  const lifesaverResult = useCallback(
    (lifesaverAct, lifetagAct) => {
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_PROFILE_FAILED &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        const hasActiveLifesaver =
          getCurrentSubsResponse?.isSubscribe &&
          getCurrentSubsResponse?.status !== 'GRACE_PERIOD';
        if (alreadyKYC && hasActiveLifesaver) {
          setLoading(true);
          getLifetagListOtherInfo();
        } else {
          setIsComingFromScreen({});
          navigation.reset({
            index: 1,
            routes: [
              { name: NAVIGATION.TABMAIN.TabMain },
              { name: NAVIGATION.LIFESAVER.LifesaverMain },
            ],
          });
        }
      }
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_LIST_OTHER_INFO_SUCCESS &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        setLoading(false);
        const res = getLifetagListOtherInfoResponse?.data;
        const lifetagOtherInfo = !_.isEmpty(res)
          ? {
              bloodType: res[0]?.bloodType,
              allergic: res[0]?.allergic,
              diseaseHistory: res[0]?.diseaseHistory,
              emergencyContact: res[0]?.emergencyContact.map((item) => {
                return {
                  ...item,
                  phoneNumber: item.mobilePhoneNumber,
                };
              }),
            }
          : undefined;
        setIsSuccessPairing(true);
        setTimeout(() => {
          getLifetagProfileClear();
          navigation.replace(NAVIGATION.LIFETAG.LifetagForm, {
            lifetagId,
            lifetagOtherInfo,
          });
        }, 3000);
      }
      if (
        lifesaverAct === GET_CURRENT_SUBS_SUCCESS &&
        lifetagAct === GET_LIFETAG_LIST_OTHER_INFO_FAILED &&
        getLifetagProfileFailed?.message === LIFE_TAG_NOT_LINKED
      ) {
        setLoading(false);
        const message = getLifetagListOtherInfoFailed?.message;
        if (message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR) {
          Alert.alert('Error', message);
        }
      }
    },
    [
      getLifetagProfileFailed?.message,
      LIFE_TAG_NOT_LINKED,
      getCurrentSubsResponse?.isSubscribe,
      getCurrentSubsResponse?.status,
      alreadyKYC,
      setLoading,
      getLifetagListOtherInfo,
      setIsComingFromScreen,
      navigation,
      getLifetagListOtherInfoResponse?.data,
      getLifetagProfileClear,
      lifetagId,
      getLifetagListOtherInfoFailed?.message,
    ]
  );

  function renderContent() {
    if (isSuccessPairing === false) {
      return (
        <View style={style.renderContent.container}>
          <View>
            <Image
              source={LifetagHookDisable}
              style={style.renderContent.image}
            />
          </View>
          <View>
            <Text
              align="center"
              textStyle="bold"
              size={Size.text.h6.size}
              line={27}
              style={style.mb6}>
              {trans(locale, lang, 'lifetagGagalTerhubung')}
            </Text>
            <Text
              align="center"
              textStyle="medium"
              line={21}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'pastikanLifetagBukan')}
            </Text>
          </View>
        </View>
      );
    }
    if (isSuccessPairing === true) {
      return (
        <View style={style.renderContent.container}>
          <View>
            <Image
              source={LifetagHook}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 252, height: 252 }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              align="center"
              textStyle="bold"
              size={Size.text.h6.size}
              line={27}
              style={style.mb6}>
              {trans(locale, lang, 'lifeTagSiapDihubungkan')}
            </Text>
            <Text
              align="center"
              textStyle="medium"
              line={21}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'yayLifetagSudahSiap')}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  if (isSuccessPairing === null) {
    return null;
  }
  return (
    <Base
      onBackPress={
        isSuccessPairing === false
          ? () => {
              if (navigation.canGoBack()) {
                navigation.pop();
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
                });
              }
            }
          : undefined
      }>
      <View style={style.flex}>
        <Padder style={style.flex}>{renderContent()}</Padder>
      </View>
    </Base>
  );
}

export default LifetagPairingResult;

LifetagPairingResult.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  colorScheme: PropTypes.string.isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagProfileFailed: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getLifetagProfile: PropTypes.func.isRequired,
  getLifetagProfileClear: PropTypes.func.isRequired,
  getLifetagListOtherInfoResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagListOtherInfoFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagListOtherInfo: PropTypes.func.isRequired,
  getLifetagListOtherInfoClear: PropTypes.func.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
};
