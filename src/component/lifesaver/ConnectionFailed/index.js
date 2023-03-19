import { View, StatusBar, Image } from 'react-native';
import React from 'react';
import Color from 'ca-config/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomSheet from 'ca-component-container/BottomSheet';
import Button from 'ca-component-generic/Button';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import Text from 'ca-component-generic/Text';
import { RusakIcon1 } from 'ca-config/Image';
import locale from './locale';
import style from './style';

function ConnectionFailed(props) {
  const { lang, navigation } = props;
  const onBackPress = () => navigation.goBack();
  return (
    <SafeAreaView style={style.flex1}>
      <StatusBar backgroundColor={Color.red.light.D71920} />
      <BottomSheet
        isVisible
        swipeable={false}
        onClosePress={onBackPress}
        onRequestClose={onBackPress}>
        <View style={style.container}>
          <Image source={RusakIcon1} style={style.image} resizeMode="contain" />
          <Text
            textStyle="semi"
            size={Size.text.h6.size}
            align="center"
            color={Color.neutral.light.neutral40}>
            {trans(locale, lang, 'koneksiGagal')}
          </Text>
        </View>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          type="linear-gradient">
          <Text textStyle="semi" color={Color.whiteCard.light.color}>
            {trans(locale, lang, 'kembali')}
          </Text>
        </Button>
      </BottomSheet>
    </SafeAreaView>
  );
}

ConnectionFailed.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

export default ConnectionFailed;
