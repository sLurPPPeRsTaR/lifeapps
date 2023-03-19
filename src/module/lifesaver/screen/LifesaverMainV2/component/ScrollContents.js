import React, { useCallback, useState } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import {
  LPScrollA1B,
  Slide1B1,
  Slide1B2,
  Slide2B1,
  Slide2B2,
  Slide3B,
  Slide4B,
} from 'ca-config/Image';
import { LPArrowRight, LPArrowRightWhite } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import Shadow from 'ca-component-container/Shadow';
import style from '../style';
import locale from '../locale';
import DialogProtectedActivity from './Dialog/DialogProtectedActivity';
import DialogMedicalProtection from './Dialog/DialogMedicalProtection';

function ScrollContents(props) {
  const { lang, onGetListRSPress } = props;
  const scrollItemHeight = Size.screen.height - 80;
  const CarouselContainer = useCallback(
    ({ children, backgroundColor, minHeight, maxHeight, height }) => {
      return (
        <View
          style={[
            style.scrollContents.carouselContainer,
            {
              backgroundColor: backgroundColor,
              minHeight: minHeight,
              maxHeight: maxHeight,
              height: height,
            },
          ]}>
          {children}
        </View>
      );
    },
    []
  );

  const [dialogTwoVisibe, setDialogTwoVisible] = useState(false);
  const [dialogThreeVisibe, setDialogThreeVisible] = useState(false);

  const DetailButton = useCallback(
    ({ title, onPress, color, textColor, blackArrow = true }) => {
      return (
        <Shadow borderRadius={30} style={style.detailButton.shadow}>
          <TouchableWithoutFeedback onPress={onPress}>
            <LinearGradient
              style={style.detailButton.container}
              colors={color || ['#EEAC5C', '#F5C65E']}
              useAngle
              angle={10}>
              <Text
                textStyle="semi"
                color={textColor || Color.main.light.black}
                size={Size.text.body2.size}
                line={23.8}
                align="left">
                {title}
              </Text>
              <View style={style.detailButton.iconContainer}>
                {blackArrow ? (
                  <LPArrowRight width={20} height={20} />
                ) : (
                  <LPArrowRightWhite width={20} height={20} />
                )}
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </Shadow>
      );
    },
    []
  );

  const LifeSaverText = useCallback(({ color }) => {
    return (
      <Text textStyle="semi" color={color || Color.main.light.white}>
        Life
        <Text
          style={style.textBoldItalic}
          color={color || Color.main.light.white}>
          SAVER
        </Text>
      </Text>
    );
  }, []);
  function textItalic(text) {
    return (
      <Text
        style={style.mb16}
        textStyle="semi"
        fontStyle="italic"
        color={Color.main.light.white}
        line={23.8}
        size={Size.text.body1.size}>
        {text}
      </Text>
    );
  }

  const ScrollItemOne = useCallback(() => {
    return (
      <CarouselContainer
        minHeight={scrollItemHeight - 130}
        backgroundColor={Color.landingPage.light.brown}>
        <ImageBackground
          style={style.scrollContents.scrollOneBg2}
          source={Slide1B2}
          resizeMode="stretch">
          <Text
            textStyle="bold"
            color={Color.landingPage.light.red}
            size={Size.text.h4.size}
            line={35}
            align="center"
            style={style.scrollContents.scrollOneText}>
            {trans(locale, lang, 'startYourDayConfidently')}
          </Text>
          <Image
            style={style.scrollContents.scrollOneImage}
            source={LPScrollA1B}
            resizeMode="cover"
          />
        </ImageBackground>
        <Image
          style={style.scrollContents.scrollOneBg1}
          source={Slide1B1}
          resizeMode="cover"
        />
      </CarouselContainer>
    );
  }, [lang, scrollItemHeight]);

  const ScrollItemTwo = useCallback(() => {
    return (
      <CarouselContainer
        minHeight={scrollItemHeight}
        backgroundColor={Color.landingPage.light.orange}>
        <ImageBackground
          style={style.scrollContents.scrollOneBg2}
          source={Slide2B1}
          resizeMode="stretch">
          <View style={style.center}>
            <View style={style.m30}>
              <Text
                textStyle="bold"
                color={Color.main.light.white}
                size={Size.text.h3.size}
                style={style.mb16}
                align="center">
                {trans(locale, lang, 'oneForAll')}
              </Text>
              <Text
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="center">
                <LifeSaverText />
                {trans(locale, lang, 'lifeSaverMelindungiKamu')}
              </Text>
              <View style={style.mb16} />
              <Text
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="center">
                {trans(locale, lang, 'selainMemproteksiDiri')}
              </Text>
              <View style={[style.allCenter, style.mt30]}>
                <DetailButton
                  onPress={() => setDialogTwoVisible(true)}
                  title={trans(locale, lang, 'aktivitasYangTerproteksi')}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
        <Image
          style={style.scrollContents.scrollTwoImage}
          source={Slide2B2}
          resizeMode="cover"
        />
      </CarouselContainer>
    );
  }, [lang, scrollItemHeight]);

  const ScrollItemThree = useCallback(() => {
    return (
      <LinearGradient
        style={{
          minHeight: scrollItemHeight,
        }}
        colors={['#b98043', '#df9b50']}
        useAngle
        angle={10}>
        <View style={style.center}>
          <View style={style.m30}>
            <Text
              textStyle="bold"
              color={Color.main.light.white}
              size={Size.text.h3.size}
              style={style.mb16}
              align="center">
              {trans(locale, lang, 'wellHelpYou')}
            </Text>
            <Text
              style={style.mb16}
              textStyle="semi"
              color={Color.main.light.black}
              size={Size.text.body2.size}
              line={23.8}
              align="center">
              {trans(locale, lang, 'denganBiayaBerlangganan')}
              {<LifeSaverText color={Color.main.light.black} />}
              {trans(locale, lang, 'memberikanCoverage')}
            </Text>
            <Text
              style={style.mb16}
              textStyle="semi"
              color={Color.main.light.black}
              size={Size.text.body2.size}
              line={23.8}
              align="center">
              {trans(locale, lang, 'selainCederaKarena')}
              {<LifeSaverText color={Color.main.light.black} />}
              {trans(locale, lang, 'jugaMengCover')}
            </Text>
            <Text
              style={style.mb16}
              fontStyle="italic"
              textStyle="medium"
              color={Color.main.light.black}
              size={Size.text.body2.size}
              line={23.8}
              align="center">
              {trans(locale, lang, 'selamaPerioderPromosi')}
            </Text>
            <View style={style.allCenter}>
              <DetailButton
                onPress={() => setDialogThreeVisible(true)}
                title={trans(locale, lang, 'LihatProteksiMedis')}
              />
            </View>
          </View>
        </View>
        <Image style={style.scrollContents.itemThreeImage} source={Slide3B} />
      </LinearGradient>
    );
  }, [lang, scrollItemHeight]);

  const renderScrollItemFour = useCallback(
    (act) => {
      return (
        <LinearGradient
          style={{
            minHeight: scrollItemHeight,
          }}
          colors={['#9b2724', Color.landingPage.light.red]}
          useAngle
          angle={10}>
          <View style={style.center}>
            <View style={style.m30}>
              <Text
                textStyle="bold"
                color={Color.main.light.white}
                size={Size.text.h3.size}
                style={style.mb16}
                align="center">
                {trans(locale, lang, 'FAST AND EASY!')}
              </Text>
              <Text
                style={style.mb16}
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="center">
                {trans(locale, lang, 'DimanapunKamu')}
                {<LifeSaverText />}
                {trans(locale, lang, 'SelaluSiap')}
                {textItalic(' cashless ')}
                <Text
                  style={style.mb16}
                  textStyle="semi"
                  color={Color.main.light.white}
                  size={Size.text.body2.size}
                  line={23.8}
                  align="center">
                  {trans(locale, lang, 'di')}
                </Text>
                <Text
                  style={style.mb16}
                  textStyle="bold"
                  color={Color.main.light.white}
                  size={Size.text.body2.size}
                  line={23.8}
                  align="center">
                  {trans(locale, lang, 'seribu')}
                </Text>
              </Text>
              <Text
                style={style.mb16}
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="center">
                {trans(locale, lang, 'apabilaDibutuhkan')}
              </Text>
              <Text
                style={style.mb16}
                fontStyle="italic"
                textStyle="medium"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="center">
                {trans(locale, lang, 'selamaPerioderPromosi')}
              </Text>
              <View style={style.allCenter}>
                <DetailButton
                  onPress={act}
                  title={trans(locale, lang, 'DaftarRsKlinik')}
                  color={['#da3832', '#da3832']}
                  textColor={Color.main.light.white}
                  blackArrow={false}
                />
              </View>
            </View>
          </View>
          <Image style={style.scrollContents.itemFourImage} source={Slide4B} />
        </LinearGradient>
      );
    },
    [lang, scrollItemHeight]
  );

  return (
    <>
      <ScrollItemOne />
      <ScrollItemTwo />
      <DialogProtectedActivity
        {...props}
        isVisible={dialogTwoVisibe}
        onRequestClose={() => setDialogTwoVisible(false)}
        onClosePress={() => setDialogTwoVisible(false)}
      />
      <ScrollItemThree />
      {renderScrollItemFour(onGetListRSPress)}
      <DialogMedicalProtection
        {...props}
        isVisible={dialogThreeVisibe}
        onRequestClose={() => setDialogThreeVisible(false)}
        onClosePress={() => setDialogThreeVisible(false)}
      />
    </>
  );
}

export default ScrollContents;

ScrollContents.propTypes = {
  lang: PropTypes.string.isRequired,
  onGetListRSPress: PropTypes.func.isRequired,
};
