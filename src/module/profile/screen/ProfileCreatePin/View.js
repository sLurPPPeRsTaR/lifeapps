import React from 'react';
import Base from 'ca-component-container/Base';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import { trans } from 'ca-util/trans';
import locale from './locale';
import Style from './style';

function ProfileCreatePin(props) {
  const { navigation, lang } = props;

  function renderButton() {
    return (
      <View style={Style.renderButtonWrapper}>
        <Button
          onPress={() => {
            navigation.replace(NAVIGATION.PROFILE.ProfileCreateNewPin);
          }}>
          {trans(locale, lang, 'btnLabel')}
        </Button>
      </View>
    );
  }

  function boxMsg() {
    return (
      <View style={Style.boxMsg.wrapper}>
        <View style={Style.boxMsg.box}>
          <View style={Style.boxMsg.msg}>
            <Text
              textStyle="semi"
              line={25.6}
              letterSpacing={0.5}
              color={Color.main.light.white}
              size={Size.text.body1.size}>
              {trans(locale, lang, 'msgBoxText')}
            </Text>
          </View>
        </View>
        <Text
          textStyle="semi"
          align="center"
          letterSpacing={0.5}
          line={21}
          style={Style.boxMsg.text}>
          {trans(locale, lang, 'contentText')}
        </Text>
      </View>
    );
  }

  return (
    <Base
      renderBottom={renderButton()}
      title={trans(locale, lang, 'title')}
      onBackPress={() => navigation.pop()}>
      <Padder style={Style.padder.container}>{boxMsg()}</Padder>
    </Base>
  );
}

export default ProfileCreatePin;

ProfileCreatePin.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
};
