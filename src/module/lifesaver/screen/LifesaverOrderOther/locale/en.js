import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';

export default {
  konfirmasi: 'Confirmation',
  bulan: 'month',
  durasiProteksi: 'Protection Duration',
  jatuhTempoBerikutnya: 'Next Due',
  diundangOleh: 'Invited By',
  // infoTunggu
  infoTunggu: 'Wating periode information',
  proteksiMedis:
    'Medical protection other than death due to an accident begins',
  jam: 'hours',
  hari: 'days',
  setelahAktif: 'after the policy is active',
  setelahUpgrade: 'after the upgrade transaction',
  proteksiCedera: 'Sports injury protection starts',
  infoTungguUpgrade: 'Waiting period information for the new package ',
  // AttentionUpgrade
  selamaMasaTunggu: 'During the waiting period for the upgrade package,',
  kamuMasih: 'you are still protected',
  manfaatPaketSebelumnya: 'with the benefits of the previous package.',
  // Personal Data
  personalData: 'Personal Data',
  nik: 'ID Card',
  asYourPersonal: 'Based on personal account',
  tglLahir: 'Date of Birth',
  // Total
  total: 'Total',
  pembayaranSetiapBulan: 'Periodic payments every month',
  startSubscribe: 'Take a Pay Now',
  gratis: 'FREE',
  bulanBerikutnya: 'bulan berikutnya',
  bulanBerlakuMulai: 'month starts from',
  kamuAkan: "You'll be charged",
  lanjut: 'Next',
  totalPayments: 'Total Payment',
  // Discount
  totalHarga: 'Total Price',
  '1Bulan': '1 Month',
  potonganHarga: 'Discounts',
  // Premi
  hargaPaketBaru: 'New package price',
  sisaPremiLama: 'Remaining package premium',
  biayaUpgrade: 'Upgrade fee',
  // paymentMethod
  kartuSaya: 'My Credit/Debit Card',
  tambahkan: ' ',
  kreditDebit: 'Add Credit/Debit Card',
  gagal: 'Gagal',
  denganMenginput:
    'By inputing the following information, i agree to share the data according to the',
  kebijakanPrivasi: 'Kebijakan Privasi',
  tAndCPayment: 'Payment Terms and Conditions.',
  simpanSebagai: 'Save as (Optional)',
  nomorKartu: 'Credit/Debit Card Number',
  nomorKartuPlaceholder: 'Example: 1234 5678 9012 3256',
  masaBerlaku: 'Expiry Date',
  masaBerlakuPlaceholder: 'MM / YY',
  CVVPlaceholder: '123',
  belumAdaKartu: "You haven't added a Card ",
  tambahKartu: 'Credit/Debit Card',
  kartuTidakValid: 'Invalid Card',
  formatBulanTidakValid: 'Invalid month',
  formatTglTidakValid: 'Format MM/YY',
  cardExpired: 'Card has expired',
  namaKartu: 'Nama Kartu',
  namaKartuPlaceholder: 'Example: BCA',
  pembayaran: 'Payment',
  masukanCvv: 'Enter CVV',
  silahkanMasukanCvv: 'Please enter your CVV at back your card',
  debitOtomatis:
    'Automatic debit is only supported by VISA and Mastercard credit cards, and BNI debit cards.',
  metodeLainnya: 'Other Method',
  utama: 'Main',

  // renderLifetagContent
  dapatkanLifetag: 'Get LifeTag!',
  jadilahLifesaver: 'Become LifeSAVER for your friends!',
  pilihWarna: 'Choose Color',
  jumlah: 'Quantity',
  rincianPembayaran: 'Payment Details',
  warna: 'Color',
  kodepos: 'Postal Code',
  masukanKodePos: 'Input postal code',
  mohonlengkapi: 'Please fill postal code',
  gagalMenambahkanPostalCode: 'Failed to add postal code',
  diskon: 'Discount',

  // renderLifetagAddress
  alamatPengiriman: 'Recipient Address',
  rumah: 'Home',
  pilihAlamatLain: 'Choose Another Address',
  informasi: 'Information',
  estimasi1: 'Estimated delivery',
  estimasi2: '2-4 working days',
  estimasi3: ', depending on your delivery area.',
  tambahAlamat: 'Add Address',

  // Modal Error Submission
  mohonMaaf: 'Sorry',
  kembali: 'Back',
  hubCustomerCare: 'Contact Customer Care',
  AGE_OVER_69: 'Insured ages must be 18 - 69 years old',
  AGE_UNDER_18: 'Insured ages must be 18 - 69 years old',
  ALREADY_HAVE_ACTIVE_POLICY: 'You have subscribed to LifeSAVER',
  DOB_IS_EMPTY: 'Date of birth is blank. Please re-verify your personal data.',
  EKYC_PHONE_EMAIL_IS_EMPTY_AT_LEAST_ONE_FILLED:
    'Email / Mobile Number is empty. Please contact Customer Care',
  INVALID_PARAM:
    'An error occurred (ERR Code : INVALID PARAM). Please contact Customer Care',
  INVALID_TRANSACTION_ID:
    'An error occurred (ERR Code : INVALID TRANSACTION ID). Please contact Customer Care',
  PAYMENT_STATUS_FAILED_OR_PAYLOAD_NOT_FOUND:
    'An error occurred (ERR Code : PAYMENT_STATUS FAILED _OR_PAYLOAD _NOT_FOUND). Please contact Customer Care',
  POLICY_ALREADY_ACTIVE: 'You have subscribed to LifeSAVER',
  POLICY_IN_SUBMIT_STATUS_NOT_FOUND:
    'The ID you entered is not found in the IFG Labuan Bajo Marathon participant list.',
  POLICY_IN_SUBMIT_STATUS_NOT_FOUND_TIPS:
    'Tips: you can do re-registration and make sure you use the same ID card that you used to register yourself at IFG Labuan Bajo Marathon.',
  POLICY_ALREADY_LAPSED: 'Your policy has already not active',
  POLICY_ALREADY_TERMINATE:
    "Sorry, you can't be protected by this product at this time.",
  POLICY_ALREADY_UNSUBSCRIBE: 'You have already unsubscribe this protection',
  POLICY_NO_IS_REQUIRED: 'Policy Number is empty',
  POLICY_NOT_ACTIVE: 'You cannot unsubscribe because policy is not active',
  TRANSACTION_ID_NOT_MATCH: 'Transaction ID is not found',
  USER_NOT_FOUND: 'Policy Holder is not found',
  VALID_FRAUD:
    'Thank you for choosing LifeSAVER. After several consideration, we would like to inform that your requested cannot be received.',
  PROPOSAL_POLICY_ALREADY_EXIST: 'You have subscribed LifeSAVER',
  ERROR_DEFAULT:
    'Problem has occurred. Please try again or contact Customer Care.',

  beliProteksi: (
    <Text size={Size.text.body1.size} color={Color.primary.light.primary90}>
      Beli proteksi Life
      <Text
        textStyle="italic"
        size={Size.text.body1.size}
        color={Color.primary.light.primary90}>
        SAVER+
      </Text>{' '}
      untuk kerabatmu
    </Text>
  ),

  // regex
  mohonPeriksaKembali: 'Mohon periksa kembali penulisan nama kamu.',
  nikTidakSesuai: 'Maaf, NIK tidak sesuai format (gunakan 16 digit angka)',
  numberInvalid: 'Make sure the new number is correct',
  invitationLimit:
    'Kamu telah mencapai batas maksimal pemberian proteksi untuk orang tersayangmu',
};
