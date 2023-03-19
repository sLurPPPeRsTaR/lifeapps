import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';

export default {
  lifeCard: 'LifeCARD',
  kamuBelumMempunyai: 'Kamu belum mempunyai LifeCARD.',
  kontenGagalDiTampilkan: 'Konten gagal ditampilkan',
  muatUlang: 'Muat Ulang',

  // renderLifetagContainer
  lifetag: 'LifeTag',
  kamuBelumMemiliki:
    'Kamu belum memiliki LifeTag nih, dapatkan LifeTagmu sekarang!',
  keadaanDaruratDitangani:
    'Keadaan darurat ditangani lebih cepat dengan LifeTag.',
  dapatkanLifetag: 'Dapatkan LifeTag',
  hubungkanLifetag: 'Hubungkan LifeTag',
  titleProses: 'LifeTag sedang diproses',
  pengiriman:
    'Saat ini LifeTag Kamu sedang dalam pengiriman. Estimasi pengiriman 2-4 hari kerja, tergantung dari wilayah pengiriman Kamu. ',
  kontakDaruratInfo:
    'Kontak darurat ini menggunakan layanan hotline untuk mencegah hal yang tidak diinginkan.',
  informasiKesehatan: 'Informasi Kesehatan',
  golonganDarah: 'Golongan Darah',
  alergi: 'Alergi',
  kontakDarurat: 'Kontak Darurat',
  gracePeriodTitle: 'Maaf, Lifetag Kamu Tidak Dapat Diproses',
  gracePeriodContent: (
    <Text align="center" textStyle="regular" line={21}>
      Untuk mendapatkan LifeTag, Kamu perlu memperpanjang{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      terlebih dahulu untuk perlindungan secara optimal
    </Text>
  ),

  // LIFETAG COMING SOON
  comingSoonTitle: 'LifeTag Akan Segera Hadir!',
  comingSoonContent: (
    <Text align="center" textStyle="regular" line={21}>
      Ayo, tetap perpanjang{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      Kamu agar dapat memiliki kesempatan untuk mendapatkan LifeTag.
    </Text>
  ),
};
