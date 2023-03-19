/* eslint-disable react/function-component-definition */
import * as React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { Size, Color } from 'ca-config/index';
import {
  Home,
  Polis,
  LifeShop,
  User,
  HomeActive,
  PolisActive,
  LifeShopActive,
  UserActive,
} from 'ca-config/Svg';
import { Sos, SosDisable } from 'ca-config/Image';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { NAVIGATION, PRODUCT } from 'ca-util/constant';
import { store } from 'ca-config/Store';
import { useIsFocused } from '@react-navigation/native';
import { setLang } from 'ca-module-auth/authAction';
import { useState } from 'react';
import { ModalSos } from 'ca-module-home/screen/HomeSos/component/modal/index';

export default function MainTab(props) {
  const {
    state: { routes, index },
    navigation,
    userId,
    getCurrentSubsResponse,
    features,
  } = props;

  const { lang } = store.getState().auth;
  const { width } = store.getState().bootstrap.dimensions;

  const isFocused = useIsFocused();

  const [lifesaver, setLifesaver] = useState(false);

  const [dialogSos, setDialogSos] = useState(false);

  React.useEffect(() => {
    if (isFocused) {
      setLang(lang);
    }
  }, [isFocused, lang]);

  React.useEffect(() => {
    if (features?.lifesaver) {
      setLifesaver(features?.lifesaver);
    }
  }, [features]);

  const renderIcon = React.useCallback(
    (idx, fill) => {
      if (lifesaver) {
        if (idx === 3) {
          return fill === 'url(#inactiveColor)' ? <User /> : <UserActive />;
        }
        if (idx === 2) {
          return fill === 'url(#inactiveColor)' ? <Polis /> : <PolisActive />;
        }
        if (idx === 1) {
          return fill === 'url(#inactiveColor)' ? (
            <LifeShop />
          ) : (
            <LifeShopActive />
          );
        }
        if (idx === 0) {
          return fill === 'url(#inactiveColor)' ? <Home /> : <HomeActive />;
        }
      } else {
        if (idx === 3) {
          return fill === 'url(#inactiveColor)' ? <User /> : <UserActive />;
        }
        if (idx === 2) {
          return fill === 'url(#inactiveColor)' ? <Polis /> : <PolisActive />;
        }
        if (idx === 1) {
          return fill === 'url(#inactiveColor)' ? (
            <LifeShop />
          ) : (
            <LifeShopActive />
          );
        }
        if (idx === 0) {
          return fill === 'url(#inactiveColor)' ? <Home /> : <HomeActive />;
        }
      }
    },
    [lifesaver]
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const Cekung = (props) => (
    <Svg
      width={80}
      height={40}
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_5410_140013)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M232 68.5h-383V0H0c0 22.012 19.683 39.857 39.99 39.857C60.295 39.857 80 22.012 80 0h152v68.5z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_5410_140013">
          <Path fill="#fff" d="M0 0H80V40H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );

  const renderMainView = React.useMemo(() => {
    const locale = {
      id: {
        HomeMain: 'Beranda',
        LifeShop: 'Proteksi',
        ExploreMain: 'Proteksi',
        EmergencyMain: 'Darurat',
        PolisMain: 'Polis',
        ProfileMain: 'Profil',
      },
      en: {
        HomeMain: 'Home',
        LifeShop: 'Protection',
        ExploreMain: 'Protection',
        EmergencyMain: 'Emergency',
        PolisMain: 'Policy',
        ProfileMain: 'Profile',
      },
    };
    return routes
      .filter((item) => {
        // exlude emergency
        return item.name !== 'EmergencyMain';
      })
      .map((item, idx) => {
        const {
          params: { label },
        } = item;
        if (item.name === 'EmergencyMain') {
          const centerWidth = DeviceInfo.isTablet()
            ? width / 10 + 2
            : width / 5 + 2;
          return (
            <View
              key={item.key}
              style={[
                Styles.emergencyContainer,
                {
                  backgroundColor: DeviceInfo.isTablet()
                    ? Color.main.light.white
                    : Color.transparent.light.transparent,
                },
              ]}>
              <View style={Styles.zIndex1}>
                <Cekung width={centerWidth} height={centerWidth / 2} />
              </View>
              <View style={[Styles.emergencySpacer, { width: centerWidth }]} />
              {Platform.OS === 'ios' && (
                <View
                  style={[
                    Styles.emergencySpacerContainerIos,
                    {
                      backgroundColor: DeviceInfo.isTablet()
                        ? Color.main.light.white
                        : Color.transparent.light.transparent,
                    },
                  ]}>
                  <View
                    style={[
                      Styles.emergencySpacerIos,
                      {
                        height: centerWidth / 2,
                      },
                    ]}
                  />
                  <View
                    style={[
                      Styles.emergencySpacerIos,
                      {
                        height: centerWidth / 2,
                      },
                    ]}
                  />
                </View>
              )}
              {userId !== '' &&
              (getCurrentSubsResponse?.planName ===
                PRODUCT.LIFESAVER.LIFESAVER ||
                getCurrentSubsResponse?.planName ===
                  PRODUCT.LIFESAVER.LIFESAVER_PLUS ||
                getCurrentSubsResponse?.planName ===
                  PRODUCT.LIFESAVER.LIFESAVER_POS) ? (
                // eslint-disable-next-line react/jsx-indent
                <TouchableOpacity
                  onPress={() => setDialogSos(true)}
                  style={[
                    Styles.emergencyButtonContainer,
                    {
                      width: centerWidth - 10,
                      height: centerWidth - 10,
                      borderRadius: (centerWidth - 10) / 2,
                      top: -(centerWidth - 10) / 2,
                    },
                  ]}>
                  <Image
                    source={Sos}
                    style={{
                      width: centerWidth - 10,
                      height: centerWidth - 10,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : (
                <View
                  onPress={() => navigation.navigate(NAVIGATION.HOME.HomeSos)}
                  style={[
                    Styles.emergencyButtonContainer,
                    {
                      width: centerWidth - 10,
                      height: centerWidth - 10,
                      borderRadius: (centerWidth - 10) / 2,
                      top: -(centerWidth - 10) / 2,
                    },
                  ]}>
                  <Image
                    source={SosDisable}
                    style={{
                      width: centerWidth - 10,
                      height: centerWidth - 10,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
          );
        }
        return (
          <TouchableWithoutFeedback
            key={item.key}
            onPress={() => {
              if (lifesaver) {
                if (item.name !== 'HomeMain' && item.name !== 'ExploreMain') {
                  if (userId !== '') {
                    navigation.navigate(item.name);
                  } else {
                    navigation.navigate(NAVIGATION.LOGIN.Login);
                  }
                } else if (item.name === 'ExploreMain') {
                  navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
                } else {
                  navigation.navigate(item.name);
                }
              }
              if (!lifesaver) {
                if (item.name !== 'HomeMain') {
                  if (userId !== '') {
                    navigation.navigate(item.name);
                  } else {
                    navigation.navigate(NAVIGATION.LOGIN.Login);
                  }
                } else {
                  navigation.navigate(item.name);
                }
              }
            }}>
            <View
              style={
                DeviceInfo.isTablet()
                  ? Styles.iconContainer
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
                    ? Color.neutral.dark.neutral60
                    : Color.grayIcon.light.grayIcon
                }>
                {locale[lang][label] || label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      });
  }, [
    getCurrentSubsResponse?.planName,
    index,
    lang,
    lifesaver,
    navigation,
    renderIcon,
    routes,
    userId,
    width,
  ]);
  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={DeviceInfo.isTablet() ? Styles.containerTab : Styles.container}>
      {renderMainView}
      <ModalSos {...props} isVisible={dialogSos} setIsVisible={setDialogSos} />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    height: Size.isIphoneX ? 64 + 30 : 64,
    flexDirection: 'row',
    shadowColor: Color.main.dark.white,
    elevation: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerTab: {
    height: Size.isIphoneX ? 64 + 30 : 64,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 6,
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
    backgroundColor: Color.main.light.white,
    zIndex: 9,
  },
  icon: {
    marginBottom: 4,
  },
  emergencyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emergencySpacer: {
    flex: 1,
    backgroundColor: Color.main.light.white,
  },
  emergencySpacerContainerIos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencySpacerIos: {
    width: 1,
    backgroundColor: Color.main.light.white,
  },
  emergencyButtonContainer: {
    position: 'absolute',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  zIndex1: {
    zIndex: 1,
  },
});

MainTab.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  state: PropTypes.objectOf(String).isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(String).isRequired,
  userId: PropTypes.string.isRequired,
  features: PropTypes.objectOf(String).isRequired,
};
