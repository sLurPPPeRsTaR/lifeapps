import * as STATE from 'ca-module-lifesaver/lifesaverInitialState';
import * as CONST from 'ca-module-lifesaver/lifesaverConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';
import _ from 'lodash';

const lifesaverInitialState = {
  ...STATE.getProductInitialState,
  ...STATE.getProductsInitialState,
  ...STATE.getListRsInitialState,
  ...STATE.getPersonalRiplayInitialState,
  ...STATE.setSubmissionInitialState,
  ...STATE.getCurrentSubsInitialState,
  ...STATE.getCampaignInitialState,
  ...STATE.getPolicyDetailState,
  ...STATE.setWaitingInitialState,
  ...STATE.getEligibleSubmissionInitialState,
  ...STATE.getIsUserEligibleState,
  ...STATE.setPersonEligibleState,
  ...STATE.getEligiblePosInitialState,
  ...STATE.getTotalClaimInitialState,
  isAgreementVisible: false,
  inviteeUserId: '',
  planCode: '',
  action: '',
};

export const lifesaverReducer = (state = lifesaverInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(lifesaverInitialState),
    }),
    [CONST.GET_PRODUCT]: () => ({
      ...state,
      getProductParam: payload,
      getProductFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCT_SUCCESS]: () => ({
      ...state,
      getProductResponse: payload,
      getProductFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_FAILED]: () => ({
      ...state,
      getProductError: payload,
      getProductFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCT_CLEAR]: () => ({
      ...state,
      getProductResponse: lifesaverInitialState.getProductResponse,
      getProductError: lifesaverInitialState.getProductError,
      action: type,
    }),

    [CONST.GET_PRODUCTS]: () => ({
      ...state,
      getProductsParam: payload,
      getProductsFetch: true,
      action: type,
    }),
    [CONST.GET_PRODUCTS_SUCCESS]: () => ({
      ...state,
      getProductsResponse: payload,
      getProductsFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCTS_FAILED]: () => ({
      ...state,
      getProductsError: payload,
      getProductsFetch: false,
      action: type,
    }),
    [CONST.GET_PRODUCTS_CLEAR]: () => ({
      ...state,
      getProductsResponse: lifesaverInitialState.getProductsResponse,
      getProductsError: lifesaverInitialState.getProductsError,
      action: type,
    }),

    [CONST.GET_LIST_RS]: () => ({
      ...state,
      getListRsParam: payload,
      getListRsFetch: true,
      action: type,
    }),
    [CONST.GET_LIST_RS_SUCCESS]: () => ({
      ...state,
      getListRsResponse: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_FAILED]: () => ({
      ...state,
      getListRsError: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_CLEAR]: () => ({
      ...state,
      getListRsResponse: lifesaverInitialState.getListRsResponse,
      getListRsError: lifesaverInitialState.getListRsError,
      action: type,
    }),

    [CONST.GET_PERSONAL_RIPLAY]: () => ({
      ...state,
      getPersonalRiplayParam: payload,
      getPersonalRiplayFetch: true,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_SUCCESS]: () => ({
      ...state,
      getPersonalRiplayResponse: payload,
      getPersonalRiplayFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_FAILED]: () => ({
      ...state,
      getPersonalRiplayError: payload,
      getPersonalRiplayFetch: false,
      action: type,
    }),
    [CONST.GET_PERSONAL_RIPLAY_CLEAR]: () => ({
      ...state,
      getPersonalRiplayResponse:
        lifesaverInitialState.getPersonalRiplayResponse,
      getPersonalRiplayError: lifesaverInitialState.getPersonalRiplayError,
      action: type,
    }),

    [CONST.SET_SUBMISSION]: () => ({
      ...state,
      setSubmissionParam: payload,
      setSubmissionFetch: true,
      action: type,
    }),
    [CONST.SET_SUBMISSION_SUCCESS]: () => ({
      ...state,
      setSubmissionResponse: payload,
      setSubmissionFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_FAILED]: () => ({
      ...state,
      setSubmissionError: payload,
      setSubmissionFetch: false,
      action: type,
    }),
    [CONST.SET_SUBMISSION_CLEAR]: () => ({
      ...state,
      setSubmissionResponse: lifesaverInitialState.setSubmissionResponse,
      setSubmissionError: lifesaverInitialState.setSubmissionError,
      action: type,
    }),

    [CONST.GET_CURRENT_SUBS]: () => ({
      ...state,
      getCurrentSubsParam: payload,
      getCurrentSubsFetch: true,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_SUCCESS]: () => ({
      ...state,
      getCurrentSubsResponse: payload,
      getCurrentSubsFetch: false,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_FAILED]: () => ({
      ...state,
      getCurrentSubsError: payload,
      getCurrentSubsFetch: false,
      action: type,
    }),
    [CONST.GET_CURRENT_SUBS_CLEAR]: () => ({
      ...state,
      getCurrentSubsResponse: lifesaverInitialState.getCurrentSubsResponse,
      getCurrentSubsError: lifesaverInitialState.getCurrentSubsError,
      action: type,
    }),

    [CONST.GET_CAMPAIGN]: () => ({
      ...state,
      getCampaignParam: payload,
      getCampaignFetch: true,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_SUCCESS]: () => ({
      ...state,
      getCampaignResponse: payload,
      getCampaignFetch: false,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_FAILED]: () => ({
      ...state,
      getCampaignError: payload,
      getCampaignFetch: false,
      action: type,
    }),
    [CONST.GET_CAMPAIGN_CLEAR]: () => ({
      ...state,
      getCampaignResponse: lifesaverInitialState.getCampaignResponse,
      getCampaignError: lifesaverInitialState.getCampaignError,
      action: type,
    }),

    [CONST.GET_POLICY_DETAIL]: () => ({
      ...state,
      getPolicyDetailParam: payload,
      getPolicyDetailFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_DETAIL_SUCCESS]: () => ({
      ...state,
      getPolicyDetailResponse: payload,
      getPolicyDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DETAIL_FAILED]: () => ({
      ...state,
      getPolicyDetailError: payload,
      getPolicyDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DETAIL_CLEAR]: () => ({
      ...state,
      getPolicyDetailResponse: lifesaverInitialState.getPolicyDetailResponse,
      getPolicyDetailError: lifesaverInitialState.getPolicyDetailError,
      action: type,
    }),

    [CONST.GET_ELIGIBLE_SUBMISSION]: () => ({
      ...state,
      getEligibleSubmissionParam: payload,
      getEligibleSubmissionFetch: true,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_SUCCESS]: () => ({
      ...state,
      getEligibleSubmissionResponse: payload,
      getEligibleSubmissionFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_FAILED]: () => ({
      ...state,
      getEligibleSubmissionError: payload,
      getEligibleSubmissionFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_SUBMISSION_CLEAR]: () => ({
      ...state,
      getEligibleSubmissionResponse:
        lifesaverInitialState.getEligibleSubmissionResponse,
      getEligibleSubmissionError:
        lifesaverInitialState.getEligibleSubmissionError,
    }),

    [CONST.GET_IS_USER_ELIGIBLE]: () => ({
      ...state,
      getIsUserEligibleParam: payload,
      getIsUserEligibleFetch: true,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_SUCCESS]: () => ({
      ...state,
      getIsUserEligibleResponse: payload,
      getIsUserEligibleFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_FAILED]: () => ({
      ...state,
      getIsUserEligibleError: payload,
      getIsUserEligibleFetch: false,
      action: type,
    }),
    [CONST.GET_IS_USER_ELIGIBLE_CLEAR]: () => ({
      ...state,
      getIsUserEligibleResponse:
        lifesaverInitialState.getIsUserEligibleResponse,
      getIsUserEligibleError: lifesaverInitialState.getIsUserEligibleError,
      action: type,
    }),

    [CONST.SET_IS_AGREEMENT_VISIBLE]: () => ({
      ...state,
      isAgreementVisible: payload,
    }),
    [CONST.SET_INVITEE_USER_ID]: () => ({
      ...state,
      inviteeUserId: payload,
    }),
    [CONST.SET_PLAN_CODE]: () => ({
      ...state,
      planCode: payload,
    }),

    [CONST.SET_WAITING]: () => ({
      ...state,
      setWaitingParam: payload,
      setWaitingFetch: true,
      action: type,
    }),
    [CONST.SET_WAITING_SUCCESS]: () => ({
      ...state,
      setWaitingResponse: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_FAILED]: () => ({
      ...state,
      setWaitingError: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_CLEAR]: () => ({
      ...state,
      setWaitingResponse: lifesaverInitialState.setWaitingResponse,
      setWaitingError: lifesaverInitialState.setWaitingError,
      action: type,
    }),

    [CONST.SET_WAITING]: () => ({
      ...state,
      setWaitingParam: payload,
      setWaitingFetch: true,
      action: type,
    }),
    [CONST.SET_WAITING_SUCCESS]: () => ({
      ...state,
      setWaitingResponse: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_FAILED]: () => ({
      ...state,
      setWaitingError: payload,
      setWaitingFetch: false,
      action: type,
    }),
    [CONST.SET_WAITING_CLEAR]: () => ({
      ...state,
      setWaitingResponse: lifesaverInitialState.setWaitingResponse,
      setWaitingError: lifesaverInitialState.setWaitingError,
      action: type,
    }),

    [CONST.SET_PERSON_ELIGIBLE]: () => ({
      ...state,
      setPersonEligibleParam: payload,
      setPersonEligibleFetch: true,
      action: type,
    }),
    [CONST.SET_PERSON_ELIGIBLE_SUCCESS]: () => ({
      ...state,
      setPersonEligibleResponse: payload,
      setPersonEligibleFetch: false,
      action: type,
    }),
    [CONST.SET_PERSON_ELIGIBLE_FAILED]: () => ({
      ...state,
      setPersonEligibleError: payload,
      setPersonEligibleFetch: false,
      action: type,
    }),
    [CONST.SET_PERSON_ELIGIBLE_CLEAR]: () => ({
      ...state,
      ...STATE.setPersonEligibleState,
      action: type,
    }),

    [CONST.GET_ELIGIBLE_POS]: () => ({
      ...state,
      getEligiblePosParam: payload,
      getEligiblePosFetch: true,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_SUCCESS]: () => ({
      ...state,
      getEligiblePosResponse: payload,
      getEligiblePosFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_FAILED]: () => ({
      ...state,
      getEligiblePosError: payload,
      getEligiblePosFetch: false,
      action: type,
    }),
    [CONST.GET_ELIGIBLE_POS_CLEAR]: () => ({
      ...state,
      ...STATE.getEligiblePosInitialState,
      action: type,
    }),

    [CONST.GET_TOTAL_CLAIM]: () => ({
      ...state,
      getTotalClaimParam: payload,
      getTotalClaimFetch: true,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_SUCCESS]: () => ({
      ...state,
      getTotalClaimResponse: payload,
      getTotalClaimFetch: false,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_FAILED]: () => ({
      ...state,
      getTotalClaimError: payload,
      getTotalClaimFetch: false,
      action: type,
    }),
    [CONST.GET_TOTAL_CLAIM_CLEAR]: () => ({
      ...state,
      getTotalClaimResponse: lifesaverInitialState.getProductResponse,
      getTotalClaimError: lifesaverInitialState.getProductError,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
