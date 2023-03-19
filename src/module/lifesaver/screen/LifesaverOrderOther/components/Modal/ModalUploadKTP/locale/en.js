import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  infoMasaTunggu: 'Waiting Period Information',
  proteksiMedis: (
    <Text textStyle="medium" line={22} color={Color.neutral.light.neutral60}>
      Waiting Period for Medical protection other than death due to an accident starts 
      <Text textStyle="semi" color={Color.neutral.light.neutral60}>
        {' '}
        24 hours{' '}
      </Text>
      after the policy is active.
    </Text>
  ),
  uploadFotoKTP: 'Upload Foto KTP',
  uploadDariGaleri: 'Upload dari galeri',
  ambilFoto: 'Ambil Foto',
};
