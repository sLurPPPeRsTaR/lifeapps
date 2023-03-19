import React, { useCallback } from 'react';
import Text from 'ca-component-generic/Text';
import { TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Color from 'ca-config/Color';
import { NAVIGATION } from 'ca-util/constant';
import Size from 'ca-config/Size';
import { ChevronRightRed } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import style from '../style';
import locale from '../locale';

function TermsFAQ({ lang, navigation, onBackPress }) {
  const ButtonWithChevron = useCallback(({ title, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={style.termsFAQ.termsBtn}>
        <Text
          textStyle="bold"
          size={Size.text.caption1.size}
          line={21}
          align="left">
          {title}
        </Text>
        <ChevronRightRed width={15} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={style.termsFAQ.container}>
      <ButtonWithChevron
        onPress={() => {
          onBackPress();
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan);
        }}
        title={trans(locale, lang, 'syaratDanKetentuan')}
      />

      <ButtonWithChevron
        style={style.termsFAQ.buttonText}
        onPress={() => {
          onBackPress();
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay);
        }}
        title={trans(locale, lang, 'ringkasanInformasi')}
      />

      <ButtonWithChevron
        style={style.termsFAQ.buttonText}
        onPress={() => {
          onBackPress();
          navigation.navigate(NAVIGATION.LIFESAVER.LifesaverFAQ, {
            personalURL: false,
          });
        }}
        title={trans(locale, lang, 'faq')}
      />

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <View style={style.termsFAQ.helpContainer}>
          <Text
            textStyle="semi"
            size={Size.text.caption2.size}
            color={Color.mediumGray.light.mediumGray}
            align="center"
            style={style.termsFAQ.helpText}>
            {trans(locale, lang, 'butuhBantuan')}
          </Text>
          <Text
            textStyle="semi"
            size={Size.text.caption2.size}
            color={Color.red.light.red90}
            align="center">
            {trans(locale, lang, 'customerCare')}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Text
        textStyle="semi"
        size={Size.text.caption1.size}
        color={Color.mediumGray.light.mediumGray}
        align="center">
        {trans(locale, lang, 'ptAsuransiJiwa')}
      </Text>
    </View>
  );
}

export default TermsFAQ;

TermsFAQ.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};
