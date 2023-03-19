import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  AppState,
  Platform,
  BackHandler,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';
import PropTypes from 'prop-types';
import { useMount } from 'ca-util/common';
import {
  ANDROID_CLIENT_ID,
  API,
  ONE_SIGNAL_APP_ID,
  STORE_URL,
  WEB_CLIENT_ID,
  DD_CLIENT_TOKEN,
  DD_ENV,
  DD_APPLICATION_ID,
} from 'ca-util/constant';
import {
  SET_CLEAR_AUTH_FAILED,
  SET_CLEAR_AUTH_SUCCESS,
  SET_CLEAR_REFRESH_TOKEN,
  SET_DELETE_ACCOUNT_SUCCESS,
} from 'ca-module-auth/authConstant';
import JailMonkey from 'jail-monkey';
import codePush from 'react-native-code-push';
import { setLogOff } from 'ca-bootstrap/bootstrapNavigation';
import { getLocation } from 'ca-util/location';
import {
  ModalComingSoon,
  ModalLoading,
  ModalCustomerCare,
  ModalInternalServerError,
  ModalBadRequest,
} from 'ca-component-modal/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import Size from 'ca-config/Size';
import { toastConfig } from 'ca-util/toast';
import { AFInit, AFsetCurrency } from 'ca-util/AppsFlyer';
import crashlytics from '@react-native-firebase/crashlytics';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import DeviceInfo from 'react-native-device-info';
import { api } from 'ca-bootstrap/bootstrapApi';
import { store } from 'ca-config/Store';
import { linking } from 'ca-config/Linking';
import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
} from '@datadog/mobile-react-native';
import Style from './style';

const setReporter = (error) => {
  const {
    session: {
      userData: { userId },
    },
    activity: {
      userActivity: { value },
    },
  } = store.getState();
  crashlytics().setAttributes({
    userId: String(userId),
    errorDetail: JSON.stringify({
      error: error.message,
      screenName: value,
      deviceModel: DeviceInfo.getModel(),
    }),
  });
};

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    setReporter(e);
    Alert.alert(
      'Oops, terjadi kesalahan',
      'Kami telah melaporkan hal ini kepada tim kami. Silakan tutup aplikasi dan buka kembali',
      [
        {
          text: 'Buka Ulang',
          onPress: () => {
            codePush.restartApp();
          },
        },
      ]
    );
  }
};

setJSExceptionHandler(errorHandler, false);

GoogleSignin.configure({
  offlineAccess: true,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ['profile', 'email'],
  webClientId: WEB_CLIENT_ID,
});

function Bootstrap(props) {
  const {
    children,
    setActivity,
    setDeviceId,
    authAction,
    setLocation,
    isShowModalComingSoon,
    setIsShowModalComingSoon,
    isShowModalCustomerCare,
    setIsShowModalCustomerCare,
    loading,
    getCSInfo,
    getCSInfoResponse,
    setLoading,
    userId,
    email,
    mobilePhoneNumber,
    lang,
    toastMsg,
    isShowModalInternalServerError,
    setIsShowModalInternalServerError,
    isShowModalBadRequest,
    setIsShowModalBadRequest,
    getCheckIssuedPolicy,
    alreadyKYC,
    setDimensions,
    setAppConfig,
    appConfig,
    isProgressCodePush,
    statusCodePush,
    setUserData,
    setStatusCodePush,
  } = props;
  const appState = useRef(AppState.currentState);

  Dimensions.addEventListener('change', (e) => {
    const { width, height } = e.window;
    setDimensions({ width, height });
  });

  const logCrashlytics = (user) => {
    codePush.getUpdateMetadata().then(async (metadata) => {
      if (metadata) {
        await Promise.all([
          crashlytics().setUserId(String(user?.userId)),
          crashlytics().setAttributes({
            userId: String(user?.userId),
            codepushVersion: metadata?.label ?? null,
          }),
        ]);
      }
    });
  };

  const onAppStateChange = useCallback(
    (nextAppState) => {
      if (
        appState.current?.match(/active/) &&
        (nextAppState === 'inactive' || nextAppState === 'background')
      ) {
        console.log('close app');
      } else if (JailMonkey.isJailBroken()) {
        Alert.alert(
          'Warning',
          'The device appears to be rooted/jailbroken, please use another device',
          [{ text: 'Close', onPress: () => BackHandler.exitApp() }],
          { cancelable: false }
        );
      } else {
        // event when application open
        getConfig();
      }

      appState.current = nextAppState;
    },
    [getConfig]
  );

  const getConfig = useCallback(() => {
    api.get(API.CONFIG.customerapps).then((res) => {
      const data = res?.data?.data;
      setAppConfig({
        features: data?.features,
        availableVersions: data?.availableVersions,
      });
      // setCheckUpdateNeeded(data?.availableVersions);
    });
  }, [setAppConfig, setCheckUpdateNeeded]);

  const setCheckUpdateNeeded = useCallback((availableVersions) => {
    if (availableVersions && availableVersions !== {}) {
      const storeUrl = STORE_URL[Platform.OS];
      const isVersionAvailable = availableVersions[Platform.OS]?.some(
        (item) => item === DeviceInfo.getVersion()
      );
      if (!isVersionAvailable) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(storeUrl);
              },
            },
          ]
        );
      }
    }
  }, []);

  useEffect(() => {
    if (userId !== '') {
      const user = {
        userId: userId,
        email: email,
        mobilePhoneNumber: mobilePhoneNumber,
      };
      logCrashlytics(user);
    }
  }, [email, mobilePhoneNumber, userId]);

  useEffect(() => {
    if (toastMsg?.type) {
      Toast.show({ type: toastMsg?.type, text1: toastMsg?.text1 });
    }
  }, [toastMsg]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [onAppStateChange]);

  useEffect(() => {
    if (statusCodePush) getAppPermission();
  }, [statusCodePush]);

  const getAppPermission = () => {
    if (Platform.OS === 'ios') {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        console.log('Prompt responses:', response);
      });
    }

    getLocation().then((p) => {
      setLocation({
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
      });
    });

    setStatusCodePush(false);
  };

  useEffect(() => {
    setNavClearToken(authAction);
  }, [authAction, setNavClearToken]);

  const setNavClearToken = useCallback(
    (act) => {
      if (act === SET_CLEAR_REFRESH_TOKEN) {
        setLoading(false);
        setLogOff();
      }
      if (act === SET_CLEAR_AUTH_SUCCESS) {
        setLoading(false);
        setLogOff();
      }
      if (act === SET_CLEAR_AUTH_FAILED) {
        setLoading(false);
        setLogOff();
      }
      if (act === SET_DELETE_ACCOUNT_SUCCESS) {
        setLogOff();
      }
    },
    [setLoading]
  );

  useMount(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(ONE_SIGNAL_APP_ID);

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent
        );
        const notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      const {
        notification: { additionalData },
      } = notification;
      if (additionalData?.path && userId !== '') {
        setTimeout(() => {
          Linking.openURL(`${linking.prefixes[0]}${additionalData?.path}`);
        }, 2000);
      }
    });
    OneSignal.addSubscriptionObserver((event) => {
      setDeviceId(event?.to?.userId);
    });
    setActivity('OPEN_APP');
    getConfig();
    getCSInfo();
  });

  useEffect(() => {
    if (userId !== '' && alreadyKYC) {
      getCheckIssuedPolicy();
    }
  }, [alreadyKYC, getCheckIssuedPolicy, userId]);

  let AFGCDListener = null;
  let AFUDLListener = null;

  // AppsFlyer initialization!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // initialize datadog
    const config = new DdSdkReactNativeConfiguration(
      DD_CLIENT_TOKEN,
      DD_ENV,
      DD_APPLICATION_ID,
      true,
      true,
      true
    );

    if (DD_ENV === 'prd') {
      config.site = 'US';
      config.nativeCrashReportEnabled = true;
    }

    await DdSdkReactNative.initialize(config);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    AFGCDListener = appsFlyer.onInstallConversionData((res) => {
      const isFirstLaunch = res?.data?.is_first_launch;
      // const isOrganic = res?.data?.af_status;

      if (isFirstLaunch && JSON.parse(isFirstLaunch) === true) {
        //* *TODO : DO SOMETHING IS FIRST LAUNCH, LIKE JOYRIDE AND INSTRUCTION**/
      } else {
        console.log('not a first launch');
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    AFUDLListener = appsFlyer.onDeepLink((res) => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        //* *TODO: DO SOMETHING IF DEEPLINK FROM APPSFLYER */
        if (res?.data?.deep_link_value?.charAt(0) === 'e') {
          setUserData({
            userData: {
              eventCode: res?.data?.deep_link_value?.slice(2),
            },
          });
        }
        if (res?.data?.deep_link_value?.charAt(0) === 'r') {
          setUserData({
            userData: {
              refferalCode: res?.data?.deep_link_value.slice(2),
            },
          });
        }
      }
    });
    AFInit();
    AFsetCurrency();

    return () => {
      AFGCDListener();
      AFUDLListener();
    };
  }, []);

  return (
    <View style={Style.container}>
      {children}
      <ModalComingSoon
        isShow={isShowModalComingSoon}
        lang={lang}
        onClosePress={() => setIsShowModalComingSoon(false)}
        onPressCall={() => {
          setIsShowModalComingSoon(false);
          setTimeout(
            () => {
              setIsShowModalCustomerCare(true);
            },
            Size.isAndroid ? 200 : 600
          );
        }}
      />
      <ModalCustomerCare
        lang={lang}
        isShow={isShowModalCustomerCare}
        data={getCSInfoResponse?.data}
        onClosePress={() => setIsShowModalCustomerCare(false)}
      />
      <ModalInternalServerError
        isShow={isShowModalInternalServerError}
        lang={lang}
        onClosePress={() => setIsShowModalInternalServerError(false)}
      />
      <ModalBadRequest
        isShow={isShowModalBadRequest}
        lang={lang}
        onClosePress={() => setIsShowModalBadRequest(false)}
      />
      <ModalLoading loading={loading} />
      {toastMsg?.type && (
        <Toast position="top" bottomOffset={20} config={toastConfig} />
      )}
    </View>
  );
}

export default Bootstrap;

Bootstrap.propTypes = {
  authAction: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobilePhoneNumber: PropTypes.string.isRequired,
  setActivity: PropTypes.func.isRequired,
  setDeviceId: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  setIsShowModalComingSoon: PropTypes.func.isRequired,
  isShowModalComingSoon: PropTypes.bool.isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  isShowModalCustomerCare: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  getCSInfo: PropTypes.func.isRequired,
  getCSInfoResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  toastMsg: PropTypes.objectOf(Object).isRequired,
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
  isShowModalInternalServerError: PropTypes.bool.isRequired,
  setIsShowModalInternalServerError: PropTypes.func.isRequired,
  isShowModalBadRequest: PropTypes.bool.isRequired,
  setIsShowModalBadRequest: PropTypes.func.isRequired,
  getCheckIssuedPolicy: PropTypes.func.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  setDimensions: PropTypes.func.isRequired,
  setAppConfig: PropTypes.func.isRequired,
  appConfig: PropTypes.objectOf(Object).isRequired,
  isProgressCodePush: PropTypes.bool.isRequired,
  setUserData: PropTypes.func.isRequired,
  setStatusCodePush: PropTypes.func.isRequired,
};
