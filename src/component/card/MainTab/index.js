import * as React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { Size, Color } from 'ca-config/index';
import {
  Home,
  Polis,
  Explore,
  User,
  HomeActive,
  PolisActive,
  ExploreActive,
  UserActive,
} from 'ca-config/Svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { NAVIGATION } from 'ca-util/constant';

export default function MainTab(props) {
  const {
    state: { routes, index },
    navigation,
    userId,
  } = props;

  const renderIcon = React.useCallback((idx, fill) => {
    if (idx === 3) {
      return fill === 'url(#inactiveColor)' ? <User /> : <UserActive />;
    }
    if (idx === 2) {
      return fill === 'url(#inactiveColor)' ? <Polis /> : <PolisActive />;
    }
    if (idx === 1) {
      return fill === 'url(#inactiveColor)' ? <Explore /> : <ExploreActive />;
    }
    return fill === 'url(#inactiveColor)' ? <Home /> : <HomeActive />;
  }, []);

  const renderMainView = React.useMemo(() => {
    return routes.map((item, idx) => {
      const {
        params: { label },
      } = item;
      return (
        <TouchableWithoutFeedback
          key={item.key}
          onPress={() => {
            if (item.name !== 'HomeMain') {
              if (userId !== '') {
                navigation.navigate(item.name);
              } else {
                navigation.navigate(NAVIGATION.LOGIN.Login);
              }
            } else {
              navigation.navigate(item.name);
            }
          }}>
          <View
            style={
              DeviceInfo.isTablet()
                ? Styles.iconContainerTab
                : Styles.iconContainer
            }>
            <View style={Styles.icon}>
              {renderIcon(
                idx,
                idx === index ? 'url(#activeColor)' : 'url(#inactiveColor)'
              )}
            </View>
            <Text
              size={Size.text.caption1.size}
              textStyle="semi"
              color={
                index === idx
                  ? Color.primary.light.primary90
                  : Color.grayIcon.light.grayIcon
              }>
              {label}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  }, [index, navigation, renderIcon, routes, userId]);
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={DeviceInfo.isTablet() ? Styles.containerTab : Styles.container}>
      {renderMainView}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    height: Size.isIphoneX ? 64 + 30 : 64,
    flexDirection: 'row',
    paddingBottom: 6,
    backgroundColor: Color.main.light.white,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: Color.main.dark.white,
    elevation: 4,
  },
  containerTab: {
    height: Size.isIphoneX ? 64 + 30 : 64,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 6,
    backgroundColor: Color.main.light.white,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: Color.main.dark.white,
    elevation: 4,
  },
  iconContainerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Size.isIphoneX ? 0 : 14,
    marginRight: 68,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Size.isIphoneX ? 0 : 14,
  },
  icon: {
    marginBottom: 4,
  },
});

MainTab.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  state: PropTypes.objectOf(String).isRequired,
  userId: PropTypes.string.isRequired,
};
