import {
  setIsComingFromScreen,
  setLoading,
} from 'ca-bootstrap/bootstrapAction';
import {
  getPaymentMethod,
  getPaymentMethodClear,
  getPaymentStatusClear,
  setCreateBill,
  setCreateBillClear,
} from 'ca-module-payments/paymentsAction';
import {
  getProduct,
  getProductClear,
  setInviteeUserId,
  setPlanCode,
  setSubmission,
} from 'ca-module-lifesaver/lifesaverAction';
import { connect } from 'react-redux';
import { getPendingInvites } from 'ca-module-invitation/invitationAction';
import {
  getLifetagFlag,
  getLifetagProductDetail,
} from 'ca-module-lifetag/lifetagAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  deviceId: state.auth.userData.deviceId,
  getProductResponse: state.lifesaver.getProductResponse,
  getProductFetch: state.lifesaver.getProductFetch,
  getProductError: state.lifesaver.getProductError,
  getProductParam: state.lifesaver.getProductParam,
  lifesaverAction: state.lifesaver.action,
  paymentsAction: state.payments.action,
  getListRsResponse: state.lifesaver.getListRsResponse,
  getListRsError: state.lifesaver.getListRsResponse,
  getPersonalRiplayResponse: state.lifesaver.getPersonalRiplayResponse,
  getPaymentMethodResponse: state.payments.getPaymentMethodResponse,
  getPaymentStatusResponse: state.payments.getPaymentStatusResponse,
  userData: state.auth.userData,
  setSubmissionResponse: state.lifesaver.setSubmissionResponse,
  setSubmissionError: state.lifesaver.setSubmissionError,
  setCreateBillError: state.payments.setCreateBillError,
  name: state.auth.userData.name,
  phoneNumber: state.auth.userData.mobilePhoneNumber,
  token: state.auth.token.access_token,
  getPendingInvitesResponse: state.invitation.getPendingInvitesStateResponse,
  inviteeUserId: state.lifesaver.inviteeUserId,
  getEligibleSubmissionResponse: state.lifesaver.getEligibleSubmissionResponse,
  getLifetagProductDetailResponse:
    state.lifetag.getLifetagProductDetailResponse,
  getPendingInvitesFetch: state.invitation.getPendingInvitesStateFetch,
  setSubmissionFetch: state.lifesaver.setSubmissionFetch,
  getPaymentMethodFetch: state.payments.getPaymentMethodFetch,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  lifetagAction: state.lifetag.action,
  getLifetagProductDetailFailed: state.lifetag.getLifetagProductDetailFailed,
  getLifetagProductDetailFetch: state.lifetag.getLifetagProductDetailFetch,
});

const mapDispatchToProps = {
  getProduct: (payload) => getProduct(payload),
  setLoading: (payload) => setLoading(payload),
  getProductClear: () => getProductClear(),
  getPaymentMethod: (payload) => getPaymentMethod(payload),
  setCreateBill: (payload) => setCreateBill(payload),
  getPaymentMethodClear: () => getPaymentMethodClear(),
  setCreateBillClear: () => setCreateBillClear(),
  getPaymentStatusClear: () => getPaymentStatusClear(),
  setSubmission: (payload) => setSubmission(payload),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  getPendingInvites: (payload) => getPendingInvites(payload),
  setInviteeUserId: (payload) => setInviteeUserId(payload),
  setPlanCode: (payload) => setPlanCode(payload),
  getLifetagProductDetail: (payload) => getLifetagProductDetail(payload),
  getLifetagFlag: () => getLifetagFlag(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
