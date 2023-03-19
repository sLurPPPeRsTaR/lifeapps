import React, { useCallback, useEffect, useMemo } from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from 'ca-component-generic/Text';
import {
  // LifetagLandingImg,
  LifeTagStep2,
  LifeTagStep3,
} from 'ca-config/Image';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { codeLifesaver, NAVIGATION } from 'ca-util/constant';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import { GET_CURRENT_SUBS_SUCCESS } from 'ca-module-lifesaver/lifesaverConstant';
import { BtnBack, WarningWhite } from 'ca-config/Svg';
import DeviceInfo from 'react-native-device-info';
import style from './style';
import locale from './locale';

function LifetagLanding(props) {
  const {
    navigation,
    lang,
    // eslint-disable-next-line no-unused-vars
    colorScheme,
    userData,
    getCurrentSubsResponse,
    setLoading,
    getCurrentSubs,
    lifesaverAction,
    setIsComingFromDeepLink,
    dimensions,
  } = props;
  const { userId } = userData;

  const insets = useSafeAreaInsets();

  const listSliderPairing = useMemo(() => {
    return [
      {
        key: 3,
        item: {
          image: LifeTagStep3,
          title: trans(locale, lang, 'howToPairing'),
          content: trans(locale, lang, 'keadaanDaruratDitangani'),
        },
      },
    ];
  }, [lang]);

  const listSliderPairingNoLifeSaver = useMemo(() => {
    return [
      {
        key: 3,
        item: {
          image: LifeTagStep2,
          title: trans(locale, lang, 'howToPairing'),
          content: trans(locale, lang, 'contentPairing'),
        },
      },
    ];
  }, [lang]);

  useEffect(() => {
    const goTo = () => {
      if (navigation.canGoBack()) {
        navigation.pop();
        setIsComingFromDeepLink(false);
      } else {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: NAVIGATION.TABMAIN.TabMain,
            },
          ],
        });
        setIsComingFromDeepLink(false);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation, setIsComingFromDeepLink]);

  useEffect(() => {
    if (userId !== '') {
      setLoading(true);
      getCurrentSubs();
    }
  }, [getCurrentSubs, setLoading, userId]);

  useEffect(() => {
    lifesaverActionResult(lifesaverAction);
  }, [lifesaverAction, lifesaverActionResult]);

  const lifesaverActionResult = useCallback(
    (act) => {
      if (act === GET_CURRENT_SUBS_SUCCESS) {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const conditionalButton = useCallback(() => {
    // if (
    //   getCurrentSubsResponse?.productName ===
    //     codeLifesaver.lifesaver.planName ||
    //   getCurrentSubsResponse?.productName ===
    //     codeLifesaver.lifesaverplus.planName
    // ) {
    //   return (
    //     <Button
    //       onPress={() => {
    //         navigation.navigate(NAVIGATION.LIFETAG.LifetagDetailProduct);
    //       }}>
    //       {trans(locale, lang, 'hubungkanLifetag')}
    //     </Button>
    //   );
    // }
    return (
      <Button
        type="linear-gradient"
        onPress={() => {
          setIsComingFromDeepLink(false);
          navigation.reset({
            index: 0,
            routes: [{ name: NAVIGATION.LIFESAVER.LifesaverMain }],
          });
        }}>
        <Text style={style.colorWhite}>
          {trans(locale, lang, 'berlanggananLifeSAVER')}{' '}
        </Text>
        {LifeSaverText(
          'semi',
          Size.text.body2.size,
          Color.lineGapHome.light.color
        )}
      </Button>
    );
  }, [lang, LifeSaverText, setIsComingFromDeepLink, navigation]);

  const conditionalList = useCallback(() => {
    if (
      getCurrentSubsResponse?.productName ===
        codeLifesaver.lifesaver.planName ||
      getCurrentSubsResponse?.productName ===
        codeLifesaver.lifesaverplus.planName
    ) {
      return listSliderPairing;
    }
    return listSliderPairingNoLifeSaver;
  }, [
    getCurrentSubsResponse?.productName,
    listSliderPairing,
    listSliderPairingNoLifeSaver,
  ]);

  const LifeSaverText = useCallback((textStyle, size, color) => {
    return (
      <Text
        color={Color.lineGapHome.light.color}
        textStyle={textStyle}
        size={size}>
        Life
        <Text color={color} fontStyle="italic" size={size}>
          SAVER
        </Text>
      </Text>
    );
  }, []);

  function renderBackground() {
    const widthDimension = { width: dimensions.width };
    return (
      <View style={[style.renderBackground.container]}>
        <Image
          resizeMode="cover"
          source={LifeTagStep3}
          style={[style.renderBackground.landingImg, widthDimension]}
        />
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={[style.renderBackground.container]}>
        <View>
          <View style={style.renderBackground.container}>
            {renderBackground()}
          </View>
        </View>
      </View>
    );
  }

  function renderButton() {
    const bgTransparent = {
      backgroundColor: Color.transparent.light.transparent,
    };
    const widthDimension = dimensions.width;

    return (
      <View
        style={[
          style.renderButton.btnContainer,
          style.alignSelf,
          widthDimension,
          bgTransparent,
        ]}>
        <Padder>
          <View style={style.alert}>
            <WarningWhite
              width={16}
              height={26}
              fill={Color.main.light.white}
            />
            <View>
              <Text
                textStyle="regular"
                align="justify"
                color={Color.lineGapHome.light.color}
                style={style.ml8}
                line={20.8}
                size={Size.text.caption1.size}>
                {trans(locale, lang, 'untukMendapatkanLifeTAG')}
              </Text>
            </View>
          </View>
        </Padder>
        {conditionalButton()}
      </View>
    );
  }

  return (
    <Base
      staticView
      renderBottom={renderButton()}
      isPaddingBottom={false}
      backgroundColor={Color.main.light.black}
      statusBarStyle="light-content">
      <View style={StyleSheet.absoluteFill}>
        <View
          style={[
            {
              top: -insets.top,
              height: dimensions.height,
            },
            style.renderContainer,
          ]}>
          {renderContent()}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.pop();
              setIsComingFromDeepLink(false);
            } else {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: NAVIGATION.TABMAIN.TabMain,
                  },
                ],
              });
              setIsComingFromDeepLink(false);
            }
          }}
          style={style.renderBackground.backBtn}>
          <Padder>
            <BtnBack width={24} height={24} fill={Color.main.light.white} />
          </Padder>
        </TouchableOpacity>
        <View style={[StyleSheet.absoluteFill, style.center]}>
          <View style={[style.renderContent.slideContainer, style.mb200]}>
            <Text
              align="center"
              style={style.mB7}
              textStyle="semi"
              size={
                DeviceInfo.isTablet()
                  ? Size.text.h6.size + 2
                  : Size.text.body1.size
              }
              line={26}
              color={Color.lineGapHome.light.color}>
              {trans(locale, lang, 'howToPairing')}
            </Text>
            <Text
              align="center"
              textStyle="medium"
              size={
                DeviceInfo.isTablet()
                  ? Size.text.body1.size
                  : Size.text.body2.size
              }
              line={24.8}
              color={Color.lineGapHome.light.color}>
              {trans(locale, lang, 'keadaanDaruratDitangani')}
            </Text>
          </View>
        </View>
      </View>
    </Base>
  );
}

export default LifetagLanding;

LifetagLanding.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
  getCurrentSubsResponse: PropTypes.objectOf(Object).isRequired,
  setLoading: PropTypes.func.isRequired,
  getCurrentSubs: PropTypes.func.isRequired,
  lifesaverAction: PropTypes.string.isRequired,
  setIsComingFromDeepLink: PropTypes.func.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
