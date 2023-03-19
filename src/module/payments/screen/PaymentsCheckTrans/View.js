import React, { useEffect, useState, useCallback } from 'react';
import Base from 'ca-component-container/Base';
import { GET_PAYMENT_STATUS_FAILED } from 'ca-module-payments/paymentsConstant';
import PropTypes from 'prop-types';
import {
  codeLifesaver,
  codeLifesaverPlan,
  NAVIGATION,
  PRODUCT,
} from 'ca-util/constant';
import { useMount } from 'ca-util/common';
import { PaymentsFailed } from 'ca-module-payments/components';
import _ from 'lodash';
import { AFLogEvent, AF_SUBSCRIBE } from 'ca-util/AppsFlyer';

function PaymentCheckTrans(props) {
  const {
    navigation,
    setLoading,
    getPaymentStatus,
    getPaymentStatusResponse,
    paymentAction,
    setCreateBillParam,
    getProductParam,
    planCode,
    inviteeUserId,
    setCreateBillResponse,
    getPaymentStatusError,
    route: { params },
    setLifetagCreateOrder,
    userId,
    eventCode,
    refferalCode,
  } = props;

  const [checkPayment, setCheckPaymet] = useState(false);
  const [numberInterval, setNumberInterval] = useState(0);
  const [paymentFailed, setPaymentFailed] = useState(false);

  useMount(() => {
    setLoading(true);
  });

  const checkPaymentInterval = useCallback(
    // eslint-disable-next-line consistent-return
    (numIn, checkPay) => {
      if (numIn <= 5 && !checkPay) {
        if (params?.isOnlyAddCard) {
          return getPaymentStatus({
            isOnlyAddCard: params?.isOnlyAddCard,
            data: {
              paymentId: setCreateBillResponse?.paymentInfo?.paymentId,
              invoiceId: setCreateBillParam?.invoiceId,
              policyNumber: setCreateBillParam?.reffNo,
            },
          });
        }
        getPaymentStatus({
          invoiceId:
            setCreateBillParam?.invoiceId ||
            setCreateBillParam?.data?.invoiceId,
          reffNo:
            setCreateBillParam?.reffNo || setCreateBillParam?.data?.reffNo,
          inviteeUserId: inviteeUserId || '',
          eventCode: setCreateBillParam?.eventCode,
          paymentId: setCreateBillResponse?.paymentInfo?.paymentId,
        });
      }
    },
    [
      getPaymentStatus,
      inviteeUserId,
      params,
      setCreateBillParam,
      setCreateBillResponse,
    ]
  );

  useEffect(() => {
    checkPaymentInterval(numberInterval, checkPayment);
  }, [checkPayment, checkPaymentInterval, numberInterval]);

  useEffect(() => {
    if (getPaymentStatusResponse?.status === 'success') {
      // APPSFLYER LOG - SUBSCRIBE
      if (!params?.isOnlyAddCard) {
        AFLogEvent(AF_SUBSCRIBE, {
          af_user_id: userId,
          af_content_id: getPaymentStatusResponse?.policyNo,
          af_price: codeLifesaverPlan[planCode].price,
          af_product: PRODUCT.LIFESAVER,
          af_plan: codeLifesaverPlan[planCode].params,
          af_event_code: eventCode,
          af_refferal_code: refferalCode,
        });
      }
      setTimeout(() => {
        setLoading(false);
        setCheckPaymet(true);
        if (!_.isEmpty(params?.lifetagParams)) {
          setLifetagCreateOrder(params?.lifetagParams);
        }
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
          policyNo: getPaymentStatusResponse?.policyNo,
          productCode: planCode,
          source: codeLifesaver.productCode,
          upgrade: false,
          isAlreadyActive: setCreateBillParam?.amount === 0,
        });
      }, 2000);
    }
    if (getPaymentStatusResponse?.status === 'failed') {
      setLoading(false);
      setCheckPaymet(true);
      setPaymentFailed(true);
    }
    if (getPaymentStatusResponse?.status === 'waiting') {
      setTimeout(() => {
        setNumberInterval(numberInterval + 1);
      }, 2000);
      if (numberInterval > 5) {
        setLoading(false);
        setPaymentFailed('timeout');
      }
    }
  }, [
    eventCode,
    getPaymentStatusResponse,
    getProductParam,
    navigation,
    numberInterval,
    params,
    planCode,
    refferalCode,
    setCreateBillParam,
    setLifetagCreateOrder,
    setLoading,
    userId,
  ]);

  useEffect(() => {
    if (paymentAction === GET_PAYMENT_STATUS_FAILED) {
      setLoading(false);
      setCheckPaymet(true);
      setPaymentFailed(getPaymentStatusError?.message);
    }
  }, [
    getPaymentStatusError?.message,
    getProductParam,
    navigation,
    paymentAction,
    setLoading,
  ]);

  return (
    <Base>
      <PaymentsFailed
        {...props}
        onBackPress={() => {
          navigation.pop();
        }}
        errorCode={paymentFailed}
        isVisible={paymentFailed}
        navigation={navigation}
      />
    </Base>
  );
}

PaymentCheckTrans.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getPaymentStatus: PropTypes.func.isRequired,
  paymentAction: PropTypes.string.isRequired,
  setCreateBillParam: PropTypes.objectOf(Object).isRequired,
  getProductParam: PropTypes.string.isRequired,
  getPaymentStatusResponse: PropTypes.objectOf(Object).isRequired,
  inviteeUserId: PropTypes.string.isRequired,
  planCode: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getAddCardStatus: PropTypes.func.isRequired,
  setCreateBillResponse: PropTypes.objectOf(Object).isRequired,
  getPaymentStatusError: PropTypes.string.isRequired,
  setLifetagCreateOrder: PropTypes.func.isRequired,
  eventCode: PropTypes.string.isRequired,
  refferalCode: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PaymentCheckTrans;
