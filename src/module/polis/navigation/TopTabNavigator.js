/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PolisDetailSummary from 'ca-module-polis/screen/PolisDetailSummary';
import PolisDetailData from 'ca-module-polis/screen/PolisDetailData';
import PolisDetailManfaat from 'ca-module-polis/screen/PolisDetailManfaat';
import PolisDetailDana from 'ca-module-polis/screen/PolisDetailDana';
import PolisDetailKlaim from 'ca-module-polis/screen/PolisDetailKlaim';
import PolisDetailDownload from 'ca-module-polis/screen/PolisDetailDownload';
import { StyleSheet } from 'react-native';
import PolicyDetailTab from 'ca-component-card/PolicyDetailTab';
import { trans } from 'ca-util/trans';
import locale from './locale';

const Tab = createMaterialTopTabNavigator();

function PolisDetailTab({ lang, colorScheme, polis }) {
  return (
    <Tab.Navigator
      tabBarPosition="top"
      tabBar={(props) => <PolicyDetailTab {...props} />}
      style={Styles.container}>
      {polis?.source === '001' || polis?.source === '002' ? (
        <Tab.Screen
          name="PolisDetailSummary"
          component={PolisDetailSummary}
          initialParams={{
            label: trans(locale, lang, 'PolisDetailSummary'),
            polis: polis,
          }}
        />
      ) : null}
      <Tab.Screen
        name="PolisDetailData"
        component={PolisDetailData}
        initialParams={{
          label: trans(locale, lang, 'PolisDetailData'),
          polis: polis,
        }}
      />
      <Tab.Screen
        name="PolisDetailManfaat"
        component={PolisDetailManfaat}
        initialParams={{
          label: trans(locale, lang, 'PolisDetailManfaat'),
          polis: polis,
        }}
      />
      {polis?.fundsSection === true ? (
        <Tab.Screen
          name="PolisDetailDana"
          component={PolisDetailDana}
          initialParams={{
            label: trans(locale, lang, 'PolisDetailDana'),
            polis: polis,
          }}
        />
      ) : null}
      <Tab.Screen
        name="PolisDetailKlaim"
        component={PolisDetailKlaim}
        initialParams={{
          label: trans(locale, lang, 'PolisDetailKlaim'),
          polis: polis,
        }}
      />
      {polis?.isDownloadSection === true ? (
        <Tab.Screen
          name="PolisDetailDownload"
          component={PolisDetailDownload}
          initialParams={{
            label: trans(locale, lang, 'PolisDetailDownload'),
            polis: polis,
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}

export default PolisDetailTab;

const Styles = StyleSheet.create({
  container: { flexGrow: 1, paddingTop: 8 },
});
