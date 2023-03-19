import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { LifecoverHeaderImageStep } from 'ca-config/Image';
import style from './style';

function HeaderImage({ source }) {
  return (
    <View style={style.root}>
      <Image source={source} style={style.image} />
      <View style={style.backdrop} />
    </View>
  );
}
HeaderImage.defaultProps = {
  source: LifecoverHeaderImageStep,
};
HeaderImage.propTypes = {
  source: PropTypes.node,
};

export default HeaderImage;
