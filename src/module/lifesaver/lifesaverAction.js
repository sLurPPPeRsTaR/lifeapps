import * as CONST from 'ca-module-lifesaver/lifesaverConstant';

export const getProduct = (payload) => ({
  type: CONST.GET_PRODUCT,
  payload,
});
export const getProductSuccess = (payload) => ({
  type: CONST.GET_PRODUCT_SUCCESS,
  payload,
});
export const getProductFailed = (payload) => ({
  type: CONST.GET_PRODUCT_FAILED,
  payload,
});
export const getProductClear = (payload) => ({
  type: CONST.GET_PRODUCT_CLEAR,
  payload,
});

export const getProducts = (payload) => ({
  type: CONST.GET_PRODUCTS,
  payload,
});
export const getProductsSuccess = (payload) => ({
  type: CONST.GET_PRODUCTS_SUCCESS,
  payload,
});
export const getProductsFailed = (payload) => ({
  type: CONST.GET_PRODUCTS_FAILED,
  payload,
});
export const getProductsClear = (payload) => ({
  type: CONST.GET_PRODUCTS_CLEAR,
  payload,
});

export const getListRs = (payload) => ({
  type: CONST.GET_LIST_RS,
  payload,
});
export const getListRsSuccess = (payload) => ({
  type: CONST.GET_LIST_RS_SUCCESS,
  payload,
});
export const getListRsFailed = (payload) => ({
  type: CONST.GET_LIST_RS_FAILED,
  payload,
});
export const getListRsClear = (payload) => ({
  type: CONST.GET_LIST_RS_CLEAR,
  payload,
});

export const getPersonalRiplay = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY,
  payload,
});
export const getPersonalRiplaySuccess = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_SUCCESS,
  payload,
});
export const getPersonalRiplayFailed = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_FAILED,
  payload,
});
export const getPersonalRiplayClear = (payload) => ({
  type: CONST.GET_PERSONAL_RIPLAY_CLEAR,
  payload,
});

export const setSubmission = (payload) => ({
  type: CONST.SET_SUBMISSION,
  payload,
});
export const setSubmissionSuccess = (payload) => ({
  type: CONST.SET_SUBMISSION_SUCCESS,
  payload,
});
export const setSubmissionFailed = (payload) => ({
  type: CONST.SET_SUBMISSION_FAILED,
  payload,
});
export const setSubmissionClear = (payload) => ({
  type: CONST.SET_SUBMISSION_CLEAR,
  payload,
});

export const getCurrentSubs = (payload) => ({
  type: CONST.GET_CURRENT_SUBS,
  payload,
});
export const getCurrentSubsSuccess = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_SUCCESS,
  payload,
});
export const getCurrentSubsFailed = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_FAILED,
  payload,
});
export const getCurrentSubsClear = (payload) => ({
  type: CONST.GET_CURRENT_SUBS_CLEAR,
  payload,
});

export const getCampaign = (payload) => ({
  type: CONST.GET_CAMPAIGN,
  payload,
});
export const getCampaignSuccess = (payload) => ({
  type: CONST.GET_CAMPAIGN_SUCCESS,
  payload,
});
export const getCampaignFailed = (payload) => ({
  type: CONST.GET_CAMPAIGN_FAILED,
  payload,
});
export const getCampaignClear = (payload) => ({
  type: CONST.GET_CAMPAIGN_CLEAR,
  payload,
});

export const getPolicyDetail = (payload) => ({
  type: CONST.GET_POLICY_DETAIL,
  payload,
});
export const getPolicyDetailSuccess = (payload) => ({
  type: CONST.GET_POLICY_DETAIL_SUCCESS,
  payload,
});
export const getPolicyDetailFailed = (payload) => ({
  type: CONST.GET_POLICY_DETAIL_FAILED,
  payload,
});
export const getPolicyDetailClear = (payload) => ({
  type: CONST.GET_POLICY_DETAIL_CLEAR,
  payload,
});

export const getEligibleSubmission = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION,
  payload,
});
export const getEligibleSubmissionSuccess = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_SUCCESS,
  payload,
});
export const getEligibleSubmissionFailed = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_FAILED,
  payload,
});
export const getEligibleSubmissionClear = (payload) => ({
  type: CONST.GET_ELIGIBLE_SUBMISSION_CLEAR,
});

export const getIsUserEligible = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE,
  payload,
});
export const getIsUserEligibleSuccess = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_SUCCESS,
  payload,
});
export const getIsUserEligibleFailed = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_FAILED,
  payload,
});
export const getIsUserEligibleClear = (payload) => ({
  type: CONST.GET_IS_USER_ELIGIBLE_CLEAR,
  payload,
});

export const setInviteeUserId = (payload) => ({
  type: CONST.SET_INVITEE_USER_ID,
  payload,
});
export const setPlanCode = (payload) => ({
  type: CONST.SET_PLAN_CODE,
  payload,
});

export const setWaiting = (payload) => ({
  type: CONST.SET_WAITING,
  payload,
});
export const setWaitingSuccess = (payload) => ({
  type: CONST.SET_WAITING_SUCCESS,
  payload,
});
export const setWaitingFailed = (payload) => ({
  type: CONST.SET_WAITING_FAILED,
  payload,
});
export const setWaitingClear = (payload) => ({
  type: CONST.SET_WAITING_CLEAR,
  payload,
});

export const setPersonEligible = (payload) => ({
  type: CONST.SET_PERSON_ELIGIBLE,
  payload,
});
export const setPersonEligibleSuccess = (payload) => ({
  type: CONST.SET_PERSON_ELIGIBLE_SUCCESS,
  payload,
});
export const setPersonEligibleFailed = (payload) => ({
  type: CONST.SET_PERSON_ELIGIBLE_FAILED,
  payload,
});
export const setPersonEligibleClear = (payload) => ({
  type: CONST.SET_PERSON_ELIGIBLE_CLEAR,
  payload,
});

export const getEligiblePos = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS,
  payload,
});
export const getEligiblePosSuccess = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_SUCCESS,
  payload,
});
export const getEligiblePosFailed = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_FAILED,
  payload,
});
export const getEligiblePosClear = (payload) => ({
  type: CONST.GET_ELIGIBLE_POS_CLEAR,
  payload,
});

export const getTotalClaim = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM,
  payload,
});
export const getTotalClaimSuccess = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_SUCCESS,
  payload,
});
export const getTotalClaimFailed = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_FAILED,
  payload,
});
export const getTotalClaimClear = (payload) => ({
  type: CONST.GET_TOTAL_CLAIM_CLEAR,
  payload,
});
