import React from 'react';
import BottomSheet from 'ca-component-container/BottomSheet';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { trans } from 'ca-util/trans';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import Text from 'ca-component-generic/Text';
import { Call, Chat, Message } from 'ca-config/Svg';
import Size from 'ca-config/Size';
import { store } from 'ca-config/Store';
import locale from '../locale';

function CardContainer(properties) {
  const { icon, text, onPress } = properties;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[Style.cardContainer]}>
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
function ModalCustomerCare(props) {
  const { isShow, onClosePress, colorScheme, lang, data } = props;
  const { dimensions } = store.getState().bootstrap;

  function renderContentContainer() {
    return (
      <View>
        {data?.map((item) => {
          let icon;
          let text;
          let url;
          if (item.code === 'phoneNumber') {
            icon = <Call width={24} height={24} style={Style.icon} />;
            text = `Call Center ${item.value}`;
            url = `tel:${item.value}`;
          }
          if (item.code === 'email') {
            icon = <Message width={24} height={24} style={Style.icon} />;
            text = item.value;
            url = `mailto:${item.value}`;
          }
          if (item.code === 'whatsApp') {
            icon = <Chat width={24} height={24} style={Style.icon} />;
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

  return (
    <BottomSheet
      title=" "
      isVisible={isShow}
      swipeable={false}
      onRequestClose={onClosePress}
      onClosePress={onClosePress}>
      <View style={Style.container}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          color={Color.neutral[colorScheme].neutral80}
          style={Style.title}>
          {trans(locale, lang, 'bantuanCustomerCare')}
        </Text>
        <Text
          textStyle="medium"
          size={Size.text.body2.size}
          line={23.8}
          color={Color.mediumGray[colorScheme].mediumGray}
          style={Style.subtitle}>
          {trans(locale, lang, 'butuhBantuanHubungi')}
        </Text>
        {data && data.length > 0 ? (
          renderContentContainer()
        ) : (
          <View
            style={{
              height: dimensions.height / 3,
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
        )}
      </View>
    </BottomSheet>
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  icon: {
    marginStart: 8,
    marginEnd: 16,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingStart: 4,
    paddingEnd: 8,
    borderColor: Color.grayCard.light.grayCard,
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    marginBottom: 20,
  },
});

ModalCustomerCare.defaultProps = {
  isShow: false,
  onClosePress: () => {},
  colorScheme: 'light',
  lang: 'id',
  data: {},
};

ModalCustomerCare.propTypes = {
  isShow: PropTypes.bool,
  onClosePress: PropTypes.func,
  colorScheme: PropTypes.string,
  lang: PropTypes.string,
  data: PropTypes.any,
};

export default ModalCustomerCare;
