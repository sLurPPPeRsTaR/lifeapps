import React, { useState, useRef, useCallback } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import {
  LPBorgol,
  LPSengaja,
  LPGloveIcon,
  LPMedCheckIcon,
} from 'ca-config/Image';
import { ChevronDownLS } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import Shadow from 'ca-component-container/Shadow';
import Padder from 'ca-component-container/Padder';
import style from '../style';
import locale from '../locale';

const ytSlides = [
  {
    key: 'ytSlide1',
    videoUrl: 'https://www.youtube.com/embed/lowXL5cVtSg',
  },
  {
    key: 'ytSlide2',
    videoUrl: 'https://www.youtube.com/embed/9F1t7exW5-o',
  },
  {
    key: 'ytSlide3',
    videoUrl: 'https://www.youtube.com/embed/68tV4Tj9ai4',
  },
];

function NeverGameOver({ lang }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const onViewRef = useRef((viewableItems) => {
    const { index } = viewableItems.changed[0];
    setSlideIndex(index);
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  // webview
  const customCss =
    '* { -webkit-user-select: none; } input, textarea { -webkit-user-select: initial; } body { user-select: none !important; overflow-x: hidden !important; }';

  const customJs = `
      (function() {
        setTimeout(function() {
          try {
            var s = document.createElement('style');
            s.innerHTML = '${customCss
              .replace(/'/g, "\\'")
              .replace(/(\r\n|\n|\r)/gm, '')}';
            document.head.appendChild(s);
          } catch (e) {  }
        }, 0); 
      })();`;

  function renderSlider(item) {
    if (item.key === 'ytSlide1') {
      return (
        <View
          key={item.key}
          style={[
            style.slider.card.container,
            style.slider.card.marginCard.card,
            style.slider.card.youtubeBorder,
          ]}>
          <WebView
            injectedJavaScriptBeforeContentLoaded={
              Platform.OS === 'ios' ? customJs : undefined
            }
            injectedJavaScript={
              Platform.OS === 'android' ? customJs : undefined
            }
            style={
              !DeviceInfo.isTablet()
                ? style.slider.card.image
                : style.slider.card.imageTab
            }
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo={true}
            source={{ uri: item.videoUrl }}
          />
        </View>
      );
    }
    if (item.key === 'ytSlide2') {
      return (
        <View
          key={item.key}
          style={[
            style.slider.card.container,
            style.slider.card.marginCard.card,
            style.slider.card.youtubeBorder,
          ]}>
          <WebView
            style={
              !DeviceInfo.isTablet()
                ? style.slider.card.image
                : style.slider.card.imageTab
            }
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo={true}
            source={{ uri: item.videoUrl }}
          />
        </View>
      );
    }
    if (item.key === 'ytSlide3') {
      return (
        <View
          key={item.key}
          style={[
            style.slider.card.container,
            style.slider.card.marginCard.lastCard,
            style.slider.card.youtubeBorder,
          ]}>
          <WebView
            style={
              !DeviceInfo.isTablet()
                ? style.slider.card.image
                : style.slider.card.imageTab
            }
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo={true}
            source={{ uri: item.videoUrl }}
          />
        </View>
      );
    }
    return null;
  }

  function renderSliderContainer() {
    return (
      <View>
        <FlatList
          data={ytSlides}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => renderSlider(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="normal"
          snapToAlignment="start"
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        {!DeviceInfo.isTablet() && (
          <View style={style.bullet.container}>
            {ytSlides.map((item, index) => {
              return (
                <View
                  key={item.key}
                  style={
                    slideIndex === index
                      ? style.bullet.active
                      : style.bullet.inactive
                  }
                />
              );
            })}
          </View>
        )}
      </View>
    );
  }

  const activityList = [
    {
      key: 'kondisi',
      title: trans(locale, lang, 'kondisiYangSudahAda'),
      icon: (
        <Image source={LPMedCheckIcon} style={style.termsFAQ.listItemImage1} />
      ),
      example: [
        {
          id: 'Penyakit, cedera, maupun cacat tetap yang diakibatkan oleh kondisi yang telah ada sebelumnya (pre-existing condition).',
          en: 'Illness, injury, or permanent disability caused by pre-existing conditions.',
        },
      ],
    },
    {
      key: 'sengaja',
      title: trans(locale, lang, 'tindakanYangDisengaja'),
      icon: <Image source={LPSengaja} style={style.termsFAQ.listItemImage2} />,
      example: [
        {
          id: 'Cedera atau cacat akibat perbuatan yang disengaja seperti menyakiti diri sendiri.',
          en: 'Injury or disability as a result of an intentional act such as self-harm.',
        },
      ],
    },
    {
      key: 'kriminal',
      title: trans(locale, lang, 'tindakanKriminalAtau'),
      icon: <Image source={LPBorgol} style={style.termsFAQ.listItemImage3} />,
      example: [
        {
          id: 'Cedera atau cacat tetap akibat partisipasi aktif dalam tindakan ilegal dan kriminalitas.',
          en: 'Injury or permanent disability as a result of active participation in illegal acts and crimes.',
        },
      ],
    },
    {
      key: 'ekstrem',
      title: trans(locale, lang, 'OlahragaEkstrem'),
      icon: (
        <Image source={LPGloveIcon} style={style.termsFAQ.listItemImage4} />
      ),
      example: [
        {
          id: 'Hockey dan olahraga beladiri lainnya (Tinju, Karate, Gulat, dan lain-lain)',
          en: 'Hockey, boxing, karate, wrestling and all other martial sports.',
        },
      ],
    },
  ];

  const [selectedListItem, setSelectedListItem] = useState(null);
  const ListItem = useCallback(
    ({ title, icon, example, identifier, lang }) => {
      const showDrawer = selectedListItem === identifier;
      const onSelectedItem = () => {
        if (showDrawer) {
          setSelectedListItem(null);
        } else {
          setSelectedListItem(identifier);
        }
      };
      return (
        <>
          <Shadow
            borderRadius={16}
            style={style.modal.protectedActivity.shadow}>
            <TouchableWithoutFeedback onPress={onSelectedItem}>
              <View style={style.modal.protectedActivity.listItemContainer}>
                <View
                  style={style.modal.protectedActivity.listItemTextContainer}>
                  <View style={[style.w60, { alignItems: 'center' }]}>
                    {icon}
                  </View>
                  <Text textStyle="semi" size={Size.text.body2.size}>
                    {title}
                  </Text>
                </View>
                <View
                  style={
                    style.modal.protectedActivity.listItemChevronContainer
                  }>
                  <ChevronDownLS
                    width={20}
                    height={20}
                    style={showDrawer ? style.flipTrue : style.flipFalse}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Shadow>
          {showDrawer && (
            <View style={style.modal.protectedActivity.exampleContainer}>
              {example?.map((item) => (
                <Text
                  key={item.key}
                  textStyle="semi"
                  line={22}
                  size={Size.text.caption1.size}
                  color={Color.neutral.light.neutral40}>
                  {item[lang]}
                </Text>
              ))}
            </View>
          )}
        </>
      );
    },
    [selectedListItem]
  );

  return (
    <View style={style.neverGameOverContainer}>
      <Text
        textStyle="semi"
        size={Size.text.h6.size}
        line={23.8}
        style={style.text.hashtag}>
        {trans(locale, lang, 'continueHobby')}
      </Text>
      <Text
        textStyle="bold"
        size={Size.text.h6.size}
        line={23.8}
        color={Color.neutral90}
        style={style.text.hashtag}>
        {trans(locale, lang, 'nevergameOverHashtag')}
      </Text>

      <View style={style.renderSliderContainer}>
        {renderSliderContainer(renderSlider)}
      </View>
      <Padder>
        <Text
          textStyle="semi"
          size={Size.text.body1.size}
          line={40}
          align="center">
          {trans(locale, lang, 'pengecualian')}
        </Text>
        {activityList.map((item) => (
          <ListItem
            key={item.key}
            identifier={item.key}
            title={item.title}
            icon={item.icon}
            example={item.example}
            lang={lang}
          />
        ))}
      </Padder>
    </View>
  );
}

export default NeverGameOver;

NeverGameOver.propTypes = {
  lang: PropTypes.string.isRequired,
  // navigation: PropTypes.objectOf(Object).isRequired,
};
