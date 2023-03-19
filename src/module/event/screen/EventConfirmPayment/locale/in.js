import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  // header
  konfirmasi: 'Konfirmasi',
  // event data
  hargaTiket: 'Harga Tiket',
  tanggalEvent: 'Tanggal',
  waktuEvent: 'Waktu',
  lokasiEvent: 'Lokasi',
  durasiProteksi: 'Periode Proteksi',
  jatuhTempoBerikutnya: 'Jatuh Tempo Berikutnya',

  // user info
  dataDiri: 'Data Diri',
  berdasarkanAkun: 'Berdasarkan Akun Pribadi',
  nik: 'NIK',
  tglLahir: 'Tanggal Lahir',

  // input voucher
  punyaVoucher: 'Punya Voucher?',
  masukkankodeVoucher: 'Masukkan Kode Voucher',
  gunakan: 'Gunakan',
  hapus: 'Hapus',

  // referral code
  punyaReferral: 'Punya Kode Referral?',
  masukkankodeReferral: 'Masukkan Kode Referral',

  // summary total
  ringkasanPembayaran: 'Ringkasan Pembayaran',
  diskon: 'Diskon Tiket',
  tiket: 'Tiket',
  perpanjangan: 'Perpanjangan Life',
  perpanjanganPolis:
    'untuk perpanjangan Polis pada setiap Jatuh Tempo bulan berikutnya',
  life: 'Life',
  saver: 'SAVER',
  saverPlus: 'SAVER+',
  total: 'Total',
  pembayaranSetiapBulan: 'Pembayaran berkala setiap bulan.',
  kamuDapatBerhenti: 'Kamu dapat berhenti berlangganan kapan pun.',
  bayarSekarang: 'Bayar Sekarang',

  // Alert Dialogue Grace Period
  informasiPolis: ' Informasi Polis :',
  infoPeriode: ' Informasi Periode Proteksi Polis: ',
  infoPerpanjangan: ' Informasi Perpanjangan Polis: ',
  kamuAkan: 'Kamu akan dikenakan biaya',
  padaBulan: 'pada bulan berikutnya',
  agarTetapProteksi:
    'Polis kamu sedang dalam masa tenggang dan akan diperpanjang pada saat pembayaran selesai sebelum Masa Tenggang berakhir pada ',
  periodeProteksi:
    'Periode Proteksi Polis dapat berubah sesuai dengan waktu penerimaan pembayaran Premi.',
  pastikanUntuk:
    'Pastikan untuk menyelesaikan pembayaran segera untuk menghindari berakhirnya periode Masa Tenggang.',
  apabilaKamu:
    'Apabila Kamu baru menyelesaikan pembayaran setelah Masa Tenggang berakhir, maka akan dianggap sebagai pembelian Polis Baru.',
  proteksiMedis: (
    <Text
      textStyle="medium"
      line={18}
      size={Size.text.caption2.size}
      color={Color.neutral.light.neutral60}>
      Masa tunggu untuk Proteksi Medis selain Meninggal Dunia akibat kecelakaan
      dimulai sejak
      <Text
        textStyle="semi"
        size={Size.text.caption2.size}
        color={Color.neutral.light.neutral60}>
        {' '}
        24 Jam{' '}
      </Text>
      setelah polis aktif.
    </Text>
  ),
  proteksiMedisCedera: (
    <Text
      textStyle="medium"
      line={18}
      size={Size.text.caption2.size}
      color={Color.neutral.light.neutral60}>
      Masa tunggu untuk Proteksi Cedera Olahraga dimulai
      <Text
        textStyle="semi"
        size={Size.text.caption2.size}
        color={Color.neutral.light.neutral60}>
        {' '}
        5 hari{' '}
      </Text>
      setelah polis aktif.
    </Text>
  ),
  selamat: 'Selamat! Karena Kamu ',
  membeli: 'membeli produk ',
  pemegang: 'pemegang polis ',
  produk: 'LifeSAVER, maka Kamu berhak mendapatkan Diskon Tiket',
  discountLS:
    'Yeay! Sebagai pemegang polis LifeSAVER, kamu mendapatkan potongan diskon tiket! 🥳',
  discountHasntLS:
    'Wooooozzzz! Pembelian tiket LifeFest dapat potongan diskon karena kamu beli proteksi LifeSAVER!✨',
  voucherNotFound: 'Voucher tidak ditemukan',

  diskonVoucher: 'Diskon Voucher',
};
