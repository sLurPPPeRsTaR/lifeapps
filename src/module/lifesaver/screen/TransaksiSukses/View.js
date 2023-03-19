import React, { useCallback, useEffect, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Image,
  BackHandler,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { codeLifesaver, NAVIGATION } from 'ca-util/constant';
import Base from 'ca-component-container/Base';
import {
  ReferalBg,
  KadoRedSuccess,
  LifeSAVERplusActive,
  BadgeTick,
  LogoLifesaverPosSuccess,
  LifeSaverLogoFull,
} from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import LinearGradient from 'react-native-linear-gradient';
import {
  GET_POLICY_SUMMARY_FAILED,
  GET_POLICY_SUMMARY_SUCCESS,
} from 'ca-module-polis/polisConstant';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { setNavigationHome } from 'ca-bootstrap/bootstrapNavigation';
import locale from './locale';
import style from './style';

function TransaksiSukses(props) {
  const {
    navigation,
    lang,
    route: { params },
    getPolicySummary,
    getPolicySummaryResponse,
    getPolicySummaryFailed,
    getPolicySummaryClear,
    polisAction,
    setLoading,
    route,
    setIsComingFromScreen,
  } = props;

  // const polis = params?.polis;

  const isFocused = useIsFocused();

  const [remainingSecMedical, setRemainingSecMedical] = useState(null);
  const [remainingSecSport, setRemainingSecSport] = useState(null);
  const [immediateActive, setImmediateActive] = useState(false);

  useEffect(() => {
    if (
      isFocused &&
      params?.policyNo &&
      params?.productCode &&
      params?.source
    ) {
      getPolicySummary({
        policyNo: params.policyNo,
        productCode: params.productCode,
        source: params.source,
      });
      setLoading(true);
    } else {
      setImmediateActive(true);
    }
  }, [getPolicySummary, isFocused, params, setLoading]);

  useEffect(() => {
    getPolicySummaryResult(polisAction);
  }, [polisAction, getPolicySummaryResult]);

  useEffect(() => {
    if (getPolicySummaryResponse) {
      setRemainingSecMedical(
        getPolicySummaryResponse?.data?.progressTab?.medicalExpenses
      );
      setRemainingSecSport(
        getPolicySummaryResponse?.data?.progressTab?.sportInjuries
      );
    }
  }, [getPolicySummaryResponse]);

  const getPolicySummaryResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SUMMARY_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_SUMMARY_FAILED) {
        getPolicySummaryClear();
        setLoading(false);
      }
    },
    [getPolicySummaryClear, setLoading]
  );

  const dateFormat = useCallback((date, add) => {
    const newDate = moment(date);
    newDate.format();
    return moment(newDate).add(add, 'seconds').format('DD MMM YYYY, HH:MM');
  }, []);

  // const onGotoDetail = useCallback(() => {
  //   navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
  //     polis: {
  //       policyNo: route?.params?.policyNo,
  //       productCode: route?.params?.productCode || codeLifesaver.productCode,
  //       source: route?.params?.source,
  //       isDownloadSection: true,
  //     },
  //   });
  // }, [
  //   navigation,
  //   route?.params?.policyNo,
  //   route?.params?.productCode,
  //   route?.params?.source,
  // ]);

  const clearCache = useCallback(() => {
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.TransaksiSukses,
      params: {},
    });
  }, [setIsComingFromScreen]);

  useEffect(() => {
    const goTo = () => {
      clearCache()
      setNavigationHome();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [clearCache, setIsComingFromScreen]);

  return (
    <Base
      bgImage={ReferalBg}
      isLight
      statusBarStyle="light-content"
      backgroundColor={Color.referralPage.light.darkOrange}
      onBackPress={() => {
        clearCache();
        navigation.navigate(NAVIGATION.TABMAIN.TabMain);
      }}>
      <ImageBackground
        source={ReferalBg}
        resizeMode="cover"
        imageStyle={style.container}>
        <View style={style.center}>
          <View style={style.mb10}>
            <Image source={BadgeTick} style={style.imgBg} />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30}
            color={Color.main.light.white}>
            {trans(locale, lang, 'selamat')}
          </Text>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30}
            color={Color.main.light.white}>
            {trans(locale, lang, 'polisKamuSudahAktif')}
          </Text>
        </View>

        <View style={style.cardOne.container}>
          <View style={[style.center]}>
            {route?.params?.productCode === codeLifesaver.lifesaver.planCode ? (
              <Image source={LifeSaverLogoFull} style={style.lifeSaverLogo} />
            ) : null}
            {route?.params?.productCode ===
            codeLifesaver.lifesaverplus.planCode ? (
              <Image
                source={LifeSAVERplusActive}
                style={style.lifeSAVERplusActive}
              />
            ) : null}
            {route?.params?.productCode ===
            codeLifesaver.lifesaverpos.planCode ? (
              <Image
                source={LogoLifesaverPosSuccess}
                style={style.lifeSaverPOS}
              />
            ) : null}

            {route?.params?.upgrade ? (
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={30}
                color={Color.main.light.black}>
                {trans(locale, lang, 'upgradePaketBerhasil')}
              </Text>
            ) : (
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={30}
                color={Color.main.light.black}>
                {trans(locale, lang, 'proteksiKamuAkanBerlaku')}
              </Text>
            )}
          </View>
          <View style={style.dateContainer}>
            <View style={style.dateTextContainer}>
              {remainingSecMedical !== 0 && !immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.referralPage.light.darkOrange}>
                  {dateFormat(moment(), remainingSecMedical)}
                </Text>
              ) : null}
              {!remainingSecMedical && immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.referralPage.light.darkOrange}>
                  {dateFormat(moment(), 86400)}
                </Text>
              ) : null}
              {remainingSecMedical === 0 && !immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.greenActive.light.color}>
                  {trans(locale, lang, 'langsungAkif')}
                </Text>
              ) : null}
              <Text
                size={Size.text.body2.size}
                line={22}
                color={Color.neutral.light.neutral40}>
                {trans(locale, lang, 'untukBiayaPengobatan')}
              </Text>
            </View>
            <View style={style.verticalDivider} />
            <View style={style.dateTextContainer}>
              {remainingSecSport !== 0 && !immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.referralPage.light.darkOrange}>
                  {dateFormat(moment(), remainingSecSport)}
                </Text>
              ) : null}
              {!remainingSecSport && immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.referralPage.light.darkOrange}>
                  {dateFormat(moment(), 432000)}
                </Text>
              ) : null}
              {remainingSecSport === 0 && !immediateActive ? (
                <Text
                  textStyle="bold"
                  size={Size.text.body2.size}
                  line={22}
                  color={Color.greenActive.light.color}>
                  {trans(locale, lang, 'langsungAkif')}
                </Text>
              ) : null}
              <Text
                size={Size.text.body2.size}
                line={22}
                color={Color.neutral.light.neutral40}>
                {trans(locale, lang, 'untukCederaOlahraga')}
              </Text>
            </View>
          </View>

          <View style={[style.statusContainer]}>
            <Text
              textStyle="bold"
              size={Size.text.body2.size}
              color={Color.greenActive.light.color}>
              {trans(locale, lang, 'langsungAkif')}
            </Text>
            <Text
              size={Size.text.body2.size}
              color={Color.neutral.light.neutral40}>
              {trans(locale, lang, 'untukMeninggalDunia')}
            </Text>
          </View>

          {route?.params?.upgrade && (
            <LinearGradient
              useAngle
              angle={179}
              colors={[
                Color.tableHeader.light.activeA1,
                Color.tableHeader.light.activeA2,
              ]}
              style={[style.upgradeContainer]}>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                color={Color.main.light.white}>
                {trans(locale, lang, 'selamaMasaTunggu')}
              </Text>
            </LinearGradient>
          )}
        </View>

        <View style={style.shareContainer}>
          <View style={style.shareContainerWrapper}>
            <View style={style.shareContentContainer}>
              <Image source={KadoRedSuccess} style={style.kadoImage} />
              <View style={style.fxShrink}>
                <Text
                  textStyle="bold"
                  size={Size.text.body1.size}
                  line={22}
                  color={Color.main.light.dark}>
                  {trans(locale, lang, 'sharingIsCaring')}
                </Text>
                <Text
                  size={Size.text.body2.size}
                  color={Color.neutral.light.neutral40}
                  style={style.fxShrink}>
                  {trans(locale, lang, 'ayoBerbagiProteksi')}
                </Text>
              </View>
            </View>
            <Button
              type="linear-gradient"
              title={trans(locale, lang, 'ajakTeman')}
              onPress={() => {
                navigation.navigate(NAVIGATION.INVITATION.InvitationMain);
              }}>
              <Text textStyle="semi" color={Color.whiteCard.light.color}>
                {trans(locale, lang, 'ajakTeman')}
              </Text>
            </Button>
          </View>
        </View>
        <View style={style.detailPolis}>
          <TouchableWithoutFeedback
            onPress={() => {
              clearCache();
              setNavigationHome();
            }}>
            <Text
              textStyle="semi"
              color={Color.whiteCard.light.color}
              textDecorationLine="underline">
              {trans(locale, lang, 'back')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </Base>
  );
}

export default TransaksiSukses;

TransaksiSukses.defaultProps = {
  // lifesaverplus: false,
};

TransaksiSukses.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  // colorScheme: PropTypes.string.isRequired,
  // lifesaverplus: PropTypes.bool,
  // getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  // getPolicyDetailResponse: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};
