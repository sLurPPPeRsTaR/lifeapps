import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import { WebView } from 'react-native-webview';
import CheckBox from '@react-native-community/checkbox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { PRIVACY_POLICY_URL } from 'ca-util/constant';
import style from './style';
import locale from './locale';

function RegisterTerms(props) {
  const {
    navigation,
    lang,
    route: { params },
  } = props;

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  function renderFooterContainer() {
    return (
      <Padder>
        <TouchableWithoutFeedback
          onPressIn={() => {
            setToggleCheckBox(!toggleCheckBox);
          }}>
          <View style={style.renderFooter.container}>
            <View style={style.renderFooter.contentWrapper}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                boxType="square"
                animationDuration={0.2}
                lineWidth={2}
                tintColors={{
                  true: Color.red.dark.red90,
                  false: Color.neutral.light.neutral20,
                }}
                style={style.renderFooter.checkbox}
                onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
              />

              <View style={style.renderFooter.textWrapper}>
                <Text
                  color={Color.mediumGray.light.mediumGray}
                  size={Size.text.body2.size}
                  textStyle="semi"
                  line={23.8}>
                  {trans(locale, lang, 'sayaTelahMenyetujui')}{' '}
                  <Text
                    color={Color.red.dark.red90}
                    size={Size.text.body2.size}
                    textStyle="semi"
                    line={23.8}>
                    {trans(locale, lang, 'syaratDanKetentuan2')}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Padder>
    );
  }

  function renderButton() {
    return (
      <Padder style={style.pB48}>
        <Button
          disabled={!toggleCheckBox}
          onPress={() => {
            params.returnResult(true);
            navigation.pop();
          }}>
          {trans(locale, lang, 'sayaSetuju')}
        </Button>
      </Padder>
    );
  }

  function renderLoading() {
    return (
      <View style={style.loading}>
        <ActivityIndicator color={Color.primary.light.primary90} size="large" />
      </View>
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
      isPaddingBottom={false}
      renderBottom={renderButton()}
      title={trans(locale, lang, 'syaratDanKetentuan1')}
      onBackPress={() => navigation.pop()}>
      {renderWebView()}
      {renderFooterContainer()}
    </Base>
  );
}

export default RegisterTerms;

RegisterTerms.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
};
