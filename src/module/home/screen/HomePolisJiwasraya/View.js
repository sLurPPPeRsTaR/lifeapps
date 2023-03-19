import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import { CekNomorPolisBackground } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { NAVIGATION } from 'ca-util/constant';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import locale from './locale';
import style from './style';

function HomePolisJiwasraya(props) {
  // eslint-disable-next-line no-unused-vars
  const { navigation, lang, colorScheme, userId, alreadyKYC, dimensions } =
    props;

  function renderHeaderContainer() {
    return (
      <View style={[style.header.container, { width: dimensions.width }]}>
        <Image
          source={CekNomorPolisBackground}
          style={style.header.image}
          width={dimensions.width}
          height={(dimensions.width / 375) * 276}
        />
        <Text
          textStyle="bold"
          size={Size.text.h5.size}
          line={27}
          style={style.header.text}>
          {trans(locale, lang, 'informasiRestrukturisasiPolis1')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    return (
      <Padder style={style.content.container}>
        <View style={[style.content.row, style.mb8]}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            style={style.content.col1}>
            {trans(locale, lang, 'nomor1')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            style={style.content.col2}>
            {trans(locale, lang, 'sesuaiDenganPengumuman')}
          </Text>
        </View>
        <View style={[style.content.row, style.mb12]}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            style={style.content.col1}>
            {trans(locale, lang, 'nomor2')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            style={style.content.col2}>
            {trans(locale, lang, 'apabilaUserSudah')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(NAVIGATION.HOME.HomePengalihanPolis);
          }}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            textDecorationLine="underline"
            color={Color.primary.light.primary90}
            style={style.ms20}>
            {trans(locale, lang, 'lihatPengalihanPolis')}
          </Text>
        </TouchableOpacity>
      </Padder>
    );
  }

  function renderAlertContainer() {
    return (
      <Padder style={style.mb20}>
        <AlertDialogue
          title={trans(locale, lang, 'semuaPolisAkan')}
          type="warning"
          leftIcon
        />
      </Padder>
    );
  }

  function renderBottom() {
    return (
      <Padder>
        <Button
          shadow
          onPress={() => {
            navigation.navigate(NAVIGATION.REGISTER.RegisterPolis);
          }}>
          {trans(locale, lang, 'cekNomorPolisKamu2')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'informasiRestrukturisasiPolis')}>
      <View style={style.pb32}>
        {renderHeaderContainer()}
        {renderContentContainer()}
        {userId !== '' && alreadyKYC ? renderAlertContainer() : null}
        {renderBottom()}
      </View>
    </Base>
  );
}

export default HomePolisJiwasraya;

HomePolisJiwasraya.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  userId: PropTypes.string.isRequired,
  alreadyKYC: PropTypes.bool.isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
