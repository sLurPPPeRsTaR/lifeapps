import { View } from 'react-native';
import React from 'react';
import { trans } from 'ca-util/trans';
import { formatNumber } from 'ca-util/numbro';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';

function BottomTotal(props) {
  const {
    colorScheme,
    lang,
    getProduct,
    isDisabled,
    promo,
    subLabel,
    buttonLabel,
    onSubmit,
  } = props;

  return (
    <Padder style={style.total.container}>
      <View style={style.total.labelContainer}>
        <Text textStyle="semi" color={Color.neutral[colorScheme].neutral40}>
          {trans(locale, lang, 'total')}
        </Text>
        <View style={style.total.labelPrice}>
          <Text
            textStyle="semi"
            style={style.mb10}
            size={20}
            color={Color.greenActive[colorScheme].color}>
            {promo || formatNumber(getProduct?.subsPrice)}
          </Text>
          {subLabel}
        </View>
      </View>
      <Button
        onPress={onSubmit}
        rounded="lg"
        disabled={isDisabled}
        type="linear-gradient">
        <Text textStyle="semi" color="white">
          {buttonLabel}
        </Text>
      </Button>
    </Padder>
  );
}

BottomTotal.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  getProduct: PropTypes.objectOf(Object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  promo: PropTypes.string.isRequired,
  subLabel: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default BottomTotal;
