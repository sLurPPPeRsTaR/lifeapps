import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { FORPASS } = NAVIGATION;

function ForpassStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={FORPASS.ForpassMain} component={Screen.ForpassMain} />
      <Stack.Screen
        name={FORPASS.ForpassInput}
        component={Screen.ForpassInput}
      />
    </Stack.Navigator>
  );
}

export default ForpassStack;
