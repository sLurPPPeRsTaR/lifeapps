import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { LifecoverBgCardHeader } from 'ca-config/Image';
import mainStyle from './style';

function Header({ isGradient, children, style }) {
  return (
    <View style={[mainStyle.header.container, style]}>
      {isGradient && (
        <View style={mainStyle.header.background}>
          <Image
            source={LifecoverBgCardHeader}
            style={mainStyle.backgroundImage}
          />
        </View>
      )}
      {children}
    </View>
  );
}
Header.defaultProps = {
  isGradient: false,
  style: {},
};
Header.propTypes = {
  children: PropTypes.node.isRequired,
  isGradient: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Header;
