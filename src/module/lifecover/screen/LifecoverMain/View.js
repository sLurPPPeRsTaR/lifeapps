import React, { useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';
import {
  LifecoverMainBottom,
  LifecoverMainTop,
  ModalAgreement,
} from './Component';
import style from './style';

function LifecoverMain(props) {
  const { lang, colorScheme } = props;

  // HOOKS
  const navigation = useNavigation();

  // STATE
  const [showConfirm, setShowConfirm] = useState(false);

  // HANDLER
  const handlePressRiplay = () => {
    setShowConfirm(false);
    navigation.navigate(NAVIGATION.LIFECOVER.LifecoverRiplay);
  };
  const handlePressTnc = () => {
    setShowConfirm(false);
    navigation.navigate(NAVIGATION.LIFECOVER.LifecoverSyaratKetentuan);
  };
  const handleSubs = () => {};

  // RENDERER
  const renderModalAgreement = () => {
    return (
      <ModalAgreement
        isVisible={showConfirm}
        lang={lang}
        colorScheme={colorScheme}
        onClosePress={() => setShowConfirm(false)}
        onPressRiplay={handlePressRiplay}
        onPressTnc={handlePressTnc}
        onSubs={handleSubs}
      />
    );
  };

  return (
    <View style={style.root}>
      <ScrollView style={style.rootScrollView}>
        <LifecoverMainTop {...props} />
        <LifecoverMainBottom
          onPressSubs={() => setShowConfirm(true)}
          {...props}
        />
      </ScrollView>

      {renderModalAgreement()}
    </View>
  );
}
LifecoverMain.defaultProps = {
  lang: 'id',
  colorScheme: 'light',
};
LifecoverMain.propTypes = {
  lang: PropTypes.string,
  colorScheme: PropTypes.string,
};

export default LifecoverMain;
