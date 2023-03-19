import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Close, RedTick } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
// import Color from 'ca-config/Color';
// import { NAVIGATION } from 'ca-util/constant';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'ca-config/Color';
import locale from '../../locale';
import style from '../../style';

function DialogWaterSportList({
  lang,
  isVisible,
  // navigation,
  onClosePress,
  onRequestClose,
}) {
  const Header = useCallback(() => {
    return (
      <>
        <View style={style.modal.dialogHeader.container}>
          <TouchableWithoutFeedback onPress={onClosePress}>
            <View style={style.modal.dialogHeader.closeBtnContainer}>
              <Close width={30} height={30} />
            </View>
          </TouchableWithoutFeedback>
          <View style={style.fx1}>
            <Text
              textStyle="bold"
              line={33}
              size={Size.text.body2.size}
              align="center">
              {trans(locale, lang, 'daftarOlahragaAir')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

  const DATAS = [
    { id: 'Arung Jeram', en: 'Rafting Sport' },
    { id: 'Berenang', en: 'Swimming' },
    { id: 'Cliff Diving', en: 'Cliff Diving' },
    { id: 'Flyboarding', en: 'Flyboarding' },
    { id: 'Free Diving', en: 'Free Diving' },
    { id: 'Jetski', en: 'Jetski Sport' },
    { id: 'Kano', en: 'Canoe Sport' },
    { id: 'Kayak', en: 'Kayak Sport' },
    { id: 'Memancing', en: 'Fishing Sport' },
    { id: 'Parasailing', en: 'Parasailing' },
    { id: 'Polo Air', en: 'Water polo' },
    { id: 'Scuba Diving', en: 'Scuba Diving' },
    { id: 'Ski Air', en: 'Water ski' },
    { id: 'Snorkeling', en: 'Snorkeling' },
    { id: 'Speed Boat', en: 'Speed ​​boat' },
    { id: 'Surfing', en: 'Surf Sport' },
    { id: 'Wind Surfing', en: 'Wind Surf Sport' },
  ];

  const RenderItem = useCallback(
    ({ item }) => {
      return (
        <View style={style.modal.dialogWaterSport.renderItem.container}>
          <RedTick style={style.mr5} />
          <Text
            textStyle="semi"
            line={22}
            color={Color.neutral.light.neutral40}
            size={Size.text.body2.size}>
            {trans(locale, lang, item[lang])}
          </Text>
        </View>
      );
    },
    [lang]
  );

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <LinearGradient colors={['#FFFF', '#E9E9E9']} style={[style.p16]}>
        <View style={style.mb10}>
          <Text
            textStyle="semi"
            line={22}
            size={Size.text.body1.size}
            style={style.mb10}>
            {trans(locale, lang, 'daftarOlahRagaTerproteksi')}
            <Text textStyle="semi" line={22} size={Size.text.body1.size}>
              {trans(locale, lang, 'Life')}
            </Text>
            <Text
              textStyle="bold"
              fontStyle="italic"
              line={22}
              size={Size.text.body1.size}
              style={style.textBoldItalic}>
              {trans(locale, lang, 'SAVER+')}
            </Text>
          </Text>
          <FlatList
            data={DATAS}
            renderItem={(item) => <RenderItem {...item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </LinearGradient>
    </BottomSheet>
  );
}

export default DialogWaterSportList;

DialogWaterSportList.defaultProps = {
  isVisible: false,
};

DialogWaterSportList.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClosePress: PropTypes.func.isRequired,
  // navigation: PropTypes.objectOf(Object).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
