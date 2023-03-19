import React, { useCallback, useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import PropTypes from 'prop-types';
import { Base15 as Base } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import PolisDetailTab from 'ca-module-polis/navigation/TopTabNavigator';
import Color from 'ca-config/Color';
import {
  BackgroundGradientSquare,
  BackgroundGradientTablet,
} from 'ca-config/Svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { APP, NAVIGATION } from 'ca-util/constant';
import locale from './locale';
import style from './style';

function PolisDetail(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
    getPolicySummaryClear,
    getPolicySelfDataClear,
    getPolicyBenefitClear,
    getPolicyFundsClear,
    getPolicyClaimClear,
    getPolicyDownloadClear,
    currentScreen,
    width,
  } = props;

  const polis = params?.polis;
  const isFromEvent = params?.isFromEvent;

  const insets = useSafeAreaInsets();
  const additionalHeight = 38;

  const onBackPress = useCallback(() => {
    getPolicySummaryClear();
    getPolicySelfDataClear();
    getPolicyBenefitClear();
    getPolicyFundsClear();
    getPolicyClaimClear();
    getPolicyDownloadClear();
    if (isFromEvent) {
      navigation.navigate(NAVIGATION.HOME.Home);
    } else {
      navigation.pop();
    }
  }, [
    getPolicySummaryClear,
    getPolicySelfDataClear,
    getPolicyBenefitClear,
    getPolicyFundsClear,
    getPolicyClaimClear,
    getPolicyDownloadClear,
    isFromEvent,
    navigation,
  ]);

  useEffect(() => {
    if (
      currentScreen === 'PolisDetailSummary' ||
      currentScreen === 'PolisDetailData' ||
      currentScreen === 'PolisDetailManfaat' ||
      currentScreen === 'PolisDetailDana' ||
      currentScreen === 'PolisDetailKlaim' ||
      currentScreen === 'PolisDetailDownload'
    ) {
      const backAction = () => {
        onBackPress();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }
    return () => {};
  }, [currentScreen, onBackPress]);

  function renderBackgroundHeaderImage() {
    const imageSize = { width: 358, height: 245 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + insets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    if (DeviceInfo.isTablet()) {
      return (
        <View
          style={[
            style.backgroundContainer,
            {
              top: -90 + insets.top,
            },
          ]}>
          <BackgroundGradientTablet width={width} height={205} />
        </View>
      );
    }
    return (
      <View style={backgroundStyle}>
        <BackgroundGradientSquare width={width} height={adjustedHeight} />
      </View>
    );
  }

  return (
    <Base
      isBackground
      width={width}
      title={trans(locale, lang, 'detailPolis')}
      onBackPress={() => onBackPress()}
      backgroundColor={Color.whiteLifesaverBg.light.color}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <View style={style.flex1}>
        <PolisDetailTab lang={lang} colorScheme={colorScheme} polis={polis} />
      </View>
    </Base>
  );
}

export default PolisDetail;

PolisDetail.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getPolicySummaryClear: PropTypes.func.isRequired,
  getPolicySelfDataClear: PropTypes.func.isRequired,
  getPolicyBenefitClear: PropTypes.func.isRequired,
  getPolicyClaimClear: PropTypes.func.isRequired,
  getPolicyFundsClear: PropTypes.func.isRequired,
  getPolicyDownloadClear: PropTypes.func.isRequired,
  currentScreen: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};
