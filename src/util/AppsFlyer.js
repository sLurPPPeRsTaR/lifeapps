import appsFlyer from 'react-native-appsflyer';
import { Platform } from 'react-native';
import { APPSFLYER_APPID, APPSFLYER_DEVKEY } from './constant';

export const AF_SCREEN_VIEW = 'af_screen_view';
export const AF_LOGIN = 'af_login';
export const AF_OPEN_EKYC = 'af_open_ekyc';
export const AF_COMPLETE_EKYC = 'af_complete_ekyc';
export const AF_OPEN_SUBSCRIBE = 'af_open_subscribe';
export const AF_COMPLETE_REGISTRATION = 'af_complete_registration';
export const AF_SUBSCRIBE = 'af_subscribe';

// event feature
export const AF_EVENT_TILE = 'af_event_tile';
export const AF_EVENT_LIST_CLICK = 'af_event_list_click';
export const AF_REGISTER_BUTTON = 'af_register_button';
export const AF_SHARE_BUTTON = 'af_share_button';
// click event
export const AF_LANDING_CLICK_REGISTER = 'af_landing_click_register';
const initOptions = {
  devKey: APPSFLYER_DEVKEY,
  isDebug: true,
  appId: APPSFLYER_APPID,
  onInstallConversionDataListener: true, // Optional
  onDeepLinkListener: true, // Optional
  timeToWaitForATTUserAuthorization: 10, // for iOS 14.5
};

// AppsFlyer initialization flow. ends with initSdk.
export function AFInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  // appsFlyer.setAppInviteOneLinkID('oW4R');
  appsFlyer.initSdk(
    initOptions,
    (result) => {
      console.log('AFINIT: ');
      console.log(result);
    },
    (error) => {
      console.error('AFINIT: ');
      console.error(error);
    }
  );
}

// Sends in-app events to AppsFlyer servers. name is the events name ('simple event') and the values are a JSON ({info: 'fff', size: 5})
export function AFLogEvent(name, values) {
  appsFlyer.logEvent(
    name,
    values,

    (result) => {
      console.log('AFLogEvent: ');
      console.log('AFLogEvent Name : ', name, ', Values: ', values);
      console.log(result);
    },

    (error) => {
      console.error('AFLogEvent Error: ');
      console.error(error);
    }
  );
}

export function AFsetCurrency(currencyCode = 'IDR') {
  appsFlyer.setCurrencyCode(currencyCode, () => {});
}

export function AFsetCustomerUserId(userId) {
  appsFlyer.setCustomerUserId(userId, () => {});
}

export function AFLogLocation({ lat, lng }) {
  appsFlyer.logLocation(lat, lng, (err, coords) => {
    if (err) {
      console.error('AFLogError: ');
      console.error(err);
    } else {
      console.log('AFLogLocation: ');
      console.log(coords);
    }
  });
}
