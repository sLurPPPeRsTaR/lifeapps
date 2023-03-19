import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default {
  // listSliderPairing
  howToPairing: 'Pertolongan Darurat yang Lebih Responsif',
  contentPairing:
    'LifeTag dibuat secara esklusif untuk dirimu agar keadaan darurat bisa tertangani dengan cepat.',
  keadaanDaruratDitangani:
    'LifeTag dibuat secara esklusif untuk dirimu agar keadaan darurat bisa tertangani dengan cepat.',

  // conditionalButton
  hubungkanLifetag: 'Beli LifeTag',
  berlanggananLifeSAVER: 'Berlangganan',

  // ALERTDIALOGUE
  untukMendapatkanLifeTAG: (
    <Text
      align="left"
      textStyle="regular"
      size={Size.text.caption1.size}
      line={21}
      color={Color.main.light.white}>
      Untuk menghubungkan LifeTag, Kamu perlu berlangganan{' '}
      <Text
        textStyle="regular"
        size={Size.text.caption1.size}
        color={Color.main.light.white}>
        Life
        <Text
          textStyle="italic"
          color={Color.main.light.white}
          size={Size.text.caption1.size}>
          SAVER
        </Text>
      </Text>{' '}
      terlebih dahulu agar bisa terproteksi secara maksimal.
    </Text>
  ),
};
