import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Text from 'ca-component-generic/Text';
import { ChevronDownLS } from 'ca-config/Svg';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import { ReferalInfoBg, UserShield, Speaker } from 'ca-config/Image';
import style from '../style';
import locale from '../locale';

function ReferalSteps({ lang, totalShare, totalRegister, totalSubByYou, totalSubByOther }) {
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    if (totalShare > 0 || totalRegister > 0 || totalSubByYou > 0 || totalSubByOther > 0) {
      setExpand(false);
    }
  }, [totalShare]);

  return (
    <View style={style.m16}>
      <TouchableWithoutFeedback onPress={() => setExpand(!expand)}>
        <View style={style.referalSteps.titleContiner}>
          <Text textStyle="semi">{trans(locale, lang, 'caraAjak')}</Text>
          <ChevronDownLS
            width={20}
            height={20}
            style={expand ? style.flipTrue : style.flipFalse}
          />
        </View>
      </TouchableWithoutFeedback>
      {expand && (
        <Shadow style={style.mt16} borderRadius={20}>
          <ImageBackground
            resizeMode="stretch"
            source={ReferalInfoBg}
            style={style.referalSteps.container}>
            <View style={style.referalSteps.listItemContainer}>
              <View style={style.w85}>
                <Image
                  style={[style.referalSteps.saveIcon, style.wh75]}
                  source={Speaker}
                />
              </View>
              <Text
                textStyle="semi"
                line={20}
                size={Size.text.caption1.size}
                color={Color.neutral.light.neutral40}
                style={style.referalSteps.listItemText}>
                {trans(locale, lang, 'ajakTemanKamuUntukDaftar')}
              </Text>
            </View>
            <View style={style.referalSteps.listItemContainer}>
              <View style={style.w85}>
                <Image
                  style={[
                    style.referalSteps.saveIcon,
                    style.referalSteps.image,
                  ]}
                  source={UserShield}
                />
              </View>
              <Text
                textStyle="semi"
                line={20}
                size={Size.text.caption1.size}
                color={Color.neutral.light.neutral40}
                style={style.referalSteps.listItemText}>
                {trans(locale, lang, 'pastikanTemanmuBerlangganan')}
              </Text>
            </View>
            <View style={style.referalSteps.listItemContainer}>
              <Text
                textStyle="semi"
                line={20}
                align="center"
                size={Size.text.caption1.size}
                color={Color.neutral.light.neutral40}
                style={style.referalSteps.listItemText}>
                {trans(locale, lang, 'terimakasihSudahTurut')}
              </Text>
            </View>
          </ImageBackground>
        </Shadow>
      )}
    </View>
  );
}

export default ReferalSteps;

ReferalSteps.propTypes = {
  lang: PropTypes.string.isRequired,
  totalShare: PropTypes.number.isRequired,
};
