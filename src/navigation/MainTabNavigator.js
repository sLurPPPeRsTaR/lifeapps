import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTab as MainTabCard } from 'ca-component-card/index';
import { PolisMain } from 'ca-module-polis/screen/index';
import { ExploreMain } from 'ca-module-explore/screen/index';
import { HomeMain } from 'ca-module-home/screen/index';
import { ProfileMain } from 'ca-module-profile/screen/index';
import { store } from 'ca-config/Store';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { userId } = store.getState().auth.userData;
  const { features } = useSelector((state) => state.bootstrap.appConfig);
  const getCurrentSubsResponse = useSelector(
    (state) => state?.lifesaver?.getCurrentSubsResponse
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute', backgroundColor: 'transparent' },
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => (
        <MainTabCard
          {...props}
          userId={userId}
          features={features}
          getCurrentSubsResponse={getCurrentSubsResponse}
        />
      )}>
      <Tab.Screen
        name="HomeMain"
        component={HomeMain}
        initialParams={{ label: 'HomeMain' }}
      />
      <Tab.Screen
        name="ExploreMain"
        component={ExploreMain}
        initialParams={{ label: 'ExploreMain' }}
      />
      {/* {features.lifesaver ? (
        <Tab.Screen
          name="EmergencyMain"
          component={ExploreMain}
          initialParams={{ label: 'EmergencyMain' }}
        />
      ) : null} */}
      <Tab.Screen
        name="PolisMain"
        component={PolisMain}
        initialParams={{ label: 'PolisMain' }}
      />
      <Tab.Screen
        name="ProfileMain"
        component={ProfileMain}
        initialParams={{ label: 'ProfileMain' }}
      />
    </Tab.Navigator>
  );
}
