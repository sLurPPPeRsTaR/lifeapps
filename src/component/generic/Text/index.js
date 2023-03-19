import React, { PureComponent } from 'react';
import { Text as RText, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Color, Size } from 'ca-config/index';

export default class Text extends PureComponent {
  getComposedStyle() {
    const {
      color,
      align,
      style,
      size,
      textStyle,
      line,
      fontStyle,
      textDecorationLine,
      letterSpacing,
    } = this.props;
    const composedStyle = [];
    const newStyle = {};

    if (size) {
      newStyle.fontSize = size;
    }

    if (color) {
      newStyle.color = color;
    }

    if (line) {
      newStyle.lineHeight = line;
    }

    if (align) {
      newStyle.textAlign = align;
    }

    if (letterSpacing) {
      newStyle.letterSpacing = letterSpacing;
    }

    if (textStyle) {
      newStyle.fontFamily = Size.fontFamily[textStyle];
    }

    if (fontStyle) {
      newStyle.fontStyle = fontStyle;
    }

    if (textDecorationLine) {
      newStyle.textDecorationLine = textDecorationLine;
    }

    composedStyle.push(newStyle);
    composedStyle.push(style);

    return composedStyle;
  }

  render() {
    const { animated, children } = this.props;
    if (animated) {
      return (
        <Animated.Text {...this.props} style={this.getComposedStyle()}>
          {children}
        </Animated.Text>
      );
    }

    return (
      <RText {...this.props} style={this.getComposedStyle()}>
        {children}
      </RText>
    );
  }
}

Text.defaultProps = {
  animated: false,
  color: Color.neutral.light.neutral90,
  textStyle: Size.fontFamily.regular,
  size: Size.text.body2.size,
  align: 'left',
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  animated: PropTypes.bool,
  textStyle: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  align: PropTypes.string,
};
