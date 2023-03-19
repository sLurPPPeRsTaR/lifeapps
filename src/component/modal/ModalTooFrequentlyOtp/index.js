import React, { useEffect, useState } from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { View, Image } from 'react-native';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import { ClockOTP } from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import locale from '../locale';
import style from './style';

function ModalTooFrequentlyOtp(props) {
  const { isVisible, swipeable, lang, onTryAgainPress, remainingSeconds } =
    props;

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(2);

  // Set seconds and minutes
  useEffect(() => {
    const min = Math.floor(remainingSeconds / 60);
    const sec = remainingSeconds - min * 60;
    setMinutes(min);
    setSeconds(sec);
  }, [remainingSeconds]);

  // Timer
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Time String
  function showRemainingTime() {
    let min = minutes;
    let sec = seconds;
    if (minutes < 10) {
      min = `0${minutes}`;
    }
    if (seconds < 10) {
      sec = `0${seconds}`;
    }
    return `${min}:${sec}`;
  }

  // Clear User Block
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      onTryAgainPress();
    }
  }, [minutes, onTryAgainPress, seconds]);

  return (
    <BottomSheet
      isVisible={isVisible}
      swipeable={swipeable}
      onClosePress={onTryAgainPress}
      onRequestClose={onTryAgainPress}>
      <View style={style.container}>
        <Image source={ClockOTP} style={style.icon} resizeMode="contain" />
        <Text
          style={style.title}
          textStyle="bold"
          size={Size.text.body1.size}
          line={21}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'andaTerlaluSering')}
        </Text>
        <Text
          style={style.subtitle}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}>
          {trans(locale, lang, 'untukSementaraWaktu')}
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.primary.light.primary90}>
            {showRemainingTime()}
          </Text>
        </Text>
        <Button block onPress={onTryAgainPress} style={style.button1}>
          {trans(locale, lang, 'cobaLagi')}
        </Button>
      </View>
    </BottomSheet>
  );
}

ModalTooFrequentlyOtp.defaultProps = {
  isVisible: false,
  swipeable: false,
  remainingSeconds: 0,
};

ModalTooFrequentlyOtp.propTypes = {
  isVisible: PropTypes.bool,
  swipeable: PropTypes.bool,
  lang: PropTypes.string.isRequired,
  onTryAgainPress: PropTypes.func.isRequired,
  remainingSeconds: PropTypes.number,
};

export default ModalTooFrequentlyOtp;
