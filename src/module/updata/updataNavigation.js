import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import {
  ProfileCreateNewPin,
  ProfileHelpCenter,
  ProfileInputPin,
  ProfileOtp,
} from 'ca-module-profile/screen';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { store } from 'ca-config/Store';
import * as Screen from './screen/index';
import { setClearUpdata } from './updataAction';

const Stack = createStackNavigator();
const { UPDATA, PROFILE } = NAVIGATION;

function UpdataStack(props) {
  const {
    route: { params },
  } = props;

  useFocusEffect(
    useCallback(() => {
      return () => {
        store.dispatch(setClearUpdata());
      };
    }, [])
  );

  const initialParams = {
    category: '',
    policyNo: '',
    certificateNo: '',
    source: '',
    isUploadedKKAndKTP: false,
    ...params,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={UPDATA.UpdataMain}
        component={Screen.UpdataMain}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataSelf}
        component={Screen.UpdataSelf}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataSelfCam}
        component={Screen.UpdataSelfCam}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataKTP}
        component={Screen.UpdataKTP}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataKTPCam}
        component={Screen.UpdataKTPCam}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataKK}
        component={Screen.UpdataKK}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataKKCam}
        component={Screen.UpdataKKCam}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataReview}
        component={Screen.UpdataReview}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataInformation}
        component={Screen.UpdataInformation}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataPhone}
        component={Screen.UpdataPhone}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataPhoneEdit}
        component={Screen.UpdataPhoneEdit}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataEmail}
        component={Screen.UpdataEmail}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataEmailEdit}
        component={Screen.UpdataEmailEdit}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataBank}
        component={Screen.UpdataBank}
        initialParams={initialParams}
      />
      <Stack.Screen
        name={UPDATA.UpdataBankEdit}
        component={Screen.UpdataBankEdit}
        initialParams={{ ...initialParams, bank: null }}
      />
      <Stack.Screen
        name={UPDATA.UpdataAddress}
        component={Screen.UpdataAddress}
        initialParams={{ ...initialParams, selectedAddress: '' }}
      />
      <Stack.Screen
        name={UPDATA.UpdataAddressEdit}
        component={Screen.UpdataAddressEdit}
        initialParams={{ ...initialParams, address: null, addressType: '' }}
      />
      <Stack.Screen
        name={PROFILE.ProfileInputPin}
        component={ProfileInputPin}
        initialParams={{
          nextRoute: '',
          callbackValidOtp: () => {},
        }}
      />
      <Stack.Screen
        name={PROFILE.ProfileCreateNewPin}
        component={ProfileCreateNewPin}
        initialParams={{
          nextRoute: '',
          callbackValidOtp: () => {},
        }}
      />
      <Stack.Screen
        name={PROFILE.ProfileOtp}
        component={ProfileOtp}
        initialParams={{
          nextRoute: '',
          callbackValidOtp: () => {},
        }}
      />
      <Stack.Screen
        name={PROFILE.ProfileHelpCenter}
        component={ProfileHelpCenter}
        initialParams={{
          nextRoute: '',
          callbackValidOtp: () => {},
        }}
      />
      <Stack.Screen
        name={UPDATA.UpdataOtp}
        component={Screen.UpdataOtp}
        initialParams={{
          ...initialParams,
          action: '',
          nextRoute: '',
        }}
      />
      <Stack.Screen
        name={UPDATA.UpdataBankUpload}
        component={Screen.UpdataBankUpload}
        initialParams={{
          ...initialParams,
          action: '',
          nextRoute: '',
          callbackValidPin: () => {},
        }}
      />
      <Stack.Screen
        name={UPDATA.UpdataTermsConditions}
        component={Screen.UpdataTermsConditions}
        initialParams={initialParams}
      />
    </Stack.Navigator>
  );
}

export default UpdataStack;

UpdataStack.propTypes = {
  route: PropTypes.objectOf(Object).isRequired,
};
