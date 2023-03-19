import React, { useEffect } from 'react';
import { BackHandler, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { Base } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import { ReLiveness, ReUploadIdCard } from 'ca-config/Image';
import { NAVIGATION } from 'ca-util/constant';
import { Warn } from 'ca-config/Svg';
import locale from './locale';
import style from './style';

function KycRetry(props) {
  const { navigation, lang, userData } = props;

  useEffect(() => {
    if (!userData?.isReKYC) {
      navigation.reset({
        index: 0,
        routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const goTo = () => {
      navigation.pop();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [navigation]);

  function renderContent() {
    let reKycImg = userData?.isReLivenessTest ? ReLiveness : ReUploadIdCard;
    reKycImg = userData?.isReLivenessTestAndReUploadIdCard
      ? ReLiveness
      : reKycImg;
    return (
      <View style={style.renderContent.container}>
        <Image
          style={style.renderContent.imgSize}
          source={userData?.alreadyReLivenessTest ? ReUploadIdCard : reKycImg}
        />
        <View style={style.pV28}>
          <Text
            align="center"
            textStyle="semi"
            size={Size.text.body1.size}
            line={22.4}>
            {trans(locale, lang, 'verifikasiDataDiriKamu')}
          </Text>
        </View>
        <View style={style.renderContent.dialogueContainer}>
          <View style={[style.row, style.pV8]}>
            <Warn
              style={[style.mR7, style.mT5]}
              fill={Color.warningAlertDialogue.light.color}
            />
            <Text
              style={style.flex}
              textStyle="medium"
              size={Size.text.body1.size}
              line={22.4}>
              {trans(locale, lang, 'berikutSaranYangBisa')}
            </Text>
          </View>

          <View style={style.mB24}>
            <View style={style.renderContent.dialogueTextContainer}>
              <Text
                style={style.mR7}
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.neutralLifeSaver.light.neutral40}>
                {'\u2022'}
              </Text>
              <Text
                textStyle="medium"
                line={18}
                size={Size.text.caption1.size + 1}
                style={style.flexShrink1}
                color={Color.neutralLifeSaver.light.neutral40}>
                {userData?.isReUploadIdCard || userData?.alreadyReLivenessTest
                  ? trans(locale, lang, 'fotoKtpmuDengan')
                  : trans(locale, lang, 'pastikanFotoSemirip')}
              </Text>
            </View>
            <View
              style={[style.renderContent.dialogueTextContainer, style.mV8]}>
              <Text
                style={style.mR7}
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.neutralLifeSaver.light.neutral40}>
                {'\u2022'}
              </Text>
              <Text
                textStyle="medium"
                line={18}
                size={Size.text.caption1.size + 1}
                style={style.flexShrink1}
                color={Color.neutralLifeSaver.light.neutral40}>
                {userData?.isReUploadIdCard || userData?.alreadyReLivenessTest
                  ? trans(locale, lang, 'fotoKtpmuPada')
                  : trans(locale, lang, 'pastikanWajahTerlihat')}
              </Text>
            </View>
            <View style={style.renderContent.dialogueTextContainer}>
              <Text
                style={style.mR7}
                textStyle="bold"
                size={Size.text.body2.size}
                color={Color.neutralLifeSaver.light.neutral40}>
                {'\u2022'}
              </Text>
              <Text
                textStyle="medium"
                line={18}
                size={Size.text.caption1.size + 1}
                style={style.flexShrink1}
                color={Color.neutralLifeSaver.light.neutral40}>
                {userData?.isReUploadIdCard || userData?.alreadyReLivenessTest
                  ? trans(locale, lang, 'pastikanBahwaKtp')
                  : trans(locale, lang, 'posisikanWajahBerada')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderButton() {
    const onPress = () => {
      if (userData?.isReUploadIdCard) {
        navigation.navigate(NAVIGATION.KYC.KycUploadKTPCam);
        return;
      }
      if (userData?.isReLivenessTest) {
        navigation.navigate(NAVIGATION.KYC.KycUploadSelfieCam);
        return;
      }
      if (userData?.isReLivenessTestAndReUploadIdCard) {
        if (userData?.alreadyReLivenessTest) {
          navigation.navigate(NAVIGATION.KYC.KycUploadKTPCam);
        } else {
          navigation.navigate(NAVIGATION.KYC.KycUploadSelfieCam);
        }
      }
    };

    return (
      <Padder style={style.pB48}>
        <Button onPress={onPress}>
          {trans(locale, lang, 'verifikasiUlang')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      bordered
      isPaddingBottom={false}
      title={trans(locale, lang, 'verifikasiDataDiri')}
      onBackPress={() => {
        navigation.pop();
      }}
      renderBottom={renderButton()}>
      <Padder>{renderContent()}</Padder>
    </Base>
  );
}

export default KycRetry;

KycRetry.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(Object).isRequired,
};
