import Color from 'ca-config/Color';
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import style from './style';

function ProgressBar({ step, maxStep }) {
  const progressBarWidth = (() => {
    const calculateStep = step / maxStep;
    return calculateStep * Size.screen.width;
  })();
  const linearGradientStyle = (() => ({
    height: 4,
    width: progressBarWidth,
  }))();

  return (
    <View style={style.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          Color.buttonGradient.light.buttonGradient0,
          Color.buttonGradient.light.buttonGradient1,
        ]}
        style={linearGradientStyle}
      />
    </View>
  );
}

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
};

export default ProgressBar;
