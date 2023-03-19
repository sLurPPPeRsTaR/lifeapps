import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { REGISTER } = NAVIGATION;

function RegisterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={REGISTER.RegisterMain}
        component={Screen.RegisterMain}
      />
      <Stack.Screen
        name={REGISTER.RegisterPolis}
        component={Screen.RegisterPolis}
      />
      <Stack.Screen
        name={REGISTER.RegisterOtp}
        component={Screen.RegisterOtp}
        initialParams={{ otpSendTo: '', previousRoute: '' }}
      />
      <Stack.Screen
        name={REGISTER.RegisterInput}
        component={Screen.RegisterInput}
      />
      <Stack.Screen
        name={REGISTER.RegisterNextStep}
        component={Screen.RegisterNextStep}
        initialParams={{
          token: '',
          dob: '',
          name: '',
          channelUid: '',
          channelType: '',
          email: '',
        }}
      />
      <Stack.Screen
        name={REGISTER.RegisterPolisOtp}
        component={Screen.RegisterPolisOtp}
      />
      <Stack.Screen
        name={REGISTER.RegisterSertifikat}
        component={Screen.RegisterSertifikat}
      />
      <Stack.Screen
        name={NAVIGATION.REGISTER.RegisterPin}
        component={Screen.RegisterPin}
      />
      <Stack.Screen
        name={NAVIGATION.REGISTER.RegisterTerms}
        component={Screen.RegisterTerms}
      />
    </Stack.Navigator>
  );
}

export default RegisterStack;
