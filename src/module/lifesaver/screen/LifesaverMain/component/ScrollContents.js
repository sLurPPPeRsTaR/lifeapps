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
  LPScrollA1,
  LPScrollB2,
  LPScrollC1,
  LPScrollD2,
  LifeSAVERProductPage,
  TotalClaim,
  Section1Product,
} from 'ca-config/Image';
import { LPArrowRight } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { lifesaverLogo } from 'ca-module-subs/components/LifeSaverLogo';
import Shadow from 'ca-component-container/Shadow';
import Padder from 'ca-component-container/Padder';
import { formatNumber } from 'ca-util/numbro';
import style from '../style';
import locale from '../locale';
import DialogProtectedActivity from './Dialog/DialogProtectedActivity';
import DialogMedicalProtection from './Dialog/DialogMedicalProtection';

function ScrollContents(props) {
  const { lang, onGetListRSPress, data } = props;
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

  const Header = useCallback(() => {
    return (
      <View style={style.scrollContents.header.container}>
        <Image
          style={style.scrollContents.header.image}
          source={LPScrollA1}
          resizeMode="contain"
        />
      </View>
    );
  }, []);

  const DetailButton = useCallback(({ title, onPress }) => {
    return (
      <Shadow borderRadius={30} style={style.detailButton.shadow}>
        <TouchableWithoutFeedback onPress={onPress}>
          <LinearGradient
            style={style.detailButton.container}
            colors={['#EEAC5C', '#F5C65E']}
            useAngle
            angle={10}>
            <Text
              textStyle="semi"
              color={Color.main.light.black}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              {title}
            </Text>
            <View style={style.detailButton.iconContainer}>
              <LPArrowRight width={20} height={20} />
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </Shadow>
    );
  }, []);

  const LifeSaverText = useCallback(() => {
    return (
      <Text textStyle="semi" color={Color.main.light.white}>
        Life
        <Text style={style.textBoldItalic} color={Color.main.light.white}>
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
      <CarouselContainer>
        <ImageBackground
          source={Section1Product}
          resizeMode="stretch"
          style={[
            style.scrollContents.mainImage,
            {
              aspectRatio: Size.screen.width / scrollItemHeight,
            },
          ]}>
          <Image
            source={LifeSAVERProductPage}
            style={style.scrollContents.scrollOneImage}
          />
          <Text
            textStyle="semi"
            color={Color.main.light.black}
            size={Size.text.h6.size}
            line={30}
            style={style.scrollContents.scrollOneContent}>
            {trans(locale, lang, 'protectYou')}
          </Text>
        </ImageBackground>
      </CarouselContainer>
    );
  }, [lang, scrollItemHeight]);

  const ScrollItemTwo = useCallback(() => {
    return (
      <CarouselContainer
        minHeight={scrollItemHeight}
        backgroundColor={Color.landingPage.light.orange}>
        <View style={style.center}>
          <View style={style.m30}>
            <Text
              textStyle="bold"
              color={Color.main.light.white}
              size={Size.text.h3.size}
              style={style.mb16}
              align="left">
              {trans(locale, lang, 'oneForAll')}
            </Text>
            <Text
              textStyle="semi"
              color={Color.main.light.white}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              <LifeSaverText />
              {trans(locale, lang, 'lifeSaverMelindungiKamu')}
            </Text>
            <View style={style.mb16} />
            <Text
              textStyle="semi"
              color={Color.main.light.white}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              {trans(locale, lang, 'selainMemproteksiDiri')}
            </Text>
            <View style={style.mb30} />
            <DetailButton
              onPress={() => setDialogTwoVisible(true)}
              title={trans(locale, lang, 'aktivitasYangTerproteksi')}
            />
          </View>
        </View>
        <Image style={style.scrollContents.SecondImage} source={LPScrollB2} />
      </CarouselContainer>
    );
  }, [lang, scrollItemHeight]);

  const ScrollItemThree = useCallback(() => {
    return (
      <CarouselContainer
        minHeight={scrollItemHeight}
        backgroundColor={Color.landingPage.light.red}>
        <View style={style.center}>
          <View style={style.m30}>
            <Text
              textStyle="bold"
              color={Color.main.light.white}
              size={Size.text.h3.size}
              style={style.mb16}
              align="left">
              {trans(locale, lang, 'wellHelpYou')}
            </Text>
            <Text
              style={style.mb16}
              textStyle="semi"
              color={Color.main.light.white}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              {trans(locale, lang, 'denganBiayaBerlangganan')}
              {<LifeSaverText />}
              {trans(locale, lang, 'memberikanCoverage')}
            </Text>
            <Text
              style={style.mb16}
              textStyle="semi"
              color={Color.main.light.white}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              {trans(locale, lang, 'selainCederaKarena')}
              {<LifeSaverText />}
              {trans(locale, lang, 'jugaMengCover')}
            </Text>
            <Text
              style={style.mb16}
              fontStyle="italic"
              textStyle="medium"
              color={Color.main.light.white}
              size={Size.text.body2.size}
              line={23.8}
              align="left">
              {trans(locale, lang, 'selamaPerioderPromosi')}
            </Text>
            <View style={style.mb30} />
            <DetailButton
              onPress={() => setDialogThreeVisible(true)}
              title={trans(locale, lang, 'LihatProteksiMedis')}
            />
          </View>
        </View>
        <Image
          style={style.scrollContents.itemThreeImage}
          source={LPScrollC1}
        />
      </CarouselContainer>
    );
  }, [lang, scrollItemHeight]);

  const renderScrollItemFour = useCallback(
    (act) => {
      return (
        <CarouselContainer
          minHeight={scrollItemHeight}
          backgroundColor={Color.landingPage.light.orange}>
          <View style={style.center}>
            <View style={style.m30}>
              <Text
                textStyle="bold"
                color={Color.main.light.white}
                size={Size.text.h3.size}
                style={style.mb16}
                align="left">
                {trans(locale, lang, 'FAST AND EASY!')}
              </Text>
              <Text
                style={style.mb16}
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="left">
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
                  align="left">
                  {trans(locale, lang, 'di')}
                </Text>
                <Text
                  style={style.mb16}
                  textStyle="bold"
                  color={Color.main.light.white}
                  size={Size.text.body2.size}
                  line={23.8}
                  align="left">
                  {trans(locale, lang, 'seribu')}
                </Text>
              </Text>
              <Text
                style={style.mb16}
                textStyle="semi"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="left">
                {trans(locale, lang, 'apabilaDibutuhkan')}
              </Text>
              <Text
                style={style.mb16}
                fontStyle="italic"
                textStyle="medium"
                color={Color.main.light.white}
                size={Size.text.body2.size}
                line={23.8}
                align="left">
                {trans(locale, lang, 'selamaPerioderPromosi')}
              </Text>
              <View style={style.mb30} />
              <DetailButton
                onPress={act}
                title={trans(locale, lang, 'DaftarRsKlinik')}
              />
            </View>
          </View>
          <Image
            style={style.scrollContents.itemFourImage}
            source={LPScrollD2}
          />
        </CarouselContainer>
      );
    },
    [lang, scrollItemHeight]
  );

  const RenderTotalClaim = useCallback(() => {
    if (data?.totalClaim) {
      return (
        <CarouselContainer backgroundColor={Color.secondary.light.secondary10}>
          <View style={style.center}>
            <View style={style.m18}>
              <Text
                textStyle="bold"
                color={Color.main.light.black}
                size={Size.text.body1.size}
                style={style.mb16}
                align="center">
                {trans(locale, lang, 'totalClaim')}
              </Text>
              <Padder>
                <Shadow borderRadius={16}>
                  <View style={style.scrollContents.totalClaimContainer}>
                    <Image source={TotalClaim} style={style.imageTotalClaim} />
                    <Text
                      textStyle="semi"
                      color={Color.main.light.black}
                      size={Size.text.h4.size}
                      align="center">
                      {formatNumber(data?.totalClaim, lang)}
                    </Text>
                  </View>
                </Shadow>
                <View style={style.scrollContents.totalClaimLogo}>
                  <View style={style.mr10}>
                    {lifesaverLogo.ACTIVE.LifeSAVER}
                  </View>
                  <View style={style.mr10}>
                    {lifesaverLogo.ACTIVE['LifeSAVER+']}
                  </View>
                </View>
              </Padder>
            </View>
          </View>
        </CarouselContainer>
      );
    }
    return null;
  }, [data?.totalClaim, lang]);

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
      <DialogMedicalProtection
        {...props}
        isVisible={dialogThreeVisibe}
        onRequestClose={() => setDialogThreeVisible(false)}
        onClosePress={() => setDialogThreeVisible(false)}
      />

      {renderScrollItemFour(onGetListRSPress)}
      <RenderTotalClaim />
    </>
  );
}

export default ScrollContents;

ScrollContents.propTypes = {
  lang: PropTypes.string.isRequired,
  onGetListRSPress: PropTypes.func.isRequired,
  data: PropTypes.objectOf(Object).isRequired,
};
