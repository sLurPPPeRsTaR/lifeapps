import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import ListAccordion from 'ca-component-card/ListAccordion';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';
import { formatCurrency } from 'ca-util/numbro';
import { useIsFocused } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import {
  GET_POLICY_FUNDS_FAILED,
  GET_POLICY_FUNDS_SUCCESS,
} from 'ca-module-polis/polisConstant';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import { ArrowDownGray, Attention1 } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import { LooperGroup2 } from 'ca-config/Image';
import PolisModalError from 'ca-module-polis/components/ModalError';
import locale from './locale';
import Style from './style';

function PolisDetailDana(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicyFunds,
    getPolicyFundsResponse,
    getPolicyFundsFailed,
    polisAction,
    setLoading,
    setIsShowModalBadRequest,
  } = props;
  const polis = params?.polis;

  const isExecuted = useRef(false);
  const isFocused = useIsFocused();

  const [isJiborModalVisible, setIsJiborModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const keyTextProps = {
    textStyle: 'regular',
    size: Size.text.caption1.size,
    line: 18,
    letterSpacing: 0.5,
  };
  const valueTextProps = {
    textStyle: 'medium',
    size: Size.text.body2.size,
    line: 21,
    letterSpacing: 0.5,
  };

  moment.locale(lang);

  useEffect(() => {
    if (!isExecuted.current && isFocused) {
      getPolicyFunds({
        policyNo: polis.policyNo || polis.oldPolicyNo,
        productCode: polis.productCode,
        source: polis.source,
      });
      setLoading(true);
      isExecuted.current = true;
    }
  }, [
    getPolicyFunds,
    isFocused,
    polis.oldPolicyNo,
    polis.policyNo,
    polis.productCode,
    polis.source,
    setLoading,
  ]);

  useEffect(() => {
    getPolicyFundsResult(polisAction);
  }, [polisAction, getPolicyFundsResult]);

  const getPolicyFundsResult = useCallback(
    (act) => {
      if (act === GET_POLICY_FUNDS_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_POLICY_FUNDS_FAILED) {
        setLoading(false);
        if (getPolicyFundsFailed?.message !== 'INTERNAL_SERVER_ERROR') {
          if (getPolicyFundsFailed?.message === 'BAD_REQUEST') {
            setIsShowModalBadRequest(true);
            return;
          }
          if (getPolicyFundsFailed?.message === 'POLICY_NOT_LINKED') {
            setIsVisible(true);
            return;
          }
        }
      }
    },
    [getPolicyFundsFailed?.message, setIsShowModalBadRequest, setLoading]
  );

  function formatValue(key, value) {
    const regexNumber = /^[0-9]*$/;
    // Money
    if (!Number.isNaN(value) && Number.isFinite(value)) {
      if (key.toLowerCase().match('percentage')) {
        return `${value}%`;
      }
      if (key === 'balanceUnit') {
        return `${formatCurrency({ value, mantissa: 4 })}`;
      }
      if (key === 'priceUnit') {
        return `Rp ${formatCurrency({ value, mantissa: 4 })}`;
      }
      return `Rp ${formatCurrency({ value })}`;
    }
    // Date
    if (!regexNumber.test(value) && moment(value, true).isValid()) {
      return moment(value, true).format('DD MMMM YYYY');
    }
    return value;
  }

  function renderListAccordion(key, value) {
    if (key === 'issue') {
      // if (value.isIssue !== false && !_.isEmpty(value.reason)) {
      //   const gagalMelakukanTransferDana = trans(
      //     locale,
      //     lang,
      //     'gagalMelakukanTransferDana'
      //   );

      //   const reasonCustomerCareList = ['IS11', 'IS13', 'IS14', 'IS15'];
      //   const isReasonCustomerCare = reasonCustomerCareList.some((v) => {
      //     return value.reason.includes(v);
      //   });

      //   let karena = '';
      //   if (!isReasonCustomerCare) {
      //     const dueToList = ['IS02', 'IS03', 'IS04', 'IS05'];
      //     const isDueToList = dueToList.some((v) => {
      //       return value.reason[0].includes(v);
      //     });
      //     karena = trans(locale, lang, !isDueToList ? 'karena1' : 'karena2');
      //   } else {
      //     karena = '.';
      //   }

      //   let reasonText = '';
      //   if (!isReasonCustomerCare) {
      //     reasonText = value.reason.map((item) => {
      //       return trans(locale, lang, item);
      //     });
      //   } else {
      //     reasonText = trans(locale, lang, 'IS11');
      //   }

      //   return (
      //     <View style={{ marginBottom: 16 }}>
      //       <AlertDialogue
      //         title={`${gagalMelakukanTransferDana}${karena}${reasonText}.`}
      //         type="error"
      //         leftIcon={false}
      //       />
      //     </View>
      //   );
      // }
      if (value.isIssue !== false) {
        const gagalMelakukanTransferDana = trans(
          locale,
          lang,
          'gagalMelakukanTransferDana'
        );
        const karena = '.';
        const reasonText = trans(locale, lang, 'IS11');
        return (
          <View style={Style.mb16}>
            <AlertDialogue
              title={`${gagalMelakukanTransferDana}${karena}${reasonText}.`}
              type="error"
              leftIcon={false}
            />
          </View>
        );
      }
      return null;
    }
    if (key === 'funds') {
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
              <Text
                textStyle="semi"
                size={Size.text.body1.size}
                line={21}
                letterSpacing={0.5}>
                {`${v.allocationFundsPercentage}% - ${v.allocationFundsName}`}
              </Text>
            }>
            <View style={Style.listAccordion.content}>
              <View style={Style.dataList.grid}>
                {Object.entries(v).map(([x, y]) => {
                  if (
                    x !== 'allocationFundsPercentage' &&
                    x !== 'allocationFundsName'
                  ) {
                    return (
                      <View key={x} style={Style.dataList.row}>
                        <View style={Style.dataList.col.key}>
                          <Text {...keyTextProps}>
                            {trans(locale, lang, x)}
                          </Text>
                        </View>
                        <View style={Style.dataList.col.value}>
                          <Text {...valueTextProps}>{formatValue(x, y)}</Text>
                        </View>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          </ListAccordion>
        </View>
      ));
    }
    if (key === 'phasedBenefit') {
      return (
        <View key={key} style={[Style.listAccordion.container, Style.mb32]}>
          <ListAccordion
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
                {/* <TouchableOpacity
                  style={Style.dataList.detail}
                  onPress={() => {
                    navigation.navigate(NAVIGATION.POLICY.PolisKlaimProgress);
                  }}>
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    line={23.8}
                    letterSpacing={0.5}
                    textDecorationLine="underline"
                    color={Color.primary.light.primary90}>
                    {trans(locale, lang, 'Detail Status')}
                  </Text>
                </TouchableOpacity> */}
                {Object.entries(value).map(([k, v]) => {
                  let statusTextColor;
                  statusTextColor = Color.grayTitleButton.light.grayTitleButton;
                  if (v.phasedBenefitStatus === 'GAGAL') {
                    statusTextColor = Color.primary.light.primary90;
                  }
                  if (v.phasedBenefitStatus === 'SELESAI') {
                    statusTextColor = Color.badgeGreen.light.badgeGreen80;
                  }
                  return (
                    <View key={k} style={Style.dataList.rowRow}>
                      <View style={Style.dataList.col.key}>
                        <Text
                          {...keyTextProps}
                          color={
                            v.phasedBenefitStatus === 'GAGAL'
                              ? Color.primary.light.primary90
                              : Color.mediumGray[colorScheme].mediumGray
                          }>
                          {formatValue(k, v.phasedBenefitDate)}
                        </Text>
                      </View>
                      <View style={Style.dataList.col.valueRow}>
                        <Text
                          {...valueTextProps}
                          align="right"
                          color={statusTextColor}>
                          {formatValue(k, v.phasedBenefitValue)}
                        </Text>
                        {v.phasedBenefitFlag === 'JIBOR' ? (
                          <TouchableOpacity
                            onPress={() => setIsJiborModalVisible(true)}>
                            <Attention1
                              style={Style.ms4}
                              fill={Color.secondary.light.secondary100}
                            />
                          </TouchableOpacity>
                        ) : null}
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
    if (key === 'benefitAnuitas') {
      return (
        <View key={key} style={[Style.listAccordion.container, Style.mb32]}>
          <ListAccordion
            initialExpanded={
              Object.keys(getPolicyFundsResponse?.data).length === 1
            }
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
                  return (
                    <View key={k} style={Style.dataList.rowRow}>
                      <View style={Style.dataList.col.key}>
                        <Text
                          {...keyTextProps}
                          color={Color.mediumGray[colorScheme].mediumGray}>
                          {trans(locale, lang, k)}
                        </Text>
                      </View>
                      <View style={Style.dataList.col.valueRow}>
                        <Text
                          {...valueTextProps}
                          color={Color.mediumGray[colorScheme].mediumGray}
                          align="right">
                          {formatValue(k, v)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
            <AlertDialogue
              leftIcon
              type="warning"
              title={trans(locale, lang, 'manfaatUntukJanda')}
              style={Style.mt16}
            />
          </ListAccordion>
        </View>
      );
    }
    return (
      <View key={key} style={[Style.listAccordion.container, Style.mb32]}>
        <ListAccordion
          initialExpanded
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
              {Object.entries(value).map(([k, v]) => (
                <View key={k} style={Style.dataList.row}>
                  <View style={Style.dataList.col.key}>
                    <Text {...keyTextProps}>{trans(locale, lang, k)}</Text>
                  </View>
                  <View style={Style.dataList.col.value}>
                    <Text {...valueTextProps}>{formatValue(key, v)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ListAccordion>
      </View>
    );
  }

  function renderJiborModal() {
    return (
      <BottomSheet
        isVisible={isJiborModalVisible}
        swipeable={false}
        title={trans(locale, lang, 'informasiJibor')}
        leftTitle
        onClosePress={() => setIsJiborModalVisible(false)}>
        <View>
          <Text
            textStyle="regular"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}>
            {trans(locale, lang, 'belumTermasukPengembangan')}
          </Text>
        </View>
      </BottomSheet>
    );
  }

  return (
    <ImageBackground
      source={LooperGroup2}
      resizeMode="cover"
      style={Style.imageBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {_.isEmpty(getPolicyFundsResponse?.data) ? null : (
          <View style={[Style.container]}>
            {Object.entries(getPolicyFundsResponse?.data).map(
              ([key, value]) => {
                return renderListAccordion(key, value);
              }
            )}
          </View>
        )}
        {renderJiborModal()}
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

export default PolisDetailDana;

PolisDetailDana.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicyFunds: PropTypes.func.isRequired,
  getPolicyFundsResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyFundsFailed: PropTypes.objectOf(Object).isRequired,
  polisAction: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
};
