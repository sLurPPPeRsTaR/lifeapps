import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Size from 'ca-config/Size';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import { Protected } from 'ca-config/Svg';
import PropTypes from 'prop-types';
import locale from './locale';
import style from './style';

function LifesaverProtected(props) {
  const { lang, navigation } = props;
  const maxScreenTime = 3;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= maxScreenTime) {
      setTimeout(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else {
      navigation.pop();
    }
  }, [navigation, seconds]);
  return (
    <Base
      bordered={false}
      isBackground={false}
      onClosePress={() => {
        navigation.pop();
      }}
      staticView>
      <View style={style.container}>
        <Protected />
        <Text style={style.mt24} textStyle="bold" size={Size.text.h6.size}>
          {trans(locale, lang, 'kamuSudahTerproteksi')}
        </Text>
        <Text textStyle="bold" size={Size.text.h6.size}>
          {trans(locale, lang, 'dengan')}{' '}
          <Text textStyle="bold" size={Size.text.h6.size}>
            Life
          </Text>
          <Text fontStyle="italic" size={Size.text.h6.size}>
            SAVER+
          </Text>
        </Text>
      </View>
    </Base>
  );
}

LifesaverProtected.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverProtected;
