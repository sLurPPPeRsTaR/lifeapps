import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Input from 'ca-component-generic/Input';
import { KadoWhitePolos } from 'ca-config/Image';
import LinearGradient from 'react-native-linear-gradient';
import locale from '../locale';
import style from '../style';

function Form({ lang }) {
  const CheckButton = useCallback(
    ({ onPress, disabled = false }) => {
      if (!disabled) {
        return (
          <View style={style.form.checkButtonDisabled}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.neutral.light.neutral40}>
              {trans(locale, lang, 'cek')}
            </Text>
          </View>
        );
      }
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#f15157', '#ed1c24']}
            style={style.form.checkButton}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.main.light.white}>
              {trans(locale, lang, 'cek')}
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      );
    },
    [lang]
  );

  return (
    <View style={style.form.container}>
      <View style={style.form.imageContainer}>
        <Image
          source={KadoWhitePolos}
          resizeMode="contain"
          style={style.form.image}
        />
      </View>

      <View style={[style.m25]}>
        <View style={style.mb16}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.neutral.light.neutral80}>
            {trans(locale, lang, 'masukkanDataBerikut')}
          </Text>
        </View>
        <Input
          suffixIcon={<CheckButton />}
          handleSuffixIcon={() => {}}
          placeholder={trans(locale, lang, 'noPolisKTPNoHp')}
          onCangeText={() => {}}
          height={56}
        />
      </View>
    </View>
  );
}

export default Form;

Form.defaultProps = {
  // isVisible: false,
};

Form.propTypes = {
  lang: PropTypes.string.isRequired,
  // isVisible: PropTypes.bool,
  // setIsVisible: PropTypes.func.isRequired,
  // navigation: PropTypes.objectOf(Object).isRequired,
};
