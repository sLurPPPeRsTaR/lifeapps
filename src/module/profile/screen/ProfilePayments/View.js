import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import {
  Warning,
  Delete,
  MoreIconLightGrey,
  MoreIconRed,
  ArrowRight2,
} from 'ca-config/Svg';
import { BackgrounSubscription, CreditCard } from 'ca-config/Image';
import Shadow from 'ca-component-container/Shadow';
import { NAVIGATION, TOAST } from 'ca-util/constant';
import {
  // GET_PAYMENT_METHOD,
  GET_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_METHOD_FAILED,
  DELETE_PAYMENT_METHOD,
  DELETE_PAYMENT_METHOD_FAILED,
  DELETE_PAYMENT_METHOD_SUCCESS,
  ORDER_PAYMENT_METHOD,
  ORDER_PAYMENT_METHOD_SUCCESS,
  ORDER_PAYMENT_METHOD_FAILED,
  SET_CREATE_BILL,
  SET_CREATE_BILL_SUCCESS,
  SET_CREATE_BILL_FAILED,
} from 'ca-module-payments/paymentsConstant';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import locale from './locale';
import style from './style';
import ModalDelete from './components/ModalDelete';
import ModalOrder from './components/ModalOrder';

function ProfilePayments(props) {
  const {
    navigation,
    lang,
    colorScheme,
    // lifesaverAction,
    paymentAction,
    getPaymentMethod,
    // getPaymentMethodClear,
    getPaymentMethodResponse,
    deletePaymentMethod,
    orderPaymentMethod,
    userId,
    setLoading,
    setToastMsg,
    alreadySetPin,
    alreadyKYC,
    // isComingFromScreen,
    setIsComingFromScreen,
    isComingFromDeepLink,
    setIsComingFromDeepLink,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [disableDelete, setDisableDelete] = useState(false);
  const [tempPaymentList, setTempPaymentList] = useState([]);

  const preventUserNotLogin = useCallback(() => {
    if (isComingFromDeepLink && userId === '') {
      setLoading(false);
      setIsComingFromScreen({
        screen: NAVIGATION.PROFILE.ProfilePayments,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
      });
    }
  }, [
    isComingFromDeepLink,
    navigation,
    setIsComingFromScreen,
    setLoading,
    userId,
  ]);
  // HANDLE DEEPLINK
  useFocusEffect(() => {
    preventUserNotLogin();
  });

  // CARD LIST - ORDER
  useEffect(() => {
    setPaymentList(getPaymentMethodResponse?.cards || []);
  }, [getPaymentMethodResponse, setPaymentList]);

  // MODAL
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  // POPUP MENU
  const [isPopup, setIsPopup] = useState(false);

  const getPayment = useCallback(() => {
    return getPaymentMethod({
      companyId: 'ifg-life',
      accountId: userId,
    });
  }, [getPaymentMethod, userId]);

  const onPressNotKyc = useCallback(() => {
    setIsComingFromScreen({
      screen: NAVIGATION.PROFILE.ProfilePayments,
    });
    if (!alreadyKYC && !alreadySetPin) {
      return navigation.navigate(NAVIGATION.KYC.KycMain);
    }
    return navigation.navigate(NAVIGATION.KYC.KycCreatePin);
  }, [alreadyKYC, alreadySetPin, navigation, setIsComingFromScreen]);

  useEffect(() => {
    const goTo = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'TabMain' }, { name: 'ProfileMain' }],
        })
      );
      navigation.navigate(NAVIGATION.PROFILE.ProfileMain);
      setIsComingFromDeepLink(false);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromDeepLink]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setTimeout(() => {
        getPayment();
      }, 5000);
    }, [getPayment, setLoading])
  );

  useEffect(() => {
    onPaymentActionChange(paymentAction);
  }, [onPaymentActionChange, paymentAction]);

  const onPaymentActionChange = useCallback(
    (act) => {
      // GET PAYMENTS
      // if (act === GET_PAYMENT_METHOD) {
      //   setLoading(true);
      // }
      if (act === GET_PAYMENT_METHOD_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
          if (isComingFromDeepLink) {
            navigation.navigate(NAVIGATION.PROFILE.ProfileAddPayment);
          }
        }, 1000);
      }
      if (act === GET_PAYMENT_METHOD_FAILED) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        if (alreadyKYC) {
          setToastMsg({
            type: TOAST.type.error,
            text1: trans(locale, lang, 'failGetPayment'),
          });
        }
      }
      // DELETE PAYMENT
      if (act === DELETE_PAYMENT_METHOD) {
        setLoading(true);
      }
      if (act === DELETE_PAYMENT_METHOD_SUCCESS) {
        getPayment();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setDeleteModal(false);
        setDisableDelete(false);
      }
      if (act === DELETE_PAYMENT_METHOD_FAILED) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setDeleteModal(false);
        setToastMsg({
          type: TOAST.type.error,
          text1: trans(locale, lang, 'failDelPayment'),
        });
        setDisableDelete(false);
      }
      // CREATE PAYMENT
      if (act === SET_CREATE_BILL) {
        setLoading(true);
      }
      if (act === SET_CREATE_BILL_SUCCESS) {
        getPayment();
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
      if (act === SET_CREATE_BILL_FAILED) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setToastMsg({
          type: TOAST.type.error,
          text1: trans(locale, lang, 'failAddPayment'),
        });
      }
      // ORDER PAYMENT
      if (act === ORDER_PAYMENT_METHOD) {
        setLoading(true);
      }
      if (act === ORDER_PAYMENT_METHOD_SUCCESS) {
        getPayment();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setOrderModal(false);
        setSelectedCard(null);
      }
      if (act === ORDER_PAYMENT_METHOD_FAILED) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setToastMsg({
          type: TOAST.type.error,
          text1: trans(locale, lang, 'failChgPayment'),
        });
      }
    },
    [
      setLoading,
      isComingFromDeepLink,
      navigation,
      alreadyKYC,
      setToastMsg,
      lang,
      getPayment,
    ]
  );

  const onChangeOrder = useCallback(
    (val) => {
      const temp = val.cardOrder;
      const arr = [];
      paymentList.map((item) => {
        arr.push({
          order: item.cardOrder,
          paymentAccountId: item.paymentAccount,
        });
      });
      const swap = arr.map((item) => {
        if (item.order === 0) return { ...item, order: temp };
        if (item.order === temp) return { ...item, order: 0 };
        return item;
      });
      setTempPaymentList(swap);
      setOrderModal(true);
    },
    [paymentList]
  );

  const PaymentItem = useCallback(
    ({
      item,
      name,
      subtitle,
      paymentAccountId,
      // image,
      // onPress,
      // deleted,
      isPrimary,
    }) => {
      const selectedItem = selectedCard === paymentAccountId;
      return (
        <View style={[style.paymentMethod.listItem]}>
          {editMode && !isPrimary ? (
            <TouchableOpacity
              style={style.paymentMethod.deleteContainer}
              onPress={() => {
                setDeleteModal(true);
                setSelectedCard(paymentAccountId);
              }}>
              <Delete />
            </TouchableOpacity>
          ) : null}
          <Image source={CreditCard} style={style.creditCard} />
          <View style={style.paymentMethod.titleContainer}>
            <Text
              textStyle="semi"
              line={26}
              color={Color.neutral[colorScheme].neutral90}
              size={Size.text.body2.size}>
              {name}
            </Text>
            {subtitle ? (
              <Text
                textStyle="semi"
                color={Color.neutral[colorScheme].neutral10}
                size={Size.text.caption2.size}>
                {subtitle.replace(/X/g, '*')}
              </Text>
            ) : null}
          </View>
          {isPrimary ? (
            <View style={style.paymentMethod.badge}>
              <Text
                textStyle="semi"
                color={Color.primary[colorScheme].primary90}
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'utama')}
              </Text>
            </View>
          ) : null}
          {editMode && selectedItem && isPopup ? (
            <Shadow borderRadius={10} style={style.paymentMethod.optionMenu}>
              <TouchableOpacity
                style={style.p13}
                onPress={() => onChangeOrder(item)}>
                <Text
                  textStyle="semi"
                  color={Color.neutral[colorScheme].neutral90}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'applyMain')}
                </Text>
              </TouchableOpacity>
            </Shadow>
          ) : null}
          {!isPrimary && editMode ? (
            <TouchableOpacity
              onPress={() => {
                setSelectedCard(paymentAccountId);
                setIsPopup(!isPopup);
              }}
              style={style.paymentMethod.moreContainer}>
              {selectedItem && isPopup ? (
                <MoreIconRed />
              ) : (
                <MoreIconLightGrey />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      );
    },
    [selectedCard, editMode, colorScheme, lang, isPopup, onChangeOrder]
  );

  function renderPaymentMethodSection() {
    return (
      <Padder>
        <View style={style.paymentMethod.container}>
          <Text
            textStyle="semi"
            color={Color.neutralLifeSaver[colorScheme].neutral90}
            size={Size.text.body2.size}>
            {trans(locale, lang, 'paymentMethod')}
          </Text>
          {paymentList.length > 1 ? (
            <TouchableOpacity
              onPress={() => setEditMode(!editMode)}
              style={style.paymentMethod.editBtnContainer}>
              <Text
                textStyle="semi"
                color={Color.primary[colorScheme].primary90}
                size={Size.text.body2.size}>
                {editMode
                  ? trans(locale, lang, 'selesai')
                  : trans(locale, lang, 'ubah')}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          textStyle="medium"
          line={18}
          color={Color.neutralLifeSaver[colorScheme].neutral60}
          size={Size.text.caption1.size}>
          {paymentList.length > 0
            ? trans(locale, lang, 'metodePembayaranUtamaBerbeda')
            : trans(locale, lang, 'belumAdaMetode')}
        </Text>

        {paymentList.length > 0 ? (
          <>
            <Shadow borderRadius={16} style={style.mv10}>
              <Padder>
                {paymentList.map((item, index) => {
                  return (
                    <PaymentItem
                      item={item}
                      paymentAccountId={item.paymentAccount}
                      name={item.paymentLabel}
                      subtitle={item.cardNo}
                      isPrimary={index === 0}
                      key={item.cardNo}
                    />
                  );
                })}
                {/* <FlatList
                  data={paymentList}
                  renderItem={({ item, index }) => (
                    <PaymentItem
                      item={item}
                      paymentAccountId={item.paymentAccount}
                      name={item.paymentLabel}
                      subtitle={item.cardNo}
                      isPrimary={index === 0}
                    />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                /> */}
              </Padder>
            </Shadow>
            <View style={style.paymentMethod.warningContainer}>
              <View style={style.mr8}>
                <Warning width={22} height={22} />
              </View>
              <View style={style.paymentMethod.warningTextContainer}>
                <Text
                  textStyle="semi"
                  color={Color.neutralLifeSaver[colorScheme].neutral90}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'metodePembayaranKamuAkan')}
                </Text>
              </View>
            </View>
          </>
        ) : null}
      </Padder>
    );
  }

  const AddPaymentSection = useCallback(() => {
    return (
      <Padder>
        <View style={style.addPayment.container}>
          <Text
            textStyle="semi"
            color={Color.neutralLifeSaver[colorScheme].neutral90}
            size={Size.text.body2.size}>
            {trans(locale, lang, 'addMethod')}
          </Text>
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.body2.size}>
            {trans(locale, lang, 'creditCard')}
          </Text>
        </View>
        <Shadow borderRadius={16}>
          <TouchableOpacity
            onPress={() => {
              if (!alreadyKYC) {
                onPressNotKyc();
              } else {
                navigation.navigate(NAVIGATION.PROFILE.ProfileAddPayment);
              }
            }}>
            <Padder>
              <View style={[style.paymentMethod.listItem]}>
                <Image source={CreditCard} style={style.creditCard} />
                <View style={style.paymentMethod.titleContainer}>
                  <Text
                    textStyle="semi"
                    line={20}
                    color={Color.neutral[colorScheme].neutral90}
                    size={Size.text.body2.size}>
                    {trans(locale, lang, 'creditCardOrDebit')}
                  </Text>
                  <Text
                    textStyle="semi"
                    color={Color.neutral[colorScheme].neutral10}
                    size={Size.text.caption1.size}>
                    {trans(locale, lang, 'visaNMastercard')}
                  </Text>
                </View>
                <ArrowRight2 />
              </View>
            </Padder>
          </TouchableOpacity>
        </Shadow>
      </Padder>
    );
  }, [alreadyKYC, colorScheme, lang, navigation, onPressNotKyc]);

  const Divider = useCallback(() => {
    return <View style={style.divider} />;
  }, []);

  function renderCustCare() {
    return (
      <View style={style.custCare}>
        <Text
          size={Size.text.caption2.size}
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          textStyle="semi">
          {trans(locale, lang, 'butuhBantuan')}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
          }}>
          <Text
            size={Size.text.caption2.size}
            color={Color.primary[colorScheme].primary90}
            textStyle="semi">
            {trans(locale, lang, 'customerCare')}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'headerTitle')}
      bordered
      onBackPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'TabMain' }, { name: 'ProfileMain' }],
          })
        );
        navigation.navigate(NAVIGATION.PROFILE.ProfileMain);
        setIsComingFromDeepLink(false);
      }}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}>
      {renderPaymentMethodSection()}
      <Divider />

      <AddPaymentSection />
      {renderCustCare()}
      <View style={style.backgroundBottom}>
        <Image
          style={{ width: Size.screen.width }}
          source={BackgrounSubscription}
        />
      </View>
      {/* MODAL */}
      <ModalDelete
        isVisible={deleteModal}
        lang={lang}
        locale={locale}
        disableDelete={disableDelete}
        onBackPress={() => setDeleteModal(false)}
        onDeletePress={() => {
          setDisableDelete(true);
          deletePaymentMethod({
            paymentAccountId: selectedCard,
            applicationId: 'customerapps-mobile',
          });
        }}
      />
      <ModalOrder
        isVisible={orderModal}
        lang={lang}
        locale={locale}
        onCancelPress={() => setOrderModal(false)}
        onConfirmPress={() => {
          orderPaymentMethod({
            accounts: tempPaymentList,
            applicationId: 'customerapps-mobile',
          });
        }}
      />
    </Base>
  );
}

export default ProfilePayments;

ProfilePayments.propTypes = {
  userId: PropTypes.string.isRequired,
  paymentAction: PropTypes.string.isRequired,
  getPaymentMethod: PropTypes.func.isRequired,
  deletePaymentMethod: PropTypes.func.isRequired,
  orderPaymentMethod: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getPaymentMethodResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  // getPaymentMethodClear: PropTypes.func.isRequired,
  alreadySetPin: PropTypes.bool.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  isComingFromDeepLink: PropTypes.bool.isRequired,
  setIsComingFromDeepLink: PropTypes.func.isRequired,
};
