import { StatusBar, View } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import Header from 'ca-component-card/Header';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Pdf from 'react-native-pdf';
import { BASE_URL, TYPE } from 'ca-util/constant';
import style from './style';
import locale from './locale';

const skUri = {
  '-uat': '15ce4ffc-3bce-47c1-ad78-5edff39a8590.pdf',
  '': 'f5ea1b03-beb5-4e62-b70e-94e63cbaa7e6.pdf',
};

function LifesaverSyaratKetentuan(props) {
  const { lang, colorScheme, navigation } = props;
  const pdfRef = useRef();
  const source = {
    uri: `${BASE_URL}/v1/public/assets/${skUri[TYPE]}`,
  };

  return (
    <SafeAreaView style={style.flex1}>
      <StatusBar
        backgroundColor={Color.whiteCard[colorScheme].color}
        barStyle="dark-content"
      />
      <Header
        title={trans(locale, lang, 'syaratKetentuan')}
        onBackPress={() => navigation.pop()}
        headerStyle={style.main.headerBg}
      />
      <View style={style.pdf.container}>
        <Pdf
          trustAllCerts={false}
          ref={pdfRef}
          source={source}
          style={style.pdf.pdf}
        />
      </View>
    </SafeAreaView>
  );
}

LifesaverSyaratKetentuan.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverSyaratKetentuan;
