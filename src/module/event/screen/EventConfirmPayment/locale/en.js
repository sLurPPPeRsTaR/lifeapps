import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  // header
  konfirmasi: 'Confirmation',
  // eventdetailinfo
  hargaTiket: 'Ticket Price',
  tanggalEvent: 'Date',
  waktuEvent: 'Time',
  lokasiEvent: 'Location',
  durasiProteksi: 'Protection Period',
  jatuhTempoBerikutnya: 'Next Due',

  // user info
  dataDiri: 'Personal Data',
  berdasarkanAkun: 'Based on Your Own Account',
  nik: 'ID Card',
  tglLahir: 'Date of Birth',

  // input voucher
  punyaVoucher: 'Has Voucher?',
  masukkankodeVoucher: 'Input Voucher Code',
  gunakan: 'Use',
  hapus: 'Delete',

  // referral code
  punyaReferral: 'Has Referral Code?',
  masukkankodeReferral: 'Input Referral Code',

  // summary total
  ringkasanPembayaran: 'Payment Summary',
  diskon: 'Ticket Discount',
  tiket: 'Ticket',
  perpanjangan: 'Renewal of Life',
  perpanjanganPolis: "for Policy Renewal on each next month's due date ",
  life: 'Life',
  saver: 'SAVER',
  saverPlus: 'SAVER+',
  total: 'Total',
  pembayaranSetiapBulan: 'Periodic payments every month',
  kamuDapatBerhenti: 'You can stop subscription whenever.',
  bayarSekarang: 'Pay Now',

  // Alert Dialogue Grace Period
  informasiPolis: ' Policy information :',
  infoPeriode: ' Policy Protection Period Information : ',
  infoPerpanjangan: ' Extend policy info ',
  kamuAkan: "You'll be charged",
  padaBulan: 'on the next month',
  agarTetapProteksi:
    'The Policy Protection Period may change according to the time of Premium payment received ',
  periodeProteksi:
    'The Policy Protection Period may change according to the time the Premium payment is received.',
  pastikanUntuk:
    'Please ensure to complete the Payment as soon as possible to avoid the Grace Period has ended.',
  apabilaKamu:
    'If you complete the payment after the Grace Period has ended, then it will be considered as New Policy purchase.',
  proteksiMedis: (
    <Text
      textStyle="medium"
      size={Size.text.caption2.size}
      line={18}
      color={Color.neutral.light.neutral60}>
      Waiting period for Medical Protection other than Death due to an accident
      started since
      <Text
        textStyle="semi"
        size={Size.text.caption2.size}
        color={Color.neutral.light.neutral60}>
        {' '}
        24 hours{' '}
      </Text>
      after the policy is active.
    </Text>
  ),
  proteksiMedisCedera: (
    <Text
      textStyle="medium"
      size={Size.text.caption1.size}
      line={18}
      color={Color.neutral.light.neutral60}>
      The waiting period for Sports Injury Protection begins
      <Text
        textStyle="semi"
        size={Size.text.caption1.size}
        color={Color.neutral.light.neutral60}>
        {' '}
        5 days{' '}
      </Text>
      after the policy is active.
    </Text>
  ),
  selamat: 'Congratulations! Because you purchased a',
  membeli: 'purchased ',
  pemegang: 'holder of ',
  produk:
    'LifeSAVER product, you are entitled to Jakarta LifeFest 2023 Ticket Discount.',
  discountLS:
    'Yeay! As a LifeSAVER policyholder, you get a discounted ticket! 🥳',
  discountHasntLS:
    'Wooooozzzz! Purchase LifeFest ticket, get a discounted ticket with LifeSAVER protection!✨',

  voucherNotFound: 'Voucher Not Found',
  diskonVoucher: 'Voucher Discount',
};
