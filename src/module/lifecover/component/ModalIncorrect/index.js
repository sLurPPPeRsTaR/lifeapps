import React from 'react';
import { View, Image } from 'react-native';
import BottomSheet from 'ca-component-container/BottomSheet';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Button from 'ca-component-generic/Button';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import { Puzzle } from 'ca-config/Image';
import Padder from 'ca-component-container/Padder';
import style from './style';
import locale from './locale';

function Header(props) {
  const { children } = props;

  return (
    <Padder style={style.header}>
      <Image source={Puzzle} style={style.headerImage} />
      <View style={style.headerTextContainer}>{children}</View>
    </Padder>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

function ModalAgreement(props) {
  const { colorScheme, lang, isVisible, onClosePress } = props;

  return (
    <BottomSheet
      onRequestClose={onClosePress}
      isVisible={isVisible}
      swipeable={false}
      renderHeader={
        <Header onClose={onClosePress}>{trans(locale, lang, 'header')}</Header>
      }>
      <View>
        <Text
          line={20}
          textStyle="medium"
          align="center"
          color={Color.neutral[colorScheme].neutral40}
          style={style.textDescription}>
          {trans(locale, lang, 'description')}
        </Text>
        <View style={[style.mt36]}>
          <Button onPress={onClosePress} rounded="lg" type="linear-gradient">
            <Text textStyle="semi" color={Color.whiteCard[colorScheme].color}>
              {trans(locale, lang, 'okay')}
            </Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

ModalAgreement.defaultProps = {
  lang: 'id',
  colorScheme: 'light',
};

ModalAgreement.propTypes = {
  lang: PropTypes.string,
  colorScheme: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
};

export default ModalAgreement;
