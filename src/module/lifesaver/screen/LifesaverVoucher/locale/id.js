import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import React from 'react';

export default {
  gratis: 'GRATIS',
  bulan: 'BULAN',
  startSubscribe: 'Mulai Berlangganan',
  hanya: 'Hanya',
  selanjutnya: 'bulan selanjutnya',
  hadiahKhusus: 'Hadiah ini khusus untuk peserta',
  bilaKesulitan: 'Bila kesulitan',
  hubungi: 'Hubungi',
  customerCare: 'Customer Care',
  kami: 'kami',

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

  // Dialog Already Subs
  lifesaverKamuTelahAktif: (
    <Text textStyle="bold" size={Size.text.h6.size}>
      Life
      <Text fontStyle="italic" size={Size.text.h6.size}>
        SAVER{' '}
      </Text>
      Kamu Telah Aktif!
    </Text>
  ),
  kamuSudahTerproteksi: (
    <Text color={Color.neutral.light.neutral40} textStyle="medium">
      Kamu sudah terproteksi{' '}
      <Text color={Color.neutral.light.neutral40} textStyle="bold">
        Life
      </Text>
      <Text color={Color.neutral.light.neutral40} textStyle="boldItalic">
        SAVER
      </Text>{' '}
      serta akan diingatkan untuk pembayaran berkala bila proteksimu akan habis.
      Proteksi asuransi terbaik selalu melindungimu.
    </Text>
  ),
  kembali: 'Kembali',
};
