import React from 'react';
import { View, Image } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import { TrashBin } from 'ca-config/Image';
import style from './style';

function ModalDelete({
  lang,
  locale,
  isVisible,
  onDeletePress,
  onBackPress,
  disableDelete,
}) {
  return (
    <BottomSheet isVisible={isVisible} swipeable={false}>
      <View style={style.modal.deleteModal.iconContainer}>
        <Image source={TrashBin} style={style.modal.deleteModal.icon} />
      </View>
      <View style={style.mt85}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          letterSpacing={0.5}
          align="center"
          style={style.modal.deleteModal.title}>
          {trans(locale, lang, 'konfirmasi')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.mediumGray.light.mediumGray}
          style={style.modal.deleteModal.subtitle}>
          {trans(locale, lang, 'yakinHapuskan')}
        </Text>
        <Button
          disabled={disableDelete}
          outline
          style={style.modal.deleteModal.button1}
          onPress={onDeletePress}>
          {trans(locale, lang, 'hapus')}
        </Button>
        <Button type="linear-gradient" onPress={onBackPress}>
          {trans(locale, lang, 'kembali')}
        </Button>
      </View>
    </BottomSheet>
  );
}

export default ModalDelete;

ModalDelete.defaultProps = {
  isVisible: false,
};

ModalDelete.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  locale: PropTypes.objectOf(Object).isRequired,
  onDeletePress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
};
