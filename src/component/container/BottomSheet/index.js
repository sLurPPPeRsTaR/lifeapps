import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Header from 'ca-component-card/Header';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import { store } from 'ca-config/Store';

function BottomSheet(props) {
  const { dimensions } = store.getState().bootstrap;
  const deviceWidth = dimensions.width;
  const deviceHeight = dimensions.height;

  function renderHeader() {
    const {
      // eslint-disable-next-line no-shadow
      renderHeader,
      title,
      leftTitle,
      onBackPress,
      onClosePress,
      rightHeaderContent,
      leftCloseButton,
      rightCloseButton,
    } = props;
    if (renderHeader) {
      return renderHeader;
    }
    if (onBackPress || title || onClosePress) {
      return (
        <Header
          leftTitle={leftTitle}
          title={title}
          onBackPress={onBackPress}
          onClosePress={onClosePress}
          rightContent={rightHeaderContent}
          leftCloseButton={leftCloseButton}
          rightCloseButton={rightCloseButton}
        />
      );
    }
    return null;
  }

  const {
    isVisible,
    onDismiss,
    children,
    swipeable = true,
    onRequestClose,
    animationInTiming = 500,
    animationOutTiming = 500,
    swipeDirection = swipeable ? ['down'] : null,
    useNativeDriverForBackdrop = true,
    backdropTransitionOutTiming = 0,
    onSwipeComplete = onRequestClose,
    onBackdropPress = onRequestClose,
    onModalHide,
    style,
    contentContainerStyle,
    avoidKeyboard,
    isPadder,
    keyboardVerticalOffset,
  } = props;
  return (
    <Modal
      onRequestClose={onRequestClose}
      isVisible={isVisible}
      onDismiss={onDismiss}
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      swipeDirection={swipeDirection}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onSwipeComplete}
      useNativeDriverForBackdrop={useNativeDriverForBackdrop}
      backdropTransitionOutTiming={backdropTransitionOutTiming}
      onModalHide={onModalHide}
      style={[styles.view, style]}
      {...props}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'height' : null}>
          {swipeable && (
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
          )}
          {renderHeader()}
          {isPadder ? (
            <Padder
              style={[styles.pb48, styles.zIndexMinus1, contentContainerStyle]}>
              {children}
            </Padder>
          ) : (
            <View style={[styles.zIndexMinus1, contentContainerStyle]}>
              {children}
            </View>
          )}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
          {swipeable && (
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>
          )}
          {renderHeader()}
          {isPadder ? (
            <Padder
              style={[styles.pb48, styles.zIndexMinus1, contentContainerStyle]}>
              {children}
            </Padder>
          ) : (
            <View style={[styles.zIndexMinus1, contentContainerStyle]}>
              {children}
            </View>
          )}
        </View>
      )}
    </Modal>
  );
}

BottomSheet.defaultProps = {
  swipeable: true,
  avoidKeyboard: true,
  isPadder: true,
};

BottomSheet.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func,
  children: PropTypes.node.isRequired,
  swipeable: PropTypes.bool,
  onRequestClose: PropTypes.func,
  animationInTiming: PropTypes.number,
  animationOutTiming: PropTypes.number,
  swipeDirection: PropTypes.any,
  useNativeDriverForBackdrop: PropTypes.bool,
  backdropTransitionOutTiming: PropTypes.number,
  onSwipeComplete: PropTypes.func,
  onBackdropPress: PropTypes.func,
  style: PropTypes.any,
  renderHeader: PropTypes.node,
  title: PropTypes.string,
  leftTitle: PropTypes.bool,
  onBackPress: PropTypes.func,
  onClosePress: PropTypes.func,
  rightHeaderContent: PropTypes.node,
  leftCloseButton: PropTypes.bool,
  rightCloseButton: PropTypes.bool,
  onModalHide: PropTypes.func,
  contentContainerStyle: PropTypes.any,
  avoidKeyboard: PropTypes.bool,
  isPadder: PropTypes.bool,
  keyboardVerticalOffset: PropTypes.number.isRequired,
};

export default BottomSheet;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: Color.main.light.white,
    paddingTop: 12,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    margin: 0,
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: Color.neutral.light.neutral60,
    height: 4,
    width: 67,
    borderRadius: 16,
  },
  pb48: {
    paddingBottom: 48,
  },
  zIndexMinus1: {
    zIndex: -1,
  },
});
