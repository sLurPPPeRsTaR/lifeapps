import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Close } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import LinearGradient from 'react-native-linear-gradient';
import locale from '../../locale';
import style from '../../style';
import Color from 'ca-config/Color';

function DialogMedicalProtection({
  lang,
  isVisible,
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
              {trans(locale, lang, 'InfoProteksiMedis')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

  function textRed(text) {
    return (
      <Text
        textStyle="semi"
        line={30}
        color={Color.primary.light.primary60}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }
  function textItalic(text) {
    return (
      <Text
        textStyle="semi"
        fontStyle="italic"
        line={30}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <ScrollView style={style.modal.height}>
        <LinearGradient colors={['#FFFF', '#E9E9E9']} style={[style.p16]}>
          <View style={style.modal.dialogMedicalProtection.container}>
            <Text textStyle="semi" line={30} size={Size.text.body2.size}>
              {trans(locale, lang, 'manfaatUtama')}
            </Text>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt4]} size={Size.text.body1.size}>
                •
              </Text>
              <Text textStyle="semi" line={30} size={Size.text.body2.size}>
                {trans(locale, lang, 'proteksiMedisAkibatKecelakaan')}
              </Text>
            </View>
            <Text textStyle="medium" line={22} size={Size.text.body2.size}>
              {trans(locale, lang, 'sampaiDengan')}
            </Text>
          </View>

          <View style={style.modal.dialogMedicalProtection.container}>
            <Text textStyle="semi" line={30} size={Size.text.body2.size}>
              {trans(locale, lang, 'manfaatPilihan')}
            </Text>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt4]} size={Size.text.body1.size}>
                •
              </Text>
              <Text textStyle="semi" line={30} size={Size.text.body2.size}>
                {trans(locale, lang, 'proteksiMedisCedera')}
              </Text>
            </View>
            <Text textStyle="medium" line={22} size={Size.text.body2.size}>
              {trans(locale, lang, 'sebesar')}
            </Text>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt4]} size={Size.text.body1.size}>
                •
              </Text>
              <Text textStyle="semi" line={30} size={Size.text.body2.size}>
                {trans(locale, lang, 'fisioterapi')}
              </Text>
            </View>
            <Text textStyle="medium" line={22} size={Size.text.body2.size}>
              {trans(locale, lang, 'fisioterapiSebesar')}
            </Text>
          </View>

          <View style={[style.mv30]}>
            <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
              {trans(locale, lang, 'berlakuInnerLimit')}
            </Text>
            <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
              {trans(locale, lang, 'selamaPerioderPromosi2')}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </BottomSheet>
  );
}

export default DialogMedicalProtection;

DialogMedicalProtection.defaultProps = {
  isVisible: false,
};

DialogMedicalProtection.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClosePress: PropTypes.func.isRequired,
  // navigation: PropTypes.objectOf(Object).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
