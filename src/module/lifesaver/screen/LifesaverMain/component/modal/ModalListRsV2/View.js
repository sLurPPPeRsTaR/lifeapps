import {
  ActivityIndicator,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import {
  PinLocation,
  SearchOutlineRed,
  BtnBack,
  Call,
  CallDisable,
  Close,
} from 'ca-config/Svg';
import { History4x, CloudBackground } from 'ca-config/Image';
import { GET_LIST_RS_HOME_SUCCESS } from 'ca-module-home/homeConstant';
import Input from 'ca-component-generic/Input';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
// import Padder from 'ca-component-container/Padder';
import { getLocation } from 'ca-util/location';
// import { AFLogLocation } from 'ca-util/AppsFlyer';
import BottomSheet from 'ca-component-container/BottomSheet';
import locale from './locale';
import style from './style';

function ModalListRsV2(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getListRs,
    getListRsResponse,
    homeAction,
    onRequestClose,
    isVisible,
    onClosePress,
    onPressClose,
  } = props;

  const [inputFocus, setInputFocus] = useState(false);
  const providerFilterList = [
    'ALL',
    'HOSPITAL',
    'CLINIC',
    'PHARMACHY',
    'LAB',
    'OPTIC',
    'DENTAL',
  ];
  const [providerFilter, setProviderFilter] = useState('ALL');
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 5,
    type: '',
    sort: true,
    focus: false,
  });
  const [loadingFilterRs, setLoadingFilterRs] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const flatListRef = useRef();

  useEffect(() => {
    getLocation().then((p) => {
      setCurrentLocation({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (currentLocation) {
      getListRs({ ...filter, ...currentLocation });
    }
    // if (!currentLocation) {
    //   getListRs(filter);
    // }
  }, [currentLocation, filter, getListRs]);

  useEffect(() => {
    if (homeAction === GET_LIST_RS_HOME_SUCCESS) {
      setLoadingFilterRs(false);
      setPaginationLoading(false);
      setShow(true);
    }
  }, [homeAction]);

  const LoadingPagination = useCallback(() => {
    if (!paginationLoading) {
      return null;
    }
    return (
      <View style={style.mv10}>
        <ActivityIndicator color={Color.primary.light.primary90} />
      </View>
    );
  }, [paginationLoading]);

  const LifeSaverText = useCallback(() => {
    return (
      <Text
        textStyle="semi"
        color={Color.neutralLifeSaver[colorScheme].neutral40}
        size={Size.text.body2.size}>
        Life
        <Text
          style={style.textBoldItalic}
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          size={Size.text.body2.size}>
          SAVER
        </Text>
      </Text>
    );
  }, [colorScheme]);

  const ModalHeader = useCallback(() => {
    return (
      <>
        <View style={style.dialogHeader.container}>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={style.dialogHeader.closeBtnContainer}>
              <Close width={30} height={30} />
            </View>
          </TouchableWithoutFeedback>
          <View style={style.fx1}>
            <Text
              textStyle="bold"
              line={33}
              size={Size.text.body2.size}
              align="center">
              {trans(locale, lang, 'DataRs')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onPressClose]);

  function renderHeader() {
    return (
      <View style={style.header.container1}>
        <ModalHeader />
        <View style={style.header.container2}>
          <View style={style.header.containerSearch}>
            <Input
              suffixIcon={<SearchOutlineRed />}
              placeholder={trans(locale, lang, 'Cari')}
              onFocus={() => {
                setInputFocus(true);
              }}
              onBlur={() => {
                setInputFocus(false);
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
          </View>
        </View>
        <ImageBackground
          source={CloudBackground}
          resizeMode="stretch"
          style={style.Main.container}>
          <Image
            source={History4x}
            width={65}
            height={65}
            style={style.Main.image}
          />
          <Text
            size={Size.text.caption1.size}
            style={style.fx1}
            line={17}
            textStyle="semi"
            color={Color.neutralLifeSaver[colorScheme].neutral40}>
            {trans(locale, lang, 'untukPemilik')}
            {<LifeSaverText />}
            {trans(locale, lang, 'proteksiLifesaver')}
          </Text>
        </ImageBackground>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={style.header.container2}>
            {providerFilterList.map((element) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  flatListRef?.current?.scrollToOffset({
                    animated: false,
                    offset: 0,
                  });
                  setProviderFilter(element);
                  if (element === 'ALL') {
                    setFilter({
                      ...filter,
                      type: '',
                    });
                  } else {
                    setFilter({
                      ...filter,
                      type: element,
                    });
                  }
                }}>
                <View
                  style={
                    element === providerFilter
                      ? style.header.textContainerActive
                      : style.header.textContainerInactive
                  }>
                  <Text
                    size={Size.text.body1.size}
                    textStyle="semi"
                    color={Color.primary.light.primary80}>
                    {trans(locale, lang, element)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>

        <View style={style.Main.textContainer}>
          <Text textStyle="semi" size={Size.text.body1.size}>
            {trans(locale, lang, 'lebihDari')}
          </Text>
        </View>
      </View>
    );
  }

  function renderItemRS({ item }) {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${item?.lat},${item?.lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    return (
      <View>
        <View key={item?.id} style={style.listRs.renderItem.container}>
          <TouchableOpacity
            disabled={!item?.lat || !item?.lng}
            onPress={() => Linking.openURL(url)}>
            <PinLocation width={27} height={27} />
          </TouchableOpacity>
          <View style={style.listRs.renderItem.containerText}>
            <Text size={Size.text.caption1.size} textStyle="semi" line={16}>
              {item?.providerName}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              line={16}>
              {item?.address}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              line={16}>
              {item?.city}, {item?.province}
            </Text>
            {currentLocation && item?.distance !== null ? (
              <Text
                line={22}
                size={Size.text.caption1.size}
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {trans(locale, lang, 'jarak')}
                {item?.distance} km
              </Text>
            ) : null}
          </View>
          {item?.phone ? (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${item.phone}`)}>
              <Call width={22} height={22} />
            </TouchableOpacity>
          ) : (
            <CallDisable width={22} height={22} />
          )}
        </View>
        <HorizontalLine height={1} />
      </View>
    );
  }
  function renderMapRS() {
    if (loadingFilterRs) {
      return (
        <View style={style.listRs.renderMap.loadingContainer}>
          <ActivityIndicator color={Color.primary.light.primary90} />
        </View>
      );
    }

    if (getListRsResponse?.providerList?.length > 0) {
      return (
        <View style={style.listRs.renderMap.container}>
          <FlatList
            ref={flatListRef}
            data={getListRsResponse?.providerList}
            renderItem={renderItemRS}
            onEndReached={() => {
              if (getListRsResponse?.totalPages !== 1) {
                setPaginationLoading(true);
                setFilter({
                  ...filter,
                  focus: false,
                  limit: filter?.limit + 5,
                });
              }
            }}
            ListFooterComponent={<LoadingPagination />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={style.pb230}
          />
        </View>
      );
    }

    return (
      <View style={style.listRs.renderMap.noDataContainer}>
        <Text textStyle="semi" color={Color.neutralLifeSaver.light.neutral40}>
          {trans(locale, lang, 'tidakDitemukan')}
        </Text>
      </View>
    );
  }

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      renderHeader={renderHeader()}
      avoidKeyboard
      isVisible={isVisible}
      swipeable={false}
      onClosePress={onClosePress}>
      {show ? (
        <View
          style={
            Platform.OS === 'android' && inputFocus
              ? style.listRs.container.focus
              : style.listRs.container.noFocus
          }>
          {renderMapRS()}
        </View>
      ) : (
        <View style={style.activtyIndicator}>
          <ActivityIndicator
            color={Color.primary[colorScheme].primary90}
            size="large"
          />
        </View>
      )}
    </BottomSheet>
    // {/* <Base
    //   renderHeader={renderHeader()}
    //   backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
    //   isWrapScrollView={false}
    //   bordered>
    //   {show ? (
    //     <View
    //       style={
    //         Platform.OS === 'android' && inputFocus
    //           ? style.listRs.container.focus
    //           : style.listRs.container.noFocus
    //       }>
    //       {renderMapRS()}
    //     </View>
    //   ) : (
    //     <View style={style.activtyIndicator}>
    //       <ActivityIndicator
    //         color={Color.primary[colorScheme].primary90}
    //         size="large"
    //       />
    //     </View>
    //   )}
    // </Base> */}
  );
}

ModalListRsV2.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getListRs: PropTypes.func.isRequired,
  getListRsResponse: PropTypes.objectOf(Object).isRequired,
  homeAction: PropTypes.string.isRequired,
};
export default ModalListRsV2;
