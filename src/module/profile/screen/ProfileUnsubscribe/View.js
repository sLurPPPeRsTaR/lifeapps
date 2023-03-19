import { Image, View, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Padder from 'ca-component-container/Padder';
import {
  Accident,
  SportsAccident,
  Ambulance,
  Fisio,
  BannerCedera,
  BannerRawatInap,
  BannerCederaEn,
  BannerRawatInapEn,
} from 'ca-config/Image';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NAVIGATION } from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import Button from 'ca-component-generic/Button';
import { formatNumber } from 'ca-util/numbro';
import locale from './locale';
import style from './style';

function LifesaverUnSubs(props) {
  const {
    navigation,
    colorScheme,
    lang,
    route: { params },
  } = props;
  const product = [
    {
      key: 'LifeSAVER',
      icon: (
        <Image
          source={Accident}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      ),
      title: trans(locale, lang, 'Total Medical Limit Cashless'),
      subtitle: (
        <Text color={Color.primary.light.primary60}>
          {formatNumber(200000000, lang)}{' '}
          <Text color={Color.neutralLifeSaver[colorScheme].neutral40}>
            /{trans(locale, lang, 'kejadian')}
          </Text>
        </Text>
      ),
    },
    {
      key: 'LifeSAVER+',
      icon: (
        <Image
          source={Accident}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      ),
      title: trans(locale, lang, 'Total Medical Limit Cashless'),
      subtitle: (
        <Text color={Color.primary.light.primary60}>
          {formatNumber(400000000, lang)}{' '}
          <Text color={Color.neutralLifeSaver[colorScheme].neutral40}>
            /{trans(locale, lang, 'kejadian')}
          </Text>
        </Text>
      ),
    },
  ];
  const menuList = [
    {
      key: 'PerawatanOlahraga',
      icon: (
        <Image
          source={SportsAccident}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 44, height: 44 }}
          resizeMode="contain"
        />
      ),
      title: trans(locale, lang, 'medis'),
      subtitle: (
        <Text color={Color.primary.light.primary60}>
          {formatNumber(20000000, lang)}
        </Text>
      ),
    },
    {
      key: 'Fisioterapi',
      icon: (
        <Image
          source={Fisio}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 44, height: 44 }}
          resizeMode="contain"
        />
      ),
      title: trans(locale, lang, 'fisio'),
      subtitle: (
        <Text color={Color.primary.light.primary60}>
          {formatNumber(10000000, lang)}
        </Text>
      ),
    },
    {
      key: 'Transportasi',
      icon: (
        <Image
          source={Ambulance}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      ),
      title: trans(locale, lang, 'transportasi'),
      subtitle: (
        <Text color={Color.primary.light.primary60}>
          {trans(locale, lang, 'evakuasi')}
        </Text>
      ),
    },
  ];

  function renderTop() {
    return (
      <View>
        <Text
          style={style.image.text}
          align="left"
          textStyle="bold"
          size={Size.text.body1.size}>
          {trans(locale, lang, 'yakinMembatalkan')}
        </Text>
        <Text
          style={style.image.text}
          align="left"
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          size={Size.text.body2.size}>
          {trans(locale, lang, 'denganBerhenti')}
        </Text>
      </View>
    );
  }

  function renderMenuCard(menu) {
    return (
      <TouchableNativeFeedback key={menu.key}>
        <View style={style.menu.card.container}>
          <View style={style.menu.card.card}>
            <View style={style.menu.card.leftIcon}>{menu.icon}</View>
            <View style={style.menu.card.content.container}>
              <View style={style.flex1}>
                <Text
                  textStyle="semi"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.neutralLifeSaver[colorScheme].neutral40}>
                  {trans(locale, lang, menu.title)}
                </Text>
                <Text
                  textStyle="medium"
                  size={Size.text.body2.size}
                  line={21}
                  letterSpacing={0.5}
                  color={Color.blackProfile.light.blackProfile40}>
                  {trans(locale, lang, menu.subtitle)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  function renderBenefitContainer() {
    return (
      <Shadow borderRadius={30} style={style.menu.shadow}>
        <Padder>
          {product.map((menu) => {
            if (menu.key === params?.planName) {
              return renderMenuCard(menu);
            }
            return null;
          })}
          {menuList.map((menu) => {
            return renderMenuCard(menu);
          })}
        </Padder>
      </Shadow>
    );
  }

  function renderBanner() {
    if (lang === 'en') {
      return (
        <View style={style.banner.container}>
          <Text
            style={style.image.text}
            align="left"
            textStyle="bold"
            size={Size.text.body1.size}>
            {trans(locale, lang, 'taukah')}
          </Text>
          <Image style={style.banner.image} source={BannerCederaEn} />
          <Image style={style.banner.image} source={BannerRawatInapEn} />
        </View>
      );
    }
    return (
      <View style={style.banner.container}>
        <Text
          style={style.image.text}
          align="left"
          textStyle="bold"
          size={Size.text.body1.size}>
          {trans(locale, lang, 'Tahukah kamu?')}
        </Text>
        <Image style={style.banner.image} source={BannerCedera} />
        <Image style={style.banner.image} source={BannerRawatInap} />
      </View>
    );
  }

  function renderBottom() {
    return (
      <View>
        <View style={style.bottom.tetapBatalkan}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(NAVIGATION.SUBS.SubsUnSubscribe, {
                policyNo: params?.policyNo,
                planName: params?.planName,
              });
            }}
            style={style.mt10}>
            <Text
              textStyle="semi"
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              style={style.underline}>
              {trans(locale, lang, 'tetapBatalkan')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <Button
          type="linear-gradient"
          onPress={() => navigation.goBack()}
          rounded="lg">
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'kembali')}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <Base
      statusBarColor={Color.whiteLifesaverBg[colorScheme].color}
      title={trans(locale, lang, 'batalkan')}
      headerStyle={{
        backgroundColor: Color.whiteLifesaverBg[colorScheme].color,
      }}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      isPaddingBottom={false}
      onBackPress={() => {
        navigation.goBack();
      }}>
      <Padder style={style.main.padder}>
        <View style={style.main.container}>
          {renderTop()}
          {renderBenefitContainer()}
          {renderBanner()}
          {renderBottom()}
        </View>
      </Padder>
    </Base>
  );
}

LifesaverUnSubs.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  route: PropTypes.objectOf(Object).isRequired,
  getSubscriptionDetail: PropTypes.func.isRequired,
};

export default LifesaverUnSubs;
