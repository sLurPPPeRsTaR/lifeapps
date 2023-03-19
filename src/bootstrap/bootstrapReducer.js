import { persistReducer } from 'redux-persist';
import * as CONST from 'ca-bootstrap/bootstrapConstant';
import * as STATE from 'ca-bootstrap/bootstrapInitialState';
import moment from 'moment';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { authReducer } from 'ca-module-auth/authReducer';
import { loginReducer } from 'ca-module-login/loginReducer';
import { profileReducer } from 'ca-module-profile/profileReducer';
import { registerReducer } from 'ca-module-register/registerReducer';
import { forpassReducer } from 'ca-module-forpass/forpassReducer';
import { homeReducer } from 'ca-module-home/homeReducer';
import { polisReducer } from 'ca-module-polis/polisReducer';
import { kycReducer } from 'ca-module-kyc/kycReducer';
import { updataReducer } from 'ca-module-updata/updataReducer';
import Persist from 'ca-config/Persist';
import { lifesaverReducer } from 'ca-module-lifesaver/lifesaverReducer';
import { notificationReducer } from 'ca-module-notification/notificationReducer';
import { subsReducer } from 'ca-module-subs/subsReducer';
import { invitationReducer } from 'ca-module-invitation/invitationReducer';
import { paymentsReducer } from 'ca-module-payments/paymentsReducer';
import { eventReducer } from 'ca-module-event/eventReducer';
import { lifetagReducer } from 'ca-module-lifetag/lifetagReducer';
import { articleReducer } from 'ca-module-article/articleReducer';

export const activity = (state = _.cloneDeep(STATE.userActivity), action) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_ACTIVITY]: () => ({
      userActivity: {
        type: payload.type,
        value: payload.value,
        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        dateDiff: moment(new Date()).diff(state.userActivity.date),
      },
      currentScreen: payload.type === 'CHANGE_SCREEN' ? payload.value : '',
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

export const bootstrap = (
  state = _.cloneDeep(STATE.bootstrapInitialState),
  action
) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_LOCATION]: () => ({
      ...state,
      latitude: payload.latitude,
      longitude: payload.longitude,
      action: type,
    }),
    [CONST.SET_IS_LOCATION_PERMISSION_GRANTED]: () => ({
      ...state,
      isLocationPermissionGranted: payload,
      action: type,
    }),
    [CONST.SET_IS_SHOW_MODAL_COMING_SOON]: () => ({
      ...state,
      isShowModalComingSoon: payload,
      action: type,
    }),
    [CONST.SET_IS_SHOW_MODAL_CUSTOMER_CARE]: () => ({
      ...state,
      isShowModalCustomerCare: payload,
      action: type,
    }),
    [CONST.SET_LOADING]: () => ({
      ...state,
      loading: payload,
      action: type,
    }),
    [CONST.SET_UPLOAD_IMAGE_PROGRESS]: () => ({
      ...state,
      setUploadImageProgress: payload,
    }),
    [CONST.SET_TOASTMSG]: () => ({
      ...state,
      toastMsg: payload,
    }),
    [CONST.SET_ISPROGRESS_CODEPUSH]: () => ({
      ...state,
      isProgressCodePush: payload,
    }),
    [CONST.SET_STATUS_CODEPUSH]: () => ({
      ...state,
      statusCodePush: payload,
    }),
    [CONST.SET_IS_SHOW_MODAL_INTERNAL_SERVER_ERROR]: () => ({
      ...state,
      isShowModalInternalServerError: payload,
      action: type,
    }),
    [CONST.SET_IS_SHOW_MODAL_BAD_REQUEST]: () => ({
      ...state,
      isShowModalBadRequest: payload,
      action: type,
    }),
    [CONST.SET_DIMENSIONS]: () => ({
      ...state,
      dimensions: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_SCREEN]: () => ({
      ...state,
      isComingFromScreen: payload,
      action: type,
    }),
    [CONST.SET_APP_CONFIG]: () => ({
      ...state,
      appConfig: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_DEEPLINK]: () => ({
      ...state,
      isComingFromDeepLink: payload,
      action: type,
    }),
    [CONST.SET_IS_SHOW_FAILED_MODAL_LOGIN]: () => ({
      ...state,
      isShowFailedModalLogin: payload,
      action: type,
    }),
    [CONST.SET_IS_COMING_FROM_DEEPLINK_URL]: () => ({
      ...state,
      isComingFromDeepLinkUrl: payload,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

export const localReducer = (
  state = _.cloneDeep(STATE.localInitialState),
  action
) => {
  const { payload, type } = action;
  const actions = {
    [CONST.SET_IS_ALREADY_LAUNCHED]: () => ({
      ...state,
      isAlreadyLaunched: payload,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};

const bootstrapReducer = combineReducers({
  activity: persistReducer(Persist.activityConfig, activity),
  bootstrap,
  local: persistReducer(Persist.localConfig, localReducer),
  auth: persistReducer(Persist.authConfig, authReducer),
  login: loginReducer,
  profile: profileReducer,
  register: registerReducer,
  forpass: forpassReducer,
  home: homeReducer,
  polis: polisReducer,
  kyc: kycReducer,
  updata: updataReducer,
  lifesaver: lifesaverReducer,
  notification: notificationReducer,
  subs: subsReducer,
  invitation: invitationReducer,
  payments: paymentsReducer,
  event: eventReducer,
  lifetag: lifetagReducer,
  article: articleReducer,
});

export default bootstrapReducer;
