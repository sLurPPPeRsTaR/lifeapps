import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getCheckAlreadyInviteApi = (payload) => {
  return api.post(API.INVITATION.getCheckAlreadyInvite, payload);
};

export const getCheckAlreadySubscribeApi = (payload) => {
  return api.post(API.INVITATION.getCheckAlreadySubscribe, payload);
};

export const getAddLinkApi = (payload) => {
  return api.post(API.INVITATION.getAddLink, payload);
};

export const getInvitationLinkApi = (payload) => {
  return api.post(API.INVITATION.getInvitationLink, payload);
};

export const getInvitationListFriendApi = (payload) => {
  return api.post(API.INVITATION.getInvitationListFriend, payload);
};

export const getCheckStatusRegisterApi = (payload) => {
  return api.post(API.INVITATION.getCheckStatusRegister, payload);
};

export const getPendingInvitesApi = (payload) => {
  return api.post(API.INVITATION.getPendingInvites, payload);
};

export const getCheckInviteeApi = (payload) => {
  return api.get(API.INVITATION.getCheckInvitee, payload);
};

export const getCheckMaxInviteApi = () => {
  return api.post(API.INVITATION.getCheckMaxInvite);
};
