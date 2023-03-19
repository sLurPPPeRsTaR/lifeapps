import { connect } from 'react-redux';
import {
  getShareCount,
  getShareCountClear,
  getCheckAlreadyInvite,
  getCheckAlreadyInviteClear,
  getCheckAlreadySubscribe,
  getCheckAlreadySubscribeClear,
  getAddLink,
  getAddLinkClear,
  getInvitationLink,
  getInvitationLinkClear,
  getCheckStatusRegister,
  getCheckStatusRegisterClear,
  getCheckMaxInvite,
  getCheckMaxInviteClear,
  getInvitationListFriend,
  getInvitationListFriendClear,
} from 'ca-module-invitation/invitationAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,

  invitationAction: state.invitation.action,

  getShareCountStateResponse: state.invitation.getShareCountStateResponse,
  getShareCountStateFetch: state.invitation.getShareCountStateFetch,
  getShareCountStateError: state.invitation.getShareCountStateError,

  getCheckAlreadyInviteStateError:
    state.invitation.getCheckAlreadyInviteStateError,
  getCheckAlreadySubscribeStateError:
    state.invitation.getCheckAlreadySubscribeStateError,

  getAddLinkStateResponse: state.invitation.getAddLinkStateResponse,
  getAddLinkStateFetch: state.invitation.getAddLinkStateFetch,
  getAddLinkStateError: state.invitation.getAddLinkStateError,

  getInvitationLinkStateResponse:
    state.invitation.getInvitationLinkStateResponse,
  getInvitationLinkStateFetch: state.invitation.getInvitationLinkStateFetch,
  getInvitationLinkStateError: state.invitation.getInvitationLinkStateError,

  getCheckStatusRegisterStateResponse:
    state.invitation.getCheckStatusRegisterStateResponse,
  getCheckStatusRegisterStateFetch:
    state.invitation.getCheckStatusRegisterStateFetch,
  getCheckStatusRegisterStateError:
    state.invitation.getCheckStatusRegisterStateError,

  getCheckMaxInviteResponse: state.invitation.getCheckMaxInviteResponse,
  getCheckMaxInviteFetch: state.invitation.getCheckMaxInviteFetch,
  getCheckMaxInviteError: state.invitation.getCheckMaxInviteError,

  getInvitationListFriendStateResponse:
    state.invitation.getInvitationListFriendResponse,
  getInvitationListFriendStateFetch:
    state.invitation.getInvitationListFriendFetch,
  getInvitationListFriendStateError:
    state.invitation.getInvitationListFriendError,
  userData: state.auth.userData,

  appConfig: state.bootstrap.appConfig,
});

const mapDispatchToProps = {
  getShareCount: (payload) => getShareCount(payload),
  getShareCountClear: () => getShareCountClear(),
  setLoading: (payload) => setLoading(payload),
  getCheckAlreadyInvite: (payload) => getCheckAlreadyInvite(payload),
  getCheckAlreadyInviteClear: () => getCheckAlreadyInviteClear(),
  getCheckAlreadySubscribe: (payload) => getCheckAlreadySubscribe(payload),
  getCheckAlreadySubscribeClear: () => getCheckAlreadySubscribeClear(),
  getAddLink: (payload) => getAddLink(payload),
  getAddLinkClear: () => getAddLinkClear(),
  getInvitationLink: (payload) => getInvitationLink(payload),
  getInvitationLinkClear: () => getInvitationLinkClear(),
  getCheckStatusRegister: (payload) => getCheckStatusRegister(payload),
  getCheckStatusRegisterClear: () => getCheckStatusRegisterClear(),
  getCheckMaxInvite: () => getCheckMaxInvite(),
  getCheckMaxInviteClear: () => getCheckMaxInviteClear(),
  getInvitationListFriend: (payload) => getInvitationListFriend(payload),
  getInvitationListFriendClear: () => getInvitationListFriendClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
