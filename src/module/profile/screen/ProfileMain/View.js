import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableNativeFeedback,
  BackHandler,
  Vibration,
  Animated,
} from 'react-native';
import { Base15, Shadow } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import { BASE_URL, NAVIGATION, API, APP } from 'ca-util/constant';
import {
  ArrowRight2,
  Profile3,
  Profile4,
  Profile5,
  Profile6,
  Profile7,
  DummyProfile,
  Logout,
  Ver,
  ProfileSubs,
  VerifiedBadge,
  Wallet,
  Star,
  BackgroundGradientTablet,
  BackgroundGradientSquare,
  ClipboardCopy,
} from 'ca-config/Svg';
import CardWidget from 'ca-module-home/screen/HomeMain/component/CardWidget';
import {
  LogoutPhone,
  PinSet,
  LifetagWarning,
  notifPaper,
} from 'ca-config/Image';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import { setNavigationHome } from 'ca-bootstrap/bootstrapNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import { useMount } from 'ca-util/common';
import Style from './style';
import locale from './locale';

function ProfileMain(props) {
  const {
    navigation,
    lang,
    userData,
    setClearAuth,
    setLoginClear,
    setLoading,
    accessToken,
    setIsComingFromScreen,
    getCurrentSubsResponse,
    getProfileReferral,
    getProfileReferralResponse,
    appConfig: { features },
    getPoliciesResponse,
    dimensions,
    getProfileUserParty,
  } = props;

  const { width } = dimensions;
  const insets = useSafeAreaInsets();
  const additionalHeight = 38;

  const [isLMVisible, setLMVisibility] = useState(false);
  const [isModalPolisNonActive, setIsModalPolisNonActive] = useState(false);

  const isFocused = useIsFocused();

  const copyToClipboard = (text) => {
    Clipboard.setString(text.toString());
    Vibration.vibrate();
    fadeIn();
    setTimeout(() => {
      fadeOut();
    }, 1500);
  };

  // animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useMount(() => {
    getProfileReferral();
  });
  const lifesaverPolicies = useMemo(() => {
    return getPoliciesResponse?.data?.filter((item) => item?.source === '001');
  }, [getPoliciesResponse?.data]);

  const goBack = useCallback(() => {
    setNavigationHome();
    return true;
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [goBack]);

  useEffect(() => {
    if (isFocused) {
      getProfileUserParty();
      setIsComingFromScreen({});
    }
  }, [getProfileUserParty, isFocused, setIsComingFromScreen]);

  const menuList = [
    {
      key: 'pembayaran',
      isShow: features.lifesaver,
      icon: <Wallet />,
      title: trans(locale, lang, 'pembayaran'),
      subtitle: trans(locale, lang, 'aturPembayaran'),
      onPress: () => {
        navigation.navigate(NAVIGATION.PROFILE.ProfilePayments);
      },
    },
    {
      key: 'langgananSaya',
      isShow: features.lifesaver,
      icon: <ProfileSubs />,
      title: trans(locale, lang, 'langgananSaya'),
      subtitle: trans(locale, lang, 'kelolaTagihan'),
      onPress: () => {
        navigation.navigate(NAVIGATION.SUBS.SubsMain);
      },
    },
    // {
    //   key: 'profileLifeTag',
    //   isShow: true,
    //   icon: <Star />,
    //   title: trans(locale, lang, 'profileLifeTag'),
    //   subtitle: trans(locale, lang, 'aturLifeTag'),
    //   onPress: () => {
    //     if (
    //       getCurrentSubsResponse?.status !== 'ACTIVE' ||
    //       lifesaverPolicies.length === 0
    //     ) {
    //       setIsModalPolisNonActive(true);
    //     } else if (getCurrentSubsResponse?.isSubscribe) {
    //       navigation.navigate(NAVIGATION.LIFETAG.LifetagDeviceList);
    //     }
    //   },
    // },
    {
      key: 'daftarAlamat',
      isShow: true,
      icon: <Profile3 />,
      title: trans(locale, lang, 'daftarAlamat'),
      subtitle: trans(locale, lang, 'aturDaftarAlamat'),
      onPress: () => {
        navigation.navigate(NAVIGATION.PROFILE.ProfileAddress);
      },
      isLogin: userData?.userId !== '',
    },
    {
      key: 'verifikasi',
      isShow: true,
      icon: <Profile4 />,
      title: trans(locale, lang, 'verifikasi'),
      subtitle: trans(locale, lang, 'verifikasiDataDiri'),
      onPress: () => {
        navigation.navigate(NAVIGATION.KYC.KycMain);
      },
    },
    {
      key: 'keamanan',
      isShow: true,
      icon: <Profile5 />,
      title: trans(locale, lang, 'keamanan'),
      subtitle: trans(locale, lang, 'kelolaKataSandi'),
      onPress: () => navigation.navigate(NAVIGATION.PROFILE.ProfileSecurity),
    },
    {
      key: 'bahasa',
      isShow: true,
      icon: <Profile6 />,
      title: trans(locale, lang, 'bahasa'),
      subtitle: trans(locale, lang, 'pemilihanBahasaDalam'),
      onPress: () => navigation.navigate(NAVIGATION.PROFILE.ProfileLanguage),
    },
    // {
    //   key: 'ProfileTerms',
    //   isShow: true,
    //   icon: (
    //     <Image
    //       source={notifPaper}
    //       resizeMode="contain"
    //       style={Style.menu.imageNotif}
    //     />
    //   ),
    //   title: trans(locale, lang, 'syarat'),
    //   subtitle: trans(locale, lang, 'nikmatiFitur'),
    //   onPress: () => navigation.navigate(NAVIGATION.PROFILE.ProfileTerms),
    // },
    {
      key: 'bantuan',
      isShow: true,
      icon: <Profile7 />,
      title: trans(locale, lang, 'bantuan'),
      subtitle: trans(locale, lang, 'pertolonganPertamaUntuk'),
      onPress: () => navigation.navigate(NAVIGATION.PROFILE.ProfileHelp),
    },
    {
      key: 'versi',
      isShow: true,
      icon: <Ver />,
      title: trans(locale, lang, 'versi'),
      subtitle: renderVersion(),
    },
  ];

  const textSize = useMemo(() => {
    if (width >= 390) {
      return Size.text.caption1.size;
    }
    if (width > 280 && width < 390) {
      return Size.text.caption1.size - 2;
    }
    return Size.text.caption1.size;
  }, [width]);

  function renderHeaderContainer() {
    return (
      <Shadow borderRadius={30} style={Style.header.shadow}>
        <Padder style={Style.header.container}>
          <View style={Style.header.userProfile.container}>
            <View style={Style.header.userProfile.data.container}>
              {userData?.thumbnailPhotoKey !== '' &&
              userData?.thumbnailPhotoKey !== null ? (
                <Image
                  style={Style.header.userProfile.photo}
                  source={{
                    uri: `${BASE_URL}${API.USER.photoThumbnail}/${userData?.thumbnailPhotoKey}`,
                    headers: {
                      Authorization: `Bearer ${accessToken?.token?.access_token}`,
                    },
                  }}
                  width={53}
                  height={53}
                  resizeMode="cover"
                />
              ) : (
                <DummyProfile
                  width={53}
                  height={53}
                  style={Style.header.userProfile.photo}
                />
              )}
              <View style={Style.header.data}>
                {userData?.name !== '' && (
                  <View style={Style.header.userProfile.data.nameContainer}>
                    <Text
                      textStyle="semi"
                      size={Size.text.body2.size}
                      letterSpacing={0.5}
                      numberOfLines={1}
                      style={Style.header.userProfile.data.name}>
                      {userData?.name?.split(' ').slice(0, 2).join(' ')}
                    </Text>
                    {userData?.alreadyKYC && <VerifiedBadge />}
                  </View>
                )}
                {userData?.email !== '' && userData?.email !== null && (
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    color={Color.blackProfile.light.blackProfile40}
                    letterSpacing={0.5}
                    numberOfLines={1}
                    style={[Style.header.userProfile.data.email]}>
                    {userData?.email}
                  </Text>
                )}
                {userData?.mobilePhoneNumber !== '' &&
                  userData?.mobilePhoneNumber !== null && (
                    <Text
                      textStyle="medium"
                      size={Size.text.caption1.size}
                      color={Color.blackProfile.light.blackProfile40}
                      letterSpacing={0.5}
                      style={Style.header.userProfile.data.phoneNumber}>
                      {userData?.mobilePhoneNumber}
                    </Text>
                  )}
                {userData?.userParty?.map((party) => (
                  <View style={Style.header.userProfile.data.verificationBadge}>
                    <Text
                      textStyle="medium"
                      size={textSize}
                      line={18}
                      letterSpacing={0.5}
                      numberOfLines={1}
                      color={Color.badgeSuccess.light.badgeSuccess80}>
                      {party.type.charAt(0).toUpperCase() +
                        party.type.slice(1).toLowerCase()}
                    </Text>
                    <View
                      style={Style.header.userProfile.data.verificationCode}>
                      <Text
                        textStyle="bold"
                        size={textSize}
                        line={18}
                        letterSpacing={0.5}
                        color={Color.red.dark.red90}
                        numberOfLines={1}>
                        {party.code}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Button
              outline
              height={32}
              onPress={() => {
                navigation.navigate(NAVIGATION.PROFILE.ProfilePersonalData);
              }}>
              {trans(locale, lang, 'edit')}
            </Button>
          </View>
          {getProfileReferralResponse ? (
            <>
              <View style={Style.mxMin16}>
                <HorizontalLine height={1} />
              </View>
              <View style={Style.my10}>
                <Text
                  color={Color.blackProfile.light.blackProfile40}
                  textStyle="medium"
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'kodeReferralSaya')}
                </Text>
                <Animated.View
                  style={[
                    Style.clips,
                    {
                      opacity: fadeAnim,
                    },
                  ]}>
                  <Text
                    color={Color.main.light.white}
                    textStyle="semi"
                    size={Size.text.caption1.size}>
                    {trans(locale, lang, 'copied')}
                  </Text>
                </Animated.View>
                <View style={Style.header.referralFieldContainer}>
                  <Text textStyle="medium">{getProfileReferralResponse}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      copyToClipboard(getProfileReferralResponse);
                    }}>
                    <ClipboardCopy />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}
        </Padder>
      </Shadow>
    );
  }

  function renderMenuCard(menu) {
    if (menu.key === 'keluarAkun' && !menu?.isLogin) {
      return <View key={menu.key} />;
    }
    return (
      <TouchableNativeFeedback
        key={menu.key}
        onPress={menu.onPress}
        disabled={!menu.onPress}>
        <View
          style={
            menu.key !== 'keluarAkun' && menu.key !== 'versi'
              ? Style.menu.card.container
              : Style.menu.card.containerNoBorder
          }>
          <View style={Style.menu.card.card}>
            <View style={Style.menu.card.leftIcon}>{menu.icon}</View>
            <View style={Style.menu.card.content.container}>
              <View style={Style.flex1}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.blackProfile.light.blackProfile}>
                  {trans(locale, lang, menu.title)}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.blackProfile.light.blackProfile40}>
                  {trans(locale, lang, menu.subtitle)}
                </Text>
              </View>
              {menu.key !== 'keluarAkun' && menu.key !== 'versi' && (
                <ArrowRight2 />
              )}
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  function renderMenuContainer() {
    return (
      <Shadow borderRadius={30} style={Style.menu.shadow}>
        <Padder>
          {menuList.map((menu) => {
            if (!menu.isShow) {
              return null;
            }
            if (menu.key === 'verifikasi' && userData?.alreadyKYC) {
              return null;
            }

            return renderMenuCard(menu);
          })}
        </Padder>
      </Shadow>
    );
  }

  function renderLogoutModal() {
    const onBackPress = () => setLMVisibility(false);
    return (
      <BottomSheet
        isVisible={isLMVisible}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={Style.modal.logout.container}>
          <View style={Style.modal.logout.image.container}>
            <View style={Style.modal.logout.image.spacer} />
            <Image
              source={LogoutPhone}
              style={Style.modal.logout.image.image}
            />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.logout.title}>
            {trans(locale, lang, 'keluarDariLife')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.logout.caption}>
            {trans(locale, lang, 'yakinKamuIngin')}
          </Text>
          <Button
            outline
            style={Style.modal.logout.button1}
            onPress={() => {
              setLMVisibility(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
          <Button
            onPress={() => {
              setLMVisibility(false);
              setLoading(true);
              setClearAuth();
              setLoginClear();
              setIsComingFromScreen({});
            }}>
            {trans(locale, lang, 'keluar')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderModalPolisNonActive() {
    let navigationPolisNonActive = () => {};
    let oops = '';
    let titleModal = '';
    let contentModal = '';
    let btnModal = '';

    if (getCurrentSubsResponse?.status === 'GRACE_PERIOD') {
      navigationPolisNonActive = () => {
        navigation.navigate(NAVIGATION.SUBS.SubsDetail, {
          policyNo: getCurrentSubsResponse?.policyNo,
        });
      };
      oops = trans(locale, lang, 'oops');
      titleModal = trans(locale, lang, 'tidakBisaAksesLifetag');
      contentModal = trans(locale, lang, 'contentModalPolisNotActive');
      btnModal = trans(locale, lang, 'berlanggananKembali');
    }
    if (
      !getCurrentSubsResponse?.isSubscribe ||
      lifesaverPolicies.length === 0
    ) {
      navigationPolisNonActive = () => {
        navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
      };
      oops = trans(locale, lang, 'oops');
      titleModal = trans(locale, lang, 'tidakBisaAksesLifetag');
      contentModal = trans(locale, lang, 'contentModalPolisNotActive');
      btnModal = trans(locale, lang, 'berlanggananKembali');
    }

    if (!userData?.alreadyKYC && !userData?.alreadySetPin) {
      navigationPolisNonActive = () => {
        navigation.navigate(NAVIGATION.KYC.KycMain);
      };
      oops = '';
      titleModal = trans(locale, lang, 'maafTidakBisaAksesLifetag');
      contentModal = trans(locale, lang, 'contentModalPolisNotEkyc');
      btnModal = trans(locale, lang, 'verifikasiData');
    } else if (userData?.alreadyKYC && !userData?.alreadySetPin) {
      navigationPolisNonActive = () => {
        navigation.navigate(NAVIGATION.KYC.KycCreatePin);
      };
      oops = '';
      titleModal = trans(locale, lang, 'maafTidakBisaAksesLifetag');
      contentModal = trans(locale, lang, 'contentModalPolisNotEkyc');
      btnModal = trans(locale, lang, 'verifikasiData');
    }

    return (
      <BottomSheet isVisible={isModalPolisNonActive} swipeable={false}>
        <View style={Style.modal.logout.container}>
          <View style={Style.modal.logout.image.container}>
            <View style={Style.modal.logout.image.spacer} />
            <Image
              source={LifetagWarning}
              style={Style.modal.logout.image.image}
            />
          </View>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.logout.title}>
            {oops}
          </Text>
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            color={Color.neutral.light.neutral80}
            style={Style.modal.logout.title}>
            {titleModal}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={Style.modal.logout.caption}>
            {contentModal}
          </Text>
          <Button
            type="linear-gradient"
            style={Style.modal.logout.button1}
            onPress={() => {
              setIsModalPolisNonActive(false);
              setTimeout(() => {
                navigationPolisNonActive();
              }, 100);
            }}>
            {btnModal}
          </Button>
          <Button
            outline
            style={Style.mt16}
            onPress={() => {
              setIsModalPolisNonActive(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderVersion() {
    return (
      <Text
        color={Color.mediumGray.light.mediumGray}
        size={Size.text.body2.size}
        textStyle="semi"
        line={23.8}
        letterSpacing={0.5}>
        {trans(locale, lang, 'v')}
        {DeviceInfo.getVersion()}
      </Text>
    );
  }

  function renderWidgetMpin() {
    const paddingHorizontal = 16 * 2;
    const tempWidth = width - paddingHorizontal;
    // const isTablet = tempWidth / 1.25;
    if (userData?.alreadyKYC) {
      if (!userData?.alreadySetMPin || !userData?.alreadySetPin) {
        return (
          <View style={Style.mT24}>
            <CardWidget
              // width={DeviceInfo.isTablet() ? isTablet : tempWidth}
              width={tempWidth}
              img={PinSet}
              content1={trans(locale, lang, 'ayoAktivasiMpin')}
              btnTitle={trans(locale, lang, 'aktivasiMpin')}
              onPress={() => {
                setIsComingFromScreen({
                  screen: NAVIGATION.PROFILE.ProfileMain,
                });
                if (!userData?.alreadySetPin) {
                  navigation.navigate(NAVIGATION.PROFILE.ProfileCreateNewPin);
                }
                if (userData?.alreadySetPin && !userData?.alreadySetMPin) {
                  navigation.navigate(NAVIGATION.PROFILE.ProfileChangeNewPin);
                }
              }}
            />
          </View>
        );
      }
      return null;
    }
    return null;
  }

  function renderBackgroundHeaderImage() {
    const imageSize = { width: 358, height: 245 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + insets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    if (DeviceInfo.isTablet()) {
      return (
        <View
          style={[
            Style.backgroundContainer,
            {
              top: -90 + insets.top,
            },
          ]}>
          <BackgroundGradientTablet width={width} height={205} />
        </View>
      );
    }
    return (
      <View style={backgroundStyle}>
        <BackgroundGradientSquare width={width} height={adjustedHeight} />
      </View>
    );
  }

  return (
    <Base15
      isScroll
      animated
      title={trans(locale, lang, 'profile')}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      {renderHeaderContainer()}
      <Padder>{renderWidgetMpin()}</Padder>
      {renderMenuContainer()}
      <Padder>
        <Padder>
          {renderMenuCard(
            {
              key: 'keluarAkun',
              icon: <Logout />,
              title: trans(locale, lang, 'keluarAkun'),
              subtitle: trans(locale, lang, 'keluarDariAkun'),
              onPress: () => setLMVisibility(true),
              isLogin: userData?.userId !== '',
            },
            8
          )}
        </Padder>
      </Padder>
      {renderLogoutModal()}
      {/* {renderModalPolisNonActive()} */}
    </Base15>
  );
}

export default ProfileMain;

ProfileMain.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setClearAuth: PropTypes.func.isRequired,
  setLoginClear: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  accessToken: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  getPoliciesResponse: PropTypes.objectOf(Object).isRequired,
  getProfileReferral: PropTypes.func.isRequired,
  getProfileReferralResponse: PropTypes.objectOf(Object).isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
  getProfileUserParty: PropTypes.func.isRequired,
};
