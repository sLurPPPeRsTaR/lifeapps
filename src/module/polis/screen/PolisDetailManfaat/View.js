import React, { useEffect, useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Alert, ImageBackground, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import ListAccordion from 'ca-component-card/ListAccordion';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';
import { formatCurrency } from 'ca-util/numbro';
import { useIsFocused } from '@react-navigation/native';
import {
  GET_POLICY_BENEFIT_FAILED,
  GET_POLICY_BENEFIT_SUCCESS,
} from 'ca-module-polis/polisConstant';
import { ArrowDownGray, Secure } from 'ca-config/Svg';
import Shadow from 'ca-component-container/Shadow';
import PolisModalError from 'ca-module-polis/components/ModalError';
import Padder from 'ca-component-container/Padder';
import { LooperGroup2, LooperGroupGreen } from 'ca-config/Image';
import { NAVIGATION } from 'ca-util/constant';
import Style from './style';
import locale from './locale';

function PolisDetailManfaat(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicyBenefit,
    getPolicyBenefitResponse,
    getPolicyBenefitFailed,
    polisAction,
    setLoading,
    setIsShowModalBadRequest,
  } = props;

  const keyTextProps = {
    textStyle: 'regular',
    size: Size.text.caption1.size,
    line: 18,
    letterSpacing: 0.5,
    color: Color.mediumGray[colorScheme].mediumGray,
  };
  const valueTextProps = {
    textStyle: 'medium',
    size: Size.text.body2.size,
    line: 21,
    letterSpacing: 0.5,
  };

  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);

  moment.locale(lang);

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicyBenefit({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicyBenefit,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicyBenefitResult(polisAction);
  }, [polisAction, getPolicyBenefitResult]);

  const getPolicyBenefitResult = useCallback(
    (act) => {
      if (act === GET_POLICY_BENEFIT_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_BENEFIT_FAILED) {
        setLoading(false);
        if (getPolicyBenefitFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicyBenefitFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }
          if (getPolicyBenefitFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
        }
      }
    },
    [
      getPolicyBenefitFailed?.message,
      setIsShowModalBadRequest,
      setLoading,
      setIsVisible,
    ]
  );

  function formatValue(value) {
    const regexNumber = /^[0-9]*$/;
    if (!value && value !== false) {
      return '-';
    }
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderListAccordion(key, value, index) {
    if (String(key).match('additionAssurance')) {
      return renderAdditionAssuranceAccordion(value);
    }
    if (String(key).match('medicalLimit')) {
      return renderMedicalLimitAccordion(value, index);
    }
    if (String(key).match('sumAssuredSection')) {
      return renderSumAssuredSection(value);
    }
    if (String(key).match('premiSection')) {
      return renderPremiSection(value);
    }
    return (
      <View key={key} style={[Style.listAccordion.container, Style.mb32]}>
        <ListAccordion
          initialExpanded={index === 0}
          touchableType="opacity"
          suffixIcon={<ArrowDownGray />}
          headerContainerStyle={Style.listAccordion.headerContainerStyle}
          headerContainerStyleActive={
            Style.listAccordion.headerContainerStyleActive
          }
          header={
            <Text textStyle="semi" size={Size.text.body1.size} line={21}>
              {trans(locale, lang, key)}
            </Text>
          }>
          <View style={Style.listAccordion.content}>
            <View style={Style.dataList.grid}>
              {Object.entries(value).map(([k, v]) => (
                <View key={k} style={Style.dataList.row}>
                  <View style={Style.dataList.col.key}>
                    <Text
                      textStyle="regular"
                      size={Size.text.caption1.size}
                      line={18}
                      color={Color.mediumGray[colorScheme].mediumGray}>
                      {trans(locale, lang, k)}
                    </Text>
                  </View>
                  <View style={Style.dataList.col.value}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      line={21}>
                      {formatValue(v)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ListAccordion>
      </View>
    );
  }

  function renderAdditionAssuranceAccordion(value) {
    return Object.entries(value).map(([k, v]) => (
      <View key={k} style={[Style.listAccordion.container, Style.mb32]}>
        <ListAccordion
          touchableType="opacity"
          suffixIcon={<ArrowDownGray />}
          headerContainerStyle={Style.listAccordion.headerContainerStyle}
          headerContainerStyleActive={
            Style.listAccordion.headerContainerStyleActive
          }
          header={
            <Text textStyle="semi" size={Size.text.body1.size} line={21}>
              {`${trans(locale, lang, 'additionAssurance')} - ${Number(k) + 1}`}
            </Text>
          }>
          <View style={Style.listAccordion.content}>
            <View style={Style.dataList.grid}>
              {Object.entries(v).map(([x, y]) => (
                <View key={x} style={Style.dataList.row}>
                  <View style={Style.dataList.col.key}>
                    <Text {...keyTextProps}>{trans(locale, lang, x)}</Text>
                  </View>
                  <View style={Style.dataList.col.value}>
                    <Text {...valueTextProps}>{formatValue(y)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ListAccordion>
      </View>
    ));
  }

  function renderMedicalLimitAccordion(value, index) {
    return (
      <ListAccordion
        initialExpanded={index === 0}
        touchableType="opacity"
        suffixIcon={<ArrowDownGray />}
        headerContainerStyle={Style.listAccordion.headerContainerStyle}
        headerContainerStyleActive={
          Style.listAccordion.headerContainerStyleActive
        }
        header={
          <Text textStyle="semi" size={Size.text.body1.size} line={21}>
            {trans(locale, lang, 'manfaatProteksi')}
          </Text>
        }>
        <Shadow animated borderRadius={30}>
          <Padder style={Style.pv24}>
            {Object.entries(value).map(([k, v]) => {
              if (k === 'totalMedicalLimitReimburse') {
                const header = (
                  <View key={k} style={Style.flexDirectionRow}>
                    <Secure style={[Style.me8, Style.mt2]} />
                    <View style={Style.dataList.row}>
                      <View style={Style.dataList.col.key}>
                        <Text
                          textStyle="regular"
                          size={Size.text.caption1.size}
                          line={18}
                          color={Color.mediumGray[colorScheme].mediumGray}>
                          {trans(locale, lang, k)}
                        </Text>
                      </View>
                      <View style={Style.dataList.col.value}>
                        <Text
                          textStyle="semi"
                          size={Size.text.body2.size}
                          line={21}
                          color={Color.primary[colorScheme].primary90}>
                          {formatValue(v)}
                          <Text
                            textStyle="regular"
                            size={Size.text.caption1.size}
                            line={28}
                            color={Color.mediumGray.light.mediumGray}>
                            {' /'}
                            {trans(locale, lang, 'kejadian')}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                );
                return (
                  <ListAccordion
                    touchableType="opacity"
                    suffixIcon={<ArrowDownGray />}
                    headerContainerStyle={[Style.pv0, Style.ph0]}
                    header={header}>
                    <View style={[Style.ps26]}>
                      {!_.isEmpty(value.totalMedicalLimitReimburseArray) ? (
                        <Text
                          textStyle="medium"
                          size={Size.text.body2.size}
                          line={21}
                          color={Color.mediumGray[colorScheme].mediumGray}
                          style={Style.mb8}>
                          {trans(locale, lang, 'dengan')}
                          <Text
                            textStyle="regular"
                            fontStyle="italic"
                            color={Color.primary[colorScheme].primary90}>
                            {trans(locale, lang, 'innerLimit')}
                          </Text>
                          {trans(locale, lang, 'sebagaiBerikut')}
                        </Text>
                      ) : null}
                      <View style={Style.ps12}>
                        {Object.entries(
                          value.totalMedicalLimitReimburseArray
                        ).map(([arrK, arrV]) => {
                          return (
                            <View key={arrK} style={Style.dataList.row}>
                              <View style={Style.dataList.col.key}>
                                <Text
                                  textStyle="regular"
                                  size={Size.text.caption1.size}
                                  line={18}
                                  color={
                                    Color.mediumGray[colorScheme].mediumGray
                                  }>
                                  {trans(locale, lang, arrV.reimburseName)}
                                </Text>
                              </View>
                              <View style={Style.dataList.col.value}>
                                <Text
                                  textStyle="semi"
                                  size={Size.text.body2.size}
                                  line={21}
                                  color={Color.primary[colorScheme].primary90}>
                                  {formatValue(arrV.reimburseValue)}
                                </Text>
                              </View>
                              {arrV.reimburseName === 'RAWAT INAP' ? (
                                <Text
                                  textStyle="regular"
                                  fontStyle="italic"
                                  size={Size.text.caption1.size}
                                  line={18}
                                  color={Color.primary.light.primary90}>
                                  {trans(locale, lang, 'maksKamarTermurah')}
                                </Text>
                              ) : null}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </ListAccordion>
                );
              }
              if (k === 'promo') {
                if (_.isEmpty(v)) {
                  return null;
                }
                return (
                  <View key={k} style={[Style.mt10, Style.flexShrink1]}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      line={18}
                      color={Color.mediumGray[colorScheme].mediumGray}
                      style={[Style.mb8, Style.flexShrink1]}>
                      {trans(locale, lang, 'manfaatTambahanSelama')}
                    </Text>
                    {Object.entries(v).map(([x, y]) => {
                      return (
                        <View
                          key={x}
                          style={[Style.flexDirectionRow, Style.flexShrink1]}>
                          <Secure style={[Style.me8, Style.mt2]} />
                          <View style={[Style.dataList.row, Style.flexShrink1]}>
                            <View
                              style={[
                                Style.dataList.col.key,
                                Style.promoContainer,
                              ]}>
                              <Text
                                textStyle="regular"
                                size={Size.text.caption1.size}
                                line={22}
                                color={Color.mediumGray[colorScheme].mediumGray}
                                style={Style.flexShrink1}>
                                {trans(locale, lang, y.promoName)}{' '}
                              </Text>
                              <View
                                style={[Style.promoBadge, Style.flexShrink1]}>
                                <Text
                                  textStyle="bold"
                                  size={Size.text.caption1.size}
                                  line={18}
                                  color={Color.main.light.white}
                                  style={Style.flexShrink1}>
                                  {trans(locale, lang, 'promo')}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={[
                                Style.dataList.col.value,
                                Style.flexShrink1,
                              ]}>
                              {y.promoValue !== true ? (
                                <Text
                                  textStyle="semi"
                                  size={Size.text.body2.size}
                                  line={21}
                                  color={Color.primary[colorScheme].primary90}
                                  style={Style.flexShrink1}>
                                  {formatValue(y.promoValue)}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              }
              if (k === 'totalMedicalLimitReimburseArray') {
                return null;
              }
              return (
                <View key={k} style={Style.flexDirectionRow}>
                  <Secure style={[Style.me8, Style.mt2]} />
                  <View style={Style.dataList.row}>
                    <View style={Style.dataList.col.key}>
                      <Text
                        textStyle="regular"
                        size={Size.text.caption1.size}
                        line={18}
                        color={Color.mediumGray[colorScheme].mediumGray}>
                        {trans(locale, lang, k)}
                      </Text>
                    </View>
                    <View style={Style.dataList.col.value}>
                      <Text
                        textStyle="semi"
                        size={Size.text.body2.size}
                        line={21}
                        color={Color.primary[colorScheme].primary90}>
                        {formatValue(v)}
                        {k === 'totalMedicalLimitCashless' ? (
                          <Text
                            textStyle="regular"
                            size={Size.text.caption1.size}
                            line={28}
                            color={Color.mediumGray.light.mediumGray}>
                            {' /'}
                            {trans(locale, lang, 'kejadian')}
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </Padder>
        </Shadow>
      </ListAccordion>
    );
  }

  function renderSumAssuredSection(value) {
    return (
      <View style={Style.mb(16)}>
        <Text
          textStyle="medium"
          size={Size.text.body1.size}
          color={Color.neutral.light.neutral60}
          style={Style.mb(14)}>
          {trans(locale, lang, 'totalUangPerlindungan')}
        </Text>
        <Shadow borderRadius={16}>
          <View style={Style.p(13)}>
            <Text
              textStyle="semi"
              size={Size.text.h5.size}
              align="center"
              color={Color.greenActive.light.color}>
              {formatValue(value?.value)}
            </Text>
          </View>
          <Image source={LooperGroupGreen} style={Style.looperGroupGreen} />
        </Shadow>
      </View>
    );
  }

  function renderPremiSection(value) {
    return (
      <View style={Style.mb(16)}>
        <Text
          textStyle="medium"
          size={Size.text.body1.size}
          color={Color.neutral.light.neutral60}
          style={Style.mb(14)}>
          {trans(locale, lang, 'premiPerbulan')}
        </Text>
        <Shadow borderRadius={16}>
          <View style={Style.p(13)}>
            <Text
              textStyle="semi"
              size={Size.text.h5.size}
              align="center"
              color={Color.greenActive.light.color}>
              {formatValue(value?.value)}
            </Text>
          </View>
          <Image source={LooperGroupGreen} style={Style.looperGroupGreen} />
        </Shadow>
      </View>
    );
  }

  function renderLifeCoverBenefit() {
    if (polis?.source !== '002') {
      return null;
    }
    if (_.isEmpty(getPolicyBenefitResponse?.data)) {
      return null;
    }
    return (
      <Padder>
        <View style={Style.mb(16)}>
          <Shadow borderRadius={16}>
            <ListAccordion
              touchableType="opacity"
              suffixIcon={<ArrowDownGray />}
              header={
                <View style={Style.flexDirectionRow}>
                  <Secure style={[Style.me8, Style.mt2]} />
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    line={21}
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.flexShrink1}>
                    {trans(locale, lang, 'manfaatMeninggalDunia')}
                  </Text>
                </View>
              }>
              <Padder style={Style.pb(16)}>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  line={18}
                  color={Color.mediumGray.light.mediumGray}
                  style={Style.mb(6)}>
                  {trans(locale, lang, 'apabilaTertanggungMeninggal')}{' '}
                  {trans(locale, lang, 'penanggungAkanMembayarkan')}
                </Text>
                <View style={[Style.flexDirectionRow, Style.mb(6)]}>
                  <Text
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.mh(6)}>
                    {'\u2022'}
                  </Text>
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    line={18}
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.flexShrink1}>
                    {trans(locale, lang, 'lifecoverBenefitPoin1')}
                  </Text>
                </View>
                <View style={Style.flexDirectionRow}>
                  <Text
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.mh(6)}>
                    {'\u2022'}
                  </Text>
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    line={18}
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.flexShrink1}>
                    {trans(locale, lang, 'lifecoverBenefitPoin2')}
                  </Text>
                </View>
              </Padder>
            </ListAccordion>
          </Shadow>
        </View>
        <View style={Style.mb(16)}>
          <Shadow borderRadius={16}>
            <ListAccordion
              touchableType="opacity"
              suffixIcon={<ArrowDownGray />}
              header={
                <View style={Style.flexDirectionRow}>
                  <Secure style={[Style.me8, Style.mt2]} />
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    line={21}
                    color={Color.mediumGray.light.mediumGray}
                    style={Style.flexShrink1}>
                    {trans(locale, lang, 'manfaatMeninggalDuniaKarena')}
                  </Text>
                </View>
              }>
              <Padder style={Style.pb(16)}>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  line={21}
                  color={Color.mediumGray.light.mediumGray}>
                  {trans(locale, lang, 'apabilaTertanggungMeninggalDunia')}
                </Text>
              </Padder>
            </ListAccordion>
          </Shadow>
        </View>
      </Padder>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {_.isEmpty(getPolicyBenefitResponse?.data) ? null : (
          <View style={[Style.container]}>
            {Object.entries(getPolicyBenefitResponse?.data).map(
              ([key, value], index) => {
                return renderListAccordion(key, value, index);
              }
            )}
          </View>
        )}
        {renderLifeCoverBenefit()}
      </ScrollView>
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
    </ImageBackground>
  );
}

export default PolisDetailManfaat;

PolisDetailManfaat.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicyBenefit: PropTypes.func.isRequired,
  getPolicyBenefitResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyBenefitFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
};
