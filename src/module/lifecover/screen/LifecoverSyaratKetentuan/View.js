import { PDFViewer } from 'ca-module-lifecover/component';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import React from 'react';
import { PRODUCT } from 'ca-util/constant';
import locale from '../LifecoverMain/locale';

function LifecoverSyaratKetentuan({ lang }) {
  return (
    <PDFViewer
      title={trans(locale, lang, 'syaratDanKetentuan')}
      prefixTitle={PRODUCT.LIFECOVER.PDF_PREFIX_TITLE}
      uri={PRODUCT.LIFECOVER.PDF_SYARAT_KETENTUAN_URI}
    />
  );
}
LifecoverSyaratKetentuan.defaultProps = {
  lang: 'id',
};
LifecoverSyaratKetentuan.propTypes = {
  lang: PropTypes.string,
};

export default LifecoverSyaratKetentuan;
