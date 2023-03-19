import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';

export default {
  // MENU LIST
  pembayaran: 'Payment',
  aturPembayaran: 'Manage Payment',
  personalData: 'Personal Data',
  ubahProfile: 'Edit Profile',
  keamanan: 'Security',
  kelolaKataSandi: 'Manage your password and security',
  bantuan: 'Help',
  pertolonganPertamaUntuk: 'Find more about this app',
  bahasa: 'Language',
  pemilihanBahasaDalam: 'Choose app language',
  verifikasi: 'Verification',
  verifikasiDataDiri: 'Verify your personal data',
  metodePembayaran: 'Payment',
  untukMempermudahPembayaran: 'To make payment easier',
  daftarAlamat: 'Address',
  aturDaftarAlamat: 'Set address',
  keluarAkun: 'Logout',
  keluarDariAkun: 'Logout from your account',
  langgananSaya: 'My subscription',
  kelolaTagihan: 'Manage your bill',
  edit: 'Edit',
  versi: 'Version',
  profileLifeTag: 'My LifeTag Profile',
  aturLifeTag: 'Setup My LifeTag',

  // renderHeaderContainer
  profile: 'Profile',
  kodeReferralSaya: 'My Refferal Code',

  // modal polis non active

  oops: 'Opps :( ',
  tidakBisaAksesLifetag: 'You Cannot be Accessed LifeTag',
  contentModalPolisNotActive: (
    <Text align="center" textStyle="regular" line={21}>
      To activate your LifeTag again, let's renew your{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      subscription
    </Text>
  ),

  maafTidakBisaAksesLifetag: 'Sorry, LifeTag Cannot be Accessed',
  contentModalPolisNotEkyc: (
    <Text align="center" textStyle="regular" line={21}>
      Please{' '}
      <Text textStyle="bold" size={Size.text.body2.size}>
        Verify Personal Data
      </Text>{' '}
      so you can access LifeTag easily.
    </Text>
  ),
  verifikasiData: 'Verify Personal Data Now',
  berlanggananKembali: 'Resubscribe',
  lihatProteksiLifesaver: 'View LifeSAVER Protection',

  // renderLogoutModal
  keluarDariLife: 'Logout from your device?',
  yakinKamuIngin: 'Are you sure you want to logout from this device?',
  kembali: 'Back',
  keluar: 'Logout',

  // renderWidgetMpin
  ayoAktivasiMpin:
    'Come on, activate your PIN to increase the security of your account.',
  aktivasiMpin: 'PIN Activation',
  copied: 'Copied!',
  syarat: 'Terms & Conditions',
  nikmatiFitur: 'Enjoy Your Premium Features',
};
