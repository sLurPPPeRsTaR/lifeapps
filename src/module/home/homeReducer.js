import _ from 'lodash';
import * as STATE from 'ca-module-home/homeInitialState';
import * as CONST from 'ca-module-home/homeConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';

const homeInitialState = {
  ...STATE.getPolicyInitialState,
  ...STATE.getPoliciesInitialState,
  ...STATE.setLinkPolicyInitialState,
  ...STATE.getCheckPolisInitialState,
  ...STATE.getNotifCountInitialState,
  ...STATE.getWidgetManfaatInitialState,
  ...STATE.getPolicyWidgetHomeInitialState,
  ...STATE.setCallTimeInitialState,
  ...STATE.setTemporaryHomeStateInitialState,
  ...STATE.getPolicyProposalInitialState,
  ...STATE.setTemporaryHomeStateInitialState,
  ...STATE.getPolicyWidgetHomePublicInitialState,
  action: '',
};

export const homeReducer = (state = homeInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(homeInitialState),
    }),
    [CONST.GET_POLICY]: () => ({
      ...state,
      setResendPolicyOtp: payload.setResendPolicyOtp,
      getPolicyParam: { ...payload, setResendPolicyOtp: undefined },
      getPolicyFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_SUCCESS]: () => ({
      ...state,
      getPolicyResponse: payload,
      getPolicyFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_FAILED]: () => ({
      ...state,
      getPolicyError: payload,
      getPolicyFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_CLEAR]: () => ({
      ...state,
      setResendPolicyOtp: homeInitialState.setResendPolicyOtp,
      getPolicyResponse: homeInitialState.getPolicyResponse,
      getPolicyError: homeInitialState.getPolicyError,
      action: type,
    }),

    [CONST.SET_LINK_POLICY]: () => ({
      ...state,
      setLinkPolicyParam: payload,
      setLinkPolicyFetch: true,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_SUCCESS]: () => ({
      ...state,
      setLinkPolicyResponse: payload,
      setLinkPolicyFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_FAILED]: () => ({
      ...state,
      setLinkPolicyError: payload,
      setLinkPolicyFetch: false,
      action: type,
    }),
    [CONST.SET_LINK_POLICY_CLEAR]: () => ({
      ...state,
      setLinkPolicyParam: homeInitialState.setLinkPolicyParam,
      setLinkPolicyResponse: homeInitialState.setLinkPolicyResponse,
      setLinkPolicyError: homeInitialState.setLinkPolicyError,
      action: type,
    }),

    [CONST.GET_POLICIES]: () => ({
      ...state,
      getPoliciesParam: payload,
      getPoliciesFetch: true,
      action: type,
    }),
    [CONST.GET_POLICIES_SUCCESS]: () => ({
      ...state,
      getPoliciesResponse: payload,
      getPoliciesFetch: false,
      action: type,
    }),
    [CONST.GET_POLICIES_FAILED]: () => ({
      ...state,
      getPoliciesError: payload,
      getPoliciesFetch: false,
      action: type,
    }),
    [CONST.GET_POLICIES_CLEAR]: () => ({
      ...state,
      getPoliciesParam: homeInitialState.getPoliciesParam,
      getPoliciesResponse: homeInitialState.getPoliciesResponse,
      getPoliciesError: homeInitialState.getPoliciesError,
      action: type,
    }),

    [CONST.GET_CHECK_POLIS]: () => ({
      ...state,
      setResendPolicyOtp: payload.setResendPolicyOtp,
      getCheckPolisParam: { ...payload, setResendPolicyOtp: undefined },
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_SUCCESS]: () => ({
      ...state,
      getCheckPolisResponse: payload,
      getCheckPolisFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_FAILED]: () => ({
      ...state,
      getCheckPolisError: payload,
      getCheckPolisFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_POLIS_CLEAR]: () => ({
      ...state,
      setResendPolicyOtp: homeInitialState.setResendPolicyOtp,
      getCheckPolisResponse: homeInitialState.getCheckPolisResponse,
      getCheckPolisError: homeInitialState.getCheckPolisError,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT]: () => ({
      ...state,
      getNotifCountParam: { ...payload },
      getNotifCountFetch: true,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_SUCCESS]: () => ({
      ...state,
      getNotifCountResponse: payload,
      getNotifCountFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_FAILED]: () => ({
      ...state,
      getNotifCountError: payload,
      getNotifCountFetch: false,
      action: type,
    }),
    [CONST.GET_NOTIF_COUNT_CLEAR]: () => ({
      ...state,
      getNotifCountResponse: homeInitialState.getNotifCountResponse,
      getNotifCountError: homeInitialState.getNotifCountError,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT]: () => ({
      ...state,
      getWidgetManfaatParam: { ...payload },
      getWidgetManfaatFetch: true,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_SUCCESS]: () => ({
      ...state,
      getWidgetManfaatResponse: payload,
      getWidgetManfaatFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_FAILED]: () => ({
      ...state,
      getWidgetManfaatError: payload,
      getWidgetManfaatFetch: false,
      action: type,
    }),
    [CONST.GET_WIDGET_MANFAAT_CLEAR]: () => ({
      ...state,
      getWidgetManfaatResponse: homeInitialState.getWidgetManfaatResponse,
      getWidgetManfaatError: homeInitialState.getWidgetManfaatError,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME]: () => ({
      ...state,
      getPolicyWidgetHomeParam: payload,
      getPolicyWidgetHomeFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_SUCCESS]: () => ({
      ...state,
      getPolicyWidgetHomeResponse: payload,
      getPolicyWidgetHomeFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_FAILED]: () => ({
      ...state,
      getPolicyWidgetHomeError: payload,
      getPolicyWidgetHomeFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyWidgetHomeInitialState,
      action: type,
    }),

    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC]: () => ({
      ...state,
      getPolicyWidgetHomePublicParam: payload,
      getPolicyWidgetHomePublicFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_SUCCESS]: () => ({
      ...state,
      getPolicyWidgetHomePublicResponse: payload,
      getPolicyWidgetHomePublicFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_FAILED]: () => ({
      ...state,
      getPolicyWidgetHomePublicError: payload,
      getPolicyWidgetHomePublicFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_WIDGET_HOME_PUBLIC_CLEAR]: () => ({
      ...state,
      ...STATE.getPolicyWidgetHomePublicInitialState,
      action: type,
    }),

    [CONST.SET_CALL_TIME]: () => ({
      ...state,
      setCallTimeParam: payload,
      setCallTimeFetch: true,
      action: type,
    }),
    [CONST.SET_CALL_TIME_SUCCESS]: () => ({
      ...state,
      setCallTimeResponse: payload,
      setCallTimeFetch: false,
      action: type,
    }),
    [CONST.SET_CALL_TIME_FAILED]: () => ({
      ...state,
      setCallTimeError: payload,
      setCallTimeFetch: false,
      action: type,
    }),
    [CONST.SET_TEMPORARY_HOME_STATE]: () => ({
      ...state,
      ...payload,
      action: type,
    }),

    [CONST.GET_LIST_RS_HOME]: () => ({
      ...state,
      getListRsParam: payload,
      getListRsFetch: true,
      action: type,
    }),
    [CONST.GET_LIST_RS_HOME_SUCCESS]: () => ({
      ...state,
      getListRsResponse: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_HOME_FAILED]: () => ({
      ...state,
      getListRsError: payload,
      getListRsFetch: false,
      action: type,
    }),
    [CONST.GET_LIST_RS_HOME_CLEAR]: () => ({
      ...state,
      getListRsResponse: homeInitialState.getListRsResponse,
      getListRsError: homeInitialState.getListRsError,
      action: type,
    }),

    [CONST.GET_POLICY_PROPOSAL]: () => ({
      ...state,
      getPolicyProposalParam: payload,
      getPolicyProposalFetch: true,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_SUCCESS]: () => ({
      ...state,
      getPolicyProposalResponse: payload,
      getPolicyProposalFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_FAILED]: () => ({
      ...state,
      getPolicyProposalError: payload,
      getPolicyProposalFetch: false,
      action: type,
    }),
    [CONST.GET_POLICY_PROPOSAL_CLEAR]: () => ({
      ...state,
      getPolicyProposalResponse: homeInitialState.getPolicyProposalResponse,
      getPolicyProposalError: homeInitialState.getPolicyProposalError,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
