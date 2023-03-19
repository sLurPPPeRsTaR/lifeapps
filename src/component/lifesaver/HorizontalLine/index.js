import { View } from 'react-native';
import React from 'react';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';

function HorizontalLine(props) {
  const { color, height, marginDisabled } = props;
  const style = {
    horizontalLine: {
      height: height,
      backgroundColor: color,
      marginVertical: marginDisabled ? 0 : 6,
    },
  };
  return <View style={style.horizontalLine} />;
}

HorizontalLine.defaultProps = {
  height: 2,
  color: Color.grayLine.light.color,
  marginDisabled: false,
};

HorizontalLine.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
  marginDisabled: PropTypes.bool,
};

export default HorizontalLine;
