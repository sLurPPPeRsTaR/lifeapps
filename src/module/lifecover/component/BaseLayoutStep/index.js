import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import { LifecoverDecorationStepLayout } from 'ca-config/Image';
import Size from 'ca-config/Size';
import { BtnBack } from 'ca-config/Svg';
import style from './style';
import ProgressBar from '../ProgressBar';

function BaseLayoutStepHeader({
  title,
  onBackPress,
  step,
  maxStep,
  showStepIndicator,
}) {
  return (
    <View style={style.headerRoot}>
      <View style={style.headerContainer}>
        <View style={style.headerLeftContainer}>
          <TouchableNativeFeedback onPress={onBackPress}>
            <View style={style.headerLeftContent}>
              <BtnBack width={24} height={24} fill={Color.main.dark.white} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={style.title}>
          <Text
            color={Color.neutral.dark.neutral90}
            numberOfLines={1}
            size={Size.text.body1.size}
            textStyle="bold">
            {title}
          </Text>
        </View>
        {showStepIndicator && (
          <View style={style.headerRightContainer}>
            <Text
              color={Color.neutral.dark.neutral90}
              numberOfLines={1}
              size={Size.text.body2.size}
              textStyle="semi">
              {`${step}/${maxStep}`}
            </Text>
          </View>
        )}
      </View>
      <ProgressBar step={step} maxStep={maxStep} />
    </View>
  );
}
BaseLayoutStepHeader.defaultProps = {
  showStepIndicator: false,
};
BaseLayoutStepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onBackPress: PropTypes.func.isRequired,
  showStepIndicator: PropTypes.bool,
  step: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
};

function BaseLayoutStep({
  title,
  children,
  onBackPress,
  step,
  maxStep,
  showStepIndicator,
}) {
  return (
    <Base
      backgroundColor={Color.whiteLifesaverBg.dark.color}
      isPaddingBottom={false}
      title={title}
      renderHeader={
        <BaseLayoutStepHeader
          title={title}
          onBackPress={onBackPress}
          step={step}
          maxStep={maxStep}
          showStepIndicator={showStepIndicator}
        />
      }>
      <View style={style.container}>
        <Image
          source={LifecoverDecorationStepLayout}
          style={style.decoration}
        />
        {children}
      </View>
    </Base>
  );
}

BaseLayoutStep.defaultProps = {
  showStepIndicator: false,
  onBackPress: () => {},
};
BaseLayoutStep.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  step: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
  showStepIndicator: PropTypes.bool,
  onBackPress: PropTypes.func,
};

export default BaseLayoutStep;
