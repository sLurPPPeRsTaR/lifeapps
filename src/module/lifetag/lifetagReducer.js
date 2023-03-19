import * as CONST from 'ca-module-lifetag/lifetagConstant';
import * as STATE from 'ca-module-lifetag/lifetagInitialState';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';
import _ from 'lodash';

const lifetagInitialState = {
  ...STATE.getLifetagProductDetailInitialState,
  ...STATE.getLifetagProfileInitialState,
  ...STATE.getLifetagProfilePublicInitialState,
  ...STATE.setLinkLifetagInitialState,
  ...STATE.setLifetagCreateOrderInitialState,
  ...STATE.getLifetagCurrentSettingInitialState,
  ...STATE.setLifetagSectionSettingInitialState,
  ...STATE.getLifetagListOrderInitialState,
  ...STATE.getLifetagDetailOrderInitialState,
  ...STATE.getLifetagFlagInitialState,
  ...STATE.getLifetagLinkedListInitialState,
  ...STATE.setLifetagUpdateInitialState,
  ...STATE.lifetagInitialState,
  ...STATE.setLifetagOrderNoInitialState,
  ...STATE.setLifetagUpdateOrderInitialState,
  ...STATE.getLifetagListOtherInfoInitialState,
  action: '',
};

export const lifetagReducer = (state = lifetagInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(lifetagInitialState),
    }),
    // LIFETAG INITIALSTATE
    [CONST.SET_LIFETAG_TEMP_STATE]: () => ({
      ...state,
      lifetagTempState: payload,
    }),
    [CONST.SET_LIFETAG_TEMP_STATE_CLEAR]: () => ({
      ...state,
      tempState: lifetagInitialState.lifetagTempState,
    }),

    // LIFETAG PRODUCT DETAIL
    [CONST.GET_LIFETAG_PRODUCT_DETAIL]: () => ({
      ...state,
      getLifetagProductDetailParam: payload,
      getLifetagProductDetailFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_SUCCESS]: () => ({
      ...state,
      getLifetagProductDetailResponse: payload,
      getLifetagProductDetailFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_FAILED]: () => ({
      ...state,
      getLifetagProductDetailFailed: payload,
      getLifetagProductDetailFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PRODUCT_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProductDetailInitialState,
      action: type,
    }),
    // LIFETAG PROFILE
    [CONST.GET_LIFETAG_PROFILE]: () => ({
      ...state,
      getLifetagProfileParam: payload,
      getLifetagProfileFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_SUCCESS]: () => ({
      ...state,
      getLifetagProfileResponse: payload,
      getLifetagProfileFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_FAILED]: () => ({
      ...state,
      getLifetagProfileFailed: payload,
      getLifetagProfileFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProfileInitialState,
      action: type,
    }),
    // LIFETAG PROFILE PUBLIC
    [CONST.GET_LIFETAG_PROFILE_PUBLIC]: () => ({
      ...state,
      getLifetagProfilePublicParam: payload,
      getLifetagProfilePublicFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_SUCCESS]: () => ({
      ...state,
      getLifetagProfilePublicResponse: payload,
      getLifetagProfilePublicFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_FAILED]: () => ({
      ...state,
      getLifetagProfilePublicFailed: payload,
      getLifetagProfilePublicFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_PROFILE_PUBLIC_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagProfilePublicInitialState,
      action: type,
    }),

    // LIFETAG LINK
    [CONST.SET_LINK_LIFETAG]: () => ({
      ...state,
      setLinkLifetagParam: payload,
      setLinkLifetagFetch: true,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_SUCCESS]: () => ({
      ...state,
      setLinkLifetagResponse: payload,
      setLinkLifetagFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_FAILED]: () => ({
      ...state,
      setLinkLifetagFailed: payload,
      setLinkLifetagFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_LIFETAG_CLEAR]: () => ({
      ...state,
      ...STATE.setLinkLifetagInitialState,
      action: type,
    }),

    // LIFETAG CREATE ORDER
    [CONST.SET_LIFETAG_CREATE_ORDER]: () => ({
      ...state,
      setLifetagCreateOrderParam: payload,
      setLifetagCreateOrderFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_SUCCESS]: () => ({
      ...state,
      setLifetagCreateOrderResponse: payload,
      setLifetagCreateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_FAILED]: () => ({
      ...state,
      setLifetagCreateOrderFailed: payload,
      setLifetagCreateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_CREATE_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagCreateOrderInitialState,
      action: type,
    }),

    // LIFETAG CURRENT SETTING
    [CONST.GET_LIFETAG_CURRENT_SETTING]: () => ({
      ...state,
      getLifetagCurrentSettingParam: payload,
      getLifetagCurrentSettingFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_SUCCESS]: () => ({
      ...state,
      getLifetagCurrentSettingResponse: payload,
      getLifetagCurrentSettingFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_FAILED]: () => ({
      ...state,
      getLifetagCurrentSettingFailed: payload,
      getLifetagCurrentSettingFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_CURRENT_SETTING_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagCurrentSettingInitialState,
      action: type,
    }),

    // LIFETAG SECTION SETTING
    [CONST.SET_LIFETAG_SECTION_SETTING]: () => ({
      ...state,
      setLifetagSectionSettingParam: payload,
      setLifetagSectionSettingFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_SUCCESS]: () => ({
      ...state,
      setLifetagSectionSettingResponse: payload,
      setLifetagSectionSettingFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_FAILED]: () => ({
      ...state,
      setLifetagSectionSettingFailed: payload,
      setLifetagSectionSettingFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_SECTION_SETTING_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagSectionSettingInitialState,
      action: type,
    }),

    // LIFETAG LIST ORDER
    [CONST.GET_LIFETAG_LIST_ORDER]: () => ({
      ...state,
      getLifetagListOrderParam: payload,
      getLifetagListOrderFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_SUCCESS]: () => ({
      ...state,
      getLifetagListOrderResponse: payload,
      getLifetagListOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_FAILED]: () => ({
      ...state,
      getLifetagListOrderFailed: payload,
      getLifetagListOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagListOrderInitialState,
      action: type,
    }),

    // LIFETAG DETAIL ORDER
    [CONST.GET_LIFETAG_DETAIL_ORDER]: () => ({
      ...state,
      getLifetagDetailOrderParam: payload,
      getLifetagDetailOrderFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_SUCCESS]: () => ({
      ...state,
      getLifetagDetailOrderResponse: payload,
      getLifetagDetailOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_FAILED]: () => ({
      ...state,
      getLifetagDetailOrderFailed: payload,
      getLifetagDetailOrderFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_DETAIL_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagDetailOrderInitialState,
      action: type,
    }),

    // LIFETAG FLAG
    [CONST.GET_LIFETAG_FLAG]: () => ({
      ...state,
      getLifetagFlagParam: payload,
      getLifetagFlagFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_SUCCESS]: () => ({
      ...state,
      getLifetagFlagResponse: payload,
      getLifetagFlagFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_FAILED]: () => ({
      ...state,
      getLifetagFlagFailed: payload,
      getLifetagFlagFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_FLAG_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagFlagInitialState,
    }),

    // LIFETAG UPDATE
    [CONST.SET_LIFETAG_UPDATE]: () => ({
      ...state,
      setLifetagUpdateParam: payload,
      setLifetagUpdateFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_SUCCESS]: () => ({
      ...state,
      setLifetagUpdateResponse: payload,
      setLifetagUpdateFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_FAILED]: () => ({
      ...state,
      setLifetagUpdateFailed: payload,
      setLifetagUpdateFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUpdateInitialState,
      action: type,
    }),

    // PRODUCT LIFETAG
    [CONST.GET_LIFETAG_LINKED_LIST]: () => ({
      ...state,
      getLifetagLinkedListParam: payload,
      getLifetagLinkedListFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_SUCCESS]: () => ({
      ...state,
      getLifetagLinkedListResponse: payload,
      getLifetagLinkedListFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_FAILED]: () => ({
      ...state,
      getLifetagLinkedListFailed: payload,
      getLifetagLinkedListFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LINKED_LIST_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagLinkedListInitialState,
      action: type,
    }),

    // LIFETAG UNLINK
    [CONST.SET_LIFETAG_UNLINK]: () => ({
      ...state,
      setLifetagUnlinkParam: payload,
      setLifetagUnlinkFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_SUCCESS]: () => ({
      ...state,
      setLifetagUnlinkResponse: payload,
      setLifetagUnlinkFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_FAILED]: () => ({
      ...state,
      setLifetagUnlinkFailed: payload,
      setLifetagUnlinkFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UNLINK_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUnlinkInitialState,
      action: type,
    }),

    // LIFETAG ORDER NO
    [CONST.SET_LIFETAG_ORDERNO]: () => ({
      ...state,
      setLifetagOrderNoParam: payload,
      setLifetagOrderNoFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_SUCCESS]: () => ({
      ...state,
      setLifetagOrderNoResponse: payload,
      setLifetagOrderNoFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_FAILED]: () => ({
      ...state,
      setLifetagOrderNoFailed: payload,
      setLifetagOrderNoFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_ORDERNO_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagOrderNoInitialState,
      action: type,
    }),

    // LIFETAG UPDATE ORDER
    [CONST.SET_LIFETAG_UPDATE_ORDER]: () => ({
      ...state,
      setLifetagUpdateOrderParam: payload,
      setLifetagUpdateOrderFetch: true,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_SUCCESS]: () => ({
      ...state,
      setLifetagUpdateOrderResponse: payload,
      setLifetagUpdateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_FAILED]: () => ({
      ...state,
      setLifetagUpdateOrderFailed: payload,
      setLifetagUpdateOrderFetch: false,
      action: type,
    }),
    [CONST.SET_LIFETAG_UPDATE_ORDER_CLEAR]: () => ({
      ...state,
      ...STATE.setLifetagUpdateOrderInitialState,
      action: type,
    }),

    // LIFETAG OTHER INFO
    [CONST.GET_LIFETAG_LIST_OTHER_INFO]: () => ({
      ...state,
      getLifetagListOtherInfoParam: payload,
      getLifetagListOtherInfoFetch: true,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_SUCCESS]: () => ({
      ...state,
      getLifetagListOtherInfoResponse: payload,
      getLifetagListOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_FAILED]: () => ({
      ...state,
      getLifetagListOtherInfoFailed: payload,
      getLifetagListOtherInfoFetch: false,
      action: type,
    }),
    [CONST.GET_LIFETAG_LIST_OTHER_INFO_CLEAR]: () => ({
      ...state,
      ...STATE.getLifetagListOtherInfoInitialState,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
