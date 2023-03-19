import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-login/loginConstant';
import {
  setLoginSuccess,
  setLoginFailed,
  setLoginSocialSuccess,
  setLoginSocialFailed,
} from 'ca-module-login/loginAction';
import { setAuth } from 'ca-module-auth/authAction';
import { setLoginApi } from 'ca-module-auth/authApi';
import { AFLogEvent, AF_LOGIN } from 'ca-util/AppsFlyer';
import { Platform } from 'react-native';
import { setLoginSocialApi } from './loginApi';

function* setLogin(params) {
  try {
    const response = yield call(setLoginApi, {
      ...params.payload,
      devicePlatform: Platform.OS,
    });
    // APPSFLYER LOG - LOGIN MANUAL
    const logs = {
      af_user_id: response?.data?.data?.userData?.userId,
      af_channel: Platform.OS,
    };
    AFLogEvent(AF_LOGIN, logs);
    yield put(
      setAuth({
        userData: {
          userId: response?.data?.data?.userData?.userId,
          email: response?.data?.data?.userData?.email,
          name: response?.data?.data?.userData?.name,
          thumbnailPhotoKey: response?.data?.data?.userData?.thumbnailPhotoKey,
          isEmailVerified: response?.data?.data?.userData?.isEmailVerified,
          alreadySetPin: response?.data?.data?.userData?.alreadySetPin,
          authType: response?.data?.data?.userData?.authType,
          alreadyKYC: response?.data?.data?.userData?.alreadyKYC,
          alreadyLivenessTest:
            response?.data?.data?.userData?.alreadyLivenessTest,
          mobilePhoneNumber: response?.data?.data?.userData?.mobilePhoneNumber,
          userParty: response?.data?.data?.userData?.userParty,
          ekycId: response?.data?.data?.userData?.ekycId,
          alreadySetMPin: response?.data?.data?.userData?.alreadySetMPin,
          isReKYC: response?.data?.data?.userData?.isReKYC,
          isReLivenessTest: response?.data?.data?.userData?.isReLivenessTest,
          isReUploadIdCard: response?.data?.data?.userData?.isReUploadIdCard,
          isReLivenessTestAndReUploadIdCard:
            response?.data?.data?.userData?.isReLivenessTestAndReUploadIdCard,
          registerDate: response?.data?.data?.userData?.registerDate,
        },
        token: response?.data?.data?.token,
      })
    );
    yield put(setLoginSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLoginFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLoginFailed(error?.response?.data));
        break;
      default:
        yield put(setLoginFailed(error?.response?.data));
        break;
    }
  }
}

function* setLoginSocial(params) {
  try {
    const response = yield call(setLoginSocialApi, {
      ...params.payload,
      devicePlatform: Platform.OS,
    });
    // APPSFLYER LOG - LOGIN SOCIAL
    const logs = {
      af_user_id: response?.data?.userData?.userId,
      af_channel: Platform.OS,
    };
    AFLogEvent(AF_LOGIN, logs);
    yield put(
      setAuth({
        userData: {
          userId: response?.data?.userData?.userId,
          email: response?.data?.userData?.email,
          name: response?.data?.userData?.name,
          thumbnailPhotoKey: response?.data?.userData?.thumbnailPhotoKey,
          isEmailVerified: response?.data?.userData?.isEmailVerified,
          alreadySetPin: response?.data?.userData?.alreadySetPin,
          authType: response?.data?.userData?.authType,
          alreadyKYC: response?.data?.userData?.alreadyKYC,
          alreadyLivenessTest: response?.data?.userData?.alreadyLivenessTest,
          mobilePhoneNumber: response?.data?.userData?.mobilePhoneNumber,
          userParty: response?.data?.userData?.userParty,
          ekycId: response?.data?.userData?.ekycId,
          alreadySetMPin: response?.data?.userData?.alreadySetMPin,
          isReKYC: response?.data?.userData?.isReKYC,
          isReLivenessTest: response?.data?.userData?.isReLivenessTest,
          isReUploadIdCard: response?.data?.userData?.isReUploadIdCard,
          isReLivenessTestAndReUploadIdCard:
            response?.data?.userData?.isReLivenessTestAndReUploadIdCard,
          registerDate: response?.data?.data?.userData?.registerDate,
        },
        token: response?.data?.token,
      })
    );
    yield put(setLoginSocialSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
      default:
        yield put(setLoginSocialFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.SET_LOGIN, setLogin),
  takeLatest(CONST.SET_LOGIN_SOCIAL, setLoginSocial),
];
