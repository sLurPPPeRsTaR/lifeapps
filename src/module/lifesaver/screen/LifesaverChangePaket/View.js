import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import ModalHeader from 'ca-component-lifesaver/ModalHeader';
import PropTypes from 'prop-types';
import { trans } from 'ca-util/trans';
import { formatNumber } from 'ca-util/numbro';
import Shadow from 'ca-component-container/Shadow';
import LinearGradient from 'react-native-linear-gradient';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { lifeSAVERwhite, lifeSAVERPLUSwhite } from 'ca-config/Image';
import locale from './locale';
import style from './style';

function LifesaverChangePaket(props) {
  const {
    lang,
    navigation,
    colorScheme,
    getProducts,
    getProductsResponse,
    isVisible,
    onClose,
    currentPaket,
    onSubmit,
  } = props;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = [
    {
      name: 'LifeSAVER+',
      image: lifeSAVERPLUSwhite,
    },
    {
      name: 'LifeSAVER',
      image: lifeSAVERwhite,
    },
  ];

  function renderPackage() {
    return (
      <View style={style.pt16}>
        <View style={style.package.paketAnda}>
          <Text color={Color.main.light.white}>
            {trans(locale, lang, 'paketAndaSkarang')}
          </Text>
        </View>
        {products?.map((element) => (
          <Shadow animated style={style.container}>
            {currentPaket === element.name ? (
              <LinearGradient
                style={style.package.headerActive}
                colors={['#F25D63', '#ED1C24']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <View style={style.package.container}>
                  <Image
                    source={element.image}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 113, height: 21 }}
                    resizeMode="contain"
                  />
                  <Text textStyle="bold" color={Color.main.light.white}>
                    {formatNumber(
                      getProductsResponse[element?.name]?.subsPrice,
                      lang
                    )}{' '}
                    <Text textStyle="medium" color={Color.main.light.white}>
                      /{trans(locale, lang, 'bulan')}
                    </Text>
                  </Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={style.package.headerInactive}>
                <View style={style.package.container}>
                  <Image source={element.image} />
                  <Text textStyle="bold" color={Color.main.light.white}>
                    {formatNumber(
                      getProductsResponse[element?.name]?.subsPrice,
                      lang
                    )}{' '}
                    <Text textStyle="medium" color={Color.main.light.white}>
                      /{trans(locale, lang, 'bulan')}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
            <View style={style.package.desc}>
              <Text textStyle="medium" size={Size.text.caption1.size}>
                {trans(locale, lang, 'totalPengobatan')}
                <Text textStyle="semi">
                  {formatNumber(
                    getProductsResponse[element?.name]?.sumHealthCareLimit,
                    lang,
                    true
                  )}
                </Text>
                {trans(locale, lang, 'innerLimit')}
                <Text textStyle="semi">
                  {formatNumber(
                    getProductsResponse[element.name]?.sumHealthCareLimit,
                    lang,
                    true
                  )}
                </Text>
              </Text>
            </View>
          </Shadow>
        ))}
      </View>
    );
  }

  return (
    <BottomSheet
      swipeable={false}
      isVisible={isVisible}
      renderHeader={
        <ModalHeader
          isBorderBottom
          title={trans(locale, lang, 'pilihPaket')}
          onClose={() => {
            onClose();
          }}
        />
      }>
      {renderPackage()}
      <View style={style.mt24}>
        <Button onPress={onSubmit} rounded="lg" type="linear-gradient">
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'gantiPaket')}
          </Text>
        </Button>
      </View>
    </BottomSheet>
  );
}

LifesaverChangePaket.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  getProducts: PropTypes.func.isRequired,
  getProductsResponse: PropTypes.objectOf(Object).isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentPaket: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LifesaverChangePaket;
