import { View } from 'react-native';
import React from 'react';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import PropTypes from 'prop-types';
import style from './style';
import locale from './locale';
import Paragraf from './components/Paragraf';
import Size from 'ca-config/Size';

function LifesaverKebijakanPrivasi(props) {
  const { navigation, colorScheme, lang } = props;
  const wordings = [
    {
      no: 1,
      text: 'bertanggungJawabUntuk',
    },
    {
      no: 2,
      text: 'saudaraMenjaminBahwa',
    },
    {
      no: 3,
      text: 'saudaraSetujuDengan',
    },
    {
      no: 4,
      text: 'saudaraMengizinkan',
    },
    {
      no: 5,
      text: 'sesuaiKetentuan',
    },
    {
      no: 6,
      text: 'untukMelindungiInformasi',
    },
    {
      no: 7,
      text: 'pendebitanAkanDilakukan',
    },
    {
      no: 8,
      text: 'ifgTidakMenerbitkan',
    },
    {
      no: 9,
      text: 'ifgLifeBerhak',
    },
    {
      no: 10,
      text: 'saudaraSetujuJikaBatas',
    },
    {
      no: 11,
      text: 'jikaKartu',
    },
    {
      no: 12,
      text: 'jikaTerdapatBiaya',
    },
  ];
  return (
    <Base
      title={
        <View>
          <Text size={Size.text.body1.size} textStyle='bold' align='center'>{trans(locale, lang, 'syaratKetentuan')}</Text>
          <Text size={Size.text.body1.size} textStyle='bold' align='center'>{trans(locale, lang, 'pembayaran')}</Text>
        </View>
      }
      onBackPress={() => {
        navigation.goBack();
      }}
      bordered>
      <View style={style.my16}>
        <Padder>
          {wordings?.map((element) => (
            <Paragraf no={element?.no}>
              {trans(locale, lang, element?.text)}
            </Paragraf>
          ))}
        </Padder>
      </View>
    </Base>
  );
}

LifesaverKebijakanPrivasi.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverKebijakanPrivasi;
