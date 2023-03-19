import React, { useEffect, useCallback } from 'react';
import {
  GET_PAYMENT_STATUS_V2_FAILED,
  GET_PAYMENT_STATUS_V2_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import PropTypes from 'prop-types';
import {
  codeLifesaver,
  codeLifesaverPlan,
  NAVIGATION,
  PRODUCT,
} from 'ca-util/constant';
import { useMount } from 'ca-util/common';
import { View } from 'react-native';
import _ from 'lodash';
import { AFLogEvent, AF_SUBSCRIBE } from 'ca-util/AppsFlyer';

function PaymentCheckTrans(props) {
  const {
    navigation,
    setLoading,
    getPaymentStatusv2,
    paymentAction,
    planCode,
    route: { params },
    setLifetagCreateOrder,
    getPaymentStatusv2Response,
    userId,
    setCreateBillParam,
    eventCode,
    refferalCode,
  } = props;

  useMount(() => {
    if (setCreateBillParam?.isSinglePayment || setCreateBillParam?.isProposal) {
      getPaymentStatusv2({
        invoiceId: params?.invoiceId,
        proposalNumber: params?.reffNo,
      });
    }
    if (setCreateBillParam?.isRenewal) {
      getPaymentStatusv2({
        invoiceId: params?.invoiceId,
        policyNumber: params?.reffNo,
      });
    }
    setLoading(true);
  });

  useEffect(() => {
    getPaymentStatusResult(paymentAction);
  });

  const getPaymentStatusResult = useCallback(
    (act) => {
        if (act === GET_PAYMENT_STATUS_V2_SUCCESS) {
          // APPSFLYER LOG - SUBSCRIBE
        
          if (
            setCreateBillParam?.isSinglePayment ||
            setCreateBillParam?.isProposal
          ) {
            AFLogEvent(AF_SUBSCRIBE, {
              af_user_id: userId,
              af_content_id: getPaymentStatusv2Response?.policyNo,
              af_price: codeLifesaverPlan[planCode]?.price,
              af_price: codeLifesaverPlan[planCode]?.price,
              af_product: PRODUCT.LIFESAVER,
              af_plan: codeLifesaverPlan[planCode].params,
              af_event_code: eventCode,
              af_refferal_code: refferalCode,
            });
          }

          if (!_.isEmpty(params?.lifetagParams)) {
            setLifetagCreateOrder(params?.lifetagParams);
          }
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          // navigation callback
          if (params?.callbackReplace) {
            return navigation.replace(params?.callbackReplace, {
              ...params?.callbackParams,
              isSuccessPayment: true,
            });
          }
          if (params?.callback) {
            return navigation.navigate(params?.callback, {
              ...params?.callbackParams,
              isSuccessPayment: true,
            });
          }
          return navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses, {
            policyNo: getPaymentStatusv2Response?.policyNo,
            productCode: planCode,
            source: codeLifesaver.productCode,
            upgrade: false,
            isAlreadyActive: false,
          });
        }
        if (act === GET_PAYMENT_STATUS_V2_FAILED) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          navigation.pop();
        }
    },
    [
      eventCode,
      getPaymentStatusv2Response?.policyNo,
      navigation,
      params?.callback,
      params?.callbackParams,
      params?.callbackReplace,
      params?.lifetagParams,
      planCode,
      setCreateBillParam?.isProposal,
      refferalCode,
      setCreateBillParam?.isSinglePayment,
      setLifetagCreateOrder,
      setLoading,
      userId,
    ]
  );

  return <View />;
}

PaymentCheckTrans.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getPaymentStatusv2: PropTypes.func.isRequired,
  paymentAction: PropTypes.string.isRequired,
  planCode: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setLifetagCreateOrder: PropTypes.func.isRequired,
  getPaymentStatusv2Response: PropTypes.objectOf(Object).isRequired,
  setCreateBillParam: PropTypes.objectOf(Object).isRequired,
  userId: PropTypes.string.isRequired,
  eventCode: PropTypes.string.isRequired,
  refferalCode: PropTypes.string.isRequired,
};

export default PaymentCheckTrans;
