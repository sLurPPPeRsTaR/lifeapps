import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { LOGIN } = NAVIGATION;

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={LOGIN.LoginMain} component={Screen.LoginMain} />
    </Stack.Navigator>
  );
}

export default LoginStack;
