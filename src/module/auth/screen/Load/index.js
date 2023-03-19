import React, { useEffect, useCallback } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NAVIGATION } from 'ca-util/constant';
import { LoadingLifeId } from 'ca-config/Image';

const style = {
  flex: 1,
  alignSelf: 'center',
};

function Load(props) {
  const { navigation, deviceId, dimensions, isAlreadyLaunched } = props;

  useEffect(() => {
    setNavigation(deviceId, isAlreadyLaunched);
  }, [setNavigation, deviceId, isAlreadyLaunched]);

  const setNavigation = useCallback(
    (id, flag) => {
      if (id !== '' && !flag) {
        navigation.replace(NAVIGATION.AUTH.AuthLanding);
      }
      if (id !== '' && flag) {
        navigation.replace(NAVIGATION.TABMAIN.TabMain);
      }
    },
    [navigation]
  );
  return (
    <View style={style}>
      <Image
        source={LoadingLifeId}
        style={{ width: dimensions.width, height: dimensions.width }}
        resizeMode="contain"
      />
    </View>
  );
}

Load.defaultProps = {
  deviceId: '',
};

Load.propTypes = {
  deviceId: PropTypes.string,
  navigation: PropTypes.objectOf(Object).isRequired,
  dimensions: PropTypes.objectOf(Object).isRequired,
  isAlreadyLaunched: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  access_token: state.auth.token.access_token,
  deviceId: state.auth.userData.deviceId,
  dimensions: state.bootstrap.dimensions,
  isAlreadyLaunched: state.local.isAlreadyLaunched,
});

export default connect(mapStateToProps, null)(Load);
