import Color from 'ca-config/Color';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function CircularProgress(props) {
  const {
    percent,
    radius,
    bgRingWidth,
    progressRingWidth,
    bgRingColor,
    progressRingColor,
    strokeLinecap,
    children,
  } = props;

  const Ring = useMemo(() => {
    return (
      <Svg
        viewBox="0 0 36 36"
        style={{ width: radius * 2, height: radius * 2 }}
        stroke={progressRingColor}>
        <Path
          fill="none"
          stroke={bgRingColor}
          strokeWidth={bgRingWidth}
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <Path
          fill="none"
          strokeWidth={progressRingWidth}
          strokeLinecap={strokeLinecap}
          strokeDasharray={`${percent}, 100`}
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </Svg>
    );
  }, [
    bgRingColor,
    bgRingWidth,
    percent,
    progressRingColor,
    progressRingWidth,
    radius,
    strokeLinecap,
  ]);

  return (
    <View style={[styles.container, { width: radius * 2, height: radius * 2 }]}>
      {Ring}
      <View style={styles.children}>{children}</View>
    </View>
  );
}

export default CircularProgress;

CircularProgress.defaultProps = {
  percent: 0,
  radius: 25,
  bgRingWidth: 4,
  progressRingWidth: 3,
  bgRingColor: Color.badgePink.light.badgePink,
  progressRingColor: Color.primary.light.primary90,
  strokeLinecap: 'round',
  children: null,
};

CircularProgress.propTypes = {
  percent: PropTypes.number,
  radius: PropTypes.number,
  bgRingWidth: PropTypes.number,
  progressRingWidth: PropTypes.number,
  bgRingColor: PropTypes.string,
  progressRingColor: PropTypes.string,
  strokeLinecap: PropTypes.string,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  children: {
    position: 'absolute',
    zIndex: -1,
  },
});
