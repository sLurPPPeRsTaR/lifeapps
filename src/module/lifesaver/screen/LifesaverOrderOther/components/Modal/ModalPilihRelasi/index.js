import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import CheckBox from '@react-native-community/checkbox';
import { CheckboxTrue, CheckboxFalse } from 'ca-config/Svg';
import Button from 'ca-component-generic/Button';
import Size from 'ca-config/Size';
import _ from 'lodash';
import style from './style';
import locale from './locale';

function ModalPilihRelasi(props) {
  const {
    lang,
    isVisible,
    onClosePress,
    onRequestClose,
    value,
    options,
    onSubmit,
  } = props;

  const [selected, setSelected] = useState('');

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          isBorderBottom
          title={trans(locale, lang, 'Pilih Relasi')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View style={style.itemsContainer}>
        <View style={style.mb10}>
          {options?.map((option) => (
            <TouchableOpacity
              onPress={() => {
                if (_.isEqual(selected, option)) {
                  setSelected('');
                } else {
                  setSelected(option);
                }
              }}
              style={style.listItem}>
              <Text
                textStyle="medium"
                line={22}
                color={Color.neutral.light.neutral60}>
                {option.label}
              </Text>
              <View>
                {_.isEqual(selected, option) ? (
                  <CheckboxTrue />
                ) : (
                  <CheckboxFalse />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          onPress={() => onSubmit(selected)}
          disabled={!selected}
          type="linear-gradient"
          rounded="lg">
          <Text textStyle="semi" color={Color.whiteCard.light.color}>
            {trans(locale, lang, 'Pilih')}
          </Text>
        </Button>
      </View>
    </BottomSheet>
  );
}

ModalPilihRelasi.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalPilihRelasi;
