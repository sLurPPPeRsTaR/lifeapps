import React, { useEffect, useCallback } from 'react';
import { BackHandler, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { Base, Shadow } from 'ca-component-container/index';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import {
  PhoneKyc,
  LifeSAVERActive,
  PolisCek,
  TotalSaldo,
} from 'ca-config/Image';
import { NAVIGATION } from 'ca-util/constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Headset2, Wave } from 'ca-config/Svg';
import { AFLogEvent, AF_OPEN_EKYC } from 'ca-util/AppsFlyer';
import { setNavigationHome } from 'ca-bootstrap/bootstrapNavigation';
import AlertDialogue from 'ca-component-card/AlertDialogue';
import Size from 'ca-config/Size';
import locale from './locale';
import style from './style';

function KycMain(props) {
  const { navigation, lang, isComingFromScreen, userId, width } = props;

  useEffect(() => {
    const goTo = () => {
      onBackPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', goTo);
    return () => backHandler.remove();
  }, [onBackPress]);

  const onBackPress = useCallback(() => {
    if (isComingFromScreen?.screen) {
      navigation.navigate(isComingFromScreen?.screen);
    }
    if (!isComingFromScreen?.screen) {
      if (navigation.canGoBack()) {
        navigation.pop();
      } else {
        setNavigationHome();
      }
    }
  }, [isComingFromScreen?.screen, navigation]);

  function renderBottom() {
    return (
      <Padder style={style.renderBottom.container}>
        <Wave
          width={width}
          height={250}
          style={style.renderBottom.waveContainer}
          fill={Color.wave.dark.color}
        />
        <Button
          type="linear-gradient"
          onPress={() => {
            navigation.navigate(NAVIGATION.KYC.KycUploadKTPCam);
            // APPSFLYER LOG - OPEN EKYC
            AFLogEvent(AF_OPEN_EKYC, { af_user_id: userId });
          }}>
          {trans(locale, lang, 'ambilFotoKtp')}
        </Button>
      </Padder>
    );
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2 fill={Color.main.dark.white} />
      </TouchableOpacity>
    );
  }

  function renderContent() {
    return (
      <Padder style={style.renderContent.container}>
        <View style={style.mV16}>
          <Image source={PhoneKyc} style={style.renderContent.imgSize} />
        </View>
        <Text style={style.mB16} align="center" textStyle="medium" line={21}>
          {trans(locale, lang, 'unggahKtpDan')}
        </Text>
      </Padder>
    );
  }

  function renderSubContent() {
    return (
      <Padder style={style.mB48}>
        <Shadow borderRadius={30} style={style.renderSubContent.container}>
          <View style={style.renderSubContent.card.container}>
            <Image
              source={LifeSAVERActive}
              style={style.renderSubContent.card.image}
              resizeMode="contain"
            />
            <View style={style.fS1}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'beliProteksiDengan')}
              </Text>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'beliProdukProteksi')}
              </Text>
            </View>
          </View>
          <View style={style.renderSubContent.card.container}>
            <Image
              source={PolisCek}
              style={style.renderSubContent.card.image}
              resizeMode="contain"
            />
            <View style={style.fS1}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'hubungkanPolis')}
              </Text>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'informasiPolismuAkan')}
              </Text>
            </View>
          </View>
          <View style={style.renderSubContent.card.lastContainer}>
            <Image
              source={TotalSaldo}
              style={style.renderSubContent.card.image}
              resizeMode="contain"
            />
            <View style={style.fS1}>
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}>
                {trans(locale, lang, 'informasiPembayaranManfaat')}
              </Text>
              <Text
                textStyle="regular"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'melihatInformasiPembayaran')}
              </Text>
            </View>
          </View>
        </Shadow>
        <AlertDialogue
          style={style.renderSubContent.alertDialogueStyle}
          type="success"
          leftIcon
          title={trans(locale, lang, 'dataPribadiKamu')}
        />
      </Padder>
    );
  }

  return (
    <Base
      isPaddingBottom={false}
      rightHeaderContent={renderRightHeaderContent()}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      title={trans(locale, lang, 'verifikasiDataDiri')}
      onBackPress={onBackPress}
      renderBottom={renderBottom()}>
      {renderContent()}
      {renderSubContent()}
    </Base>
  );
}

export default KycMain;

KycMain.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  isComingFromScreen: PropTypes.objectOf(Object).isRequired,
  userId: PropTypes.objectOf(Object).isRequired,
  width: PropTypes.number.isRequired,
};
