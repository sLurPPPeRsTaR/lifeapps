import React, { useEffect } from 'react';
import { BackHandler, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import { WebView } from 'react-native-webview';
import { PRIVACY_POLICY_URL } from 'ca-util/constant';
import moment from 'moment';
import style from './style';
import locale from './locale';

function RegisterTerms(props) {
  const { navigation, lang, registerDate } = props;
  moment.locale(lang);

  useEffect(() => {
    const goTo = () => {
      navigation.goBack();

      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation]);

  function renderLoading() {
    return (
      <View style={style.loading}>
        <ActivityIndicator color={Color.primary.light.primary90} size="large" />
      </View>
    );
  }

  function renderHeader() {
    return (
      <Padder style={style.mt16}>
        <View>
          <Text textStyle="bold" size={Size.text.body2.size}>
            {trans(locale, lang, 'selamatDatang')}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            style={[style.mt16]}
            line={21}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}>
            {trans(locale, lang, 'terdaftar')}
            <Text
              textStyle="bold"
              size={Size.text.body2.size}
              style={[style.mt16]}
              line={21}
              letterSpacing={0.5}
              color={Color.mediumGray.light.mediumGray}>
              {moment(registerDate).format('DD MMMM YYYY, HH.mm')}
              {trans(locale, lang, 'wib')}
            </Text>
          </Text>
        </View>
      </Padder>
    );
  }

  function renderWebView() {
    return (
      <Padder style={style.renderWebView.container}>
        <WebView
          startInLoadingState
          style={style.mR10}
          source={{
            uri: PRIVACY_POLICY_URL,
          }}
          renderLoading={() => renderLoading()}
        />
      </Padder>
    );
  }

  return (
    <Base
      bordered
      isPaddingBottom={false}
      title={trans(locale, lang, 'syaratDanKetentuan1')}
      onBackPress={() => navigation.pop(1)}>
      {renderHeader()}
      {renderWebView()}
    </Base>
  );
}

export default RegisterTerms;

RegisterTerms.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  registerDate: PropTypes.string.isRequired,
};
