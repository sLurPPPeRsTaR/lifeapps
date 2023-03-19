import { View } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { codeLifesaver, NAVIGATION } from 'ca-util/constant';
import PropTypes from 'prop-types';

function LifesaverCheckEligible(props) {
  const {
    getEligibleSubmissionError,
    getEligibleSubmissionResponse,
    reFetch,
    navigation,
    alreadyKYC,
    userId,
    alreadySetPin,
    onNotEligible,
    onPass,
    setFromAuth,
    setIsComingFromScreen,
    route,
  } = props;

  const onNotEkyc = useCallback(() => {
    setFromAuth(false);
    setIsComingFromScreen(route?.name);
    if (!alreadyKYC && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycMain);
    } else if (!alreadySetPin && userId !== '') {
      navigation.navigate(NAVIGATION.KYC.KycCreatePin);
    }
  }, [
    alreadyKYC,
    alreadySetPin,
    navigation,
    route?.name,
    setFromAuth,
    setIsComingFromScreen,
    userId,
  ]);

  const ifNotEligible = useCallback(() => {
    onNotEligible();
    setFromAuth(false);
  }, [onNotEligible, setFromAuth]);

  const ifPass = useCallback(() => {
    onPass();
    setFromAuth(false);
  }, [onPass, setFromAuth]);

  useEffect(() => {
    if (
      (getEligibleSubmissionError?.error ||
        getEligibleSubmissionResponse?.eligible) &&
      reFetch
    ) {
      if (
        getEligibleSubmissionResponse?.getCurrentSubs ===
        codeLifesaver.lifesaverplus.planName
      ) {
        return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverProtected);
      }
      if (getEligibleSubmissionError?.error?.message) {
        return ifNotEligible();
      }
      if (!alreadyKYC) {
        return onNotEkyc();
      }
      return ifPass();
    }
  }, [
    alreadyKYC,
    getEligibleSubmissionError?.error,
    getEligibleSubmissionResponse?.getCurrentSubs,
    getEligibleSubmissionResponse?.eligible,
    ifNotEligible,
    ifPass,
    navigation,
    onNotEkyc,
    reFetch,
  ]);
  return <View />;
}

LifesaverCheckEligible.propTypes = {
  getEligibleSubmissionError: PropTypes.objectOf(Object).isRequired,
  getEligibleSubmissionResponse: PropTypes.objectOf(Object).isRequired,
  reFetch: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  onNotEligible: PropTypes.func.isRequired,
  onPass: PropTypes.func.isRequired,
  setFromAuth: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverCheckEligible;
