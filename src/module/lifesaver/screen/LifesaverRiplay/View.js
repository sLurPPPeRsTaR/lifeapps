import { StatusBar, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import Header from 'ca-component-card/Header';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import { Download } from 'ca-config/Svg';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { BASE_URL, TYPE } from 'ca-util/constant';
import style from './style';
import locale from './locale';

const riplayUri = {
  '-uat': 'feb76d0c-51dd-4abd-9e8d-281761126bb5.pdf',
  '': 'e2d2c3b9-e8b4-4003-b903-43bcafd72b7a.pdf',
};

function downloadPdf() {
  const { dirs } = ReactNativeBlobUtil.fs;
  ReactNativeBlobUtil.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: 'application/pdf',
      description: 'File downloaded by download manager.',
      mediaScannable: true,
      title: 'Riplay_umum_LifeSAVER.pdf',
      path: `${dirs.DownloadDir}/Riplay_umum_LifeSAVER.pdf`,
    },
  })
    .fetch('GET', `${BASE_URL}/v1/public/assets/${riplayUri[TYPE]}`)
    .then((res) => {
      console.log(res.path());
    })
    .catch((error) => console.log(error));
}
function LifesaverRiplay(props) {
  const { lang, colorScheme, navigation } = props;
  const pdfRef = useRef();
  const source = {
    uri: `${BASE_URL}/v1/public/assets/${riplayUri[TYPE]}`,
  };

  function renderDownloadIcon() {
    return (
      <Padder>
        <TouchableOpacity onPress={downloadPdf}>
          <Download fill="black" />
        </TouchableOpacity>
      </Padder>
    );
  }

  return (
    <SafeAreaView style={style.flex1}>
      <StatusBar
        backgroundColor={Color.whiteCard[colorScheme].color}
        barStyle="dark-content"
      />
      <Header
        rightContent={renderDownloadIcon()}
        title={trans(locale, lang, 'riplay')}
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

LifesaverRiplay.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverRiplay;
