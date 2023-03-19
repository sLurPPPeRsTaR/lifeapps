import { takeLatest, put, call } from 'redux-saga/effects';
import { RESPONSE_STATUS } from 'ca-util/constant';
import * as CONST from 'ca-module-invitation/invitationConstant';
import {
  getCheckAlreadyInviteSuccess,
  getCheckAlreadyInviteFailed,
  getCheckAlreadySubscribeSuccess,
  getCheckAlreadySubscribeFailed,
  getAddLinkSuccess,
  getAddLinkFailed,
  getInvitationLinkSuccess,
  getInvitationLinkFailed,
  getInvitationListFriendSuccess,
  getInvitationListFriendFailed,
  getCheckStatusRegisterSuccess,
  getCheckStatusRegisterFailed,
  getPendingInvitesSuccess,
  getPendingInvitesFailed,
  getCheckInviteeSuccess,
  getCheckInviteeFailed,
  getCheckMaxInviteSuccess,
  getCheckMaxInviteFailed,
} from 'ca-module-invitation/invitationAction';
import {
  getCheckAlreadyInviteApi,
  getCheckAlreadySubscribeApi,
  getAddLinkApi,
  getInvitationLinkApi,
  getInvitationListFriendApi,
  getCheckStatusRegisterApi,
  getPendingInvitesApi,
  getCheckInviteeApi,
  getCheckMaxInviteApi,
} from 'ca-module-invitation/invitationApi';

function* getCheckAlreadyInvite(params) {
  try {
    const response = yield call(getCheckAlreadyInviteApi, params?.payload);
    yield put(getCheckAlreadyInviteSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckAlreadyInviteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckAlreadyInviteFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckAlreadyInviteFailed(error?.response?.data));
    }
  }
}

function* getCheckAlreadySubscribe(params) {
  try {
    const response = yield call(getCheckAlreadySubscribeApi, params?.payload);
    yield put(getCheckAlreadySubscribeSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckAlreadySubscribeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckAlreadySubscribeFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckAlreadySubscribeFailed(error?.response?.data));
    }
  }
}

function* getAddLink(params) {
  try {
    const response = yield call(getAddLinkApi, params?.payload);
    yield put(getAddLinkSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getAddLinkFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getAddLinkFailed(error?.response?.data));
        break;
      default:
        yield put(getAddLinkFailed(error?.response?.data));
    }
  }
}

function* getInvitationLink(params) {
  try {
    const response = yield call(getInvitationLinkApi, params?.payload);
    yield put(getInvitationLinkSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getInvitationLinkFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getInvitationLinkFailed(error?.response?.data));
        break;
      default:
        yield put(getInvitationLinkFailed(error?.response?.data));
    }
  }
}

function* getInvitationListFriend(params) {
  try {
    const response = yield call(getInvitationListFriendApi, params?.payload);
    yield put(getInvitationListFriendSuccess(response?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getInvitationListFriendFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getInvitationListFriendFailed(error?.response?.data));
        break;
      default:
        yield put(getInvitationListFriendFailed(error?.response?.data));
    }
  }
}

function* getCheckStatusRegister(params) {
  try {
    const newParams = { mobilePhoneNumber: params?.payload };
    const response = yield call(getCheckStatusRegisterApi, newParams);
    yield put(getCheckStatusRegisterSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckStatusRegisterFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckStatusRegisterFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckStatusRegisterFailed(error?.response?.data));
    }
  }
}

function* getPendingInvites(params) {
  try {
    const newParams = { mobilePhoneNumber: params?.payload };
    const response = yield call(getPendingInvitesApi, newParams);
    yield put(getPendingInvitesSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getPendingInvitesFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getPendingInvitesFailed(error?.response?.data));
        break;
      default:
        yield put(getPendingInvitesFailed(error?.response?.data));
    }
  }
}

function* getCheckInvitee(params) {
  try {
    const newParams = { phoneNo: params?.payload };
    const response = yield call(getCheckInviteeApi, newParams);
    yield put(getCheckInviteeSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckInviteeFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckInviteeFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckInviteeFailed(error?.response?.data));
    }
  }
}

function* getCheckMaxInvite() {
  try {
    const response = yield call(getCheckMaxInviteApi);
    yield put(getCheckMaxInviteSuccess(response?.data?.data));
  } catch (error) {
    switch (error?.response?.status) {
      case RESPONSE_STATUS.BAD_REQUEST:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
        break;
      case RESPONSE_STATUS.ERROR:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
        break;
      default:
        yield put(getCheckMaxInviteFailed(error?.response?.data));
    }
  }
}

export default [
  takeLatest(CONST.GET_CHECKALREADY_INVITE, getCheckAlreadyInvite),
  takeLatest(CONST.GET_CHECKALREADY_SUBSCRIBE, getCheckAlreadySubscribe),
  takeLatest(CONST.GET_ADDLINK, getAddLink),
  takeLatest(CONST.GET_INVITATION_LINK, getInvitationLink),
  takeLatest(CONST.GET_INVITATION_LIST_FRIEND, getInvitationListFriend),
  takeLatest(CONST.GET_CHECK_STATUS_REGISTER, getCheckStatusRegister),
  takeLatest(CONST.GET_PENDING_INVITES, getPendingInvites),
  takeLatest(CONST.GET_CHECK_INVITEE, getCheckInvitee),
  takeLatest(CONST.GET_CHECK_MAX_INVITE, getCheckMaxInvite),
];
