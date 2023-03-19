import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { KYC } = NAVIGATION;

function KycStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={KYC.KycMain} component={Screen.KycMain} />
      <Stack.Screen
        name={KYC.KycUploadSelfie}
        component={Screen.KycUploadSelfie}
      />
      <Stack.Screen
        name={KYC.KycUploadSelfieCam}
        component={Screen.KycUploadSelfieCam}
      />
      <Stack.Screen name={KYC.KycUploadKTP} component={Screen.KycUploadKTP} />
      <Stack.Screen
        name={KYC.KycUploadKTPCam}
        component={Screen.KycUploadKTPCam}
      />
      <Stack.Screen name={KYC.KycForm} component={Screen.KycForm} />
      <Stack.Screen name={KYC.KycConfPin} component={Screen.KycConfPin} />
      <Stack.Screen name={KYC.KycCreatePin} component={Screen.KycCreatePin} />
    </Stack.Navigator>
  );
}

export default KycStack;
