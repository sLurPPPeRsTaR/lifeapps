import React from 'react';
import PropTypes from 'prop-types';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import mainStyle from './style';
import Body from './Body';
import Header from './Header';

function CardCustom({ children, style, backgroundColor }) {
  const propsStyle = {
    backgroundColor,
  };
  return (
    <Padder>
      <Shadow
        style={[mainStyle.root.container, style]}
        innerContainerStyle={propsStyle}>
        {children}
      </Shadow>
    </Padder>
  );
}
CardCustom.defaultProps = {
  style: {},
  backgroundColor: Color.whiteCard.dark.color,
};
CardCustom.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  backgroundColor: PropTypes.string,
};

export default Object.assign(CardCustom, {
  Header,
  Body,
});
