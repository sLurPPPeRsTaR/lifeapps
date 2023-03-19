import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import locale from './locale';
import style from './style';

const statusDetail = [
  {
    date: '16 Januari, 2022',
    time: '12.00 WIB',
    deskripsi: 'Pengajuan Klaim diproses',
    isActive: true,
  },
  {
    date: '16 Februari, 2022',
    time: '12.00 WIB',
    deskripsi: 'Pengajuan Klaim disetujui',
    isActive: false,
  },
  {
    date: '16 Maret, 2022',
    time: '12.00 WIB',
    deskripsi: 'Pengecekan kelengkapan dokumen',
    isActive: false,
  },
];

function PolisDanaStatus(props) {
  const {
    navigation,
    lang,
    colorScheme,
    route: { params },
  } = props;

  const polis = params?.polis;

  function renderHeaderContainer() {
    return (
      <View style={style.header.container}>
        <Text
          textStyle="medium"
          size={Size.text.caption1.size}
          line={18}
          letterSpacing={0.5}>
          {trans(locale, lang, 'nomorPolis')}
        </Text>
        <Text
          textStyle="semi"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}>
          {trans(locale, lang, '12345678901234567')}
        </Text>
      </View>
    );
  }

  function renderStatusContainer(item, index, length) {
    return (
      <View style={style.progress.container} key={index}>
        <View style={style.progress.date.container}>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={18}
            letterSpacing={0.5}
            align="right"
            color={Color.mediumGray[colorScheme].mediumGray}>
            {item.date}
          </Text>
          <Text
            textStyle="medium"
            size={Size.text.caption1.size}
            line={18}
            letterSpacing={0.5}
            align="right"
            color={Color.mediumGray[colorScheme].mediumGray}>
            {item.time}
          </Text>
        </View>
        <View style={style.progress.status.container}>
          <View
            style={[
              style.progress.status.dot.dot,
              item.isActive
                ? style.progress.status.dot.active
                : style.progress.status.dot.inactive,
            ]}
          />
          <View
            style={[
              style.progress.status.line.line,
              index === length - 1 && style.progress.status.line.last,
            ]}
          />
        </View>
        <View style={style.progress.deskripsi.container}>
          <Text
            textStyle={item.isActive ? 'semi' : 'regular'}
            size={Size.text.body2.size}
            line={21}
            letterSpacing={0.5}>
            {item.deskripsi}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Base
      title={trans(locale, lang, 'detailStatus')}
      onBackPress={() => navigation.pop()}>
      {renderHeaderContainer()}
      <Padder style={style.container}>
        {statusDetail.map((item, index) =>
          renderStatusContainer(item, index, statusDetail.length),
        )}
      </Padder>
    </Base>
  );
}

export default PolisDanaStatus;

PolisDanaStatus.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  route: PropTypes.objectOf(Object).isRequired,
};
