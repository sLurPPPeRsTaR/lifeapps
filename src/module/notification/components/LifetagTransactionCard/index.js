import React, { useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import Dash from 'react-native-dash';
import Size from 'ca-config/Size';
import { formatCurrency } from 'ca-util/numbro';
import moment from 'moment';
import { LifetagProduct } from 'ca-config/Image';
import 'moment/locale/id';
import { trans } from 'ca-util/trans';
import { store } from 'ca-config/Store';
import locale from './locale';
import Styles from './style';

function LifetagTransactionCard(props) {
  const {
    key,
    style,
    lang,
    trackingNumber,
    product,
    onPress,
    orderNumber,
    createdAt,
    status,
    courierProvider,
  } = props;

  moment.locale(lang);

  const colorsStyle = {
    ON_PROCESS: {
      backgroundColor: Color.backgroundAlertDialogue.light.color,
      textColor: Color.warning.light.warning90,
    },
    ON_DELIVERY: {
      backgroundColor: Color.blueInfo.light.blueInfo15,
      textColor: Color.blueInfo.light.blueInfo100,
    },
  };

  const { width } = store.getState().bootstrap.dimensions;

  const badgeTextSize = useMemo(() => {
    if (width >= 450) {
      return Size.text.body2.size;
    }
    if (width > 320 && width < 450) {
      return Size.text.caption1.size;
    }
    return Size.text.caption1.size - 3;
  }, [width]);

  const badgeShipmentStatus = useMemo(() => {
    if (width > 320 && width < 450) {
      return 12;
    }
    return 10;
  }, [width]);

  function renderProductData(item) {
    const imageSource = item?.productColour?.image
      ? { uri: item?.productColour?.image }
      : LifetagProduct;
    return (
      <View style={[Styles.row, Styles.mb12]}>
        <Image
          source={imageSource}
          style={Styles.productImage}
          resizeMode="cover"
        />
        <View style={[Styles.flex1, Styles.ml12]}>
          <Text
            textStyle="bold"
            size={Size.text.caption1.size}
            line={18}
            style={Styles.mb6}>
            {item.productName}
          </Text>
          {item?.productDiscount ? (
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.lifetagGreyText.light.color}
              style={Styles.mb2}
              textDecorationLine={
                item?.productDiscount ? 'line-through' : 'none'
              }>
              Rp
              {formatCurrency({
                value: item.productPrice * item?.productQuantity,
                mantissa: 0,
              })}
              ,-
            </Text>
          ) : null}
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            color={Color.primary.light.primary90}>
            Rp
            {formatCurrency({
              value:
                item.productPrice * item?.productQuantity -
                (item?.productDiscount || 0),
              mantissa: 0,
            })}
            ,-
          </Text>

          <View
            style={[
              Styles.shipmentStatus,
              {
                backgroundColor: colorsStyle[status].backgroundColor,
                paddingHorizontal: badgeShipmentStatus,
              },
            ]}>
            <Text
              textStyle="medium"
              size={badgeTextSize}
              color={colorsStyle[status].textColor}>
              {trans(locale, lang, status)}
            </Text>
          </View>
          <View style={[Styles.containerText, Styles.mt4]}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.lifetagGreyText.light.color}
              style={Styles.mb2}>
              {trans(locale, lang, 'kuantitas')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.lifetagGreyText.light.color}
              style={Styles.mb2}>
              x{item?.productQuantity}
            </Text>
          </View>
          <View style={[Styles.containerText, Styles.mt4]}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.lifetagGreyText.light.color}
              style={Styles.mb2}>
              {trans(locale, lang, 'warna')}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.lifetagGreyText.light.color}
              style={Styles.mb2}>
              {item?.productColour?.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderHeader() {
    if (!product) {
      return null;
    }
    return <View>{product?.map((item) => renderProductData(item))}</View>;
  }

  function renderDataRow(rowKey, rowValue) {
    return (
      <View style={[Styles.row, Styles.justifyContentSpaceBetween, Styles.mb8]}>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          line={18}
          color={Color.mediumGray.light.mediumGray}>
          {rowKey}
        </Text>
        <Text textStyle="semi" size={Size.text.caption1.size} line={18}>
          {rowValue}
        </Text>
      </View>
    );
  }

  function renderContent() {
    return (
      <View>
        {renderDataRow(trans(locale, lang, 'nomorPesanan'), orderNumber)}
        {renderDataRow(trans(locale, lang, 'nomorResi'), trackingNumber || '-')}
        {renderDataRow(trans(locale, lang, 'kurir'), courierProvider || '-')}
        {renderDataRow(
          trans(locale, lang, 'tanggalPemesanan'),
          moment(createdAt).format('DD MMMM YYYY')
        )}
      </View>
    );
  }

  return (
    <Shadow borderRadius={30} style={[style, Styles.mt16, Styles.mx16]}>
      <TouchableOpacity key={key} onPress={onPress}>
        <View style={Styles.container}>
          {renderHeader()}
          <Dash
            dashGap={0}
            dashThickness={1}
            dashColor={Color.linearGradientWhite.light.linearGradientWhite}
            style={Styles.mb12}
          />
          {renderContent()}
        </View>
      </TouchableOpacity>
    </Shadow>
  );
}

export default LifetagTransactionCard;

LifetagTransactionCard.defaultProps = {
  key: null,
  style: null,
  trackingNumber: null,
};

LifetagTransactionCard.propTypes = {
  key: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  lang: PropTypes.string.isRequired,
  trackingNumber: PropTypes.string,
  product: PropTypes.arrayOf(Object).isRequired,
  onPress: PropTypes.func.isRequired,
  orderNumber: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  courierProvider: PropTypes.string.isRequired,
};
