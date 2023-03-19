import React from 'react';
import { Linking, View } from 'react-native';
import PropTypes from 'prop-types';
import { Base } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import moment from 'moment/min/moment-with-locales';
import { Ambulance2, Attention } from 'ca-config/Svg';
import locale from './locale';
import style from './style';
import { EMERGENCY_PHONE } from 'ca-util/constant';

function HomeSos(props) {
  const { navigation, lang, getCSInfoResponse, setCallTime } = props;
  moment.locale(lang);

  function renderHeaderContainer() {
    return (
      <View style={style.header}>
        <Ambulance2 width={146} height={160} />
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          letterSpacing={0.5}
          line={27}>
          {trans(locale, lang, 'butuhbantuanEmergency')}
        </Text>
        <Text
          textStyle="medium"
          align="center"
          size={Size.text.h6.size}
          letterSpacing={0.5}
          line={18}
          color={Color.grey50.light.grey50}
          style={style.marginTop16}>
          {trans(locale, lang, 'telpdarurat')}
        </Text>
      </View>
    );
  }

  function renderBottom() {
    const phone = getCSInfoResponse?.data.find(
      (item) => item.code === 'phoneNumber'
    );
    return (
      <Padder style={style.pb40}>
        <Button
          type="linear-gradient"
          onPress={() => {
            setCallTime();
            setTimeout(() => {
              Linking.openURL(EMERGENCY_PHONE.PHONE);
            }, 500);
          }}>
          {trans(locale, lang, 'teleponSekarang')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      bordered
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      title={trans(locale, lang, 'emergencyButton')}
      onBackPress={() => navigation.pop()}
      renderBottom={renderBottom()}>
      {renderHeaderContainer()}
      <View style={style.alert.container}>
        <Attention />
        <View style={style.alert.text}>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            letterSpacing={0.5}>
            {trans(locale, lang, 'sambunganteleponiniGRATIS')}&nbsp;
            <Text
              textStyle="bold"
              size={Size.text.caption1.size}
              letterSpacing={0.5}>
              {trans(locale, lang, 'GRATIS')}
            </Text>
          </Text>
        </View>
      </View>
    </Base>
  );
}

export default HomeSos;

HomeSos.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  getCSInfoResponse: PropTypes.arrayOf(Object).isRequired,
  setCallTime: PropTypes.func.isRequired,
};
