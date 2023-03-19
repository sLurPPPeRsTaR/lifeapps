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
        Maaf, Pernyataan Kesehatan Tidak Sesuai
      </Text>
    </View>
  ),
  description:
    'Kondisi kesehatan yang sudah kamu isi tidak sesuai persyaratan, tim LiveCOVER akan menghubungimu nanti, mohon menunggu.',
  okay: 'Okay',
};
