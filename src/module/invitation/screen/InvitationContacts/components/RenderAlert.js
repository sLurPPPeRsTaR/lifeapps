import React from 'react';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import locale from '../locale';
import style from '../style';

function RenderAlert(props) {
  const { lang, addLinkError, statusRegisterError } = props;
  if (addLinkError) {
    <AlertDialogue
      title={trans(locale, lang, 'gagalMengundang')}
      type="error"
      leftIcon
      style={style.alerBackground}
    />;
  }
  if (statusRegisterError) {
    return (
      <AlertDialogue
        title={trans(locale, lang, 'gagalMendapatkanNomor')}
        type="error"
        leftIcon
        style={style.alerBackground}
      />
    );
  }
  return null;
}

export default RenderAlert;

RenderAlert.propTypes = {
  lang: PropTypes.string.isRequired,
  addLinkError: PropTypes.bool.isRequired,
  statusRegisterError: PropTypes.bool.isRequired,
};
