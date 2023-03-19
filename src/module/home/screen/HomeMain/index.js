import { connect } from 'react-redux';
import {
  getNotifCount,
  getNotifCountClear,
  getPolicies,
  getPoliciesClear,
  getProductBanner,
  getProductBannerClear,
  getPolicyWidgetHome,
  getPolicyWidgetHomeClear,
  setTemporaryHomeState,
  getPolicyProposal,
  getPolicyWidgetHomePublic,
  getPolicyWidgetHomePublicClear,
} from 'ca-module-home/homeAction';
import {
  getSubscriptionDetail,
  getSubscriptionDetailClear,
} from 'ca-module-subs/subsAction';
import {
  setIsShowModalComingSoon,
  setLoading,
  setToastMsg,
  setIsComingFromScreen,
  setIsComingFromDeepLink,
  setIsComingFromDeepLinkUrl,
} from 'ca-bootstrap/bootstrapAction';
import {
  getCurrentSubs,
  getCurrentSubsClear,
  getIsUserEligibleClear,
} from 'ca-module-lifesaver/lifesaverAction';
import { getPendingInvites } from 'ca-module-invitation/invitationAction';
import {
  getEventUserTicket,
  getEventUpcoming,
} from 'ca-module-event/eventAction';
import { setUserData, setWidgetToggle } from 'ca-module-auth/authAction';
import { setLoginClear } from 'ca-module-login/loginAction';
import { getLifetagFlag } from 'ca-module-lifetag/lifetagAction';
import { getInvoiceMaster } from 'ca-module-payments/paymentsAction';
import { getProfileUserParty } from 'ca-module-profile/profileAction';
import {
  getArticleCategories,
  getArticles,
} from 'ca-module-article/articleAction';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  getPoliciesResponse: state.home.getPoliciesResponse,
  getPoliciesFetch: state.home.getPoliciesFetch,
  alreadySetPin: state.auth.userData.alreadySetPin,
  alreadyKYC: state.auth.userData.alreadyKYC,
  kkpmFlag: state.auth.userData.kkpmFlag,
  getNotifCountResponse: state.home.getNotifCountResponse,
  isLastAlterSuccess: state.auth.userData.isLastAlterSuccess,
  isProgressCodePush: state.bootstrap.isProgressCodePush,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
  getProductBannerResponse: state.home.getProductBannerResponse,
  getPolicyWidgetHomeResponse: state.home.getPolicyWidgetHomeResponse,
  mobilePhoneNumber: state.auth.userData.mobilePhoneNumber,
  setProfileRequestOtpFailed: state.profile.setProfileRequestOtpFailed,
  isComingFromScreen: state.bootstrap.isComingFromScreen,
  isUpdataModalAlreadyShowed: state.home.isUpdataModalAlreadyShowed,
  currentScreen: state.activity.currentScreen,
  getPoliciesError: state.home.getPoliciesError,
  toastMsg: state.bootstrap.toastMsg,
  homeAction: state.home.action,
  invitationAction: state.invitation.action,
  lifesaverAction: state.lifesaver.action,
  appConfig: state.bootstrap.appConfig,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getPendingInvitesResponse: state.invitation.getPendingInvitesStateResponse,
  getIsUserEligibleResponse: state.lifesaver.getIsUserEligibleResponse,
  accessToken: state.auth,
  userData: state.auth.userData,
  getEventUserTicketResponse: state.event.getEventUserTicketResponse,
  getEventUpcomingResponse: state.event.getEventUpcomingResponse,
  getPolicyProposalResponse: state.home.getPolicyProposalResponse,
  getPolicyProposalFetch: state.home.getPolicyProposalFetch,
  getPolicyProposalError: state.home.getPolicyProposalError,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  getInvoiceMasterResponse: state.payments.getInvoiceMasterResponse,
  getSubscriptionDetailResponse: state.subs.getSubscriptionDetailResponse,
  subsAction: state.subs.action,
  getPolicyWidgetHomePublicResponse:
    state.home.getPolicyWidgetHomePublicResponse,
  getPolicyWidgetHomePublicError: state.home.getPolicyWidgetHomePublicError,
  isComingFromDeepLink: state.bootstrap.isComingFromDeepLink,
  isComingFromDeepLinkUrl: state.bootstrap.isComingFromDeepLinkUrl,
  getArticlesResponse: state.article.getArticlesResponse,
  getArticleCategoriesResponse: state.article.getArticleCategoriesResponse,
  getArticleCategoriesList: state.article.getArticleCategoriesList,
  articleAction: state.article.action,
  widgetToggle: state.auth.widgetToggle,
});

const mapDispatchToProps = {
  getPolicies: (payload) => getPolicies(payload),
  getNotifCount: (payload) => getNotifCount(payload),
  getNotifCountClear: () => getNotifCountClear(),
  setLoading: (payload) => setLoading(payload),
  getPoliciesClear: () => getPoliciesClear(),
  setIsShowModalComingSoon: (payload) => setIsShowModalComingSoon(payload),
  getProductBanner: () => getProductBanner(),
  getProductBannerClear: () => getProductBannerClear(),
  getPolicyWidgetHome: (payload) => getPolicyWidgetHome(payload),
  getPolicyWidgetHomeClear: () => getPolicyWidgetHomeClear(),
  setTemporaryHomeState: (payload) => setTemporaryHomeState(payload),
  setToastMsg: (payload) => setToastMsg(payload),
  getCurrentSubs: () => getCurrentSubs(),
  getCurrentSubsClear: () => getCurrentSubsClear(),
  getIsUserEligibleClear: () => getIsUserEligibleClear(),
  getPendingInvites: (payload) => getPendingInvites(payload),
  setLoginClear: () => setLoginClear(),
  setIsComingFromScreen: (payload) => setIsComingFromScreen(payload),
  setUserData: (payload) => setUserData(payload),
  getEventUserTicket: (payload) => getEventUserTicket(payload),
  getEventUpcoming: (payload) => getEventUpcoming(payload),
  getPolicyProposal: (payload) => getPolicyProposal(payload),
  getLifetagFlag: () => getLifetagFlag(),
  getSubscriptionDetail: (payload) => getSubscriptionDetail(payload),
  getSubscriptionDetailClear: () => getSubscriptionDetailClear(),
  getPolicyWidgetHomePublic: (payload) => getPolicyWidgetHomePublic(payload),
  getPolicyWidgetHomePublicClear: () => getPolicyWidgetHomePublicClear(),
  getInvoiceMaster: () => getInvoiceMaster(),
  getProfileUserParty: () => getProfileUserParty(),
  setIsComingFromDeepLink: (payload) => setIsComingFromDeepLink(payload),
  setIsComingFromDeepLinkUrl: (payload) => setIsComingFromDeepLinkUrl(payload),
  getArticleCategories: (payload) => getArticleCategories(payload),
  getArticles: (payload) => getArticles(payload),
  setWidgetToggle: (payload) => setWidgetToggle(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
