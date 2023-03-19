import {
  LifeCoverPlusSubsLogo,
  LifeCoverSubsLogo,
  LifeSAVERActive,
  LifeSAVERLapse,
  LifeSAVERplusActive,
  LifeSAVERplusLapse,
  LifeSaverPOS,
  LifeSAVERPOSlapse,
  MyLifeCoverSubsLogo,
} from 'ca-config/Image';
import { codeLifecover, codeLifesaver, POLICY_STATUS } from 'ca-util/constant';
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import style from './style';

function ProductLogo(props) {
  const { status, planName, exStyle } = props;
  const logo = {
    active: {
      [codeLifesaver.lifesaver.planName]: LifeSAVERActive,
      [codeLifesaver.lifesaverplus.planName]: LifeSAVERplusActive,
      [codeLifesaver.lifesaverpos.planName]: LifeSaverPOS,
      [codeLifesaver.lifesaverpos.planNameAlt]: LifeSaverPOS,
      [codeLifecover.lifecover.planName]: LifeCoverSubsLogo,
      [codeLifecover.lifecoverplus.planName]: LifeCoverPlusSubsLogo,
      [codeLifecover.mylifecover.planName]: MyLifeCoverSubsLogo,
    },
    nonActive: {
      [codeLifesaver.lifesaver.planName]: LifeSAVERLapse,
      [codeLifesaver.lifesaverplus.planName]: LifeSAVERplusLapse,
      [codeLifesaver.lifesaverpos.planName]: LifeSAVERPOSlapse,
      [codeLifesaver.lifesaverpos.planNameAlt]: LifeSAVERPOSlapse,
      [codeLifecover.lifecover.planName]: LifeCoverSubsLogo,
      [codeLifecover.lifecoverplus.planName]: LifeCoverPlusSubsLogo,
      [codeLifecover.mylifecover.planName]: MyLifeCoverSubsLogo,
    },
  };

  const styleLogo = {
    aspectRatio: 132 / 21,
    height: 21,
  };

  if (status === POLICY_STATUS.lapse || status === POLICY_STATUS.terminate) {
    return (
      <Image
        resizeMode="stretch"
        style={exStyle ? exStyle : styleLogo}
        source={logo.nonActive[planName]}
      />
    );
  }
  return (
    <Image
      resizeMode="stretch"
      style={exStyle ? exStyle : styleLogo}
      source={logo.active[planName]}
    />
  );
}

ProductLogo.defaultProps = {
  exStyle: undefined,
};

ProductLogo.propTypes = {
  status: PropTypes.string.isRequired,
  planName: PropTypes.string.isRequired,
  exStyle: PropTypes.objectOf(Object),
};

export default ProductLogo;
