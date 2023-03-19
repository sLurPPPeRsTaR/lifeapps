import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import { Frame577 } from 'ca-config/Svg';
import { ENIcon, IDIcon } from 'ca-config/Image';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import Shadow from 'ca-component-container/Shadow';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import Style from './style';

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

function ProfileLanguage(props) {
  const { navigation, lang, colorScheme, setLang } = props;
  const [currentLang, setCurrentLang] = useState(lang);

  useDefaultBackHandler(navigation);

  function renderLangOption(item) {
    return (
      <TouchableOpacity key={item.key} onPress={() => setCurrentLang(item.key)}>
        <View
          style={[
            Style.lang.card.container,
            currentLang === item.key && Style.lang.card.active,
          ]}>
          <View style={Style.lang.card.lang}>
            <Shadow animated borderRadius={24} style={Style.me8}>
              <Image source={item.icon} style={Style.lang.card.icon} />
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
            <View style={Style.lang.card.radioIcon} />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'bahasa')}>
      <View style={Style.lang.textContainer}>
        <Text
          color={Color.mediumGray[colorScheme].mediumGray}
          textStyle="semi"
          line={20}
          letterSpacing={0.5}>
          {trans(locale, lang, 'pilihBahasa')}
        </Text>
      </View>
      <Padder style={Style.lang.container}>
        <View>
          {/* <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            style={Style.lang.subtitle}>
            {trans(
              locale,
              lang,
              'Pilih bahasa yang kamu gunakan untuk memakai aplikasi ini.',
            )}
          </Text> */}
          {languageList.map((item) => {
            return renderLangOption(item);
          })}
          <Button
            style={Style.lang.button}
            disabled={currentLang === lang}
            onPress={() => {
              setLang(currentLang);
              navigation.pop();
            }}>
            {trans(locale, lang, 'simpan')}
          </Button>
        </View>
      </Padder>
    </Base>
  );
}

export default ProfileLanguage;

ProfileLanguage.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
};
