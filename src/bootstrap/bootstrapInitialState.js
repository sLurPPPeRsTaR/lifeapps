import { Dimensions } from 'react-native';

export const userActivity = {
  userActivity: {
    type: '',
    value: '',
    date: '',
    dateDiff: '',
  },
  currentScreen: 'HomeMain',
};

export const bootstrapInitialState = {
  latitude: '',
  longitude: '',
  isLocationPermissionGranted: false,
  isShowModalComingSoon: false,
  isShowModalCustomerCare: false,
  isShowModalInternalServerError: false,
  isShowModalBadRequest: false,
  setUploadImageProgress: 0,
  loading: false,
  toastMsg: {},
  isProgressCodePush: undefined,
  statusCodepush: false,
  action: '',
  dimensions: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isComingFromScreen: {},
  isComingFromDeepLink: false,
  isComingFromDeepLinkUrl: {},
  appConfig: {
    features: {
      lifesaver: true,
      appleSignIn: false,
    },
    availableVersions: {},
  },
  isShowFailedModalLogin: false,
};

export const localInitialState = {
  isAlreadyLaunched: false,
};
