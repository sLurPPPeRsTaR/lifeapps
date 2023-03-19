import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { ArrowRight2, Call, Chat, Message } from 'ca-config/Svg';
import { CloudBackground } from 'ca-config/Image';
import _ from 'lodash';
import locale from './locale';
import style from './style';

function CardContainer(properties) {
  const { icon, text, onPress } = properties;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[style.content.customerService.cardContainer]}>
        {icon}
        <Text
          textStyle="semi"
          size={Size.text.body1.size}
          line={25.6}
          color={Color.grayCardText.light.grayCardText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
function ProfileHelpCenter(props) {
  const {
    navigation,
    lang,
    colorScheme,
    getCSInfo,
    getCSInfoResponse,
    getCSInfoFetch,
  } = props;

  useEffect(() => {
    getCSInfo();
  }, []);

  function renderHeaderContainer() {
    return (
      <View style={style.header.container}>
        <Text
          textStyle="bold"
          size={Size.text.body1.size}
          line={25.6}
          letterSpacing={0.5}
          style={style.header.title}>
          {trans(locale, lang, 'kamiDisiniUntuk')}
        </Text>
      </View>
    );
  }

  function renderContentContainer() {
    return (
      <View>
        {getCSInfoResponse?.data.map((item) => {
          let icon;
          let text;
          let url;
          if (item.code === 'phoneNumber') {
            icon = (
              <Call
                width={24}
                height={24}
                style={style.content.customerService.icon}
              />
            );
            text = `Call Center ${item.value}`;
            url = `tel:${item.value}`;
          }
          if (item.code === 'email') {
            icon = (
              <Message
                width={24}
                height={24}
                style={style.content.customerService.icon}
              />
            );
            text = item.value;
            url = `mailto:${item.value}`;
          }
          if (item.code === 'whatsApp') {
            icon = (
              <Chat
                width={24}
                height={24}
                style={style.content.customerService.icon}
              />
            );
            text = 'WhatsApp Lifia';
            url = `https://wa.me/${item.value}?text=Hi Lifia, saya perlu bantuan`;
          }
          return (
            <CardContainer
              key={item.code}
              icon={icon}
              text={text}
              onPress={() => {
                Linking.openURL(url);
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderContent() {
    if (getCSInfoFetch) {
      return (
        <View
          style={{
            height: Size.screen.height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            color={Color.primary.light.primary90}
            size="large"
          />
        </View>
      );
    }
    if (!getCSInfoFetch && getCSInfoResponse?.data?.length > 0) {
      return renderContentContainer();
    }
    if (!getCSInfoFetch && _.isEmpty(getCSInfoResponse?.data)) {
      return (
        <View
          style={{
            height: Size.screen.height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}
            color={Color.mediumGray.light.mediumGray}
            align="center">
            {trans(locale, lang, 'dataTidakDitemukan')}
          </Text>
        </View>
      );
    }
  }

  return (
    <Base
      bordered={true}
      isPaddingBottom={false}
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'pusatBantuan')}>
      <ScrollView>
        <Padder style={style.py16}>
          {renderHeaderContainer()}
          {renderContent()}
        </Padder>
      </ScrollView>
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          width={Size.screen.width}
          source={CloudBackground}
        />
      </View>
    </Base>
  );
}

export default ProfileHelpCenter;

ProfileHelpCenter.propTypes = {
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  getCSInfoFetch: PropTypes.bool.isRequired,
};
