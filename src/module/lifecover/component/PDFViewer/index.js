import React, { useCallback, useMemo, useRef } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Header from 'ca-component-card/Header';
import { Download } from 'ca-config/Svg';
import Pdf from 'react-native-pdf';
import Padder from 'ca-component-container/Padder';
import { useNavigation } from '@react-navigation/native';
import style from './style';

function PDFViewer({ uri, title, prefixTitle, colorScheme }) {
  // HOOKS
  const navigation = useNavigation();

  // REF
  const pdfRef = useRef();

  // DATA
  const titleFormatted = useMemo(() => {
    return `${prefixTitle}_${title?.split(' ').join('_')}`;
  }, [title, prefixTitle]);
  const source = useMemo(
    () => ({
      uri,
    }),
    [uri]
  );

  // HANDLER
  const handleDownload = useCallback(() => {
    const { dirs } = ReactNativeBlobUtil.fs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        description: 'File downloaded by download manager.',
        mediaScannable: true,
        title: `${titleFormatted}.pdf`,
        path: `${dirs.DownloadDir}/${titleFormatted}.pdf`,
      },
    })
      .fetch('GET', uri)
      .then((res) => {
        console.log(res.path());
      })
      .catch((error) => console.log(error));
  }, [uri, titleFormatted]);
  const handleBackPress = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  // RENDERER
  function renderDownloadIcon() {
    return (
      <Padder>
        <TouchableOpacity onPress={handleDownload}>
          <Download fill="black" />
        </TouchableOpacity>
      </Padder>
    );
  }

  return (
    <SafeAreaView style={style.root}>
      <StatusBar
        backgroundColor={Color.whiteCard[colorScheme].color}
        barStyle="dark-content"
      />
      <Header
        rightContent={renderDownloadIcon()}
        title={title}
        onBackPress={handleBackPress}
        headerStyle={style.headerBg}
      />
      <View style={style.pdfContainer}>
        <Pdf
          trustAllCerts={false}
          ref={pdfRef}
          source={source}
          style={style.pdfRoot}
        />
      </View>
    </SafeAreaView>
  );
}

PDFViewer.defaultProps = {
  colorScheme: 'light',
};
PDFViewer.propTypes = {
  uri: PropTypes.string.isRequired,
  prefixTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
};

export default PDFViewer;
