import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { Logo } from 'ca-config/Svg';

import Indicator from 'ca-component-generic/Indicator';
import styles from './style';

export default class MaterialIndicator extends PureComponent {
  _renderComponent = ({ index, count, progress }) => {
    const {
      size,
      color,
      trackWidth: borderWidth = size / 10,
      animationDuration,
    } = this.props;

    const frames = (60 * animationDuration) / 1000;
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

    const sa = 7.5;
    const ea = 30;

    const sequences = 3;
    const rotations = 5;

    const inputRange = Array.from(
      new Array(frames),
      (item, frameIndex) => frameIndex / (frames - 1)
    );

    const outputRange = Array.from(new Array(frames), (item, frameIndex) => {
      let progress = (2 * sequences * frameIndex) / (frames - 1);
      const rotation = index ? +(360 - sa) : -(180 - sa);

      const sequence = Math.ceil(progress);

      if (sequence % 2) {
        progress = progress - sequence + 1;
      } else {
        progress = sequence - progress;
      }

      const direction = index ? -1 : +1;

      return `${
        direction * (180 - (sa + ea)) * easing(progress) + rotation
      }deg`;
    });

    const layerStyle = {
      width: size,
      height: size,
      transform: [
        {
          rotate: `${90 - sa}deg`,
        },
        {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${360 * rotations}deg`],
          }),
        },
      ],
    };

    const viewportStyle = {
      width: size,
      height: size,
      transform: [
        {
          translateY: index ? -size / 2 : 0,
        },
        {
          rotate: progress.interpolate({ inputRange, outputRange }),
        },
      ],
    };

    const containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    };

    const offsetStyle = index ? { top: size / 2 } : null;

    const lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size / 2,
      borderWidth,
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View
            style={[containerStyle, offsetStyle]}
            collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    const {
      style,
      size: width,
      size: height,
      trackWidth,
      ...props
    } = this.props;
    const backgroundStyle = {
      width: width,
      height: height,
      borderRadius: width / 2,
      borderWidth: trackWidth,
    };

    return (
      <View style={[styles.container, style]}>
        <View style={{ ...styles.background, ...backgroundStyle }}>
          <Logo width={140} height={140} />
        </View>
        <Indicator
          style={{ width, height }}
          renderComponent={this._renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}

MaterialIndicator.defaultProps = {
  animationDuration: 4000,
  color: 'rgb(0, 0, 0)',
  size: 40,
  trackWidth: 4,
};

MaterialIndicator.propTypes = {
  ...Indicator.propTypes,
  animationDuration: PropTypes.number,
  trackWidth: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
};
