import React, { useCallback, useState } from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  Platform,
  View,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import { History4x } from 'ca-config/Image';
import { SearchOutline, Close, PinLocation } from 'ca-config/Svg';
import PropTypes from 'prop-types';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import Input from 'ca-component-generic/Input';
import Size from 'ca-config/Size';
import { FlatList } from 'react-native-gesture-handler';
import Style from './style';

function ModalListRs(props) {
  const {
    colorScheme,
    locale,
    lang,
    isVisible,
    inputFocus,
    loadingFilterRs,
    getListRsResponse,
    paginationLoading,
    onFocusInput,
    onBlurInput,
    onChangeTextInput,
    onEndReached,
    onPressClose,
    onClosePress,
    onFilterPress,
    onRequestClose,
  } = props;

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

  const LifeSaverText = useCallback(() => {
    return (
      <Text
        textStyle="semi"
        color={Color.neutralLifeSaver[colorScheme].neutral40}
        size={Size.text.body2.size}>
        Life
        <Text
          style={Style.textBoldItalic}
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
        <View style={Style.dialogHeader.container}>
          <TouchableWithoutFeedback onPress={onPressClose}>
            <View style={Style.dialogHeader.closeBtnContainer}>
              <Close width={30} height={30} />
            </View>
          </TouchableWithoutFeedback>
          <View style={Style.fx1}>
            <Text
              textStyle="bold"
              line={33}
              size={Size.text.body2.size}
              align="center">
              {trans(locale, lang, 'DataRs')}
            </Text>
          </View>
          <View style={Style.w30} />
        </View>
        <View style={Style.divider} />
      </>
    );
  }, [lang, locale, onPressClose]);

  const renderItemRS = ({ item }) => {
    return (
      <View>
        <View
          key={item?.providerId.toString()}
          style={Style.renderItem.container}>
          <View style={Style.renderItem.container2}>
            <Text size={Size.text.caption1.size} textStyle="semi">
              {item?.providerName}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {item?.address}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutralLifeSaver[colorScheme].neutral40}>
              {item?.city}, {item?.province}
            </Text>
          </View>
        </View>
        <HorizontalLine height={1} />
      </View>
    );
  };

  const LoadingPagination = useCallback(() => {
    if (!paginationLoading) {
      return null;
    }
    return (
      <View style={Style.mb30}>
        <ActivityIndicator color={Color.primary.light.primary90} />
      </View>
    );
  }, [paginationLoading]);

  function renderMapRS() {
    if (loadingFilterRs) {
      return (
        <View style={Style.renderMap.loadingContainer}>
          <ActivityIndicator color={Color.primary.light.primary90} />
        </View>
      );
    }

    if (getListRsResponse?.providerList?.length > 0) {
      return (
        <View style={Style.renderMap.container}>
          <FlatList
            data={getListRsResponse?.providerList}
            renderItem={renderItemRS}
            onEndReached={() => {
              if (getListRsResponse?.totalPages !== 1) {
                onEndReached();
              }
            }}
            ListFooterComponent={<LoadingPagination />}
            keyExtractor={(item) => item.providerId.toString()}
            contentContainerStyle={Style.pb30}
          />
        </View>
      );
    }

    return (
      <View style={Style.renderMap.noDataContainer}>
        <Text textStyle="semi" color={Color.neutralLifeSaver.light.neutral40}>
          {trans(locale, lang, 'DataTidakDitemukan')}
        </Text>
      </View>
    );
  }

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      renderHeader={<ModalHeader />}
      isVisible={isVisible}
      swipeable={false}
      onClosePress={onClosePress}>
      <View
        style={
          Platform.OS === 'android' && inputFocus
            ? Style.container.focus
            : Style.container.noFocus
        }>
        <View style={Style.mhMin16}>
          <View style={{ backgroundColor: Color.whiteLifesaverBg.light.color }}>
            <Padder style={Style.p5}>
              <Input
                suffixIcon={<SearchOutline />}
                placeholder={trans(locale, lang, 'CariBerdasarkan')}
                height={56}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
                onChangeText={(text) => onChangeTextInput(text)}
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={Style.container2}>
                  {providerFilterList.map((element) => (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setProviderFilter(element);
                        onFilterPress(element);
                      }}>
                      <View
                        style={
                          element === providerFilter
                            ? Style.textContainerActive
                            : Style.textContainerInactive
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
            </Padder>
            <View style={Style.Main.container}>
              <Image
                source={History4x}
                width={80}
                height={80}
                style={Style.Main.image}
              />
              <Text
                size={Size.text.body2.size}
                style={Style.fx1}
                letterSpacing={0.5}
                textStyle="semi"
                color={Color.neutralLifeSaver[colorScheme].neutral40}>
                {trans(locale, lang, 'untukPemilik')}
                {<LifeSaverText />}
                {trans(locale, lang, 'proteksiLifesaver')}
              </Text>
            </View>
            <HorizontalLine height={1.5} />
          </View>
        </View>
        {renderMapRS()}
      </View>
    </BottomSheet>
  );
}

export default ModalListRs;

ModalListRs.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  locale: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  inputFocus: PropTypes.bool.isRequired,
  loadingFilterRs: PropTypes.bool.isRequired,
  paginationLoading: PropTypes.bool.isRequired,
  getListRsResponse: PropTypes.objectOf(Object).isRequired,
  onFocusInput: PropTypes.func.isRequired,
  onBlurInput: PropTypes.func.isRequired,
  onChangeTextInput: PropTypes.func.isRequired,
  onFilterPress: PropTypes.func.isRequired,
  onEndReached: PropTypes.func.isRequired,
  onPressClose: PropTypes.func.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
