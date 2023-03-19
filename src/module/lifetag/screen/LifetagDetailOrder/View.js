import React, { useEffect, useCallback } from 'react';
import Base from 'ca-component-container/Base';
import Dash from 'react-native-dash';
import { Image, View, ScrollView } from 'react-native';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import Shadow from 'ca-component-container/Shadow';
import {
  LifetagWord,
  ArrowBottomWarning,
  ArrowBottomInfo,
  LifetagProduct,
} from 'ca-config/Image';
import {
  GET_LIFETAG_DETAIL_ORDER,
  GET_LIFETAG_DETAIL_ORDER_FAILED,
  GET_LIFETAG_DETAIL_ORDER_SUCCESS,
} from 'ca-module-lifetag/lifetagConstant';
import { formatCapitalizeEachWord } from 'ca-util/format';
import { formatCurrency } from 'ca-util/numbro';

import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import moment from 'moment';
import { NAVIGATION } from 'ca-util/constant';

import Style from './style';
import locale from './locale';

function LifetagDetailOrder(props) {
  const {
    navigation,
    lang,
    setLoading,
    //   colorScheme,
    lifetagAction,
    getLifetagDetailOrderResponse,
    getLifetagDetailOrder,
    route: { params },
    setIsShowModalCustomerCare,
  } = props;

  useEffect(() => {
    getLifetagDetailOrder(params?.orderId);
  }, [getLifetagDetailOrder, params?.orderId]);

  useEffect(() => {
    lifetagResultAction(lifetagAction);
  }, [lifetagAction, lifetagResultAction]);

  const lifetagResultAction = useCallback(
    (act) => {
      if (act === GET_LIFETAG_DETAIL_ORDER) {
        setLoading(true);
      }
      if (act === GET_LIFETAG_DETAIL_ORDER_SUCCESS) {
        setLoading(false);
      }
      if (act === GET_LIFETAG_DETAIL_ORDER_FAILED) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  function renderOderItems() {
    return (
      <View style={Style.mt16}>
        <Shadow borderRadius={10} style={[Style.mb16]}>
          {getLifetagDetailOrderResponse?.data?.product?.map((item) => (
            <View key={item?.productName}>
              <Padder style={Style.p16}>
                <View style={[Style.items.container]}>
                  <View style={Style.items.containerImage}>
                    <Image
                      source={
                        item?.productColour?.image
                          ? { uri: item?.productColour?.image }
                          : LifetagProduct
                      }
                      style={Style.items.productImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={[Style.ml16, Style.items.containerDetail]}>
                    <Text
                      size={Size.text.caption1.size}
                      textStyle="bold"
                      line={20}>
                      {item?.productName}
                    </Text>
                    {item?.productDiscount ? (
                      <Text
                        textStyle="medium"
                        color={Color.lifetagGreyText.light.color}
                        size={Size.text.caption1.size}
                        line={20}
                        textDecorationLine="line-through"
                        textDecorationStyle="solid">
                        Rp
                        {formatCurrency({
                          value: item?.productPrice * item?.productQuantity,
                          mantissa: 0,
                        })}
                      </Text>
                    ) : null}
                    <Text
                      size={Size.text.body2.size}
                      color={Color.primary.dark.primary90}
                      textStyle="bold"
                      line={20}>
                      Rp
                      {formatCurrency({
                        value:
                          item?.productPrice * item?.productQuantity -
                          (item?.productDiscount || 0),
                        mantissa: 0,
                      })}
                      ,-
                    </Text>

                    <View style={Style.items.logoContainer}>
                      <Image
                        source={LifetagWord}
                        style={Style.logo}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
                <View style={Style.items.containerText}>
                  <Text
                    textStyle="medium"
                    color={Color.lifetagGreyText.light.color}
                    size={Size.text.caption1.size}
                    line={20}
                    textDecorationStyle="solid">
                    {trans(locale, lang, 'kuantitas')}
                  </Text>
                  <Text
                    textStyle="medium"
                    color={Color.lifetagGreyText.light.color}
                    size={Size.text.caption1.size}
                    line={20}
                    textDecorationStyle="solid">
                    x{item?.productQuantity}
                  </Text>
                </View>
                <View style={Style.items.containerText}>
                  <Text
                    textStyle="medium"
                    color={Color.lifetagGreyText.light.color}
                    size={Size.text.caption1.size}
                    line={20}
                    textDecorationStyle="solid">
                    {trans(locale, lang, 'warna')}
                  </Text>
                  <Text
                    textStyle="medium"
                    color={Color.lifetagGreyText.light.color}
                    size={Size.text.caption1.size}
                    line={20}
                    textDecorationStyle="solid">
                    {item?.productColour?.name}
                  </Text>
                </View>
              </Padder>
            </View>
          ))}
          <Padder>
            <Button
              style={[Style.items.button, Style.mt16]}
              rounded={20}
              onPress={() => {
                navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
              }}>
              <Text color={Color.main.light.white} size={Size.text.body2.size}>
                {trans(locale, lang, 'beliLagi')}
              </Text>
            </Button>
          </Padder>
        </Shadow>
      </View>
    );
  }

  function renderDetail() {
    return (
      <Padder>
        <View>
          <View style={Style.itemDetail.container}>
            <Text
              line={30.6}
              textStyle="regular"
              color={Color.greyText.dark.color}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'orderNumber')}
            </Text>
            <Text textStyle="semi" line={30.6} size={Size.text.caption1.size}>
              {getLifetagDetailOrderResponse?.data?.orderNumber}
            </Text>
          </View>
          <View style={Style.itemDetail.container}>
            <Text
              line={30.6}
              textStyle="regular"
              color={Color.greyText.dark.color}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'noResi')}
            </Text>
            <Text textStyle="semi" line={30.6} size={Size.text.caption1.size}>
              {getLifetagDetailOrderResponse?.data?.trackingNumber !== null
                ? getLifetagDetailOrderResponse?.data?.trackingNumber
                : '-'}
            </Text>
          </View>
          <View style={Style.itemDetail.container}>
            <Text
              line={30.6}
              textStyle="regular"
              color={Color.greyText.dark.color}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'kurir')}
            </Text>
            <Text textStyle="semi" line={30.6} size={Size.text.caption1.size}>
              {getLifetagDetailOrderResponse?.data?.courierProvider !== null
                ? getLifetagDetailOrderResponse?.data?.courierProvider
                : '-'}
            </Text>
          </View>
          <View style={Style.itemDetail.container}>
            <Text
              line={30.6}
              textStyle="regular"
              color={Color.greyText.dark.color}
              size={Size.text.caption1.size}>
              {trans(locale, lang, 'orderDate')}
            </Text>
            <Text textStyle="semi" line={30.6} size={Size.text.caption1.size}>
              {moment(getLifetagDetailOrderResponse?.data?.orderDate).format(
                'DD MMMM YYYY'
              )}
            </Text>
          </View>
        </View>
      </Padder>
    );
  }

  function renderTitleInfo() {
    return (
      <Padder style={Style.mt16}>
        <View style={Style.items.container}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {trans(locale, lang, 'titleInfo')}
          </Text>
        </View>
      </Padder>
    );
  }

  function renderCurrentAddress() {
    if (!getLifetagDetailOrderResponse?.data) {
      return null;
    }
    const item = getLifetagDetailOrderResponse?.data?.address;

    const namaJalan = item?.street || '';
    const rt = item?.rt || '';
    const rw = item?.rw || '';
    const kelurahan = formatCapitalizeEachWord(item?.subDistrict || '');
    const kecamatan = formatCapitalizeEachWord(item?.district || '');
    const kota = formatCapitalizeEachWord(item?.city || '');
    const provinsi = formatCapitalizeEachWord(item?.province || '');
    const kodePos = item?.postcode || '';

    const textAddress = `${namaJalan}, ${
      rt && rw ? `RT${rt}/RW${rw}` : ''
    }, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${kodePos}`
      .replace(/ ,/g, '')
      .trim()
      .replace(/^, /g, '')
      .trim()
      .replace(/,$/g, '');

    return (
      <Shadow borderRadius={10} style={[Style.mt16, Style.mb16]}>
        <View>
          <Padder style={Style.p16}>
            <Text textStyle="semi" size={Size.text.caption1.size}>
              {getLifetagDetailOrderResponse?.data?.address?.title === null
                ? trans(locale, lang, 'alamatKtp')
                : getLifetagDetailOrderResponse?.data?.address?.title}
            </Text>
            <Dash
              dashGap={0}
              dashThickness={1}
              dashColor={Color.linearGradientWhite.light.linearGradientWhite}
              style={[Style.mb16, Style.mt16]}
            />
            <View>
              <View style={Style.itemDetail.container}>
                <Text
                  textStyle="semi"
                  color={Color.greyText.dark.color}
                  size={Size.text.caption1.size}>
                  {getLifetagDetailOrderResponse?.data?.name}
                </Text>
                <Text textStyle="semi" size={Size.text.caption1.size}>
                  {getLifetagDetailOrderResponse?.data?.phoneNumber}
                </Text>
              </View>
              <Text
                textStyle="regular"
                size={Size.text.caption1.size}
                line={20.8}
                style={Style.mt8}
                align="left">
                {textAddress}
              </Text>
            </View>
          </Padder>
        </View>
      </Shadow>
    );
  }

  function renderStatusOrder() {
    const isIcon =
      getLifetagDetailOrderResponse?.data?.status === 'ON_PROCESS' ? (
        <Image source={ArrowBottomWarning} style={Style.items.iconArrow} />
      ) : (
        <Image source={ArrowBottomInfo} style={Style.items.iconArrow} />
      );

    const isBorderColor = {
      borderColor:
        getLifetagDetailOrderResponse?.data?.status === 'ON_PROCESS'
          ? Color.warning.light.warning90
          : Color.info.dark.info,
    };

    const isTextColor =
      getLifetagDetailOrderResponse?.data?.status === 'ON_PROCESS'
        ? Color.warning.light.warning90
        : Color.info.dark.info;

    return (
      <View>
        <View style={[Style.btn, isBorderColor]}>
          {isIcon}
          <Text
            textStyle="medium"
            color={isTextColor}
            size={Size.text.body2.size}>
            {getLifetagDetailOrderResponse?.data?.status === 'ON_PROCESS'
              ? trans(locale, lang, 'sedangDiProses')
              : trans(locale, lang, 'sedangDiKirim')}
          </Text>
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder>
        <View style={Style.footer.container}>
          <View style={Style.footer.btn}>
            <Text
              textStyle="semi"
              align="center"
              size={Size.text.caption2.size}
              color={Color.greyText.dark.color}>
              {trans(locale, lang, 'butuhBantuanHubungi')}{' '}
            </Text>
            <Text
              onPress={() => {
                setIsShowModalCustomerCare(true);
              }}
              textStyle="semi"
              align="center"
              size={Size.text.caption2.size}
              color={Color.primary.light.primary90}
              textDecorationLine="underline">
              {trans(locale, lang, 'customerCare')}
            </Text>
          </View>
        </View>
      </Padder>
    );
  }

  return (
    <Base
      bordered
      isBackground
      isPaddingBottom={false}
      onBackPress={() => {
        navigation.pop();
      }}
      title={trans(locale, lang, 'detailOrder')}
      renderBottom={renderFooterContainer()}>
      <ScrollView showsVerticalScrollIndicator={false} style={[Style.mt16]}>
        <Padder>
          {renderStatusOrder()}
          {renderOderItems()}
          {renderDetail()}
          {renderTitleInfo()}
          {renderCurrentAddress()}
        </Padder>
      </ScrollView>
    </Base>
  );
}

export default LifetagDetailOrder;

LifetagDetailOrder.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  lifetagAction: PropTypes.string.isRequired,
  getLifetagDetailOrder: PropTypes.func.isRequired,
  getLifetagDetailOrderResponse: PropTypes.objectOf(Object).isRequired,
  setIsShowModalCustomerCare: PropTypes.func.isRequired,
  // getLifetagProductDetailFailed: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};
