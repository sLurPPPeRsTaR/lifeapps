import React from 'react';
import Shadow from 'ca-component-container/Shadow';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { formatNumber } from 'ca-util/numbro';
import { trans } from 'ca-util/trans';
import moment from 'moment/min/moment-with-locales';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';

function TotalClaimBanner(props) {
  const {
    lang,
    width,
    value,
    getPolicyWidgetHomePublicResponse,
    highlightEventStyle,
  } = props;
  moment.locale(lang);

  const isDeviceTablet = width > 450;
  let generalTextSize = Size.text.h6.size;
  let totalClaimTextSize = Size.text.h3.size;

  if (width > 320 && width < 450) {
    generalTextSize = Size.text.caption2.size - 2;
    totalClaimTextSize = Size.text.h5.size;
  } else if (width <= 320) {
    generalTextSize = Size.text.caption2.size - 3;
    totalClaimTextSize = Size.text.h6.size;
  }

  const WIDTH_EMULATOR = 392.73;
  const WIDTH_EMULATOR_TAB = 900;
  const BANNER_WIDTH = {
    width: width - 34 - 20,
  };

  const sinceStyle = {
    position: 'absolute',
    top: (48 * width) / WIDTH_EMULATOR,
    alignItems: 'center',
  };
  const sinceTabStyle = {
    position: 'absolute',
    bottom: (140 * width) / WIDTH_EMULATOR_TAB,
    alignItems: 'center',
  };

  const claimStyle = {
    position: 'absolute',
    bottom: (25 * width) / WIDTH_EMULATOR,
    alignItems: 'center',
  };

  const claimTabStyle = {
    position: 'absolute',
    bottom: (70 * width) / WIDTH_EMULATOR_TAB,
    alignItems: 'center',
  };

  return (
    <Shadow borderRadius={8} style={highlightEventStyle}>
      <Image
        source={value?.banner}
        style={[
          style.imgHighlight,
          {
            width: width - 34 - 20,
            height: width / 3,
          },
        ]}
      />
      {/* <View style={isDeviceTablet ? sinceTabStyle : sinceStyle}> */}
      <View style={[isDeviceTablet ? sinceTabStyle : sinceStyle, BANNER_WIDTH]}>
        <View style={isDeviceTablet ? style.sinceBadgeTab : style.sinceBadge}>
          <Text
            textStyle="semi"
            color={Color.main.light.white}
            size={generalTextSize}>
            {trans(locale, lang, 'periode')}{' '}
            {moment(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.oldestDate
            ).format('DD MMM YYYY')}{' '}
            -{' '}
            {moment(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.latestDate
            ).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={[isDeviceTablet ? claimTabStyle : claimStyle, BANNER_WIDTH]}>
          <Text
            textStyle="bold"
            color={Color.main.light.white}
            size={totalClaimTextSize}>
            {lang === 'id' ? 'Rp ' : 'IDR '}
            {formatNumber(
              getPolicyWidgetHomePublicResponse?.data?.totalClaim?.totalClaim ||
                0,
              lang,
              true,
              false,
              1
            )}
          </Text>
        </View>
      </View>
    </Shadow>
  );
}

export default TotalClaimBanner;

TotalClaimBanner.propTypes = {
  lang: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  value: PropTypes.objectOf(Object).isRequired,
  getPolicyWidgetHomePublicResponse: PropTypes.objectOf(Object).isRequired,
  highlightEventStyle: PropTypes.objectOf(Object).isRequired,
};
