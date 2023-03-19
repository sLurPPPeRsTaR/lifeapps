import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import style from './style';

function AddressCard(props) {
  const {
    thisKey,
    selectedAddress,
    title,
    textAddress,
    onPress,
    editLabel,
    isEditable,
    onEditPress,
  } = props;

  return (
    <View
      key={thisKey}
      style={[
        style.card.container,
        style.mb16,
        selectedAddress?.key === thisKey && style.card.shadow,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          style.card.content.container,
          selectedAddress?.key !== thisKey && style.card.shadow,
        ]}>
        <View style={style.card.content.leftContainer}>
          <Text
            textStyle="semi"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}
            style={style.mb8}>
            {title}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.body2.size}
            line={20}
            letterSpacing={0.5}
            color={Color.neutral.light.neutral40}
            style={style.mb8}>
            {textAddress}
          </Text>
        </View>
        <View style={style.card.content.rightContainer}>
          <View
            style={
              style.radio.container[
                selectedAddress?.key === thisKey ? 'active' : 'inactive'
              ]
            }>
            <View
              style={
                style.radio.button[
                  selectedAddress?.key === thisKey ? 'active' : 'inactive'
                ]
              }
            />
          </View>
        </View>
      </TouchableOpacity>
      {selectedAddress?.key === thisKey &&
      isEditable &&
      selectedAddress?.key !== 'residentAddress' ? (
        <View style={style.card.footer.container}>
          <TouchableOpacity onPress={onEditPress}>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              align="center"
              color={Color.primary.light.primary90}>
              {editLabel}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default AddressCard;

AddressCard.propTypes = {
  thisKey: PropTypes.string.isRequired,
  selectedAddress: PropTypes.objectOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  textAddress: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  editLabel: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onEditPress: PropTypes.func.isRequired,
};
