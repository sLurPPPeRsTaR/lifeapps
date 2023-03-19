import React from 'react';
import { View } from 'react-native';
import Text from 'ca-component-generic/Text';
import { Protected } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import locale from '../locale';
import style from '../style';

function InvitationSuccess(props) {
  const { lang } = props;
  return (
    <View style={style.invitationSuccess.container}>
      <Protected />
      <View style={style.invitationSuccess.textContainer}>
        <Text
          line={35}
          textStyle="bold"
          align="center"
          size={Size.text.body1.size}
          color={Color.main.light.black}>
          {trans(locale, lang, 'suksesMenambahUndangan')}
        </Text>
        <Text
          line={22}
          align="center"
          size={Size.text.body1.size}
          color={Color.neutral.light.neutral40}>
          {trans(locale, lang, 'kirimSms')}
        </Text>
      </View>
    </View>
  );
}

export default InvitationSuccess;

InvitationSuccess.propTypes = {
  lang: PropTypes.string.isRequired,
};
