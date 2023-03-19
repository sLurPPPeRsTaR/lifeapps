import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  View,
} from 'react-native';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Shadow from 'ca-component-container/Shadow';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import LinearGradient from 'react-native-linear-gradient';
import {
  Attention,
  DummyProfile,
  KreditNotActive,
  LogoLifesaver,
  LogoLifesaverPlus,
} from 'ca-config/Svg';
import { formatedCardDate, generateCardNo, useMount } from 'ca-util/common';
import {
  BASE_URL,
  codeLifesaver,
  CODE_PRODUCT,
  NAVIGATION,
  PRODUCT,
  SUBS_TYPE,
  API,
  APPLICATION_PAYMENT_ID,
  BILL_TYPE,
  PAYMENT_TYPE,
  PROPOSAL_STATUS,
  RESPONSE_STATE,
} from 'ca-util/constant';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Input from 'ca-component-generic/Input';
import { formatDate, getTimestamp } from 'ca-util/format';
import {
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
  SET_SUBMISSION_FAILED,
} from 'ca-module-lifesaver/lifesaverConstant';
import ConnectionFailed from 'ca-component-lifesaver/ConnectionFailed';
import { formatNumber } from 'ca-util/numbro';
import {
  GET_PAYMENT_METHOD_FAILED,
  GET_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_STATUS_FAILED,
  SET_CREATE_BILL_FAILED,
  SET_CREATE_BILL_SUCCESS,
} from 'ca-module-payments/paymentsConstant';
import {
  LifesaverOrderTotal,
  LifesaverText,
} from 'ca-module-lifesaver/component';
import { GET_LIFETAG_PRODUCT_DETAIL_FAILED } from 'ca-module-lifetag/lifetagConstant';
import {
  SET_KYC_POSTALCODE_IDCARD_FAILED,
  SET_KYC_POSTALCODE_IDCARD_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import { AFLogEvent, AF_OPEN_SUBSCRIBE } from 'ca-util/AppsFlyer';
import { ModalErrorSubmission } from './components/Modal';
import { LifeTagContent } from './components';
import style from './style';
import locale from './locale';

function LifesaverOrderPage(props) {
  const {
    navigation,
    lang,
    colorScheme,
    userData,
    getProduct,
    getProductClear,
    getProductResponse,
    setLoading,
    lifesaverAction,
    paymentsAction,
    getPaymentMethodResponse,
    getPaymentMethod,
    getPaymentMethodClear,
    getPaymentStatusClear,
    setCreateBillClear,
    setSubmission,
    setSubmissionResponse,
    setSubmissionError,
    setCreateBillError,
    getPendingInvites,
    getPendingInvitesResponse,
    setInviteeUserId,
    setCreateBill,
    setPlanCode,
    inviteeUserId,
    kycAction,
    setAddPostalCodeKycIdCard,
    route: { params },
    getEligibleSubmissionResponse,
    getAddressList,
    getAddressListResponse,
    getLifetagProductDetailFetch,
    getLifetagProductDetail,
    getLifetagFlag,
    getLifetagFlagResponse,
    lifetagAction,
    getLifetagProductDetailFailed,
    setIsComingFromScreen,
    getLifetagProductDetailResponse,
    getPendingInvitesFetch,
    setSubmissionFetch,
    getPaymentMethodFetch,
    getProductFetch,
    isComingFromScreen,
  } = props;

  const { from, eventCode } = params;
  const product = CODE_PRODUCT[params?.product];

  // APPSFLYER LOG - OPEN SUBSCRIBE
  useEffect(() => {
    const logs = {
      af_user_id: userData.userId,
      af_content_id: getPolicy,
      af_price: getProductResponse?.subsPrice,
      af_product: PRODUCT.LIFESAVER,
      af_plan: product,
    };
    AFLogEvent(AF_OPEN_SUBSCRIBE, logs);
  }, [getPolicy, getProductResponse?.subsPrice, product, userData.userId]);

  // Render Logo
  const productData = {
    lifesaver: {
      logo: <LogoLifesaver />,
    },
    lifesaverplus: {
      logo: <LogoLifesaverPlus />,
    },
  };

  // Handle isFetching
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [isStartFetch, setIsStartFetch] = useState(false);
  // Payment State
  const [selectedCard, setSelectedCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(() => {
    if (getPaymentMethodResponse?.cards?.length === 0) {
      return 2;
    }
    return 1;
  });
  const [addCardForm, setAddCardForm] = useState({
    accountNumber: '',
    expDate: '',
    cvv: '',
    cardName: '',
    isFill: false,
  });

  const [alreadySubmit, setAlreadySubmit] = useState(false);
  const [lifetagPickList, setLifetagPickList] = useState([]);
  const [userAddress, setUserAddress] = useState(null);

  const [cardValidation, setCardValidation] = useState(false);
  const { accountNumber, expDate, cvv, cardName, isFill } = addCardForm;
  // Modal Error Submission
  const [isErrSubsVisible, setIsErrSubsVisible] = useState(false);
  const [errSubsMessage, setErrSubsMessage] = useState('');

  // Memo lifetagContent
  const isCheckLifeTag = useMemo(() => {
    if (lifetagPickList?.length > 0) {
      return true;
    }
    return false;
  }, [lifetagPickList?.length]);

  // Memo getInvoice
  const getInvoice = useMemo(() => {
    if (from === 'bajoRun') {
      return getEligibleSubmissionResponse?.eligible?.transactionId;
    }
    return setSubmissionResponse?.transactionId;
  }, [from, setSubmissionResponse, getEligibleSubmissionResponse]);

  // Memo getPolicy
  const getPolicy = useMemo(() => {
    if (from === 'bajoRun') {
      return getEligibleSubmissionResponse?.eligible?.policyNo;
    }
    return setSubmissionResponse?.policyNo;
  }, [from, setSubmissionResponse, getEligibleSubmissionResponse]);

  // Memo isPaymentType
  const isPaymentType = useMemo(() => {
    if (params?.isPaymentType === false) {
      return params?.isPaymentType;
    }
    return true;
  }, [params?.isPaymentType]);

  // Memo Data Personal
  const personalDataApi = useMemo(() => {
    if (from === 'bajoRun') {
      return {
        name: getEligibleSubmissionResponse?.eligible?.name,
        data: [
          {
            id: 1,
            name: trans(locale, lang, 'nik'),
            value: getEligibleSubmissionResponse?.eligible?.idCardNo,
          },
          {
            id: 2,
            name: trans(locale, lang, 'tglLahir'),
            value: formatDate(
              new Date(getEligibleSubmissionResponse?.eligible?.dob),
              lang
            ),
          },
        ],
      };
    }
    return {
      name: setSubmissionResponse?.name,
      data: [
        {
          id: 1,
          name: trans(locale, lang, 'nik'),
          value: setSubmissionResponse?.idCardNo,
        },
        {
          id: 2,
          name: trans(locale, lang, 'tglLahir'),
          value: formatDate(new Date(setSubmissionResponse?.dob), lang),
        },
      ],
    };
  }, [
    from,
    setSubmissionResponse?.name,
    setSubmissionResponse?.idCardNo,
    setSubmissionResponse?.dob,
    lang,
    getEligibleSubmissionResponse?.eligible?.name,
    getEligibleSubmissionResponse?.eligible?.idCardNo,
    getEligibleSubmissionResponse?.eligible?.dob,
  ]);

  /** Memo Lifetag Params */
  // const lifetagParams = useMemo(() => {
  //   if (isCheckLifeTag) {
  //     return {
  //       product: [
  //         {
  //           productId: getLifetagProductDetailResponse?.data?.product?.id,
  //           productColourId: lifetagColorId,
  //           quantity: 1,
  //         },
  //       ],
  //       userAddressId:
  //         isComingFromScreen?.params?.selectedAddress?.id || userData?.ekycId,
  //       name: isComingFromScreen?.params?.name || userData?.name,
  //       phoneNumber:
  //         isComingFromScreen?.params?.phoneNumber ||
  //         userData?.mobilePhoneNumber,
  //     };
  //   }
  //   return {};
  // }, [
  //   getLifetagProductDetailResponse?.data?.product?.id,
  //   isCheckLifeTag,
  //   isComingFromScreen?.params?.name,
  //   isComingFromScreen?.params?.phoneNumber,
  //   isComingFromScreen?.params?.selectedAddress?.id,
  //   lifetagColorId,
  //   userData?.ekycId,
  //   userData?.mobilePhoneNumber,
  //   userData?.name,
  // ]);

  /** Memo LifetagPrice */
  const additionalAmount = useMemo(() => {
    if (isCheckLifeTag) {
      let totalLifeTagQty = 0;
      lifetagPickList?.forEach((element) => {
        totalLifeTagQty += element?.quantity;
      });
      const lifetagPrice =
        parseInt(getLifetagProductDetailResponse?.data?.product?.price, 10) -
        parseInt(getLifetagProductDetailResponse?.data?.product?.discount, 10);
      const totalLifeTagPrice = totalLifeTagQty * lifetagPrice;

      return totalLifeTagPrice + parseInt(getProductResponse?.subsPrice, 10);
    }
    return parseInt(getProductResponse?.subsPrice, 10);
  }, [
    getLifetagProductDetailResponse?.data?.product?.discount,
    getLifetagProductDetailResponse?.data?.product?.price,
    getProductResponse?.subsPrice,
    isCheckLifeTag,
    lifetagPickList,
  ]);

  // Memo Details Payment
  const detailsPayment = useMemo(() => {
    const details = [];

    if (isCheckLifeTag) {
      const list = lifetagPickList?.map((element) => {
        const price =
          (parseInt(getLifetagProductDetailResponse?.data?.product?.price, 10) -
            parseInt(
              getLifetagProductDetailResponse?.data?.product?.discount,
              10
            )) *
          element?.quantity;

        return {
          id: element?.id,
          label: 'LifeTag',
          color: element?.name,
          quantity: element?.quantity,
          price,
        };
      });
      details.push(...list);
    }
    return details;
  }, [
    getLifetagProductDetailResponse?.data?.product?.discount,
    getLifetagProductDetailResponse?.data?.product?.price,
    isCheckLifeTag,
    lifetagPickList,
  ]);

  // Mount
  useMount(() => {
    setTimeout(() => {
      setIsStartFetch(true);
    }, 2000);
    setLoading(true);
    getPaymentMethod({});
    getPendingInvites();
    getLifetagProductDetail({
      id: '7771ea34-24fc-4744-aae8-6850899a1d6d',
      lang,
    });
    getLifetagFlag();
    getProduct({
      productCode: codeLifesaver.productCode,
      planCode: codeLifesaver[product].planCode,
    });
    getAddressList();
    setPlanCode(codeLifesaver[product].planCode);
  });

  // Memo disabled button
  const isButtonDisabled = useMemo(() => {
    if (alreadySubmit) {
      return alreadySubmit;
    }
    if (!isPaymentType) {
      return false;
    }
    if (from === 'start') {
      if (
        isCheckLifeTag &&
        !userAddress?.selectedAddress?.postcode &&
        !isComingFromScreen?.params?.selectedAddress
      ) {
        return true;
      }
      return false;
    }
    return !(
      ((selectedCard !== '' && addCardForm?.cvv?.length === 3) || isFill) &&
      (inviteeUserId !== '' || from === 'bajoRun' || from === 'event')
    );
  }, [
    addCardForm?.cvv?.length,
    alreadySubmit,
    from,
    inviteeUserId,
    isCheckLifeTag,
    isComingFromScreen?.params?.selectedAddress,
    isFill,
    isPaymentType,
    selectedCard,
    userAddress?.selectedAddress?.postcode,
  ]);

  // Handle Validation Payment
  useEffect(() => {
    if (
      accountNumber?.length === 19 &&
      expDate?.length === 5 &&
      cvv?.length === 3 &&
      !cardValidation
    ) {
      setAddCardForm({
        ...addCardForm,
        isFill: true,
      });
    } else {
      setAddCardForm({
        ...addCardForm,
        isFill: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNumber, expDate, cvv, cardValidation]);

  // Handling Loading
  useEffect(() => {
    if (
      !setSubmissionFetch &&
      !getPendingInvitesFetch &&
      !getPaymentMethodFetch &&
      !getProductFetch &&
      !getLifetagProductDetailFetch &&
      isStartFetch
    ) {
      setLoading(false);
    }
  }, [
    getLifetagProductDetailFetch,
    getPaymentMethodFetch,
    getPendingInvitesFetch,
    getProductFetch,
    isStartFetch,
    setLoading,
    setSubmissionFetch,
  ]);

  // On Focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCreateBillClear();
    });
    return unsubscribe;
  }, [navigation, setCreateBillClear]);

  // Get lifesaver Callback
  useEffect(() => {
    setProductResult(lifesaverAction);
  }, [lifesaverAction, setProductResult]);

  // Get Payment Callback
  useEffect(() => {
    setPaymentResult(paymentsAction);
  }, [setPaymentResult, paymentsAction]);

  // Callback get list inviting
  useEffect(() => {
    if (getPendingInvitesResponse?.listInviting) {
      setInviteeUserId(
        getPendingInvitesResponse?.listInviting[0]?.inviteeUserId
      );
    } else {
      setInviteeUserId('');
    }
  }, [getPendingInvitesResponse, setInviteeUserId]);

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  /** BackHandler */
  useEffect(() => {
    const goTo = () => {
      navigation.goBack();
      setIsComingFromScreen({});
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromScreen]);

  // Get User Address
  useEffect(() => {
    if (getAddressListResponse?.data) {
      setUserAddress({
        selectedAddress: {
          ...getAddressListResponse?.data?.eKYCAddress,
        },
        name: setSubmissionResponse?.name,
        phoneNumber: userData?.mobilePhoneNumber,
      });
    }
  }, [
    getAddressListResponse?.data,
    setSubmissionResponse?.name,
    userData?.mobilePhoneNumber,
  ]);

  useEffect(() => {
    if (kycAction === SET_KYC_POSTALCODE_IDCARD_SUCCESS) {
      getAddressList();
    }
    if (kycAction === SET_KYC_POSTALCODE_IDCARD_FAILED) {
      Alert.alert('Gagal menambahkan postal code');
    }
  }, [getAddressList, kycAction]);

  const lifetagResultAction = useCallback(
    (act) => {
      if (act === GET_LIFETAG_PRODUCT_DETAIL_FAILED) {
        if (
          getLifetagProductDetailFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert(getLifetagProductDetailFailed?.message);
        }
      }
    },
    [getLifetagProductDetailFailed?.message]
  );

  // Handle Callback lifesaver
  const setProductResult = useCallback(
    (act) => {
      if (act === GET_PRODUCT_SUCCESS) {
        setSubmission({
          product: {
            productCode: getProductResponse?.productCode,
            planCode: getProductResponse?.planCode,
            type: SUBS_TYPE.start,
            price: parseInt(getProductResponse?.subsPrice, 10),
            eventCode: eventCode || '',
          },
          agreement: {
            tnc: 'yes',
            riplay: 'yes',
          },
        });
      }
      if (act === GET_PRODUCT_FAILED) {
        setConnectionFailed(true);
        getProductClear();
      }
      if (act === SET_SUBMISSION_FAILED) {
        setIsErrSubsVisible(true);
        setErrSubsMessage(setSubmissionError?.message);
      }
      return null;
    },
    [
      eventCode,
      getProductClear,
      getProductResponse?.planCode,
      getProductResponse?.productCode,
      getProductResponse?.subsPrice,
      setSubmission,
      setSubmissionError?.message,
    ]
  );

  // Handle Callback payment
  const setPaymentResult = useCallback(
    (act) => {
      if (act === GET_PAYMENT_METHOD_SUCCESS) {
        setCardValidation(false);
        if (getPaymentMethodResponse?.cards?.length > 0 && from === 'start') {
          setSelectedCard(getPaymentMethodResponse?.cards[0]?.paymentAccount);
        }
      }
      if (act === SET_CREATE_BILL_SUCCESS) {
        setAlreadySubmit(false);
        if (!isPaymentType) {
          return navigation.navigate(NAVIGATION.PAYMENTS.PaymentsCheckTrans);
        }
        return navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS);
      }
      if (act === SET_CREATE_BILL_FAILED) {
        setAlreadySubmit(false);
        if (setCreateBillError?.message !== 'INTERNAL_SERVER_ERROR') {
          Alert.alert('Warning', setCreateBillError?.message);
        }
        setCreateBillClear();
      }
      if (act === GET_PAYMENT_METHOD_FAILED) {
        setConnectionFailed(true);
        getPaymentMethodClear();
      }
      if (act === GET_PAYMENT_STATUS_FAILED) {
        getPaymentStatusClear();
      }
      return null;
    },
    [
      from,
      getPaymentMethodClear,
      getPaymentMethodResponse?.cards,
      getPaymentStatusClear,
      isPaymentType,
      navigation,
      setCreateBillClear,
      setCreateBillError?.message,
    ]
  );

  const doPaymentTypeFalse = useCallback(() => {
    getPaymentStatusClear();
    setAlreadySubmit(true);
    setCreateBill({
      isPaymentTypeFalse: true,
      eventCode: params?.eventCode,
      data: {
        applicationId: APPLICATION_PAYMENT_ID,
        invoiceId: getInvoice,
        invoiceType: BILL_TYPE.premium,
        reffNo: getPolicy,
      },
    });
  }, [
    getInvoice,
    getPaymentStatusClear,
    getPolicy,
    params?.eventCode,
    setCreateBill,
  ]);

  const doPaymentV2 = useCallback(
    (paymentAccountId = '') => {
      getPaymentStatusClear();
      setAlreadySubmit(true);
      setCreateBill({
        data: {
          applicationId: APPLICATION_PAYMENT_ID,
          billType: BILL_TYPE.premium,
          reffNo: getPolicy,
          paymentAccountId: paymentAccountId,
          proposalStatus: PROPOSAL_STATUS.waiting,
          inviteeUserId: inviteeUserId || '',
          eventCode: params?.eventCode || '',
          language: lang,
          sendNotification: true,
        },
        isSinglePayment: true,
      });
    },
    [
      getPaymentStatusClear,
      getPolicy,
      inviteeUserId,
      lang,
      params?.eventCode,
      setCreateBill,
    ]
  );

  const doPayment = useCallback(
    (isVoid, amount) => {
      getPaymentStatusClear();
      setAlreadySubmit(true);
      if (paymentMethod === 1) {
        // do payment with payment list
        setCreateBill({
          applicationId: APPLICATION_PAYMENT_ID,
          invoiceId: getInvoice,
          billType: BILL_TYPE.premium,
          reffNo: getPolicy,
          billingDate: getTimestamp(),
          paymentType: PAYMENT_TYPE.creditDebitCard,
          isSubscribe: true,
          isVoid: isVoid,
          productId: codeLifesaver.productCode,
          amount: amount,
          eventCode,
          paymentInfo: {
            paymentAccountId: selectedCard,
            cvn: addCardForm?.cvv,
          },
        });
      } else if (paymentMethod === 2) {
        setCreateBill({
          applicationId: APPLICATION_PAYMENT_ID,
          invoiceId: getInvoice,
          billType: BILL_TYPE.premium,
          reffNo: getPolicy,
          billingDate: getTimestamp(),
          paymentType: PAYMENT_TYPE.creditDebitCard,
          isSubscribe: true,
          isVoid: isVoid,
          productId: codeLifesaver.productCode,
          amount: amount,
          eventCode,
          paymentInfo: {
            paymentLabel: addCardForm?.cardName || '',
            accountNumber: addCardForm?.accountNumber.replace(/ /g, ''),
            accountName: '',
            expMonth: addCardForm?.expDate?.split('/')[0],
            expYear: addCardForm?.expDate?.split('/')[1],
            cvn: addCardForm?.cvv,
          },
        });
      }
    },
    [
      addCardForm?.accountNumber,
      addCardForm?.cardName,
      addCardForm?.cvv,
      addCardForm?.expDate,
      eventCode,
      getInvoice,
      getPaymentStatusClear,
      getPolicy,
      paymentMethod,
      selectedCard,
      setCreateBill,
    ]
  );

  function renderInfoProduct() {
    return (
      <View style={style.mtMin40}>
        <Shadow borderRadius={24}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 0 }}
            colors={[
              'rgba(254, 104, 77, 1)',
              'rgba(244, 48, 54, 1)',
              'rgba(240, 35, 43, 1)',
              'rgba(237, 28, 36, 1)',
              'rgba(237, 28, 36, 1)',
            ]}>
            <View style={style.infoProduct.linearLabel}>
              {productData[product]?.logo}
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {formatNumber(getProductResponse?.subsPrice)}
                <Text
                  textStyle="medium"
                  color={Color.whiteCard[colorScheme].color}>
                  /{trans(locale, lang, 'bulan')}
                </Text>
              </Text>
            </View>
          </LinearGradient>
          <View style={style.p16}>
            <View style={style.infoProduct.durasi}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutral[colorScheme].neutral40}>
                {trans(locale, lang, 'durasiProteksi')}
                <Text
                  textStyle="semi"
                  color={Color.primary[colorScheme].primary90}>
                  *
                </Text>
              </Text>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {getProductResponse?.protectionDurationInMonth}{' '}
                {trans(locale, lang, 'bulan')}
              </Text>
            </View>
            <View style={style.infoProduct.jatuhTempo}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutral[colorScheme].neutral40}>
                {trans(locale, lang, 'jatuhTempoBerikutnya')}
              </Text>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {formatDate(new Date(getProductResponse?.dueDate), lang)}
              </Text>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderAttentionUpgrade() {
    if (from !== 'upgrade') {
      return null;
    }
    return (
      <View style={style.attentionUpgrade.container}>
        <View style={style.mr10}>
          <Attention />
        </View>

        <Text
          textStyle="medium"
          style={style.mr16}
          color={Color.neutral[colorScheme].neutral40}
          size={Size.text.caption1.size}>
          {trans(locale, lang, 'selamaMasaTunggu')}{' '}
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'kamuMasih')}{' '}
          </Text>
          {trans(locale, lang, 'manfaatPaketSebelumnya')}
        </Text>
      </View>
    );
  }

  function renderInfoTunggu() {
    const wordingInfoAfter = (from2) => {
      if (from2 === 'upgrade') {
        return 'setelahUpgrade';
      }
      return 'setelahAktif';
    };
    const wordingInfoTunggu = (from2) => {
      if (from2 === 'upgrade') {
        return 'infoTungguUpgrade';
      }
      return 'infoTunggu';
    };
    return (
      <View>
        <View style={style.infoTunggu.container}>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            color={Color.neutral[colorScheme].neutral40}>
            <Text textStyle="semi" color={Color.primary[colorScheme].primary90}>
              {'* '}
            </Text>
            {trans(locale, lang, wordingInfoTunggu(from))}:
          </Text>
          <View style={style.infoTunggu.proteksiMedis}>
            <View style={style.mx10}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutral[colorScheme].neutral40}>
                {'\u2022'}
              </Text>
            </View>

            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'proteksiMedis')}
              <Text
                textStyle="semi"
                color={Color.neutral[colorScheme].neutral40}>
                {` ${
                  getProductResponse?.waitingPeriodeInHours
                    ?.MEDICAL_COVER_WAITING
                } ${trans(locale, lang, 'jam')} `}
              </Text>
              {trans(locale, lang, wordingInfoAfter(from))}.
            </Text>
          </View>
          <View style={style.infoTunggu.proteksiCidera}>
            <View style={style.mx10}>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutral[colorScheme].neutral40}>
                {'\u2022'}
              </Text>
            </View>

            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'proteksiCedera')}
              <Text
                textStyle="semi"
                color={Color.neutral[colorScheme].neutral40}>
                {` ${
                  getProductResponse?.waitingPeriodeInHours?.INCIDENT_WAITING /
                  24
                } ${trans(locale, lang, 'hari')} `}
              </Text>
              {trans(locale, lang, wordingInfoAfter(from))}.
            </Text>
          </View>
        </View>
        {renderAttentionUpgrade()}
        <View style={style.mxMin32}>
          <HorizontalLine
            height={8}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
        </View>
      </View>
    );
  }

  const renderImage = (img) => {
    if (img) {
      return (
        <Image
          source={{
            uri: `${BASE_URL}${API.USER.photoThumbnail}/${img}`,
            headers: {
              Authorization: `Bearer ${userData?.token?.access_token}`,
            },
          }}
          style={style.invitation.image}
        />
      );
    }
    return (
      <DummyProfile width={42} height={42} style={style.invitation.image} />
    );
  };

  function renderInvitation() {
    if (from === 'bajoRun') {
      return null;
    }
    if (
      getPendingInvitesResponse?.listInviting?.length === 0 ||
      !getPendingInvitesResponse?.listInviting
    ) {
      return null;
    }
    return (
      <View style={style.mt16}>
        <Text textStyle="semi">{trans(locale, lang, 'diundangOleh')}</Text>
        <Shadow borderRadius={16} style={style.mt10}>
          {getPendingInvitesResponse?.listInviting?.map((element) => (
            <View key={element?.no} style={style.invitation.cardListContainer}>
              <View style={style.invitation.cardListBlock}>
                {renderImage(element?.inviteePhoto)}
                <Text textStyle="semi" style={style.ml10}>
                  {element?.inviteeName}
                </Text>
              </View>
              <View style={style.invitation.section}>
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral20}>
                  {formatDate(new Date(element?.createdAt), lang, true)}
                </Text>
                {inviteeUserId === element?.inviteeUserId ? (
                  <View style={style.paymentMethod.radioContainer}>
                    <View style={style.paymentMethod.radioFill} />
                  </View>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => setInviteeUserId(element?.inviteeUserId)}
                    style={style.paymentMethod.radioContainerFalse}
                  />
                )}
              </View>
            </View>
          ))}
        </Shadow>
      </View>
    );
  }

  function renderPersonalData() {
    if (from === 'upgrade') {
      return null;
    }
    if (
      getEligibleSubmissionResponse?.eligible?.idCardNo ||
      setSubmissionResponse?.idCardNo ||
      setSubmissionResponse?.idCardNo
    ) {
      return (
        <View style={style.mt16}>
          <View style={style.personalData.header}>
            <Text textStyle="semi" size={Size.text.body2.size}>
              {trans(locale, lang, 'personalData')}
            </Text>
            <Text
              textStyle="medium"
              style={style.ml10}
              color={Color.neutralLifeSaver[colorScheme].neutral20}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'asYourPersonal')}
            </Text>
          </View>

          <Shadow borderRadius={16}>
            <View style={style.personalData.shadow}>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {personalDataApi?.name}
              </Text>
              <HorizontalLine />
              {personalDataApi?.data?.map((element) => (
                <View key={element?.id} style={style.personalData.cardSection}>
                  <Text textStyle="medium" size={Size.text.caption1.size}>
                    {element?.name}
                  </Text>
                  <Text textStyle="semi" size={Size.text.caption1.size}>
                    {element?.value}
                  </Text>
                </View>
              ))}
            </View>
          </Shadow>
          {renderInvitation()}
          {getPaymentMethodResponse?.cards?.length === 0 ? (
            <View style={style.mb16} />
          ) : (
            <View style={style.personalData.breakLine}>
              <HorizontalLine
                height={8}
                color={Color.backgroundHome[colorScheme].backgroundHome}
              />
            </View>
          )}
        </View>
      );
    }
    return (
      <View>
        <ActivityIndicator color={Color.primary[colorScheme].primary90} />
      </View>
    );
  }

  function renderDiscount() {
    if (!params?.discount) {
      return null;
    }
    return (
      <View>
        <Text textStyle="semi">{trans(locale, lang, 'totalHarga')}</Text>
        <View style={style.mt16}>
          <View style={style.discount.colum}>
            <Text
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              textStyle="medium">
              {trans(locale, lang, '1Bulan')} Life
              <Text
                color={Color.neutralLifeSaver[colorScheme].neutral40}
                textStyle="mediumItalic">
                SAVER
              </Text>
              {getProductResponse?.planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS
                ? '+'
                : ''}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {formatNumber(getProductResponse?.subsPrice, lang)}
            </Text>
          </View>
          <View style={style.discount.colum}>
            <Text
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              textStyle="medium">
              {trans(locale, lang, 'potonganHarga')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              -{formatNumber(params?.discount, lang)}
            </Text>
          </View>
        </View>
        <View style={style.personalData.breakLine}>
          <HorizontalLine
            height={8}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
        </View>
      </View>
    );
  }

  function renderPremi() {
    if (from !== 'upgrade') {
      return null;
    }
    return (
      <View>
        <View style={style.mt16}>
          <View style={style.discount.colum}>
            <Text
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              textStyle="medium">
              {trans(locale, lang, 'hargaPaketBaru')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {formatNumber(getProductResponse?.subsPrice, lang)}
            </Text>
          </View>
          <View style={style.discount.colum}>
            <Text
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              textStyle="medium">
              {trans(locale, lang, 'sisaPremiLama')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              -{formatNumber(16333, lang)}
            </Text>
          </View>
          <View style={style.discount.colum}>
            <Text
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              textStyle="medium">
              {trans(locale, lang, 'biayaUpgrade')}
            </Text>
            <Text
              textStyle="medium"
              color={Color.greenActive[colorScheme].color}>
              {formatNumber(getProductResponse?.subsPrice - 16333, lang)}
            </Text>
          </View>
        </View>
        <View style={style.personalData.breakLine}>
          <HorizontalLine
            height={8}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
        </View>
      </View>
    );
  }

  function renderPaymentList() {
    if (
      !isPaymentType ||
      getPaymentMethodResponse?.cards?.length === 0 ||
      !getPaymentMethodResponse?.cards
    ) {
      return null;
    }

    return (
      <View style={style.mb16}>
        <View style={style.paymentMethod.header2}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {trans(locale, lang, 'pembayaran')}
          </Text>
          {!isButtonDisabled && (
            <Text
              onPress={() => {
                doPaymentV2();
              }}
              textStyle="semi"
              style={style.ml10}
              color={Color.primary[colorScheme].primary90}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'metodeLainnya')}
            </Text>
          )}
        </View>
        <Shadow borderRadius={16}>
          <View>
            <TouchableWithoutFeedback style={style.paymentList.listContainer}>
              <View style={style.paymentList.listCardDesc}>
                <KreditNotActive />
                <View style={style.ml16}>
                  <View style={style.paymentList.textLabelContainer}>
                    <Text textStyle="medium" color="black">
                      {getPaymentMethodResponse?.cards[0]?.paymentLabel}
                    </Text>
                    <View style={style.paymentList.textLabel}>
                      <Text
                        textStyle="semi"
                        size={Size.text.caption1.size}
                        color={Color.primary[colorScheme].primary90}>
                        {trans(locale, lang, 'utama')}
                      </Text>
                    </View>
                  </View>

                  <Text textStyle="medium" color="black">
                    {/* {getPaymentMethodResponse?.cards[0]?.cardNo} */}
                    {getPaymentMethodResponse?.cards[0]?.cardNo?.replace(
                      /X/g,
                      '*'
                    )}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Shadow>
      </View>
    );
  }

  const getCardValidation = () => {
    return (
      cardValidation === 'formatBulanTidakValid' ||
      cardValidation === 'formatTglTidakValid' ||
      cardValidation === 'cardExpired'
    );
  };

  function renderAddCard() {
    const marginBottom = getCardValidation() ? 22 : 0;
    return (
      <View style={style.my10}>
        <View style={style.mb20}>
          <Input
            value={accountNumber}
            label={trans(locale, lang, 'nomorKartu')}
            keyboardType="number-pad"
            message={
              cardValidation === 'kartuTidakValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'nomorKartuPlaceholder')}
            onChangeText={(num) => {
              let value = generateCardNo(num, accountNumber);
              if (num?.length > 19) {
                value = accountNumber;
              }
              setAddCardForm({
                ...addCardForm,
                accountNumber: value,
              });
            }}
          />
        </View>
        <View style={style.addCard.expAndCVV}>
          <View style={style.addCard.expWidth}>
            <Input
              value={expDate}
              keyboardType="number-pad"
              message={
                getCardValidation()
                  ? { error: trans(locale, lang, cardValidation) }
                  : false
              }
              label={trans(locale, lang, 'masaBerlaku')}
              placeholder={trans(locale, lang, 'masaBerlakuPlaceholder')}
              onChangeText={(num) => {
                const expDateValue = formatedCardDate(
                  num,
                  addCardForm?.expDate
                );
                setAddCardForm({
                  ...addCardForm,
                  expDate: expDateValue.value,
                });
                setCardValidation(expDateValue.error);
              }}
            />
          </View>
          <View style={[style.addCard.expWidth, { marginBottom }]}>
            <Input
              value={cvv}
              secureTextEntry
              label={trans(locale, lang, 'CVV')}
              keyboardType="number-pad"
              placeholder={trans(locale, lang, 'CVVPlaceholder')}
              onChangeText={(num) => {
                if (num?.length < 4) {
                  setAddCardForm({
                    ...addCardForm,
                    cvv: num,
                  });
                }
              }}
            />
          </View>
        </View>
        <View style={style.mb10}>
          <Input
            value={cardName}
            label={trans(locale, lang, 'simpanSebagai')}
            message={
              cardValidation === 'kartuTidakValid'
                ? { error: trans(locale, lang, cardValidation) }
                : false
            }
            placeholder={trans(locale, lang, 'namaKartuPlaceholder')}
            onChangeText={(value) => {
              setAddCardForm({
                ...addCardForm,
                cardName: value,
              });
            }}
          />
        </View>
        <Text
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          style={style.my10}>
          <Text color={Color.primary[colorScheme].primary90}>* </Text>
          {trans(locale, lang, 'debitOtomatis')}
        </Text>
        <Text
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}>
          {trans(locale, lang, 'denganMenginput')}{' '}
          <Text
            textStyle="semi"
            onPress={() => {
              navigation.navigate(
                NAVIGATION.LIFESAVER.LifesaverKebijakanPrivasi
              );
            }}
            style={style.mbMin4}
            color={Color.primary[colorScheme].primary90}
            textDecorationLine="underline">
            {trans(locale, lang, 'tAndCPayment')}
          </Text>
        </Text>
      </View>
    );
  }
  function renderCardContent() {
    if (paymentMethod === 1) {
      return renderPaymentList();
    }
    if (paymentMethod === 2) {
      return renderAddCard();
    }
    return null;
  }

  function renderPaymentMethod() {
    const tabs = [
      {
        id: 1,
        label: 'kartuSaya',
      },
      {
        id: 2,
        label: 'tambahkan',
        label2: 'kreditDebit',
      },
    ];

    const isActiveTab = (id) => {
      return paymentMethod === id;
    };

    if (!isPaymentType) {
      return null;
    }

    if (from === 'start') {
      return renderPaymentList();
    }

    return (
      <View>
        <Text style={style.mb16} textStyle="semi">
          {trans(locale, lang, 'pembayaran')}
        </Text>
        <View style={style.paymentMethod.header}>
          {tabs?.map((element) => (
            <TouchableWithoutFeedback
              onPress={() => {
                setPaymentMethod(element.id);
                if (paymentMethod !== element?.id) {
                  setCardValidation(false);
                  setSelectedCard('');
                  setAddCardForm({
                    accountNumber: '',
                    expDate: '',
                    cvv: '',
                    isFill: false,
                  });
                }
              }}
              style={style.paymentMethod.tabWidth}>
              <View style={style.paymentMethod.tabLabel}>
                <Text
                  align="center"
                  color={
                    isActiveTab(element?.id)
                      ? Color.primary[colorScheme].primary90
                      : Color.neutralLifeSaver[colorScheme].neutral20
                  }
                  textStyle={paymentMethod === element.id ? 'semi' : 'medium'}>
                  {trans(locale, lang, element?.label)}
                </Text>
                {element?.label2 ? (
                  <Text
                    align="center"
                    color={
                      isActiveTab(element?.id)
                        ? Color.primary[colorScheme].primary90
                        : Color.neutralLifeSaver[colorScheme].neutral20
                    }
                    textStyle={
                      paymentMethod === element.id ? 'semi' : 'medium'
                    }>
                    {trans(locale, lang, element?.label2)}
                  </Text>
                ) : null}
              </View>
              <View style={style.b0}>
                <HorizontalLine
                  color={
                    paymentMethod === element.id
                      ? Color.primary[colorScheme].primary90
                      : Color.grayLine[colorScheme].color
                  }
                  height={3}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        {renderCardContent()}
      </View>
    );
  }

  function renderOrderTotal() {
    const discountAmount = getProductResponse?.subsPrice - params?.discount;

    const submitStart = () => {
      if (getPaymentMethodResponse?.cards?.length > 0) {
        return doPaymentV2(selectedCard);
      }
      return doPaymentV2();
    };

    const submitEvent = () => {
      if (!isPaymentType) {
        return doPaymentTypeFalse();
      }
      if (discountAmount === 0) {
        return doPayment(true, parseInt(discountAmount, 10));
      }
      return doPayment(false, parseInt(discountAmount, 10));
    };

    const submitBajoRun = () => {
      doPayment(true, 0);
    };

    if (from === 'start') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          subLabel={
            <Text
              textStyle="medium"
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'pembayaranSetiapBulan')}
            </Text>
          }
          buttonLabel={trans(locale, lang, 'startSubscribe')}
          onSubmit={submitStart}
          promo={formatNumber(additionalAmount, lang)}
        />
      );
    }
    if (from === 'downgrade') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          subLabel={
            <View>
              <Text
                style={style.mw330}
                line={20}
                align="right"
                textStyle="medium"
                color={Color.neutral[colorScheme].neutral40}>
                {trans(locale, lang, 'pembayaranSetiapBulanMulai')}{' '}
              </Text>
              <Text align="right" textStyle="semi">
                {formatDate(new Date(getProductResponse?.dueDate), lang, true)}
              </Text>
            </View>
          }
          buttonLabel={trans(locale, lang, 'lanjut')}
          onSubmit={() => {}}
        />
      );
    }
    if (from === 'upgrade') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          subLabel={
            <Text
              style={style.mw330}
              line={20}
              align="right"
              textStyle="medium"
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'kamuAkan')}{' '}
              <Text textStyle="semi">
                {formatNumber(getProductResponse?.subsPrice, lang)}
              </Text>
              /{trans(locale, lang, 'bulanBerlakuMulai')}{' '}
              <Text textStyle="semi">
                {formatDate(new Date(getProductResponse?.dueDate), lang)}
              </Text>
            </Text>
          }
          buttonLabel={trans(locale, lang, 'lanjut')}
          onSubmit={() => {}}
          promo={formatNumber(82667, lang)}
        />
      );
    }
    if (from === 'bajoRun') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          subLabel={
            <Text
              style={style.mw330}
              line={20}
              align="right"
              textStyle="medium"
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'kamuAkan')}{' '}
              <Text textStyle="semi">
                {formatNumber(getProductResponse?.subsPrice)}
              </Text>
              /{trans(locale, lang, 'bulanBerlakuMulai')}{' '}
              <Text textStyle="semi">
                {formatDate(new Date(getProductResponse?.dueDate), lang)}
              </Text>
            </Text>
          }
          buttonLabel={trans(locale, lang, 'lanjut')}
          onSubmit={submitBajoRun}
          promo={trans(locale, lang, 'gratis')}
        />
      );
    }
    if (from === 'event') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          subLabel={
            !isPaymentType ? null : (
              <Text
                style={style.mw330}
                line={20}
                align="right"
                textStyle="medium"
                color={Color.neutral[colorScheme].neutral40}>
                {trans(locale, lang, 'kamuAkan')}{' '}
                <Text textStyle="semi">
                  {formatNumber(getProductResponse?.subsPrice, lang)}
                </Text>
                /{trans(locale, lang, 'bulanBerlakuMulai')}{' '}
                <Text textStyle="semi">
                  {formatDate(new Date(getProductResponse?.dueDate), lang)}
                </Text>
              </Text>
            )
          }
          buttonLabel={
            params?.discount
              ? trans(locale, lang, 'lanjut')
              : trans(locale, lang, 'startSubscribe')
          }
          onSubmit={submitEvent}
          promo={
            discountAmount === 0
              ? trans(locale, lang, 'gratis')
              : formatNumber(discountAmount, lang)
          }
        />
      );
    }
    return null;
  }

  function renderDetailPayment() {
    if (from !== 'start') {
      return null;
    }
    return (
      <View>
        <View style={style.mxMin32}>
          <HorizontalLine
            height={8}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
        </View>
        <View style={style.my16}>
          <View style={style.totalPayment.total}>
            <Text textStyle="semi">
              {trans(locale, lang, 'rincianPembayaran')}
            </Text>
          </View>
          <View style={style.totalPayment.product}>
            <View style={{ flexDirection: 'row' }}>
              <LifesaverText
                planName={getProductResponse?.planName}
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}
              />
              <Text
                textStyle="semi"
                color={Color.primary[colorScheme].primary90}>
                {'* '}
              </Text>
            </View>

            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {formatNumber(getProductResponse?.subsPrice, lang)}
            </Text>
          </View>
          {detailsPayment?.map((element, index) => (
            <View key={element?.id} style={style.totalPayment.listContainer}>
              <View>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {element?.label}
                  {' - '}
                  <Text
                    textStyle="medium"
                    size={Size.text.caption1.size}
                    color={Color.neutralLifeSaver[colorScheme].neutral40}>
                    {element?.color}
                  </Text>
                </Text>
              </View>
              <Text
                textStyle="medium"
                size={Size.text.caption1.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {formatNumber(element?.price?.toString(), lang)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (connectionFailed) {
    return <ConnectionFailed lang={lang} navigation={navigation} />;
  }

  return (
    <Base
      title={trans(locale, lang, 'konfirmasi')}
      isLight
      staticView
      statusBarStyle="light-content"
      statusBarColor={Color.red[colorScheme].D71920}
      headerStyle={style.main.header}
      onBackPress={() => {
        navigation.goBack();
        setIsComingFromScreen({});
      }}>
      <ScrollView>
        <View style={style.main.bgRed} />
        <Padder>
          <View>
            {renderInfoProduct()}
            {renderInfoTunggu()}
            {renderPersonalData()}
            <LifeTagContent
              colorScheme={colorScheme}
              onChange={(item) => {
                setLifetagPickList(item);
              }}
              onChangeAddress={() => {
                setIsComingFromScreen({
                  screen: NAVIGATION.LIFESAVER.LifesaverOrderPage,
                  params: { ...isComingFromScreen?.params },
                });
                navigation.navigate(NAVIGATION.PROFILE.ProfileAddress);
              }}
              onAddPostCode={(value) => {
                setAddPostalCodeKycIdCard({
                  postcode: value,
                });
              }}
              address={
                isComingFromScreen?.params?.selectedAddress
                  ? isComingFromScreen?.params
                  : userAddress
              }
              lang={lang}
              navigation={navigation}
              getLifetagFlagResponse={getLifetagFlagResponse}
              getLifetagProductDetailResponse={getLifetagProductDetailResponse}
            />
            {renderDiscount()}
            {renderPremi()}
            {renderPaymentList()}
            {renderDetailPayment()}
          </View>
        </Padder>
      </ScrollView>
      {renderOrderTotal()}
      <ModalErrorSubmission
        {...props}
        onBackPress={() => {
          navigation.goBack();
        }}
        isVisible={isErrSubsVisible}
        message={errSubsMessage}
      />
    </Base>
  );
}

LifesaverOrderPage.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProduct: PropTypes.func.isRequired,
  getProductClear: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getProductResponse: PropTypes.objectOf(Object).isRequired,
  getPaymentMethodResponse: PropTypes.arrayOf(Array).isRequired,
  getPaymentMethod: PropTypes.func.isRequired,
  getPaymentMethodClear: PropTypes.func.isRequired,
  paymentsAction: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getPaymentStatusClear: PropTypes.func.isRequired,
  setCreateBillClear: PropTypes.func.isRequired,
  setSubmissionResponse: PropTypes.objectOf(Object).isRequired,
  setSubmissionError: PropTypes.objectOf(Object).isRequired,
  setCreateBillError: PropTypes.objectOf(Object).isRequired,
  getPaymentStatusResponse: PropTypes.objectOf(Object).isRequired,
  setSubmission: PropTypes.func.isRequired,
  setPlanCode: PropTypes.string.isRequired,
  getPendingInvites: PropTypes.func.isRequired,
  getPendingInvitesResponse: PropTypes.objectOf(Array).isRequired,
  setInviteeUserId: PropTypes.func.isRequired,
  inviteeUserId: PropTypes.string.isRequired,
  getEligibleSubmissionResponse: PropTypes.objectOf(Object).isRequired,
  setCreateBill: PropTypes.func.isRequired,
  getAddressList: PropTypes.func.isRequired,
  getLifetagProductDetail: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  getLifetagProductDetailResponse: PropTypes.objectOf(Object).isRequired,
  getPendingInvitesFetch: PropTypes.bool.isRequired,
  setSubmissionFetch: PropTypes.bool.isRequired,
  getPaymentMethodFetch: PropTypes.bool.isRequired,
  getProductFetch: PropTypes.bool.isRequired,
  getLifetagFlag: PropTypes.func.isRequired,
  getLifetagFlagResponse: PropTypes.objectOf(Object).isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagProductDetailFailed: PropTypes.objectOf(Object).isRequired,
  getLifetagProductDetailFetch: PropTypes.bool.isRequired,
  kycAction: PropTypes.string.isRequired,
  setAddPostalCodeKycIdCard: PropTypes.func.isRequired,
  getAddressListResponse: PropTypes.objectOf(Array).isRequired,
};

export default LifesaverOrderPage;
