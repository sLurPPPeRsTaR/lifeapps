import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import WebView from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import Text from 'ca-component-generic/Text';
import { ChevronRightRed } from 'ca-config/Svg';
import {
  LPBorgol,
  LPSengaja,
  LPMedCheckIcon,
  LifecoverBgSimulation,
  LifecoverIllustrationSimulation,
} from 'ca-config/Image';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import {
  ListAccordionCustom,
  ButtonCustom,
} from 'ca-module-lifecover/component';
import { trans } from 'ca-util/trans';
import style from './style';
import locale from '../../locale';

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

function SliderItem({ item }) {
  return (
    <View
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
        allowsFullscreenVideo
        source={{ uri: item.videoUrl }}
      />
    </View>
  );
}
SliderItem.defaultProps = {
  item: {
    videoUrl: '',
  },
};
SliderItem.propTypes = {
  item: PropTypes.shape({
    videoUrl: PropTypes.string,
  }),
};

// CONSTANT
const activityList = [
  {
    key: 'bencana',
    title: {
      id: 'Bencana Alam/Wabah',
      en: 'Natural Disasters/Outbreaks',
    },
    icon: (
      <Image source={LPMedCheckIcon} style={style.termList.listItemImage} />
    ),
    values: [
      {
        id: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              Bencana alam, reaksi inti atom, wabah, epidemi dan/atau pandemic
              selain COVID-19.
            </Text>
          </View>
        ),
        en: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              Natural disasters, atomic nuclear reactions, epidemics, epidemics
              and/or pandemics other than COVID-19.
            </Text>
          </View>
        ),
      },
    ],
  },
  {
    key: 'bunuhDiri',
    title: {
      id: 'Bunuh Diri',
      en: 'Suicide',
    },
    icon: <Image source={LPSengaja} style={style.termList.listItemImage} />,
    values: [
      {
        id: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              Percobaan bunuh diri baik disadari atau tidak disadari atau
              eksekusi hukuman mati
            </Text>
          </View>
        ),
        en: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              Suicide attempt either consciously or unconsciously or execution
              of the death penalty
            </Text>
          </View>
        ),
      },
    ],
  },
  {
    key: 'kriminal',
    title: {
      id: 'Tindakan kriminal atau ilegal',
      en: 'Criminal or illegal acts',
    },
    icon: <Image source={LPBorgol} style={style.termList.listItemImage} />,
    values: [
      {
        id: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              Adanya suatu tindakan melanggar hukum atau tindakan kejahatan
              secara langsung atau tidak langsung.
            </Text>
          </View>
        ),
        en: (
          <View style={style.termList.listItemTextContainer}>
            <Text textStyle="medium" style={style.termList.listItemText}>
              There is an unlawful act or criminal act directly or indirectly.
            </Text>
          </View>
        ),
      },
    ],
  },
];

function LifecoverMainBottom({ lang, onPressSubs }) {
  // HOOKS
  const navigation = useNavigation();

  // STATE
  const [slideIndex, setSlideIndex] = useState(0);

  // REF
  const onViewRef = useRef((viewableItems) => {
    const { index } = viewableItems.changed[0];
    setSlideIndex(index);
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  // HANDLER
  // -- put handler here later

  // RENDERER
  const renderSectionSlider = () => {
    return (
      <View style={style.sectionSlider.container}>
        <FlatList
          data={ytSlides}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <SliderItem item={item} />}
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

        <Padder style={style.sectionSlider.padder}>
          <Text style={style.sectionSlider.title}>
            {trans(locale, lang, 'semangatLifecover')}
          </Text>
          <Text style={style.sectionSlider.description}>
            {trans(locale, lang, 'deskripsiLifecover')}
          </Text>
        </Padder>
      </View>
    );
  };
  const renderSectionPengecualian = () => {
    return (
      <Padder style={style.sectionException.container}>
        <Text style={style.sectionException.title}>
          {trans(locale, lang, 'pengecualian')}
        </Text>

        {activityList.map((item) => (
          <ListAccordionCustom
            key={item.key}
            identifier={item.key}
            title={item.title[lang]}
            icon={item.icon}
            lang={lang}>
            {item.values.map((value) => value[lang])}
          </ListAccordionCustom>
        ))}
      </Padder>
    );
  };
  const renderSectionSimulation = () => {
    return (
      <View style={style.sectionSimulation.container}>
        <Image
          source={LifecoverBgSimulation}
          style={style.sectionSimulation.containerBg}
        />

        <View style={style.sectionSimulation.content}>
          <Image
            source={LifecoverIllustrationSimulation}
            style={style.sectionSimulation.contentIllustration}
          />

          <View style={style.sectionSimulation.contentBody}>
            <Text style={style.sectionSimulation.contentTitle}>
              {trans(locale, lang, 'cobaSimulasi')}
            </Text>

            <Pressable style={style.sectionSimulation.contentButton}>
              <Text style={style.sectionSimulation.contentButtonTitle}>
                {trans(locale, lang, 'hitungSimulasi')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  const renderSectionFooter = () => {
    return (
      <Padder style={style.sectionFooter.container}>
        <Button
          onPress={onPressSubs}
          type="linear-gradient"
          style={style.subscribeBtn}>
          {trans(locale, lang, 'mulaiBerlangganan')}
        </Button>

        <View style={style.sectionFooter.containerTerms}>
          <ButtonCustom
            suffixIcon={<ChevronRightRed />}
            onPress={() => {
              navigation.navigate(
                NAVIGATION.LIFECOVER.LifecoverSyaratKetentuan
              );
            }}>
            {trans(locale, lang, 'syaratDanKetentuan')}
          </ButtonCustom>
          <ButtonCustom
            suffixIcon={<ChevronRightRed />}
            onPress={() => {
              navigation.navigate(NAVIGATION.LIFECOVER.LifecoverRiplay);
            }}>
            {trans(locale, lang, 'ringkasanInformasi')}
          </ButtonCustom>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
          }}>
          <View style={style.termList.helpContainer}>
            <Text
              textStyle="semi"
              size={Size.text.caption2.size}
              color={Color.mediumGray.light.mediumGray}
              align="center"
              style={style.termList.helpText}>
              {trans(locale, lang, 'butuhBantuan')}
            </Text>
            <Text
              textStyle="semi"
              size={Size.text.caption2.size}
              color={Color.red.light.red90}
              align="center">
              {trans(locale, lang, 'customerCare')}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <Text
          textStyle="semi"
          size={Size.text.caption1.size}
          color={Color.mediumGray.light.mediumGray}
          align="center">
          {trans(locale, lang, 'ptAsuransiJiwa')}
        </Text>
      </Padder>
    );
  };

  return (
    <View style={style.root.container}>
      {renderSectionSlider()}
      {renderSectionPengecualian()}
      {renderSectionSimulation()}
      {renderSectionFooter()}
    </View>
  );
}

LifecoverMainBottom.defaultProps = {
  lang: 'id',
};
LifecoverMainBottom.propTypes = {
  lang: PropTypes.string,
  onPressSubs: PropTypes.func.isRequired,
};

export default LifecoverMainBottom;
