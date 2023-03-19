import React, { forwardRef, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Pdf from 'react-native-pdf';
import {
  CloudComputing1,
  NextRoundButton,
  PrevRoundButton,
} from 'ca-config/Svg';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import locale from './locale';
import style from './style';

function pdfViewer(props, ref) {
  const {
    singlePage,
    enablePaging,
    source,
    page,
    onLoadComplete,
    onPageChanged,
    onError,
    onPressLink,
    style,
  } = props;
  return (
    <Pdf
      ref={ref}
      singlePage={singlePage}
      enablePaging={enablePaging}
      source={source}
      page={page}
      onLoadComplete={onLoadComplete}
      onPageChanged={onPageChanged}
      onError={onError}
      onPressLink={onPressLink}
      trustAllCerts={false}
      style={style}
    />
  );
}

const PdfViewer = forwardRef(pdfViewer);

function HomePengalihanPolis(props) {
  const { navigation, lang, colorScheme, dimensions } = props;

  const pdfRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const source = Size.isAndroid
    ? { uri: 'bundle-assets://pdf/pengalihan_polis.pdf' }
    : { uri: 'bundle-assets://pengalihan_polis.pdf' };

  const onPrevPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    pdfRef.current.setPage(prevPage);
    setCurrentPage(prevPage);
  };

  const onNextPage = () => {
    const nextPage =
      currentPage + 1 > totalPages ? totalPages : currentPage + 1;
    pdfRef.current.setPage(nextPage);
    setCurrentPage(nextPage);
  };

  function renderButtonContainer() {
    // eslint-disable-next-line no-nested-ternary
    return currentPage === totalPages ? (
      <View style={[style.button.container, { width: dimensions.width }]}>
        <TouchableOpacity
          onPress={onPrevPage}
          style={[style.button.button, style.button.prev]}>
          <PrevRoundButton />
        </TouchableOpacity>
        <View style={style.button.page}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.primary.light.primary90}>
            {`Halaman ${currentPage}/${totalPages}`}
          </Text>
        </View>
        <View />
      </View>
    ) : currentPage === 1 ? (
      <View style={[style.button.container, { width: dimensions.width }]}>
        <View />
        <View style={style.button.page}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.primary.light.primary90}>
            {`Halaman ${currentPage}/${totalPages}`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onNextPage}
          style={[style.button.button, style.button.next]}>
          <NextRoundButton />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={[style.button.container, { width: dimensions.width }]}>
        <TouchableOpacity
          onPress={onPrevPage}
          style={[style.button.button, style.button.prev]}>
          <PrevRoundButton />
        </TouchableOpacity>
        <View style={style.button.page}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.primary.light.primary90}>
            {`Halaman ${currentPage}/${totalPages}`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onNextPage}
          style={[style.button.button, style.button.next]}>
          <NextRoundButton />
        </TouchableOpacity>
      </View>
    );
  }

  function renderRightHeaderContent() {
    return (
      <View style={style.header.rightContent}>
        <TouchableOpacity onPress={() => {}}>
          <CloudComputing1 />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      renderBottom={renderButtonContainer()}
      // rightHeaderContent={renderRightHeaderContent()}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'infoPengalihan')}>
      <View style={style.container}>
        <PdfViewer
          ref={pdfRef}
          // singlePage
          enablePaging
          source={source}
          onError={(error) => {
            console.log(error);
          }}
          style={[
            style.pdf,
            { width: dimensions.width, height: dimensions.height },
          ]}
        />
      </View>
    </Base>
  );
}

export default HomePengalihanPolis;

HomePengalihanPolis.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
};
