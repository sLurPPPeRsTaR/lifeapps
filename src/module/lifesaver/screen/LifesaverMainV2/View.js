import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Header from 'ca-component-card/Header';
import { CloudBackground } from 'ca-config/Image';
import { ArrowDown2White } from 'ca-config/Svg';
import LinearGradient from 'react-native-linear-gradient';
import Size from 'ca-config/Size';
import {
  GET_CURRENT_SUBS_FAILED,
  GET_CURRENT_SUBS_SUCCESS,
  GET_IS_USER_ELIGIBLE_FAILED,
  GET_IS_USER_ELIGIBLE_SUCCESS,
  GET_LIST_RS_SUCCESS,
  SET_WAITING_FAILED,
  SET_WAITING_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import Button from 'ca-component-generic/Button';
import {
  APP,
  EVENT_CODE,
  LOGIN_TYPE,
  NAVIGATION,
  PRODUCT,
  RESPONSE_STATE,
  RESPONSE_STATUS,
  TOAST,
} from 'ca-util/constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setDobGoogle, setSignInSocial } from 'ca-util/common';
import DeviceInfo from 'react-native-device-info';
import {
  SET_LOGIN_SOCIAL_FAILED,
  SET_LOGIN_SOCIAL_SUCCESS,
} from 'ca-module-login/loginConstant';
import ModalFailedLogin from 'ca-component-modal/ModalFailedLogin';
import { setToastMsg } from 'ca-bootstrap/bootstrapAction';
import { setCheckEmail } from 'ca-module-profile/profileApi';
import { useIsFocused } from '@react-navigation/native';
import {
  NeverGameOver,
  TermsFAQ,
  ScrollContents,
  PricesTable,
} from './component';
import { DialogDetail } from './component/Dialog';
import locale from './locale';
import style from './style';
import {
  ModalNotLogin,
  ModalListRs,
  ModalNotEligible,
  ModalSuccessRemember,
  ModalNotKyc,
  ModalAgreement,
} from './component/modal';
import TotalClaim from './component/TotalClaim';

function LifesaverMain(props) {
  const {
    navigation,
    lang,
    userId,
    colorScheme,
    alreadyKYC,
    getIsUserEligible,
    getIsUserEligibleFetch,
    getIsUserEligibleResponse,
    getListRs,
    getListRsResponse,
    getCurrentSubs,
    getCurrentSubsResponse,
    lifesaverAction,
    alreadySetPin,
    getCurrentSubsFetch,
    setWaiting,
    setLoading,
    isComingFromDeepLink,
    setLoginSocial,
    setLoginSocialClear,
    setLoginSocialFailed,
    deviceId,
    loginAction,
    setIsShowFailedModalLogin,
    isShowFailedModalLogin,
    setIsComingFromScreen,
    isComingFromScreen,
    setIsShowModalComingSoon,
    getEligiblePos,
    getEligiblePosResponse,
  } = props;

  const scrollRef = useRef();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { GOOGLE } = LOGIN_TYPE;
  const { INTERNAL_SERVER_ERROR } = RESPONSE_STATE;
  const {
    LIFESAVER: { LIFESAVER_PLUS, LIFESAVER },
  } = PRODUCT;

  const [scrollToDest, setScrollToDest] = useState(null);
  const [currentScrollDest, setCurrentScrollDest] = useState(null);
  const [hideScrollButton, setHideScrollButton] = useState(false);
  const [isEligible, setIsEligible] = useState(undefined);
  const [selectedPackage, setSelectedPackage] = useState(LIFESAVER_PLUS);
  const [currentSubs, setCurrentSubs] = useState(undefined);
  const [isEligibleBajo, setIsEligibleBajo] = useState(undefined);
  const [isEligibleEvent, setIsEligibleEvent] = useState(undefined);

  // DIALOG STATE
  const [isShowModalNotLogin, setIsShowModalNotLogin] = useState(false);
  const [isShowModalNotEligible, setIsShowModalNotEligible] = useState(false);
  const [isShowModalSuccessRemember, setIsShowModalSuccessRemember] =
    useState(false);
  const [isShowModalNotKyc, setIsShowModalNotKyc] = useState(false);
  const [isShowModalAgreement, setIsShowModalAgreement] = useState(false);
  const [dialogDetail, setDialogDetail] = useState(false);

  // LIST RUMAH SAKIT
  const [inputFocus, setInputFocus] = useState(false);
  const [listRs, setListRs] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 5,
    type: '',
    sort: true,
    focus: false,
  });
  const [loadingFilterRs, setLoadingFilterRs] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  useEffect(() => {
    const goTo = () => {
      navigation.pop();
      setIsComingFromScreen({});
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromScreen]);

  useEffect(() => {
    if (userId !== '') {
      getIsUserEligible();
      getCurrentSubs();
      // getEligiblePos();
    }
  }, [getCurrentSubs, getEligiblePos, getIsUserEligible, userId]);

  useEffect(() => {
    setProductLifeSaverResult(lifesaverAction);
  }, [lifesaverAction, setProductLifeSaverResult]);

  const setProductLifeSaverResult = useCallback(
    (act) => {
      if (act === GET_LIST_RS_SUCCESS) {
        setTimeout(() => {
          setLoadingFilterRs(false);
          setPaginationLoading(false);
        }, 1000);
      }
      if (act === GET_IS_USER_ELIGIBLE_SUCCESS) {
        setIsEligible(true);
        const eligibleBajo =
          getIsUserEligibleResponse?.data?.data?.eventCode ===
            EVENT_CODE.BAJO2022 &&
          getIsUserEligibleResponse?.data?.data?.isSubscribed === false;
        setIsEligibleBajo(eligibleBajo);
        if (
          currentSubs === '' &&
          getIsUserEligibleResponse?.data?.data?.eventId
        ) {
          setIsEligibleEvent(getIsUserEligibleResponse?.data?.data?.eventId);
        } else {
          setIsEligibleEvent(false);
        }
      }
      if (act === GET_IS_USER_ELIGIBLE_FAILED) {
        setIsEligible(false);
        setIsEligibleBajo(false);
      }
      if (act === SET_WAITING_SUCCESS || act === SET_WAITING_FAILED) {
        setIsShowModalNotEligible(false);
        setTimeout(() => {
          setIsShowModalSuccessRemember(true);
        }, 1000);
      }
      if (act === GET_CURRENT_SUBS_SUCCESS) {
        setCurrentSubs(getCurrentSubsResponse?.planName || '');
      }
      if (act === GET_CURRENT_SUBS_FAILED) {
        setCurrentSubs('');
      }
    },
    [
      currentSubs,
      getCurrentSubsResponse?.planName,
      getIsUserEligibleResponse?.data?.data?.eventCode,
      getIsUserEligibleResponse?.data?.data?.eventId,
      getIsUserEligibleResponse?.data?.data?.isSubscribed,
    ]
  );

  useEffect(() => {
    setBothLoginResult(loginAction);
  }, [loginAction, setBothLoginResult]);

  const setBothLoginResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === SET_LOGIN_SOCIAL_SUCCESS) {
        setIsComingFromScreen({ screen: NAVIGATION.LIFESAVER.LifesaverMain });
      }
      if (act === SET_LOGIN_SOCIAL_FAILED) {
        if (setLoginSocialFailed?.message !== INTERNAL_SERVER_ERROR) {
          console.log(setLoginSocialFailed?.message);
        }
      }
      setLoginSocialClear();
    },
    [
      INTERNAL_SERVER_ERROR,
      setIsComingFromScreen,
      setLoading,
      setLoginSocialClear,
      setLoginSocialFailed?.message,
    ]
  );
  // Automaticly open modal at focus
  useEffect(() => {
    if (
      isFocused &&
      isComingFromScreen?.screen &&
      // if user already subcribed not go anywhere using (currentSubs === '')
      // still show modal after auth flow it mean still not login (userId === '')
      (currentSubs === '' || userId === '' || isEligibleBajo) &&
      isEligible !== undefined &&
      !getCurrentSubsFetch &&
      !getIsUserEligibleFetch
    ) {
      setShowModal({
        isEligibleEvent,
        isEligibleBajo,
        isEligible,
        alreadyKYC,
        alreadySetPin,
        isComingFromDeepLink,
        isComingFromScreen,
        userId,
      });
    }
    if (
      isFocused &&
      isComingFromScreen?.screen &&
      currentSubs === LIFESAVER_PLUS &&
      userId !== '' &&
      isEligibleBajo !== undefined &&
      !getCurrentSubsFetch &&
      !getIsUserEligibleFetch
    ) {
      setNavigationLifesaverPlus();
    }
  }, [
    alreadyKYC,
    alreadySetPin,
    currentSubs,
    userId,
    isComingFromDeepLink,
    isComingFromScreen,
    isEligible,
    isFocused,
    setShowModal,
    isEligibleBajo,
    setNavigationLifesaverPlus,
    getCurrentSubsFetch,
    getIsUserEligibleFetch,
    LIFESAVER_PLUS,
    isEligibleEvent,
  ]);

  // Automaticly open modal at focus
  const setShowModal = useCallback(
    (call) => {
      if (call.userId === '') {
        return setIsShowModalNotLogin(true);
      }
      if (call.isEligibleBajo) {
        setIsComingFromScreen({});
        return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverVoucher);
      }
      if (call.isEligibleEvent) {
        setIsComingFromScreen({});
        return navigation.navigate(NAVIGATION.EVENT.EventDetailTicket, {
          eventId: call.isEligibleEvent,
          isFreeLifeSaver: true,
        });
      }
      if (call.isEligible === false) {
        return setIsShowModalNotEligible(true);
      }
      if (call.isEligible && (!call.alreadyKYC || !call.alreadySetPin)) {
        if (call.isComingFromDeepLink) {
          return onPressNotKyc();
        }
        return setIsShowModalNotKyc(true);
      }
      if (
        call.isComingFromScreen?.params?.isShowModal &&
        !call.isComingFromDeepLink
      ) {
        return setIsShowModalAgreement(true);
      }
      setIsComingFromScreen({});
      return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverOrderPage, {
        product: selectedPackage,
        from: 'start',
        recurring: false,
      });
    },
    [navigation, onPressNotKyc, selectedPackage, setIsComingFromScreen]
  );

  const setNavigationLifesaverPlus = useCallback(() => {
    setIsComingFromScreen({});
    navigation.navigate(NAVIGATION.LIFESAVER.LifesaverProtected);
  }, [navigation, setIsComingFromScreen]);

  useEffect(() => {
    if (currentScrollDest < scrollToDest || currentScrollDest === null) {
      setHideScrollButton(true);
    } else {
      setHideScrollButton(false);
    }
  }, [currentScrollDest, scrollToDest]);

  useEffect(() => {
    if (!filter.focus) {
      getListRs(filter);
    }
  }, [filter, getListRs]);

  const setSignInGoogle = () => {
    try {
      setTimeout(() => {
        setSignInSocial(GOOGLE).then((r) => {
          const { names, birthdays, emailAddresses, accessToken, p } = r;
          setLoading(true);
          setCheckEmail({
            token: accessToken,
            channelType: GOOGLE,
            email: emailAddresses[0].value,
          })
            .then(() => {
              setIsShowModalNotLogin(false);
              // 200 => Akun terdaftar maka login
              setLoginSocial({
                name: names?.length ? names[0].displayName : '',
                dob: setDobGoogle(birthdays),
                email: emailAddresses[0].value,
                channelUid: emailAddresses[0].metadata.source.id,
                token: accessToken,
                channelType: GOOGLE,
                deviceId: deviceId,
                deviceType: DeviceInfo.getModel(),
                deviceLocation: `${p.coords.latitude},${p.coords.longitude}`,
              });
            })
            .catch((error) => {
              // 400 => Akun belum terdaftar maka register
              setLoading(false);
              if (error.response.status === RESPONSE_STATUS.BAD_REQUEST) {
                setIsComingFromScreen({
                  screen: NAVIGATION.LIFESAVER.LifesaverMain,
                });
                navigation.navigate(NAVIGATION.REGISTER.RegisterNextStep, {
                  name: names?.length ? names[0].displayName : '',
                  dob: setDobGoogle(birthdays),
                  email: emailAddresses[0].value,
                  channelUid: emailAddresses[0].metadata.source.id,
                  token: accessToken,
                  channelType: GOOGLE,
                });
              }
              if (error.response.status === RESPONSE_STATUS.ERR_NETWORK) {
                setToastMsg({
                  type: TOAST.type.error,
                  text1: 'Internet Kamu sedang bermasalah',
                });
              }
            });
        });
      }, 1000);
    } catch (error) {
      setLoading(false);
      setToastMsg({
        type: TOAST.type.error,
        text1: 'Internet Kamu sedang bermasalah',
      });
    }
  };

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      x: 0,
      y: scrollToDest || 0,
      animated: true,
    });
  };

  const onSubscribePress = () => {
    if (userId === '') {
      return setIsShowModalNotLogin(true);
    }
    if (isEligibleBajo) {
      return navigation.navigate(NAVIGATION.LIFESAVER.LifesaverVoucher);
    }
    if (isEligibleEvent) {
      setIsComingFromScreen({});
      return navigation.navigate(NAVIGATION.EVENT.EventDetailTicket, {
        eventId: isEligibleEvent,
        isFreeLifeSaver: true,
      });
    }
    if (isEligible === false) {
      return setIsShowModalNotEligible(true);
    }
    if (isEligible && (!alreadyKYC || !alreadySetPin)) {
      return setIsShowModalNotKyc(true);
    }
    if (currentSubs !== '') {
      return setIsShowModalComingSoon(true);
    }
    return setIsShowModalAgreement(true);
  };

  const onPressTnc = () => {
    setIsShowModalAgreement(false);
    setIsShowModalNotLogin(false);
    setIsShowModalNotKyc(false);
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.LifesaverMain,
    });
    navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
  };

  const onPressRiplay = () => {
    setIsShowModalAgreement(false);
    setIsShowModalNotLogin(false);
    setIsShowModalNotKyc(false);
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.LifesaverMain,
    });
    navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
      personalURL: false,
    });
  };

  const onPressNotKyc = useCallback(() => {
    setIsShowModalNotKyc(false);
    setIsComingFromScreen({
      screen: NAVIGATION.LIFESAVER.LifesaverMain,
      params: {
        isShowModal: false,
      },
    });
    if (!alreadyKYC && !alreadySetPin) {
      return navigation.navigate(NAVIGATION.KYC.KycMain);
    }
    return navigation.navigate(NAVIGATION.KYC.KycCreatePin);
  }, [alreadyKYC, alreadySetPin, navigation, setIsComingFromScreen]);

  function textRed(text) {
    return (
      <Text
        textStyle="semi"
        // line={30}
        color={Color.primary.light.primary60}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }

  const FAB = useCallback(
    ({ onPress, onLayout }) => {
      return (
        <View style={style.FAB.container} onLayout={onLayout}>
          <>
            <ArrowDown2White width={20} height={20} style={style.FAB.icon} />
            <TouchableOpacity style={style.FAB.item} onPress={onPress}>
              <LinearGradient
                style={[style.FAB.btnItem]}
                useAngle
                angle={179}
                colors={[
                  '#FBB04C',
                  '#FD8C48',
                  '#FE684D',
                  '#F43036',
                  '#F0232B',
                  '#ED1C24',
                  '#ED1C24',
                ]}>
                <Text textStyle="semi" color={Color.main.light.white}>
                  {trans(locale, lang, 'mulaiBerlangganan')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        </View>
      );
    },
    [lang]
  );

  const renderTextSubscribe = useMemo(() => {
    if (
      currentSubs === LIFESAVER &&
      selectedPackage === LIFESAVER_PLUS &&
      !isEligibleBajo
    ) {
      return trans(locale, lang, 'Upgrade');
    }
    if (currentSubs === LIFESAVER_PLUS) {
      return trans(locale, lang, 'alreadyLifesaverPlus');
    }
    return trans(locale, lang, 'mulaiBerlangganan');
  }, [
    LIFESAVER,
    LIFESAVER_PLUS,
    currentSubs,
    isEligibleBajo,
    lang,
    selectedPackage,
  ]);
  return (
    <View style={style.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={Color.landingPage.light.red}
      />
      <Header
        onBackPress={() => {
          navigation.pop();
          setIsComingFromScreen({});
        }}
        title="LifeSAVER"
        isLight
        headerStyle={[
          style.header,
          { height: APP.header.height + insets.top, paddingTop: insets.top },
        ]}
      />
      <ScrollView
        ref={(ref) => {
          scrollRef.current = ref;
        }}
        style={style.scrollViewContainer}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const location = event.nativeEvent.contentOffset;
          setCurrentScrollDest(location.y);
        }}>
        <ScrollContents lang={lang} onGetListRSPress={() => setListRs(true)} />
        {/* <TotalClaim /> */}
        <NeverGameOver {...props} />
        <PricesTable
          lang={lang}
          isEligiblePos={getEligiblePosResponse?.isEligible}
          navigation={navigation}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            setScrollToDest(layout.y);
          }}
        />
        <ImageBackground
          source={CloudBackground}
          resizeMode="stretch"
          style={style.subscribeBtnContainer}>
          <Button
            disabled={
              currentSubs === LIFESAVER_PLUS ||
              (currentSubs === LIFESAVER && selectedPackage === LIFESAVER)
            }
            onPress={onSubscribePress}
            type="linear-gradient"
            style={style.subscribeBtn}>
            {renderTextSubscribe}
          </Button>
          <TouchableWithoutFeedback onPress={() => setDialogDetail(true)}>
            <View style={style.m30}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={23.8}
                color={Color.primary.light.primary90}
                style={style.textUnderline}>
                {trans(locale, lang, 'klikUntukLihat')}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={style.ph5}>
            <Text
              size={Size.text.body2.size}
              line={23.8}
              fontStyle="italic"
              color={Color.neutral.light.neutral40}>
              {textRed('*')}
              {trans(locale, lang, 'SelamaPeriode')}
            </Text>
          </View>
        </ImageBackground>
        <TermsFAQ {...props} onBackPress={() => setIsComingFromScreen({})} />
      </ScrollView>
      {hideScrollButton && <FAB {...props} onPress={() => onPressTouch()} />}
      <DialogDetail
        {...props}
        selectedPackage={selectedPackage}
        isEligiblePos={getEligiblePosResponse?.isEligible}
        isVisible={dialogDetail}
        setIsVisible={setDialogDetail}
        onRequestClose={() => setDialogDetail(false)}
        onClosePress={() => setDialogDetail(false)}
      />
      <ModalAgreement
        lang={lang}
        isVisible={isShowModalAgreement}
        onRequestClose={() => setIsShowModalAgreement(false)}
        onClosePress={() => setIsShowModalAgreement(false)}
        locale={locale}
        onPressTnc={() => {
          setIsShowModalAgreement(false);
          setIsComingFromScreen({
            screen: NAVIGATION.LIFESAVER.LifesaverMain,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        onPressRiplay={() => {
          setIsShowModalAgreement(false);
          setIsComingFromScreen({
            screen: NAVIGATION.LIFESAVER.LifesaverMain,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
            personalURL: false,
          });
        }}
        onSubs={() => {
          setIsShowModalAgreement(false);
          setIsComingFromScreen({
            screen: NAVIGATION.LIFESAVER.LifesaverMain,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverOrderPage, {
            product: selectedPackage,
            from: 'start',
            recurring: false,
          });
        }}
      />
      <ModalNotKyc
        isVisible={isShowModalNotKyc}
        lang={lang}
        onRequestClose={() => setIsShowModalNotKyc(false)}
        onClosePress={() => setIsShowModalNotKyc(false)}
        onPressTnc={onPressTnc}
        onPressRiplay={onPressRiplay}
        onEKYCPress={onPressNotKyc}
      />
      <ModalSuccessRemember
        isVisible={isShowModalSuccessRemember}
        onRequestClose={() => setIsShowModalSuccessRemember(false)}
        onPressClose={() => setIsShowModalSuccessRemember(false)}
        lang={lang}
        locale={locale}
      />
      <ModalNotEligible
        onRequestClose={() => setIsShowModalNotEligible(false)}
        onPressClose={() => setIsShowModalNotEligible(false)}
        isVisible={isShowModalNotEligible}
        onPressRemember={setWaiting}
        lang={lang}
        locale={locale}
      />
      <ModalNotLogin
        isComingFromDeepLink={isComingFromDeepLink}
        isVisible={isShowModalNotLogin}
        colorScheme={colorScheme}
        lang={lang}
        onRequestClose={() => setIsShowModalNotLogin(false)}
        onClosePress={() => setIsShowModalNotLogin(false)}
        onSignUpWithGooglePress={setSignInGoogle}
        onSignInPress={() => {
          setIsShowModalNotLogin(false);
          setIsComingFromScreen({
            screen: NAVIGATION.LIFESAVER.LifesaverMain,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.LOGIN.LoginMain);
        }}
        onSignUpPress={() => {
          setIsShowModalNotLogin(false);
          setIsComingFromScreen({
            screen: NAVIGATION.LIFESAVER.LifesaverMain,
            params: {
              isShowModal: true,
            },
          });
          navigation.navigate(NAVIGATION.REGISTER.RegisterInput, {
            isComingFromDeepLink: isComingFromDeepLink,
          });
        }}
        onPressTnc={onPressTnc}
        onPressRiplay={onPressRiplay}
      />
      <ModalListRs
        isVisible={listRs}
        colorScheme={colorScheme}
        lang={lang}
        locale={locale}
        loadingFilterRs={loadingFilterRs}
        paginationLoading={paginationLoading}
        filter={filter}
        inputFocus={inputFocus}
        onRequestClose={() => {
          setListRs(false);
          setFilter({
            search: '',
            page: 1,
            limit: 5,
            sort: true,
            focus: false,
          });
        }}
        onClosePress={() => {
          setListRs(false);
          setFilter({
            search: '',
            page: 1,
            limit: 5,
            sort: true,
            focus: false,
          });
        }}
        onPressClose={() => {
          setListRs(false);
          setFilter({
            search: '',
            page: 1,
            limit: 5,
            sort: true,
            focus: false,
          });
        }}
        onFocusInput={() => {
          setInputFocus(true);
        }}
        onBlurInput={() => {
          setInputFocus(false);
          setLoadingFilterRs(true);
          setFilter({
            ...filter,
            focus: false,
            limit: 5,
          });
        }}
        onFilterPress={(type) => {
          setLoadingFilterRs(true);
          if (type === 'ALL') {
            setFilter({
              ...filter,
              focus: false,
              type: '',
            });
          } else {
            setFilter({
              ...filter,
              focus: false,
              type: type,
            });
          }
        }}
        onChangeTextInput={(text) => {
          setFilter({
            ...filter,
            focus: true,
            search: text,
          });
        }}
        onPressSort={() => {
          setLoadingFilterRs(true);
          setFilter({
            ...filter,
            sort: !filter.sort,
            limit: 5,
          });
        }}
        onEndReached={() => {
          if (getListRsResponse?.totalPages !== 1) {
            setPaginationLoading(true);
            setFilter({
              ...filter,
              focus: false,
              limit: filter?.limit + 5,
            });
          }
        }}
        getListRsResponse={getListRsResponse}
      />
      <ModalFailedLogin
        isVisible={isShowFailedModalLogin}
        lang={lang}
        locale={locale}
        isLoginSocialFailed
        onRequestClose={() => setIsShowFailedModalLogin(false)}
        onPressButtonBack={() => setIsShowFailedModalLogin(false)}
        onPressButtonRegister={() => {
          setIsShowFailedModalLogin(false);
          navigation.replace(NAVIGATION.REGISTER.Register);
        }}
      />
    </View>
  );
}

export default LifesaverMain;

LifesaverMain.propTypes = {
  route: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  getIsUserEligible: PropTypes.func.isRequired,
  getIsUserEligibleResponse: PropTypes.objectOf(Object).isRequired,
  getIsUserEligibleError: PropTypes.objectOf(Object).isRequired,
  getListRs: PropTypes.func.isRequired,
  getListRsResponse: PropTypes.objectOf(Object).isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  setSubmissionClear: PropTypes.func.isRequired,
  setSubmission: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsClear: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  setSubmissionError: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  getCurrentSubsFetch: PropTypes.bool.isRequired,
  setWaiting: PropTypes.func.isRequired,
  setLoginSocial: PropTypes.func.isRequired,
  setLoginSocialClear: PropTypes.func.isRequired,
  setLoginSocialFailed: PropTypes.objectOf(Object).isRequired,
  deviceId: PropTypes.string.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
  loginAction: PropTypes.string.isRequired,
  setLoginFailed: PropTypes.objectOf(Object).isRequired,
  isShowFailedModalLogin: PropTypes.bool.isRequired,
  getIsUserEligibleFetch: PropTypes.bool.isRequired,
  setIsShowFailedModalLogin: PropTypes.func.isRequired,
  getEligiblePos: PropTypes.func.isRequired,
  getEligiblePosResponse: PropTypes.objectOf(Object).isRequired,
};
