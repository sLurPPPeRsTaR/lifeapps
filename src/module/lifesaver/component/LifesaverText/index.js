import Text from 'ca-component-generic/Text';
import { PRODUCT } from 'ca-util/constant';
import React from 'react';

function LifesaverText(props) {
  const { textStyle, planName, size, color } = props;
  if (planName === PRODUCT.LIFESAVER.LIFESAVER_POS) {
    return (
      <Text textStyle={textStyle} size={size} color={color}>
        Life
        <Text size={size} color={color} textStyle={`${textStyle}Italic`}>
          SAVER
        </Text>{' '}
        POS
      </Text>
    );
  }
  if (planName === PRODUCT.LIFESAVER.LIFESAVER) {
    return (
      <Text textStyle={textStyle} size={size} color={color}>
        Life
        <Text size={size} color={color} textStyle={`${textStyle}Italic`}>
          SAVER
        </Text>
      </Text>
    );
  }
  if (planName === PRODUCT.LIFESAVER.LIFESAVER_PLUS) {
    return (
      <Text textStyle={textStyle} size={size} color={color}>
        Life
        <Text size={size} color={color} textStyle={`${textStyle}Italic`}>
          SAVER+
        </Text>
      </Text>
    );
  }
  if (planName === PRODUCT.LIFESAVER.LIFESAVER_PRO) {
    return (
      <Text textStyle={textStyle} size={size} color={color}>
        Life
        <Text size={size} color={color} textStyle={`${textStyle}Italic`}>
          SAVER
        </Text>
        Pro
      </Text>
    );
  }

  return null;
}

export default LifesaverText;
