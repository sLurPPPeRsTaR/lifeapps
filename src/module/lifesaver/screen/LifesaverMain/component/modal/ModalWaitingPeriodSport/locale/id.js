import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  infoMasaTunggu: 'Info Masa Tunggu',
  proteksiMedis: (
    <Text textStyle="medium" line={22} color={Color.neutral.light.neutral60}>
      Proteksi cedera olahraga dimulai
      <Text textStyle="semi" color={Color.neutral.light.neutral60}>
        {' '}
        5 hari{' '}
      </Text>
      setelah polis aktif.
    </Text>
  ),
};
