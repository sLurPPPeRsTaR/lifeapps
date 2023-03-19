import React from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIndicator from 'ca-component-generic/MaterialIndicator';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import { LoadingLifeId } from 'ca-config/Image';

function ModalLoading({
  loading = false,
  opacity = 0.4,
  desc = '',
  type = 'smiley-life',
}) {
  let loadingAnimation = null;
  if (type === 'smiley-life') {
    loadingAnimation = (
      <Image
        source={LoadingLifeId}
        style={styles.smileyLife}
        resizeMode="contain"
      />
    );
  }
  if (type === 'spinner') {
    loadingAnimation = (
      <MaterialIndicator
        color={Color.primary.light.primary90}
        size={152}
        trackWidth={7}
      />
    );
  }
  return (
    <Modal
      transparent
      animationType="none"
      visible={loading}
      onRequestClose={() => null}>
      <View
        style={[
          styles.modalBackground,
          { backgroundColor: `rgba(0,0,0,${opacity})` },
        ]}>
        {loadingAnimation}
        <View style={styles.desc}>
          <Text
            textStyle="medium"
            size={Size.text.h6.size}
            line={27}
            letterSpacing={0.5}
            fontWeight="500">
            {desc}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

ModalLoading.defaultProps = {
  opacity: 0.4,
  desc: '',
  type: 'smiley-life',
};

ModalLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
  opacity: (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 1) {
      return new Error('Opacity prop value out of range');
    }
  },
  desc: PropTypes.string,
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    position: 'absolute',
    paddingTop: 210,
  },
  smileyLife: {
    width: Size.screen.width,
    height: Size.screen.width,
  },
});

export default ModalLoading;
