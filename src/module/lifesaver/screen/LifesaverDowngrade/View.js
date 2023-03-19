import { Alert, Image, ScrollView, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Text from 'ca-component-generic/Text';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import LinearGradient from 'react-native-linear-gradient';
import Size from 'ca-config/Size';
import { PRODUCT } from 'ca-util/constant';
import { LogoLifesaver, LogoLifesaverPlus } from 'ca-config/Svg';
import { formatNumber } from 'ca-util/numbro';
import { useMount } from 'ca-util/common';
import { formatDate } from 'ca-util/format';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { ArrowBottom } from 'ca-config/Image';
import { LifesaverOrderTotal } from 'ca-module-lifesaver/component';
import PropTypes from 'prop-types';
import {
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_SUCCESS,
} from 'ca-module-lifesaver/lifesaverConstant';
import style from './style';
import locale from './locale';

function LifesaverDowngrade(props) {
  const {
    navigation,
    lang,
    colorScheme,
    getProducts,
    getProductsResponse,
    setLoading,
    lifesaverAction,
    getProductsError,
    route: { params },
  } = props;
  const fromProduct = PRODUCT.LIFESAVER.LIFESAVER_PLUS;
  const toProduct = PRODUCT.LIFESAVER.LIFESAVER;

  // Render Logo
  const productData = {
    [PRODUCT.LIFESAVER.LIFESAVER]: {
      logo: <LogoLifesaver />,
    },
    [PRODUCT.LIFESAVER.LIFESAVER_PLUS]: {
      logo: <LogoLifesaverPlus />,
    },
  };

  useMount(() => {
    setLoading(true);
    getProducts();
  });

  useEffect(() => {
    getProductsResult(lifesaverAction);
  }, [getProductsResult, lifesaverAction]);

  const getProductsResult = useCallback(
    (act) => {
      if (act === GET_PRODUCTS_SUCCESS) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (act === GET_PRODUCTS_FAILED) {
        navigation.pop();
        Alert.alert(act, getProductsError?.message);
      }
    },
    [getProductsError?.message, navigation, setLoading]
  );

  function renderInfoProductBefore() {
    return (
      <Shadow borderRadius={24}>
        <View style={style.infoProduct.beforeBackground}>
          {productData[fromProduct]?.logo}
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {formatNumber(getProductsResponse[fromProduct]?.subsPrice, lang)}
            <Text textStyle="medium" color={Color.whiteCard[colorScheme].color}>
              /{trans(locale, lang, 'bulan')}
            </Text>
          </Text>
        </View>
        <View style={style.p16}>
          <View style={style.infoProduct.jatuhTempo}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'aktifSampai')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {formatDate(new Date(params?.dueDate), lang, true)}
            </Text>
          </View>
          <View style={style.mxMin16}>
            <HorizontalLine height={1} />
          </View>
          <Text
            textStyle="medium"
            style={style.my8}
            size={Size.text.caption1.size}
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'proteksiLamaKamu')}{' '}
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              color={Color.neutral.light.neutral60}>
              {formatDate(new Date(params?.dueDate), lang, true)}{' '}
            </Text>
          </Text>
        </View>
      </Shadow>
    );
  }

  function renderArrow() {
    return (
      <View style={style.arrow.container}>
        <Image source={ArrowBottom} style={style.arrow.image} />
      </View>
    );
  }

  function renderInfoProductAfter() {
    const activeStartFrom = () => {
      const oldPolicyDueDate = new Date(params?.dueDate).getTime();
      const startFrom = oldPolicyDueDate + 1000 * 60 * 60 * 24;
      return new Date(startFrom);
    };
    return (
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
            {productData[toProduct]?.logo}
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {formatNumber(getProductsResponse[toProduct]?.subsPrice, lang)}
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
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {getProductsResponse[toProduct]?.protectionDurationInMonth}{' '}
              {trans(locale, lang, 'bulan')}
            </Text>
          </View>
          <View style={style.infoProduct.jatuhTempo}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'aktifMulai')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {formatDate(new Date(activeStartFrom()), lang, true)}
            </Text>
          </View>
          <View style={style.infoProduct.nextPayment}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.neutral[colorScheme].neutral40}>
              {trans(locale, lang, 'pembayaranBerikutnya')}
            </Text>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {formatDate(new Date(params?.dueDate), lang, true)}
            </Text>
          </View>
          <View style={style.mxMin16}>
            <HorizontalLine height={1} />
          </View>
          <Text
            textStyle="medium"
            style={style.my8}
            size={Size.text.caption1.size}
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'manfaatProteksi')}{' '}
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              color={Color.neutral.light.neutral60}>
              {formatDate(new Date(activeStartFrom()), lang, true)}{' '}
            </Text>
            {trans(locale, lang, 'tanpaMasaTunggu')}
          </Text>
        </View>
      </Shadow>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'konfirmasi')}
      statusBarStyle="dark-content"
      staticView
      bordered
      onBackPress={() => {
        navigation.goBack();
      }}>
      <ScrollView>
        <View style={style.p16}>
          {renderInfoProductBefore()}
          {renderArrow()}
          {renderInfoProductAfter()}
        </View>
      </ScrollView>

      <LifesaverOrderTotal
        colorScheme={colorScheme}
        lang={lang}
        from="downgrade"
        policyDueDate={params?.dueDate}
        getProduct={getProductsResponse[toProduct]}
        dispatch={{
          setLoading,
        }}
      />
    </Base>
  );
}

LifesaverDowngrade.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProducts: PropTypes.func.isRequired,
  getProductsResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  getProductsError: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverDowngrade;
