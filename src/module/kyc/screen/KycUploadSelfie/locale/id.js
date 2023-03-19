import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default {
  // pages title
  verifikasiWajah: 'Verifikasi Wajah',

  // renderContent
  lakukanVerifikasiWajah:
    'Lakukan verifikasi wajah agar mendapatkan benefit yang bisa Kamu nikmati:',

  // renderSubContent
  klaimMudah: 'Klaim Mudah',
  prosesMenjadiLebih: 'Proses menjadi lebih mudah di rumah sakit.',
  verifikasiUntukSemua: 'Verifikasi Untuk Semua Asuransi',
  verifikasiYangKamu:
    'Verifikasi yang Kamu lakukan, sebagai data pribadi yang digunakan untuk layanan asuransi lainnya.',
  saatVerifikasiWajah: (
    <Text
      textStyle="medium"
      size={Size.text.caption2.size}
      color={Color.kycNotesColor.light.color}
      line={18}>
      Saat verifikasi wajah, posisikan wajah sebaik mungkin agar foto yang
      dihasilkan menarik untuk foto{' '}
      <Text
        textStyle="semi"
        size={Size.text.caption2.size}
        color={Color.kycNotesColor.light.color}
        line={18}>
        LifeCARD
      </Text>{' '}
      Kamu nanti.
    </Text>
  ),

  // AlertDialogue
  dataPribadiKamu: 'Data pribadi Kamu akan terlindungi dengan aman.',

  // renderBottom
  ambilGambar: 'Ambil Gambar',
};
