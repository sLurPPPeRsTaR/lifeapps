import React from 'react';
import Text from 'ca-component-generic/Text';
import style from '../style';

export default {
  headerTitle: (
    <Text textStyle="bold" style={style.titleHeader}>
      Aman Bersama Life
      <Text textStyle="boldItalic" style={style.titleHeader}>
        COVER
      </Text>
    </Text>
  ),
  headerSubtitle: (
    <Text textStyle="medium" style={style.subtitleHeader}>
      Temukan asuransi jiwa yang sesuai dengan budget dan kebutuhanmu
    </Text>
  ),
  benefitTitle: (
    <Text textStyle="bold" style={style.titleBenefit}>
      Life
      <Text textStyle="boldItalic" style={style.titleBenefit}>
        COVER
      </Text>{' '}
      Benefits
    </Text>
  ),
  benefitSubtitle: (
    <Text textStyle="medium" style={style.subtitleBenefit}>
      Life
      <Text textStyle="medium" style={style.subtitleBenefit}>
        COVER
      </Text>{' '}
      adalah proteksi jiwa berjangka dengan manfaat meninggal dunia karena sebab
      apapun baik kecelakaan atau bukan kecelakaan.
    </Text>
  ),

  manfaat: 'Manfaat',
  semangatLifecover: 'Semangat bersama LifeCOVER',
  deskripsiLifecover:
    'LifeCOVER adalah proteksi jiwa berjangka dengan manfaat meninggal dunia karena sebab apapun baik kecelakaan atau bukan kecelakaan.',
  pengecualian: 'Pengecualian',
  cobaSimulasi: 'Coba Simulasi Perhitungan LifeCover',
  hitungSimulasi: 'Hitung Simulasi',
  mulaiBerlangganan: 'Mulai Berlangganan',
  syaratDanKetentuan: 'Syarat dan Ketentuan',
  ringkasanInformasi: 'Ringkasan Informasi Produk & Layanan (RIPLAY)',
  riplay: 'RIPLAY',
  butuhBantuan: 'Butuh bantuan dari IFG Life? Hubungi',
  customerCare: 'Customer Care',
  ptAsuransiJiwa: 'PT Asuransi Jiwa IFG berizin dan diawasi oleh OJK.',
};
