import React, { useEffect, useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Alert, ImageBackground } from 'react-native';
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
  GET_POLICY_SELF_DATA_FAILED,
  GET_POLICY_SELF_DATA_SUCCESS,
} from 'ca-module-polis/polisConstant';
import { formatCapitalizeEachWord, formatOrdinal } from 'ca-util/format';
import { ArrowDownGray } from 'ca-config/Svg';
import { LooperGroup2 } from 'ca-config/Image';
import PolisModalError from 'ca-module-polis/components/ModalError';
import { NAVIGATION } from 'ca-util/constant';
import Style from './style';
import locale from './locale';

function PolisDetailData(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicySelfData,
    getPolicySelfDataResponse,
    getPolicySelfDataFailed,
    polisAction,
    setLoading,
    setIsShowModalBadRequest,
  } = props;
  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();
  const [isVisible, setIsVisible] = useState(false);

  moment.locale(lang);

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicySelfData({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicySelfData,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicySelfDataResult(polisAction);
  }, [polisAction, getPolicySelfDataResult]);

  const getPolicySelfDataResult = useCallback(
    (act) => {
      if (act === GET_POLICY_SELF_DATA_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_SELF_DATA_FAILED) {
        setLoading(false);
        if (getPolicySelfDataFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicySelfDataFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }

          if (getPolicySelfDataFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
          // Alert.alert(getPolicySelfDataFailed?.message);
        }
      }
    },
    [
      getPolicySelfDataFailed?.message,
      setIsShowModalBadRequest,
      setLoading,
      setIsVisible,
    ]
  );

  function formatValue(value, key = '') {
    if (!value && value !== false) {
      return '-';
    }
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      if (key.toLowerCase().match('percentage')) {
        return `${value}%`;
      }
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderBeneficiariesInformation(key, value, index) {
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
            <Text
              textStyle="semi"
              size={Size.text.body1.size}
              line={21}
              letterSpacing={0.5}>
              {trans(locale, lang, key)}
            </Text>
          }>
          <View style={[Style.listAccordion.content, Style.ph16]}>
            {Object.entries(value).map(([k, v]) => (
              <View
                key={`${key}${Number(k) + 1}`}
                style={
                  value?.length > 1 && k < value?.length - 1 && Style.mb18
                }>
                <ListAccordion
                  initialExpanded={k === 0}
                  touchableType="opacity"
                  suffixIcon={<ArrowDownGray />}
                  headerContainerStyle={[
                    value?.length > 1 && k < value?.length - 1
                      ? Style.listAccordion.headerContainerStyle
                      : Style.listAccordion.headerContainerStyleActive,
                    value?.length === 1 && [
                      Style.height30,
                      Style.alignItemsCenter,
                    ],
                  ]}
                  headerContainerStyleActive={[
                    Style.listAccordion.headerContainerStyle,
                  ]}
                  header={
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      line={21}
                      letterSpacing={0.5}>
                      {`${trans(locale, lang, 'dataPenerimaManfaat')} ${
                        Number(k) + 1
                      }`}
                    </Text>
                  }>
                  <View style={Style.mt10}>
                    {Object.entries(v).map(([x, y]) => {
                      if (x === 'beneficiariesPercentage') {
                        return (
                          <View key={x} style={Style.dataList.row}>
                            <View style={Style.dataList.col.key}>
                              <Text
                                textStyle="regular"
                                size={Size.text.caption1.size}
                                line={18}
                                letterSpacing={0.5}
                                color={
                                  Color.mediumGray[colorScheme].mediumGray
                                }>
                                {trans(locale, lang, 'menerimaUpSebesar')}
                              </Text>
                            </View>
                            <View style={Style.dataList.col.value}>
                              <Text
                                textStyle="medium"
                                size={Size.text.body2.size}
                                line={21}
                                letterSpacing={0.5}>
                                {formatValue(v.beneficiariesPercentage, x)}
                                {' - '}
                                {formatValue(v.beneficiariesAmount)}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                      if (x === 'beneficiariesAmount') {
                        return null;
                      }
                      return (
                        <View key={x} style={Style.dataList.row}>
                          <View style={Style.dataList.col.key}>
                            <Text
                              textStyle="regular"
                              size={Size.text.caption1.size}
                              line={18}
                              letterSpacing={0.5}
                              color={Color.mediumGray[colorScheme].mediumGray}>
                              {trans(locale, lang, x)}
                            </Text>
                          </View>
                          <View style={Style.dataList.col.value}>
                            <Text
                              textStyle="medium"
                              size={Size.text.body2.size}
                              line={21}
                              letterSpacing={0.5}>
                              {formatValue(y)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ListAccordion>
              </View>
            ))}
          </View>
        </ListAccordion>
      </View>
    );
  }

  function renderListAccordion(key, value, index) {
    if (key === 'beneficiary' && polis?.source !== '001') {
      return Object.entries(value).map(([k, v]) => (
        <View
          key={`${key}${Number(k) + 1}`}
          style={[Style.listAccordion.container, Style.mb32]}>
          <ListAccordion
            initialExpanded={index === 0}
            touchableType="opacity"
            suffixIcon={<ArrowDownGray />}
            headerContainerStyle={Style.listAccordion.headerContainerStyle}
            headerContainerStyleActive={
              Style.listAccordion.headerContainerStyleActive
            }
            header={
              <Text
                textStyle="semi"
                size={Size.text.body1.size}
                line={21}
                letterSpacing={0.5}>
                {`${trans(
                  locale,
                  lang,
                  'ahliWaris'
                )} - ${formatCapitalizeEachWord(
                  formatOrdinal(Number(k) + 1, lang)
                )}`}
              </Text>
            }>
            <View style={Style.listAccordion.content}>
              <View style={Style.dataList.grid}>
                {Object.entries(v).map(([x, y]) => (
                  <View key={x} style={Style.dataList.row}>
                    <View style={Style.dataList.col.key}>
                      <Text
                        textStyle="regular"
                        size={Size.text.caption1.size}
                        line={18}
                        letterSpacing={0.5}
                        color={Color.mediumGray[colorScheme].mediumGray}>
                        {trans(locale, lang, x)}
                      </Text>
                    </View>
                    <View style={Style.dataList.col.value}>
                      <Text
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}>
                        {y ? trans(locale, lang, y) : '-'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ListAccordion>
        </View>
      ));
    }
    if (key === 'beneficiariesInformation' && polis?.source === '002') {
      return renderBeneficiariesInformation(key, value, index);
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
            <Text
              textStyle="semi"
              size={Size.text.body1.size}
              line={21}
              letterSpacing={0.5}>
              {trans(locale, lang, key)}
            </Text>
          }>
          <View style={Style.listAccordion.content}>
            <View style={Style.dataList.grid}>
              {Object.entries(value).map(([k, v]) => {
                if (k === 'insuranceStartDate') {
                  return (
                    <View key={k} style={Style.dataList.row}>
                      <View style={Style.dataList.col.key}>
                        <Text
                          textStyle="regular"
                          size={Size.text.caption1.size}
                          line={18}
                          letterSpacing={0.5}
                          color={Color.mediumGray[colorScheme].mediumGray}>
                          {trans(locale, lang, 'masaBerlakuAsuransi')}
                        </Text>
                      </View>
                      <View style={Style.dataList.col.value}>
                        <Text
                          textStyle="medium"
                          size={Size.text.body2.size}
                          line={21}
                          letterSpacing={0.5}>
                          {formatValue(value.insuranceStartDate)}
                          {' - '}
                          {formatValue(value.insuranceEndDate)}
                        </Text>
                      </View>
                    </View>
                  );
                }
                if (k === 'insuranceEndDate') {
                  return null;
                }
                return (
                  <View key={k} style={Style.dataList.row}>
                    <View style={Style.dataList.col.key}>
                      <Text
                        textStyle="regular"
                        size={Size.text.caption1.size}
                        line={18}
                        letterSpacing={0.5}
                        color={Color.mediumGray[colorScheme].mediumGray}>
                        {trans(locale, lang, k)}
                      </Text>
                    </View>
                    <View style={Style.dataList.col.value}>
                      <Text
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}>
                        {formatValue(v)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ListAccordion>
      </View>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {_.isEmpty(getPolicySelfDataResponse?.data) ? null : (
          <View style={[Style.container]}>
            {Object.entries(getPolicySelfDataResponse?.data).map(
              ([key, value], index) => {
                return renderListAccordion(key, value, index);
              }
            )}
          </View>
        )}
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

export default PolisDetailData;

PolisDetailData.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicySelfData: PropTypes.func.isRequired,
  getPolicySelfDataResponse: PropTypes.objectOf(Object).isRequired,
  getPolicySelfDataFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
};
