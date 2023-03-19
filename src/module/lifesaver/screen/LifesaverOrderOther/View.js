import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useLayoutEffect,
} from 'react';
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
  Kado,
  KreditNotActive,
  LogoLifesaver,
  LogoLifesaverPlus,
  Information,
  InfoOrange,
  ArrowDown2,
  CameraRed,
  PlusRed,
  Calendar,
} from 'ca-config/Svg';
import {
  regexNumeric,
  useMount,
  regexNameBachelorDegree,
  regexAddress,
  regexBirthPlace,
  regexMobile,
} from 'ca-util/common';
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
  PROPOSAL_STATUS,
  RESPONSE_STATE,
} from 'ca-util/constant';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { formatDate } from 'ca-util/format';
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
import { LogoLifesaverPosWhite } from 'ca-config/Image';
import { useFocusEffect } from '@react-navigation/native';
import {
  SET_KYC_POSTALCODE_IDCARD_FAILED,
  SET_KYC_POSTALCODE_IDCARD_SUCCESS,
} from 'ca-module-kyc/kycConstant';
import { AFLogEvent, AF_OPEN_SUBSCRIBE } from 'ca-util/AppsFlyer';
import { Input, Button } from 'ca-component-generic';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/min/moment-with-locales';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import {
  ModalErrorSubmission,
  ModalInfoStatusRelasi,
  ModalInfoDataNIK,
  ModalUploadKTP,
  ModalPilihRelasi,
} from './components/Modal';
import { LifeTagContent } from './components';
import style from './style';
import locale from './locale';

function LifesaverOrderOther(props) {
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
  // Render Logo
  const productData = {
    lifesaver: {
      logo: <LogoLifesaver />,
    },
    lifesaverplus: {
      logo: <LogoLifesaverPlus />,
    },
    lifesaverpos: {
      logo: (
        <Image source={LogoLifesaverPosWhite} style={style.infoProduct.image} />
      ),
    },
  };
  // Form
  const iconProps = {
    fill: Color.grayIcon.light.grayIcon,
    width: 24,
    height: 24,
  };
  moment.locale(lang);
  const [isFormEdit, setIsFormEdit] = useState(true);
  const defaultFormData = {
    id: uuid.v4(),
    nik: null,
    name: null,
    birthPlace: null,
    birthDate: null,
    address: '',
    phoneNo: '',
    relation: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [recipients, setRecipients] = useState([]);
  function onAddPress() {
    setIsFormEdit(true);
    setFormData(defaultFormData);
  }
  const onSavePress = () => {
    const duplicate = recipients.find((item) => item.id === formData.id);
    if (!duplicate) {
      setRecipients([...recipients, formData]);
    } else {
      const updateRecipients = recipients.map((item) => {
        if (item.id === formData.id) {
          return formData;
        }
        return item;
      });
      setRecipients(updateRecipients);
    }
    setIsFormEdit(false);
  };
  function onDeletePress() {
    const deleteRecipients = recipients.filter(
      (item) => item.id !== formData.id
    );
    setRecipients(deleteRecipients);
    setFormData(defaultFormData);
    setIsFormEdit(false);
  }

  // FORM VALIDATION
  useLayoutEffect(() => {
    setIsValidNik(validateNik(formData?.nik));
    setIsValidPhoneNumber(validatePhoneNumber(formData?.phoneNo));
  }, [formData?.nik, formData?.phoneNo, validateNik, validatePhoneNumber]);
  // - NIK VALIDATION
  const [isValidNik, setIsValidNik] = useState(true);
  const [nikMessage, setNikMessage] = useState(null);
  const validateNik = useCallback(
    (txt) => {
      if (txt?.length < 16) {
        setNikMessage({
          error: trans(locale, lang, 'nikTidakSesuai'),
        });
        return false;
      }
      setNikMessage(null);
      return true;
    },
    [lang]
  );
  // - NAME VALIDATION
  const [isValidName, setValidName] = useState(true);
  const [nameMessage, setNameMessage] = useState(null);
  const validateName = useCallback(
    (txt) => {
      if (txt?.length < 1) {
        setNameMessage({ error: trans(locale, lang, 'mohonPeriksaKembali') });
        return false;
      }
      if (!regexNameBachelorDegree.test(txt)) {
        setNameMessage({ warning: trans(locale, lang, 'mohonPeriksaKembali') });
        return false;
      }
      if (txt?.length > 100) {
        setNameMessage({
          error: trans(locale, lang, 'mohonPeriksaKembali'),
        });
        return false;
      }
      setNameMessage(null);
      return true;
    },
    [lang]
  );
  // - PHONE NUMBER VALIDATION
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState(null);
  const validatePhoneNumber = useCallback(
    (txt) => {
      if (!regexMobile.test(txt) && txt?.length) {
        setPhoneNumberMessage({
          error: trans(locale, lang, 'numberInvalid'),
        });
        return false;
      }
      setPhoneNumberMessage(null);
      return true;
    },
    [lang]
  );

  // Handle isFetching
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [isStartFetch, setIsStartFetch] = useState(false);
  // Payment State
  const [selectedCard, setSelectedCard] = useState('');
  const [alreadySubmit, setAlreadySubmit] = useState(false);
  const [lifetagPickList, setLifetagPickList] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  // Modal Error Submission
  const [isErrSubsVisible, setIsErrSubsVisible] = useState(false);
  const [errSubsMessage, setErrSubsMessage] = useState('');
  const [modalInfoStatus, setModalInfoStatus] = useState(false);
  const [modalInfoNIK, setModalInfoNIK] = useState(false);
  const [modalUploadKTP, setModalUploadKTP] = useState(false);
  const [modalPilihRelasi, setModalPilihRelasi] = useState(false);

  // datepicker handler
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChangeDatePicker = (event, selectedDate) => {
    setShow(!show);
    if (event.type !== 'dismissed') {
      setDate(selectedDate);
      setFormData({
        ...formData,
        birthDate: new Date(selectedDate),
      });
    }
  };
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

  // Memo lifetagContent
  const isCheckLifeTag = useMemo(() => {
    if (lifetagPickList?.length > 0) {
      return true;
    }
    return false;
  }, [lifetagPickList?.length]);
  // Memo getPolicy
  const getPolicy = useMemo(() => {
    return setSubmissionResponse?.policyNo;
  }, [setSubmissionResponse]);
  // Memo Data Personal
  const personalDataApi = useMemo(() => {
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
    setSubmissionResponse?.name,
    setSubmissionResponse?.idCardNo,
    setSubmissionResponse?.dob,
    lang,
  ]);
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
    const qty = recipients.length;
    return parseInt(getProductResponse?.subsPrice, 10) * qty;
  }, [
    getLifetagProductDetailResponse?.data?.product?.discount,
    getLifetagProductDetailResponse?.data?.product?.price,
    getProductResponse?.subsPrice,
    isCheckLifeTag,
    lifetagPickList,
    recipients.length,
  ]);
  // Memo Discount
  const totalDiscount = useMemo(() => {
    let qty = 0;
    lifetagPickList?.forEach((element) => {
      qty += element?.quantity;
    });
    return qty * getLifetagProductDetailResponse?.data?.product?.discount;
  }, [
    getLifetagProductDetailResponse?.data?.product?.discount,
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
  // Memo disabled button
  const isButtonDisabled = useMemo(() => {
    if (alreadySubmit) {
      return alreadySubmit;
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
    return false;
  }, [
    alreadySubmit,
    from,
    isCheckLifeTag,
    isComingFromScreen?.params?.selectedAddress,
    userAddress?.selectedAddress?.postcode,
  ]);

  // useFocusEffect listening from global state
  useFocusEffect(
    useCallback(() => {
      setProductResult(lifesaverAction);
    }, [lifesaverAction, setProductResult])
  );
  useFocusEffect(
    useCallback(() => {
      setPaymentResult(paymentsAction);
    }, [paymentsAction, setPaymentResult])
  );
  useFocusEffect(
    useCallback(() => {
      lifetagResultAction(lifetagAction);
    }, [lifetagAction, lifetagResultAction])
  );
  useFocusEffect(
    useCallback(() => {
      kycResult(kycAction);
    }, [kycAction, kycResult])
  );
  // Handle Loading
  useFocusEffect(
    useCallback(() => {
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
    ])
  );
  // Handle invitee user
  useFocusEffect(
    useCallback(() => {
      if (getPendingInvitesResponse?.listInviting) {
        setInviteeUserId(
          getPendingInvitesResponse?.listInviting[0]?.inviteeUserId
        );
      }
    }, [getPendingInvitesResponse?.listInviting, setInviteeUserId])
  );
  // Handle user address
  useFocusEffect(
    useCallback(() => {
      if (getAddressListResponse?.data) {
        setUserAddress({
          selectedAddress: {
            ...getAddressListResponse?.data?.eKYCAddress,
          },
          name: userData?.name,
          phoneNumber: userData?.mobilePhoneNumber,
        });
      }
    }, [
      getAddressListResponse?.data,
      userData?.mobilePhoneNumber,
      userData?.name,
    ])
  );

  // useEffect
  // On Focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCreateBillClear();
    });
    return unsubscribe;
  }, [navigation, setCreateBillClear]);
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

  // useCallback
  // Callback kyc
  const kycResult = useCallback(
    (act) => {
      if (act === SET_KYC_POSTALCODE_IDCARD_SUCCESS) {
        getAddressList();
      }
      if (act === SET_KYC_POSTALCODE_IDCARD_FAILED) {
        Alert.alert(trans(locale, lang, 'gagalMenambahkanPostalCode'));
      }
      return null;
    },
    [getAddressList, lang]
  );
  // Callback Lifetag
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
      return null;
    },
    [getLifetagProductDetailFailed?.message]
  );
  // Callback lifesaver
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
  // Callback payment
  const setPaymentResult = useCallback(
    (act) => {
      if (act === GET_PAYMENT_METHOD_SUCCESS) {
        if (getPaymentMethodResponse?.cards?.length > 0 && from === 'start') {
          setSelectedCard(getPaymentMethodResponse?.cards[0]?.paymentAccount);
        }
      }
      if (act === SET_CREATE_BILL_SUCCESS) {
        setAlreadySubmit(false);
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
      navigation,
      setCreateBillClear,
      setCreateBillError?.message,
    ]
  );
  // Do Payment Versi 2
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
                {` ${getProductResponse?.waitingPeriodeInHours
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
                {` ${getProductResponse?.waitingPeriodeInHours?.INCIDENT_WAITING /
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
            <View
              key={element?.inviteeUserId}
              style={style.invitation.cardListContainer}>
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

  function renderOrderTotal() {
    const submitStart = () => {
      if (getPaymentMethodResponse?.cards?.length > 0) {
        return doPaymentV2(selectedCard);
      }
      return doPaymentV2();
    };

    if (from === 'start') {
      return (
        <LifesaverOrderTotal
          colorScheme={colorScheme}
          lang={lang}
          getProduct={getProductResponse}
          isDisabled={isButtonDisabled}
          buttonLabel={trans(locale, lang, 'startSubscribe')}
          onSubmit={submitStart}
          promo={formatNumber(additionalAmount, lang)}
          discount={totalDiscount}
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
          onSubmit={() => { }}
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
          onSubmit={() => { }}
          promo={formatNumber(82667, lang)}
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
            <View style={style.row}>
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
          {detailsPayment?.map((element) => (
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
              <View style={style.row}>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  style={style.mR7}
                  textDecorationLine="line-through"
                  textDecorationStyle="solid"
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {formatNumber(
                    getLifetagProductDetailResponse?.data?.product?.price *
                    element?.quantity,
                    lang
                  )}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {formatNumber(element?.price?.toString(), lang)}
                </Text>
              </View>
            </View>
          ))}
          <View style={style.totalPayment.product}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {trans(locale, lang, 'diskon')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              - {formatNumber(totalDiscount, lang)}
            </Text>
          </View>
          <Text
            style={style.mt10}
            textStyle="semi"
            color={Color.primary[colorScheme].primary90}>
            *
            <Text
              textStyle="mediumItalic"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {trans(locale, lang, 'pembayaranSetiapBulan')}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  function renderLifeTagContent() {
    return (
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
        getLifetagFlagResponse={getLifetagFlagResponse}
        getLifetagProductDetailResponse={getLifetagProductDetailResponse}
      />
    );
  }

  function recipientCard(data) {
    const renderRecipientItem = ({ title, values }) => {
      return (
        <View style={style.receipentCard.item}>
          <Text
            size={Size.text.caption1.size}
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}>
            {title}
          </Text>
          <Text
            size={Size.text.caption1.size}
            textStyle="semi"
            line={18}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}>
            {values}
          </Text>
        </View>
      );
    };
    return (
      <>
        <Shadow borderRadius={16}>
          <View style={style.receipentCard.shadow}>
            {renderRecipientItem({ title: 'NIK', values: data?.nik })}
            {renderRecipientItem({ title: 'Nama Lengkap', values: data?.name })}
            {renderRecipientItem({
              title: 'Status Relasi',
              values: data?.relation?.label,
            })}
            <TouchableOpacity
              onPress={() => {
                setIsFormEdit(true);
                setFormData(data);
              }}
              style={style.receipentCard.edit}>
              <Text
                color={Color.primary.light.primary90}
                size={Size.text.body2.size}
                textStyle="semi">
                {trans(locale, lang, 'Ubah')}
              </Text>
            </TouchableOpacity>
          </View>
        </Shadow>
        <View style={style.mb10} />
      </>
    );
  }

  function renderRecipientLimit() {
    return (
      <View style={style.recipientLimit.container}>
        <InfoOrange width={25} height={25} style={style.mr5} />
        <Text
          size={Size.text.caption1.size}
          textStyle="semi"
          line={18}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'invitationLimit')}
        </Text>
      </View>
    );
  }

  function recipientForm() {
    const duplicate = recipients.find((item) => item.id === formData.id);
    return (
      <Shadow borderRadius={16}>
        <View style={style.personalData.shadow}>
          <View style={style.mb16}>
            <Input
              allowFontScaling={false}
              message={nikMessage}
              value={formData?.nik}
              keyboardType="number-pad"
              placeholder="Contoh: 1234567890123456"
              label={trans(locale, lang, 'NIK')}
              secondLabel={
                <>
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, '*')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalInfoNIK(true)}
                    style={style.pl8}>
                    <Information width={20} height={20} />
                  </TouchableOpacity>
                </>
              }
              suffixIcon={<CameraRed width={22} height={22} />}
              handleSuffixIcon={() => setModalUploadKTP(true)}
              onChangeText={(txt) => {
                setFormData({
                  ...formData,
                  nik: txt.replace(regexNumeric, ''),
                });
                setIsValidNik(validateNik(txt));
              }}
            />
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              message={nameMessage}
              value={formData?.name}
              placeholder="Contoh: John Doe"
              label={trans(locale, lang, 'Nama Lengkap')}
              secondLabel={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {trans(locale, lang, '*')}
                </Text>
              }
              onChangeText={(txt) => {
                setFormData({
                  ...formData,
                  name: txt,
                });
                setValidName(validateName(txt));
              }}
            />
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              value={formData?.birthPlace}
              placeholder="Contoh: Jakarta"
              label={trans(locale, lang, 'Tempat Lahir')}
              secondLabel={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {trans(locale, lang, '*')}
                </Text>
              }
              onChangeText={(txt) => {
                setFormData({
                  ...formData,
                  birthPlace: txt.replace(regexBirthPlace, ''),
                });
              }}
            />
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              suffixIcon={<Calendar {...iconProps} />}
              // date && formData?.birthDate ? date : ''
              value={
                date && formData?.birthDate
                  ? moment(date).format('DD MMM YYYY')
                  : ''
              }
              editable={false}
              pressable
              placeholder="DD / MM / YYYY"
              label={trans(locale, lang, 'Tanggal Lahir')}
              secondLabel={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {trans(locale, lang, '*')}
                </Text>
              }
              handleSuffixIcon={() => setShow(true)}
              onInputPress={() => {
                setShow(true);
              }}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                maximumDate={new Date()}
                mode="date"
                display="spinner"
                is24Hour
                textColor={Color.primary.light.primary90}
                accentColor={Color.primary.light.primary90}
                onChange={onChangeDatePicker}
              />
            )}
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              value={formData?.address}
              placeholder="Contoh: jl. Jalan Ke Desa Penari"
              label={trans(locale, lang, 'Alamat Sesuai KTP')}
              secondLabel={
                <Text
                  color={Color.primary.light.primary90}
                  size={Size.text.body2.size}
                  textStyle="semi">
                  {trans(locale, lang, '*')}
                </Text>
              }
              onChangeText={(txt) => {
                setFormData({
                  ...formData,
                  address: txt.replace(regexAddress, ''),
                });
              }}
            />
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              message={phoneNumberMessage}
              value={formData?.phoneNo}
              placeholder="Contoh: 085757000000"
              keyboardType="number-pad"
              label={trans(locale, lang, 'Nomor HP Penerima')}
              onChangeText={(txt) => {
                setFormData({
                  ...formData,
                  phoneNo: txt,
                });
                setIsValidPhoneNumber(validatePhoneNumber(txt));
              }}
            />
            <View style={style.mb16} />
            <Input
              allowFontScaling={false}
              // message={nameMessage}
              value={formData?.relation?.label}
              editable={false}
              pressable
              placeholder="-- Pilih Status Relasi --"
              label={trans(locale, lang, 'Pilih Status Relasi')}
              secondLabel={
                <>
                  <Text
                    color={Color.primary.light.primary90}
                    size={Size.text.body2.size}
                    textStyle="semi">
                    {trans(locale, lang, '*')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalInfoStatus(true)}
                    style={style.pl8}>
                    <Information width={20} height={20} />
                  </TouchableOpacity>
                </>
              }
              suffixIcon={<ArrowDown2 width={15} height={15} />}
              onInputPress={() => {
                setModalPilihRelasi(true);
              }}
            />
            <ModalPilihRelasi
              isVisible={modalPilihRelasi}
              value={formData?.relation}
              options={[
                {
                  key: '1',
                  value: '1',
                  label: 'Suami/Istri',
                },
                {
                  key: '2',
                  value: '2',
                  label: 'Anak',
                },
                {
                  key: '3',
                  value: '3',
                  label: 'Saudara',
                },
                {
                  key: '4',
                  value: '4',
                  label: 'Rekan Kerja/Teman',
                },
              ]}
              onRequestClose={() => setModalPilihRelasi(false)}
              onClosePress={() => setModalPilihRelasi(false)}
              onSubmit={(txt) => {
                setFormData({
                  ...formData,
                  relation: txt,
                });
                setModalPilihRelasi(false);
              }}
              {...props}
            />
          </View>
          <View style={style.personalData.actionBtnContainer}>
            {duplicate ? (
              <Button
                width={110}
                height={40}
                color={Color.whiteCard.dark.color}
                titleColor={Color.primary.light.primary90}
                style={style.delBtn}
                onPress={() => onDeletePress()}>
                {trans(locale, lang, 'Hapus')}
              </Button>
            ) : (
              <View />
            )}
            <Button
              disabled={
                !formData.nik ||
                !formData.name ||
                !formData.birthPlace ||
                !formData.birthDate ||
                !formData.address ||
                !formData.relation ||
                !isValidNik ||
                !isValidPhoneNumber ||
                !isValidName
              }
              width={110}
              height={40}
              onPress={() => onSavePress()}
              type="linear-gradient">
              {trans(locale, lang, 'Simpan')}
            </Button>
          </View>
        </View>
      </Shadow>
    );
  }

  function renderRecipienSection() {
    return (
      <View style={style.mt16}>
        <View style={style.recipientSection.titleContainer}>
          <Kado width={28} height={28} style={style.mr16} />
          <View style={style.fS1}>
            <Text>{trans(locale, lang, 'beliProteksi')}</Text>
          </View>
        </View>
        <View style={style.personalData.header}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {trans(locale, lang, 'Data Penerima')}
          </Text>
        </View>
        {!isFormEdit && !recipients.length === 0 ? (
          <>
            {recipients?.map((item) => recipientCard(item))}
            <TouchableOpacity
              onPress={() => onAddPress()}
              style={style.recipientSection.rowContainer}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                color={Color.primary.light.primary90}>
                Tambah Penerima
              </Text>
              <PlusRed style={style.ml10} />
            </TouchableOpacity>
            {recipients?.length < 5 ? renderRecipientLimit() : null}
          </>
        ) : (
          recipientForm()
        )}

        <View style={style.personalData.breakLine}>
          <HorizontalLine
            height={8}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
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
            {renderRecipienSection()}
            {/* {renderPersonalData()} */}
            {/* {renderLifeTagContent()} */}
            {renderDiscount()}
            {renderPremi()}
            {renderPaymentList()}
            {renderDetailPayment()}
          </View>
        </Padder>
      </ScrollView>
      {renderOrderTotal()}
      {/* <ModalErrorSubmission
        {...props}
        onBackPress={() => {
          navigation.goBack();
        }}
        isVisible={isErrSubsVisible}
        message={errSubsMessage}
      /> */}
      <ModalInfoStatusRelasi
        isVisible={modalInfoStatus}
        onRequestClose={() => setModalInfoStatus(false)}
        onClosePress={() => setModalInfoStatus(false)}
        {...props}
      />
      <ModalInfoDataNIK
        isVisible={modalInfoNIK}
        onRequestClose={() => setModalInfoNIK(false)}
        onClosePress={() => setModalInfoNIK(false)}
        {...props}
      />
      <ModalUploadKTP
        isVisible={modalUploadKTP}
        onRequestClose={() => setModalUploadKTP(false)}
        onClosePress={() => setModalUploadKTP(false)}
        onCameraPress={() => {
          setModalUploadKTP(false);
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverUploadKTPCam);
        }}
        onGalleryPress={() => {
          setModalUploadKTP(false);
          ImagePicker.openPicker({
            compressImageQuality: 0.65,
            mediaType: 'photo',
            forceJpg: true,
          })
            .then(() => { })
            .catch(() => { });
        }}
        {...props}
      />
    </Base>
  );
}

LifesaverOrderOther.propTypes = {
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
  getPaymentMethodResponse: PropTypes.objectOf(Array).isRequired,
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
  setPlanCode: PropTypes.func.isRequired,
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

export default LifesaverOrderOther;
