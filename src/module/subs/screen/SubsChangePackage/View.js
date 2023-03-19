import { Image, View, ImageBackground } from 'react-native';
import React from 'react';
import Base from 'ca-component-container/Base';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Padder from 'ca-component-container/Padder';
import {
  Rip,
  MedicalBag,
  LPSnorkelingIcon,
  LooperGroup2,
  LifeSaverLogo,
  LifeSaverLogoPlus,
  AmbulanceWithBG,
  PlasterWithBG,
  TongkatWithBG,
  GreyArrow,
} from 'ca-config/Image';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  COVERAGE_BENEFIT_LIMIT_INNER,
  COVERAGE_BENEFIT_LIMIT_MAIN,
  NAVIGATION,
} from 'ca-util/constant';
import Shadow from 'ca-component-container/Shadow';
import Button from 'ca-component-generic/Button';
import locale from './locale';
import style from './style';
import { formatNumber } from 'ca-util/numbro';

function LifesaverUnSubs(props) {
  const {
    navigation,
    colorScheme,
    lang,
    getProductsResponse,
    route: { params },
  } = props;

  const isDiving = (limitDiving) => {
    if (limitDiving > 0) {
      return true;
    }
    return false;
  };

  function renderTop() {
    return (
      <View>
        <Text
          style={style.mv10}
          align="center"
          textStyle="bold"
          size={Size.text.h5.size}>
          {trans(locale, lang, 'kamuYakin')}
        </Text>
        <Text
          style={style.mb30}
          align="center"
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          size={Size.text.body2.size}>
          {trans(locale, lang, 'manfaatBerubah')}
        </Text>
      </View>
    );
  }

  function renderBenefitBerubah() {
    return (
      <View style={style.menu.container}>
        <Image source={MedicalBag} style={style.menu.icon} />
        <Shadow style={style.menu.shadow}>
          <View style={style.menu.itemContainer}>
            <Text style={style.menu.text} align="center" textStyle="semi">
              {trans(locale, lang, 'totalMedicalLimit')}
            </Text>
            <View style={style.menu.benefitItem}>
              <View style={style.item.container}>
                <Image source={LifeSaverLogoPlus} style={style.item.logo} />
                <View style={style.item.backgroundFrom}>
                  <Text
                    style={style.item.text}
                    color={Color.primary[colorScheme].primary80}
                    align="center"
                    textStyle="bold"
                    size={Size.text.body1.size}>
                    {formatNumber(
                      getProductsResponse[params?.fromProduct]
                        ?.sumHealthCareLimit,
                      lang,
                      true
                    )}
                  </Text>
                </View>
              </View>
              <Image
                source={GreyArrow}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: 27, height: 23 }}
                resizeMode="contain"
              />
              <View style={style.item.container}>
                <Image
                  source={LifeSaverLogo}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ width: 95, height: 17 }}
                  resizeMode="contain"
                />
                <View style={style.item.backgroundTo}>
                  <Text
                    style={style.item.text}
                    color={Color.neutral[colorScheme].neutral40}
                    align="center"
                    textStyle="semi"
                    size={Size.text.body1.size}>
                    {formatNumber(
                      getProductsResponse[params?.toProduct]
                        ?.sumHealthCareLimit,
                      lang,
                      true
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
        <Image source={LPSnorkelingIcon} style={style.menu.icon} />
        <Shadow style={style.menu.shadow}>
          <View style={style.menu.itemContainer}>
            <Text style={style.menu.text} align="center" textStyle="semi">
              {trans(locale, lang, 'proteksiOlahragaAir')}
            </Text>
            <View style={style.menu.benefitItem}>
              <View style={style.item.container}>
                <Image source={LifeSaverLogoPlus} style={style.item.logo} />
                <View style={style.item.backgroundFrom}>
                  <Text
                    style={style.item.text}
                    color={Color.primary[colorScheme].primary80}
                    align="center"
                    textStyle="bold"
                    size={Size.text.body1.size}>
                    {isDiving(
                      getProductsResponse[params?.fromProduct]
                        ?.coverageBenefitLimitInnerObject[
                        COVERAGE_BENEFIT_LIMIT_INNER.DIVING
                      ]
                    )
                      ? trans(locale, lang, 'terproteksi')
                      : trans(locale, lang, 'tidak')}
                  </Text>
                </View>
              </View>
              <Image
                source={GreyArrow}
                style={{ width: 27, height: 23 }}
                resizeMode="contain"
              />
              <View style={style.item.container}>
                <Image
                  source={LifeSaverLogo}
                  style={{ width: 95, height: 17 }}
                  resizeMode="contain"
                />
                <View style={style.item.backgroundTo}>
                  <Text
                    style={style.item.text}
                    align="center"
                    color={Color.neutral[colorScheme].neutral40}
                    textStyle="semi"
                    size={Size.text.body1.size}>
                    {isDiving(
                      getProductsResponse[params?.toProduct]
                        ?.coverageBenefitLimitInnerObject[
                        COVERAGE_BENEFIT_LIMIT_INNER.DIVING
                      ]
                    )
                      ? trans(locale, lang, 'terproteksi')
                      : trans(locale, lang, 'tidak')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
        <Image source={Rip} style={style.menu.icon} />
        <Shadow style={style.menu.shadow}>
          <View style={style.menu.itemContainer}>
            <Text style={style.menu.text} align="center" textStyle="semi">
              {trans(locale, lang, 'meninggalDunia')}
            </Text>
            <View style={style.menu.benefitItem}>
              <View style={style.item.container}>
                <Image
                  source={LifeSaverLogoPlus}
                  style={{ width: 95, height: 17 }}
                  resizeMode="contain"
                />
                <View style={style.item.backgroundFrom}>
                  <Text
                    style={style.item.text}
                    color={Color.primary[colorScheme].primary80}
                    align="center"
                    textStyle="bold"
                    size={Size.text.body1.size}>
                    {formatNumber(
                      getProductsResponse[params?.fromProduct]
                        ?.coverageBenefitLimitMainObject?.[
                        COVERAGE_BENEFIT_LIMIT_MAIN.TOTAL_DISABILITY
                      ],
                      lang,
                      true
                    )}
                  </Text>
                </View>
              </View>
              <Image
                source={GreyArrow}
                style={{ width: 27, height: 23 }}
                resizeMode="contain"
              />
              <View style={style.item.container}>
                <Image
                  source={LifeSaverLogo}
                  style={{ width: 95, height: 17 }}
                  resizeMode="contain"
                />
                <View style={style.item.backgroundTo}>
                  <Text
                    style={style.item.text}
                    align="center"
                    color={Color.neutral[colorScheme].neutral40}
                    textStyle="semi"
                    size={Size.text.body1.size}>
                    {formatNumber(
                      getProductsResponse[params?.toProduct]
                        ?.coverageBenefitLimitMainObject?.[
                        COVERAGE_BENEFIT_LIMIT_MAIN.TOTAL_DISABILITY
                      ],
                      lang,
                      true
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderBenefitTetap() {
    return (
      <View style={style.menu.container}>
        <Text
          style={style.mb10}
          align="center"
          textStyle="medium"
          color={Color.neutralLifeSaver[colorScheme].neutral40}
          size={Size.text.body2.size}>
          {trans(locale, lang, 'manfaatTetap')}
        </Text>
        <Shadow style={style.menu.shadow2}>
          <View style={style.bottom.container2}>
            <Image source={LifeSaverLogoPlus} style={style.bottom.logoImage} />
            <Image source={LifeSaverLogo} style={style.bottom.logoImage} />
          </View>
        </Shadow>
        <Shadow borderRadius={16} style={style.p3}>
          <View style={style.bottom.container3}>
            <View style={style.bottom.container4}>
              <Image source={AmbulanceWithBG} style={style.bottom.icon} />
              <Text
                align="center"
                textStyle="medium"
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'transportasiMedis')}
              </Text>
              <Text
                color={Color.primary[colorScheme].primary80}
                align="center"
                textStyle="semi">
                {trans(locale, lang, 'covered')}
              </Text>
            </View>

            <View style={style.bottom.container4}>
              <Image source={PlasterWithBG} style={style.bottom.icon} />
              <Text
                align="center"
                textStyle="medium"
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'perawatanMedis')}
              </Text>
              <Text
                color={Color.primary[colorScheme].primary80}
                align="center"
                textStyle="semi">
                {formatNumber(
                  getProductsResponse[params?.toProduct]
                    ?.coverageBenefitLimitMainObject?.[
                    COVERAGE_BENEFIT_LIMIT_MAIN.ACCIDENT_INJURY
                  ],
                  lang,
                  true
                )}
              </Text>
            </View>

            <View style={style.bottom.container4}>
              <Image source={TongkatWithBG} style={style.bottom.icon} />
              <Text
                align="center"
                textStyle="medium"
                size={Size.text.caption2.size}>
                {trans(locale, lang, 'fisioterapi')}
              </Text>
              <Text
                color={Color.primary[colorScheme].primary80}
                align="center"
                textStyle="semi">
                {formatNumber(
                  getProductsResponse[params?.toProduct]
                    ?.coverageBenefitLimitMainObject?.[
                    COVERAGE_BENEFIT_LIMIT_MAIN.PHYSIOTHERAPY
                  ],
                  lang,
                  true
                )}
              </Text>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderBottom() {
    return (
      <View>
        <View style={style.bottom.tetapBatalkan}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(NAVIGATION.LIFESAVER.LifesaverDowngrade, {
                ...params,
              });
            }}
            style={style.mt10}>
            <Text
              textStyle="semi"
              color={Color.neutralLifeSaver[colorScheme].neutral40}
              style={style.underline}>
              {trans(locale, lang, 'ubahPaket')}
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
      title={trans(locale, lang, 'ubahPaket')}
      headerStyle={{
        backgroundColor: Color.whiteLifesaverBg[colorScheme].color,
      }}
      backgroundColor={Color.whiteLifesaverBg[colorScheme].color}
      isPaddingBottom={false}
      onBackPress={() => {
        navigation.goBack();
      }}>
      <Padder style={style.main.padder}>
        <ImageBackground
          source={LooperGroup2}
          resizeMode="cover"
          imageStyle={style.imgBGContainer}>
          <View style={style.main.container}>
            {renderTop()}
            {renderBenefitBerubah()}
            {renderBenefitTetap()}
            {renderBottom()}
          </View>
        </ImageBackground>
      </Padder>
    </Base>
  );
}

LifesaverUnSubs.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

export default LifesaverUnSubs;
