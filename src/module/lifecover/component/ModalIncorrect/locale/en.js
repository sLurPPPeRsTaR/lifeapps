import React from 'react';
import { View } from 'react-native';
import Text from 'ca-component-generic/Text';
import style from '../style';

export default {
  header: (
    <View>
      <Text textStyle="bold" style={style.headerText}>
        Opps :(
      </Text>
      <Text textStyle="bold" style={style.headerText}>
        Sorry, The statement is invalid
      </Text>
    </View>
  ),
  description:
    'The health conditions that you have filled in do not meet the requirements, the LiveCOVER team will contact you later, Please wait.',
  okay: 'Okay',
};
