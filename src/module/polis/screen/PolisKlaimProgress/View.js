import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Base15 from 'ca-component-container/Base15';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Shadow from 'ca-component-container/Shadow';
import Dash from 'react-native-dash';
import moment from 'moment/min/moment-with-locales';
import { useIsFocused } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import {
  GET_POLICY_CLAIM_DETAIL_FAILED,
  GET_POLICY_CLAIM_DETAIL_SUCCESS,
} from 'ca-module-polis/polisConstant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BackgroundGradientSquare,
  BackgroundGradientTablet,
} from 'ca-config/Svg';
import PolisModalError from 'ca-module-polis/components/ModalError';
import DeviceInfo from 'react-native-device-info';
import locale from './locale';
import style from './style';

function PolisKlaimProgress(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicyClaimDetailResponse,
    getPolicyClaimDetailFailed,
    polisAction,
    getPolicyClaimDetail,
    setLoading,
    setIsShowModalBadRequest,
    width,
  } = props;

  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();

  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);

  moment.locale(lang);

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicyClaimDetail({
        policyNo: polis?.policyNo || polis?.oldPolicyNo,
        productCode: polis?.productCode,
        source: polis?.source,
        claimNo: params?.claimNo,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicyClaimDetail,
    isFocused,
    params?.claimNo,
    polis?.oldPolicyNo,
    polis?.policyNo,
    polis?.productCode,
    polis?.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicyClaimDetailResult(polisAction);
  }, [polisAction, getPolicyClaimDetailResult]);

  const getPolicyClaimDetailResult = useCallback(
    (act) => {
      if (act === GET_POLICY_CLAIM_DETAIL_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_CLAIM_DETAIL_FAILED) {
        if (getPolicyClaimDetailFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicyClaimDetailFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }
          if (getPolicyClaimDetailFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
        }
      }
    },
    [getPolicyClaimDetailFailed?.message, setIsShowModalBadRequest, setLoading]
  );

  function renderHeaderContainer() {
    return (
      <View style={style.header.container}>
        <Text
          textStyle="regular"
          size={Size.text.caption1.size}
          line={18}
          letterSpacing={0.5}
          color={Color.mediumGray[colorScheme].mediumGray}>
          {trans(locale, lang, 'nomorKlaim')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}>
          {getPolicyClaimDetailResponse?.data?.claimNo}
        </Text>
      </View>
    );
  }

  function renderProgressContainer(item, index, length) {
    return (
      <View style={style.progress.container} key={index}>
        <View style={style.progress.date.container}>
          <Text
            style={style.fS1}
            textStyle="medium"
            size={Size.text.caption1.size}
            line={18}
            letterSpacing={0.5}
            align="right"
            color={Color.mediumGray[colorScheme].mediumGray}>
            {moment(item?.progressDate, 'DD-MM-YYYY hh:mm:ss').format(
              'DD MMM YYYY'
            )}
            {'\n'}
            {moment(item?.progressDate, 'DD-MM-YYYY hh:mm:ss').format('h:mm')}
            {' WIB'}
          </Text>
        </View>
        <View style={style.progress.status.container}>
          <View
            style={[
              style.progress.status.dot.dot,
              item.progressStatus === 'APPROVED'
                ? style.progress.status.dot.active
                : style.progress.status.dot.inactive,
            ]}
          />
          <View
            style={[
              style.progress.status.line.line,
              item.progressStatus === 'APPROVED'
                ? style.progress.status.line.active
                : style.progress.status.line.inactive,
              index === length - 1 && style.progress.status.line.last,
            ]}
          />
        </View>
        <View style={style.progress.deskripsi.container}>
          <Text
            textStyle={
              item.progressStatus === 'APPROVED' ? 'medium' : 'regular'
            }
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}>
            {item.progressName}
          </Text>
        </View>
      </View>
    );
  }

  function renderBackgroundHeaderImage() {
    if (DeviceInfo.isTablet()) {
      return (
        <View
          style={[
            style.backgroundContainer,
            {
              top: -90 + insets.top,
            },
          ]}>
          <BackgroundGradientTablet width={width + 300} height={205} />
        </View>
      );
    }
    return (
      <View
        style={[
          style.backgroundContainer,
          {
            top: -230 + insets.top,
          },
        ]}>
        <BackgroundGradientSquare width={width + 300} height={390} />
      </View>
    );
  }

  return (
    <Base15
      animated
      isScroll
      title={trans(locale, lang, 'policyDetail')}
      onBackPress={() => navigation.pop()}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <Shadow animated borderRadius={30} style={style.container}>
        <Padder>
          {renderHeaderContainer()}
          <Dash
            dashGap={4}
            dashThickness={1}
            dashColor={Color.neutral.dark.neutral20}
            style={style.mb16}
          />
          {getPolicyClaimDetailResponse?.data?.progress?.map((item, index) => {
            return renderProgressContainer(
              item,
              index,
              getPolicyClaimDetailResponse?.data?.progress.length
            );
          })}
        </Padder>
      </Shadow>
      <PolisModalError
        navigation={navigation}
        isVisible={isVisible}
        colorScheme={colorScheme}
        onClose={() => {
          setIsVisible(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
        }}
        lang={lang}
      />
    </Base15>
  );
}

export default PolisKlaimProgress;

PolisKlaimProgress.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicyClaimDetailResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyClaimDetailFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  getPolicyClaimDetail: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
