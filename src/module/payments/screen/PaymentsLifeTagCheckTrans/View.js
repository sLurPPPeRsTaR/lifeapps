import React, { useEffect, useState, useCallback } from 'react';
import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import { useMount } from 'ca-util/common';
import { PaymentsFailed } from 'ca-module-payments/components';
import Splash from 'ca-component-container/Splash';
import {
  SET_LIFETAG_PAYMENT_CHECK_FAILED,
  SET_LIFETAG_PAYMENT_CHECK_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import {
  SET_LIFETAG_UPDATE_ORDER_FAILED,
  SET_LIFETAG_UPDATE_ORDER_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import { NAVIGATION } from 'ca-util/constant';

function PaymentsLifeTagCheckTrans(props) {
  const {
    navigation,
    setLoading,
    paymentsAction,
    route: { params },
    setLifetagPaymentCheck,
    setLifetagUpdateOrder,
    lifetagAction,
    lang,
    setLifetagCreateOrderResponse,
    setLifetagPaymentCheckResponse,
    setLifetagCreateOrderClear,
    setIsComingFromScreen,
  } = props;

  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(false);

  useMount(() => {
    setLoading(true);
  });

  useEffect(() => {
    setLifetagPaymentCheck({
      invoiceId: params?.invoiceId,
    });
  }, [params?.invoiceId, setLifetagPaymentCheck]);

  useEffect(() => {
    checkPaymentEvents(paymentsAction);
  }, [checkPaymentEvents, paymentsAction]);

  useEffect(() => {
    lifetagActionResult(lifetagAction);
  }, [lifetagActionResult, lifetagAction]);

  const checkPaymentEvents = useCallback(
    (act) => {
      if (act === SET_LIFETAG_PAYMENT_CHECK_SUCCESS) {
        if (setLifetagPaymentCheckResponse?.data?.status === 'SUCCESS') {
          setLifetagUpdateOrder({
            orderId:
              setLifetagCreateOrderResponse?.data?.orderId || params?.orderId,
            invoiceId: params?.invoiceId,
          });
        } else {
          setPaymentFailed(true);
        }
      }
      if (act === SET_LIFETAG_PAYMENT_CHECK_FAILED) {
        setPaymentFailed(true);
      }
    },
    [
      params?.invoiceId,
      params?.orderId,
      setLifetagCreateOrderResponse?.data?.orderId,
      setLifetagPaymentCheckResponse?.data?.status,
      setLifetagUpdateOrder,
    ]
  );

  const lifetagActionResult = useCallback(
    (act) => {
      if (act === SET_LIFETAG_UPDATE_ORDER_SUCCESS) {
        setLifetagCreateOrderClear();
        setIsComingFromScreen({});
        setSplashVisible(true);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
          });
          setSplashVisible(false);
        }, 3000);
      }
      if (act === SET_LIFETAG_UPDATE_ORDER_FAILED) {
        setPaymentFailed(true);
      }
    },
    [navigation, setIsComingFromScreen, setLifetagCreateOrderClear]
  );

  function renderSplash() {
    return (
      <Splash
        title={
          lang === 'id'
            ? 'Pembayaran Berhasil dan Sedang Diproses'
            : 'Payment Successful and Processing'
        }
        desc=""
        isVisible={isSplashVisible}
      />
    );
  }

  return (
    <>
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
      {renderSplash()}
    </>
  );
}

PaymentsLifeTagCheckTrans.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  paymentsAction: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setLifetagPaymentCheck: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setLifetagUpdateOrder: PropTypes.func.isRequired,
  lifetagAction: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setLifetagCreateOrderResponse: PropTypes.objectOf(Object).isRequired,
  setLifetagPaymentCheckResponse: PropTypes.objectOf(Object).isRequired,
  setLifetagCreateOrderClear: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};

export default PaymentsLifeTagCheckTrans;
