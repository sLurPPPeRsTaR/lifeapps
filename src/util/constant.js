import Config from 'react-native-config';

export const {
  ONE_SIGNAL_APP_ID,
  BASE_URL,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  PERSIST_SECRET,
  LIVENESS_SDK_KEY,
  LIVENESS_SECRET_KEY,
  LIVENESS_X_ADVAI_KEY,
  TYPE,
  DETAIL_POLICY_SECRET_KEY,
  PRIVACY_POLICY_URL,
  APPSFLYER_DEVKEY,
  APPSFLYER_APPID,
  DD_CLIENT_TOKEN,
  DD_ENV,
  DD_APPLICATION_ID,
} = Config;

export const RESPONSE_STATUS = {
  ERR_NETWORK: 0,
  SUCCESS: 200,
  NEED_ACTION: 300,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  ERROR: 500,
  ERR_BAD_RESPONSE: 502,
  ACCEPTED: 202,
};

export const RESPONSE_STATE = {
  DATA_NOT_EXISTS: 'DATA_NOT_EXISTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  ERR_NETWORK: 'ERR_NETWORK',
  USER_BLOCKED_: 'USER_BLOCKED_',
  TOO_FREQUENTLY_: 'TOO_FREQUENTLY_',
  ALREADY_REGISTERED: 'ALREADY_REGISTERED',
  BAD_REQUEST: 'BAD_REQUEST',
  INVALID_EKYC: 'INVALID_EKYC',
  POLICY_IN_SUBMIT_STATUS_NOT_FOUND: 'POLICY_IN_SUBMIT_STATUS_NOT_FOUND',
  ALREADY_SUBSCRIBE: 'ALREADY_SUBSCRIBE',
  ALREADY_BOUGHT: 'ALREADY_BOUGHT',
};

export const LIVENESS_ERROR_CODE = {
  ACTION_TIMEOUT: 'ACTION_TIMEOUT',
  MULTIPLE_FACE: 'MULTIPLE_FACE',
  FACE_MISSING: 'FACE_MISSING',
  CHECKING_OVER_QUERY_LIMIT: 'CHECKING_OVER_QUERY_LIMIT',
  USER_GIVE_UP: 'USER_GIVE_UP',
};

export const LOGIN_TYPE = {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  APPLE: 'APPLE',
};

export const PRODUCT = {
  LIFESAVER: {
    LIFESAVER: 'LifeSAVER',
    LIFESAVER_PLUS: 'LifeSAVER+',
    LIFESAVER_LITE: 'LifeSAVER Lite',
    LIFESAVER_PRO: 'LifeSAVER Pro',
    LIFESAVER_POS: 'LifeSAVER POS',
  },
  LIFECOVER: {
    PDF_PREFIX_TITLE: 'IFGL_LifeCOVER',
    PDF_RIPLAY_URI: `${BASE_URL}/v1/public/assets/a53726ba-f457-47b3-b334-109805f49042.pdf`,
    PDF_SYARAT_KETENTUAN_URI: `${BASE_URL}/v1/public/assets/27bd2691-db23-4c34-adba-703c1b3e360f.pdf`,
  },
};

export const EMERGENCY_PHONE = {
  PHONE: 'tel:08001888188',
};

export const GOOGLE_PEOPLE_API =
  'https://people.googleapis.com/v1/people/me?personFields=names,birthdays,emailAddresses&sources=READ_SOURCE_TYPE_PROFILE&access_token=';

export const FACEBOOK_PEOPLE_API =
  'https://graph.facebook.com/v14.0/me?fields=id,name,email,birthday&access_token=';

export const NAVIGATION = {
  AUTH: {
    Auth: 'Session',
    AuthLanding: 'AuthLanding',
    AuthLoad: 'Load',
  },
  REGISTER: {
    Register: 'Register',
    RegisterMain: 'RegisterMain',
    RegisterOtp: 'RegisterOtp',
    RegisterPolis: 'RegisterPolis',
    RegisterInput: 'RegisterInput',
    RegisterNextStep: 'RegisterNextStep',
    RegisterPolisOtp: 'RegisterPolisOtp',
    RegisterSertifikat: 'RegisterSertifikat',
    RegisterPin: 'RegisterPin',
    RegisterTerms: 'RegisterTerms',
  },
  LOGIN: {
    Login: 'Login',
    LoginMain: 'LoginMain',
  },
  FORPASS: {
    Forpass: 'Forpass',
    ForpassMain: 'ForpassMain',
    ForpassInput: 'ForpassInput',
  },
  HOME: {
    Home: 'Home',
    HomeMain: 'HomeMain',
    HomePolisJiwasraya: 'HomePolisJiwasraya',
    HomePengalihanPolis: 'HomePengalihanPolis',
    HomeSos: 'HomeSos',
    HomeListRS: 'HomeListRS',
    HomeListProduk: 'HomeListProduk',
  },
  PROFILE: {
    Profile: 'Profile',
    ProfileMain: 'ProfileMain',
    ProfileLanguage: 'ProfileLanguage',
    ProfileSecurity: 'ProfileSecurity',
    ProfileHelp: 'ProfileHelp',
    ProfileHelpCenter: 'ProfileHelpCenter',
    ProfilePayment: 'ProfilePayment',
    ProfilePaymentV2: 'ProfilePaymentV2',
    ProfilePersonalData: 'ProfilePersonalData',
    ProfileCreatePin: 'ProfileCreatePin',
    ProfileCreateNewPin: 'ProfileCreateNewPin',
    ProfileChangeNewPin: 'ProfileChangeNewPin',
    ProfileDevice: 'ProfileDevice',
    ProfileInputPin: 'ProfileInputPin',
    ProfileChangePassword: 'ProfileChangePassword',
    ProfileMobileNumber: 'ProfileMobileNumber',
    ProfileNewMobileNumber: 'ProfileNewMobileNumber',
    ProfileMobileNumberOtp: 'ProfileMobileNumberOtp',
    ProfilePersonalProvince: 'ProfilePersonalProvince',
    ProfilePersonalCity: 'ProfilePersonalCity',
    ProfilePersonalDistrict: 'ProfilePersonalDistrict',
    ProfileDeleteAccount: 'ProfileDeleteAccount',
    ProfileDeleteAccountNonKYC: 'ProfileDeleteAccountNonKYC',
    ProfileDeleteAccountOTP: 'ProfileDeleteAccountOTP',
    ProfileOtp: 'ProfileOtp',
    ProfileFaqFeedback: 'ProfileFaqFeedback',
    ProfileEmailEdit: 'ProfileEmailEdit',
    ProfileEmailEditOtp: 'ProfileEmailEditOtp',
    ProfilePhoneEdit: 'ProfilePhoneEdit',
    ProfilePhoneEditOtp: 'ProfilePhoneEditOtp',
    ProfileAddress: 'ProfileAddress',
    ProfileAddressEdit: 'ProfileAddressEdit',
    ProfileUnsubscribe: 'ProfileUnsubscribe',
    ProfilePayments: 'ProfilePayments',
    ProfileAddPayment: 'ProfileAddPayment',
    ProfileTerms: 'ProfileTerms',
  },
  TABMAIN: {
    TabMain: 'TabMain',
  },
  POLICY: {
    PolisMain: 'PolisMain',
    PolisDetail: 'PolisDetail',
    PolisKlaimProgress: 'PolisKlaimProgress',
    PolisDanaStatus: 'PolisDanaStatus',
    PolisLifeCard: 'PolisLifeCard',
  },
  KYC: {
    KycMain: 'KycMain',
    KycUploadSelfie: 'KycUploadSelfie',
    KycUploadSelfieCam: 'KycUploadSelfieCam',
    KycUploadKTPCam: 'KycUploadKTPCam',
    KycForm: 'KycForm',
    KycCreatePin: 'KycCreatePin',
    KycRetry: 'KycRetry',
  },
  UPDATA: {
    Updata: 'Updata',
    UpdataMain: 'UpdataMain',
    UpdataSelf: 'UpdataSelf',
    UpdataSelfCam: 'UpdataSelfCam',
    UpdataKTP: 'UpdataKTP',
    UpdataKTPCam: 'UpdataKTPCam',
    UpdataKK: 'UpdataKK',
    UpdataKKCam: 'UpdataKKCam',
    UpdataReview: 'UpdataReview',
    UpdataInformation: 'UpdataInformation',
    UpdataPhone: 'UpdataPhone',
    UpdataPhoneEdit: 'UpdataPhoneEdit',
    UpdataEmail: 'UpdataEmail',
    UpdataEmailEdit: 'UpdataEmailEdit',
    UpdataBank: 'UpdataBank',
    UpdataBankEdit: 'UpdataBankEdit',
    UpdataAddress: 'UpdataAddress',
    UpdataAddressEdit: 'UpdataAddressEdit',
    UpdataOtp: 'UpdataOtp',
    UpdataBankUpload: 'UpdataBankUpload',
    UpdataTermsConditions: 'UpdataTermsConditions',
  },
  LIFECOVER: {
    LifecoverMain: 'LifecoverMain',
    LifecoverRiplay: 'LifecoverRiplay',
    LifecoverSyaratKetentuan: 'LifecoverSyaratKetentuan',
    LifecoverStepMedicalStatement: 'LifecoverStepMedicalStatement',
    LifecoverStepConfirmation: 'LifecoverStepConfirmation',
    LifecoverSubscriptionForm: 'LifecoverSubscriptionForm',
  },
  LIFESAVER: {
    DetailProduct: 'DetailProduct',
    LifesaverOrderPage: 'LifesaverOrderPage',
    LifesaverSyaratKetentuan: 'LifesaverSyaratKetentuan',
    LifesaverRiplay: 'LifesaverRiplay',
    TransaksiSukses: 'TransaksiSukses',
    LifesaverKebijakanPrivasi: 'LifesaverKebijakanPrivasi',
    LifesaverVoucher: 'LifesaverVoucher',
    LifesaverProtected: 'LifesaverProtected',
    LifesaverMain: 'LifesaverMain',
    LifesaverFAQ: 'LifesaverFAQ',
    LifesaverDowngrade: 'LifesaverDowngrade',
    LifesaverMainV2: 'LifesaverMainV2',
    LifesaverOrderOther: 'LifesaverOrderOther',
    LifesaverUploadKTPCam: 'LifesaverUploadKTPCam',
  },
  INVITATION: {
    InvitationMain: 'InvitationMain',
    InvitationContacts: 'InvitationContacts',
  },
  NOTIFICATION: {
    NotificationMain: 'NotificationMain',
  },
  SUBS: {
    SubsMain: 'SubsMain',
    SubsDetail: 'SubsDetail',
    SubsUnSubscribe: 'SubsUnSubscribe',
    SubsChangePackage: 'SubsChangePackage',
    SubsListBilling: 'SubsListBilling',
  },
  PAYMENTS: {
    NewCreditCard: 'NewCreditCard',
    CreditCardInfo: 'CreditCardInfo',
    Payments3DS: 'Payments3DS',
    PaymentsCheckTrans: 'PaymentsCheckTrans',
    PaymentsCheckTransV2: 'PaymentsCheckTransV2',
    PaymentsEventCheckTrans: 'PaymentsEventCheckTrans',
    PaymentsLifeTagCheckTrans: 'PaymentsLifeTagCheckTrans',
  },
  EVENT: {
    EventDetail: 'EventDetail',
    EventConfirmPayment: 'EventConfirmPayment',
    EventConfirmOrder: 'EventConfirmOrder',
    EventSuccess: 'EventSuccess',
    EventMain: 'EventMain',
    EventFavorite: 'EventFavorite',
    EventHistory: 'EventHistory',
    EventList: 'EventList',
    EventDetailTicket: 'EventDetailTicket',
  },
  LIFETAG: {
    Lifetag: 'Lifetag',
    LifetagMain: 'LifetagMain',
    LifetagSetting: 'LifetagSetting',
    LifetagLanding: 'LifetagLanding',
    LifetagForm: 'LifetagForm',
    LifetagDetailProduct: 'LifetagDetailProduct',
    LifetagConfirmation: 'LifetagConfirmation',
    LifetagDeviceList: 'LifetagDeviceList',
    LifetagDetailOrder: 'LifetagDetailOrder',
    LifetagStepPairing: 'LifetagStepPairing',
    LifetagQrScanner: 'LifetagQrScanner',
    LifetagPairingResult: 'LifetagPairingResult',
  },
  ARTICLE: {
    ArticleMain: 'ArticleMain',
    ArticleDetail: 'ArticleDetail',
  },
};

export const API = {
  CONFIG: {
    customerapps: '/v1/config/customerapps/version1',
  },
  AUTH: {
    logout: '/v1/auth/logout',
    requestOtp: '/v1/auth/requestOtp',
    requestOtpByToken: '/v1/auth/private/requestOtp',
    login: '/v1/auth/login',
    resetPassword: '/v1/auth/resetPassword',
    changePassword: '/v1/auth/changePassword',
    loginChannel: '/v1/auth/loginChannel',
    delete: '/v2/auth/delete',
    verifyOtp: '/v1/auth/verifyOtp',
    verifyOtpNoLogin: '/v1/auth/public/verifyOtp',
  },
  USER: {
    user: '/v1/user',
    session: '/v1/user/session',
    changeMobilePhoneNumber: '/v1/user/changeMobilePhoneNumber',
    changeEmail: '/v1/user/changeEmail',
    photo: '/v1/user/photo',
    thumbnail: '/v1/user/photo/thumbnail',
    checkEmail: '/v1/user/checkEmail',
    channel: '/v1/user/channel',
    checkPhoneEmail: '/v1/user/checkPhoneNumberAndEmail',
    refreshToken: '/v1/auth/refreshToken',
    faq: '/v1/feedback',
    noLoginFaq: '/v1/feedback/guest',
    rating: '/v1/feedback/rating',
    address: '/v1/customer/user/address',
    photoThumbnail: '/v1/user/photoThumbnail',
    photoThumbnailPublic: '/v1/user/public/photoThumbnail',
    userFlag: '/v1/user/flag',
    referral: '/v1/customer/referral',
  },
  POLICY: {
    policy: '/v1/policy',
    link: '/v1/policy/link',
    inquiry: '/v1/policy/inquiry',
    checkpolis: '/v1/policy/checkpolis',
    summary: '/v1/policy-detail/summary',
    selfData: '/v1/policy/selfData',
    benefit: '/v2/policy-detail/benefit',
    funds: '/v1/policy/funds',
    claim: '/v1/policy/claim',
    detailClaim: '/v1/policy-detail/detailClaim',
    download: '/v1/policy-detail/download',
    checkIssuedPolicy: '/v2/policy-alter/checkIssuedPolicy',
    getLastKTPInformation: '/v1/policy/getLastKTPInformation',
    getLastKKInformation: '/v1/policy/getLastKKInformation',
    getLastOtherInformation: '/v1/policy/getLastOtherInformation',
    checkKKAndKTP: '/v1/policy/checkKKAndKTP',
    getListBank: '/v1/policy/getListBank',
    getWidgetManfaat: '/v1/policy/closestBenefit',
    inquiryBankAccount: '/v1/policy/inquiryBankAccount',
    inquiryPolicyNo: '/v1/policy/inquiryPolicyNo',
    checkLinkPolicyNo: '/v1/policy/checkLinkPolicyNo',
    bankUpload: '/v1/eKyc/bookAccount',
    policyWidgetHome: '/v1/policy-widget/home',
    policyWidgetHomePublic: '/v1/policy-widget/home/public',
    validationCheck: '/v1/policy-alter/validationCheck',
    getPolicyProposal: 'v1/product/proposal/contract',
    policyInqury: {
      master: {
        province: '/v1/policy-inquiry/master/province',
        city: '/v1/policy-inquiry/master/city',
        district: '/v1/policy-inquiry/master/district',
        subDistrict: '/v1/policy-inquiry/master/subDistrict',
      },
    },
  },
  PIN: {
    pin: '/v1/mpin',
    verify: '/v1/mpin/verify',
  },
  META: {
    getCSInfo: '/v1/meta/getCSInfo',
    getProvinsi: '/v1/meta/getProvinsi',
    getCityById: '/v1/meta/getCityById',
    getDistrictById: '/v1/meta/getDistrictById',
    getSubDistrictById: '/v1/meta/getSubDistrictById',
  },
  KYC: {
    selfie: '/v1/eKyc/faceLiveness',
    idCard: '/v1/eKyc/idCard',
    verifyIdCard: '/v1/eKyc/verify/E_KYC_LIFE_PLUS',
    familyCard: '/v1/eKyc/familyCard',
    verifyUpdata: '/v1/eKyc/verify/E_KYC_UPDATE_DATA',
    livenessLicense: 'https://api.advance.ai/openapi/liveness/v1/auth-license',
    livenessResult:
      'https://api.advance.ai/openapi/liveness/v3/detection-result',
    verifyDukcapil: '/v1/eKyc/verify',
    faceCompare: '/v1/eKyc/faceCompare',
    getDetailEKyc: '/v1/eKyc/getDetailEKyc',
    getUserIdentityCardInfo: '/v1/eKyc/getUserIdentityCardInfo',
  },
  LIFESAVER: {
    getProduct: '/v1/product/detail',
    getListRs: '/v1/provider/hospital',
    getPersonalRiplay:
      '/v1/public/assets/e617b749-0942-4fcd-b434-2051e1f536b5.pdf',
    setSubmission: '/v1/submission/subscribe',
    setCallTime: '/v1/product/emergency/addTime',
    getCurrentSubs: '/v1/product/getActiveProduct',
    getCampaign: '/v1/product/campaign',
    getPolicyDetail: '/v1/policy-detail/summary?',
    setWaiting: '/v1/product/waiting',
    setPersonEligible: '/v1/product/eligible/addDataUser',
    getEligiblePos: '/v1/product/partner/lifeSAVERPOS',
  },
  PAYMENT: {
    inquiryDomesticAccount:
      'https://inquirypayment-aws.ifg-life.id/v1/bca/?/BcaApi/inquiry_domestic_account',
    getPaymentMethod: '/v1/product/payment/paymentMethod',
    setCreateBill: '/v1/product/payment/createBilling',
    setCreateBillEvent: '/v1/product/payment/paymentRequestEvent',
    getPaymentStatus: '/v1/product/payment/checkPayment',
    getInvoiceMaster: '/v1/transaction/invoiceMaster',
    getPaymentStatusv3: '/v3/product/payment/checkPayment',
    getPaymentStatusv2: '/v2/product/payment/checkPayment',
    getPaymentEventStatus: '/v1/customer/event/payment/check',
    orderPaymentMethod: '/v1/product/payment/orderPayment',
    setCreateBillProposal: '/v1/product/payment/paymentRequest',
    setCreateBillSinglePayment: '/v1/product/payment/savePaymentRequest',
    setCreateBillInvoiceMaster: '/v1/transaction/payment/paymentRequest',
    setCreateBillRenewal: '/v1/product/payment/paymentRequest/renewal',
  },
  NOTIFICATION: {
    getNotif: '/v1/user/notification/info',
    getNotifPromo: '/v1/user/notification/promo',
    getNotifTransaction: '/v1/user/notification/transaction',
    getNotifCount: '/v1/user/notification/count',
    readNotif: '/v1/user/notification',
  },
  SUBS: {
    getSubscriptions: '/v1/product/subsbased',
    getSubscriptionDetail: '/v1/product/detailPolicy',
    getBills: '/v1/product/billing',
    setCancelUnsubscribe: '/v1/submission/cancelUnsubscribe',
    setUnsubscribe: '/v1/submission/unsubscribe',
  },
  LANDING: {
    getFitPrices: '/v1/product/lifesaver',
    getFitPlusPrices: '/v1/product/lifesaverplus',
  },
  INVITATION: {
    getReferral: '/v1/product/referral',
    getShareCount: '/v1/product/referral/countShare', // salah nama
    getTotalRegister: '/v1/product/referral/countRegister',
    getTotalSubscribe: '/v1/product/referral/countSubs',
    getIsUserEligible: '/v1/product/eligible',
    getCheckAlreadyInvite: '/v1/product/invitation/checkPhoneNo',
    getCheckAlreadySubscribe: '/v1/product/eligible/subsByPhoneNo',
    getAddLink: '/v1/product/invitation/addLink',
    getInvitationLink: '/v1/product/invitation',
    getInvitationListFriend: '/v1/product/invitation/listFriends',
    getCheckStatusRegister: '/v1/product/invitation/statusRegisterPhoneNo',
    getPendingInvites: '/v1/product/invitation/listInviting',
    getCheckInvitee: '/v1/product/invitation/checkPhoneNo',
    getCheckMaxInvite: '/v1/product/role',
  },
  EVENT: {
    getEventDetail: '/v1/customer/event/',
    getEventDetailPublic: '/v1/customer/public/event/',
    getEventQuota: '/v1/customer/event/remainingQuota',
    getEventUpcoming: '/v1/customer/event?',
    getEventUpcomingPublic: '/v1/customer/public/event?',
    setEventCode: '/v1/customer/event/code',
    setEventAddFavorite: 'v1/customer/event/favorite/',
    setEventRmvFavorite: 'v1/customer/event/favorite/',
    getEventFavorite: '/v1/customer/event/favorite?',
    getEventUserTicket: '/v1/customer/event/ticket?',
    setEventBuyTicket: 'v1/customer/event/ticket',
    eventCategories: 'v1/customer/event/category',
    getUserEventInvoiceId: 'v1/customer/event/register',
    setPaymentEvent: 'v1/customer/event/payment',
    setCreateBillEvent: 'v1/product/payment/paymentRequestEvent',
    setValidateVoucherCode: 'v1/customer/event/voucher',
    setValidateAccessCode: 'v1/customer/event/accesscode',
    setValidateRefferalCode: 'v1/customer/event/invitation/referral/validation',
  },
  CUSTOMER: {
    PRODUCT: {
      product: '/v1/customer/product',
      order: '/v1/customer/product/order',
      lifeTagPublic: '/v1/customer/product/merchandise/public',
      lifeTag: '/v1/customer/product/merchandise',
      lifeTagFlag: '/v1/customer/product/merchandise/flag',
      userParty: '/v1/customer/userParty',
    },
    CLAIM: {
      totalClaim: '/v1/product/claim/report/totalClaim',
    },
  },
  ARTICLE: {
    getArticles: '/v1/content/articles?',
    getArticleCategories: '/v1/content/categories?',
  },
};

export const TOAST = {
  type: {
    error: 'error',
    warning: 'warning',
    success: 'success',
    info: 'info',
  },
};

export const APP = {
  header: {
    height: 56,
  },
};

export const SUBS_TYPE = {
  start: 'subscription',
};

export const POLICY_STATUS = {
  active: 'ACTIVE',
  terminate: 'TERMINATE',
  lapse: 'LAPSE',
  submit: 'SUBMIT',
  gracePeriod: 'GRACE_PERIOD',
  gracePeriod2: 'GRACE PERIOD',
  inforce: 'INFORCE',
};

export const STATUS_CODE = {
  [POLICY_STATUS.active]: 'active',
  [POLICY_STATUS.gracePeriod]: 'active',
  [POLICY_STATUS.gracePeriod2]: 'active',
  [POLICY_STATUS.inforce]: 'active',
  [POLICY_STATUS.terminate]: 'non-active',
  [POLICY_STATUS.lapse]: 'non-active',
};

export const BILLING_STATUS = {
  paid: 'paid',
  unpaid: 'unpaid',
  cancel: 'cancel',
};

export const PAYMENT_METHOD = {
  recurring: 'recurring',
  nonrecurring: 'non-recurring',
};

export const CODE_PRODUCT = {
  [PRODUCT.LIFESAVER.LIFESAVER_POS]: 'lifesaverpos',
  [PRODUCT.LIFESAVER.LIFESAVER]: 'lifesaver',
  [PRODUCT.LIFESAVER.LIFESAVER_PLUS]: 'lifesaverplus',
  [PRODUCT.LIFESAVER.LIFESAVER_PRO]: 'lifesaverpro',
};

export const APPLICATION_PAYMENT_ID = 'customerapps-mobile';
export const APPLICATION_PAYMENT_ID_V2 = 'customerapps-mobile-v2';
export const APPLICATION_PAYMENT_ID_RENEWAL = 'customerapps-mobile-renew';

export const BILL_TYPE = {
  premium: 'premium',
};
export const PROPOSAL_STATUS = {
  waiting: 'WAITING_FOR_PAYMENT',
};
export const PAYMENT_TYPE = {
  creditDebitCard: 'credit-or-debit-card',
  creditCard: 'credit-card',
};

export const CHECK_PAYMENT_ERR_CODE = {
  INVALID_CVN: 'INVALID_CVN',
  EXPIRED_CARD: 'EXPIRED_CARD',
  PROCESSOR_ERROR: 'PROCESSOR_ERROR',
  INACTIVE_CARD: 'INACTIVE_CARD',
  EXPIRED: 'EXPIRED',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  '3DS_FAILED': '3DS_FAILED',
  CARD_DECLINED: 'CARD_DECLINED',
};

export const EVENT_CODE = {
  BAJO2022: 'BAJO2022',
};

export const COVERAGE_BENEFIT_LIMIT_INNER = {
  DIVING: 'DIVING',
};

export const COVERAGE_BENEFIT_LIMIT_MAIN = {
  PHYSIOTHERAPY: 'PHYSIOTHERAPY',
  ACCIDENT_INJURY: 'ACCIDENT_INJURY',
  TOTAL_DISABILITY: 'TOTAL_DISABILITY',
};

export const codeLifesaver = {
  productCode: '001',
  lifesaverpos: {
    planCode: '01',
    planName: 'LifeSAVER POS',
    planName2: 'LifeSAVERPOS',
    planNameAlt: 'LifeSAVERPOS',
  },
  lifesaver: {
    planCode: '02',
    planName: 'LifeSAVER',
    param: 'lifesaver',
  },
  lifesaverplus: {
    planCode: '03',
    planName: 'LifeSAVER+',
    param: 'lifesaverplus',
  },
  lifesaverlite: {
    planCode: '04',
    planName: 'LifeSAVER Lite',
  },
  lifesaverpro: {
    planCode: '05',
    planName: 'LifeSAVER Pro',
  },
};

export const codeLifesaverPlan = {
  '01': {
    params: 'lifesaverpos',
    price: 35000,
  },
  '02': {
    params: 'lifesaver',
    price: 49000,
  },
  '03': {
    params: 'lifesaverplus',
    price: 99000,
  },
};

export const LinkingScreen = {
  subsdetail: NAVIGATION.SUBS.SubsDetail,
  subsmain: NAVIGATION.SUBS.SubsMain,
  paymentredirect: NAVIGATION.PAYMENTS.Payments3DS,
  lifetagdetailorder: NAVIGATION.LIFETAG.LifetagDetailOrder,
  kycretry: NAVIGATION.KYC.KycRetry,
  profilepayments: NAVIGATION.PROFILE.ProfilePayments,
  polismain: NAVIGATION.HOME.HomeMain,
  userticket: NAVIGATION.EVENT.EventDetailTicket,
};

export const DEEPLINK_PREFIX = {
  android: {
    '': '&apn=id.lifecustomer&amv=0&ibi=id.lifecustomer&isi=123456&st=event&sd=event',
    '-uat':
      '&apn=id.lifecustomer.uat&amv=0&ibi=id.lifecustomer.uat&isi=123456&st=event&sd=event',
    '-dev':
      '&apn=id.lifecustomer.dev&amv=0&ibi=id.lifecustomer.dev&isi=123456&st=event&sd=event',
  },
  ios: {
    '': '&apn=id.life.customer&amv=0&ibi=id.lifecustomer&isi=123456&st=event&sd=event',
    '-uat':
      '&apn=id.life.customer.uat&amv=0&ibi=id.lifecustomer.uat&isi=123456&st=event&sd=event',
    '-dev':
      '&apn=id.life.customer.dev&amv=0&ibi=id.lifecustomer.dev&isi=123456&st=event&sd=event',
  },
};

export const DEEPLINK_PREFIX_LIFETAG = {
  android: {
    '': '&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer',
    '-uat': '&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat',
    '-dev': '&apn=id.lifecustomer.dev&isi=1627986095&ibi=id.life.customer.dev',
  },
  ios: {
    '': '&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer',
    '-uat': '&apn=id.lifecustomer.uat&isi=1627986095&ibi=id.life.customer.uat',
    '-dev': '&apn=id.lifecustomer.dev&isi=1627986095&ibi=id.life.customer.dev',
  },
};

export const LIFETAG_ENV = {
  key: '12345678123456781234567812345678',
  iv: '1234567812345678',
};

export const STORE_URL = {
  android:
    'https://play.google.com/store/apps/details?id=id.lifecustomer&hl=en&gl=US',
  ios: 'https://apps.apple.com/id/app/life-by-ifg/id1627986095',
};
