import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';

function Divider({ color, height, marginVertical }) {
  const style = {
    height,
    marginVertical,
    backgroundColor: color,
    width: '100%',
    flexShrink: 0,
  };

  return <View style={style} />;
}
Divider.defaultProps = {
  color: Color.lineGapHome.dark.color,
  marginVertical: 10,
  height: 1,
};
Divider.propTypes = {
  color: PropTypes.string,
  marginVertical: PropTypes.number,
  height: PropTypes.number,
};

export default Divider;
