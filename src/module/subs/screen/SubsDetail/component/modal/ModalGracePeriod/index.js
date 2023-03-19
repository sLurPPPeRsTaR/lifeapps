import React from 'react';
import { View } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';

function ModalGracePeriod(props) {
  const { colorScheme, lang, isVisible, onClosePress } = props;
  return (
    <BottomSheet
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          title={trans(locale, lang, 'masaTenggang')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View>
        <Text style={style.mt16}>
          <Text textStyle="medium" color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'kartuSaya')}
          </Text>
          <Text textStyle="bold" color={Color.neutral[colorScheme].neutral60}>
            {trans(locale, lang, 'tanpaTunggu')}
          </Text>
          <Text textStyle="medium" color={Color.primary[colorScheme].neutral60}>
            {trans(locale, lang, 'sebelumPolis')}
          </Text>
        </Text>
      </View>
    </BottomSheet>
  );
}

export default ModalGracePeriod;

ModalGracePeriod.defaultProps = {
  colorScheme: 'light',
};

ModalGracePeriod.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
};
