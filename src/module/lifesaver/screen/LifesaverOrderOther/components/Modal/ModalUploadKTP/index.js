import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Text from 'ca-component-generic/Text';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { CameraIcon, ChevronRight, GalleryIcon } from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import HorizontalLine from 'ca-component-lifesaver/HorizontalLine';
import { NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import style from './style';

function ModalUploadKTP(props) {
  const {
    lang,
    isVisible,
    onClosePress,
    onRequestClose,
    onCameraPress,
    onGalleryPress,
  } = props;

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      swipeable={false}
      renderHeader={
        <ModalHeader
          swipeable={false}
          isBorderBottom
          title={trans(locale, lang, 'uploadFotoKTP')}
          onClose={onClosePress}
        />
      }
      isVisible={isVisible}>
      <View style={style.mv40}>
        <TouchableOpacity style={style.btnContainer} onPress={onCameraPress}>
          <View style={style.fxRow}>
            <CameraIcon style={style.mr8} />
            <Text
              textStyle="medium"
              line={22}
              color={Color.neutral.light.neutral60}>
              {trans(locale, lang, 'uploadDariGaleri')}
            </Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
        <TouchableOpacity onPress={onGalleryPress} style={style.btnContainer}>
          <View style={style.fxRow}>
            <GalleryIcon style={style.mr8} />
            <Text
              textStyle="medium"
              line={22}
              color={Color.neutral.light.neutral60}>
              {trans(locale, lang, 'ambilFoto')}
            </Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

ModalUploadKTP.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ModalUploadKTP;
