import { Image, View } from 'react-native';
import React from 'react';
import Text from 'ca-component-generic/Text';
import Base15 from 'ca-component-container/Base15';
import DeviceInfo from 'react-native-device-info';
import { APP } from 'ca-util/constant';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardCustom, Divider } from 'ca-module-lifecover/component';
import { LifecoverLogo } from 'ca-config/Image';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import Padder from 'ca-component-container/Padder';
import { useNavigation } from '@react-navigation/native';
import { trans } from 'ca-util/trans';
import style from './style';
import locale from './locale';

function LifecoverStepConfirmation(props) {
  const { lang, width } = props;

  // HOOKS
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();

  // RENDERER
  const renderBackgroundHeaderImage = () => {
    const additionalHeight = 38;
    const imageSize = { width: 358, height: 245 };
    const adjustedHeight = (width * imageSize.height) / imageSize.width;
    const headerTop = -adjustedHeight + safeAreaInsets.top + APP.header.height;
    const backgroundStyle = {
      position: 'absolute',
      top: headerTop + additionalHeight,
    };
    const sizeStyle = {
      width: width,
      height: DeviceInfo.isTablet() ? 205 : adjustedHeight,
    };
    if (DeviceInfo.isTablet()) {
      return (
        <View style={style.header.container}>
          <View style={[style.header.image, sizeStyle]} />
        </View>
      );
    }
    return (
      <View style={backgroundStyle}>
        <View style={[style.header.image, sizeStyle]} />
      </View>
    );
  };
  const renderBottom = () => {
    return (
      <View style={style.confirmation.container}>
        <Padder>
          <View style={style.item.container}>
            <Text textStyle="semi" style={style.item.textGrayBody1}>
              {trans(locale, lang, 'jatuhTempo')}
            </Text>
            <Text textStyle="semi" style={style.item.textGreenH6}>
              21 Okt 2023
            </Text>
          </View>
          <Text
            textStyle="regular"
            align="right"
            style={[style.item.textGrayBody1, style.mt5]}>
            {trans(locale, lang, 'pembayaranBerkala')}
          </Text>

          <Button disabled style={style.mt20}>
            {trans(locale, lang, 'pilihMetodePembayaran')}
          </Button>
        </Padder>
      </View>
    );
  };

  return (
    <Base15
      title={trans(locale, lang, 'title')}
      isScroll
      animated
      onBackPress={() => navigation.goBack()}
      renderBottom={renderBottom()}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <View>
        <CardCustom>
          <CardCustom.Header isGradient style={style.cardSummary.header}>
            <View style={style.cardSummary.headerContentContainer}>
              <Image source={LifecoverLogo} style={style.cardSummary.logo} />

              <View style={style.cardSummary.headerTextContainer}>
                <Text
                  textStyle="bold"
                  color={Color.main.light.white}
                  style={style.mr4}>
                  Rp99.000,-
                </Text>
                <Text textStyle="medium" color={Color.main.light.white}>
                  /{trans(locale, lang, 'bulan')}
                </Text>
              </View>
            </View>
          </CardCustom.Header>
          <CardCustom.Body style={style.cardSummary.body}>
            <View style={[style.item.container, style.mb10]}>
              <Text textStyle="regular" style={style.item.textGray}>
                {trans(locale, lang, 'durasiProteksi')}
                <Text textStyle="regular" style={style.item.textImportant}>
                  *
                </Text>
              </Text>
              <Text textStyle="semi" style={style.item.textGray}>
                1 Tahun
              </Text>
            </View>
            <View style={style.item.container}>
              <Text textStyle="regular" style={style.item.textGray}>
                {trans(locale, lang, 'jatuhTempo')}
              </Text>
              <Text textStyle="semi" style={style.item.textGray}>
                21 Okt 2023
              </Text>
            </View>
          </CardCustom.Body>
        </CardCustom>

        <Divider height={10} marginVertical={32} />

        <CardCustom>
          <CardCustom.Body style={style.cardSummary.body}>
            <Text textStyle="semi" style={style.item.textGrayBody2}>
              John Doe
            </Text>
            <Divider height={1} />
            <View style={[style.item.container, style.mb5]}>
              <Text textStyle="regular" style={style.item.textGray}>
                {trans(locale, lang, 'nik')}
              </Text>
              <Text textStyle="semi" style={style.item.textGray}>
                1871052113240008
              </Text>
            </View>
            <View style={style.item.container}>
              <Text textStyle="regular" style={style.item.textGray}>
                {trans(locale, lang, 'tanggalLahir')}
              </Text>
              <Text textStyle="semi" style={style.item.textGray}>
                14 Feb 1990
              </Text>
            </View>
            <Divider height={1} />
            <Button outline>+ {trans(locale, lang, 'penerimaManfaat')}</Button>
          </CardCustom.Body>
        </CardCustom>

        <Divider height={10} marginVertical={32} />

        <Padder>
          <View style={[style.item.container, style.mb5]}>
            <Text textStyle="semi" style={style.item.textDarkBody2}>
              {trans(locale, lang, 'totalPembayaran')}
            </Text>
            <Text textStyle="semi" style={style.item.textGreenBody2}>
              Rp99.000
            </Text>
          </View>
          <View style={[style.item.container, style.mb5]}>
            <Text textStyle="regular" style={style.item.textGray}>
              {trans(locale, lang, 'penerimaManfaat')}
            </Text>
            <Text textStyle="regular" style={style.item.textGray}>
              Rp99.000
            </Text>
          </View>
          <View style={style.item.container}>
            <Text textStyle="regular" style={style.item.textGray}>
              {trans(locale, lang, 'biayaLayanan')}
            </Text>
            <Text textStyle="regular" style={style.item.textGray}>
              Rp0
            </Text>
          </View>
        </Padder>
      </View>
    </Base15>
  );
}
LifecoverStepConfirmation.defaultProps = {
  lang: 'id',
  width: Size.screen.width,
};
LifecoverStepConfirmation.propTypes = {
  lang: PropTypes.string,
  width: PropTypes.number,
};

export default LifecoverStepConfirmation;
