import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import Input from 'ca-component-generic/Input';
import Text from 'ca-component-generic/Text';
import Padder from 'ca-component-container/Padder';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { ButtonIcon, ButtonIconRed, Ilustrator } from 'ca-config/Svg';
import { trans } from 'ca-util/trans';
import { NAVIGATION } from 'ca-util/constant';
import { regexMobile } from 'ca-util/common';
import Style from './style';
import locale from './locale';

function ProfileMobileNumber(props) {
  const { navigation, lang } = props;
  const iconProps = {
    width: 64,
    height: 40,
  };

  const [id, setId] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  function renderImageContainer() {
    return (
      <View style={[Style.placeCenter, Style.mb8]}>
        <Ilustrator width={334} height={228} />
      </View>
    );
  }

  function renderHeaderContainer() {
    return (
      <View style={Style.headerContainer}>
        <Text
          size={Size.text.h6.size}
          textStyle="bold"
          line={27}
          letterSpacing={0.5}
          color={Color.neutral.light.neutral60}
          style={Style.headerTitle}>
          {trans(locale, lang, 'Nomor HP Lama')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {trans(
            locale,
            lang,
            'Masukkan nomor lama Kamu agar dapat dikonfirmasi melalui OTP.'
          )}
        </Text>
      </View>
    );
  }

  function renderInputCard() {
    return (
      <View>
        <Input
          value={id}
          suffixIcon={
            isDisabled ? (
              <ButtonIcon {...iconProps} />
            ) : (
              <ButtonIconRed {...iconProps} />
            )
          }
          placeholder={trans(locale, lang, 'Masukkan nomor handphone')}
          handleSuffixIcon={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileInputPin, {
              nextRoute: NAVIGATION.PROFILE.ProfileNewMobileNumber,
            });
          }}
          suffixIconDisabled={isDisabled}
          onChangeText={(txt) => {
            setId(txt);
            setDisabled(!regexMobile.test(txt));
          }}
          keyboardType="number-pad"
          height={64}
        />
      </View>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'Ubah Nomor HP')}>
      <Padder>
        <View>
          {renderImageContainer()}
          {renderHeaderContainer()}
          {renderInputCard()}
        </View>
      </Padder>
    </Base>
  );
}

export default ProfileMobileNumber;

ProfileMobileNumber.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};
