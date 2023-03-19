import React from 'react';
import { View, Linking } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import moment from 'moment/min/moment-with-locales';
import Text from 'ca-component-generic/Text';
import { Ambulance2 } from 'ca-config/Svg';
import { api } from 'ca-bootstrap/bootstrapApi';
import { API, EMERGENCY_PHONE } from 'ca-util/constant';
import { store } from 'ca-config/Store';
import locale from '../../../locale';
import Style from './style';

function ModalSos({ isVisible, setIsVisible }) {
  const { lang } = store.getState().auth;
  moment.locale(lang);
  return (
    <BottomSheet isVisible={isVisible} swipeable={false}>
      <View style={Style.container}>
        <Ambulance2
          width={146}
          height={160}
          style={Style.icon}
          resizeMode="contain"
        />
      </View>
      <View style={Style.mt65}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={Style.title}>
          {trans(locale, lang, 'butuhBantuanEmergency')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={Style.subtitle}>
          {trans(locale, lang, 'ayoBerikan')}
        </Text>
        <Button outline style={Style.button1} onPress={() => setIsVisible()}>
          {trans(locale, lang, 'kembali')}
        </Button>
        <Button
          type="linear-gradient"
          onPress={() => {
            // setCallTimeApi()
            api.post(API.LIFESAVER.setCallTime);
            setTimeout(() => {
              Linking.openURL(EMERGENCY_PHONE.PHONE);
            }, 500);
          }}>
          {trans(locale, lang, 'teleponSekarang')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ModalSos;

ModalSos.defaultProps = {
  isVisible: false,
  lang: 'en',
};

ModalSos.propTypes = {
  lang: PropTypes.string,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func.isRequired,
};
