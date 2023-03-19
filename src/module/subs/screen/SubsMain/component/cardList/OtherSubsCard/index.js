import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import {
  LifeSAVERActive,
  LifeSAVERLapse,
  LifeSAVERplusActive,
  LifeSAVERplusLapse,
  LifeSaverPOS,
  LifeSAVERPOSlapse,
  LogoLifesaverPos,
} from 'ca-config/Image';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import { ArrowDownRed, ArrowUpRed } from 'ca-config/Svg';
import { codeLifesaver, POLICY_STATUS } from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import style from './style';
import locale from './locale';

function OtherSubsCard(props) {
  const { colorScheme, lang, item } = props;

  const [cardOpen, setCardOpen] = useState(false);
  const lifesaverLogo = {
    [POLICY_STATUS.active]: {
      [codeLifesaver.lifesaver.planName]: (
        <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
      ),
      [codeLifesaver.lifesaverplus.planName]: (
        <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
      ),
      [codeLifesaver.lifesaverpos.planName]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
      [codeLifesaver.lifesaverpos.planName2]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
    },
    [POLICY_STATUS.lapse]: {
      [codeLifesaver.lifesaver.planName]: (
        <Image style={style.logoSize.LS02} source={LifeSAVERLapse} />
      ),
      [codeLifesaver.lifesaverplus.planName]: (
        <Image style={style.logoSize.LS03} source={LifeSAVERplusLapse} />
      ),
      [codeLifesaver.lifesaverpos.planName]: (
        <Image style={style.logoSize.LS01} source={LifeSAVERPOSlapse} />
      ),
      [codeLifesaver.lifesaverpos.planName2]: (
        <Image style={style.logoSize.LS01} source={LifeSAVERPOSlapse} />
      ),
    },
    [POLICY_STATUS.terminate]: {
      [codeLifesaver.lifesaver.planName]: (
        <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
      ),
      [codeLifesaver.lifesaverplus.planName]: (
        <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
      ),
      [codeLifesaver.lifesaverpos.planName]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
      [codeLifesaver.lifesaverpos.planName2]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
    },
    [POLICY_STATUS.gracePeriod]: {
      [codeLifesaver.lifesaver.planName]: (
        <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
      ),
      [codeLifesaver.lifesaverplus.planName]: (
        <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
      ),
      [codeLifesaver.lifesaverpos.planName]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
      [codeLifesaver.lifesaverpos.planName2]: (
        <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
      ),
    },
  };

  return (
    <Shadow style={style.wrapper} borderRadius={16}>
      <View
        style={
          item.status === 'ACTIVE' ? style.container : style.containerInactive
        }>
        <View style={style.itemRow}>
          <View style={style.imageContainer}>
            <Text
              style={style.mr4}
              textStyle="medium"
              size={Size.text.caption1.size}>
              {item?.name}
            </Text>
            {lifesaverLogo[item?.status]?.[item?.planName]}
          </View>
          <Text
            textStyle="semi"
            size={Size.text.caption1.size}
            color={
              item.status === 'ACTIVE'
                ? Color.greenActive[colorScheme].color
                : Color.primary[colorScheme].primary90
            }>
            {item?.status}
          </Text>
        </View>
        <View style={style.itemRow}>
          <Text
            textStyle="medium"
            color={Color.neutralLifeSaver[colorScheme].neutral60}
            size={Size.text.caption1.size}>
            {trans(locale, lang, 'dueDate')}
          </Text>
          <Text textStyle="semi" size={Size.text.caption1.size}>
            {item?.dueDate}
          </Text>
        </View>
        {cardOpen && (
          <View style={style.itemCol}>
            <View style={style.itemRow}>
              <Text
                textStyle="medium"
                color={Color.neutralLifeSaver[colorScheme].neutral60}
                size={Size.text.caption1.size}>
                {trans(locale, lang, 'protectionDuration')}
              </Text>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {item?.protectionDuration}
              </Text>
            </View>
            <View style={style.itemRow}>
              <Text
                textStyle="medium"
                color={Color.neutralLifeSaver[colorScheme].neutral60}
                size={Size.text.caption1.size}>
                {trans(locale, lang, 'phoneNo')}
              </Text>
              <Text textStyle="semi" size={Size.text.caption1.size}>
                {item?.phoneNo}
              </Text>
            </View>
            <View style={style.itemSpecial}>
              <Text
                textStyle="bold"
                color={Color.primary[colorScheme].primary90}
                size={Size.text.body2.size}>
                {trans(locale, lang, 'SeeDetail')}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            setCardOpen(!cardOpen);
          }}>
          {cardOpen ? <ArrowUpRed /> : <ArrowDownRed />}
        </TouchableOpacity>
      </View>
    </Shadow>
  );
}

export default OtherSubsCard;

OtherSubsCard.defaultProps = {
  colorScheme: 'light',
};

OtherSubsCard.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string,
  item: PropTypes.objectOf(Object).isRequired,
};
