import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import Color from 'ca-config/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import locale from './locale';
import style from './style';

function ColorList(props) {
  const {
    lang,
    data,
    order,
    onColorPress,
    index,
    onPlusQtyPress,
    onMinusQtyPress,
    disabled,
    isColorDisabled,
  } = props;

  return (
    <>
      <Padder>
        <View style={style.renderProductColor.lifetagColorContainer}>
          <Text style={style.mR8} textStyle="medium">
            {trans(locale, lang, 'pilihWarna')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            color={Color.neutralLifeSaver.light.neutral40}>
            {order?.lifetagColorName}
          </Text>
        </View>
      </Padder>
      <View style={style.renderProductColor.colorContainer}>
        <FlatList
          contentContainerStyle={style.renderProductColor.flatlistContainer}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          data={data?.colourList}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
            const styleCircleColor =
              item?.stock &&
              !isColorDisabled({ color: item, colorIndex: index })
                ? item?.codeList?.join(' ')
                : Color.lifetagGrayColor.light.color;

            const styleBorderColor =
              order?.lifetagColor === item?.codeList?.join(' ')
                ? Color.primary.light.primary90
                : null;

            const styleBorderWidth =
              order?.lifetagColor === item?.codeList?.join(' ') ? 3 : 0;

            return (
              <TouchableOpacity
                disabled={
                  disabled ||
                  isColorDisabled({ color: item, colorIndex: index })
                }
                onPress={() => {
                  onColorPress({
                    color: item,
                    colorIndex: index,
                    price: data?.price,
                    discount: data?.discount,
                  });
                }}
                style={[
                  style.renderProductColor.touchableContainer,
                  {
                    borderColor: styleBorderColor,
                    borderWidth: styleBorderWidth,
                  },
                ]}>
                <View
                  style={[
                    style.renderProductColor.circleContainer,
                    { backgroundColor: styleCircleColor },
                  ]}
                />
              </TouchableOpacity>
            );
          }}
        />
        <View style={style.renderProductColor.qtyContainer}>
          <TouchableOpacity
            onPress={() => {
              onMinusQtyPress({
                qty: order?.productQty,
                colorIndex: index,
                price: data?.price,
                discount: data?.discount,
              });
            }}
            style={style.renderProductColor.qtyMinusContainer}>
            <Text
              color={
                order?.productQty <= 1 && index === 0
                  ? Color.lifetagQtyCounterColor.light.color
                  : Color.primary.light.primary90
              }>
              -
            </Text>
          </TouchableOpacity>
          <View style={style.pH8}>
            <Text color={Color.lifetagQtyBgColor.light.color}>
              {order?.productQty}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              onPlusQtyPress({
                qty: order?.productQty,
                colorIndex: index,
                price: data?.price,
                discount: data?.discount,
              });
            }}
            style={style.renderProductColor.qtyPlusContainer}>
            <Text
              color={
                order?.productQty >= 1
                  ? Color.primary.light.primary90
                  : Color.lifetagQtyCounterColor.light.color
              }>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default ColorList;

ColorList.defaultProps = {};

ColorList.propTypes = {
  lang: PropTypes.string.isRequired,
  data: PropTypes.objectOf(Object).isRequired,
  order: PropTypes.objectOf(Object).isRequired,
  onColorPress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onPlusQtyPress: PropTypes.func.isRequired,
  onMinusQtyPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isColorDisabled: PropTypes.func.isRequired,
};
