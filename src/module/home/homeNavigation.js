import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from 'ca-util/constant';
import * as Screen from './screen/index';

const Stack = createStackNavigator();
const { HOME } = NAVIGATION;

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={HOME.HomeMain} component={Screen.HomeMain} />
      <Stack.Screen
        name={HOME.HomePolisJiwasraya}
        component={Screen.HomePolisJiwasraya}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
