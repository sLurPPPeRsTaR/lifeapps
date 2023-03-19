import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Image,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import moment from 'moment/min/moment-with-locales';
import Size from 'ca-config/Size';
import { NAVIGATION, RESPONSE_STATE, TOAST } from 'ca-util/constant';
import DeviceInfo from 'react-native-device-info';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import Base15 from 'ca-component-container/Base15';
import Dash from 'react-native-dash';
import {
  BackgroundGradientSquare,
  BackgroundGradientTablet,
  // eslint-disable-next-line no-unused-vars
  LifetagDelete,
  LifetagRedPlus,
  PinLoc,
} from 'ca-config/Svg';
import { formatCurrency } from 'ca-util/numbro';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Shadow from 'ca-component-container/Shadow';
import LinearGradient from 'react-native-linear-gradient';
import {
  GET_ADDRESS_LIST_FAILED,
  GET_ADDRESS_LIST_SUCCESS,
} from 'ca-module-profile/profileConstant';
import { formatCapitalizeEachWord } from 'ca-util/format';
import {
  GET_LIFETAG_PRODUCT_DETAIL_FAILED,
  GET_LIFETAG_PRODUCT_DETAIL_SUCCESS,
  SET_LIFETAG_CREATE_ORDER_FAILED,
  SET_LIFETAG_CREATE_ORDER_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import BottomSheet from 'ca-component-container/BottomSheet';
import { LifetagHookDisable, LifetagWordWhite } from 'ca-config/Image';
import _ from 'lodash';
import style from './style';
import locale from './locale';

function LifetagConfirmation(props) {
  const {
    navigation,
    lang,
    colorScheme,
    userData,
    setLoading,
    width,
    route: { params },
    profileAction,
    getAddressListFailed,
    getAddressListClear,
    getAddressList,
    getLifetagProductDetail,
    getLifetagProductDetailResponse,
    getLifetagProductDetailFailed,
    lifetagAction,
    setIsComingFromScreen,
    setLifetagCreateOrderResponse,
    setLifetagCreateOrder,
    setLifetagCreateOrderFailed,
    isComingFromScreen,
    getAddressListResponse,
    setLifetagOrderNoResponse,
    setToastMsg,
    toastMsg,
  } = props;

  moment.locale(lang);
  const insets = useSafeAreaInsets();

  const [tempProduct, setTempProduct] = useState([]);
  const [isLifetagColorModalVisible, setLifetagColorModalVisible] =
    useState(false);
  const [lifetagColor, setLifetagColor] = useState(
    getLifetagProductDetailResponse?.data?.product?.colourList[0]?.codeList[0]
  );
  const [colorName, setColorName] = useState(
    getLifetagProductDetailResponse?.data?.product?.colourList[0]?.name
  );
  const [lifetagQty, setLifetagQty] = useState(1);
  const [lifetagColorId, setlifetagColorId] = useState(
    getLifetagProductDetailResponse?.data?.product?.colourList[0]?.id
  );
  const [isStockOutModal, setIsStockOutModal] = useState(false);

  useEffect(() => {
    const goTo = () => {
      setTempProduct([]);
      setIsComingFromScreen({});
      setToastMsg({});
      navigation.pop();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromScreen, setToastMsg]);

  useEffect(() => {
    setLoading(true);
    getAddressList();
    getLifetagProductDetail({
      id: '7771ea34-24fc-4744-aae8-6850899a1d6d',
      lang,
    });
    setTempProduct(params?.data);
  }, [getAddressList, getLifetagProductDetail, lang, params, setLoading]);

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  const lifetagResultAction = useCallback(
    (act) => {
      setLoading(false);
      // eslint-disable-next-line no-empty
      if (act === GET_LIFETAG_PRODUCT_DETAIL_SUCCESS) {
      }
      if (act === GET_LIFETAG_PRODUCT_DETAIL_FAILED) {
        if (
          getLifetagProductDetailFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert(getLifetagProductDetailFailed?.message);
        }
      }
      if (act === SET_LIFETAG_CREATE_ORDER_SUCCESS) {
        navigation.navigate(NAVIGATION.PAYMENTS.Payments3DS, {
          isFromLifeTag: true,
          url: setLifetagCreateOrderResponse?.data?.payment?.redirectUrl,
          invoiceId: setLifetagCreateOrderResponse?.data?.invoiceId,
          reffNo: setLifetagCreateOrderResponse?.data?.payment?.reffNo,
          eventId: setLifetagCreateOrderResponse?.data?.payment?.eventCode,
        });
      }
      if (act === SET_LIFETAG_CREATE_ORDER_FAILED) {
        if (
          setLifetagCreateOrderFailed?.message !==
          RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          if (setLifetagCreateOrderFailed?.message === 'OUT_OF_STOCK') {
            setIsStockOutModal(true);
          } else {
            Alert.alert(setLifetagCreateOrderFailed?.message);
          }
        }
      }
    },
    [
      getLifetagProductDetailFailed?.message,
      navigation,
      setLifetagCreateOrderFailed?.message,
      setLifetagCreateOrderResponse?.data?.invoiceId,
      setLifetagCreateOrderResponse?.data?.payment?.eventCode,
      setLifetagCreateOrderResponse?.data?.payment?.redirectUrl,
      setLifetagCreateOrderResponse?.data?.payment?.reffNo,
      setLoading,
    ]
  );

  useEffect(() => {
    profileResult(profileAction);
  }, [profileAction, profileResult]);

  const profileResult = useCallback(
    (act) => {
      setLoading(false);
      if (act === GET_ADDRESS_LIST_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_ADDRESS_LIST_FAILED) {
        setLoading(false);
        if (
          getAddressListFailed?.message !== RESPONSE_STATE.INTERNAL_SERVER_ERROR
        ) {
          Alert.alert('Warning', getAddressListFailed?.message);
        }
        getAddressListClear();
      }
    },
    [getAddressListClear, getAddressListFailed?.message, setLoading]
  );

  const paymentTotalDiscount = useMemo(() => {
    return tempProduct.reduce((acc, i) => acc + i.totalDiscount, 0);
  }, [tempProduct]);

  const paymentTotalPrice = useMemo(() => {
    return tempProduct.reduce((acc, i) => acc + i.totalPrice, 0);
  }, [tempProduct]);

  const isRedBorder = useMemo(() => {
    if (!_.isEmpty(toastMsg)) {
      return {
        borderWidth: 1,
        borderColor: Color.primary.light.primary90,
        borderRadius: 16,
      };
    }
    return null;
  }, [toastMsg]);

  function renderBackgroundHeaderImage() {
    if (DeviceInfo.isTablet()) {
      return (
        <View
          style={[
            style.backgroundContainer,
            {
              top: -90 + insets.top,
            },
          ]}>
          <BackgroundGradientTablet width={width + 400} height={205} />
        </View>
      );
    }
    return (
      <View
        style={[
          style.backgroundContainer,
          {
            top: -230 + insets.top,
          },
        ]}>
        <BackgroundGradientSquare width={width + 400} height={330} />
      </View>
    );
  }

  function renderInfoProduct() {
    return (
      <Padder>
        <Shadow borderRadius={24} style={style.mB32}>
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
            <View style={style.renderInfoProduct.linearLabel}>
              <Image
                source={LifetagWordWhite}
                style={style.renderInfoProduct.logo}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
          <View style={style.renderInfoProduct.productListContainer}>
            {tempProduct?.map((item, index) => {
              const paddingStyle = index === 0 ? 17 : 12;

              return (
                <View
                  style={{
                    paddingTop: paddingStyle,
                  }}>
                  <View
                    key={item?.productId}
                    style={style.renderInfoProduct.container}>
                    <View style={style.renderInfoProduct.cardContainer}>
                      <Image
                        source={{ uri: item?.lifetagProductImg }}
                        style={style.renderInfoProduct.imgProduct}
                      />
                      <View style={style.flex}>
                        <View style={style.renderInfoProduct.productName}>
                          <Text>{item?.productName}</Text>
                          {/* <View
                            style={[
                              {
                                backgroundColor: item?.lifetagColor,
                              },
                              style.renderInfoProduct.productColor,
                            ]}
                          /> */}
                        </View>
                        <View
                          style={
                            style.renderInfoProduct.lineStrikeThroughPrice
                          }>
                          {item?.totalDiscount === 0 ? null : (
                            <Text
                              style={style.mR7}
                              color={Color.lifetagGreyText.light.color}
                              textStyle="medium"
                              size={Size.text.caption1.size}
                              line={14.63}
                              textDecorationLine="line-through"
                              textDecorationStyle="solid">
                              {
                                // eslint-disable-next-line prefer-template
                                'Rp' +
                                  formatCurrency({
                                    value: item?.totalPrice,
                                    mantissa: 0,
                                  }) +
                                  ',-'
                              }{' '}
                            </Text>
                          )}
                          {/* <Text
                          color={Color.lifetagGreyText.light.color}
                          textStyle="medium"
                          size={Size.text.caption1.size}
                          line={14.63}
                          textDecorationStyle="solid">
                          x{item?.productQty}
                        </Text> */}
                        </View>
                        <View style={style.renderInfoProduct.productPrice}>
                          <Text
                            textStyle="semi"
                            line={17.07}
                            color={Color.primary.light.primary90}>
                            {
                              // eslint-disable-next-line prefer-template
                              'Rp' +
                                formatCurrency({
                                  value:
                                    item?.totalPrice -
                                    (item?.totalDiscount || 0),
                                  mantissa: 0,
                                }) +
                                ',-'
                            }
                          </Text>
                          {/* <TouchableOpacity
                          onPress={() => {
                            const resultFilter = tempProduct?.filter((t) => {
                              return t.lifetagColorId !== item?.lifetagColorId;
                            });
                            setTempProduct(resultFilter);
                          }}>
                          <LifetagDelete />
                        </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View style={style.renderInfoProduct.productPrice}>
                      <Text
                        style={style.mV5}
                        color={Color.lifetagGreyText.light.color}
                        textStyle="medium"
                        size={Size.text.caption1.size}
                        line={14.63}
                        textDecorationStyle="solid">
                        {trans(locale, lang, 'jumlah')}
                      </Text>
                      <Text
                        color={Color.lifetagGreyText.light.color}
                        textStyle="medium"
                        size={Size.text.caption1.size}
                        line={14.63}
                        textDecorationStyle="solid">
                        x{item?.productQty}
                      </Text>
                    </View>
                    <View style={style.renderInfoProduct.productPrice}>
                      <Text
                        color={Color.lifetagGreyText.light.color}
                        textStyle="medium"
                        size={Size.text.caption1.size}
                        line={14.63}
                        textDecorationStyle="solid">
                        {trans(locale, lang, 'warna')}
                      </Text>
                      <Text
                        color={Color.lifetagGreyText.light.color}
                        textStyle="medium"
                        size={Size.text.caption1.size}
                        line={14.63}
                        textDecorationStyle="solid">
                        {item?.lifetagColorName}
                      </Text>
                    </View>
                  </View>
                  {index !== tempProduct?.length - 1 && (
                    <Dash
                      style={style.mV5}
                      dashGap={0}
                      dashThickness={1}
                      dashColor={Color.grayIndicator.dark.grayIndicator}
                    />
                  )}
                </View>
              );
            })}
            {/* <Text
              onPress={() => {
                setLifetagColorModalVisible(true);
              }}
              color={Color.primary.light.primary90}
              size={Size.text.caption1.size}
              line={20}
              textStyle="medium"
              align="center">
              {trans(locale, lang, 'tambahPesanan')}
            </Text> */}
          </View>
        </Shadow>
      </Padder>
    );
  }

  function renderContent() {
    const onPress = () => {
      setIsComingFromScreen({
        screen: NAVIGATION.LIFETAG.LifetagConfirmation,
        params: { ...isComingFromScreen?.params },
      });
      navigation.navigate(NAVIGATION.PROFILE.ProfileAddress);
    };

    // const item = isComingFromScreen?.params?.selectedAddress;
    const item =
      isComingFromScreen?.params?.selectedAddress ||
      getAddressListResponse?.data?.eKYCAddress;

    // Format Address
    const namaJalan = item?.street || '';
    const rt = item?.rt || '';
    const rw = item?.rw || '';
    const kelurahan = item?.subDistrict?.value
      ? formatCapitalizeEachWord(item?.subDistrict?.value || '')
      : formatCapitalizeEachWord(item?.subDistrict || '');
    const kecamatan = item?.district?.value
      ? formatCapitalizeEachWord(item?.district?.value || '')
      : formatCapitalizeEachWord(item?.district || '');
    const kota = item?.city?.value
      ? formatCapitalizeEachWord(item?.city?.value || '')
      : formatCapitalizeEachWord(item?.city || '');
    const provinsi = item?.province?.value
      ? formatCapitalizeEachWord(item?.province?.value || '')
      : formatCapitalizeEachWord(item?.province || '');
    const kodePos = item?.postcode || isComingFromScreen?.params?.postalCode;
    const textAddress = `${namaJalan}, ${
      rt && rw ? `RT${rt}/RW${rw}` : ''
    }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
      .replace(/ ,/g, '')
      .trim()
      .replace(/^, /g, '')
      .trim()
      .replace(/,$/g, '');
    if (
      getAddressListResponse?.data?.eKYCAddress?.postcode === null &&
      !isComingFromScreen?.params?.selectedAddress
    ) {
      return (
        <Padder>
          <View style={style.renderContent.container}>
            <Text textStyle="semi" line={30.08}>
              {trans(locale, lang, 'alamatPengiriman')}
            </Text>
            {isComingFromScreen?.params?.selectedAddress && (
              <View style={style.renderContent.pinLoc}>
                <PinLoc fill={Color.primary.light.primary90} />
                <Text
                  onPress={onPress}
                  textStyle="medium"
                  line={20}
                  size={Size.text.caption1.size}
                  color={Color.neutralLifeSaver.light.neutral40}>
                  {' '}
                  {trans(locale, lang, 'pilihAlamatLain')}
                </Text>
              </View>
            )}
          </View>

          <Shadow borderRadius={16}>
            <TouchableOpacity
              style={[style.renderContent.addAddressContainer, isRedBorder]}
              onPress={onPress}>
              <Text
                style={style.mR14}
                textStyle="medium"
                color={Color.primary.light.primary90}>
                {trans(locale, lang, 'pilihAlamat')}
              </Text>
              <LifetagRedPlus />
            </TouchableOpacity>
          </Shadow>
          <Text
            style={[style.mB32, style.mT8]}
            textStyle="medium"
            size={Size.text.caption1.size}
            line={18}
            color={Color.primary.light.primary90}>
            {!_.isEmpty(toastMsg) &&
              trans(locale, lang, 'tambahkanAlamatTerlebih')}
          </Text>
        </Padder>
      );
    }
    return (
      <Padder>
        <View style={style.renderContent.container}>
          <Text textStyle="semi" line={30.08}>
            {trans(locale, lang, 'alamatPengiriman')}
          </Text>
          <View style={style.renderContent.pinLoc}>
            <PinLoc fill={Color.primary.light.primary90} />
            <Text
              onPress={onPress}
              textStyle="medium"
              line={20}
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver.light.neutral40}>
              {' '}
              {trans(locale, lang, 'pilihAlamatLain')}
            </Text>
          </View>
        </View>
        <Shadow borderRadius={24} style={style.mB32}>
          <View style={style.p16}>
            <Text style={style.mV5} textStyle="semi" line={19.6}>
              {isComingFromScreen?.params?.selectedAddress?.title ||
                trans(locale, lang, 'rumah')}
            </Text>
            <Dash
              style={style.mV5}
              dashGap={0}
              dashThickness={1}
              dashColor={Color.grayIndicator.dark.grayIndicator}
            />
            <View>
              <View style={style.renderContent.phoneNumber}>
                <Text
                  textStyle="semi"
                  line={19.6}
                  color={Color.neutralLifeSaver.light.neutral40}>
                  {isComingFromScreen?.params?.name || userData?.name}
                </Text>
                <Text
                  textStyle="semi"
                  size={Size.text.caption2.size}
                  line={16.8}>
                  {isComingFromScreen?.params?.phoneNumber ||
                    userData?.mobilePhoneNumber}
                </Text>
              </View>
              <View style={style.renderContent.address}>
                <Text
                  textStyle="semi"
                  size={Size.text.caption2.size}
                  line={16.8}
                  style={style.fS1}
                  align="left">
                  {textAddress}
                </Text>
              </View>
            </View>
          </View>
        </Shadow>
        <View style={style.mB32}>
          <View style={style.row}>
            <Text textStyle="semi" color={Color.primary[colorScheme].primary90}>
              {'* '}
            </Text>
            <Text
              textStyle="medium"
              line={18}
              size={Size.text.caption2.size}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'informasi')} :
            </Text>
          </View>
          <View style={[style.mx10, style.row]}>
            <Text
              style={style.mR7}
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {'\u2022'}
            </Text>
            <Text
              textStyle="medium"
              line={18}
              size={Size.text.caption2.size}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'estimasi1')}{' '}
              <Text
                textStyle="semi"
                size={Size.text.caption2.size}
                color={Color.neutral[colorScheme].neutral40}>
                {trans(locale, lang, 'estimasi2')}
              </Text>
              {trans(locale, lang, 'estimasi3')}
            </Text>
          </View>
        </View>
      </Padder>
    );
  }

  function renderTotal() {
    return (
      <Padder style={style.mT32}>
        <View style={style.renderTotal.totalPayment}>
          <Text textStyle="semi" line={30.8}>
            {trans(locale, lang, 'ringkasanPembayaran')}
          </Text>
        </View>
        {tempProduct?.map((item) => {
          return (
            <View style={style.renderTotal.productPrice}>
              <View style={style.renderTotal.summaryContainer}>
                <View style={style.flex}>
                  <Text
                    textStyle="medium"
                    line={24}
                    size={Size.text.caption2.size}
                    color={Color.neutralLifeSaver.light.neutral40}>
                    {item?.productName?.slice(0, 7)} - {item?.lifetagColorName}
                  </Text>
                </View>
                <Text
                  color={Color.lifetagGreyText.light.color}
                  textStyle="medium"
                  size={Size.text.caption1.size}
                  line={14.63}
                  textDecorationLine="line-through"
                  textDecorationStyle="solid">
                  {
                    // eslint-disable-next-line prefer-template
                    'Rp' +
                      formatCurrency({
                        value: item?.totalPrice,
                        mantissa: 0,
                      }) +
                      ',-'
                  }{' '}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.caption2.size}
                  line={24}
                  color={Color.neutralLifeSaver.light.neutral40}>
                  {
                    // eslint-disable-next-line prefer-template
                    'Rp' +
                      formatCurrency({
                        value: item?.totalPrice - item?.totalDiscount,
                        mantissa: 0,
                      }) +
                      ',-'
                  }
                </Text>
              </View>
            </View>
          );
        })}
        {paymentTotalDiscount === 0 ? null : (
          <View style={style.renderTotal.promo}>
            <Text
              textStyle="medium"
              line={24}
              size={Size.text.caption2.size}
              color={Color.neutralLifeSaver.light.neutral40}>
              {trans(locale, lang, 'diskon')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption2.size}
              line={24}
              color={Color.neutralLifeSaver.light.neutral40}>
              -
              {
                // eslint-disable-next-line prefer-template
                'Rp' +
                  formatCurrency({
                    value: paymentTotalDiscount,
                    mantissa: 0,
                  }) +
                  ',-'
              }
            </Text>
          </View>
        )}
      </Padder>
    );
  }

  function renderLifetagColorModal() {
    const onPress = () => {
      const filterIndexColor = tempProduct?.findIndex((item) => {
        return item?.lifetagColor === lifetagColor;
      });
      if (filterIndexColor !== -1) {
        const tempArray = tempProduct.map((item) => {
          if (
            tempProduct[filterIndexColor].lifetagColor === item?.lifetagColor
          ) {
            return {
              ...item,
              lifetagColorId,
              productQty: lifetagQty,
              totalDiscount:
                getLifetagProductDetailResponse?.data?.product?.discount *
                lifetagQty,
              totalPrice:
                getLifetagProductDetailResponse?.data?.product?.price *
                lifetagQty,
            };
          }
          return item;
        });
        setTempProduct(tempArray);
      } else {
        setTempProduct([
          ...tempProduct,
          {
            lifetagColor,
            lifetagColorId,
            productId: getLifetagProductDetailResponse?.data?.product?.id,
            productName: getLifetagProductDetailResponse?.data?.product?.name,
            productQty: lifetagQty,
            totalDiscount:
              getLifetagProductDetailResponse?.data?.product?.discount *
              lifetagQty,
            totalPrice:
              getLifetagProductDetailResponse?.data?.product?.price *
              lifetagQty,
          },
        ]);
      }
      setLifetagColorModalVisible(false);
      setLifetagQty(1);
    };

    return (
      <BottomSheet
        isVisible={isLifetagColorModalVisible}
        swipeable={false}
        title={trans(locale, lang, 'pilihWarnaLifeTag')}
        onRequestClose={() => {}}>
        <View>
          <View style={style.renderLifetagColorModal.chooseColorContainer}>
            <Text textStyle="semi" line={21}>
              {trans(locale, lang, 'pilihWarna')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption2.size}
              line={14.63}
              color={Color.neutralLifeSaver.light.neutral40}>
              {colorName}
            </Text>
          </View>
          <FlatList
            contentContainerStyle={
              style.renderLifetagColorModal.flatlistContainer
            }
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            bounces={false}
            data={getLifetagProductDetailResponse?.data?.product?.colourList}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setlifetagColorId(item?.id);
                    setLifetagColor(item?.codeList?.join(' '));
                    setColorName(item?.name);
                  }}
                  style={[
                    style.renderLifetagColorModal.touchableContainer,
                    {
                      backgroundColor: item.codeList.join(' '),
                    },
                  ]}>
                  <View
                    style={[
                      style.renderLifetagColorModal.circleContainer,
                      // eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
                      {
                        backgroundColor:
                          lifetagColor === item?.codeList?.join(' ')
                            ? Color.main.light.white
                            : null,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <View style={style.renderLifetagColorModal.sumContainer}>
            <Text textStyle="semi" line={21}>
              {trans(locale, lang, 'jumlahLifetag')}
            </Text>
            <View style={style.renderLifetagColorModal.container}>
              <View style={style.renderLifetagColorModal.minusContainer}>
                <Text
                  onPress={() => {
                    if (lifetagQty !== 1) {
                      setLifetagQty((prevState) => prevState - 1);
                    }
                  }}
                  color={
                    lifetagQty <= 1
                      ? Color.lifetagQtyCounterColor.light.color
                      : Color.primary.light.primary90
                  }
                  size={Size.text.h6.size + 2}
                  textStyle="regular"
                  align="center">
                  -
                </Text>
              </View>
              <View style={style.renderLifetagColorModal.qtyContainer}>
                <Text
                  textStyle="semi"
                  color={Color.lifetagQtyCounterColor.light.color}
                  size={Size.text.body1.size}
                  line={19.5}
                  align="center">
                  {lifetagQty}
                </Text>
              </View>
              <View style={style.renderLifetagColorModal.plusContainer}>
                <Text
                  onPress={() => {
                    setLifetagQty((prevState) => prevState + 1);
                  }}
                  color={Color.primary.light.primary90}
                  size={Size.text.h6.size + 2}
                  textStyle="regular"
                  align="center">
                  +
                </Text>
              </View>
            </View>
          </View>
          <Button onPress={onPress}>
            {trans(locale, lang, 'tambahkanLifeTag')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderButton() {
    const onPress = () => {
      if (
        getAddressListResponse?.data?.eKYCAddress?.postcode === null &&
        !isComingFromScreen?.params?.selectedAddress
      ) {
        setToastMsg({
          type: TOAST.type.warning,
          text1: [
            {
              label: trans(locale, lang, 'tambahkanAlamatTerlebih'),
              textStyle: 'medium',
            },
          ],
        });
      } else {
        const resultFilterCreateOrder = tempProduct?.map((item) => {
          return {
            productId: item?.productId,
            productColourId: item?.lifetagColorId,
            quantity: item?.productQty,
          };
        });
        setLifetagCreateOrder({
          product: [...resultFilterCreateOrder],
          userAddressId:
            isComingFromScreen?.params?.selectedAddress?.id || userData?.ekycId,
          name: isComingFromScreen?.params?.name || userData?.name,
          orderNumber: setLifetagOrderNoResponse?.data?.orderNumber,
          phoneNumber:
            isComingFromScreen?.params?.phoneNumber ||
            userData?.mobilePhoneNumber,
          devicePlatform: Platform.OS,
        });
        setLoading(true);
      }
    };
    return (
      <Padder style={style.mB32}>
        <View style={style.renderButton.textContainer}>
          <Text
            size={Size.text.body2.size}
            textStyle="semi"
            line={30.8}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'totalBtn')}
          </Text>
          <Text
            textStyle="semi"
            line={29}
            size={Size.text.h6.size + 2}
            color={Color.greenActive.light.color}>
            {paymentTotalPrice - paymentTotalDiscount === 0
              ? trans(locale, lang, 'free')
              : // eslint-disable-next-line prefer-template
                'Rp' +
                formatCurrency({
                  value: paymentTotalPrice - paymentTotalDiscount,
                  mantissa: 0,
                }) +
                ',-'}
          </Text>
        </View>
        {paymentTotalDiscount === 0 ? null : (
          <Text
            align="right"
            style={style.mB8}
            color={Color.lifetagGreyText.light.color}
            textStyle="medium"
            size={Size.text.h6.size}
            line={29}
            textDecorationLine="line-through"
            textDecorationStyle="solid">
            {
              // eslint-disable-next-line prefer-template
              'Rp' +
                formatCurrency({
                  value: paymentTotalPrice,
                  mantissa: 0,
                }) +
                ',-'
            }{' '}
          </Text>
        )}
        <Button onPress={onPress}>
          {trans(locale, lang, 'bayarSekarang')}
        </Button>
      </Padder>
    );
  }

  function renderStockOutModal() {
    return (
      <BottomSheet isVisible={isStockOutModal} swipeable={false}>
        <View style={style.renderStockOutModal.container}>
          <Image
            source={LifetagHookDisable}
            style={style.renderStockOutModal.imgSize}
          />
          <View>
            <Text
              align="center"
              textStyle="bold"
              size={Size.text.h6.size - 1}
              line={27}>
              {trans(locale, lang, 'maafStokLifeTag')}
            </Text>
            <View style={style.renderStockOutModal.textContentContainer}>
              <Text
                align="center"
                textStyle="regular"
                color={Color.neutralLifeSaver.light.neutral40}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'kamiAkanMemberi')}
              </Text>
            </View>
          </View>
          <Button
            block
            onPress={() => {
              setIsStockOutModal(false);
            }}>
            {trans(locale, lang, 'kembali')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  return (
    <Base15
      animatedOnlyHeader
      backgroundHeaderImage={renderBackgroundHeaderImage()}
      onBackPress={() => {
        setTempProduct([]);
        setIsComingFromScreen({});
        setToastMsg({});
        navigation.pop();
      }}
      title={trans(locale, lang, 'konfirmasi')}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderInfoProduct()}
        <Dash
          dashStyle={style.gapLine}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        />
        {renderContent()}
        <Dash
          dashStyle={style.gapLine}
          dashThickness={1}
          dashColor={Color.lineGapHome.dark.color}
        />
        {renderTotal()}
      </ScrollView>
      {renderButton()}
      {renderLifetagColorModal()}
      {renderStockOutModal()}
    </Base15>
  );
}

export default LifetagConfirmation;

LifetagConfirmation.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  profileAction: PropTypes.string.isRequired,
  getAddressListFailed: PropTypes.objectOf(Object).isRequired,
  getAddressListClear: PropTypes.func.isRequired,
  getAddressList: PropTypes.func.isRequired,
  getLifetagProductDetail: PropTypes.func.isRequired,
  getLifetagProductDetailResponse: PropTypes.objectOf(Object).isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagProductDetailFailed: PropTypes.objectOf(Object).isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
  setLifetagCreateOrder: PropTypes.func.isRequired,
  setLifetagCreateOrderFailed: PropTypes.objectOf(Object).isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  getAddressListResponse: PropTypes.objectOf(Object).isRequired,
  setLifetagOrderNoResponse: PropTypes.objectOf(Object).isRequired,
  setLifetagCreateOrderResponse: PropTypes.objectOf(Object).isRequired,
  setToastMsg: PropTypes.func.isRequired,
  toastMsg: PropTypes.objectOf(Object).isRequired,
};
