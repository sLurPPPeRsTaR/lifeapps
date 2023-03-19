import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import mainStyle from './style';

function Body({ children, style }) {
  return <View style={[mainStyle.body.container, style]}>{children}</View>;
}
Body.defaultProps = {
  style: {},
};
Body.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Body;
