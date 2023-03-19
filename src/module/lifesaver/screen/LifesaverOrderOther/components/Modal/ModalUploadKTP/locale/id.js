import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  infoMasaTunggu: 'Info Masa Tunggu',
  proteksiMedis: (
    <Text textStyle="medium" line={22} color={Color.neutral.light.neutral60}>
      Proteksi medis selain meninggal dunia akibat kecelakaan dimulai
      <Text textStyle="semi" color={Color.neutral.light.neutral60}>
        {' '}
        24 Jam{' '}
      </Text>
      setelah polis aktif.
    </Text>
  ),
  uploadFotoKTP: 'Upload Foto KTP',
  uploadDariGaleri: 'Upload dari galeri',
  ambilFoto: 'Ambil Foto',
};
