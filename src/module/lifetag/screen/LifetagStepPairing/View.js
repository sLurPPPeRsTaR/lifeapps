import React from 'react';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import {
  LifetagLinkStep1,
  LifetagLinkStep2,
  LifetagLinkStep3,
} from 'ca-config/Image';
import Size from 'ca-config/Size';
import Button from 'ca-component-generic/Button';
import Base from 'ca-component-container/Base';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import { View, Image } from 'react-native';
import { NAVIGATION } from 'ca-util/constant';

import style from './style';
import locale from './locale';

function LifetagStepPairing(props) {
  const { navigation, lang } = props;

  const isStepLink = [
    {
      no: 1,
      step: trans(locale, lang, 'step1'),
      image: LifetagLinkStep1,
      style: style.step.image1,
    },
    {
      no: 2,
      step: trans(locale, lang, 'step2'),
      image: LifetagLinkStep2,
      style: style.step.image2,
    },
    {
      no: 3,
      step: trans(locale, lang, 'step3'),
      image: LifetagLinkStep3,
      style: style.step.image3,
    },
  ];

  function renderStepLinkLifeTag() {
    return (
      <View style={[style.mt24, style.mb64]}>
        <Padder>
          <View>
            <Text textStyle="semi" size={Size.text.body2.size} line={20}>
              {trans(locale, lang, 'judulLink')}
            </Text>
            <Text
              textStyle="regular"
              size={Size.text.body2.size}
              line={20}
              style={style.mt8}>
              {trans(locale, lang, 'keterangan')}
            </Text>
          </View>
        </Padder>
        <View>
          {isStepLink?.map((item) => (
            <View>
              <View style={style.step.containerImage}>
                <Image
                  source={item.image}
                  style={[style.mt40, item.style]}
                  resizeMode="contain"
                />
              </View>
              <Padder>
                <View style={style.step.containerTextStep}>
                  <Text
                    textStyle="regular"
                    size={Size.text.body2.size}
                    line={20}
                    style={style.mt8}>
                    {item.no}.
                  </Text>
                  <Text
                    textStyle="regular"
                    size={Size.text.body2.size}
                    line={20}
                    style={[style.mt8, style.ml8]}>
                    {trans(locale, lang, item.step)}
                  </Text>
                </View>
              </Padder>
            </View>
          ))}
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <Padder style={style.renderButton.button}>
        <Button
          onPress={() => {
            navigation.navigate(NAVIGATION.LIFETAG.LifetagDeviceList);
          }}>
          {trans(locale, lang, 'hubungkanLifetag')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      // renderBottom={renderButton()}
      isPaddingBottom={false}>
      {renderStepLinkLifeTag()}
    </Base>
  );
}

export default LifetagStepPairing;

LifetagStepPairing.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
};
