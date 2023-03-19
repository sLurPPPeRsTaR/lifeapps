import * as STATE from 'ca-module-invitation/invitationInitialState';
import * as CONST from 'ca-module-invitation/invitationConstant';
import { SET_CLEAR_AUTH } from 'ca-module-auth/authConstant';
import _ from 'lodash';

const invitationInitialState = {
  ...STATE.getCheckAlreadyInviteState,
  ...STATE.getCheckAlreadySubscribeState,
  ...STATE.getAddLinkState,
  ...STATE.getInvitationLinkState,
  ...STATE.getInvitationListFriendState,
  ...STATE.getCheckStatusRegisterState,
  ...STATE.getPendingInvitesState,
  ...STATE.getCheckInviteeState,
  ...STATE.getCheckMaxInviteState,
  action: '',
};

export const invitationReducer = (state = invitationInitialState, action) => {
  const { payload, type } = action;
  const actions = {
    [SET_CLEAR_AUTH]: () => ({
      ...state,
      ..._.cloneDeep(invitationInitialState),
    }),
    // check already invited count
    [CONST.GET_CHECKALREADY_INVITE]: () => ({
      ...state,
      getCheckAlreadyInviteStateParam: payload,
      getCheckAlreadyInviteStateFetch: true,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_INVITE_SUCCESS]: () => ({
      ...state,
      getCheckAlreadyInviteStateResponse: payload,
      getCheckAlreadyInviteStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_INVITE_FAILED]: () => ({
      ...state,
      getCheckAlreadyInviteStateError: payload,
      getCheckAlreadyInviteStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_INVITE_CLEAR]: () => ({
      ...state,
      getCheckAlreadyInviteStateResponse:
        invitationInitialState.getCheckAlreadyInviteStateResponse,
      getCheckAlreadyInviteStateError:
        invitationInitialState.getCheckAlreadyInviteStateEror,
      action: type,
    }),

    // check already subscribed count
    [CONST.GET_CHECKALREADY_SUBSCRIBE]: () => ({
      ...state,
      getCheckAlreadySubscribeStateParam: payload,
      getCheckAlreadySubscribeStateFetch: true,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_SUBSCRIBE_SUCCESS]: () => ({
      ...state,
      getCheckAlreadySubscribeStateResponse: payload,
      getCheckAlreadySubscribeStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_SUBSCRIBE_FAILED]: () => ({
      ...state,
      getCheckAlreadySubscribeStateError: payload,
      getCheckAlreadySubscribeStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECKALREADY_SUBSCRIBE_CLEAR]: () => ({
      ...state,
      getCheckAlreadySubscribeStateResponse:
        invitationInitialState.getCheckAlreadySubscribeStateResponse,
      getCheckAlreadySubscribeStateError:
        invitationInitialState.getCheckAlreadySubscribeStateEror,
      action: type,
    }),

    // add link
    [CONST.GET_ADDLINK]: () => ({
      ...state,
      getAddLinkStateParam: payload,
      getAddLinkStateFetch: true,
      action: type,
    }),
    [CONST.GET_ADDLINK_SUCCESS]: () => ({
      ...state,
      getAddLinkStateResponse: payload,
      getAddLinkStateFetch: false,
      action: type,
    }),
    [CONST.GET_ADDLINK_FAILED]: () => ({
      ...state,
      getAddLinkStateError: payload,
      getAddLinkStateFetch: false,
      action: type,
    }),
    [CONST.GET_ADDLINK_CLEAR]: () => ({
      ...state,
      getAddLinkStateResponse: invitationInitialState.getAddLinkStateResponse,
      getAddLinkStateError: invitationInitialState.getAddLinkStateError,
      action: type,
    }),

    // get invitation link
    [CONST.GET_INVITATION_LINK]: () => ({
      ...state,
      getInvitationLinkStateParam: payload,
      getInvitationLinkStateFetch: true,
      action: type,
    }),
    [CONST.GET_INVITATION_LINK_SUCCESS]: () => ({
      ...state,
      getInvitationLinkStateResponse: payload,
      getInvitationLinkStateFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LINK_FAILED]: () => ({
      ...state,
      getInvitationLinkStateError: payload,
      getInvitationLinkStateFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LINK_CLEAR]: () => ({
      ...state,
      getInvitationLinkStateResponse:
        invitationInitialState.getInvitationLinkStateResponse,
      getInvitationLinkStateError:
        invitationInitialState.getInvitationLinkStateError,
      action: type,
    }),

    // get invitation list friend
    [CONST.GET_INVITATION_LIST_FRIEND]: () => ({
      ...state,
      getInvitationListFriendParam: payload,
      getInvitationListFriendFetch: true,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_SUCCESS]: () => ({
      ...state,
      getInvitationListFriendResponse: payload,
      getInvitationListFriendFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_FAILED]: () => ({
      ...state,
      getInvitationListFriendError: payload,
      getInvitationListFriendFetch: false,
      action: type,
    }),
    [CONST.GET_INVITATION_LIST_FRIEND_CLEAR]: () => ({
      ...state,
      getInvitationListFriendResponse:
        invitationInitialState.getInvitationListFriendResponse,
      getInvitationListFriendError:
        invitationInitialState.getInvitationListFriendError,
      action: type,
    }),

    // get check status register api
    [CONST.GET_CHECK_STATUS_REGISTER]: () => ({
      ...state,
      getCheckStatusRegisterStateParam: payload,
      getCheckStatusRegisterStateFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_STATUS_REGISTER_SUCCESS]: () => ({
      ...state,
      getCheckStatusRegisterStateResponse: payload,
      getCheckStatusRegisterStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_STATUS_REGISTER_FAILED]: () => ({
      ...state,
      getCheckStatusRegisterStateError: payload,
      getCheckStatusRegisterStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_STATUS_REGISTER_CLEAR]: () => ({
      ...state,
      getCheckStatusRegisterStateResponse:
        invitationInitialState.getCheckStatusRegisterStateResponse,
      getCheckStatusRegisterStateError:
        invitationInitialState.getCheckStatusRegisterStateError,
      action: type,
    }),

    // get pending invites
    [CONST.GET_PENDING_INVITES]: () => ({
      ...state,
      getPendingInvitesStateParam: payload,
      getPendingInvitesStateFetch: true,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_SUCCESS]: () => ({
      ...state,
      getPendingInvitesStateResponse: payload,
      getPendingInvitesStateFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_FAILED]: () => ({
      ...state,
      getPendingInvitesStateError: payload,
      getPendingInvitesStateFetch: false,
      action: type,
    }),
    [CONST.GET_PENDING_INVITES_CLEAR]: () => ({
      ...state,
      getPendingInvitesStateResponse:
        invitationInitialState.getPendingInvitesStateResponse,
      getPendingInvitesStateError:
        invitationInitialState.getPendingInvitesStateError,
      action: type,
    }),

    // get check invitee
    [CONST.GET_CHECK_INVITEE]: () => ({
      ...state,
      getCheckInviteeStateParam: payload,
      getCheckInviteeStateFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_INVITEE_SUCCESS]: () => ({
      ...state,
      getCheckInviteeStateResponse: payload,
      getCheckInviteeStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_INVITEE_FAILED]: () => ({
      ...state,
      getCheckInviteeStateError: payload,
      getCheckInviteeStateFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_INVITEE_CLEAR]: () => ({
      ...state,
      getCheckInviteeStateResponse:
        invitationInitialState.getCheckInviteeStateResponse,
      getCheckInviteeStateError:
        invitationInitialState.getCheckInviteeStateError,
      action: type,
    }),

    // get check maximum invite
    [CONST.GET_CHECK_MAX_INVITE]: () => ({
      ...state,
      getCheckMaxInviteParam: payload,
      getCheckMaxInviteFetch: true,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_SUCCESS]: () => ({
      ...state,
      getCheckMaxInviteResponse: payload,
      getCheckMaxInviteFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_FAILED]: () => ({
      ...state,
      getCheckMaxInviteError: payload,
      getCheckMaxInviteFetch: false,
      action: type,
    }),
    [CONST.GET_CHECK_MAX_INVITE_CLEAR]: () => ({
      ...state,
      getCheckMaxInviteResponse:
        invitationInitialState.getCheckMaxInviteResponse,
      getCheckMaxInviteError: invitationInitialState.getCheckMaxInviteError,
      action: type,
    }),

    DEFAULT: () => state,
  };
  return (actions[type] || actions.DEFAULT)();
};
