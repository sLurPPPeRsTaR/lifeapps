import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import Text from 'ca-component-generic/Text';
import { Image, TouchableHighlight, View } from 'react-native';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import Color from 'ca-config/Color';
import { Close } from 'ca-config/Svg';
import { LPSpeakerLock } from 'ca-config/Image';
import { NAVIGATION } from 'ca-util/constant';
import PropTypes from 'prop-types';
import style from '../../../style';
import locale from '../../../locale';

function LifesaverErrorSubmission(props) {
  const { isVisible, lang, onBackPress, message, navigation, isTips } = props;

  const getMessage = (msg) => {
    if (locale?.en?.[msg] && locale?.id?.[msg]) {
      return msg;
    }
    return 'ERROR_DEFAULT';
  };
  return (
    <BottomSheet swipeable={false} isVisible={isVisible}>
      <TouchableHighlight
        underlayColor={Color.whiteCard.light.color}
        onPress={onBackPress}>
        <Close width={27} height={27} />
      </TouchableHighlight>
      <View style={style.modalErrSubs.imageContainer}>
        <Image source={LPSpeakerLock} style={style.modalErrSubs.image} />
      </View>
      <View>
        <Text size={Size.text.h6.size} textStyle="bold" align="center">
          {trans(locale, lang, 'mohonMaaf')}
        </Text>
        <Text
          color={Color.neutralLifeSaver.light.neutral40}
          style={style.mt10}
          textStyle="semi"
          align="center">
          {trans(locale, lang, getMessage(message))}
        </Text>
        {isTips ? (
          <Text
            color={Color.neutralLifeSaver.light.neutral40}
            style={style.mt10}
            Size={Size.text.caption1.size}
            align="center"
            textStyle="medium">
            {trans(locale, lang, `${message}_TIPS`)}
          </Text>
        ) : null}
      </View>
      <View style={style.mt32}>
        <Button
          color={Color.whiteCard.light.color}
          outline
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
            onBackPress();
          }}
          borderColor={Color.primary.light.primary90}
          type="linear-gradient"
          rounded="lg">
          <Text textStyle="semi" color={Color.primary.light.primary90}>
            {trans(locale, lang, 'hubCustomerCare')}
          </Text>
        </Button>
      </View>
      <View style={style.mt10}>
        <Button onPress={onBackPress} type="linear-gradient" rounded="lg">
          <Text textStyle="semi" color={Color.whiteCard.light.color}>
            {trans(locale, lang, 'kembali')}
          </Text>
        </Button>
      </View>
    </BottomSheet>
  );
}

LifesaverErrorSubmission.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  isTips: PropTypes.bool.isRequired,
};

export default LifesaverErrorSubmission;
