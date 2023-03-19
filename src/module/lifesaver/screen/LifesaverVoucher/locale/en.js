import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import React from 'react';

export default {
  gratis: 'FREE',
  bulan: 'MONTH',
  startSubscribe: 'Get Started',
  hanya: 'Only',
  selanjutnya: 'for next month',
  hadiahKhusus: 'Hadiah ini khusus untuk peserta',
  bilaKesulitan: 'Need Help',
  hubungi: 'Contact our',
  customerCare: 'Customer Care',
  kami: ' ',

  // DialogNotEligible
  akunTidakDitemukan: 'Akun tidak ditemukan',
  gunakanAkunTerdaftar: 'Gunakan Akun yang terdaftar',
  gunakanEmail: 'Silakan gunakan Email / Nomor HP terdaftar pada event',
  bajoMarathon: 'Bajo Marathon',
  batalkan: 'Batalkan',
  gantiAkun: 'Ganti Akun',

  // -- Dialog EKYC
  yukVerifikasi: 'Yuk Verifikasi',
  dataDirimu: 'Data Dirimu Sekarang!',
  katanyaTakKenal:
    'Katanya tak kenal maka tak sayang, kenalan singkat kita bisa membuka banyak fitur spesial hanya untuk sahabat LifeFriends loh!',
  nantiDulu: 'Lewati',
  yuk: 'Yuk!',

  //Dialog Already Subs
  lifesaverKamuTelahAktif: (
    <Text textStyle="bold" size={Size.text.h6.size}>
      Your Life
      <Text fontStyle="italic" size={Size.text.h6.size}>
        SAVER{' '}
      </Text>
      is Active!
    </Text>
  ),
  kamuSudahTerproteksi: (
    <Text color={Color.neutral.light.neutral40} textStyle="medium">
      You are already protected by{' '}
      <Text color={Color.neutral.light.neutral40} textStyle="bold">
        Life
      </Text>
      <Text color={Color.neutral.light.neutral40} textStyle="boldItalic">
        SAVER
      </Text>{' '}
      and will be reminded for periodic payments when your protection expires.
      The best insurance always protects you.
    </Text>
  ),
  kembali: 'Back',
};
