import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
// import locale from './locale';
// import style from './style';

function QrCode(props) {
  const { lang, value, getRef } = props;
  moment.locale(lang);
  return (
    <QRCode
      value={value}
      size={180}
      color="black"
      backgroundColor="white"
      getRef={getRef}
    />
  );
}

export default memo(QrCode);

QrCode.defaultProps = {};
QrCode.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  getRef: PropTypes.func.isRequired,
};
