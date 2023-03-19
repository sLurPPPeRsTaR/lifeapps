import React, { useEffect, useCallback, useMemo } from 'react';
import { BackHandler, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { Base, Shadow } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { LivenessMain, LivenessBadge, LivenessDoc } from 'ca-config/Image';
import { NAVIGATION } from 'ca-util/constant';
import { Wave } from 'ca-config/Svg';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Size from 'ca-config/Size';
import locale from './locale';
import style from './style';

function KycUploadSelfieCam(props) {
  const { navigation, lang, width } = props;

  useEffect(() => {
    const goTo = () => {
      onBackPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [onBackPress]);

  const onBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  function renderBottom() {
    return (
      <Padder style={style.renderBottom.container}>
        <Wave
          width={width}
          height={250}
          style={style.renderBottom.waveContainer}
          fill={Color.wave.dark.color}
        />
        <Button
          type="linear-gradient"
          onPress={() => {
            navigation.navigate(NAVIGATION.KYC.KycUploadSelfieCam);
          }}>
          {trans(locale, lang, 'ambilGambar')}
        </Button>
      </Padder>
    );
  }

  function renderContent() {
    return (
      <Padder style={style.renderContent.container}>
        <View style={style.mT16}>
          <Image source={LivenessMain} style={style.renderContent.imgSize} />
        </View>
        <Text style={style.mB16} align="center" textStyle="medium" line={21}>
          {trans(locale, lang, 'lakukanVerifikasiWajah')}
        </Text>
      </Padder>
    );
  }

  function renderSubContent() {
    return (
      <Padder style={style.mB48}>
        <Shadow borderRadius={30} style={style.renderSubContent.container}>
          <View style={style.renderSubContent.card.container}>
            <Image
              source={LivenessBadge}
              style={style.renderSubContent.card.image}
              resizeMode="contain"
            />
            <View style={style.fS1}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'klaimMudah')}
              </Text>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'prosesMenjadiLebih')}
              </Text>
            </View>
          </View>
          <View style={style.renderSubContent.card.lastContainer}>
            <Image
              source={LivenessDoc}
              style={style.renderSubContent.card.image}
              resizeMode="contain"
            />
            <View style={style.fS1}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'verifikasiUntukSemua')}
              </Text>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'verifikasiYangKamu')}
              </Text>
            </View>
          </View>
        </Shadow>
        <View style={style.mT16}>
          <Text>{trans(locale, lang, 'saatVerifikasiWajah')}</Text>
        </View>
        <AlertDialogue
          style={style.renderSubContent.alertDialogueStyle}
          type="success"
          leftIcon
          title={trans(locale, lang, 'dataPribadiKamu')}
        />
      </Padder>
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      title={trans(locale, lang, 'verifikasiWajah')}
      onBackPress={onBackPress}
      renderBottom={renderBottom()}>
      {renderContent()}
      {renderSubContent()}
    </Base>
  );
}

export default KycUploadSelfieCam;

KycUploadSelfieCam.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};
