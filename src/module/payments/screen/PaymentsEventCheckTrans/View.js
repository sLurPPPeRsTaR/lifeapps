import React, { useEffect, useState, useCallback } from 'react';
import Base from 'ca-component-container/Base';
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
import {
  GET_PAYMENT_EVENT_STATUS_FAILED,
  GET_PAYMENT_EVENT_STATUS_SUCCESS,
} from 'ca-module-payments/paymentsConstant';

function PaymentsEventCheckTrans(props) {
  const {
    navigation,
    setLoading,
    paymentsAction,
    route: { params },
    getPaymentEventStatus,
    getPaymentEventStatusClear,
  } = props;
  const [paymentFailed, setPaymentFailed] = useState(false);
  useMount(() => {
    setLoading(true);
  });
  useEffect(() => {
    getPaymentEventStatus({
      invoiceId: params?.invoiceId,
      reffNo: params?.reffNo,
    });
  }, [getPaymentEventStatus, params?.invoiceId, params?.reffNo]);
  useEffect(() => {
    checkPaymentEvents(paymentsAction);
  }, [checkPaymentEvents, paymentsAction]);
  const checkPaymentEvents = useCallback(
    (act) => {
      if (act === GET_PAYMENT_EVENT_STATUS_SUCCESS) {
        return navigation.replace(NAVIGATION.EVENT.EventSuccess, {
          ...params,
        });
      }
      if (act === GET_PAYMENT_EVENT_STATUS_FAILED) {
        return navigation.replace(NAVIGATION.EVENT.EventConfirmPayment, {
          eventId: params?.eventId,
        });
      }
    },
    [navigation, params]
  );
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

PaymentsEventCheckTrans.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  paymentsAction: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getPaymentEventStatus: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPaymentEventStatusClear: PropTypes.func.isRequired,
};

export default PaymentsEventCheckTrans;
