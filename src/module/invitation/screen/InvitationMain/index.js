import { connect } from 'react-redux';
import {
  getInvitationListFriend,
  getInvitationListFriendClear,
  getCheckMaxInvite,
  getCheckMaxInviteClear,
  getCheckStatusRegister,
  getCheckStatusRegisterClear,
  getAddLink,
  getAddLinkClear,
} from 'ca-module-invitation/invitationAction';
import { setLoading } from 'ca-bootstrap/bootstrapAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  invitationAction: state.invitation.action,
  getInvitationListFriendStateResponse:
    state.invitation.getInvitationListFriendResponse,
  getInvitationListFriendStateFetch:
    state.invitation.getInvitationListFriendFetch,
  getInvitationListFriendStateError:
    state.invitation.getInvitationListFriendError,

  getCheckMaxInviteResponse: state.invitation.getCheckMaxInviteResponse,
  getCheckMaxInviteFetch: state.invitation.getCheckMaxInviteFetch,
  getCheckMaxInviteError: state.invitation.getCheckMaxInviteError,
  appConfig: state.bootstrap.appConfig,
  userData: state.auth.userData,
  accessToken: state.auth.token.access_token,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getInvitationListFriend: (payload) => getInvitationListFriend(payload),
  getInvitationListFriendClear: () => getInvitationListFriendClear(),
  getCheckMaxInvite: () => getCheckMaxInvite(),
  getCheckMaxInviteClear: () => getCheckMaxInviteClear(),
  getCheckStatusRegister: (payload) => getCheckStatusRegister(payload),
  getCheckStatusRegisterClear: () => getCheckStatusRegisterClear(),
  getAddLink: (payload) => getAddLink(payload),
  getAddLinkClear: () => getAddLinkClear(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
