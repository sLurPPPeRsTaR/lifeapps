import { ActivityIndicator, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { CircleCeklisIcon } from 'ca-config/Svg';
import Shadow from 'ca-component-container/Shadow';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import { formatDate } from 'ca-util/format';
import {
  BILLING_STATUS,
  codeLifesaver,
  PAYMENT_METHOD,
} from 'ca-util/constant';
import { formatNumber } from 'ca-util/numbro';
import {
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PaymentsDialog from 'ca-module-payments/PaymentsDialog';
import { GET_BILLS, GET_BILLS_SUCCESS } from 'ca-module-subs/subsConstant';
import locale from './locale';
import style from './style';

function SubsListBilling(props) {
  const {
    navigation,
    colorScheme,
    lang,
    route,
    getBills,
    getBillsResponse,
    subsAction,
  } = props;
  const [paymentVisible, setPaymentVisible] = useState(false);
  const { policyNo, recurring } = route.params;
  const loadDataPerPage = 15;
  const [reqBody, setReqBody] = useState({
    policyNo,
    limit: loadDataPerPage,
    page: 1,
  });
  const [isLoad, setIsLoad] = useState(false);

  const [show, setShow] = useState(false);
  useEffect(() => {
    getBills(reqBody);
  }, [getBills, reqBody]);

  useEffect(() => {
    if (subsAction === GET_BILLS) {
      setIsLoad(true);
    }
    if (subsAction === GET_BILLS_SUCCESS) {
      setTimeout(() => {
        setShow(true);
        setIsLoad(false);
      }, 1000);
    }
  }, [subsAction]);

  function renderBillItem({ item }) {
    return (
      <Shadow key={item?.id} borderRadius={16} style={style.billing.shadow}>
        <View style={style.billing.list}>
          <View>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {formatDate(new Date(item?.billDueDate), lang)}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {formatNumber(item?.amount, lang)}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (
                item?.status === BILLING_STATUS.unpaid &&
                recurring === PAYMENT_METHOD.nonrecurring
              ) {
                setPaymentVisible(true);
              }
            }}>
            <View style={style.billing.rightListContent}>
              {item?.status === BILLING_STATUS.paid ? (
                <CircleCeklisIcon />
              ) : null}
              <Text
                textStyle="semi"
                style={style.ml5}
                color={
                  // eslint-disable-next-line no-nested-ternary
                  item?.status === BILLING_STATUS.paid
                    ? Color.greenActive[colorScheme].color
                    : item?.status === BILLING_STATUS.unpaid &&
                      recurring === PAYMENT_METHOD.recurring
                    ? Color.neutralLifeSaver[colorScheme].neutral60
                    : Color.red[colorScheme].red90
                }>
                {recurring === PAYMENT_METHOD.recurring &&
                item?.status === BILLING_STATUS.unpaid
                  ? trans(locale, lang, 'belumBayar')
                  : trans(locale, lang, 'lunas')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Shadow>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'tagihan')}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      isWrapScrollView={false}
      bordered
      onBackPress={() => {
        navigation.goBack();
      }}>
      {show ? (
        <Padder style={style.billing.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getBillsResponse?.data.billings}
            renderItem={renderBillItem}
            keyExtractor={(item) => item?.billDueDate}
            onEndReached={() => {
              if (getBillsResponse?.totalPages > 1) {
                setReqBody({
                  ...reqBody,
                  limit: reqBody?.limit + loadDataPerPage,
                });
              }
            }}
          />
          {isLoad && show ? (
            <ActivityIndicator
              color={Color.primary[colorScheme].primary90}
              size="large"
            />
          ) : null}
        </Padder>
      ) : (
        <View style={style.activtyIndicator}>
          <ActivityIndicator
            color={Color.primary[colorScheme].primary90}
            size="large"
          />
        </View>
      )}

      <PaymentsDialog
        onSelected={() => {
          setPaymentVisible(false);
        }}
        onClosePress={() => {
          setPaymentVisible(false);
        }}
        isVisible={paymentVisible}
      />
    </Base>
  );
}

SubsListBilling.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getBills: PropTypes.func.isRequired,
  getBillsResponse: PropTypes.objectOf(Object).isRequired,
  subsAction: PropTypes.string.isRequired,
};
export default SubsListBilling;
