import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { AUTH } = NAVIGATION;

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={AUTH.AuthLoad} component={Screen.Load} />
      <Stack.Screen name={AUTH.AuthLanding} component={Screen.Landing} />
    </Stack.Navigator>
  );
}

export default AuthStack;
