import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
// import { NAVIGATION } from 'ca-util/constant';
import Padder from 'ca-component-container/Padder';
import Button from 'ca-component-generic/Button';
import Input from 'ca-component-generic/Input';
import { InfoGrey } from 'ca-config/Svg';
import style from './style';
import locale from './locale';

function CreditCardInfo(props) {
  const { navigation, lang, colorScheme } = props;

  const [cardNumber, setCardNumber] = useState(null);
  const [validThru, setValidThru] = useState(null);
  const [CVV, setCVV] = useState(null);

  const Form = useCallback(() => {
    return (
      <>
        <View style={style.mb20}>
          <Input
            value={cardNumber}
            label={trans(locale, lang, 'nomorKartu')}
            placeholder={trans(locale, lang, 'nomorKartuPlaceholder')}
            onChangeText={(num) => {
              setCardNumber(num);
            }}
          />
        </View>
        <View style={[style.fdRow, style.mb20]}>
          <View style={style.fx1}>
            <Input
              value={validThru}
              label={trans(locale, lang, 'masaBerlaku')}
              placeholder={trans(locale, lang, 'masaBerlakuPlaceholder')}
              onChangeText={(num) => {
                setValidThru(num);
              }}
            />
          </View>
          <View style={style.w14} />
          <View style={style.fx1}>
            <Input
              value={CVV}
              label={trans(locale, lang, 'CVV')}
              placeholder={trans(locale, lang, 'CVVPlaceholder')}
              onChangeText={(num) => {
                setCVV(num);
              }}
            />
          </View>
        </View>
      </>
    );
  }, [CVV, cardNumber, lang, validThru]);

  const Footer = useCallback(() => {
    const onPrivacyPressed = () => {
      navigation.goBack();
    };
    const onAddPress = () => {
      navigation.goBack();
    };

    return (
      <View style={style.footer.container}>
        <TouchableWithoutFeedback onPress={onPrivacyPressed}>
          <View style={style.footer.textContainer}>
            <Text
              textStyle="medium"
              size={Size.text.caption1.size}
              color={Color.mediumGray.light.mediumGray}>
              {trans(locale, lang, 'denganKlik')}
              <Text
                textStyle="semi"
                size={Size.text.caption1.size}
                color={Color.red.light.red90}>
                {trans(locale, lang, 'kebijakanPrivasi')}
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Button rounded="lg" onPress={onAddPress} type="linear-gradient">
          <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
            {trans(locale, lang, 'tambahkanKartu')}
          </Text>
        </Button>
      </View>
    );
  }, [lang, navigation, colorScheme]);

  const InfoCard = useCallback(() => {
    return (
      <View style={style.infoCard.container}>
        <View style={style.infoCard.iconContainer}>
          <InfoGrey
            width={25}
            height={25}
            fill={Color.mediumGray.light.mediumGray}
          />
        </View>
        <Text
          textStyle="semi"
          size={Size.text.caption1.size}
          color={Color.mediumGray.light.mediumGray}
          style={style.infoCard.text}>
          {trans(locale, lang, 'untukProsesValidasi')}
        </Text>
      </View>
    );
  }, [lang]);

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title="Kartu Kredit"
      backgroundColor={Color.landingPage.light.white}
      renderBottom={<Footer />}>
      <Padder style={style.container}>
        <Form />
        <InfoCard />
      </Padder>
    </Base>
  );
}

export default CreditCardInfo;

CreditCardInfo.propTypes = {
  lang: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
  colorScheme: PropTypes.string.isRequired,
};
