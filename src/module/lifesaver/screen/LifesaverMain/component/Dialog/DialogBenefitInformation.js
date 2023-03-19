import React, { useCallback } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Close, Warning } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import { NAVIGATION } from 'ca-util/constant';
import LinearGradient from 'react-native-linear-gradient';
import locale from '../../locale';
import style from '../../style';

function DialogBenefitInformation({
  lang,
  isVisible,
  navigation,
  onClosePress,
  onRequestClose,
}) {
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
  function textItalicBold(text) {
    return (
      <Text
        textStyle="semi"
        style={style.textBoldItalic}
        line={30}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }

  function textItalic(text) {
    return (
      <Text
        textStyle="semi"
        style={style.textItalic}
        line={30}
        size={Size.text.body2.size}>
        {text}
      </Text>
    );
  }

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
              {trans(locale, lang, 'infoManfaat')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <ScrollView style={style.modal.height}>
        <LinearGradient colors={['#FFFF', '#E9E9E9']} style={[style.p16]}>
          <View style={style.mb10}>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt5]}>1.</Text>
              <Text textStyle="medium" line={22} size={Size.text.body2.size}>
                {trans(locale, lang, 'dengan')}
                {textItalic('cashless')}
                {trans(locale, lang, 'klinikRekanan')}
              </Text>
            </View>
          </View>
          <View style={style.mb10}>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt5]}>2.</Text>
              <Text
                textStyle="medium"
                style={style.mt4}
                line={22}
                size={Size.text.body2.size}>
                {trans(locale, lang, 'dialogBenefitInformation')}
              </Text>
            </View>
          </View>
          <View style={style.mb10}>
            <View style={[style.flexRow, style.pr10]}>
              <Text style={[style.mr5, style.mt5]}>3.</Text>
              <Text
                textStyle="medium"
                style={style.mt4}
                line={22}
                size={Size.text.body2.size}>
                {trans(locale, lang, 'apabilaBiaya')}
              </Text>
            </View>
          </View>

          <View style={[style.mv10]}>
            <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
              <Text
                line={22}
                fontStyle="italic"
                size={Size.text.body2.size}
                color={Color.primary.light.primary60}>
                {trans(locale, lang, '*Inner limit :  ')}
              </Text>
              {trans(locale, lang, 'batasan')}
            </Text>
          </View>

          <View style={style.warningBox.container}>
            <Warning width={22} height={22} style={style.m10} />
            <Text
              textStyle="medium"
              line={18}
              size={Size.text.caption1.size}
              style={style.warningBox.text}>
              {trans(locale, lang, 'mekanisme')}
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate(NAVIGATION.LIFESAVER.LifesaverRiplay, {
                    personalURL: false,
                  });
                  onClosePress();
                }}>
                <Text
                  textStyle="medium"
                  line={18}
                  color={Color.primary.light.primary80}
                  size={Size.text.caption1.size}
                  style={style.warningBox.textRiplay}>
                  {trans(locale, lang, 'ringkasanInformasi')}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </BottomSheet>
  );
}

export default DialogBenefitInformation;

DialogBenefitInformation.defaultProps = {
  isVisible: false,
};

DialogBenefitInformation.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClosePress: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
