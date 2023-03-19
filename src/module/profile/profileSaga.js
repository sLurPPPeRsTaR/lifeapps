import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-profile/profileConstant';
import {
  setPersonalDataSuccess,
  setPersonalDataFailed,
  getProfileDeviceSuccess,
  getProfileDeviceFailed,
  setProfileDeviceSuccess,
  setProfileDeviceFailed,
  getPersonalDataSuccess,
  getPersonalDataFailed,
  setCreatePinSuccess,
  setCreatePinFailed,
  setChangePinSuccess,
  setChangePinFailed,
  getVerifyPinSuccess,
  getVerifyPinFailed,
  setChangePasswordSuccess,
  setChangePasswordFailed,
  setPhoneNumberSuccess,
  setPhoneNumberFailed,
  setUploadProfileSuccess,
  setUploadProfileFailed,
  setDeleteFotoProfileSuccess,
  setDeleteFotoProfileFailed,
  getCSInfoSuccess,
  getCSInfoFailed,
  getPersonalDataProvinceSuccess,
  getPersonalDataProvinceFailed,
  getPersonalDataCityFailed,
  getPersonalDataCitySuccess,
  getPersonalDataDistrictSuccess,
  getPersonalDataDistrictFailed,
  setProfileRequestOtpSuccess,
  setProfileRequestOtpFailed,
  setProfileVerifyOtpSuccess,
  setProfileVerifyOtpFailed,
  setProfileFaqSuccess,
  setProfileFaqFailed,
  setProfileNoLoginFaqSuccess,
  setProfileNoLoginFaqFailed,
  getUserIDCardInfoSuccess,
  getUserIDCardInfoFailed,
  setEmailSuccess,
  setEmailFailed,
  getAddressListSuccess,
  getAddressListFailed,
  setUpdateAddressSuccess,
  setUpdateAddressFailed,
  setSaveAddressSuccess,
  setSaveAddressFailed,
  setDeleteAddressSuccess,
  setDeleteAddressFailed,
  setDeleteAccountFailed,
  setDeleteAccountSuccess,
  getProfileProvinceSuccess,
  getProfileProvinceFailed,
  getProfileCitySuccess,
  getProfileCityFailed,
  getProfileDistrictSuccess,
  getProfileDistrictFailed,
  getProfileSubDistrictSuccess,
  getProfileSubDistrictFailed,
  getProfileReferralSuccess,
  getProfileReferralFailed,
  getProfileUserPartySuccess,
  getProfileUserPartyFailed,
} from 'ca-module-profile/profileAction';
import {
  setPersonalDataApi,
  getPersonalDataApi,
  setChangePasswordApi,
} from 'ca-module-auth/authApi';
import {
  getProfileDeviceApi,
  getVerifyPinApi,
  setChangePinApi,
  setCreatePinApi,
  setProfileDeviceApi,
  setPhoneNumberApi,
  setUploadProfileApi,
  setThumbnailApi,
  setUserFotoApi,
  setDeleteFotoProfileApi,
  setDeleteUserTableApi,
  getCSInfoApi,
  getPersonalDataProvinceApi,
  getPersonalDataCityApi,
  getPersonalDataDistrictApi,
  setProfileRequestOtpApi,
  setProfileVerifyOtpApi,
  setProfileFaqApi,
  setProfileNoLoginFaqApi,
  getUserIDCardInfoApi,
  setEmailApi,
  getAddressListApi,
  setUpdateAddressApi,
  setSaveAddressApi,
  setDeleteAddressApi,
  setDeleteAccountApi,
  getProfileProvinceApi,
  getProfileCityApi,
  getProfileDistrictApi,
  getProfileSubDistrictApi,
  setProfileRequestOtpNoLoginApi,
  setProfileVerifyOtpNoLoginApi,
  getProfileReferralApi,
  getProfileUserPartyApi,
} from 'ca-module-profile/profileApi';
import { setUserData, setClearRefreshToken } from 'ca-module-auth/authAction';
import { setProgressWatcher, setUploader } from 'ca-util/uploader';

function* setPersonalData(params) {
  try {
    const response = yield call(setPersonalDataApi, params.payload);
    yield put(
      setUserData({
        userData: {
          name: params?.payload?.name,
        },
      })
    );
    yield put(setPersonalDataSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
      default:
        yield put(setPersonalDataFailed(error?.response?.data));
        break;
    }
  }
}

function* getProfileDevice(params) {
  try {
    const response = yield call(getProfileDeviceApi, params.payload);
    yield put(getProfileDeviceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
      default:
        yield put(getProfileDeviceFailed(error?.response?.data));
        break;
    }
  }
}

function* setProfileDevice(params) {
  try {
    const response = yield call(setProfileDeviceApi, params.payload);
    yield put(setProfileDeviceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
      default:
        yield put(setProfileDeviceFailed(error?.response?.data));
        break;
    }
  }
}

function* getPersonalData(params) {
  try {
    const response = yield call(getPersonalDataApi, params.payload);
    yield put(getPersonalDataSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
      default:
        yield put(getPersonalDataFailed(error?.response?.data));
        break;
    }
  }
}

function* setCreatePin(params) {
  try {
    const response = yield call(setCreatePinApi, params.payload);
    yield put(setCreatePinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setCreatePinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setCreatePinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setChangePin(params) {
  try {
    const response = yield call(setChangePinApi, params.payload);
    yield put(setChangePinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setChangePinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setChangePinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getVerifyPin(params) {
  try {
    const response = yield call(getVerifyPinApi, params.payload);
    yield put(getVerifyPinSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getVerifyPinFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getVerifyPinFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setChangePassword(params) {
  try {
    const response = yield call(setChangePasswordApi, params.payload);
    yield put(setChangePasswordSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setChangePasswordFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setChangePasswordFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setPhoneNumber(params) {
  try {
    const response = yield call(setPhoneNumberApi, params.payload);
    yield put(
      setUserData({
        userData: {
          userParty: response?.data?.data?.userParty,
        },
      })
    );
    yield put(setPhoneNumberSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setPhoneNumberFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setPhoneNumberFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setEmail(params) {
  try {
    const response = yield call(setEmailApi, params.payload);
    yield put(setEmailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setEmailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setEmailFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// -- Upload Profile -- //
function* setUploadProfile(params) {
  try {
    const { uploadPromise, chan } = yield call(
      setUploader,
      params.payload,
      setUploadProfileApi
    );
    yield fork(setProgressWatcher, chan);
    const response = yield call(() => uploadPromise);
    if (response?.data?.data?.userMetadata?.key) {
      const setThumbnailRes = yield call(setThumbnailApi, {
        fileName: response?.data?.data?.userMetadata?.fileName,
        key: response?.data?.data?.userMetadata?.key,
        height: '300',
        width: '300',
        directory: 'thumbnail',
        isPublic: 'false',
      });
      const setUserFotoRes = yield call(setUserFotoApi, {
        photoKey: response?.data?.data?.userMetadata?.key,
        thumbnailPhotoKey: setThumbnailRes?.data?.data?.userMetadata?.key,
      });
      if (setUserFotoRes.status === RESPONSE_STATUS.SUCCESS) {
        yield put(
          setUserData({
            userData: {
              thumbnailPhotoKey: setThumbnailRes?.data?.data?.userMetadata?.key,
            },
          })
        );
        yield put(setUploadProfileSuccess(response.data));
      }
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUploadProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUploadProfileFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* setDeleteFotoProfile(params) {
  try {
    const res = yield call(setDeleteFotoProfileApi, params.payload);
    yield put(
      setUserData({
        userData: {
          thumbnailPhotoKey: '',
        },
      })
    );
    if (res.status === RESPONSE_STATUS.SUCCESS) {
      yield call(setDeleteUserTableApi);
      yield put(setDeleteFotoProfileSuccess());
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setDeleteFotoProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteFotoProfileFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getCSInfo(params) {
  try {
    const response = yield call(getCSInfoApi, params.payload);
    yield put(getCSInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCSInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCSInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataProvince(params) {
  try {
    const response = yield call(getPersonalDataProvinceApi, params.payload);
    yield put(getPersonalDataProvinceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataProvinceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataProvinceFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataCity(params) {
  try {
    const response = yield call(getPersonalDataCityApi, params.payload);
    yield put(getPersonalDataCitySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataCityFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataCityFailed(error?.response?.data));
        break;
      default:
    }
  }
}

function* getPersonalDataDistrict(params) {
  try {
    const response = yield call(getPersonalDataDistrictApi, params.payload);
    yield put(getPersonalDataDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPersonalDataDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPersonalDataDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Request OTP
function* setProfileRequestOtp(params) {
  try {
    if (params?.payload?.isNoLogin) {
      const response = yield call(
        setProfileRequestOtpNoLoginApi,
        params.payload.data
      );
      yield put(setProfileRequestOtpSuccess(response.data));
    } else {
      const response = yield call(setProfileRequestOtpApi, params.payload);
      yield put(setProfileRequestOtpSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileRequestOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileRequestOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Verify OTP
function* setProfileVerifyOtp(params) {
  try {
    if (params?.payload?.isNoLogin) {
      const response = yield call(
        setProfileVerifyOtpNoLoginApi,
        params.payload.data
      );
      yield put(setProfileVerifyOtpSuccess(response.data));
    } else {
      const response = yield call(setProfileVerifyOtpApi, params.payload.data);
      yield put(setProfileVerifyOtpSuccess(response.data));
    }
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileVerifyOtpFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileVerifyOtpFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// FAQ
function* setProfileFaq(params) {
  try {
    const response = yield call(setProfileFaqApi, params.payload);
    yield put(setProfileFaqSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileFaqFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileFaqFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// NOLOGINFAQ
function* setProfileNoLoginFaq(params) {
  try {
    const response = yield call(setProfileNoLoginFaqApi, params.payload);
    yield put(setProfileNoLoginFaqSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setProfileNoLoginFaqFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setProfileNoLoginFaqFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// USER ID CARD INFO
function* getUserIDCardInfo(params) {
  try {
    const response = yield call(getUserIDCardInfoApi, params.payload);
    yield put(getUserIDCardInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getUserIDCardInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getUserIDCardInfoFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// ADDRESS LIST
function* getAddressList(params) {
  try {
    const response = yield call(getAddressListApi, params.payload);
    yield put(getAddressListSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAddressListFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAddressListFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// UPDATE ADDRESS
function* setSaveAddress(params) {
  try {
    const response = yield call(setSaveAddressApi, params.payload);
    yield put(setSaveAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setSaveAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setSaveAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// UPDATE ADDRESS
function* setUpdateAddress(params) {
  try {
    const response = yield call(setUpdateAddressApi, params.payload);
    yield put(setUpdateAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setUpdateAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setUpdateAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// DELETE ADDRESS
function* setDeleteAddress(params) {
  try {
    const response = yield call(setDeleteAddressApi, params.payload);
    yield put(setDeleteAddressSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setDeleteAddressFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteAddressFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// DELETE ACCOUNT
function* setDeleteAccount(params) {
  try {
    const response = yield call(setDeleteAccountApi, params.payload);
    switch (response.status) {
      case RESPONSE_STATUS.SUCCESS:
        yield put(setDeleteAccountSuccess(response.data));
        yield put(setClearRefreshToken());
        break;
      case RESPONSE_STATUS.NEED_ACTION:
        yield put(setDeleteAccountFailed(response.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setDeleteAccountFailed(response.data));
        break;
      default:
    }
  } catch (error) {
    yield put(setDeleteAccountFailed(error.response));
  }
}

// Referral
function* getProfileReferral(params) {
  try {
    const response = yield call(getProfileReferralApi, params.payload);
    yield put(getProfileReferralSuccess(response?.data?.data?.referralCode));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileReferralFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileReferralFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// Province
function* getProfileProvince(params) {
  try {
    const response = yield call(getProfileProvinceApi, params.payload);
    yield put(getProfileProvinceSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileProvinceFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileProvinceFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// City
function* getProfileCity(params) {
  try {
    const response = yield call(getProfileCityApi, params.payload);
    yield put(getProfileCitySuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileCityFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileCityFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// District
function* getProfileDistrict(params) {
  try {
    const response = yield call(getProfileDistrictApi, params.payload);
    yield put(getProfileDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// SubDistrict
function* getProfileSubDistrict(params) {
  try {
    const response = yield call(getProfileSubDistrictApi, params.payload);
    yield put(getProfileSubDistrictSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileSubDistrictFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileSubDistrictFailed(error?.response?.data));
        break;
      default:
    }
  }
}

// userPArty
function* getProfileUserParty(params) {
  try {
    const response = yield call(getProfileUserPartyApi, params.payload);
    yield put(getProfileUserPartySuccess(response.data));
    yield put(
      setUserData({
        userData: {
          userParty: response?.data?.data,
        },
      })
    );
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getProfileUserPartyFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getProfileUserPartyFailed(error?.response?.data));
        break;
      default:
    }
  }
}

export default [
  takeLatest(CONST.SET_PERSONAL_DATA, setPersonalData),
  takeLatest(CONST.GET_PERSONAL_DATA, getPersonalData),
  takeLatest(CONST.GET_PROFILEDEVICE, getProfileDevice),
  takeLatest(CONST.SET_PROFILEDEVICE, setProfileDevice),
  takeLatest(CONST.SET_CREATE_PIN, setCreatePin),
  takeLatest(CONST.SET_CHANGE_PIN, setChangePin),
  takeLatest(CONST.GET_VERIFY_PIN, getVerifyPin),
  takeLatest(CONST.SET_CHANGE_PASSWORD, setChangePassword),
  takeLatest(CONST.SET_PHONE_NUMBER, setPhoneNumber),
  takeLatest(CONST.SET_EMAIL, setEmail),
  takeLatest(CONST.SET_UPLOAD_PROFILE, setUploadProfile),
  takeLatest(CONST.SET_DELETE_FOTO_PROFILE, setDeleteFotoProfile),
  takeLatest(CONST.GET_CS_INFO, getCSInfo),
  takeLatest(CONST.GET_PERSONAL_DATA_PROVINCE, getPersonalDataProvince),
  takeLatest(CONST.GET_PERSONAL_DATA_CITY, getPersonalDataCity),
  takeLatest(CONST.GET_PERSONAL_DATA_DISTRICT, getPersonalDataDistrict),
  takeLatest(CONST.SET_PROFILE_REQUEST_OTP, setProfileRequestOtp),
  takeLatest(CONST.SET_PROFILE_VERIFY_OTP, setProfileVerifyOtp),
  takeLatest(CONST.SET_PROFILE_FAQ, setProfileFaq),
  takeLatest(CONST.SET_PROFILE_NOLOGINFAQ, setProfileNoLoginFaq),
  takeLatest(CONST.GET_USER_ID_CARD_INFO, getUserIDCardInfo),
  takeLatest(CONST.GET_ADDRESS_LIST, getAddressList),
  takeLatest(CONST.SET_SAVE_ADDRESS, setSaveAddress),
  takeLatest(CONST.SET_UPDATE_ADDRESS, setUpdateAddress),
  takeLatest(CONST.SET_DELETE_ADDRESS, setDeleteAddress),
  takeLatest(CONST.SET_DELETE_ACCOUNT, setDeleteAccount),
  takeLatest(CONST.GET_PROFILE_REFERRAL, getProfileReferral),
  takeLatest(CONST.GET_PROFILE_PROVINCE, getProfileProvince),
  takeLatest(CONST.GET_PROFILE_CITY, getProfileCity),
  takeLatest(CONST.GET_PROFILE_DISTRICT, getProfileDistrict),
  takeLatest(CONST.GET_PROFILE_SUB_DISTRICT, getProfileSubDistrict),
  takeLatest(CONST.GET_PROFILE_USER_PARTY, getProfileUserParty),
];
