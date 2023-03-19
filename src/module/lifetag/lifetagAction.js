import * as CONST from './lifetagConstant';

// LIFETAG INITIALSTATE
export const setLifetagTempState = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_STATE,
  payload,
});
export const setLifetagTempStateClear = (payload) => ({
  type: CONST.SET_LIFETAG_TEMP_STATE_CLEAR,
  payload,
});

// LIFETAG PRODUCT DETAIL
export const getLifetagProductDetail = (payload) => ({
  type: CONST.GET_LIFETAG_PRODUCT_DETAIL,
  payload,
});
export const getLifetagProductDetailSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_PRODUCT_DETAIL_SUCCESS,
  payload,
});
export const getLifetagProductDetailFailed = (payload) => ({
  type: CONST.GET_LIFETAG_PRODUCT_DETAIL_FAILED,
  payload,
});
export const getLifetagProductDetailClear = (payload) => ({
  type: CONST.GET_LIFETAG_PRODUCT_DETAIL_CLEAR,
  payload,
});

// LIFETAG PROFILE
export const getLifetagProfile = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE,
  payload,
});
export const getLifetagProfileSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_SUCCESS,
  payload,
});
export const getLifetagProfileFailed = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_FAILED,
  payload,
});
export const getLifetagProfileClear = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_CLEAR,
  payload,
});

// LIFETAG PROFILE PUBLIC
export const getLifetagProfilePublic = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_PUBLIC,
  payload,
});
export const getLifetagProfilePublicSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_PUBLIC_SUCCESS,
  payload,
});
export const getLifetagProfilePublicFailed = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_PUBLIC_FAILED,
  payload,
});
export const getLifetagProfilePublicClear = (payload) => ({
  type: CONST.GET_LIFETAG_PROFILE_PUBLIC_CLEAR,
  payload,
});

// LIFETAG LINK
export const setLinkLifetag = (payload) => ({
  type: CONST.SET_LINK_LIFETAG,
  payload,
});
export const setLinkLifetagSuccess = (payload) => ({
  type: CONST.SET_LINK_LIFETAG_SUCCESS,
  payload,
});
export const setLinkLifetagFailed = (payload) => ({
  type: CONST.SET_LINK_LIFETAG_FAILED,
  payload,
});
export const setLinkLifetagClear = (payload) => ({
  type: CONST.SET_LINK_LIFETAG_CLEAR,
  payload,
});

// LIFETAG CREATE ORDER
export const setLifetagCreateOrder = (payload) => ({
  type: CONST.SET_LIFETAG_CREATE_ORDER,
  payload,
});
export const setLifetagCreateOrderSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_CREATE_ORDER_SUCCESS,
  payload,
});
export const setLifetagCreateOrderFailed = (payload) => ({
  type: CONST.SET_LIFETAG_CREATE_ORDER_FAILED,
  payload,
});
export const setLifetagCreateOrderClear = (payload) => ({
  type: CONST.SET_LIFETAG_CREATE_ORDER_CLEAR,
  payload,
});

// LIFETAG CURRENT SETTING
export const getLifetagCurrentSetting = (payload) => ({
  type: CONST.GET_LIFETAG_CURRENT_SETTING,
  payload,
});
export const getLifetagCurrentSettingSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_CURRENT_SETTING_SUCCESS,
  payload,
});
export const getLifetagCurrentSettingFailed = (payload) => ({
  type: CONST.GET_LIFETAG_CURRENT_SETTING_FAILED,
  payload,
});
export const getLifetagCurrentSettingClear = (payload) => ({
  type: CONST.GET_LIFETAG_CURRENT_SETTING_CLEAR,
  payload,
});

// LIFETAG CHANGE SETTING
export const setLifetagSectionSetting = (payload) => ({
  type: CONST.SET_LIFETAG_SECTION_SETTING,
  payload,
});
export const setLifetagSectionSettingSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_SECTION_SETTING_SUCCESS,
  payload,
});
export const setLifetagSectionSettingFailed = (payload) => ({
  type: CONST.SET_LIFETAG_SECTION_SETTING_FAILED,
  payload,
});
export const setLifetagSectionSettingClear = (payload) => ({
  type: CONST.SET_LIFETAG_SECTION_SETTING_CLEAR,
  payload,
});

// LIFETAG LIST ORDER
export const getLifetagListOrder = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_ORDER,
  payload,
});
export const getLifetagListOrderSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_ORDER_SUCCESS,
  payload,
});
export const getLifetagListOrderFailed = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_ORDER_FAILED,
  payload,
});
export const getLifetagListOrderClear = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_ORDER_CLEAR,
  payload,
});

// LIFETAG DETAIL ORDER
export const getLifetagDetailOrder = (payload) => ({
  type: CONST.GET_LIFETAG_DETAIL_ORDER,
  payload,
});
export const getLifetagDetailOrderSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_DETAIL_ORDER_SUCCESS,
  payload,
});
export const getLifetagDetailOrderFailed = (payload) => ({
  type: CONST.GET_LIFETAG_DETAIL_ORDER_FAILED,
  payload,
});
export const getLifetagDetailOrderClear = (payload) => ({
  type: CONST.GET_LIFETAG_DETAIL_ORDER_CLEAR,
  payload,
});

// LIFETAG FLAG
export const getLifetagFlag = (payload) => ({
  type: CONST.GET_LIFETAG_FLAG,
  payload,
});
export const getLifetagFlagSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_FLAG_SUCCESS,
  payload,
});
export const getLifetagFlagFailed = (payload) => ({
  type: CONST.GET_LIFETAG_FLAG_FAILED,
  payload,
});
export const getLifetagFlagClear = (payload) => ({
  type: CONST.GET_LIFETAG_FLAG_CLEAR,
  payload,
});

// PRODUCT LIFETAG
export const getLifetagLinkedList = (payload) => ({
  type: CONST.GET_LIFETAG_LINKED_LIST,
  payload,
});
export const getLifetagLinkedListSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_LINKED_LIST_SUCCESS,
  payload,
});
export const getLifetagLinkedListFailed = (payload) => ({
  type: CONST.GET_LIFETAG_LINKED_LIST_FAILED,
  payload,
});
export const getLifetagLinkedListClear = (payload) => ({
  type: CONST.GET_LIFETAG_LINKED_LIST_CLEAR,
  payload,
});

// LIFETAG UPDATE
export const setLifetagUpdate = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE,
  payload,
});
export const setLifetagUpdateSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_SUCCESS,
  payload,
});
export const setLifetagUpdateFailed = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_FAILED,
  payload,
});
export const setLifetagUpdateClear = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_CLEAR,
  payload,
});

// LIFETAG UNLINK
export const setLifetagUnlink = (payload) => ({
  type: CONST.SET_LIFETAG_UNLINK,
  payload,
});
export const setLifetagUnlinkSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_UNLINK_SUCCESS,
  payload,
});
export const setLifetagUnlinkFailed = (payload) => ({
  type: CONST.SET_LIFETAG_UNLINK_FAILED,
  payload,
});
export const setLifetagUnlinkClear = (payload) => ({
  type: CONST.SET_LIFETAG_UNLINK_CLEAR,
  payload,
});

// LIFETAG ORDER NO
export const setLifetagOrderNo = (payload) => ({
  type: CONST.SET_LIFETAG_ORDERNO,
  payload,
});
export const setLifetagOrderNoSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_ORDERNO_SUCCESS,
  payload,
});
export const setLifetagOrderNoFailed = (payload) => ({
  type: CONST.SET_LIFETAG_ORDERNO_FAILED,
  payload,
});
export const setLifetagOrderNoClear = (payload) => ({
  type: CONST.SET_LIFETAG_ORDERNO_CLEAR,
  payload,
});

// LIFETAG UPDATE ORDER
export const setLifetagUpdateOrder = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_ORDER,
  payload,
});
export const setLifetagUpdateOrderSuccess = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_ORDER_SUCCESS,
  payload,
});
export const setLifetagUpdateOrderFailed = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_ORDER_FAILED,
  payload,
});
export const setLifetagUpdateOrderClear = (payload) => ({
  type: CONST.SET_LIFETAG_UPDATE_ORDER_CLEAR,
  payload,
});

// LIFETAG OTHER INFO
export const getLifetagListOtherInfo = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_OTHER_INFO,
  payload,
});
export const getLifetagListOtherInfoSuccess = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_OTHER_INFO_SUCCESS,
  payload,
});
export const getLifetagListOtherInfoFailed = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_OTHER_INFO_FAILED,
  payload,
});
export const getLifetagListOtherInfoClear = (payload) => ({
  type: CONST.GET_LIFETAG_LIST_OTHER_INFO_CLEAR,
  payload,
});
