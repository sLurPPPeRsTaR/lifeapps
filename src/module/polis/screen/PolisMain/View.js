import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { Base15 as Base, Shadow } from 'ca-component-container/index';
import {
  PolicyCardBackground,
  PolisCek,
  PolisLogo,
  PolisLogoInactive,
  RusakIcon,
} from 'ca-config/Image';
import {
  ArrowDown,
  BackgroundGradientSquare,
  BackgroundGradientTablet,
  Eye1,
  EyeOff1,
  FilterIcon,
  Refresh,
} from 'ca-config/Svg';
import _ from 'lodash';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import { APP, NAVIGATION } from 'ca-util/constant';
import Padder from 'ca-component-container/Padder';
import moment from 'moment/min/moment-with-locales';
import DeviceInfo from 'react-native-device-info';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { formatCurrency } from 'ca-util/numbro';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GET_POLICIES_SUCCESS } from 'ca-module-home/homeConstant';
import ListAccordion from 'ca-component-card/ListAccordion';
import { setNavigationHome } from 'ca-bootstrap/bootstrapNavigation';
import { useFocusEffect } from '@react-navigation/native';
import style from './style';
import locale from './locale';

function PolisMain(props) {
  const {
    navigation,
    lang,
    colorScheme,
    userId,
    getPolicies,
    getPoliciesResponse,
    getPoliciesClear,
    getPoliciesFetch,
    alreadyKYC,
    width,
    height,
    setLoading,
    getPoliciesError,
    setToastMsg,
    homeAction,
    currentScreen,
    setIsComingFromScreen,
  } = props;

  moment.locale(lang);

  // Filter Modal State
  const [listStatus, setListStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [tempSelectedStatus, setTempSelectedStatus] = useState([]);
  const [listProductName, setListProductName] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState([]);
  const [tempSelectedProductName, setTempSelectedProductName] = useState([]);

  const scrollViewFilterRef = useRef(null);
  // const scrollToFirst = () => {
  //   scrollViewFilterRef.current.scrollTo({
  //     x: 0,
  //     y: 0,
  //     animated: true,
  //   });
  // };

  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSelectedSuggestion, setIsSelectedSuggestion] = useState(false);
  const [isUpdataAnuitasPrimaModal, setIsUpdataAnuitasPrimaModal] =
    useState(false);
  const [isHideBenefitValue, setIsHideBenefitValue] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const insets = useSafeAreaInsets();
  const additionalHeight = 38;

  const goBack = useCallback(() => {
    setNavigationHome();
    return true;
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [goBack]);

  const listPolicies = useMemo(() => {
    return getPoliciesResponse?.data?.map((item) => {
      const isJSAPPolicy =
        item?.productCode.match('JS_AP') &&
        item?.statusName.toUpperCase() === 'PASIF';
      return {
        ...item,
        statusCode: isJSAPPolicy ? 'active' : item?.statusCode,
      };
    });
  }, [getPoliciesResponse?.data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (alreadyKYC) {
        getPolicies();
      }
    });
    return unsubscribe;
  }, [alreadyKYC, getPolicies, getPoliciesClear, navigation, userId]);

  const setOnRefreshing = () => {
    setRefreshing(true);
    if (alreadyKYC) {
      getPolicies();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const preventUserNotLogin = useCallback(() => {
    if (userId === '') {
      setIsComingFromScreen({ screen: NAVIGATION.POLICY.PolisMain });
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.LOGIN.LoginMain }],
      });
    }
  }, [navigation, setIsComingFromScreen, userId]);

  useFocusEffect(() => {
    preventUserNotLogin();
  });

  useEffect(() => {
    if (listPolicies) {
      listPolicies.forEach((item) => {
        setListProductName((prev) => [
          ...new Set([...prev, item?.productName]),
        ]);
        setListStatus((prev) => [...new Set([...prev, item?.statusName])]);
      });
    }
  }, [listPolicies]);

  useEffect(() => {
    if (currentScreen === 'PolisMain') {
      setHomeResult(homeAction);
    }
  }, [currentScreen, homeAction, setHomeResult]);

  const setHomeResult = useCallback(
    (act) => {
      if (act === GET_POLICIES_SUCCESS) {
        setToastMsg({});
      }
    },
    [setToastMsg]
  );

  function renderContentContainer() {
    if (userId && getPoliciesFetch && _.isEmpty(listPolicies)) {
      return (
        <View style={[style.polisCard.loading, { height: height / 1.5 }]}>
          <ActivityIndicator
            size="large"
            color={Color.primary.light.primary90}
          />
        </View>
      );
    }
    if (_.isEmpty(listPolicies)) {
      return renderHaveNotPolisContainer();
    }
    if (!_.isEmpty(listPolicies)) {
      return renderPolisCardContainer();
    }
    return null;
  }

  function renderHaveNotPolisContainer() {
    if (getPoliciesError?.message) {
      return (
        <Padder style={style.padder.container}>
          <Padder style={style.alertCard.container}>
            <TouchableOpacity
              onPress={() => {
                setOnRefreshing();
              }}>
              <Refresh width={35} height={35} style={style.alertCard.icon} />
            </TouchableOpacity>
            <View style={style.mV16}>
              <Text
                textStyle="semi"
                size={Size.text.body1.size}
                line={23.8}
                style={style.alertCard.title}>
                {trans(locale, lang, 'kontenGagalDiTampilkan')}
              </Text>
            </View>
            <View style={style.alertCard.subtitle}>
              <TouchableOpacity
                onPress={() => {
                  setOnRefreshing();
                }}>
                <Text
                  textStyle="semi"
                  color={Color.primary[colorScheme].primary90}>
                  {trans(locale, lang, 'muatUlang')}
                </Text>
              </TouchableOpacity>
            </View>
          </Padder>
        </Padder>
      );
    }
    return (
      <Padder style={style.padder.container}>
        <Padder style={style.alertCard.container}>
          <Image
            source={RusakIcon}
            style={style.alertCard.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={22.4}
            style={style.alertCard.title}>
            {trans(locale, lang, 'polisKamuKosong')}
          </Text>
          {alreadyKYC ? (
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={22}
              align="center"
              color={Color.textNotif[colorScheme].color}>
              {trans(locale, lang, 'oopsKamuBelum')}
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={22}
                color={Color.primary[colorScheme].primary90}
                onPress={() => {
                  navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
                }}>
                {trans(locale, lang, 'cariProteksi')}
              </Text>
              {trans(locale, lang, 'yangCocokUntuk')}
            </Text>
          ) : (
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              line={22}
              align="center"
              color={Color.textNotif[colorScheme].color}>
              {trans(locale, lang, 'silakanVerifikasiDiri')}
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={22}
                color={Color.primary[colorScheme].primary90}
                onPress={() => {
                  navigation.navigate(NAVIGATION.KYC.KycMain);
                }}>
                {trans(locale, lang, 'disini')}
              </Text>
            </Text>
          )}
        </Padder>
      </Padder>
    );
  }

  function renderPolisCardContainer() {
    let activePolicies = listPolicies.filter((policy) => {
      return policy !== null && policy.statusCode.toLowerCase() === 'active';
    });

    let inactivePolicies = listPolicies.filter((policy) => {
      return (
        policy !== null && policy.statusCode.toLowerCase() === 'non-active'
      );
    });

    if (selectedProductName.length > 0) {
      activePolicies = activePolicies.filter((policy) => {
        return selectedProductName.includes(policy.productName);
      });
      inactivePolicies = inactivePolicies.filter((policy) => {
        return selectedProductName.includes(policy.productName);
      });
    }

    if (selectedStatus.length > 0) {
      activePolicies = activePolicies.filter((policy) => {
        return selectedStatus.includes(policy.statusName);
      });
      inactivePolicies = inactivePolicies.filter((policy) => {
        return selectedStatus.includes(policy.statusName);
      });
    }

    activePolicies = activePolicies.sort((a, b) => {
      return moment(b.insuranceStartDate).diff(moment(a.insuranceStartDate));
    });
    inactivePolicies = inactivePolicies.sort((a, b) => {
      return moment(b.insuranceStartDate).diff(moment(a.insuranceStartDate));
    });

    // sort JSAP PASIF
    // const anuitasPrimaPasifPolicies = [];
    // const nonAnuitasPrimaPasifPolicies = [];
    // inactivePolicies.forEach((item) => {
    //   const isJSAPPolicy =
    //     item?.productCode.match('JS_AP') &&
    //     item?.statusName.toUpperCase() === 'PASIF';
    //   if (isJSAPPolicy) {
    //     anuitasPrimaPasifPolicies.push(item);
    //   } else {
    //     nonAnuitasPrimaPasifPolicies.push(item);
    //   }
    // });
    // inactivePolicies = [
    //   ...anuitasPrimaPasifPolicies,
    //   ...nonAnuitasPrimaPasifPolicies,
    // ];

    return (
      <View>
        {!_.isEmpty(activePolicies) ? (
          <Padder
            style={[
              style.padder.container,
              DeviceInfo.isTablet() ? style.polisCard.containerTab : {},
            ]}>
            {activePolicies.map((item) => {
              return renderPolisCard({ item });
            })}
          </Padder>
        ) : null}
        {!_.isEmpty(inactivePolicies) ? (
          <ListAccordion
            initialExpanded={!(activePolicies.length > 0)}
            suffixIcon={<ArrowDown stroke={Color.grayIcon.light.grayIcon} />}
            headerContainerStyle={style.polisCard.sectionContainer}
            header={
              <Text textStyle="semi" size={Size.text.body1.size} line={24}>
                {trans(locale, lang, 'polisSudahTidakAktif')}
              </Text>
            }>
            <Padder
              style={[
                style.padder.container,
                DeviceInfo.isTablet() ? style.polisCard.containerTab : {},
              ]}>
              {inactivePolicies.map((item) => {
                return renderPolisCard({ item });
              })}
            </Padder>
          </ListAccordion>
        ) : null}
        {_.isEmpty(activePolicies) && _.isEmpty(inactivePolicies) ? (
          <View
            style={[style.policyNotFound.container, { height: height / 2 }]}>
            <Image
              source={RusakIcon}
              style={style.policyNotFound.image}
              resizeMode="contain"
            />
            <Text textStyle="bold" size={Size.text.body1.size} line={21}>
              {trans(locale, lang, 'oopsPolisTidakDitemukan')}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  function renderPolisCard({ item }) {
    const isStatusActive = item?.statusCode === 'active';

    const onUpdateDataPress = () => {
      if (!alreadyKYC && userId !== '') {
        navigation.navigate(NAVIGATION.KYC.KycMain);
      } else {
        const navigationParams = {
          category: 'manual',
          certificateNo: item?.certificateNo,
          policyNo: item?.policyNo || item?.oldPolicyNo,
          source: item?.source,
        };
        navigation.navigate(NAVIGATION.UPDATA.Updata, navigationParams);
      }
    };

    return (
      <View key={item?.policyNo || item?.oldPolicyNo}>
        <Shadow borderRadius={24} style={style.mb16}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NAVIGATION.POLICY.PolisDetail, {
                polis: item,
              });
            }}>
            {isStatusActive ? (
              <Image
                source={PolicyCardBackground}
                resizeMode="cover"
                style={style.polisCard.cardBackground}
              />
            ) : null}
            <View
              style={
                DeviceInfo.isTablet()
                  ? [style.polisCard.cardTab, { width: width / 2 - 24 }]
                  : style.polisCard.card
              }>
              <View style={style.polisCard.content.container}>
                <View style={style.polisCard.content.header.container}>
                  <Image
                    source={isStatusActive ? PolisLogo : PolisLogoInactive}
                    style={style.polisCard.content.header.image}
                  />
                  <Text
                    textStyle="semi"
                    size={Size.text.body1.size}
                    line={20}
                    color={
                      isStatusActive
                        ? Color.neutral[colorScheme].neutral90
                        : Color.grayIndicator[colorScheme].grayIndicator
                    }
                    style={style.flexShrink1}>
                    {item?.productName}
                  </Text>
                </View>
                <View style={style.flexShrink1}>
                  <View style={style.polisCard.content.policyNo}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={
                        isStatusActive
                          ? Color.textNotif[colorScheme].color
                          : Color.grayIndicator[colorScheme].grayIndicator
                      }>
                      {item?.policyNo || item?.oldPolicyNo}
                    </Text>
                  </View>
                  {item?.value ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsHideBenefitValue(!isHideBenefitValue);
                      }}>
                      <View
                        style={style.polisCard.content.benefitValue.container}>
                        <Text
                          textStyle="medium"
                          size={Size.text.body2.size}
                          line={20}
                          color={
                            isStatusActive
                              ? Color.textNotif[colorScheme].color
                              : Color.grayIndicator[colorScheme].grayIndicator
                          }
                          style={style.polisCard.content.benefitValue.value}>
                          {isHideBenefitValue
                            ? 'Rp***********'
                            : `Rp${formatCurrency({
                                value: item?.value,
                                mantissa: 2,
                              })}`}
                        </Text>
                        {isHideBenefitValue ? (
                          <EyeOff1
                            fill={Color.textNotif[colorScheme].color}
                            width={18}
                            height={18}
                          />
                        ) : (
                          <Eye1
                            fill={Color.textNotif[colorScheme].color}
                            width={18}
                            height={18}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : null}
                  <View style={style.polisCard.content.date}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={
                        isStatusActive
                          ? Color.textNotif[colorScheme].color
                          : Color.grayIndicator[colorScheme].grayIndicator
                      }>
                      {moment(item?.insuranceStartDate).format('DD MMM YY')}
                    </Text>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={
                        isStatusActive
                          ? Color.textNotif[colorScheme].color
                          : Color.grayIndicator[colorScheme].grayIndicator
                      }>
                      {' - '}
                    </Text>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={
                        isStatusActive
                          ? Color.textNotif[colorScheme].color
                          : Color.grayIndicator[colorScheme].grayIndicator
                      }>
                      {moment(item?.insuranceEndDate).format('DD MMM YY')}
                    </Text>
                  </View>
                  <View
                    style={[
                      style.flexDirectionRow,
                      style.justifyContentSpaceBetween,
                      style.alignItemsCenter,
                    ]}>
                    <Text
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={
                        isStatusActive
                          ? Color.primary[colorScheme].primary90
                          : Color.grayIndicator[colorScheme].grayIndicator
                      }
                      style={style.flexShrink1}>
                      {item?.statusName}
                    </Text>
                    {item?.clientCode ? (
                      <View style={style.polisCard.content.badgeClientCode}>
                        <Text
                          textStyle="semi"
                          size={Size.text.caption1.size}
                          color={Color.primary.light.primary90}>
                          {trans(locale, lang, item?.clientCode)}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  {item?.isAlter === 'true' ? (
                    <TouchableOpacity onPress={onUpdateDataPress}>
                      <View
                        style={
                          style.polisCard.content.pengkinianButton.container
                        }>
                        <View
                          style={
                            style.polisCard.content.pengkinianButton.button
                          }>
                          <Text
                            textStyle="semi"
                            size={Size.text.caption1.size}
                            color={Color.primary.light.primary90}
                            align="center">
                            {trans(locale, lang, 'pengkinianData')}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Shadow>
      </View>
    );
  }

  function renderUpdataAnuitasPrimaModal() {
    return (
      <BottomSheet isVisible={isUpdataAnuitasPrimaModal} swipeable={false}>
        <View style={style.modal.UpdataAnuitasPrima.container}>
          <Image
            source={PolisCek}
            style={style.modal.UpdataAnuitasPrima.image}
            resizeMode="contain"
          />
          <Text
            textStyle="bold"
            size={Size.text.h6.size}
            line={21}
            align="center"
            style={style.modal.UpdataAnuitasPrima.title}>
            {trans(locale, lang, 'fiturBelumTersedia')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            align="center"
            color={Color.mediumGray.light.mediumGray}
            style={style.modal.UpdataAnuitasPrima.subtitle}>
            {trans(locale, lang, 'untukSaatIni')}
            <Text textStyle="bold" color={Color.mediumGray.light.mediumGray}>
              {trans(locale, lang, 'ifgAnuitasPrima')}
            </Text>
          </Text>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => setIsUpdataAnuitasPrimaModal(false)}>
          {trans(locale, lang, 'ok')}
        </Button>
      </BottomSheet>
    );
  }

  function renderRefreshControl() {
    return (
      <RefreshControl refreshing={refreshing} onRefresh={setOnRefreshing} />
    );
  }

  const renderBadge = useCallback((value, isActive, onPress) => {
    return (
      <TouchableOpacity key={value} onPress={onPress}>
        <View
          style={[
            style.badge.badge,
            {
              backgroundColor: isActive
                ? Color.badgePink.light.badgePink
                : undefined,
            },
          ]}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={20}
            color={Color.badgeMagenta.light.badgeMagenta}
            align="center">
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  function renderFilterModal() {
    const rightHeaderContent = (
      <View style={style.pe16}>
        <TouchableOpacity
          onPress={() => {
            setIsSelectedSuggestion(false);
            setLoading(true);
            setIsFilterModal(false);
            setSelectedProductName([]);
            setTempSelectedProductName([]);
            setSelectedStatus([]);
            setTempSelectedStatus([]);
          }}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            align="center">
            {trans(locale, lang, 'reset')}
          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <BottomSheet
        isVisible={isFilterModal}
        leftTitle
        swipeable={false}
        title={trans(locale, lang, 'filter')}
        onClosePress={() => setIsFilterModal(false)}
        onModalHide={() => {
          setLoading(false);
        }}
        rightHeaderContent={rightHeaderContent}>
        <View style={style.mb24}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            line={21}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'namaProduk')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[style.badge.container]}>
            {listProductName.sort().map((item) => {
              const isActive = tempSelectedProductName.includes(item);
              const onPress = () => {
                if (isActive) {
                  setTempSelectedProductName((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                } else {
                  setTempSelectedProductName((prev) => [...prev, item]);
                }
              };
              return renderBadge(item, isActive, onPress);
            })}
          </ScrollView>
        </View>
        <View style={style.mb24}>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            line={21}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'statusPolis')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            // onLayout={(event) => {
            //   const { height } = event.nativeEvent.layout;
            //   if (!isExecuted.current) {
            //     isExecuted.current = true;
            //   } else {
            //     return;
            //   }
            //   if (height > 150) {
            //     setMaxWidthStatusStyle({
            //       maxWidth: Size.screen.width * 1.5 - 32,
            //     });
            //   } else {
            //     setMaxWidthStatusStyle({
            //       maxWidth: Size.screen.width - 32,
            //     });
            //   }
            // }}
            contentContainerStyle={[style.badge.container]}>
            {listStatus.sort().map((item) => {
              const isActive = tempSelectedStatus.includes(item);
              const onPress = () => {
                if (isActive) {
                  setTempSelectedStatus((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                } else {
                  setTempSelectedStatus((prev) => [...prev, item]);
                }
              };
              return renderBadge(item, isActive, onPress);
            })}
          </ScrollView>
        </View>
        <Button
          disabled={
            tempSelectedProductName.length < 1 && tempSelectedStatus.length < 1
          }
          onPress={() => {
            setIsSelectedSuggestion(false);
            setLoading(true);
            setIsFilterModal(false);
            setSelectedProductName(tempSelectedProductName);
            setSelectedStatus(tempSelectedStatus);
            // if (tempSelectedProductName.length > 0) {
            //   setSelectedProductName(tempSelectedProductName);
            // } else {
            //   setSelectedProductName(listProductName);
            // }
            // if (tempSelectedStatus.length > 0) {
            //   setSelectedStatus(tempSelectedStatus);
            // } else {
            //   setSelectedStatus(listStatus);
            // }
          }}>
          {trans(locale, lang, 'filter')}
        </Button>
      </BottomSheet>
    );
  }

  function renderBackgroundHeaderImage() {
    const imageSize = { width: 358, height: 245 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + insets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    if (DeviceInfo.isTablet()) {
      return (
        <View
          style={[
            style.backgroundContainer,
            {
              top: -90 + insets.top,
            },
          ]}>
          <BackgroundGradientTablet width={width} height={205} />
        </View>
      );
    }
    return (
      <View style={backgroundStyle}>
        <BackgroundGradientSquare width={width} height={adjustedHeight} />
      </View>
    );
  }

  function renderFilterBadgeContainer() {
    if (_.isEmpty(listPolicies)) {
      return null;
    }
    return (
      <View style={{ backgroundColor: Color.main.light.white }}>
        <ScrollView
          ref={scrollViewFilterRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[style.filterBadge.container]}
          style={style.mV12}>
          <View style={style.ps16} />
          <TouchableOpacity
            onPress={() => {
              setIsFilterModal(true);
            }}>
            <View
              style={[
                style.badge.badge,
                style.flexDirectionRow,
                style.alignItemsCenter,
              ]}>
              {selectedProductName.length + selectedStatus.length === 0 ? (
                <FilterIcon style={style.me6} />
              ) : (
                <View style={style.filterBadge.filterCounter}>
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    color={Color.main.light.white}>
                    {selectedProductName.length + selectedStatus.length}
                  </Text>
                </View>
              )}
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={20}
                color={Color.badgeMagenta.light.badgeMagenta}
                align="center">
                {trans(locale, lang, 'FILTER')}
              </Text>
            </View>
          </TouchableOpacity>
          {isSelectedSuggestion ||
          (_.isEmpty(selectedStatus) && _.isEmpty(selectedProductName))
            ? listStatus.map((item) => {
                const isActive = selectedStatus.includes(item);
                const onPress = () => {
                  setIsSelectedSuggestion(true);
                  if (isActive) {
                    setSelectedStatus((prev) => {
                      return prev?.filter((value) => value !== item);
                    });
                    setTempSelectedStatus((prev) => {
                      return prev?.filter((value) => value !== item);
                    });
                  } else {
                    setSelectedStatus((prev) => [...prev, item]);
                    setTempSelectedStatus((prev) => [...prev, item]);
                  }
                };
                return renderBadge(item, isActive, onPress);
              })
            : null}
          {!isSelectedSuggestion &&
            selectedStatus.map((item) => {
              const isActive = selectedStatus.includes(item);
              const onPress = () => {
                if (isActive) {
                  setSelectedStatus((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                  setTempSelectedStatus((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                } else {
                  setSelectedStatus((prev) => [...prev, item]);
                  setTempSelectedStatus((prev) => [...prev, item]);
                }
              };
              return renderBadge(item, isActive, onPress);
            })}
          {!isSelectedSuggestion &&
            selectedProductName.map((item) => {
              const isActive = selectedProductName.includes(item);
              const onPress = () => {
                if (isActive) {
                  setSelectedProductName((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                  setTempSelectedProductName((prev) => {
                    return prev?.filter((value) => value !== item);
                  });
                } else {
                  setSelectedProductName((prev) => [...prev, item]);
                  setTempSelectedProductName((prev) => [...prev, item]);
                }
              };
              return renderBadge(item, isActive, onPress);
            })}
          <View style={style.pe16} />
        </ScrollView>
      </View>
    );
  }

  return (
    <Base
      isScroll
      animated
      isBackground
      title={trans(locale, lang, 'polis')}
      width={width}
      isPaddingBottom={false}
      refreshControl={renderRefreshControl()}
      backgroundColor={Color.whiteLifesaverBg.dark.color}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <View style={[style.container, { minHeight: height / 1.5 }]}>
        {/* {renderHeaderContainer()} */}
        {renderFilterBadgeContainer()}
        {renderContentContainer()}
        {renderUpdataAnuitasPrimaModal()}
        {renderFilterModal()}
      </View>
    </Base>
  );
}

export default PolisMain;

// PolisMain.defaultProps = {
//   alreadySetPin: false,
// };

PolisMain.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  getPolicies: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getPoliciesResponse: PropTypes.objectOf(Object).isRequired,
  getPoliciesClear: PropTypes.func.isRequired,
  getPoliciesFetch: PropTypes.bool.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  // alreadySetPin: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  getPoliciesError: PropTypes.objectOf(Object).isRequired,
  currentScreen: PropTypes.string.isRequired,
  setToastMsg: PropTypes.func.isRequired,
  homeAction: PropTypes.string.isRequired,
  setIsComingFromScreen: PropTypes.func.isRequired,
};
