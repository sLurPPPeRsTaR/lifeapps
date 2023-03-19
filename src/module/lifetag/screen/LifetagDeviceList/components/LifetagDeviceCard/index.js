import React from 'react';
import { Image, Touchable, View } from 'react-native';
import PropTypes from 'prop-types';
import Shadow from 'ca-component-container/Shadow';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Dash from 'react-native-dash';
import { trans } from 'ca-util/trans';
import { formatCapitalizeEachWord } from 'ca-util/format';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRight } from 'ca-config/Svg';
import Styles from './style';
import locale from './locale';

function LifetagDeviceCard(props) {
  const { lang, colorScheme, data, style, onPress } = props;

  function renderHeader() {
    return (
      <View style={Styles.header.container}>
        <Image
          source={{ uri: data?.productImage }}
          style={Styles.header.image}
          resizeMode="cover"
        />
        <View style={Styles.header.content}>
          <View style={Styles.flex1}>
            <Text textStyle="bold" size={Size.text.body2.size} line={22}>
              {data?.productName}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              line={18}
              color={Color.mediumGray[colorScheme].mediumGray}>
              {formatCapitalizeEachWord(data?.name?.toLowerCase())}
            </Text>
          </View>
          <ArrowRight
            fill={Color.primary.light.primary90}
            width={10}
            height={10}
          />
        </View>
      </View>
    );
  }

  function renderRow(key, value) {
    return (
      <View style={Styles.content.row}>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          line={17}
          align="left"
          color={Color.mediumGray[colorScheme].mediumGray}
          style={Styles.flex1}>
          {key}
        </Text>
        <Text
          textStyle="semi"
          size={Size.text.caption1.size}
          line={17}
          align="right"
          style={[Styles.flex1, Styles.flexShrink1]}>
          {value}
        </Text>
      </View>
    );
  }

  function renderContent() {
    const emergencyContactLabel = trans(locale, lang, 'nomorTeleponDarurat');
    const bloodTypeKey = trans(locale, lang, 'golonganDarah');
    const allergicKey = trans(locale, lang, 'alergi');
    const diseaseHistoryKey = trans(locale, lang, 'riwayatPenyakit');
    return (
      <View>
        {data?.emergencyContact.map((item, index) => {
          return renderRow(
            `${emergencyContactLabel} ${index + 1 > 1 ? index + 1 : ''}`,
            item?.mobilePhoneNumber
          );
        })}
        {renderRow(bloodTypeKey, data?.bloodType)}
        {renderRow(allergicKey, data?.allergic?.join(', ') || '-')}
        {renderRow(diseaseHistoryKey, data?.diseaseHistory?.join(', ') || '-')}
      </View>
    );
  }

  return (
    <Shadow borderRadius={30} style={style}>
      <TouchableOpacity onPress={onPress}>
        <View style={Styles.container}>
          {renderHeader()}
          <Dash
            dashGap={0}
            dashThickness={1}
            dashColor={Color.grayBorder[colorScheme].grayBorder}
            style={Styles.dash}
          />
          {renderContent()}
        </View>
      </TouchableOpacity>
    </Shadow>
  );
}

export default LifetagDeviceCard;

LifetagDeviceCard.defaultProps = {
  style: null,
};

LifetagDeviceCard.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  data: PropTypes.objectOf(Object).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func.isRequired,
};
