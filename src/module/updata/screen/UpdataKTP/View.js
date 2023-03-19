import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Base15 from 'ca-component-container/Base15';
import { Image, TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { trans } from 'ca-util/trans';
import {
  UpdataStep4Inactive,
  RedTick,
  UpdataStep1Active,
  UpdataStep3Inactive,
  UpdataStep2Active,
  Headset2,
} from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { NAVIGATION } from 'ca-util/constant';
import { VerKTPBenar, VerKTPSalah } from 'ca-config/Image';
import style from './style';
import locale from './locale';

function UpdataKTP(props) {
  const {
    navigation,
    lang,
    route: { params },
    setIsKTPSame,
  } = props;

  const { isUploadedKKAndKTP } = params;

  const [isDark, setIsDark] = useState(false);

  function renderStepsContainer() {
    return (
      <View style={style.steps.container}>
        <View style={style.steps.step.container}>
          <UpdataStep1Active />
          <View style={style.steps.step.line.active} />
          <UpdataStep2Active />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep3Inactive />
          <View style={style.steps.step.line.inactive} />
          <UpdataStep4Inactive />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.primary.light.primary90}>
          {trans(locale, lang, 'uploadDokumen')}
        </Text>
      </View>
    );
  }

  function renderImageContainer() {
    return (
      <View style={style.image.container}>
        <View>
          <Image
            source={VerKTPBenar}
            style={style.image.image}
            resizeMode="contain"
          />
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={19.6}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'benar')}
          </Text>
        </View>
        <View>
          <Image
            source={VerKTPSalah}
            style={style.image.image}
            resizeMode="contain"
          />
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={19.6}
            letterSpacing={0.5}
            align="center">
            {trans(locale, lang, 'salah')}
          </Text>
        </View>
      </View>
    );
  }

  function renderContentContainer() {
    return (
      <View>
        <Text
          ellipsizeMode="clip"
          numberOfLines={1}
          color={Color.grayE0E0E0.light.grayE0E0E0}
          style={style.mb24}>
          {trans(locale, lang, 'dash')}
        </Text>
        <View style={style.mb16}>
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            line={22.4}
            align="center">
            {trans(locale, lang, 'uploadYourKTP')}
          </Text>
        </View>
        <View style={style.content.container}>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'gunakanKTP')}
            </Text>
          </View>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanKTP')}
            </Text>
          </View>
          <View style={[style.content.checkList, style.mb6]}>
            <RedTick style={style.mr16} />
            <Text
              textStyle="medium"
              letterSpacing={0.5}
              line={21}
              color={Color.neutral.dark.neutral90}
              style={style.flexShrink1}>
              {trans(locale, lang, 'pastikanFoto')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <View style={style.footer.container}>
        {isUploadedKKAndKTP ? (
          <Button
            outline
            style={style.footer.button1}
            onPress={() => {
              setIsKTPSame(true);
              navigation.navigate(NAVIGATION.UPDATA.UpdataKK);
            }}>
            {trans(locale, lang, 'ktpMasihSama')}
          </Button>
        ) : null}
        <Button
          type="linear-gradient"
          onPress={() => {
            setIsKTPSame(false);
            navigation.navigate(NAVIGATION.UPDATA.UpdataKTPCam);
          }}>
          {trans(locale, lang, 'uploadKTP')}
        </Button>
      </View>
    );
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() =>
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter)
        }>
        <Headset2
          fill={isDark ? Color.main.light.black : Color.main.light.white}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Base15
      isScroll
      animated
      rightHeaderContent={renderRightHeaderContent()}
      onBackPress={() => navigation.pop()}
      onChangeHeaderToDark={(value) => {
        setIsDark(value);
      }}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      title={trans(locale, lang, 'pengkinianData')}>
      <Padder style={style.container}>
        {renderStepsContainer()}
        {renderImageContainer()}
        {renderContentContainer()}
        {renderFooterContainer()}
      </Padder>
    </Base15>
  );
}

export default UpdataKTP;

UpdataKTP.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  setIsKTPSame: PropTypes.func.isRequired,
};
