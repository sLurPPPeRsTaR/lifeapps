import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Close } from 'ca-config/Svg';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import Padder from 'ca-component-container/Padder';
import style from './style';

function ModalHeader({ title, subTitle, onClose, isBorderBottom }) {
  return (
    <View>
      <View style={style.container}>
        <TouchableOpacity style={style.closeIcon} onPress={() => onClose()}>
          <Close width={30} height={30} />
        </TouchableOpacity>
        <Text textStyle="semi" size={16}>
          {title}
        </Text>
        {subTitle !== '' ? (
          <Text textStyle="medium" size={Size.text.body2.size}>
            {subTitle}
          </Text>
        ) : null}
      </View>
      {isBorderBottom ? (
        <Padder style={style.horizontalLinePadder}>
          <HorizontalLine height={1} />
        </Padder>
      ) : null}
    </View>
  );
}

ModalHeader.defaultProps = {
  subTitle: '',
  isBorderBottom: false,
};

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isBorderBottom: PropTypes.bool,
};

export default ModalHeader;
