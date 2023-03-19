import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import { getParseUrl, useMount } from 'ca-util/common';
import { APP, NAVIGATION } from 'ca-util/constant';
import { CameraScreen } from 'react-native-camera-kit';
import Base from 'ca-component-container/Base';
import { Alert, Animated, Easing, Linking, Platform, View } from 'react-native';
import { Defs, Mask, Rect, Svg } from 'react-native-svg';
import Color from 'ca-config/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { formattedPermission, checkPermissions } from 'ca-util/permission';
import locale from './locale';
import style from './style';

export default function LifetagQrScanner(props) {
  const { navigation, lang, dimensions } = props;

  const insets = useSafeAreaInsets();

  const deviceWidth = useMemo(() => {
    return dimensions.width + 2;
  }, [dimensions.width]);

  const deviceHeight = useMemo(() => {
    return dimensions.height - APP.header.height - insets.top;
  }, [dimensions.height, insets.top]);

  const QR_SCAN_SQUARE_SIZE = useMemo(() => {
    let size =
      dimensions.width < dimensions.height
        ? deviceWidth * 0.6
        : deviceHeight * 0.6;
    size = size > 300 ? 300 : size;
    return size;
  }, [deviceHeight, deviceWidth, dimensions.height, dimensions.width]);

  const start = useMemo(() => {
    return (deviceHeight - QR_SCAN_SQUARE_SIZE) / 2;
  }, [QR_SCAN_SQUARE_SIZE, deviceHeight]);

  const end = useMemo(() => {
    return start + QR_SCAN_SQUARE_SIZE;
  }, [QR_SCAN_SQUARE_SIZE, start]);

  const [toValue, setToValue] = useState(end);
  const laserPosition = useRef(new Animated.Value(start)).current;

  const [qrCode, setQrCode] = useState('');

  const [isGranted, setIsGranted] = useState(null);

  const isFocused = useIsFocused();
  const goToPairingResult = useCallback(
    (parsedUrl) => {
      setQrCode('');
      navigation.replace(NAVIGATION.LIFETAG.LifetagPairingResult, {
        lifetagId: parsedUrl?.params?.lifetagId,
        isQr: parsedUrl?.params?.isQr,
      });
    },
    [navigation]
  );

  useMount(() => {
    if (Platform.OS === 'android') {
      checkPermissions([
        'android.permission.CAMERA',
        'android.permission.ACCESS_FINE_LOCATION',
      ])
        .then(() => {
          setIsGranted(true);
        })
        .catch((neverAskAgain) => {
          setIsGranted(false);
          const permissions = JSON.parse(neverAskAgain.message);
          const _permissions = permissions
            .map((p) => formattedPermission(p))
            .join('\n');
          if (permissions.length > 0) {
            Alert.alert(
              'Tidak dapat akses:',
              `${_permissions}\n\nIzinkan akses lewat pengaturan`,
              [
                {
                  text: 'Buka Pengaturan',
                  onPress: () => {
                    navigation.pop();
                    Linking.openSettings();
                  },
                },
              ],
              { cancelable: false }
            );
          }
        });
    } else {
      setIsGranted(true);
    }
  });

  useEffect(() => {
    Animated.timing(laserPosition, {
      toValue: toValue,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setToValue((prevState) => {
        return prevState === start ? end : start;
      });
    });
  }, [end, laserPosition, start, toValue]);

  useEffect(() => {
    if (qrCode && isFocused) {
      const parsedUrl = getParseUrl(qrCode);
      goToPairingResult(parsedUrl);
    }
  }, [qrCode, isFocused, goToPairingResult]);

  function renderQrScannerLayout() {
    return (
      <View
        style={[
          style.qrScannerLayout.container,
          { width: deviceWidth, height: deviceHeight },
        ]}>
        <Svg height={deviceHeight} width={deviceWidth}>
          <Defs>
            <Mask
              id="mask"
              x="0"
              y="0"
              height={deviceHeight}
              width={deviceWidth}>
              <Rect
                height={deviceHeight}
                width={deviceWidth}
                fill={Color.main.light.white}
                opacity={0.5}
              />
              <Rect
                x={deviceWidth / 2 - QR_SCAN_SQUARE_SIZE / 2}
                y={deviceHeight / 2 - QR_SCAN_SQUARE_SIZE / 2}
                width={QR_SCAN_SQUARE_SIZE}
                height={QR_SCAN_SQUARE_SIZE}
                fill={Color.main.light.black}
              />
            </Mask>
          </Defs>
          <Rect
            height={deviceHeight}
            width={deviceWidth}
            mask="url(#mask)"
            fill={Color.main.light.black}
          />
          <Rect
            x={deviceWidth / 2 - QR_SCAN_SQUARE_SIZE / 2}
            y={deviceHeight / 2 - QR_SCAN_SQUARE_SIZE / 2}
            width={QR_SCAN_SQUARE_SIZE}
            height={QR_SCAN_SQUARE_SIZE}
            stroke={Color.main.light.white}
            strokeWidth={2}
            strokeDasharray={QR_SCAN_SQUARE_SIZE / 2}
            strokeDashoffset={QR_SCAN_SQUARE_SIZE / 4}
          />
        </Svg>
        <Animated.View
          style={[
            style.qrScannerLayout.laser,
            {
              left: deviceWidth / 2 - QR_SCAN_SQUARE_SIZE / 2,
              top: laserPosition,
              width: QR_SCAN_SQUARE_SIZE,
            },
          ]}
        />
      </View>
    );
  }

  return (
    <Base
      bounces={false}
      scrollEnabled={false}
      statusBarStyle="light-content"
      statusBarColor={Color.main.light.black}
      safeAreaViewColor={Color.main.light.black}
      isLight
      headerStyle={{ backgroundColor: Color.main.light.black }}
      backgroundColor={{ backgroundColor: Color.main.light.black }}
      onBackPress={() => {
        navigation.pop();
      }}
      title={trans(locale, lang, 'scanBarcode')}
      isPaddingBottom={false}>
      {isGranted ? (
        <>
          <CameraScreen
            scanBarcode
            onReadCode={(event) => {
              setQrCode(event.nativeEvent.codeStringValue);
            }}
          />
          {renderQrScannerLayout()}
        </>
      ) : (
        <View
          style={{
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: Color.main.light.black,
          }}
        />
      )}
    </Base>
  );
}

LifetagQrScanner.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
