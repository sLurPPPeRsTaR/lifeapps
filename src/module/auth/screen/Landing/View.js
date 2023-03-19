import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import { useMount } from 'ca-util/common';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { ChevronDown, ChevronUp, Frame577 } from 'ca-config/Svg';
import { APP, NAVIGATION } from 'ca-util/constant';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { ENIcon, IDIcon, LandingBanner, lifeSAVERwhite } from 'ca-config/Image';
import DeviceInfo from 'react-native-device-info';
import Shadow from 'ca-component-container/Shadow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import style from './style';
import locale from './locale';

function Landing(props) {
  const {
    navigation,
    lang,
    colorScheme,
    setLang,
    userId,
    dimensions,
    setIsAlreadyLaunched,
  } = props;

  const { width, height } = dimensions;

  const insets = useSafeAreaInsets();

  const languageList = [
    {
      key: 'id',
      text: 'INDONESIA',
      icon: IDIcon,
    },
    {
      key: 'en',
      text: 'ENGLISH',
      icon: ENIcon,
    },
  ];

  const [isLMVisible, setLMVisible] = useState(false);

  const [isLangButtonActive, setLangButtonActive] = useState(false);
  const [currentLang, setCurrentLang] = useState(lang);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId !== '') {
        navigation.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
        });
      }
    });
    return unsubscribe;
  }, [navigation, userId]);

  useMount(() => {
    SplashScreen.hide();
  });

  const insetsToprenderContent = useMemo(() => {
    if (Platform.OS === 'android') {
      return 35;
    }
    if (Platform.OS === 'ios' && Size.isIphoneX) {
      return insets.top - 10;
    }
    if (Platform.OS === 'ios' && DeviceInfo.isTablet()) {
      return insets.top - -15;
    }
    return insets.top - -20;
  }, [insets.top]);

  function renderHeader() {
    const insetsTop = Platform.OS === 'android' ? insets.top : 30;
    return (
      <Padder style={{ marginTop: insetsTop }}>
        <View style={[style.container, { height: APP.header.height }]}>
          <Shadow animated borderRadius={16} style={style.langButton.container}>
            <Pressable
              onPress={() => {
                setLangButtonActive(!isLangButtonActive);
                setLMVisible(true);
              }}>
              <View style={[style.langButton.button]}>
                <View style={style.langButton.lang.container}>
                  <Shadow animated borderRadius={24}>
                    <Image
                      source={lang === 'id' ? IDIcon : ENIcon}
                      style={style.langButton.lang.icon}
                    />
                  </Shadow>
                  <Text
                    textStyle="medium"
                    size={Size.text.body2.size}
                    color={Color.neutral[colorScheme].neutral90}
                    style={style.langButton.lang.text}>
                    {lang === 'id' ? 'IND' : 'ENG'}
                  </Text>
                </View>
                {!isLangButtonActive ? (
                  <ChevronDown
                    width={24}
                    height={24}
                    fill={Color.neutral.dark.neutral90}
                  />
                ) : (
                  <ChevronUp
                    width={24}
                    height={24}
                    fill={Color.neutral.dark.neutral90}
                  />
                )}
              </View>
            </Pressable>
          </Shadow>
        </View>
      </Padder>
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          width,
          height:
            height - height * 0.25 - APP.header.height - insetsToprenderContent,
        }}>
        <View style={style.content.container}>
          <Text
            textStyle="semi"
            size={Size.text.h5.size - 1}
            color={Color.main.light.white}>
            {trans(locale, lang, 'apaItu')}
          </Text>
          <View style={[style.flexDirectionRow, style.alignItemsCenter]}>
            <Image
              source={lifeSAVERwhite}
              style={style.lifesaverLogo}
              resizeMode="stretch"
            />
            <Text
              textStyle="semi"
              size={Size.text.h1.size - 1}
              color={Color.main.light.white}>
              ?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsAlreadyLaunched(true);
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
            }}>
            <View style={[style.flexDirectionRow, style.mt26]}>
              <Text
                textStyle="bold"
                size={Size.text.body1.size}
                color={Color.main.light.white}
                textDecorationLine="underline">
                {trans(locale, lang, 'klikDisini')}
              </Text>
              <Text
                textStyle="bold"
                size={Size.text.body1.size}
                color={Color.main.light.white}>
                {' >'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    let dynamicStyle = {
      justifyContent: dimensions.width > 360 ? 'space-around' : 'space-between',
    };
    let buttonStyle = {
      left: {},
      right: {},
    };
    if (Platform.isPad) {
      dynamicStyle = { justifyContent: 'center' };
      buttonStyle = {
        left: { marginRight: 20 },
        right: { marginLeft: 20 },
      };
    }
    return (
      <Padder>
        <View style={[style.button.container, dynamicStyle]}>
          <Button
            outline
            shadow
            borderColor="white"
            style={[
              style.button.button,
              style.button.size,
              { width: (dimensions.width - 80) / 2 },
              buttonStyle.left,
            ]}
            onPress={() => {
              setIsAlreadyLaunched(true);
              navigation.replace(NAVIGATION.TABMAIN.TabMain);
            }}>
            {trans(locale, lang, 'lewati')}
          </Button>
          <Button
            type="linear-gradient"
            shadowLinear
            style={[
              style.button.button,
              style.button.size,
              { width: (dimensions.width - 80) / 2 },
            ]}
            linearStyle={buttonStyle.right}
            onPress={() => {
              setIsAlreadyLaunched(true);
              navigation.navigate(NAVIGATION.REGISTER.Register);
            }}>
            {trans(locale, lang, 'daftar')}
          </Button>
        </View>
      </Padder>
    );
  }

  function renderLangOption(item) {
    return (
      <TouchableOpacity key={item.key} onPress={() => setCurrentLang(item.key)}>
        <View
          style={[
            style.modal.lang.card.container,
            currentLang === item.key && style.modal.lang.card.active,
          ]}>
          <View style={style.modal.lang.card.lang}>
            <Shadow animated borderRadius={24} style={style.me8}>
              <Image source={item.icon} style={style.modal.lang.card.icon} />
            </Shadow>
            <Text
              textStyle="semi"
              size={Size.text.body1.size}
              line={25.6}
              letterSpacing={0.5}
              color={Color.mediumGray[colorScheme].mediumGray}>
              {trans(locale, lang, item.text)}
            </Text>
          </View>
          {currentLang === item.key ? (
            <Frame577 width={20} height={20} />
          ) : (
            <View style={style.modal.lang.card.radioIcon} />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function renderLanguageModal() {
    return (
      <BottomSheet
        swipeable={false}
        isVisible={isLMVisible}
        leftTitle
        title={trans(locale, lang, 'pilihBahasa')}
        onClosePress={() => {
          setCurrentLang(lang);
          setLangButtonActive(!isLangButtonActive);
          setLMVisible(false);
        }}>
        <View>
          {languageList.map((item) => {
            return renderLangOption(item);
          })}
          <Button
            style={style.modal.lang.button}
            disabled={!currentLang}
            onPress={() => {
              setLangButtonActive(!isLangButtonActive);
              setLang(currentLang);
              setLMVisible(false);
            }}>
            {trans(locale, lang, 'pilihBahasa')}
          </Button>
        </View>
      </BottomSheet>
    );
  }

  function renderFooterContainer() {
    return (
      <View style={[style.footerContainer]}>
        <Text
          color={Color.mediumGray.light.mediumGray}
          size={Size.text.body2.size}
          textStyle="semi"
          line={23 / 0.8}
          letterSpacing={0.5}>
          {trans(locale, lang, 'sudahPunyaAkun')}{' '}
          <TouchableWithoutFeedback
            onPress={() => {
              setIsAlreadyLaunched(true);
              navigation.navigate(NAVIGATION.LOGIN.Login);
            }}>
            <Text
              color={Color.primary.light.primary90}
              size={Size.text.body2.size}
              textStyle="semi"
              line={23.8}
              letterSpacing={0.5}
              textDecorationLine="underline">
              {trans(locale, lang, 'masuk')}
            </Text>
          </TouchableWithoutFeedback>
        </Text>
        <Text
          color={Color.mediumGray.light.mediumGray}
          size={Size.text.body2.size}
          textStyle="semi"
          line={23.8}
          letterSpacing={0.5}>
          {trans(locale, lang, 'v')}
          {DeviceInfo.getVersion()}
        </Text>
      </View>
    );
  }

  function renderBackgroundImage() {
    const imageStyle = {
      width: width,
      height: height - height * 0.25,
      resizeMode: 'cover',
    };
    return (
      <View style={[style.backgroundImage, style.shadowBanner]}>
        <Image source={LandingBanner} style={imageStyle} />
      </View>
    );
  }

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={[{ height }, style.zIndex1]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      {renderHeader()}
      {renderContent()}
      {renderButton()}
      {renderFooterContainer()}
      {renderLanguageModal()}
      {renderBackgroundImage()}
    </ScrollView>
  );
}

export default Landing;

Landing.defaultProps = {
  colorScheme: 'light',
};

Landing.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  setLang: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
  setIsAlreadyLaunched: PropTypes.func.isRequired,
};
