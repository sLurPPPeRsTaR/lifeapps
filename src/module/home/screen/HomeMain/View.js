import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  Alert,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  LogoPutih,
  MoneyWidget,
  info,
  kycUser,
  KtpNotValid,
  CaraClaim,
  LifeSaver1,
  LifeSaver2,
  LifeSaver3,
  LifeSaver4,
  LifeSaver2ID,
  LifeSaver1ID,
  ChangePhoneIcon,
  Faq,
  BadgeTick,
  ClockOTP,
  EcardDisable,
  Invite,
  Community,
  History,
  Keranjang,
  Ecard,
  AnnouncementLocked,
  KalenderIcon,
  HistoryDisable,
  BannerWidgetEventTicketLifeSaver,
  DummyProfile,
  LifeTagWidget,
  PolisRestructurisation,
  ReLiveness,
  ReUploadIdCard,
  DompetPayment,
  BannerClaimEN,
  BannerClaimID,
  Liveness,
  BannerLifetagComingSoonEN,
  BannerLifetagComingSoonID,
  LoginIllustration,
  LifeSaver3ID,
} from 'ca-config/Image';
import { Money, Notification, Logo, Wave } from 'ca-config/Svg';
import _ from 'lodash';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import {
  NAVIGATION,
  APP,
  RESPONSE_STATE,
  BASE_URL,
  PRODUCT,
  API,
  EVENT_CODE,
  POLICY_STATUS,
  TYPE,
} from 'ca-util/constant';
import {
  Padder,
  BottomSheet,
  Shadow,
  Base15 as Base,
} from 'ca-component-container/index';
import { Button, Input, Text } from 'ca-component-generic/index';
import moment from 'moment/min/moment-with-locales';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AFsetCustomerUserId } from 'ca-util/AppsFlyer';
import { regexGlobalPhoneNumber } from 'ca-util/common';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { formatCurrency } from 'ca-util/numbro';
import {
  GET_POLICIES_SUCCESS,
  GET_POLICY_WIDGET_HOME_PUBLIC_FAILED,
  GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS,
} from 'ca-module-home/homeConstant';
import { GET_PENDING_INVITES_SUCCESS } from 'ca-module-invitation/invitationConstant';
import { setProfileRequestOtpApi } from 'ca-module-profile/profileApi';
import { setLogoutApi, getUserFlagApi } from 'ca-module-auth/authApi';
import {
  getEventDetailApi,
  getEventDetailPublicApi,
} from 'ca-module-event/eventApi';
import { ModalAgreement } from 'ca-module-lifesaver/screen/LifesaverMain/component/modal';
import Dash from 'react-native-dash';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import Config from 'react-native-config';
import {
  GET_ARTICLES_FAILED,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLE_CATEGORIES_FAILED,
  GET_ARTICLE_CATEGORIES_SUCCESS,
} from 'ca-module-article/articleConstant';
import CardWidget from './component/CardWidget';
import SwitchProjects from './component/SwitchProjects';
import style from './style';
import locale from './locale';
import TotalClaimBanner from './component/TotalClaimBanner';
import ReminderKKPMModal from './component/ReminderKKPMModal';

function HomeMain(props) {
  moment.locale(lang);
  const {
    navigation,
    lang,
    colorScheme,
    userId,
    setIsShowModalComingSoon,
    alreadySetPin,
    alreadyKYC,
    kkpmFlag,
    getNotifCount,
    getNotifCountResponse,
    getNotifCountClear,
    isLastAlterSuccess,
    isProgressCodePush,
    getPolicyProposal,
    getPolicyProposalResponse,
    getPolicyProposalClear,
    getPolicyProposalClearResponse,
    getPolicyProposalError,
    getPolicyProposalErrorClear,
    width,
    height,
    getPolicyWidgetHome,
    getPolicyWidgetHomeResponse,
    getPolicyWidgetHomeClear,
    getCurrentSubs,
    getCurrentSubsClear,
    getCurrentSubsResponse,
    getPendingInvites,
    getPendingInvitesResponse,
    mobilePhoneNumber,
    isComingFromScreen,
    isUpdataModalAlreadyShowed,
    setTemporaryHomeState,
    currentScreen,
    setToastMsg,
    homeAction,
    invitationAction,
    appConfig: { features },
    setLoading,
    setLoginClear,
    setIsComingFromScreen,
    accessToken,
    setUserData,
    userData,
    getEventUserTicket,
    getEventUserTicketResponse,
    getEventUpcoming,
    getEventUpcomingResponse,
    getLifetagFlag,
    getLifetagFlagResponse,
    getSubscriptionDetail,
    getSubscriptionDetailResponse,
    getPolicyWidgetHomePublicResponse,
    getPolicyWidgetHomePublic,
    getInvoiceMaster,
    getInvoiceMasterResponse,
    // getPolicyWidgetHomePublicClear,
    getPolicyWidgetHomePublicError,
    getProfileUserParty,
    isComingFromDeepLink,
    isComingFromDeepLinkUrl,
    setIsComingFromDeepLink,
    setIsComingFromDeepLinkUrl,
    route: { params },
    // article
    getArticleCategories,
    getArticleCategoriesResponse,
    getArticleCategoriesList,
    getArticles,
    getArticlesResponse,

    articleAction,
    setWidgetToggle,
    widgetToggle,
    
  } = props;
  const currentRouteName = navigationRef.current.getCurrentRoute().name;
  const {
    INTERNAL_SERVER_ERROR,
    TOO_FREQUENTLY_,
    ALREADY_REGISTERED,
    BAD_REQUEST,
  } = RESPONSE_STATE;

  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  // USESTATE //
  const [refreshing, setRefreshing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isTIModalVisible, setIsTIModalVisible] = useState(false);
  const [isNextBenefitModal, setIsNextBenefitModal] = useState(false);
  const [isUpdataReminderModal, setIsUpdataReminderModal] = useState(false);
  const [isAlterSuccessModal, setIsAlterSuccessModal] = useState(false);
  const [isAlterFailModal, setIsAlterFailModal] = useState(false);
  const [isChangePhoneModal, setIsChangePhoneModal] = useState(false);
  const [isLifecardModal, setIsLifecardModal] = useState(false);
  const [widgetActivatedLifeSAVER, setWidgetActivatedLifeSAVER] =
    useState(true);
  const [isSubmitPhoneNumber, setIsSubmitPhoneNumber] = useState(false);
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [phoneNumberInputMessage, setPhoneNumberInputMessage] = useState(null);
  const [isValidPhoneNumberInput, setIsValidPhoneNumberInput] = useState(false);
  const [isPhoneNumberLoading, setIsPhoneNumberLoading] = useState(false);
  const [isTooFrequentlyModal, setIsTooFrequentlyModal] = useState(false);
  const [isTermConditionModalVisible, setisTermConditionModalVisible] =
    useState(false);
  const [eventCode, setEventCode] = useState('');
  const [eventDiscount, setDiscount] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);
  const [isHideBenefitValue, setIsHideBenefitValue] = useState(true);
  const [errRequestOtp, setErrRequestOtp] = useState('');
  const [widgetInvitedIsVisible, setWidgetInvitedIsVisible] = useState(false);
  const [imgActive, setImgActive] = useState(0);
  const [userTipsActive, setUserTipsActive] = useState(0);
  const [numberOfWidget, setNumberOfWidget] = useState();
  const [defaultWidthWidget, setdefaultWidthWidget] = useState(311);

  const [isEventCodeModal, setIsEventCodeModal] = useState(false);
  const [accessCode, setAccessCode] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState();
  const [id, setId] = useState();
  const [slugId, setSlugId] = useState();
  const [eventId, setEventId] = useState();
  const [highlightPosition, setHighlightPosition] = useState(0);
  const [articlePosition, setArticlePosition] = useState(0);
  const [isShowBannerClaim, setIsShowBannerClaim] = useState(false);
  const [isShowSwitchProject, setIsShowSwitchProject] = useState(false);
  const [dataArticles, setDataArticles] = useState([]);
  const [dataCategoryArticles, setDataCategoryArticles] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loadingCategoryArticle, setLoadingCategoryArticle] = useState(false);

  const onViewRef = useRef((viewableItems) => {
    const { index } = viewableItems?.changed[0];
    setImgActive(index);
  });
  const viewConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 60,
  });

  const articleRef = useRef(0);
  const onViewUserTipsRef = useRef((viewableItems) => {
    const { index } = viewableItems?.changed[0];
    setUserTipsActive(index);
  });
  const viewUserTipsConfigRef = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
  });

  const anuitasPrimaFlag = useMemo(() => {
    return kkpmFlag?.find((i) => i?.policyType === 'anuitasPrima');
  }, [kkpmFlag]);

  const anuitasRetailFlag = useMemo(() => {
    return kkpmFlag?.find((i) => i?.policyType === 'anuitasRetail');
  }, [kkpmFlag]);

  // USEEFFECT //
  useEffect(() => {
    if (isComingFromDeepLink) {
      if (isComingFromDeepLinkUrl === 'idlifecustomer:/polismain') {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabMain' }, { name: 'PolisMain' }],
          })
        );
        setIsComingFromDeepLink(false);
        setIsComingFromDeepLinkUrl({});
        navigation.navigate(NAVIGATION.POLICY.PolisMain);
      }
    }
  }, [
    isComingFromDeepLink,
    isComingFromDeepLinkUrl,
    navigation,
    setIsComingFromDeepLink,
    setIsComingFromDeepLinkUrl,
  ]);

  useEffect(() => {
    if (isFocused) {
      setMountModal(isProgressCodePush);
    }
  }, [isProgressCodePush, setMountModal, isFocused]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPolicyWidgetHomePublic();
      if (userId !== '') {
        getEventUserTicket({ lang });
        AFsetCustomerUserId(userId);
        getPendingInvites();
        getProfileUserParty();
        getPolicyProposal();
        getUserFlagApi()
          .then((res) => {
            const data = res?.data?.data;
            setUserData({
              userData: {
                alreadyKYC: data?.alreadyKYC,
                alreadyLivenessTest: data?.alreadyLivenessTest,
                isReKYC: data?.isReKYC,
                isReLivenessTest: data?.isReLivenessTest,
                isReUploadIdCard: data?.isReUploadIdCard,
                isReLivenessTestAndReUploadIdCard:
                  data?.isReLivenessTestAndReUploadIdCard,
                alreadySetMPin: data?.alreadySetMPin,
                alreadySetPin: data?.alreadySetPin,
              },
            });
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err);
          });
        // getLifetagFlag();
      }
      if (userId !== '' && alreadyKYC) {
        getNotifCount();
        getPolicyWidgetHome();
        getCurrentSubs();
      } else {
        getNotifCountClear();
        getPolicyWidgetHomeClear();
        getCurrentSubsClear();
      }
    });
    return unsubscribe;
  }, [
    alreadyKYC,
    navigation,
    userId,
    getNotifCount,
    getNotifCountClear,
    getPolicyWidgetHome,
    getPolicyWidgetHomeClear,
    isComingFromScreen,
    getCurrentSubs,
    getCurrentSubsClear,
    currentScreen,
    setIsComingFromScreen,
    setUserData,
    getPendingInvites,
    getEventUserTicket,
    lang,
    getLifetagFlag,
    getPolicyWidgetHomePublic,
    getInvoiceMaster,
    getProfileUserParty,
    isComingFromDeepLink,
    isComingFromDeepLinkUrl,
    getPolicyProposal,
  ]);
  useEffect(() => {
    if (isFocused) {
      setHomeResult(homeAction);
    }
  }, [homeAction, isFocused, setHomeResult]);

  // disable get eligible
  // useEffect(() => {
  //   if (isFocused) {
  //     setLifeSaverActionResult(lifesaverAction);
  //   }
  // }, [lifesaverAction, isFocused, setLifeSaverActionResult]);

  useEffect(() => {
    if (isFocused) {
      setInvitationActionResult(invitationAction);
    }
  }, [invitationAction, isFocused, setInvitationActionResult]);
  useEffect(() => {
    if (isFocused) {
      getEventUpcoming({ lang, userId: userData?.userId });
    }
  }, [getEventUpcoming, isFocused, lang, userData?.userId]);
  useEffect(() => {
    if (isFocused) {
      setArticleResult(articleAction);
    }
  }, [articleAction, isFocused, setArticleResult]);
  useEffect(() => {
    if (isFocused) {
      const payloadArticleCategories = {
        page: 1,
        pageSize: 20,
        // categoryName: categoryName,
      };
      const payloadArticles = {
        page: 1,
        pageSize: 5,
        categoryName: categoryName,
      };
      getArticles(payloadArticles);
      getArticleCategories(payloadArticleCategories);
    }
  }, [categoryName, getArticleCategories, getArticles, isFocused]);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);
  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (isTooFrequentlyModal) {
        setIsTooFrequentlyModal(false);
        setTimeout(
          () => {
            setIsChangePhoneModal(true);
          },
          Size.isAndroid ? 200 : 600
        );
      }
    }
  }, [isTooFrequentlyModal, minutes, seconds]);

  // GET RENEWAL WIDGET
  useEffect(() => {
    if (isFocused && getCurrentSubsResponse?.policyNo && userId !== '') {
      getSubscriptionDetail(getCurrentSubsResponse?.policyNo);
    }
  }, [
    getCurrentSubsResponse?.policyNo,
    getSubscriptionDetail,
    isFocused,
    userId,
  ]);

  useEffect(() => {
    if (isFocused) {
      setShowModal(isComingFromScreen);
    }
  }, [isComingFromScreen, isFocused, setShowModal]);
  // This is a handler from FRONTEND to solve delay data information from core in order to remove WidgetActivatedLifeSAVER
  useEffect(() => {
    if (isFocused && isComingFromScreen?.screen === 'TransaksiSukses') {
      setWidgetActivatedLifeSAVER(false);
      setTimeout(() => {
        getEventUserTicket({ lang });
        setWidgetActivatedLifeSAVER(true);
        setIsComingFromScreen({});
      }, 5000);
    }
  }, [
    getEventUserTicket,
    isComingFromScreen?.screen,
    isFocused,
    lang,
    setIsComingFromScreen,
  ]);
  useEffect(() => {
    if (numberOfWidget === 1) {
      const paddingHorizontal = 16 * 2;
      const tempWidth = width - paddingHorizontal;
      setdefaultWidthWidget(
        DeviceInfo.isTablet() ? tempWidth / 1.25 : tempWidth
      );
    } else {
      setdefaultWidthWidget(311);
    }
  }, [numberOfWidget, width]);

  // USECALLBACK//
  const setHomeResult = useCallback(
    (act) => {
      if (act === GET_POLICIES_SUCCESS) {
        setToastMsg({});
      }
      if (act === GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS) {
        setIsShowBannerClaim(true);
      }
      if (act === GET_POLICY_WIDGET_HOME_PUBLIC_FAILED) {
        if (getPolicyWidgetHomePublicError?.message === 'TOTAL_CLAIM_ERROR') {
          setIsShowBannerClaim(false);
        }
      }
    },
    [getPolicyWidgetHomePublicError?.message, setToastMsg]
  );

  const setInvitationActionResult = useCallback(
    (act) => {
      if (act === GET_PENDING_INVITES_SUCCESS) {
        setWidgetInvitedIsVisible(true);
      }
    },
    [setWidgetInvitedIsVisible]
  );
  const LifeSaverText = useCallback(() => {
    return (
      <Text textStyle="bold" size={Size.text.caption1.size}>
        Life
        <Text style={style.textBoldItalic} size={Size.text.caption1.size}>
          SAVER.
        </Text>
      </Text>
    );
  }, []);

  const setMountModal = useCallback(
    (val) => {
      const isNotPrd = !_.isEmpty(TYPE);
      if (val === false || (isNotPrd && val === undefined)) {
        setTimeout(() => {
          if (!mobilePhoneNumber && userId !== '') {
            setTimeout(
              () => {
                setIsChangePhoneModal(true);
              },
              Size.isAndroid ? 200 : 600
            );
            return;
          }
          if (
            alreadyKYC &&
            (anuitasPrimaFlag?.isLastAlterSuccess === null ||
              anuitasPrimaFlag?.isLastAlterSuccess === undefined ||
              anuitasRetailFlag?.isLastAlterSuccess === null ||
              anuitasRetailFlag?.isLastAlterSuccess === undefined)
          ) {
            const flag = !!(
              alreadyKYC &&
              (anuitasPrimaFlag?.isIssuedPolicy ||
                anuitasRetailFlag?.isIssuedPolicy)
            );
            setIsUpdataReminderModal(flag);
          } else if (
            alreadyKYC &&
            userId !== '' &&
            isLastAlterSuccess === true
          ) {
            setIsAlterSuccessModal(true);
          } else if (
            alreadyKYC &&
            userId !== '' &&
            isLastAlterSuccess === false
          ) {
            setIsAlterFailModal(true);
          }
        }, 3000);
      }
    },
    [
      alreadyKYC,
      anuitasPrimaFlag?.isIssuedPolicy,
      anuitasPrimaFlag?.isLastAlterSuccess,
      anuitasRetailFlag?.isIssuedPolicy,
      anuitasRetailFlag?.isLastAlterSuccess,
      isLastAlterSuccess,
      mobilePhoneNumber,
      userId,
    ]
  );
  const setShowModal = useCallback((act) => {
    if (act?.params?.isShowModalFreeLS) {
      setisTermConditionModalVisible(true);
    }
  }, []);

  const setArticleResult = useCallback(
    (act) => {
      if (act === GET_ARTICLES_SUCCESS) {
        setDataArticles(getArticlesResponse?.data);
        setLoading(false);
        setRefreshing(false);
      }
      if (act === GET_ARTICLES_FAILED) {
        setRefreshing(false);
        setLoading(false);
      }
      if (act === GET_ARTICLE_CATEGORIES_SUCCESS) {
        const newObj = { id: 0, name: '', isActive: true };
        const dataCategory = getArticleCategoriesList?.map((val, idx) => {
          return {
            id: idx + 1,
            name: val?.name,
            isActive: val?.isActive || false,
          };
        });
        setDataCategoryArticles([newObj, ...dataCategory]);
        setLoading(false);
        setLoadingCategoryArticle(false);
        setRefreshing(false);
      }
      if (act === GET_ARTICLE_CATEGORIES_FAILED) {
        setLoading(false);
        setLoadingCategoryArticle(false);
        setRefreshing(false);
      }
    },
    [getArticleCategoriesList, getArticlesResponse?.data, setLoading]
  );

  // USEMEMO //
  // Next Benefit
  const nextBenefitArray = useMemo(() => {
    const res = getPolicyWidgetHomeResponse?.data;
    if (!res) {
      return [];
    }

    let dataArray = [];
    if (res?.mantapWidget) {
      dataArray = [...dataArray, ...res?.mantapWidget];
    }
    if (res?.anuitasWidget) {
      dataArray = [...dataArray, ...res?.anuitasWidget];
    }

    if (_.isEmpty(dataArray)) {
      return [];
    }
    return dataArray.sort((a, b) => moment(a.date).diff(moment(b.date)));
  }, [getPolicyWidgetHomeResponse?.data]);

  // WIDGET //
  const widgetList = [
    { key: 0, render: renderWidgetSubmissionPayment() },
    { key: 1, render: renderWidgetRenewalPayment() },
    { key: 2, render: renderWidgetGracePeriodPayment() },
    { key: 3, render: renderWidgetInvitation() },
    // { key: 4, render: renderWidgetLifeTag() },
    { key: 5, render: renderWidgetInvited() },
    { key: 6, render: renderWidgetKYC() },
    // { key: 7, render: renderWidgetBajoRun() },
    { key: 8, render: renderWidgetActivatedLifeSAVER() },
    { key: 9, render: renderWidgetReEkyc() },
    { key: 10, render: renderWidgetLiveness() },
    { key: 11, render: renderAnuitasPrimaWidget() },
  ];

  const resultFilter = widgetList?.filter((item) => {
    return item?.render !== null;
  });

  function renderWidgetInvitation() {
    if (
      !features.lifesaver ||
      userId === '' ||
      !widgetToggle.widgetInvitation
    ) {
      return null;
    }
    if (
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_POS ||
      userData?.userParty?.length
    ) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={Invite}
          content1={trans(locale, lang, 'inviteUser')}
          btnTitle={trans(locale, lang, 'invite')}
          secondBtnTitle={trans(locale, lang, 'nanti')}
          secondBtnOnPress={() => {
            setWidgetToggle({
              widgetInvitation: false,
            });
          }}
          onPress={() => {
            navigation.navigate(NAVIGATION.INVITATION.InvitationMain);
          }}
        />
      );
    }
    return null;
  }

  function renderWidgetLifeTag() {
    if (!features.lifesaver || userId === '') {
      return null;
    }
    if (getLifetagFlagResponse?.data?.alreadyLinkLifeTag) {
      return null;
    }

    if (
      getLifetagFlagResponse?.data?.hasLifeSaver &&
      getLifetagFlagResponse?.data?.alreadyOrderLifeTag &&
      !getLifetagFlagResponse?.data?.alreadyLinkLifeTag
    ) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={LifeTagWidget}
          content1={trans(locale, lang, 'siapDihubungkan')}
          btnTitle={trans(locale, lang, 'hubungkanLifetag')}
          onPress={() => {
            navigation.navigate(NAVIGATION.LIFETAG.LifetagQrScanner);
          }}
        />
      );
    }

    if (getLifetagFlagResponse?.data?.hasLifeSaver) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={LifeTagWidget}
          content1={trans(locale, lang, 'hasLiveSaver')}
          btnTitle={trans(locale, lang, 'dapatkanLifetag')}
          onPress={() => {
            navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
          }}
        />
      );
    }
    return null;
  }

  function renderWidgetInvited() {
    if (!features?.lifesaver) return null;
    if (
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS ||
      getCurrentSubsResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_POS ||
      userId === ''
    ) {
      return null;
    }
    if (
      widgetInvitedIsVisible &&
      getPendingInvitesResponse?.listInviting?.length > 0
    ) {
      const imageUri = {
        uri: `${BASE_URL}${API.USER.photoThumbnail}/${getPendingInvitesResponse?.listInviting[0]?.inviteePhoto}`,
        headers: {
          Authorization: `Bearer ${accessToken?.token?.access_token}`,
        },
      };
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={
            getPendingInvitesResponse?.listInviting[0]?.inviteePhoto !== '' &&
            getPendingInvitesResponse?.listInviting[0]?.inviteePhoto !== null
              ? imageUri
              : DummyProfile
          }
          content1={getPendingInvitesResponse?.listInviting[0]?.inviteeName}
          content2={trans(locale, lang, 'mengundang')}
          content3={LifeSaverText()}
          btnTitle={trans(locale, lang, 'mulaiSekarang')}
          onPress={() => {
            navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
          }}
        />
      );
    }
    return null;
  }

  function renderWidgetKYC() {
    if (!alreadyKYC && userId) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={kycUser}
          content1={trans(locale, lang, 'verifikasiSekarangKyc')}
          btnTitle={trans(locale, lang, 'verifikasiYuk')}
          onPress={() => {
            if (!alreadyKYC && userId !== '') {
              navigation.navigate(NAVIGATION.KYC.KycMain);
            } else if (!alreadySetPin && userId !== '') {
              navigation.navigate(NAVIGATION.KYC.KycCreatePin);
            }
          }}
        />
      );
    }
    return null;
  }

  function renderAnuitasPrimaWidget() {
    if (
      (anuitasPrimaFlag?.isLastAlterSuccess === null ||
        anuitasPrimaFlag?.isLastAlterSuccess === undefined) &&
      alreadyKYC &&
      anuitasPrimaFlag?.isIssuedPolicy
    ) {
      const flag = anuitasPrimaFlag;
      const policyName = 'IFG Anuitas Prima';
      const onCardPress = () => {
        navigation.navigate(NAVIGATION.UPDATA.Updata, {
          category: 'reminder',
          source: flag?.source,
          isUploadedKKAndKTP: flag?.isUploadedKKAndKTP,
        });
      };
      const content1 =
        flag?.issuedPolicyLastDate !== null ? (
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            style={style.flexShrink1}>
            {trans(locale, lang, 'pengkinianTerakhir')}{' '}
            <Text textStyle="bold" size={Size.text.caption1.size}>
              {policyName}
            </Text>
            {': '}
            <Text textStyle="bold" size={Size.text.caption1.size} line={17}>
              {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}
            </Text>
            {'.'}
            {trans(locale, lang, 'lakukanPengkinianData')}
          </Text>
        ) : (
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            style={style.flexShrink1}>
            {trans(locale, lang, 'kamuBelumMelakukan')}{' '}
            <Text textStyle="bold" size={Size.text.caption1.size}>
              {policyName}
            </Text>{' '}
            {trans(locale, lang, 'kamuTetapBerlanjut')}
          </Text>
        );

      const styleImg = {
        marginRight: 6,
        width: 52,
        height: 52,
        top: -7,
      };
      return (
        <CardWidget
          onCardPress={onCardPress}
          img={KalenderIcon}
          styleImg={styleImg}
          content1={content1}
        />
      );
    }
    return null;
  }

  function renderAnuitasRetailWidget() {
    if (
      (anuitasRetailFlag?.isLastAlterSuccess === null ||
        anuitasRetailFlag?.isLastAlterSuccess === undefined) &&
      alreadyKYC &&
      anuitasRetailFlag?.isIssuedPolicy
    ) {
      const flag = anuitasRetailFlag;
      const policyName = 'IFG Anuitas';
      const onCardPress = () => {
        navigation.navigate(NAVIGATION.UPDATA.Updata, {
          category: 'reminder',
          source: flag?.source,
          isUploadedKKAndKTP: flag?.isUploadedKKAndKTP,
        });
      };
      const content1 =
        flag?.issuedPolicyLastDate !== null ? (
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            style={style.flexShrink1}>
            {trans(locale, lang, 'pengkinianTerakhir')}{' '}
            <Text textStyle="bold" size={Size.text.caption1.size}>
              {policyName}
            </Text>
            {': '}
            <Text textStyle="bold" size={Size.text.caption1.size} line={17}>
              {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}
            </Text>
            {'.'}
            {trans(locale, lang, 'lakukanPengkinianData')}
          </Text>
        ) : (
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={17}
            style={style.flexShrink1}>
            {trans(locale, lang, 'kamuBelumMelakukan')}{' '}
            <Text textStyle="bold" size={Size.text.caption1.size}>
              {policyName}
            </Text>{' '}
            {trans(locale, lang, 'kamuTetapBerlanjut')}
          </Text>
        );

      const styleImg = {
        marginRight: 6,
        width: 52,
        height: 52,
        top: -7,
      };
      return (
        <CardWidget
          onCardPress={onCardPress}
          img={KalenderIcon}
          styleImg={styleImg}
          content1={content1}
        />
      );
    }
    return null;
  }

  function renderLoginWidget() {
    if (userId) {
      return null;
    }
    return (
      <View>
        <Shadow borderRadius={16} style={[style.mV10]}>
          <View style={style.loginSection.container}>
            <Image
              source={LoginIllustration}
              style={style.loginSection.illustration}
            />
            <View style={style.loginSection.innerContainer}>
              <Text
                style={style.loginSection.text}
                textStyle="medium"
                line={23.8}>
                {trans(locale, lang, 'silakan')}
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(NAVIGATION.LOGIN.Login);
                  }}>
                  <Text style={style.loginSection.loginRegisterText}>
                    {trans(locale, lang, 'loginCapital')}
                  </Text>
                </TouchableWithoutFeedback>{' '}
                {trans(locale, lang, 'or')}{' '}
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(NAVIGATION.REGISTER.Register);
                  }}>
                  <Text style={style.loginSection.loginRegisterText}>
                    {trans(locale, lang, 'registerCapital')}
                  </Text>
                </TouchableWithoutFeedback>{' '}
                {trans(locale, lang, 'toEnjoyFullFeature')}.
              </Text>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderNextBenefitWidget() {
    if (_.isEmpty(nextBenefitArray)) {
      return null;
    }
    const closestMonth = moment(nextBenefitArray[0].date, 'YYYY-MM-DD').get(
      'month'
    );
    const closestYear = moment(nextBenefitArray[0].date, 'YYYY-MM-DD').get(
      'year'
    );
    const closestBenefitArray = nextBenefitArray.filter((item) => {
      const month = moment(item.date, 'YYYY-MM-DD').get('month');
      const year = moment(item.date, 'YYYY-MM-DD').get('year');
      return month === closestMonth && year === closestYear;
    });
    const totalBenefit = closestBenefitArray.reduce((accum, item) => {
      return accum + item.benefit;
    }, 0);
    return (
      <Shadow animated borderRadius={16} style={style.mB16}>
        <Wave
          width={width}
          height={230}
          style={style.nextBenefitWidget.wave}
          fill={Color.waveWidget.dark.color}
        />
        <Padder style={style.nextBenefitWidget.container}>
          <View style={style.nextBenefitWidget.image.container}>
            <Image
              source={MoneyWidget}
              style={style.nextBenefitWidget.image.image}
              resizeMode="cover"
            />
          </View>
          <View style={style.nextBenefitWidget.content.container}>
            <View style={style.nextBenefitWidget.content.row}>
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}
                style={style.fS1}>
                {trans(locale, lang, 'manfaatSelanjutnya')}
              </Text>
              <TouchableOpacity onPress={() => setIsNextBenefitModal(true)}>
                <Image
                  source={info}
                  style={style.nextBenefitWidget.content.infoIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={style.nextBenefitWidget.content.row}>
              <Text
                textStyle="bold"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}
                style={style.fS1}>
                {`Rp${formatCurrency({
                  value: totalBenefit,
                  mantissa: 2,
                })}`}
              </Text>
            </View>
            <View style={style.nextBenefitWidget.content.row}>
              <Text
                textStyle="regular"
                size={Size.text.caption1.size}
                line={18}
                letterSpacing={0.5}>
                {moment(nextBenefitArray[0].date).format('D MMMM YYYY')}
              </Text>
            </View>
          </View>
        </Padder>
      </Shadow>
    );
  }

  function renderWidgetActivatedLifeSAVER() {
    // const isPolicyActiveExist = getPoliciesResponse?.data?.filter(
    //   (v) => v?.statusCode === 'active'
    // );
    if (widgetActivatedLifeSAVER) {
      const resultLastTransactionTicket = {};
      const getAllTicket = getEventUserTicketResponse?.data?.map((item) => {
        return item;
      });
      const sortTicketByLastTransactionDate = getAllTicket?.sort((a, b) => {
        return (
          new Date(b?.ticket?.dateTime).getTime() -
          new Date(a?.ticket?.dateTime).getTime()
        );
      });
      const sortLastTransactionTicket = sortTicketByLastTransactionDate?.filter(
        (item, index) => {
          return index === 0;
        }
      );
      sortLastTransactionTicket?.forEach((item) => {
        Object.assign(resultLastTransactionTicket, item);
      });
      if (
        resultLastTransactionTicket?.ticket?.isFreeLifeSaver &&
        resultLastTransactionTicket?.ticket?.policyNumber === null &&
        userId !== '' &&
        !resultLastTransactionTicket?.event?.closed
        // isPolicyActiveExist?.length === 0
      ) {
        return (
          <CardWidget
            width={360}
            img={BannerWidgetEventTicketLifeSaver}
            styleImg={
              style.renderWidgetActivatedLifeSAVER.imgWidgetActivatedLifeSAVER
            }
            content1={trans(locale, lang, 'selamatKamuMendapatkan')}
            content2={LifeSaverText()}
            content3={trans(locale, lang, 'gratisUntukSatu')}
            btnTitle={trans(locale, lang, 'daftarDisini')}
            onPress={() => {
              setDiscount(
                resultLastTransactionTicket?.ticket?.product?.discount
              );
              setEventCode(resultLastTransactionTicket?.ticket?.eventCode);
              setSlugId(resultLastTransactionTicket?.event?.slugId);
              setEventId(resultLastTransactionTicket?.event?.id);
              setisTermConditionModalVisible(true);
            }}
          />
        );
      }
    }
    return null;
  }

  function renderWidgetSubmissionPayment() {
    if (!features.lifesaver || userId === '') {
      return null;
    }
    if (getPolicyProposalResponse?.data?.length > 0) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={Keranjang}
          content1={trans(locale, lang, 'selesaikanPembayaran')}
          btnTitle={trans(locale, lang, 'lihatPembayaran')}
          onPress={() => {
            navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
              proposalNo: getPolicyProposalResponse?.data[0]?.proposalNumber,
            });
          }}
        />
      );
    }

    return null;
  }

  function renderWidgetRenewalPayment() {
    if (!features.lifesaver || userId === '') {
      return null;
    }
    if (
      getSubscriptionDetailResponse?.isWidgetRenewal &&
      getSubscriptionDetailResponse?.status === POLICY_STATUS.active &&
      getCurrentSubsResponse.isSubscribe === true
    ) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={DompetPayment}
          content1={trans(locale, lang, 'mohonLakukanPembayaran')}
          content2={moment(getSubscriptionDetailResponse?.policyDueDate).format(
            'D MMM YYYY'
          )}
          btnTitle={trans(locale, lang, 'lihatPembayaran')}
          onPress={() => {
            navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
              policyNo: getCurrentSubsResponse?.policyNo,
              callbackReplace: NAVIGATION.SUBS.SubsDetail,
              callbackParams: {
                policyNo: getCurrentSubsResponse?.policyNo,
              },
            });
          }}
        />
      );
    }
    return null;
  }

  function renderWidgetGracePeriodPayment() {
    if (!features.lifesaver || userId === '') {
      return null;
    }
    if (
      getSubscriptionDetailResponse?.status === POLICY_STATUS.gracePeriod &&
      getCurrentSubsResponse.isSubscribe === true
    ) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={DompetPayment}
          content1={trans(locale, lang, 'segeraSelesaikanPembayaran')}
          btnTitle={trans(locale, lang, 'lihatPembayaran')}
          onPress={() => {
            navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
              policyNo: getCurrentSubsResponse?.policyNo,
              callbackReplace: NAVIGATION.SUBS.SubsDetail,
              callbackParams: {
                policyNo: getCurrentSubsResponse?.policyNo,
              },
            });
          }}
        />
      );
    }
    return null;
  }

  function renderWidgetReEkyc() {
    if (userData?.isReKYC && userId) {
      let reKycImg = userData?.isReLivenessTest ? ReLiveness : ReUploadIdCard;
      reKycImg = userData?.isReLivenessTestAndReUploadIdCard
        ? ReLiveness
        : reKycImg;

      return (
        <CardWidget
          width={defaultWidthWidget}
          img={userData?.alreadyReLivenessTest ? ReUploadIdCard : reKycImg}
          content1={trans(locale, lang, 'verifikasiDataDiriKamu')}
          btnTitle={trans(locale, lang, 'verifikasiUlang')}
          onPress={() => navigation.navigate(NAVIGATION.KYC.KycRetry)}
        />
      );
    }
    return null;
  }

  function renderWidgetLiveness() {
    if (
      !userData?.alreadyLivenessTest &&
      userData?.alreadyKYC &&
      userId &&
      getSubscriptionDetailResponse?.status === 'ACTIVE'
    ) {
      return (
        <CardWidget
          width={defaultWidthWidget}
          img={Liveness}
          content1={trans(locale, lang, 'lakukanVerifikasiWajah')}
          btnTitle={trans(locale, lang, 'mulaiSekarangLiveness')}
          onPress={() => {
            navigation.navigate(NAVIGATION.KYC.KycUploadSelfie);
          }}
        />
      );
    }
    return null;
  }

  function renderWidget() {
    if (
      numberOfWidget === undefined ||
      numberOfWidget !== resultFilter?.length
    ) {
      setNumberOfWidget(resultFilter?.length);
    }
    if (resultFilter?.length === 0) {
      return null;
    }
    return (
      <View>
        <View
          style={
            // eslint-disable-next-line no-nested-ternary
            resultFilter?.length === 2 && DeviceInfo.isTablet()
              ? style.renderWidget.containerTabletTwoItems
              : resultFilter?.length === 1 && DeviceInfo.isTablet()
              ? style.renderWidget.containerTabletOneItem
              : style.renderWidget.container
          }>
          <FlatList
            bounces={false}
            contentContainerStyle={[style.pV5, style.pH15]}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            data={resultFilter}
            keyExtractor={(item) => item?.key}
            renderItem={({ item }) => {
              return item?.render;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={[style.renderWidget.dotContainer]}>
          {resultFilter.map((item, index) => {
            if (resultFilter?.length === 1) {
              return null;
            }
            if (DeviceInfo.isTablet()) {
              return null;
            }
            return (
              <Text
                key={item?.key}
                style={
                  imgActive === index
                    ? style.renderWidget.dotActive
                    : style.renderWidget.dotInActive
                }>
                ●
              </Text>
            );
          })}
        </View>
      </View>
    );
  }

  // FUNCTION //

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  const setOnRefreshing = () => {
    setRefreshing(true);
    if (userId !== '') {
      AFsetCustomerUserId(userId);
    }
    if (userId !== '' && alreadyKYC) {
      getNotifCount();
      getPolicyWidgetHome();
      getCurrentSubs();
    } else {
      getNotifCountClear();
      getPolicyWidgetHomeClear();
      getCurrentSubsClear();
    }
    // request article
    const payloadArticleCategories = {
      page: 1,
      pageSize: 20,
    };
    const payloadArticles = {
      page: 1,
      pageSize: 5,
      categoryName: categoryName,
    };
    getArticles(payloadArticles);
    getArticleCategories(payloadArticleCategories);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Validation Input
  function validatePhoneNumber(text) {
    if (text.length < 1) {
      setPhoneNumberInputMessage({
        error: trans(locale, lang, 'phoneNumberRequired'),
      });
      return false;
    }
    if (text.length > 15) {
      setPhoneNumberInputMessage({
        error: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    if (!regexGlobalPhoneNumber.test(text)) {
      setPhoneNumberInputMessage({
        warning: trans(locale, lang, 'phoneNumberInvalid'),
      });
      return false;
    }
    setPhoneNumberInputMessage(null);
    return true;
  }

  // requestOtp
  const setRequestOtp = (param) => {
    const { id, action } = param;

    const clearState = () => {
      setIsSubmitPhoneNumber(false);
      setIsPhoneNumberLoading(false);
    };

    const onSuccess = () => {
      setIsChangePhoneModal(false);
      navigation.navigate(NAVIGATION.PROFILE.ProfilePhoneEditOtp, {
        action: 'CHANGE_MOBILE_PHONE_NUMBER',
        otpSendTo:
          phoneNumberInput?.charAt(0) !== '+'
            ? `+${phoneNumberInput}`
            : phoneNumberInput,
        otpType: 'number',
        actionType: 'add',
      });
      setPhoneNumberInput('');
    };

    const onFailed = (err) => {
      const { message } = err?.response?.data;
      if (message !== INTERNAL_SERVER_ERROR) {
        if (message?.match(TOO_FREQUENTLY_)) {
          setErrRequestOtp(TOO_FREQUENTLY_);
          setRemainingSeconds(Number(message?.substring(15)));
          setIsChangePhoneModal(false);
          setTimeout(
            () => {
              setIsTooFrequentlyModal(true);
            },
            Size.isAndroid ? 200 : 600
          );
          return;
        }
        if (message === ALREADY_REGISTERED) {
          setErrRequestOtp(ALREADY_REGISTERED);
          setIsValidPhoneNumberInput(false);
          setPhoneNumberInputMessage({
            error: trans(locale, lang, 'nomorHPTerdaftar'),
          });
          return;
        }
        if (message === BAD_REQUEST) {
          setErrRequestOtp(BAD_REQUEST);
          setIsValidPhoneNumberInput(false);
          setPhoneNumberInputMessage({
            error: trans(locale, lang, 'kodeNegaraTidakTerdaftar'),
          });
          return;
        }
        Alert.alert('warning', message);
      }
    };

    setProfileRequestOtpApi({ id, action })
      .then(() => {
        clearState();
        onSuccess();
      })
      .catch((err) => {
        clearState();
        onFailed(err);
      });
  };

  const setLogout = () => {
    const clearState = () => {
      setLoading(false);
      setLoginClear();
    };

    const onSuccess = () => {
      const tempPhoneNumber =
        phoneNumberInput?.charAt(0) !== '+'
          ? `+${phoneNumberInput}`
          : phoneNumberInput;
      navigation.reset({
        index: 0,
        routes: [
          {
            name: NAVIGATION.LOGIN.LoginMain,
            params: { phoneNumber: tempPhoneNumber },
          },
        ],
      });
    };

    setLogoutApi().then(() => {
      clearState();
      onSuccess();
    });
  };

  function renderHeader() {
    const isMaxCount = getNotifCountResponse?.data?.count > 99;
    const countPosition = isMaxCount
      ? { top: -1, right: -3 }
      : { top: -1, right: -1 };
    return (
      <View style={style.header.container}>
        <Pressable
          onLongPress={() => setIsShowSwitchProject(true)}
          disabled={_.isEmpty(Config.TYPE)}>
          {isDark ? (
            <Logo width={50} height={34} />
          ) : (
            <Image
              source={LogoPutih}
              style={style.header.logo}
              resizeMode="cover"
            />
          )}
        </Pressable>
        <TouchableOpacity
          onPress={() => {
            if (userId !== '') {
              navigation.navigate(NAVIGATION.NOTIFICATION.NotificationMain);
            } else {
              navigation.navigate(NAVIGATION.LOGIN.Login);
            }
          }}>
          <View>
            <Notification
              width={26}
              height={26}
              fill={
                isDark ? Color.primary.light.primary90 : Color.main.light.white
              }
            />
            {!_.isEmpty(getNotifCountResponse) &&
            getNotifCountResponse?.data?.count > 0 ? (
              <View style={[style.notifBadge, countPosition]}>
                <Text textStyle="semi" size={7} color={Color.main.light.white}>
                  {isMaxCount ? '99+' : getNotifCountResponse?.data?.count}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderBalanceContainer() {
    return (
      <View style={style.balance.container}>
        <View style={style.balance.header}>
          {/* <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={23.8}
            letterSpacing={0.5}
            color={Color.main[colorScheme].white}
            style={style.me4}>
            {trans(locale, lang, 'totalNilaiTunai')}
          </Text>
          <TouchableOpacity onPress={() => setIsTIModalVisible(true)}>
            <InformationWhite style={style.mt4} />
          </TouchableOpacity> */}
        </View>
        <View style={style.balance.content}>
          {/* <Text
            textStyle="semi"
            size={Size.text.body1.size}
            line={28.9}
            letterSpacing={0.5}
            color={Color.main[colorScheme].white}>
            Rp*******
          </Text>
          <Eyes1 /> */}
        </View>
      </View>
    );
  }

  function renderMenu() {
    const menuContainer = {
      marginHorizontal: 16,
      marginTop:
        APP.header.height +
        insets.top +
        // eslint-disable-next-line no-nested-ternary
        (Size.isIphoneX ? -220 : DeviceInfo.isTablet() ? -320 : -200),
      marginBottom: 16,
    };
    const renderMenuWidget = { position: 'absolute', bottom: -110 };
    return (
      <View style={menuContainer}>
        <Shadow borderRadius={16} style={style.mT9}>
          <Wave
            width={width}
            height={230}
            style={renderMenuWidget}
            fill={Color.wave.dark.color}
          />
          <View style={style.itemMenuInner}>
            {renderItemMenu(
              <Image
                source={features.lifesaver ? Ecard : EcardDisable}
                style={style.renderMenu.image}
              />,
              trans(locale, lang, 'lifeCard'),
              () => {
                const eCardLifesaver =
                  getPolicyWidgetHomeResponse?.data?.eCardLifesaver;

                if (features.lifesaver) {
                  if (eCardLifesaver?.hasActiveLifesaver) {
                    navigation.navigate(NAVIGATION.POLICY.PolisLifeCard, {
                      planName: eCardLifesaver?.planName,
                      eCardLink: eCardLifesaver?.link,
                    });
                  } else {
                    setIsLifecardModal(true);
                  }
                } else {
                  setIsShowModalComingSoon(true);
                }
              }
            )}
            {renderItemMenu(
              <Image source={Community} style={style.renderMenu.image} />,
              trans(locale, lang, 'event'),
              () => {
                navigation.navigate(NAVIGATION.EVENT.EventMain);
                const logs = {
                  af_user_id: userData?.userId,
                  af_channel: Platform.OS,
                };
                console.log('logs ganteng', logs);
                AFLogEvent(AF_EVENT_TILE, logs);
              }
            )}
            {renderItemMenu(
              <Image
                source={features.lifesaver ? History : HistoryDisable}
                style={style.renderMenu.image}
              />,
              trans(locale, lang, 'rsDanKlinik'),
              () => {
                if (features.lifesaver) {
                  navigation.navigate(NAVIGATION.HOME.HomeListRS);
                } else {
                  setIsShowModalComingSoon(true);
                }
              }
            )}
            {renderItemMenu(
              <Image source={Faq} style={style.renderMenu.image} />,
              trans(locale, lang, 'faq'),
              () => {
                navigation.navigate(NAVIGATION.PROFILE.ProfileHelp);
              }
            )}
          </View>
        </Shadow>
      </View>
    );
  }

  function renderItemMenu(icon, text, onPress) {
    return (
      <Pressable style={style.itemMenu} onPress={onPress}>
        {icon}
        <Text
          textStyle="regular"
          size={Size.text.caption1.size}
          color={Color.textMenu.light.color}>
          {text}
        </Text>
      </Pressable>
    );
  }

  function renderGuideCard(properties) {
    const {
      key,
      source,
      sourceTitle1,
      sourceTitle2,
      sourceTitle3,
      desc,
      onPress,
    } = properties;

    const containerStyle = style.mr20;

    const widthGuideCard = (width - 32 - 20) / 2;

    const innerPictureWidth = DeviceInfo.isTablet() ? 200 : widthGuideCard;
    const innerContainerStyle = [
      style.content.guideCard.card,
      {
        width: innerPictureWidth,
      },
    ];

    const innerPictureStyle = {
      width: innerPictureWidth,
      height: innerPictureWidth / 1.25,
    };

    const innerTextConfig = {
      style: style.content.guideCard.innerText,
      textSize: Size.text.body2.size,
    };

    const descTextStyle = style.content.guideCard.descText;

    return (
      <Pressable key={key} onPress={onPress}>
        <Shadow
          borderRadius={16}
          style={[style.flex, containerStyle]}
          innerContainerStyle={style.flex}>
          <View style={innerContainerStyle}>
            <View style={style.content.guideCard.innerPicture}>
              <Image
                source={source}
                resizeMode="cover"
                style={[innerPictureStyle]}
              />
              <View style={innerTextConfig.style}>
                <Text
                  textStyle="bold"
                  size={innerTextConfig.textSize}
                  color={Color.main.light.white}>
                  {sourceTitle1}
                  {'\n'}
                  {sourceTitle2}
                  {'\n'}
                  {sourceTitle3}
                  {'\n'}
                </Text>
              </View>
            </View>
            <View style={descTextStyle}>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                letterSpacing={0.5}
                line={22.8}>
                {desc}
              </Text>
            </View>
          </View>
        </Shadow>
      </Pressable>
    );
  }

  function renderUserTipsContainer() {
    const userTips = (
      <>
        {renderGuideCard({
          key: 0,
          source: CaraClaim,
          sourceTitle1: trans(locale, lang, 'bagaimana'),
          sourceTitle2: trans(locale, lang, 'cara'),
          sourceTitle3: trans(locale, lang, 'klaim'),
          desc: trans(locale, lang, 'caraKlaim'),
          onPress: () => {
            setIsShowModalComingSoon(true);
          },
        })}
        {renderGuideCard({
          key: 1,
          source: PolisRestructurisation,
          sourceTitle1: trans(locale, lang, 'restrukturisasiLine1'),
          sourceTitle2: trans(locale, lang, 'restrukturisasiLine2'),
          sourceTitle3: trans(locale, lang, 'restrukturisasiLine3'),
          desc: trans(locale, lang, 'restrukturisasiPolis'),
          onPress: () => {
            navigation.navigate(NAVIGATION.HOME.HomePolisJiwasraya);
          },
        })}
      </>
    );

    return (
      <>
        <View style={style.content.header}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={23.8}
            letterSpacing={0.5}>
            {trans(locale, lang, 'pentingUntukmu')}
          </Text>
        </View>
        <View style={[style.flex, style.flexDirectionRow]}>{userTips}</View>
      </>
    );
    // return (

    // <>
    //   <View style={style.content.header}>
    //     <Text
    //       textStyle="semi"
    //       size={Size.text.body2.size}
    //       line={23.8}
    //       letterSpacing={0.5}>
    //       {trans(locale, lang, 'pentingUntukmu')}
    //     </Text>
    //   </View>
    //   <View>
    //     <View>

    //       {
    //         userTips.map((item) => {
    //           item.render
    //         })
    //       }
    //     </View>
    //     <View>
    //       <FlatList
    //         bounces={false}
    //         contentContainerStyle={[style.pV5, style.pH5]}
    //         onViewableItemsChanged={onViewUserTipsRef.current}
    //         viewabilityConfig={viewUserTipsConfigRef.current}
    //         data={userTips}
    //         keyExtractor={(item) => item?.key}
    //         renderItem={({ item }) => {
    //           return item?.render;
    //         }}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //       />
    //       </View>
    //      <View style={[style.renderWidget.dotContainerUserTips]}>
    //       {userTips.map((item, index) => {
    //         if (userTips?.length === 1) {
    //           return null;
    //         }
    //         if (DeviceInfo.isTablet()) {
    //           return null;
    //         }
    //         return (
    //           <Text
    //             key={item?.key}
    //             style={
    //               userTipsActive === index
    //                 ? style.renderWidget.dotActive
    //                 : style.renderWidget.dotInActive
    //             }>
    //             ●
    //           </Text>
    //         );
    //       })}
    //     </View>
    //   </View>
    // </>
    // );
  }

  // function renderContentHeaderContainer() {
  //   return (
  //     <View style={style.content.header}>
  //       <Text
  //         textStyle="semi"
  //         size={Size.text.body2.size}
  //         line={23.8}
  //         letterSpacing={0.5}>
  //         {trans(locale, lang, 'polisKamu')}
  //       </Text>
  //       <TouchableOpacity
  //         onPress={() => {
  //           if (!userId) {
  //             navigation.navigate(NAVIGATION.LOGIN.Login);
  //           } else {
  //             navigation.navigate(NAVIGATION.POLICY.PolisMain);
  //           }
  //         }}>
  //         <Text
  //           textStyle="regular"
  //           size={Size.text.caption1.size}
  //           line={14.63}
  //           letterSpacing={0.5}
  //           color={Color.buttonGradient.light.buttonGradient1}>
  //           {trans(locale, lang, 'lihatSemua')}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  // function renderContentContainer() {
  //   if (!userId) {
  //     return renderUnauthorizedCard();
  //   }
  //   if (userId && getPoliciesFetch && _.isEmpty(listPolicies)) {
  //     return (
  //       <View style={[style.polisCard.loading, { height: height / 6 }]}>
  //         <ActivityIndicator
  //           size="large"
  //           color={Color.primary.light.primary90}
  //         />
  //       </View>
  //     );
  //   }
  //   if (_.isEmpty(listPolicies)) {
  //     return renderHaveNotPolisCard();
  //   }
  //   if (!_.isEmpty(listPolicies)) {
  //     return renderPolisCardContainer();
  //   }
  //   return null;
  // }

  function renderArticleHeader() {
    if (dataArticles?.length === 0) {
      return null;
    }
    return (
      <View style={style.content.header}>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={23.8}
          letterSpacing={0.5}>
          {trans(locale, lang, 'lifeArticles')}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate(NAVIGATION.ARTICLE.ArticleMain);
          }}
          textStyle="regular"
          size={Size.text.caption1.size}
          line={14.63}
          letterSpacing={0.5}
          color={Color.buttonGradient.light.buttonGradient1}>
          {trans(locale, lang, 'lihatSemua')}
        </Text>
      </View>
    );
  }

  function renderArticle() {
    const handleScrollArticle = (event) => {
      const { nativeEvent } = event;
      const ITEM_SIZE = width * 0.25;
      const index = Math.floor(nativeEvent.contentOffset.x / ITEM_SIZE);
      setArticlePosition(
        index > dataArticles?.length - 1 ? dataArticles?.length - 1 : index
      );
    };
    return (
      <View>
        {renderCategoryArticle()}
        <FlatList
          ref={articleRef}
          bounces={false}
          contentContainerStyle={[style.pV5, style.pH1]}
          data={dataArticles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => renderArticleList(item, index)}
          horizontal
          onScroll={handleScrollArticle}
          showsHorizontalScrollIndicator={false}
        />
        {renderArticleFooter()}
      </View>
    );
  }
  function onChangeCategoryArticles(value) {
    setArticlePosition(0);
    articleRef.current.scrollToOffset({ animated: true, offset: 0 });
    const payloadArticles = {
      page: 1,
      pageSize: 5,
      categoryName: value,
    };
    getArticles(payloadArticles);
  }
  function renderCategoryList({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onChangeCategoryArticles(item?.name);
          const dataCategory = dataCategoryArticles?.map((val) => {
            return {
              ...val,
              isActive: val?.name === item?.name,
            };
          });
          setDataCategoryArticles(dataCategory);
        }}>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={20}
          style={[
            style.renderArticle.badge,
            {
              backgroundColor: item?.isActive
                ? Color.badgePink.light.badgePink
                : undefined,
            },
          ]}
          textAlign="center"
          color={Color.badgeMagenta.light.badgeMagenta}>
          {item?.name || 'Semua'}
        </Text>
      </TouchableOpacity>
    );
  }
  const reFetchCategories = ({ nativeEvent }) => {
    const { page, pageCount } = getArticleCategoriesResponse?.meta?.pagination;
    const payloadArticleCategories = {
      page: page + 1,
      pageSize: 20,
      append: true,
    };
    if (!loadingCategoryArticle) {
      if (page < pageCount) {
        setLoadingCategoryArticle(true);
        getArticleCategories(payloadArticleCategories);
      }
    }
  };
  function renderCategoryArticle() {
    if (getArticleCategoriesList?.length > 0) {
      return (
        <FlatList
          bounces={false}
          contentContainerStyle={[style.pV5, style.pH1]}
          data={dataCategoryArticles}
          onEndReached={reFetchCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => renderCategoryList(item, index)}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      );
    }
    return null;
  }
  function renderArticleList({ item, index }) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(NAVIGATION.ARTICLE.ArticleDetail, {
            slugId: item?.attributes?.Slug,
          });
        }}
        style={style.mR8}>
        <Shadow borderRadius={16}>
          <View style={style.renderArticle.cardContainer}>
            <View>
              <Image
                source={{
                  uri: item?.attributes?.ImageSmall,
                }}
                style={style.renderArticle.imgBanner}
              />
              <Text
                textStyle="regular"
                numberOfLines={2}
                size={Size.text.caption1.size}
                line={14.63}
                color={Color.primary.light.primary20}
                style={style.renderArticle.titleCategory}
                letterSpacing={0.5}>
                {item?.attributes?.category?.data?.attributes?.name}
              </Text>
            </View>
            <View style={[style.pH6, style.pT4]}>
              <Text
                textStyle="bold"
                numberOfLines={2}
                size={Size.text.body2.size}
                line={17.7}
                style={style.pB6}>
                {item?.attributes?.Title}
              </Text>
              <Text
                textStyle="regular"
                numberOfLines={2}
                size={Size.text.caption3.size}
                line={15}
                letterSpacing={0.5}>
                {item?.attributes?.ShortArticle}
              </Text>
            </View>
          </View>
          <Text
            textStyle="regular"
            size={Size.text.caption4.size}
            line={9.75}
            letterSpacing={0.5}
            style={style.renderArticle.titleDate}>
            {moment(item?.attributes?.publishedAt).format('YYYY, DD MMMM')}
          </Text>
        </Shadow>
      </TouchableOpacity>
    );
  }
  function renderArticleFooter() {
    return (
      <View style={style.renderHighlightEvent.dotContainer}>
        {dataArticles?.map((val, index) => {
          if (dataArticles?.length === 1) {
            return null;
          }
          return (
            <View style={style.renderArticle.dotContainer}>
              {articlePosition === index ? (
                <View style={style.renderArticle.dotActive} />
              ) : (
                <Text style={style.renderArticle.dotInActive}>●</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }
  // function renderHaveNotPolisCard() {
  //   if (getPoliciesError?.message) {
  //     return (
  //       <Padder style={style.content.alertCard.container}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             setOnRefreshing();
  //           }}>
  //           <Refresh
  //             width={35}
  //             height={35}
  //             style={style.content.alertCard.icon}
  //           />
  //         </TouchableOpacity>
  //         <View style={style.mV16}>
  //           <Text
  //             textStyle="bold"
  //             size={Size.text.h6.size}
  //             line={23.8}
  //             letterSpacing={0.5}
  //             style={style.content.alertCard.title}
  //             align="center">
  //             {trans(locale, lang, 'kontenGagalDiTampilkan')}
  //           </Text>
  //         </View>
  //         <TouchableOpacity
  //           onPress={() => {
  //             setOnRefreshing();
  //           }}>
  //           <Text textStyle="semi" color={Color.primary[colorScheme].primary90}>
  //             {trans(locale, lang, 'muatUlang')}
  //           </Text>
  //         </TouchableOpacity>
  //       </Padder>
  //     );
  //   }
  //   return (
  //     <Padder style={style.content.alertCard.container}>
  //       <Image
  //         source={RusakIcon}
  //         style={style.content.alertCard.image}
  //         resizeMode="contain"
  //       />
  //       <Text
  //         textStyle="bold"
  //         size={Size.text.h6.size}
  //         line={22.4}
  //         style={style.content.alertCard.title}>
  //         {trans(locale, lang, 'polisKamuKosong')}
  //       </Text>
  //       {alreadyKYC ? (
  //         <Text
  //           textStyle="medium"
  //           size={Size.text.body2.size}
  //           line={22}
  //           align="center"
  //           color={Color.textNotif[colorScheme].color}>
  //           {trans(locale, lang, 'oopsKamuBelum')}
  //           <Text
  //             textStyle="regular"
  //             size={Size.text.body2.size}
  //             line={22}
  //             color={Color.primary[colorScheme].primary90}
  //             onPress={() => {
  //               navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
  //             }}>
  //             {trans(locale, lang, 'cariProteksi')}
  //           </Text>
  //           {trans(locale, lang, 'yangCocokUntuk')}
  //         </Text>
  //       ) : (
  //         <Text
  //           textStyle="medium"
  //           size={Size.text.body2.size}
  //           line={22}
  //           align="center"
  //           color={Color.textNotif[colorScheme].color}>
  //           {trans(locale, lang, 'silakanVerifikasiDiri')}
  //           <Text
  //             textStyle="regular"
  //             size={Size.text.body2.size}
  //             line={22}
  //             color={Color.primary[colorScheme].primary90}
  //             onPress={() => {
  //               navigation.navigate(NAVIGATION.KYC.KycMain);
  //             }}>
  //             {trans(locale, lang, 'disini')}
  //           </Text>
  //         </Text>
  //       )}
  //     </Padder>
  //   );
  // }

  // function renderPolisCardContainer() {
  //   const maxPolicies = DeviceInfo.isTablet() ? 4 : 3;
  //   return (
  //     <View style={DeviceInfo.isTablet() ? style.polisCard.containerTab : {}}>
  //       {listPolicies
  //         .filter((i) => i !== null)
  //         .sort((a, b) => {
  //           return moment(b.insuranceStartDate).diff(
  //             moment(a.insuranceStartDate)
  //           );
  //         })
  //         .sort((a, b) => {
  //           return (
  //             a.statusCode.toLowerCase().indexOf('active') -
  //             b.statusCode.toLowerCase().indexOf('active')
  //           );
  //         })
  //         .slice(0, maxPolicies)
  //         .map((item) => {
  //           return renderPolisCard({ item });
  //         })}
  //     </View>
  //   );
  // }

  // function renderPolisCard({ item }) {
  //   const isStatusActive = item.statusCode === 'active';

  //   const onUpdateDataPress = () => {
  //     if (!alreadyKYC && userId !== '') {
  //       navigation.navigate(NAVIGATION.KYC.KycMain);
  //     } else {
  //       const navigationParams = {
  //         category: 'manual',
  //         certificateNo: item?.certificateNo,
  //         policyNo: item?.policyNo || item?.oldPolicyNo,
  //         source: item?.source,
  //       };
  //       navigation.navigate(NAVIGATION.UPDATA.Updata, navigationParams);
  //     }
  //   };

  //   return (
  //     <View key={item.policyNo || item.oldPolicyNo}>
  //       <Shadow borderRadius={24} style={style.mb16}>
  //         {isStatusActive ? (
  //           <Image
  //             source={PolicyCardBackground}
  //             resizeMode="cover"
  //             style={style.polisCard.cardBackground}
  //           />
  //         ) : null}
  //         <View
  //           style={
  //             DeviceInfo.isTablet()
  //               ? [style.polisCard.cardTab, { width: width / 2 - 24 }]
  //               : style.polisCard.card
  //           }>
  //           <View style={style.polisCard.content.container}>
  //             <TouchableOpacity
  //               activeOpacity={0.5}
  //               style={style.polisCard.content.detailButton.container}
  //               onPress={() => {
  //                 navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
  //                   polis: item,
  //                 });
  //               }}>
  //               <LinearGradient
  //                 start={{ x: 0, y: 0 }}
  //                 end={{ x: 1, y: 0 }}
  //                 colors={
  //                   isStatusActive
  //                     ? [
  //                         Color.buttonGradient.light.buttonGradient0,
  //                         Color.buttonGradient.light.buttonGradient1,
  //                       ]
  //                     : [
  //                         Color.grayIndicator[colorScheme].grayIndicator,
  //                         Color.grayIndicator[colorScheme].grayIndicator,
  //                       ]
  //                 }
  //                 style={style.polisCard.content.detailButton.button}>
  //                 <ArrowRightOutline stroke={Color.main.light.white} />
  //               </LinearGradient>
  //             </TouchableOpacity>
  //             <View style={style.polisCard.content.header.container}>
  //               <Image
  //                 source={isStatusActive ? PolisLogo : PolisLogoInactive}
  //                 style={style.polisCard.content.header.image}
  //               />
  //               <Text
  //                 textStyle="semi"
  //                 size={Size.text.body1.size}
  //                 line={20}
  //                 color={
  //                   isStatusActive
  //                     ? Color.neutral[colorScheme].neutral90
  //                     : Color.grayIndicator[colorScheme].grayIndicator
  //                 }
  //                 style={style.flexShrink1}>
  //                 {item.productName}
  //               </Text>
  //             </View>
  //             <View style={style.flexShrink1}>
  //               <View style={style.polisCard.content.policyNo}>
  //                 <Text
  //                   textStyle="medium"
  //                   size={Size.text.body2.size}
  //                   color={
  //                     isStatusActive
  //                       ? Color.textNotif[colorScheme].color
  //                       : Color.grayIndicator[colorScheme].grayIndicator
  //                   }>
  //                   {item.policyNo || item.oldPolicyNo}
  //                 </Text>
  //               </View>
  //               {item.value ? (
  //                 <TouchableOpacity
  //                   onPress={() => {
  //                     setIsHideBenefitValue(!isHideBenefitValue);
  //                   }}>
  //                   <View
  //                     style={style.polisCard.content.benefitValue.container}>
  //                     <Text
  //                       textStyle="medium"
  //                       size={Size.text.body2.size}
  //                       line={20}
  //                       color={
  //                         isStatusActive
  //                           ? Color.textNotif[colorScheme].color
  //                           : Color.grayIndicator[colorScheme].grayIndicator
  //                       }
  //                       style={style.polisCard.content.benefitValue.value}>
  //                       {isHideBenefitValue
  //                         ? 'Rp***********'
  //                         : `Rp${formatCurrency({
  //                             value: item.value,
  //                             mantissa: 2,
  //                           })}`}
  //                     </Text>
  //                     {isHideBenefitValue ? (
  //                       <EyeOff1
  //                         fill={Color.textNotif[colorScheme].color}
  //                         width={18}
  //                         height={18}
  //                       />
  //                     ) : (
  //                       <Eye1
  //                         fill={Color.textNotif[colorScheme].color}
  //                         width={18}
  //                         height={18}
  //                       />
  //                     )}
  //                   </View>
  //                 </TouchableOpacity>
  //               ) : null}
  //               <View style={style.polisCard.content.date}>
  //                 <Text
  //                   textStyle="medium"
  //                   size={Size.text.body2.size}
  //                   color={
  //                     isStatusActive
  //                       ? Color.textNotif[colorScheme].color
  //                       : Color.grayIndicator[colorScheme].grayIndicator
  //                   }>
  //                   {moment(item.insuranceStartDate).format('DD MMM YY')}
  //                 </Text>
  //                 <Text
  //                   textStyle="medium"
  //                   size={Size.text.body2.size}
  //                   color={
  //                     isStatusActive
  //                       ? Color.textNotif[colorScheme].color
  //                       : Color.grayIndicator[colorScheme].grayIndicator
  //                   }>
  //                   {' - '}
  //                 </Text>
  //                 <Text
  //                   textStyle="medium"
  //                   size={Size.text.body2.size}
  //                   color={
  //                     isStatusActive
  //                       ? Color.textNotif[colorScheme].color
  //                       : Color.grayIndicator[colorScheme].grayIndicator
  //                   }>
  //                   {moment(item.insuranceEndDate).format('DD MMM YY')}
  //                 </Text>
  //               </View>
  //               <View
  //                 style={[
  //                   style.flexDirectionRow,
  //                   style.justifyContentSpaceBetween,
  //                   style.alignItemsCenter,
  //                 ]}>
  //                 <Text
  //                   textStyle="medium"
  //                   size={Size.text.body2.size}
  //                   color={
  //                     isStatusActive
  //                       ? Color.primary[colorScheme].primary90
  //                       : Color.grayIndicator[colorScheme].grayIndicator
  //                   }
  //                   style={style.flexShrink1}>
  //                   {item.statusName}
  //                 </Text>
  //                 {item?.clientCode ? (
  //                   <View style={style.polisCard.content.badgeClientCode}>
  //                     <Text
  //                       textStyle="semi"
  //                       size={Size.text.caption1.size}
  //                       color={Color.primary.light.primary90}>
  //                       {trans(locale, lang, item?.clientCode)}
  //                     </Text>
  //                   </View>
  //                 ) : null}
  //               </View>
  //               {item?.isAlter === 'true' ? (
  //                 <TouchableOpacity onPress={onUpdateDataPress}>
  //                   <View
  //                     style={
  //                       style.polisCard.content.pengkinianButton.container
  //                     }>
  //                     <View
  //                       style={style.polisCard.content.pengkinianButton.button}>
  //                       <Text
  //                         textStyle="semi"
  //                         size={Size.text.caption1.size}
  //                         color={Color.primary.light.primary90}
  //                         align="center">
  //                         {trans(locale, lang, 'pengkinianData')}
  //                       </Text>
  //                     </View>
  //                   </View>
  //                 </TouchableOpacity>
  //               ) : null}
  //             </View>
  //           </View>
  //         </View>
  //       </Shadow>
  //     </View>
  //   );
  // }

  function renderTotalInvestasiModal() {
    return (
      <BottomSheet
        isVisible={isTIModalVisible}
        swipeable={false}
        onClosePress={() => setIsTIModalVisible(false)}
        onRequestClose={() => setIsTIModalVisible(false)}>
        <View style={style.modal.totalInvestasi.container}>
          <Money style={style.modal.totalInvestasi.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            style={style.modal.totalInvestasi.title}>
            {trans(locale, lang, 'apaItuTotal')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'totalInvestasiMerupakan')}
          </Text>
        </View>
      </BottomSheet>
    );
  }

  function renderUpdataReminderModal() {
    if (!isFocused || isProgressCodePush) {
      return null;
    }
    const _state = {
      anuitasPrima: {
        policyName: 'IFG Anuitas Prima',
      },
      anuitasRetail: {
        policyName: 'IFG Anuitas',
      },
    };
    const onSkipPress = () => {
      setIsUpdataReminderModal(false);
      setTemporaryHomeState({
        isUpdataModalAlreadyShowed: true,
      });
    };
    const onAnuitasPrimaPress = () => {
      setIsUpdataReminderModal(false);
      const navigationParams = {
        category: 'reminder',
        source: anuitasPrimaFlag?.source,
        isUploadedKKAndKTP: anuitasPrimaFlag?.isUploadedKKAndKTP,
      };
      navigation.navigate(NAVIGATION.UPDATA.Updata, navigationParams);
    };
    const onAnuitasRetailPress = () => {
      setIsUpdataReminderModal(false);
      const navigationParams = {
        category: 'reminder',
        source: anuitasRetailFlag?.source,
        isUploadedKKAndKTP: anuitasRetailFlag?.isUploadedKKAndKTP,
      };
      navigation.navigate(NAVIGATION.UPDATA.Updata, navigationParams);
    };
    return (
      <ReminderKKPMModal
        lang={lang}
        _state={_state}
        isUpdataReminderModal={isUpdataReminderModal}
        isUpdataModalAlreadyShowed={isUpdataModalAlreadyShowed}
        anuitasPrimaFlag={anuitasPrimaFlag}
        anuitasRetailFlag={anuitasRetailFlag}
        onSkipPress={onSkipPress}
        onAnuitasPrimaPress={onAnuitasPrimaPress}
        onAnuitasRetailPress={onAnuitasRetailPress}
      />
    );
  }

  function renderAlterSuccessModal() {
    const onBackPress = () => setIsAlterSuccessModal(false);
    return (
      <BottomSheet
        isVisible={isAlterSuccessModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.alterSuccess.container}>
          <Image source={BadgeTick} style={style.modal.alterSuccess.icon} />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.alterSuccess.title}>
            {trans(locale, lang, 'selamatKamuBerhasilMelakukan')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.alterSuccess.subtitle}>
            {trans(locale, lang, 'terimaKasihTelah')}
          </Text>
        </View>
        <Button type="linear-gradient" onPress={onBackPress}>
          {trans(locale, lang, 'ok')}
        </Button>
      </BottomSheet>
    );
  }

  function renderAlterFailModal() {
    const onBackPress = () => {
      setIsAlterFailModal(false);
      navigation.navigate(NAVIGATION.UPDATA.Updata);
    };
    return (
      <BottomSheet
        isVisible={isAlterFailModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.alterFail.container}>
          <Image
            source={KtpNotValid}
            style={style.modal.alterFail.icon}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            align="center"
            style={style.modal.alterFail.title}>
            {trans(locale, lang, 'dataKamuTidak')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.alterFail.subtitle}>
            {trans(locale, lang, 'silahkanLakukanPengkinian')}
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsAlterFailModal(false);
            navigation.navigate(NAVIGATION.UPDATA.Updata);
          }}>
          {trans(locale, lang, 'ulangPengkinian')}
        </Button>
      </BottomSheet>
    );
  }

  function renderLifesaverBanner() {
    if (!features.lifesaver) {
      return (
        <TouchableWithoutFeedback>
          <Image
            source={LifeSaver4}
            style={[{ width }, style.flex]}
            resizeMode="stretch"
          />
        </TouchableWithoutFeedback>
      );
    }
    if (getCurrentSubsResponse?.planName === 'LifeSAVER+') {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsComingFromScreen({});
            navigation.navigate(NAVIGATION.INVITATION.InvitationMain);
          }}>
          <Image
            source={lang === 'id' ? LifeSaver3ID : LifeSaver3}
            style={[{ width }, style.flex]}
            resizeMode="stretch"
          />
        </TouchableWithoutFeedback>
      );
    }
    if (getCurrentSubsResponse?.planName === 'LifeSAVER') {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsComingFromScreen({});
            navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
          }}>
          {lang === 'id' ? (
            <Image
              source={LifeSaver2ID}
              style={[{ width }, style.flex]}
              resizeMode="stretch"
            />
          ) : (
            <Image
              source={LifeSaver2}
              style={[{ width }, style.flex]}
              resizeMode="stretch"
            />
          )}
        </TouchableWithoutFeedback>
      );
    }
    if (getCurrentSubsResponse?.planName === 'LifeSAVER POS') {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsComingFromScreen({});
            navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
          }}>
          {lang === 'id' ? (
            <Image
              source={LifeSaver2ID}
              style={[{ width }, style.flex]}
              resizeMode="stretch"
            />
          ) : (
            <Image
              source={LifeSaver2}
              style={[{ width }, style.flex]}
              resizeMode="stretch"
            />
          )}
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setIsComingFromScreen({});
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
        }}>
        {lang === 'id' ? (
          <Image
            source={LifeSaver1ID}
            style={[{ width }, style.flex]}
            resizeMode="stretch"
          />
        ) : (
          <Image
            source={LifeSaver1}
            style={[{ width }, style.flex]}
            resizeMode="stretch"
          />
        )}
      </TouchableWithoutFeedback>
    );
  }

  function renderRefreshControl() {
    return (
      <RefreshControl refreshing={refreshing} onRefresh={setOnRefreshing} />
    );
  }

  function renderImageBackground() {
    return (
      <View style={[{ width }, style.imageContainer]}>
        <View style={style.imageHeaderPadder} />
        {renderLifesaverBanner()}
      </View>
    );
  }

  // event highlight
  const onPressVerifyCode = () => {
    setIsSubmit(true);
    if (userData?.userId !== '') {
      getEventDetailApi({
        eventId: id,
        slugId: slugId,
        lang,
        userId: userData?.userId,
        accessCode,
      })
        .then(() => {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          setAccessCode('');
          setCodeErrorMsg('');
          navigation.navigate(NAVIGATION.EVENT.EventDetail, {
            id: id,
            slugId: slugId,
            accessCode,
            prevScreen: currentRouteName,
          });
        })
        .catch(() => {
          setIsSubmit(false);
          setCodeErrorMsg({
            error: trans(locale, lang, 'kodeYangKamu'),
          });
        });
    } else {
      getEventDetailPublicApi({
        eventId: id,
        slugId: slugId,
        lang,
        accessCode,
      })
        .then(() => {
          setIsSubmit(false);
          setIsEventCodeModal(false);
          setAccessCode('');
          setCodeErrorMsg('');
          navigation.navigate(NAVIGATION.EVENT.EventDetail, {
            id: id,
            slugId: slugId,
            accessCode,
            prevScreen: currentRouteName,
          });
        })
        .catch(() => {
          setIsSubmit(false);
          setCodeErrorMsg({
            error: trans(locale, lang, 'kodeYangKamu'),
          });
        });
    }
  };

  const onPressEventList = (item) => {
    if (item?.type === 'PRIVATE') {
      setId(item?.id);
      setSlugId(item?.slugId);
      if (item?.alreadyBought) {
        navigation.navigate(NAVIGATION.EVENT.EventDetail, {
          id: item?.id,
          slugId: item?.slugId,
          accessCode,
          prevScreen: currentRouteName,
        });
      } else {
        setIsEventCodeModal(true);
      }
    } else {
      navigation.navigate(NAVIGATION.EVENT.EventDetail, {
        id: item?.id,
        slugId: item?.slugId,
        accessCode,
        prevScreen: currentRouteName,
      });
    }
  };

  function renderHighlightEvent() {
    if (!getEventUpcomingResponse?.data) {
      return null;
    }
    const highlightData = getEventUpcomingResponse?.data?.filter(
      (val) => val?.isHighlighted && !val?.closed
    );
    const highlightLifetag = [
      {
        type: 'LIFETAG_BANNER',
        banner:
          lang === 'id' ? BannerLifetagComingSoonID : BannerLifetagComingSoonEN,
        isDisabled: false,
        // isShow: !getLifetagFlagResponse?.data?.alreadyOrderLifeTag,
        isShow: true,
        onPress: () => {
          navigation.navigate(NAVIGATION.LIFETAG.LifetagLanding);
        },
      },
    ];

    const highlightTotalClaim = [
      {
        type: 'BANNER_CLAIM',
        banner: lang === 'id' ? BannerClaimID : BannerClaimEN,
        isDisabled: true,
        isShow: isShowBannerClaim,
        onPress: () => {},
      },
    ];

    let highlightBanner = [
      ...highlightData,
      ...highlightTotalClaim,
      // ...highlightLifetag,
    ];

    highlightBanner = highlightBanner.filter((item) => item?.isShow !== false);

    const handleScrollHighlight = (event) => {
      const { nativeEvent } = event;
      const ITEM_SIZE = width * 0.75;
      const index = Math.floor(nativeEvent.contentOffset.x / ITEM_SIZE);
      setHighlightPosition(index);
    };

    const menuContainer = {
      marginHorizontal: 16,
      marginTop:
        APP.header.height +
        insets.top +
        // eslint-disable-next-line no-nested-ternary
        (Size.isIphoneX ? -220 : DeviceInfo.isTablet() ? -320 : -200),
      marginBottom: 16,
    };

    return (
      <View style={style.mB10}>
        {highlightBanner?.length > 0 && (
          <View>
            <View style={style.content.header}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={23.8}
                letterSpacing={0.5}>
                {trans(locale, lang, 'sorotan')}
              </Text>
            </View>
            <ScrollView
              horizontal
              onScroll={handleScrollHighlight}
              showsHorizontalScrollIndicator={false}>
              {highlightBanner?.map((value, index) => {
                if (value?.type === 'LIFETAG_BANNER') {
                  return (
                    <Shadow
                      borderRadius={8}
                      style={style.renderHighlightEvent?.contentCard(
                        highlightBanner,
                        index
                      )}>
                      <TouchableWithoutFeedback
                        disabled={value?.isDisabled}
                        onPress={value?.onPress}>
                        <Image
                          source={value?.banner}
                          style={[
                            style.renderHighlightEvent.imgHighlight,
                            { width: width - 34 - 20, height: width / 3 },
                          ]}
                        />
                      </TouchableWithoutFeedback>
                    </Shadow>
                  );
                }
                if (value?.type === 'BANNER_CLAIM') {
                  return (
                    <TotalClaimBanner
                      lang={lang}
                      width={width}
                      value={value}
                      getPolicyWidgetHomePublicResponse={
                        getPolicyWidgetHomePublicResponse
                      }
                      highlightEventStyle={style.renderHighlightEvent?.contentCard(
                        highlightBanner,
                        index
                      )}
                    />
                  );
                }
                return (
                  <Shadow
                    borderRadius={8}
                    style={style.renderHighlightEvent?.contentCard(
                      highlightBanner,
                      index
                    )}>
                    <TouchableWithoutFeedback
                      onPress={() => onPressEventList(value)}>
                      <Image
                        source={{ uri: value?.banner?.[0]?.url }}
                        style={[
                          style.renderHighlightEvent.imgHighlight,
                          { width: width - 34 - 20, height: width / 3 },
                        ]}
                      />
                    </TouchableWithoutFeedback>
                  </Shadow>
                );
              })}
            </ScrollView>
            <View style={style.renderHighlightEvent.dotContainer}>
              {highlightBanner?.map((item, index) => {
                if (highlightBanner?.length === 1) {
                  return null;
                }
                return (
                  <Text
                    key={item?.key}
                    style={
                      highlightPosition === index
                        ? style.renderWidget.dotActive
                        : style.renderWidget.dotInActive
                    }>
                    ●
                  </Text>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  }

  function renderNextBenefitWidgetModal() {
    if (_.isEmpty(nextBenefitArray)) {
      return null;
    }
    const onBackPress = () => {
      setIsNextBenefitModal(false);
    };
    return (
      <BottomSheet
        isVisible={isNextBenefitModal}
        title={trans(locale, lang, 'manfaatSelanjutnya')}
        leftTitle
        swipeable={false}
        onRequestClose={onBackPress}
        onClosePress={onBackPress}>
        <View style={[{ maxHeight: height / 1.5 }]}>
          <ScrollView>
            {nextBenefitArray?.map((item, index) => {
              return (
                <View
                  key={item.benefit}
                  style={
                    index !== nextBenefitArray?.length - 1
                      ? style.modal.nextBenefitWidget.body
                      : style.modal.nextBenefitWidget.bodyWithoutBorder
                  }>
                  <Text
                    textStyle="semi"
                    size={Size.text.body2.size}
                    line={20}
                    letterSpacing={0.5}
                    style={style.modal.eKYC.title}>
                    {item.productName}
                  </Text>
                  <Text
                    textStyle="semi"
                    size={Size.text.body2.size}
                    line={20}
                    letterSpacing={0.5}
                    style={style.modal.eKYC.title}>
                    {item.policyNo}
                  </Text>
                  <View style={style.modal.nextBenefitWidget.bottomBody}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      line={20}
                      letterSpacing={0.5}
                      color={Color.mediumGray.light.mediumGray}>
                      {moment(item.date).format('D MMM YYYY')}
                    </Text>
                    <Text
                      textStyle="bold"
                      size={Size.text.body2.size}
                      color={Color.badgeGreen.light.badgeGreen80}
                      line={20}
                      letterSpacing={0.5}>
                      Rp
                      {formatCurrency({
                        value: item.benefit,
                        mantissa: 2,
                      })}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </BottomSheet>
    );
  }

  function renderChangePhoneModal() {
    return (
      <BottomSheet
        keyboardVerticalOffset={height}
        avoidKeyboard
        isVisible={isChangePhoneModal}
        swipeable={false}>
        <View style={style.modal.changePhone.container}>
          <Image
            source={ChangePhoneIcon}
            style={style.modal.changePhone.image}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={30.6}
            letterSpacing={0.5}
            align="center"
            style={style.modal.changePhone.title}>
            {trans(locale, lang, 'masukkanNomorPonsel')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.changePhone.subtitle}>
            {trans(locale, lang, 'ayoTingkatkanKeamanan')}
          </Text>
        </View>
        <View style={style.modal.changePhone.input}>
          <Input
            keyboardType="phone-pad"
            height={56}
            value={phoneNumberInput}
            label={trans(locale, lang, 'nomorPonsel')}
            placeholder="e.g +62xxxxxx"
            onChangeText={(text) => {
              setPhoneNumberInput(text);
              setIsValidPhoneNumberInput(validatePhoneNumber(text));
            }}
            message={phoneNumberInputMessage}
            prefixPhoneNumber={phoneNumberInput?.charAt(0) !== '+' && true}
          />
        </View>
        {errRequestOtp === RESPONSE_STATE.ALREADY_REGISTERED &&
        !isValidPhoneNumberInput ? (
          <Button
            type="linear-gradient"
            style={style.mb16}
            onPress={() => {
              setIsChangePhoneModal(false);
              setLoading(true);
              setLogout();
            }}>
            {trans(locale, lang, 'login2')}
          </Button>
        ) : (
          <Button
            loading={isPhoneNumberLoading}
            disabled={!isValidPhoneNumberInput || isSubmitPhoneNumber}
            onPress={() => {
              setIsSubmitPhoneNumber(true);
              setIsPhoneNumberLoading(true);
              setRequestOtp({
                id:
                  phoneNumberInput?.charAt(0) !== '+'
                    ? `+${phoneNumberInput}`
                    : phoneNumberInput,
                action: 'CHANGE_MOBILE_PHONE_NUMBER',
              });
            }}
            type="linear-gradient">
            {trans(locale, lang, 'simpan')}
          </Button>
        )}
      </BottomSheet>
    );
  }

  function renderTooFrequentlyModal() {
    const onBackPress = () => {
      setIsTooFrequentlyModal(false);
      setTimeout(
        () => {
          setIsChangePhoneModal(true);
        },
        Size.isAndroid ? 200 : 600
      );
    };
    return (
      <BottomSheet
        isVisible={isTooFrequentlyModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.tooFrequently.container}>
          <Image
            source={ClockOTP}
            style={style.modal.tooFrequently.icon}
            resizeMode="contain"
          />
          <Text
            style={style.modal.tooFrequently.title}
            textStyle="bold"
            size={Size.text.body1.size}
            line={21}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'andaTerlaluSering')}
          </Text>
          <Text
            style={style.modal.tooFrequently.subtitle}
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'untukSementaraWaktu')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.primary.light.primary90}>
              {showRemainingTime()}
            </Text>
          </Text>
          <Button
            block
            onPress={() => {
              setIsTooFrequentlyModal(false);
              setTimeout(
                () => {
                  setIsChangePhoneModal(true);
                },
                Size.isAndroid ? 200 : 600
              );
            }}
            style={style.modal.tooFrequently.button1}>
            {trans(locale, lang, 'cobaLagi')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderLifecardModal() {
    const onBackPress = () => setIsLifecardModal(false);
    return (
      <BottomSheet
        isVisible={isLifecardModal}
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.modal.lifecard.container}>
          <Image
            source={AnnouncementLocked}
            style={style.modal.lifecard.image}
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            letterSpacing={0.5}
            align="center"
            style={style.modal.lifecard.title}>
            {trans(locale, lang, 'untukKamuYang')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.lifecard.subtitle}>
            {trans(locale, lang, 'lifeCardDapatDiakses')}
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              color={Color.mediumGray.light.mediumGray}>
              Life
              <Text
                style={style.textSemiBoldItalic}
                size={Size.text.body2.size}
                color={Color.mediumGray.light.mediumGray}>
                SAVER
              </Text>
            </Text>
          </Text>
        </View>
        <Button
          outline
          style={style.modal.lifecard.button}
          onPress={() => {
            setIsLifecardModal(false);
          }}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsLifecardModal(false);
            setTimeout(() => {
              // navigation.navigate(NAVIGATION.LIFETAG.LifetagLanding);
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
            }, 250);
          }}>
          {trans(locale, lang, 'lihatProteksiLifesaver')}
        </Button>
      </BottomSheet>
    );
  }

  function renderTermConditionModal() {
    return (
      <ModalAgreement
        lang={lang}
        isVisible={isTermConditionModalVisible}
        onClosePress={() => {
          setEventCode('');
          setIsComingFromScreen({});
          setisTermConditionModalVisible(false);
        }}
        locale={locale}
        onPressTnc={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.TABMAIN.TabMain,
            params: {
              isShowModalFreeLS: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        onPressRiplay={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.TABMAIN.TabMain,
            params: {
              isShowModalFreeLS: true,
            },
          });
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
            personalURL: false,
          });
        }}
        onSubs={() => {
          setisTermConditionModalVisible(false);
          setIsComingFromScreen({
            screen: NAVIGATION.TABMAIN.TabMain,
            params: {
              isShowModalFreeLS: false,
            },
          });
          navigation.navigate(NAVIGATION.EVENT.EventConfirmOrder, {
            eventId: eventId,
            slugId: slugId,
          });
        }}
      />
    );
  }

  function renderEventCodeModal() {
    const onBackPress = () => {
      setCodeErrorMsg('');
      setIsEventCodeModal(false);
      setAccessCode('');
    };
    return (
      <BottomSheet
        keyboardVerticalOffset={height}
        swipeable={false}
        isVisible={isEventCodeModal}
        title={trans(locale, lang, 'limitedEventModalTitle')}
        isPadder={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <Text
          align="center"
          textStyle="regular"
          line={20}
          letterSpacing={0.5}
          style={style.mH20}
          color={Color.neutral.light.neutral10}>
          {trans(locale, lang, 'eventIniDiperuntukan')}
        </Text>
        <View style={[style.mT30, style.mH20]}>
          <Text
            style={style.mB10}
            line={20}
            letterSpacing={0.5}
            textStyle="regular">
            {trans(locale, lang, 'masukkanKodeEvent')}
          </Text>
          <Input
            value={accessCode}
            textAlign="center"
            multiline={Size.isAndroid}
            placeholder={trans(locale, lang, 'masukkanKodeDisini')}
            height={56}
            message={codeErrorMsg}
            onChangeText={(txt) => {
              setAccessCode(txt);
            }}
          />
        </View>
        <Wave
          width="100%"
          height={150}
          style={style.renderEventCodeModal.waveImg}
          fill={Color.redHome.dark.redHome}
        />
        <View style={style.mT30}>
          <View style={[style.mH20, style.pB30]}>
            <Button
              loading={isSubmit}
              block
              disabled={isSubmit}
              onPress={() => {
                onPressVerifyCode();
              }}>
              {trans(locale, lang, 'lanjutkan')}
            </Button>
          </View>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base
      width={width}
      isScroll
      animatedOnlyHeader
      onChangeHeaderToDark={(val) => setIsDark(val)}
      refreshControl={renderRefreshControl()}
      renderHeader={renderHeader()}
      backgroundColor={Color.greyBackround.dark.greyBackground}>
      {renderImageBackground()}
      <View style={[style.container, { minHeight: height / 1.25 }]}>
        <Padder style={style.padder.container}>
          {renderBalanceContainer()}
        </Padder>
        {renderMenu()}
        <Padder>
          {renderLoginWidget()}
          {renderNextBenefitWidget()}
        </Padder>
        {renderWidget()}
        <Dash
          dashStyle={[style.gap, { width }]}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        />
        <Padder>{renderHighlightEvent()}</Padder>
        <Dash
          dashStyle={[style.gap, { width }]}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        />
        <Padder>
          {renderUserTipsContainer()}
          {/* {renderContentHeaderContainer()} */}
          {/* {renderContentContainer()} */}
          {renderArticleHeader()}
          {renderArticle()}
        </Padder>
        {renderTotalInvestasiModal()}
        {renderUpdataReminderModal()}
        {renderNextBenefitWidgetModal()}
        {renderAlterSuccessModal()}
        {renderAlterFailModal()}
        {renderChangePhoneModal()}
        {renderTooFrequentlyModal()}
        {renderLifecardModal()}
        {renderTermConditionModal()}
        {renderEventCodeModal()}
        {!_.isEmpty(Config.TYPE) && (
          <SwitchProjects
            isShow={isShowSwitchProject}
            onClosePress={() => setIsShowSwitchProject(false)}
          />
        )}
      </View>
    </Base>
  );
}

export default HomeMain;

HomeMain.defaultProps = {
  alreadySetPin: false,
  isLastAlterSuccess: undefined,
};

HomeMain.propTypes = {
  lang: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  alreadySetPin: PropTypes.bool,
  alreadyKYC: PropTypes.bool.isRequired,
  kkpmFlag: PropTypes.instanceOf(Array).isRequired,
  getNotifCountResponse: PropTypes.objectOf(Object).isRequired,
  getNotifCount: PropTypes.func.isRequired,
  getNotifCountClear: PropTypes.func.isRequired,
  isLastAlterSuccess: PropTypes.oneOf([null, undefined]),
  isProgressCodePush: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  getPolicyWidgetHome: PropTypes.func.isRequired,
  getPolicyWidgetHomeResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyWidgetHomeClear: PropTypes.func.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  mobilePhoneNumber: PropTypes.string.isRequired,
  isUpdataModalAlreadyShowed: PropTypes.bool.isRequired,
  setTemporaryHomeState: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  setToastMsg: PropTypes.func.isRequired,
  homeAction: PropTypes.string.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  getCurrentSubsClear: PropTypes.func.isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  getIsUserEligibleClear: PropTypes.func.isRequired,
  setLoginClear: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  getPendingInvites: PropTypes.func.isRequired,
  accessToken: PropTypes.objectOf(Object).isRequired,
  setUserData: PropTypes.func.isRequired,
  getPendingInvitesResponse: PropTypes.objectOf(Object).isRequired,
  invitationAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getEventUserTicket: PropTypes.func.isRequired,
  getEventUserTicketResponse: PropTypes.objectOf(Object).isRequired,
  getEventUpcoming: PropTypes.func.isRequired,
  getEventUpcomingResponse: PropTypes.objectOf(Object).isRequired,
  getLifetagFlag: PropTypes.func.isRequired,
  getLifetagFlagResponse: PropTypes.objectOf(Object).isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
  getSubscriptionDetailResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyWidgetHomePublicResponse: PropTypes.objectOf(Object).isRequired,
  getPolicyWidgetHomePublic: PropTypes.func.isRequired,
  // getPolicyWidgetHomePublicClear: PropTypes.func.isRequired,
  getPolicyWidgetHomePublicError: PropTypes.objectOf(Object).isRequired,
  getInvoiceMaster: PropTypes.func.isRequired,
  getInvoiceMasterResponse: PropTypes.objectOf(Object).isRequired,
  getProfileUserParty: PropTypes.func.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  isComingFromDeepLinkUrl: PropTypes.string.isRequired,
  setIsComingFromDeepLink: PropTypes.func.isRequired,
  setIsComingFromDeepLinkUrl: PropTypes.func.isRequired,
  getArticleCategories: PropTypes.func.isRequired,
  getArticleCategoriesResponse: PropTypes.objectOf(Object).isRequired,
  getArticles: PropTypes.func.isRequired,
  getArticlesResponse: PropTypes.objectOf(Object).isRequired,
  getArticleCategoriesList: PropTypes.arrayOf(Object).isRequired,
  articleAction: PropTypes.string.isRequired,
};
