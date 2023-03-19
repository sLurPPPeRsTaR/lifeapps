import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import { CloseLine } from 'ca-config/Svg';
import { ActivityIndicator, Image, Pressable, View } from 'react-native';
import Modal from 'react-native-modal';
import Size from 'ca-config/Size';
import CircularProgress from 'ca-component-generic/CircularProgress';
import style from './style';

function PolisECardModal(props) {
  const { width, height, isVisible, onRequestClose, sourceLink } = props;

  const [loadedPercentage, setLoadedPercentage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const paddingHorizontal = 16;
  const imageSizeStyle = {
    width: width - paddingHorizontal * 2,
    height: ((width - paddingHorizontal * 2) * 231) / 347,
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      onBackdropPress={onRequestClose}>
      <View style={style.modal.ecard.container}>
        <View style={[style.modal.ecard.closeButton, { top: -(height / 10) }]}>
          <Pressable onPress={onRequestClose}>
            <CloseLine width={24} height={24} fill={Color.main.light.white} />
          </Pressable>
        </View>

        <Image
          source={{
            uri: sourceLink,
          }}
          style={[imageSizeStyle, style.modal.ecard.image]}
          onProgress={({ nativeEvent: { loaded, total } }) => {
            setLoadedPercentage((loaded / total) * 100);
          }}
          onError={({ nativeEvent: { error } }) => {
            if (error) {
              setShowLoading(true);
            } else {
              setShowLoading(false);
            }
          }}
        />

        {loadedPercentage !== 100 && loadedPercentage !== null ? (
          <View style={style.positionAbsolute}>
            <CircularProgress percent={loadedPercentage} />
          </View>
        ) : null}

        {showLoading ? (
          <ActivityIndicator
            color={Color.primary.light.primary90}
            size={Size.isAndroid ? 'large' : 'small'}
            style={style.positionAbsolute}
          />
        ) : null}
      </View>
    </Modal>
  );
}

PolisECardModal.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  sourceLink: PropTypes.string.isRequired,
};

export default PolisECardModal;
