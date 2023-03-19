import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Linking,
  View,
  TouchableOpacity,
  PixelRatio,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';
import Padder from 'ca-component-container/Padder';
import DeviceInfo from 'react-native-device-info';
import {
  ButtonCaptureCamera,
  ButtonFlashOff,
  ButtonFlashOn,
  ButtonRotateCamera,
  ButtonGalery,
} from 'ca-config/Svg';
import { Scan, ScanKK } from 'ca-config/Image';
import { store } from 'ca-config/Store';
import style from './style';

function CameraVision(props) {
  const {
    cameraType,
    onCaptured,
    cameraFrame,
    navigation,
    baseTitle,
    buttonTitle,
    buttonSecondTitle,
    flash,
    getFromGalery,
  } = props;

  const { dimensions } = store.getState().bootstrap;
  const [flipCamera, setFlipCamera] = useState(false);

  const devices = useCameraDevices();
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    imageUri: null,
    flashLight: flash,
    cameraType: cameraType === 'back',
    isCapture: true,
    data: null,
    openGallery: false,
    processing: false,
  });
  const camera = useRef(null);
  const getZ = () => {
    const pratio = PixelRatio.get();
    let z = 0;
    if (pratio <= 1.75) {
      z = 60;
    } else if (pratio <= 2 || pratio >= 4) {
      z = 80;
    } else {
      z = StatusBar.currentHeight + 10;
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('PixelRatio', PixelRatio.get());
    }

    return z;
  };
  // eslint-disable-next-line no-unused-vars
  const { flashLight, imageUri, isCapture, data, processing } = state;

  useEffect(() => {
    setRequestCameraPermission();
  }, [setRequestCameraPermission]);

  const setRequestCameraPermission = useCallback(async () => {
    const permission = Camera.requestCameraPermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  const setCapture = async () => {
    if (camera.current) {
      const options =
        Platform.OS === 'android'
          ? { quality: 65, skipMetadata: true }
          : {
              quality: 65,
              orientation: 'portrait',
              fixOrientation: true,
              base64: false,
            };
      const dataPhoto =
        Platform.OS === 'ios'
          ? await camera.current.takePhoto(options)
          : await camera.current.takeSnapshot(options);
      if (cameraFrame === 'ktp' && Platform.OS !== 'ios') {
        const crop = {
          originX: 0.17 * dataPhoto.width,
          originY: 0.34 * dataPhoto.height - getZ(),
          width: dataPhoto.width - 2 * 0.17 * dataPhoto.width,
          height: dataPhoto.height - 2 * 0.34 * dataPhoto.height,
        };

        let cropData = null;

        await ImagePicker.openCropper({
          forceJpg: true,
          path: `file://${dataPhoto.path}`,
          cropperToolbarTitle: 'Edit Foto',
          ...crop,
        })
          .then((image) => {
            cropData = {
              uri: image.path,
            };
            setState((val) => ({
              ...state,
              isCapture: !val.isCapture,
              imageUri: cropData.uri,
              data: cropData,
              processing: false,
              flashLight: false,
            }));
          })
          .catch(() => {
            setState({
              ...state,
              processing: false,
              flashLight: false,
            });
          });
      } else {
        setState((val) => ({
          ...state,
          isCapture: !val.isCapture,
          imageUri: `file://${dataPhoto.path}`,
          data: {
            ...dataPhoto,
            uri: `file://${dataPhoto.path}`,
          },
          processing: false,
          flashLight: false,
        }));
      }
    }
  };

  const setRecapture = useCallback(() => {
    setState({
      ...state,
      imageUri: null,
      isCapture: true,
    });
  }, [state]);

  const renderKk = useCallback(() => {
    return (
      <View style={style.renderDocument.container}>
        <Image
          source={ScanKK}
          style={{
            height: dimensions.height - (DeviceInfo.isTablet() ? 350 : 300),
            width: dimensions.width - (Platform.OS === 'ios' ? 32 : 0),
          }}
          resizeMode="contain"
        />
      </View>
    );
  }, [dimensions.height, dimensions.width]);

  const renderKtp = useCallback(() => {
    return (
      <View style={style.renderDocument.container}>
        <Image source={Scan} style={style.renderDocument.image} />
      </View>
    );
  }, []);

  const renderSelfie = useCallback(() => {
    return (
      <Svg width="100%" height="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect width="100%" height="100%" fill="#fff" />
            <Circle
              cx="50%"
              cy="45%"
              r="35%"
              width="250"
              height="250"
              fill="black"
            />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0,0,0,0.8)"
          mask="url(#mask)"
        />
        <Circle
          cx="50%"
          cy="45%"
          r="35%"
          width="250"
          height="250"
          stroke="#fff"
          strokeWidth="2.5"
          strokeDasharray="8"
        />
      </Svg>
    );
  }, []);

  function renderCameraContainer() {
    if (devices.front == null) return null;
    if (imageUri) {
      return (
        <View style={style.flex1}>
          <Image
            style={[style.flex1, style.backgroundColorBlack]}
            resizeMode="contain"
            source={{
              uri: imageUri,
              backgroundColor: '#000',
            }}
          />
        </View>
      );
    }
    return (
      <View style={[style.flex1, style.backgroundColorBlack]}>
        <Camera
          ref={camera}
          style={style.flex1}
          photo
          device={
            flipCamera || cameraFrame === 'selfie'
              ? devices.front
              : devices.back
          }
          isActive={isFocused}
          torch={flashLight ? 'on' : 'off'}
          frameProcessorFps={5}
        />
        <View style={style.renderCameraContainer.cameraFrame}>
          {cameraFrame === 'ktp' && renderKtp()}
          {cameraFrame === 'selfie' && renderSelfie()}
          {cameraFrame === 'kk' && renderKk()}
        </View>
      </View>
    );
  }

  function renderRightHeaderContent() {
    if (getFromGalery && imageUri === null) {
      return (
        <TouchableOpacity
          style={style.marginRight16}
          onPress={() => setState({ ...state, flashLight: !flashLight })}>
          {flashLight ? <ButtonFlashOn /> : <ButtonFlashOff />}
        </TouchableOpacity>
      );
    }
    return null;
  }

  function renderFooterContainer() {
    if (isCapture) {
      return (
        <View style={style.renderFooterContainer.container}>
          {getFromGalery ? (
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  compressImageQuality: 0.65,
                  mediaType: 'photo',
                  forceJpg: true,
                })
                  .then((image) => {
                    setState((val) => ({
                      ...state,
                      isCapture: !val.isCapture,
                      imageUri: image.path,
                      data: {
                        uri: image.path,
                      },
                      processing: false,
                    }));
                  })
                  .catch(() => {
                    setState({
                      ...state,
                      processing: false,
                      flashLight: false,
                    });
                  });
              }}>
              <ButtonGalery />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setState({ ...state, flashLight: !flashLight })}>
              {flashLight ? <ButtonFlashOn /> : <ButtonFlashOff />}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              setCapture('save');
              setState((prevState) => {
                return { ...prevState, flashLight: false };
              });
            }}>
            <ButtonCaptureCamera />
          </TouchableOpacity>
          <TouchableOpacity>
            <ButtonRotateCamera
              onPress={() => {
                setFlipCamera(!flipCamera);
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={style.renderFooterContainer.container}>
        <Padder style={style.flex1}>
          <Button
            block
            style={style.renderFooterContainer.buttonBlack}
            onPress={() => setRecapture(false)}>
            {buttonTitle}
          </Button>
          <Button
            onPress={() => {
              onCaptured(state?.data);
            }}>
            {buttonSecondTitle}
          </Button>
        </Padder>
      </View>
    );
  }

  return (
    <Base
      bounces={false}
      scrollEnabled={false}
      statusBarStyle="light-content"
      statusBarColor="black"
      safeAreaViewColor={Color.main.light.black}
      isLight
      headerStyle={{ backgroundColor: Color.main.light.black }}
      backgroundColor={{ backgroundColor: Color.main.light.black }}
      onBackPress={() => {
        navigation.pop();
      }}
      rightHeaderContent={renderRightHeaderContent()}
      title={baseTitle}
      isPaddingBottom={false}>
      {renderCameraContainer()}
      {renderFooterContainer()}
    </Base>
  );
}

export default CameraVision;

CameraVision.defaultProps = {
  cameraType: 'back',
  getFromGalery: false,
};

CameraVision.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  cameraType: PropTypes.string,
  onCaptured: PropTypes.func.isRequired,
  cameraFrame: PropTypes.string.isRequired,
  baseTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonSecondTitle: PropTypes.string.isRequired,
  flash: PropTypes.bool.isRequired,
  getFromGalery: PropTypes.bool,
};
