import { PDFViewer } from 'ca-module-lifecover/component';
import React from 'react';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import { PRODUCT } from 'ca-util/constant';
import locale from '../LifecoverMain/locale';

function LifecoverRiplay({ lang }) {
  return (
    <PDFViewer
      title={trans(locale, lang, 'riplay')}
      prefixTitle={PRODUCT.LIFECOVER.PDF_PREFIX_TITLE}
      uri={PRODUCT.LIFECOVER.PDF_SYARAT_KETENTUAN_URI}
    />
  );
}

LifecoverRiplay.defaultProps = {
  lang: 'id',
};
LifecoverRiplay.propTypes = {
  lang: PropTypes.string,
};

export default LifecoverRiplay;
