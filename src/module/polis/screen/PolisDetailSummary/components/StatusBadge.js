import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';

function StatusBadge({ statusName, statusCode, style }) {
  let bgColor = Color.badgeGreen.light.badgeGreen10;
  let textColor = Color.badgeGreen.light.badgeGreen40;
  if (
    statusCode === 'non-active' ||
    statusCode === 'Invalid' ||
    statusCode === 'Pending'
  ) {
    bgColor = Color.backgroundHome.light.backgroundHome;
    textColor = Color.grayIcon.light.grayIcon;
  }
  if (
    statusCode === 'active' &&
    (statusName === 'Masa Tenggang' || statusName === 'Grace Period')
  ) {
    bgColor = Color.backgroundAlertDialogue.light.color;
    textColor = Color.warningAlertDialogue.light.color;
  }

  return (
    <View style={[Style.container, style, { backgroundColor: bgColor }]}>
      <Text textStyle="semi" size={Size.text.caption1.size} color={textColor}>
        {statusName}
      </Text>
    </View>
  );
}

export default StatusBadge;

const Style = StyleSheet.create({
  container: {
    minWidth: 77,
    paddingHorizontal: 8,
    height: 22,
    position: 'absolute',
    right: 0,
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

StatusBadge.defaultProps = {
  style: undefined,
};

StatusBadge.propTypes = {
  statusName: PropTypes.string.isRequired,
  statusCode: PropTypes.oneOf(['active', 'non-active']).isRequired,
  style: PropTypes.objectOf(Object),
};
