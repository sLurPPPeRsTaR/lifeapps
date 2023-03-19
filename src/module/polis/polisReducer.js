import _ from 'lodash';
import * as STATE from 'ca-module-polis/polisInitialState';
import * as CONST from 'ca-module-polis/polisConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';

const polisInitialState = {
  ...STATE.getPolicySummaryInitialState,
  ...STATE.getPolicySelfDataInitialState,
  ...STATE.getPolicyBenefitInitialState,
  ...STATE.getPolicyFundsInitialState,
  ...STATE.getPolicyClaimInitialState,
  ...STATE.getPolicyClaimDetailInitialState,
  ...STATE.getPolicyDownloadInitialState,
  action: '',
};

export const polisReducer = (state = polisInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(polisInitialState),
    }),
    // Summary
    [CONST.GET_POLICY_SUMMARY]: () => ({
      ...state,
      getPolicySummaryParam: payload,
      getPolicySummaryFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_SUCCESS]: () => ({
      ...state,
      getPolicySummaryResponse: payload,
      getPolicySummaryFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_FAILED]: () => ({
      ...state,
      getPolicySummaryFailed: payload,
      getPolicySummaryFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SUMMARY_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicySummaryInitialState,
      action: type,
    }),
    // Self Data
    [CONST.GET_POLICY_SELF_DATA]: () => ({
      ...state,
      getPolicySelfDataParam: payload,
      getPolicySelfDataFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_SUCCESS]: () => ({
      ...state,
      getPolicySelfDataResponse: payload,
      getPolicySelfDataFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_FAILED]: () => ({
      ...state,
      getPolicySelfDataFailed: payload,
      getPolicySelfDataFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_SELF_DATA_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicySelfDataInitialState,
      action: type,
    }),
    // Benefit
    [CONST.GET_POLICY_BENEFIT]: () => ({
      ...state,
      getPolicyBenefitParam: payload,
      getPolicyBenefitFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_SUCCESS]: () => ({
      ...state,
      getPolicyBenefitResponse: payload,
      getPolicyBenefitFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_FAILED]: () => ({
      ...state,
      getPolicyBenefitFailed: payload,
      getPolicyBenefitFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_BENEFIT_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyBenefitInitialState,
      action: type,
    }),
    // Funds
    [CONST.GET_POLICY_FUNDS]: () => ({
      ...state,
      getPolicyFundsParam: payload,
      getPolicyFundsFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_SUCCESS]: () => ({
      ...state,
      getPolicyFundsResponse: payload,
      getPolicyFundsFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_FAILED]: () => ({
      ...state,
      getPolicyFundsFailed: payload,
      getPolicyFundsFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FUNDS_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyFundsInitialState,
      action: type,
    }),
    // Claim
    [CONST.GET_POLICY_CLAIM]: () => ({
      ...state,
      getPolicyClaimParam: payload,
      getPolicyClaimFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_SUCCESS]: () => ({
      ...state,
      getPolicyClaimResponse: payload,
      getPolicyClaimFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_FAILED]: () => ({
      ...state,
      getPolicyClaimFailed: payload,
      getPolicyClaimFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyClaimInitialState,
      action: type,
    }),
    // Claim Detail
    [CONST.GET_POLICY_CLAIM_DETAIL]: () => ({
      ...state,
      getPolicyClaimDetailParam: payload,
      getPolicyClaimDetailFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_SUCCESS]: () => ({
      ...state,
      getPolicyClaimDetailResponse: payload,
      getPolicyClaimDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_FAILED]: () => ({
      ...state,
      getPolicyClaimDetailFailed: payload,
      getPolicyClaimDetailFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLAIM_DETAIL_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyClaimDetailInitialState,
      action: type,
    }),
    // Download
    [CONST.GET_POLICY_DOWNLOAD]: () => ({
      ...state,
      getPolicyDownloadParam: payload,
      getPolicyDownloadFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_SUCCESS]: () => ({
      ...state,
      getPolicyDownloadResponse: payload,
      getPolicyDownloadFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_FAILED]: () => ({
      ...state,
      getPolicyDownloadFailed: payload,
      getPolicyDownloadFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_DOWNLOAD_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyDownloadInitialState,
      action: type,
    }),
    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
