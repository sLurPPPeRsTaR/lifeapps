import {
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Color from 'ca-config/Color';
import { LifeSaverBanner } from 'ca-config/Image';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GET_LIST_RS_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { toastConfig } from 'ca-util/toast';
import {
  CeklisLifeSaver,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from 'ca-config/Svg';
import Button from 'ca-component-generic/Button';
import { trans } from 'ca-util/trans';
import BottomSheet from 'ca-component-container/BottomSheet';
import ConnectionFailed from 'ca-component-lifesaver/ConnectionFailed';
import Padder from 'ca-component-container/Padder';
import PropTypes from 'prop-types';
import { NAVIGATION } from 'ca-util/constant';
import { formatDate, stringValue } from 'ca-util/format';
import { formatNumber } from 'ca-util/numbro';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import GoldCard from 'ca-component-lifesaver/GoldCard';
import Input from 'ca-component-generic/Input';
import Shadow from 'ca-component-container/Shadow';
import PaymentsDialog from 'ca-module-payments/PaymentsDialog';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import Header from 'ca-component-card/Header';
import style from './style';
import locale from './locale';

function LifesaverDetailProduct(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getProduct,
    getProductClear,
    getProductResponse,
    getListRs,
    getListRsResponse,
    route,
    setLoading,
    lifesaverAction,
    name,
    phoneNumber,
  } = props;
  const { product, from, recurring } = route.params;
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [listRs, setListRs] = useState(false);
  const [paymentDialogVisible, setPaymentDialogVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 5,
    sort: true,
    focus: false,
  });
  const [loadingFilterRs, setLoadingFilterRs] = useState(false);
  const scrollRef = useRef();
  const [tabMore, setTabMore] = useState(1);
  const isTab = [
    {
      id: 1,
      text: trans(locale, lang, 'benefit'),
    },
    {
      id: 2,
      text: trans(locale, lang, 'risk'),
    },
  ];

  const detailProductDesc = [
    {
      id: 1,
      name: 'maxBiayaPengobatan',
      detail: [
        {
          id: 1,
          name: 'rawatInap',
        },
        {
          id: 2,
          name: 'rawatJalan',
        },
        {
          id: 3,
          name: 'patahTulang',
        },
        {
          id: 4,
          name: 'rekonstruksiWajah',
        },
        {
          id: 5,
          name: 'cederaKepala',
        },
        {
          id: 6,
          name: 'cederaMata',
        },
        {
          id: 7,
          name: 'cederaMulutGigi',
        },
      ],
    },
    {
      id: 2,
      name: 'meninggalKecelakaan',
    },
    {
      id: 3,
      name: 'cacatKecelakaan',
    },
    {
      id: 4,
      name: 'gantiBiayaMedis',
    },
  ];

  const buttonSubmit = {
    start: {
      label: trans(locale, lang, 'startSubscribe'),
      onSubmit: () => {
        if (!toggleCheckBox) {
          scrollRef.current.scrollToEnd({ animated: true });
          Toast.show({
            type: 'error',
            text1: 'Mohon menyetujui syarat & ketentuan !',
          });
        } else if (recurring) {
          navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
        } else {
          setPaymentDialogVisible(true);
        }
      },
    },
    upgrade: {
      label: trans(locale, lang, 'upgradeSubscribe'),
      onSubmit: () => {
        if (!toggleCheckBox) {
          scrollRef.current.scrollToEnd({ animated: true });
          Toast.show({
            type: 'error',
            text1: 'Mohon menyetujui syarat & ketentuan !',
          });
        } else if (recurring) {
          navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
        } else {
          setPaymentDialogVisible(true);
        }
      },
    },
    downgrade: {
      label: trans(locale, lang, 'downgradeSubscribe'),
      onSubmit: () => {
        if (!toggleCheckBox) {
          scrollRef.current.scrollToEnd({ animated: true });
          Toast.show({
            type: 'error',
            text1: 'Mohon menyetujui syarat & ketentuan !',
          });
        } else if (recurring) {
          navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
        } else {
          setPaymentDialogVisible(true);
        }
      },
    },
  };

  useEffect(() => {
    getProduct(product);
  }, [getProduct, product]);

  useEffect(() => {
    setProductResult(lifesaverAction);
  }, [lifesaverAction, setProductResult]);

  const [connectionFailed, setConnectionFailed] = useState(false);
  const [show, setShow] = useState(false);
  const setProductResult = useCallback(
    (act) => {
      if (act === GET_PRODUCT) {
        setLoading(true);
      }
      if (act === GET_PRODUCT_SUCCESS) {
        setShow(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (act === GET_LIST_RS_SUCCESS) {
        setTimeout(() => {
          setLoadingFilterRs(false);
        }, 1000);
      }
      if (act === GET_PRODUCT_FAILED) {
        setConnectionFailed(true);
        getProductClear();
      }
    },
    [setLoading, getProductClear]
  );

  useEffect(() => {
    if (!filter.focus) {
      getListRs(filter);
    }
  }, [filter, getListRs]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeSequence = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  function renderProductCard() {
    return (
      <GoldCard
        title={
          from === 'upgrade'
            ? `Upgrade ${getProductResponse?.nama}`
            : getProductResponse?.nama
        }
        subtitle={`${formatNumber(
          getProductResponse?.biayaLangganan,
          lang,
          false
        )} /${trans(locale, lang, 'bulan')}`}>
        <View style={style.pr20}>
          <Text textStyle="medium" style={style.mb10}>
            {trans(locale, lang, 'doYourActivity')}
          </Text>
          <View style={style.directionRow}>
            <CeklisLifeSaver
              fill={
                Color.greenPolisStatusBadge[colorScheme].greenPolisStatusBadge
              }
            />
            <Text textStyle="medium" style={style.productDesc.textDesc}>
              {trans(locale, lang, 'totalMaksMain')}
              <Text textStyle="semi">
                {formatNumber(
                  getProductResponse?.maxBiayaPengobatan,
                  lang,
                  true
                )}
              </Text>
              {trans(locale, lang, 'lihat')}
              <Text fontStyle="italic">
                {trans(locale, lang, 'innerLimit')}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setTabMore(1);
                  setIsMoreVisible({
                    seeLimit: true,
                  });
                }}>
                <Text
                  textStyle="medium"
                  color={Color.primary[colorScheme].primary60}
                  textDecorationLine="underline">
                  {trans(locale, lang, 'disini')}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
          {getProductResponse?.cashless ? (
            <View style={style.directionRow}>
              <CeklisLifeSaver
                fill={
                  Color.greenPolisStatusBadge[colorScheme].greenPolisStatusBadge
                }
              />
              <Text textStyle="medium" style={style.productDesc.textDesc}>
                <Text
                  textStyle="medium"
                  color={Color.primary[colorScheme].primary60}>
                  {}
                </Text>
                {trans(locale, lang, 'cashless')}
                <Text textStyle="semi">
                  {formatNumber(
                    getProductResponse?.maxBiayaPengobatan,
                    lang,
                    true
                  )}
                </Text>
                {trans(locale, lang, 'lihatRs')}
                <TouchableWithoutFeedback
                  onPress={() => {
                    getListRs(filter);
                    setListRs(true);
                  }}>
                  <Text
                    textStyle="medium"
                    color={Color.primary[colorScheme].primary60}
                    textDecorationLine="underline">
                    {trans(locale, lang, 'disini')}
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          ) : null}

          <View style={style.directionRow}>
            <CeklisLifeSaver
              fill={
                Color.greenPolisStatusBadge[colorScheme].greenPolisStatusBadge
              }
            />
            <Text textStyle="medium" style={style.productDesc.textDesc}>
              {trans(locale, lang, 'masaTunggu')}
            </Text>
          </View>
        </View>
        <HorizontalLine />
        <TouchableOpacity
          style={style.productDesc.more}
          onPress={() => {
            setTabMore(1);
            setIsMoreVisible(true);
          }}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            color={Color.primary[colorScheme].primary90}>
            {trans(locale, lang, 'more')}
          </Text>
        </TouchableOpacity>
      </GoldCard>
    );
  }

  function renderPersonalData() {
    const personalDataApi = [
      {
        id: 1,
        name: 'NIK',
        value: '-',
      },
      {
        id: 2,
        name: trans(locale, lang, 'phoneNumber'),
        value: stringValue(phoneNumber),
      },
    ];

    return (
      <View style={style.personalData.container}>
        <Text textStyle="semi" size={Size.text.body2.size} style={style.mb10}>
          {trans(locale, lang, 'personalData')}
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral20}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'asYourPersonal')}
          </Text>
        </Text>
        <Shadow borderRadius={16}>
          <View style={style.personalData.shadow}>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {name}
            </Text>
            <HorizontalLine />
            {personalDataApi?.map((element) => (
              <View key={element?.id} style={style.personalData.cardSection}>
                <Text textStyle="medium" size={Size.text.caption1.size}>
                  {element?.name}
                </Text>
                <Text
                  testStyle="medium"
                  size={Size.text.caption1.size}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {element?.value}
                </Text>
              </View>
            ))}
          </View>
        </Shadow>
      </View>
    );
  }

  function renderTotal() {
    return (
      <View style={style.total.container}>
        <View style={style.total.section}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {trans(locale, lang, 'total')}
          </Text>
          <Text textStyle="semi" size={20}>
            {formatNumber(getProductResponse.biayaLangganan, lang, false)}
          </Text>
        </View>
        <Button
          onPress={buttonSubmit[from]?.onSubmit}
          rounded="lg"
          style={style.total.button}
          type="linear-gradient">
          <Text testStyle="semi" color="white">
            {trans(locale, lang, buttonSubmit[from]?.label)}
          </Text>
        </Button>
      </View>
    );
  }

  function renderTabBenefit() {
    if (isMoreVisible?.seeLimit) {
      fadeSequence();
    }
    return (
      <Padder>
        <View
          style={
            isMoreVisible?.seeLimit
              ? [style.maxH, { marginHorizontal: -40, marginTop: -6 }]
              : style.maxH
          }>
          <ScrollView showsVerticalScrollIndicator={false}>
            {detailProductDesc.map((element) => (
              <View key={element?.id} style={style.tabBenefit.container}>
                {isMoreVisible?.seeLimit &&
                element?.name === 'maxBiayaPengobatan' ? (
                  <Animated.View
                    style={[style.tabBenefit.animated, { opacity: fadeAnim }]}
                  />
                ) : null}
                <View
                  style={
                    isMoreVisible?.seeLimit
                      ? [style.directionRow, style.px40]
                      : style.directionRow
                  }>
                  <CeklisLifeSaver
                    fill={
                      Color.greenPolisStatusBadge[colorScheme]
                        .greenPolisStatusBadge
                    }
                  />
                  <Text
                    textStyle="medium"
                    style={style.ml5}
                    size={Size.text.body2.size}
                    color={Color.neutral[colorScheme].neutral90}>
                    {trans(locale, lang, element?.name)}
                    <Text
                      textStyle="semi"
                      color={Color.primary[colorScheme].primary60}>
                      {formatNumber(
                        getProductResponse[element?.name],
                        lang,
                        false
                      )}
                    </Text>
                  </Text>
                </View>

                {element?.detail?.map((detail) => (
                  <Padder
                    key={detail?.id}
                    style={
                      isMoreVisible?.seeLimit
                        ? [style.tabBenefit.detail, style.px56]
                        : style.tabBenefit.detail
                    }>
                    <Text
                      textStyle="medium"
                      color={Color.neutral[colorScheme].neutral90}>
                      {trans(locale, lang, detail?.name)}
                    </Text>
                    <Text
                      textStyle="semi"
                      style={style.mt5}
                      color={Color.primary[colorScheme].primary60}>
                      {formatNumber(
                        getProductResponse?.biayaPengobatan?.[detail?.name],
                        lang,
                        false
                      )}
                    </Text>
                  </Padder>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </Padder>
    );
  }

  function renderTabRisiko() {
    return (
      <Padder>
        <ScrollView style={style.tabRisiko.container}>
          {getProductResponse?.risiko?.map((element) => (
            <View style={style.mb20}>
              <Text textStyle="semi" style={style.mb20}>
                {element?.title}
              </Text>
              <Text
                textStyle="medium"
                color={Color.neutral[colorScheme].neutral90}>
                {element?.desc}
              </Text>
            </View>
          ))}
        </ScrollView>
      </Padder>
    );
  }

  function renderTabMore() {
    if (tabMore === 1) {
      return renderTabBenefit();
    }
    if (tabMore === 2) {
      return renderTabRisiko();
    }
    return null;
  }

  function renderMoreDetail() {
    return (
      <BottomSheet
        isVisible={isMoreVisible}
        renderHeader={
          <ModalHeader
            title={getProductResponse?.nama}
            subTitle={`${formatNumber(
              getProductResponse?.biayaLangganan,
              lang,
              false
            )} /${trans(locale, lang, 'bulan')}`}
            onClose={() => {
              setIsMoreVisible(false);
            }}
          />
        }
        swipeable={false}>
        <View>
          <View style={style.more.tabContainer}>
            <HorizontalLine height={1} />
            <View style={style.more.tabSection}>
              {isTab.map((element) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setTabMore(element?.id);
                  }}
                  key={element?.id}>
                  <View style={style.more.tabList}>
                    <View>
                      <Text
                        textStyle={element?.id === tabMore ? 'semi' : 'medium'}
                        color={
                          element?.id === tabMore
                            ? Color.primary[colorScheme].primary60
                            : Color.neutralLifeSaver[colorScheme].neutral10
                        }
                        size={Size.text.caption1.size}>
                        {element?.text}
                      </Text>
                    </View>

                    <View
                      style={[
                        style.more.tabBar,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          bottom: element?.id === tabMore ? 1 : 0,
                        },
                      ]}>
                      <HorizontalLine
                        height={element?.id === tabMore ? 2 : 1}
                        color={
                          element?.id === tabMore
                            ? Color.primary[colorScheme].primary60
                            : Color.grayLine[colorScheme].color
                        }
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
          <View style={style.more.section}>{renderTabMore()}</View>
        </View>
      </BottomSheet>
    );
  }

  function renderDurasiPerlindungan() {
    return (
      <View style={style.px16}>
        <View style={style.durasiPerlindungan.section}>
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral20}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'durasiProteksi')}
          </Text>
          <Text textStyle="semi" size={Size.text.caption1.size}>
            {getProductResponse?.durasiPerlindungan}
          </Text>
        </View>
        <View style={style.durasiPerlindungan.section2}>
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral20}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'jatuhTempo')}
          </Text>
          <Text textStyle="semi" size={Size.text.caption1.size}>
            {formatDate(new Date(getProductResponse?.jatuhTempo))}
          </Text>
        </View>
      </View>
    );
  }

  function renderSyaratKetentuan() {
    return (
      <View>
        <Shadow borderRadius={16}>
          <View style={style.personalData.shadow}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(
                  NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan
                );
              }}>
              <View style={style.syaratKetentuan.touchable1}>
                <Text textStyle="semi" size={Size.text.caption1.size}>
                  {trans(locale, lang, 'syaratKetentuan')}
                </Text>
                <ChevronRight />
              </View>
            </TouchableWithoutFeedback>
            <View style={style.syaratKetentuan.horizontal}>
              <HorizontalLine height={1} />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
                  personalURL: 'test',
                });
              }}>
              <View style={style.syaratKetentuan.touchable2}>
                <Text textStyle="semi" size={Size.text.caption1.size}>
                  {trans(locale, lang, 'ringkasanInformasi')}
                </Text>
                <ChevronRight />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderCheckBoxContainer() {
    return (
      <View style={style.checkBox.container}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          boxType="square"
          animationDuration={0.2}
          lineWidth={1}
          tintColors={{
            true: Color.red.dark.red90,
            false: Color.primary[colorScheme].primary20,
          }}
          style={style.checkBox.size}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Padder>
          <Text
            textStyle="medium"
            line={17}
            color={Color.neutral[colorScheme].neutral40}
            size={Size.text.caption1.size}
            align="justify">
            {trans(locale, lang, 'sayaMenyatakan')}
            <Text
              textStyle="semi"
              color={Color.primary[colorScheme].primary40}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'syaratIFG')}
            </Text>
            {trans(locale, lang, 'serta')}
            <Text
              textStyle="semi"
              color={Color.primary[colorScheme].primary40}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'riplay')}
            </Text>
            {trans(locale, lang, 'terkaitProduk')}
          </Text>
        </Padder>
      </View>
    );
  }

  function renderItemRS({ item }) {
    return (
      <View key={item?.id} style={style.listRs.cardContainer}>
        <Shadow borderRadius={16}>
          <View style={style.listRs.card}>
            <Text size={Size.text.caption1.size} textStyle="semi">
              {item?.medicalName}
            </Text>
            <HorizontalLine />
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {item?.address?.street}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {item?.address?.city}, {item?.address?.province}
            </Text>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderMapRS() {
    if (loadingFilterRs) {
      return (
        <View style={style.listRs.loading}>
          <ActivityIndicator color={Color.primary.light.primary90} />
        </View>
      );
    }

    if (getListRsResponse?.data?.length > 0) {
      return (
        <View style={style.listRs.content}>
          <FlatList
            data={getListRsResponse?.data}
            renderItem={renderItemRS}
            onEndReached={() => {
              if (getListRsResponse?.totalPages !== 1) {
                setFilter({
                  ...filter,
                  focus: false,
                  limit: filter?.limit + 5,
                });
              }
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }

    return (
      <View style={style.listRs.dataNull}>
        <Text textStyle="semi" color={Color.neutralLifeSaver.light.neutral40}>
          {trans(locale, lang, 'dataTidakDitemukan')}
        </Text>
      </View>
    );
  }

  function renderListRS() {
    return (
      <BottomSheet
        isVisible={listRs}
        renderHeader={
          <ModalHeader
            title={getProductResponse?.nama}
            subTitle={`${formatNumber(
              getProductResponse?.biayaLangganan,
              lang,
              false
            )} /${trans(locale, lang, 'bulan')}`}
            onClose={() => {
              setListRs(false);
              setFilter({
                search: '',
                page: 1,
                limit: 5,
                sort: true,
                focus: false,
              });
            }}
          />
        }
        swipeable={false}>
        <View style={style.maxH}>
          <View style={style.listRs.headerContainer}>
            <HorizontalLine height={1.5} />
            <View style={style.listRs.headerSection}>
              <Text
                textStyle="semi"
                color={Color.primary[colorScheme].primary60}
                size={Size.text.caption1.size}
                style={style.my5}
                align="center">
                {trans(locale, lang, 'providerCashless')}
              </Text>
              <View style={style.mbMin6}>
                <HorizontalLine
                  height={2.5}
                  color={Color.primary[colorScheme].primary60}
                />
                <View style={style.listRs.horizontalLine}>
                  <HorizontalLine height={1.5} />
                </View>
              </View>
            </View>
            <View style={[style.bgWhite]}>
              <Padder style={style.mb10}>
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  style={style.my10}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'rsPilihan')}(i)
                </Text>
                <Input
                  placeholder={trans(locale, lang, 'kataKunci')}
                  height={56}
                  onBlur={() => {
                    setLoadingFilterRs(true);
                    setFilter({
                      ...filter,
                      focus: false,
                      limit: 5,
                    });
                  }}
                  onChangeText={(text) => {
                    setFilter({
                      ...filter,
                      search: text,
                      focus: true,
                    });
                  }}
                />
              </Padder>
              <HorizontalLine height={1.5} />
              <Padder style={style.listRs.filterCase}>
                <Text
                  textStyle="medium"
                  color={Color.neutralLifeSaver[colorScheme].neutral60}
                  size={Size.text.caption1.size}>
                  {trans(locale, lang, 'urutkan')}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setLoadingFilterRs(true);
                    setFilter({
                      ...filter,
                      sort: !filter.sort,
                      limit: 5,
                    });
                  }}>
                  {filter?.sort ? (
                    <View style={style.listRs.sortContainer}>
                      <Text
                        textStyle="semi"
                        color={Color.primary[colorScheme].primary80}
                        style={style.mr5}>
                        A to Z
                      </Text>
                      <ChevronDown
                        fill={Color.primary[colorScheme].primary80}
                      />
                    </View>
                  ) : (
                    <View style={style.listRs.sortContainer}>
                      <Text
                        textStyle="semi"
                        color={Color.primary[colorScheme].primary80}
                        style={style.mr5}>
                        Z to A
                      </Text>
                      <ChevronUp fill={Color.primary[colorScheme].primary80} />
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </Padder>
              <HorizontalLine height={1.5} marginDisabled />
            </View>
          </View>
          {renderMapRS()}
        </View>
      </BottomSheet>
    );
  }

  if (connectionFailed) {
    return <ConnectionFailed lang={lang} navigation={navigation} />;
  }

  if ((from === 'start' || from === 'upgrade') && show) {
    return (
      <SafeAreaView edges={['top']} style={style.flex1}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.red[colorScheme].D71920}
        />
        <ScrollView ref={scrollRef}>
          <View style={{ ...style.main.container }}>
            <View style={style.banner.container}>
              <Image
                source={LifeSaverBanner}
                resizeMode="cover"
                style={style.banner.image}
              />
            </View>
            <Padder style={style.main.productCard}>
              {renderProductCard()}
            </Padder>
          </View>
          <HorizontalLine
            height={5}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
          <Padder style={style.whiteBg}>{renderDurasiPerlindungan()}</Padder>
          <HorizontalLine
            height={5}
            marginDisabled
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
          <Padder style={style.main.personalData}>
            {renderPersonalData()}
          </Padder>
          <Padder style={style.syaratKetentuan.container}>
            {renderSyaratKetentuan()}
            {renderCheckBoxContainer()}
          </Padder>
          {renderMoreDetail()}
          {renderListRS()}
        </ScrollView>
        {renderTotal()}
        <Toast position="top" topOffset={60} config={toastConfig} />
        <PaymentsDialog
          {...props}
          onClosePress={() => setPaymentDialogVisible(false)}
          onSelected={() => {
            setPaymentDialogVisible(false);
            navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
          }}
          isVisible={paymentDialogVisible}
        />
      </SafeAreaView>
    );
  }

  if (from === 'downgrade' && show) {
    return (
      <SafeAreaView edges={['top']} style={style.flex1}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Color.red[colorScheme].D71920}
        />
        <Header
          isLight={true}
          title={trans(locale, lang, 'ringkasan')}
          onBackPress={() => {
            navigation.goBack();
          }}
          headerStyle={style.main.headerBg}
        />
        <ScrollView ref={scrollRef}>
          <View style={style.main.containerDowngrade}>
            <View style={style.banner.container}>
              <View style={style.main.bgRed} />
            </View>
            <Padder style={style.main.productCardDowngrade}>
              {renderProductCard()}
            </Padder>
          </View>
          <HorizontalLine
            height={5}
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
          <Padder style={style.whiteBg}>{renderDurasiPerlindungan()}</Padder>
          <HorizontalLine
            height={5}
            marginDisabled
            color={Color.backgroundHome[colorScheme].backgroundHome}
          />
          <Padder style={style.main.personalData}>
            {renderPersonalData()}
          </Padder>
          <Padder style={style.syaratKetentuan.container}>
            {renderSyaratKetentuan()}
            {renderCheckBoxContainer()}
          </Padder>
          {renderMoreDetail()}
          {renderListRS()}
        </ScrollView>
        {renderTotal()}
        <Toast position="top" topOffset={60} config={toastConfig} />
        <PaymentsDialog
          {...props}
          onClosePress={() => setPaymentDialogVisible(false)}
          onSelected={() => {
            setPaymentDialogVisible(false);
            navigation.navigate(NAVIGATION.LIFESAVER.TransaksiSukses);
          }}
          isVisible={paymentDialogVisible}
        />
      </SafeAreaView>
    );
  }
  return null;
}

LifesaverDetailProduct.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProduct: PropTypes.func.isRequired,
  getProductClear: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  getProductResponse: PropTypes.objectOf(Object).isRequired,
  getListRs: PropTypes.func.isRequired,
  getListRsClear: PropTypes.func.isRequired,
  getListRsResponse: PropTypes.arrayOf(Array).isRequired,
  setLoading: PropTypes.func.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  phoneNumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default LifesaverDetailProduct;
