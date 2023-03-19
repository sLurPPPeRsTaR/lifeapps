import * as BOOTSTRAP from './bootstrapConstant';

export const setActivity = (type, value = '') => ({
  payload: {
    type,
    value,
  },
  type: BOOTSTRAP.SET_ACTIVITY,
});
export const setLocation = (payload) => ({
  type: BOOTSTRAP.SET_LOCATION,
  payload,
});
export const setiIsLocationPermissionGranted = (payload) => ({
  type: BOOTSTRAP.SET_IS_LOCATION_PERMISSION_GRANTED,
  payload,
});
export const setIsShowModalComingSoon = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_MODAL_COMING_SOON,
  payload,
});
export const setIsShowModalCustomerCare = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_MODAL_CUSTOMER_CARE,
  payload,
});
export const setLoading = (payload) => ({
  type: BOOTSTRAP.SET_LOADING,
  payload,
});
export const setUploadImageProgress = (payload) => ({
  type: BOOTSTRAP.SET_UPLOAD_IMAGE_PROGRESS,
  payload,
});
export const setToastMsg = (payload) => ({
  type: BOOTSTRAP.SET_TOASTMSG,
  payload,
});
export const setIsShowModalInternalServerError = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_MODAL_INTERNAL_SERVER_ERROR,
  payload,
});
export const setIsShowModalBadRequest = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_MODAL_BAD_REQUEST,
  payload,
});
export const setIsProgressCodePush = (payload) => ({
  type: BOOTSTRAP.SET_ISPROGRESS_CODEPUSH,
  payload,
});
export const setStatusCodePush = (payload) => ({
  type: BOOTSTRAP.SET_STATUS_CODEPUSH,
  payload,
});
export const setDimensions = (payload) => ({
  type: BOOTSTRAP.SET_DIMENSIONS,
  payload,
});
export const setIsComingFromScreen = (payload) => ({
  type: BOOTSTRAP.SET_IS_COMING_FROM_SCREEN,
  payload,
});
export const setAppConfig = (payload) => ({
  type: BOOTSTRAP.SET_APP_CONFIG,
  payload,
});
export const setIsComingFromDeepLink = (payload) => ({
  type: BOOTSTRAP.SET_IS_COMING_FROM_DEEPLINK,
  payload,
});
export const setIsShowFailedModalLogin = (payload) => ({
  type: BOOTSTRAP.SET_IS_SHOW_FAILED_MODAL_LOGIN,
  payload,
});
export const setIsAlreadyLaunched = (payload) => ({
  type: BOOTSTRAP.SET_IS_ALREADY_LAUNCHED,
  payload,
});
export const setIsComingFromDeepLinkUrl = (payload) => ({
  type: BOOTSTRAP.SET_IS_COMING_FROM_DEEPLINK_URL,
  payload,
});
