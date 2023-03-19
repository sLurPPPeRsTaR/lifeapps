import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity, FlatList } from 'react-native';
import { Text } from 'ca-component-generic/index';
import { Base15, Padder } from 'ca-component-container/index';
import { NAVIGATION } from 'ca-util/constant';
import { Color, Size } from 'ca-config/index';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundGradientSquare } from 'ca-config/Svg';
import {
  LifeCoverProductIcon,
  LifeSaverProductIcon,
  LPScrollA1,
} from 'ca-config/Image';
import style from './style';

function useSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef((viewableItems) => {
    const { index } = viewableItems?.changed[0];
    setActiveIndex(index);
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  const items = [1, 2, 3, 4, 5].map((e) => ({
    id: e,
    imageUrl: LPScrollA1,
  }));
  return {
    activeIndex,
    setActiveIndex,
    onViewRef,
    viewConfigRef,
    items,
  };
}

function HomeListProduk(props) {
  const { navigation } = props;
  const swiper = useSwiper();
  const insets = useSafeAreaInsets();

  function renderBackgroundHeaderImage() {
    return (
      <View style={[style.base.headerContainer, { top: -230 + insets.top }]}>
        <BackgroundGradientSquare width={Size.screen.width} height={440} />
      </View>
    );
  }

  function renderListProduk() {
    const handleGoToLifeSaver = () => {
      navigation.navigate(NAVIGATION.LIFESAVER.LifesaverMain);
    };
    const handleGoToLifeCover = () => {
      navigation.navigate(NAVIGATION.LIFECOVER.LifecoverMain);
    };
    const listElement = [
      {
        id: 'lifesaver',
        icon: LifeSaverProductIcon,
        title: (
          <Text textStyle="bold">
            Life<Text textStyle="boldItalic">SAVER</Text>
          </Text>
        ),
        desc: (
          <>
            <Text
              size={12}
              color={Color.mediumGray.light.mediumGray}
              textStyle="regular">
              Proteksi kecelakaan olahraga
            </Text>
            <Text
              size={12}
              color={Color.mediumGray.light.mediumGray}
              textStyle="regular">
              Mulai dari{' '}
              <Text
                size={12}
                textStyle="bold"
                color={Color.buttonGradient.light.buttonGradient1}>
                Rp49.000
              </Text>
            </Text>
          </>
        ),
        action: {
          onPress: handleGoToLifeSaver,
          label: 'Dapatkan Life',
          italicLabel: 'SAVER',
        },
      },
      {
        id: 'lifecover',
        icon: LifeCoverProductIcon,
        title: (
          <Text textStyle="bold">
            Life<Text textStyle="boldItalic">COVER</Text>
          </Text>
        ),
        desc: (
          <>
            <Text
              size={12}
              color={Color.mediumGray.light.mediumGray}
              textStyle="regular">
              Proteksi kematian
            </Text>
            <Text
              size={12}
              color={Color.mediumGray.light.mediumGray}
              textStyle="regular">
              Mulai dari{' '}
              <Text
                size={12}
                textStyle="bold"
                color={Color.buttonGradient.light.buttonGradient1}>
                Rp39.000
              </Text>
            </Text>
          </>
        ),
        action: {
          onPress: handleGoToLifeCover,
          label: 'Dapatkan Life',
          italicLabel: 'COVER',
        },
      },
    ];
    return listElement.map((el) => (
      <Padder>
        <View key={el.id} style={style.listProduct.root}>
          <View style={style.listProduct.box}>
            {!!el.icon && (
              <View style={style.listProduct.iconContainer}>
                <Image
                  source={el.icon}
                  style={style.listProduct.icon}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={style.listProduct.titleDescContainer}>
              {el.title}
              {el.desc}
            </View>
          </View>
          <View style={style.listProduct.actionContainer}>
            <LinearGradient
              style={style.listProduct.actionButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                Color.buttonGradient.light.buttonGradient0,
                Color.buttonGradient.light.buttonGradient1,
              ]}>
              <TouchableOpacity activeOpacity={0.6} onPress={el.action.onPress}>
                <Text textStyle="bold" size={12} color={Color.main.light.white}>
                  {el.action.label}
                  <Text
                    textStyle="boldItalic"
                    size={12}
                    color={Color.main.light.white}>
                    {el.action.italicLabel}
                  </Text>
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Padder>
    ));
  }

  function renderSwiper() {
    const renderItemSwiper = ({ item }) => {
      return (
        <View style={style.swiper.itemContainer}>
          <Image
            resizeMode="cover"
            source={item.imageUrl}
            style={style.swiper.img}
          />
        </View>
      );
    };
    return (
      <View style={style.swiper.root}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces={false}
          data={swiper.items}
          onViewableItemsChanged={swiper.onViewRef.current}
          viewabilityConfig={swiper.viewConfigRef.current}
          keyExtractor={(item) => item?.id}
          renderItem={renderItemSwiper}
        />
        <View style={style.swiper.dotContainer}>
          {swiper.items.map((e, index) => (
            <View
              key={e.id}
              style={[
                style.swiper.dot,
                index === swiper.activeIndex && style.swiper.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    );
  }

  // function renderProductPilihan() {
  //   return (
  //     <Padder style={style.produkPilihan.root}>
  //       <Text size={14} textStyle="semi">
  //         Produk Pilihan
  //       </Text>
  //     </Padder>
  //   );
  // }

  return (
    <Base15
      animated
      isScroll
      isBackground
      title="LifeShop"
      // onBackPress={() => navigation.pop()}
      backgroundColor={Color.main.light.white}
      backgroundHeaderImage={renderBackgroundHeaderImage()}>
      <View style={style.base.root}>
        {renderListProduk()}
        <View style={style.base.divider} />
        {renderSwiper()}
        {/* <View style={style.base.divider} />
        {renderProductPilihan()} */}
      </View>
    </Base15>
  );
}

HomeListProduk.propTypes = {
  // lang: PropTypes.string.isRequired,
  // colorScheme: PropTypes.string.isRequired,
  // homeAction: PropTypes.string.isRequired,
  // setIsComingFromScreen: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

export default HomeListProduk;
