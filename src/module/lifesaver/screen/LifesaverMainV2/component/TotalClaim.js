import React from 'react';
import Text from 'ca-component-generic/Text';
import { View, Image } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { LifeSaverLogo, LifeSAVERplusActive } from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import style from '../style';
import locale from '../locale';

function TotalClaim({
  lang,
  lifeSaverTotalClaim = 'Rp123.456.789,-',
  lifeSaverPlusTotalClaim = 'Rp123.456.789,-',
}) {
  return (
    <View style={style.totalClaim.container}>
      <Text
        textStyle="semi"
        size={Size.text.body1.size}
        color={Color.main.light.black}
        align="center">
        {trans(locale, lang, 'Total Claim Terbayarkan')}
      </Text>
      <View style={style.totalClaim.cardContainer}>
        <View style={style.totalClaim.cardItemLeft}>
          <Image
            source={LifeSaverLogo}
            style={style.totalClaim.cardImageLeft}
          />
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={Color.main.light.black}
            align="center">
            {lifeSaverTotalClaim}
          </Text>
        </View>
        <View style={style.totalClaim.cardItemRight}>
          <Image
            source={LifeSAVERplusActive}
            style={style.totalClaim.cardImageRight}
          />
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={Color.main.light.black}
            align="center">
            {lifeSaverPlusTotalClaim}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default TotalClaim;

TotalClaim.propTypes = {
  lang: PropTypes.string.isRequired,
  lifeSaverTotalClaim: PropTypes.string.isRequired,
  lifeSaverPlusTotalClaim: PropTypes.string.isRequired,
};
