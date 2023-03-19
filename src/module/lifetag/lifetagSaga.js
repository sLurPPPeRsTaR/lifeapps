import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATE, RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-lifetag/lifetagConstant';
import {
  getLifetagCurrentSettingApi,
  getLifetagFlagApi,
  getLifetagListOrderApi,
  getLifetagProductDetailApi,
  getLifetagProfileApi,
  getLifetagProfilePublicApi,
  setLifetagCreateOrderApi,
  setLifetagSectionSettingApi,
  setLifetagUpdateApi,
  setLinkLifetagApi,
  setLifetagUnlinkApi,
  getLifetagLinkedListApi,
  getLifetagDetailOrderApi,
  setLifetagOrderNoApi,
  setLifetagUpdateOrderApi,
  getLifetagListOtherInfoApi,
} from 'ca-module-lifetag/lifetagApi';
import {
  getLifetagProductDetailSuccess,
  getLifetagProductDetailFailed,
  getLifetagProfileSuccess,
  getLifetagProfileFailed,
  getLifetagProfilePublicSuccess,
  getLifetagProfilePublicFailed,
  setLinkLifetagSuccess,
  setLinkLifetagFailed,
  setLifetagCreateOrderSuccess,
  setLifetagCreateOrderFailed,
  getLifetagCurrentSettingSuccess,
  getLifetagCurrentSettingFailed,
  setLifetagSectionSettingSuccess,
  setLifetagSectionSettingFailed,
  getLifetagListOrderSuccess,
  getLifetagListOrderFailed,
  getLifetagDetailOrderSuccess,
  getLifetagDetailOrderFailed,
  getLifetagFlagSuccess,
  getLifetagFlagFailed,
  getLifetagLinkedListSuccess,
  getLifetagLinkedListFailed,
  setLifetagUpdateSuccess,
  setLifetagUpdateFailed,
  setLifetagUnlinkSuccess,
  setLifetagUnlinkFailed,
  setLifetagOrderNoSuccess,
  setLifetagOrderNoFailed,
  setLifetagUpdateOrderFailed,
  setLifetagUpdateOrderSuccess,
  getLifetagListOtherInfoSuccess,
  getLifetagListOtherInfoFailed,
} from './lifetagAction';

// LIFETAG PRODUCT DETAIL
function* getLifetagProductDetail(params) {
  try {
    const response = yield call(getLifetagProductDetailApi, params.payload);
    yield put(getLifetagProductDetailSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagProductDetailFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagProductDetailFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG PROFILE
function* getLifetagProfile(params) {
  try {
    const response = yield call(getLifetagProfileApi, params.payload);
    yield put(getLifetagProfileSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProfileFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagProfileFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagProfileFailed(error?.response?.data));
    }
  }
}

// LIFETAG PROFILE PUBLIC
function* getLifetagProfilePublic(params) {
  try {
    const response = yield call(getLifetagProfilePublicApi, params.payload);
    yield put(getLifetagProfilePublicSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagProfilePublicFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagProfilePublicFailed(error?.response?.data));
    }
  }
}

// LIFETAG LINK
function* setLinkLifetag(params) {
  try {
    const response = yield call(setLinkLifetagApi, params.payload);
    yield put(setLinkLifetagSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLinkLifetagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLinkLifetagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLinkLifetagFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLinkLifetagFailed(error?.response?.data));
    }
  }
}

// LIFETAG CREATE ORDER
function* setLifetagCreateOrder(params) {
  try {
    const response = yield call(setLifetagCreateOrderApi, params.payload);
    yield put(setLifetagCreateOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagCreateOrderFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLifetagCreateOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG CURRENT SETTING
function* getLifetagCurrentSetting(params) {
  try {
    const response = yield call(getLifetagCurrentSettingApi, params.payload);
    yield put(getLifetagCurrentSettingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagCurrentSettingFailed({
            message: RESPONSE_STATE.ERR_NETWORK,
          })
        );
        break;
      default:
        yield put(getLifetagCurrentSettingFailed(error?.response?.data));
    }
  }
}

// LIFETAG CHANGE SETTING
function* setLifetagSectionSetting(params) {
  try {
    const response = yield call(setLifetagSectionSettingApi, params.payload);
    yield put(setLifetagSectionSettingSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagSectionSettingFailed({
            message: RESPONSE_STATE.ERR_NETWORK,
          })
        );
        break;
      default:
        yield put(setLifetagSectionSettingFailed(error?.response?.data));
    }
  }
}

// LIFETAG LIST ORDER
function* getLifetagListOrder(params) {
  try {
    const response = yield call(getLifetagListOrderApi, params.payload);
    yield put(getLifetagListOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagListOrderFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagListOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG DETAIL ORDER
function* getLifetagDetailOrder(params) {
  try {
    const response = yield call(getLifetagDetailOrderApi, params.payload);
    yield put(getLifetagDetailOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagDetailOrderFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagDetailOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG FLAG
function* getLifetagFlag(params) {
  try {
    const response = yield call(getLifetagFlagApi, params.payload);
    yield put(getLifetagFlagSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagFlagFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagFlagFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG UPDATE
function* setLifetagUpdate(params) {
  try {
    const response = yield call(setLifetagUpdateApi, params.payload);
    yield put(setLifetagUpdateSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUpdateFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUpdateFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagUpdateFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLifetagUpdateFailed(error?.response?.data));
    }
  }
}

// PRODUCT LIFETAG
function* getLifetagLinkedList(params) {
  try {
    const response = yield call(getLifetagLinkedListApi, params.payload);
    yield put(getLifetagLinkedListSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagLinkedListFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagLinkedListFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG UNLINK
function* setLifetagUnlink(params) {
  try {
    const response = yield call(setLifetagUnlinkApi, params.payload);
    yield put(setLifetagUnlinkSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagUnlinkFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLifetagUnlinkFailed(error?.response?.data));
    }
  }
}

// LIFETAG ORDER NO
function* setLifetagOrderNo(params) {
  try {
    const response = yield call(setLifetagOrderNoApi, params.payload);
    yield put(setLifetagOrderNoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagOrderNoFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLifetagOrderNoFailed(error?.response?.data));
    }
  }
}

// LIFETAG UPDATE ORDER
function* setLifetagUpdateOrder(params) {
  try {
    const response = yield call(setLifetagUpdateOrderApi, params.payload);
    yield put(setLifetagUpdateOrderSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          setLifetagUpdateOrderFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(setLifetagUpdateOrderFailed(error?.response?.data));
        break;
    }
  }
}

// LIFETAG OTHER INFO
function* getLifetagListOtherInfo(params) {
  try {
    const response = yield call(getLifetagListOtherInfoApi, params.payload);
    yield put(getLifetagListOtherInfoSuccess(response.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERR_NETWORK:
        yield put(
          getLifetagListOtherInfoFailed({ message: RESPONSE_STATE.ERR_NETWORK })
        );
        break;
      default:
        yield put(getLifetagListOtherInfoFailed(error?.response?.data));
        break;
    }
  }
}

export default [
  takeLatest(CONST.GET_LIFETAG_PRODUCT_DETAIL, getLifetagProductDetail),
  takeLatest(CONST.GET_LIFETAG_PROFILE, getLifetagProfile),
  takeLatest(CONST.GET_LIFETAG_PROFILE_PUBLIC, getLifetagProfilePublic),
  takeLatest(CONST.SET_LINK_LIFETAG, setLinkLifetag),
  takeLatest(CONST.SET_LIFETAG_CREATE_ORDER, setLifetagCreateOrder),
  takeLatest(CONST.GET_LIFETAG_CURRENT_SETTING, getLifetagCurrentSetting),
  takeLatest(CONST.SET_LIFETAG_SECTION_SETTING, setLifetagSectionSetting),
  takeLatest(CONST.GET_LIFETAG_LIST_ORDER, getLifetagListOrder),
  takeLatest(CONST.GET_LIFETAG_DETAIL_ORDER, getLifetagDetailOrder),
  takeLatest(CONST.GET_LIFETAG_FLAG, getLifetagFlag),
  takeLatest(CONST.GET_LIFETAG_LINKED_LIST, getLifetagLinkedList),
  takeLatest(CONST.SET_LIFETAG_UPDATE, setLifetagUpdate),
  takeLatest(CONST.SET_LIFETAG_UNLINK, setLifetagUnlink),
  takeLatest(CONST.SET_LIFETAG_ORDERNO, setLifetagOrderNo),
  takeLatest(CONST.SET_LIFETAG_UPDATE_ORDER, setLifetagUpdateOrder),
  takeLatest(CONST.GET_LIFETAG_LIST_OTHER_INFO, getLifetagListOtherInfo),
];
