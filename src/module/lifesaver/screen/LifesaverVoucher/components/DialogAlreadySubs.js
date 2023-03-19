import { View, Image } from 'react-native';
import React, { useState } from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import { LPSpeakerLock } from 'ca-config/Image';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import style from '../style';
import locale from '../locale';

function DialogAlreadySubs(props) {
  const { colorScheme, lang, isVisible, onBackPress } = props;

  return (
    <BottomSheet swipeable={false} isVisible={isVisible}>
      <View style={style.dialogNotEligible.imageContainer}>
        <Image source={LPSpeakerLock} style={style.dialogNotEligible.image} />
      </View>

      <View style={style.dialogNotEligible.container}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          style={style.dialogNotEligible.title}>
          {trans(locale, lang, 'lifesaverKamuTelahAktif')}
        </Text>
        <Text
          line={20}
          align="center"
          style={style.mt16}
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}>
          {trans(locale, lang, 'kamuSudahTerproteksi')}
        </Text>
        <View style={style.dialogNotEligible.buttonContainer}>
          <View>
            <Button onPress={onBackPress} type="linear-gradient">
              <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
                {trans(locale, lang, 'kembali')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
}

DialogAlreadySubs.propTypes = {
  colorScheme: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default DialogAlreadySubs;
