import React from 'react';
import Text from 'ca-component-generic/Text';
import { View } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import style from '../style';
import locale from '../locale';

function ReferalInfo({ lang, totalShare, totalRegister, totalBerlangganan }) {
  return (
    <View style={style.headStyle.container}>
      <View style={style.headStyle.itemContainer}>
        <Text
          textStyle="semi"
          line={40}
          size={Size.text.h5.size}
          color={Color.neutral.light.neutral60}>
          {totalShare}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          color={Color.mediumDarkGray.light.mediumDarkGray}>
          {trans(locale, lang, 'shared')}
        </Text>
      </View>
      <View style={style.headStyle.divider} />
      <View style={style.headStyle.itemContainer}>
        <Text
          textStyle="semi"
          line={40}
          size={Size.text.h5.size}
          color={Color.neutral.light.neutral60}>
          {totalRegister}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          color={Color.mediumDarkGray.light.mediumDarkGray}>
          {trans(locale, lang, 'register')}
        </Text>
      </View>
      <View style={style.headStyle.divider} />
      <View style={style.headStyle.itemContainer}>
        <Text
          textStyle="semi"
          line={40}
          size={Size.text.h5.size}
          color={Color.neutral.light.neutral60}>
          {totalBerlangganan}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          color={Color.mediumDarkGray.light.mediumDarkGray}>
          {trans(locale, lang, 'subscribe')}
        </Text>
      </View>
    </View>
  );
}

export default ReferalInfo;

ReferalInfo.defaultProps = {
  totalShare: 0,
  totalRegister: 0,
  totalBerlangganan: 0,
};

ReferalInfo.propTypes = {
  lang: PropTypes.string.isRequired,
  totalShare: PropTypes.number,
  totalRegister: PropTypes.number,
  totalBerlangganan: PropTypes.number,
};
