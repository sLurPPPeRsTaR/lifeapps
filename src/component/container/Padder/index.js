import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

function Padder(props) {
  const { children, style } = props;
  return <View style={[Style.wrapper, style]}>{children}</View>;
}

export default Padder;

Padder.propTypes = {
  children: PropTypes.node,
};

const Style = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
});
