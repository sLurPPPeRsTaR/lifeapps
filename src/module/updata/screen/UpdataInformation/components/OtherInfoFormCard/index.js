import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { EditRed } from 'ca-config/Svg';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import Size from 'ca-config/Size';
import style from './style';

function OtherInfoFormCard(props) {
  const { item, isShowRequiredCard } = props;
  const isInvalid = item?.isRequired && !item?.value;
  const content = (
    <View style={style.card.container}>
      <View style={style.card.label.container}>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          line={18}
          letterSpacing={0.5}
          color={Color.mediumGray.light.mediumGray}>
          {item?.key}
          {item?.isRequired && (
            <Text
              textStyle="semi"
              size={Size.text.caption1.size}
              color={Color.primary.light.primary90}>
              *
            </Text>
          )}
        </Text>
        {item?.isEditable ? (
          <TouchableOpacity onPress={item?.onPress}>
            <EditRed />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        textStyle="medium"
        size={Size.text.body2.size}
        line={21}
        letterSpacing={0.5}>
        {item?.value || '-'}
      </Text>
    </View>
  );
  if (isShowRequiredCard && isInvalid) {
    return (
      <View key={item?.id} style={[style.errorCard, style.mb16]}>
        {content}
      </View>
    );
  }
  return (
    <Shadow key={item?.id} borderRadius={16} style={style.mb16}>
      {content}
    </Shadow>
  );
}

export default OtherInfoFormCard;

OtherInfoFormCard.propTypes = {
  item: PropTypes.objectOf(Object).isRequired,
  isShowRequiredCard: PropTypes.bool.isRequired,
};
