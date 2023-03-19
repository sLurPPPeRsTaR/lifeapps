import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Base15 as Base } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import { RusakIcon1 } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import { BackgroundGradientSquare } from 'ca-config/Svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import locale from './locale';
import style from './style';

function ExploreMain(props) {
  const { lang, colorScheme } = props;
  const insets = useSafeAreaInsets();

  function renderBackgroundHeaderImage() {
    return (
      <View
        style={[
          style.backgroundContainer,
          {
            top: -230 + insets.top,
          },
        ]}>
        <BackgroundGradientSquare width={Size.screen.width} height={390} />
      </View>
    );
  }

  return (
    <Base
      animated
      isScroll
      isBackground
      title={trans(locale, lang, 'proteksi')}
      backgroundColor={Color.backgroundHome.light.backgroundHome}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <View
        style={[
          style.container,
          { height: Size.screen.height - insets.top - 150 },
        ]}>
        <Image
          source={RusakIcon1}
          style={style.rusakIcon}
          resizeMode="contain"
        />
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={27}
          letterSpacing={0.5}
          align="center"
          style={style.marginBottom12}>
          {trans(locale, lang, 'maafUntukSekarang')}
        </Text>
        <Text
          color={Color.mediumGray[colorScheme].mediumGray}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center">
          {trans(locale, lang, 'untukSaatIni')}
        </Text>
      </View>
    </Base>
  );
}

export default ExploreMain;

ExploreMain.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
};
