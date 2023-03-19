import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';

export default {
  // MENU LIST
  pembayaran: 'Pembayaran',
  aturPembayaran: 'Atur pilihan pembayaran',
  personalData: 'Data Pribadi',
  ubahProfile: 'Ubah Profil',
  keamanan: 'Keamanan',
  kelolaKataSandi: 'Kelola sandi dan keamanan Kamu',
  bantuan: 'Bantuan',
  pertolonganPertamaUntuk: 'Bantuan penggunaan aplikasi',
  bahasa: 'Bahasa',
  pemilihanBahasaDalam: 'Pilih bahasa dalam aplikasi',
  verifikasi: 'Verifikasi',
  verifikasiDataDiri: 'Verifikasi data diri Kamu',
  metodePembayaran: 'Pembayaran',
  untukMempermudahPembayaran: 'Atur pilihan pembayaran ',
  daftarAlamat: 'Daftar Alamat',
  aturDaftarAlamat: 'Atur daftar alamat Kamu',
  keluarAkun: 'Keluar',
  keluarDariAkun: 'Keluar dari akun Kamu',
  langgananSaya: 'Langganan Saya',
  kelolaTagihan: 'Kelola tagihanmu',
  edit: 'Ubah',
  versi: 'Versi',
  profileLifeTag: 'Profil LifeTag Saya',
  aturLifeTag: 'Atur LifeTag Saya',

  // renderHeaderContainer
  profile: 'Profil',
  kodeReferralSaya: 'Kode Referral Saya',

  // renderLogoutModal
  keluarDariLife: 'Keluar dari Perangkat?',
  yakinKamuIngin: 'Apa Kamu yakin ingin keluar dari perangkat yang digunakan?',
  kembali: 'Kembali',
  keluar: 'Keluar',

  // renderWidgetMpin
  ayoAktivasiMpin: 'Ayo aktivasi PIN untuk meningkatkan keamanan akun kamu.',
  aktivasiMpin: 'Aktivasi PIN',

  // modal polis not active
  oops: 'Opps :( ',
  tidakBisaAksesLifetag: 'Kamu tidak bisa akses LifeTag',

  contentModalPolisNotActive: (
    <Text align="center" textStyle="regular" line={21}>
      Untuk mengaktifkan LifeTag Kamu kembali, yuk perpanjang langganan{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      kamu!
    </Text>
  ),
  berlanggananKembali: 'Berlangganan Kembali',
  lihatProteksiLifesaver: 'Lihat Proteksi LifeSAVER',
  maafTidakBisaAksesLifetag: 'Maaf, LifeTag tidak bisa diakses',
  contentModalPolisNotEkyc: (
    <Text align="center" textStyle="regular" line={21}>
      Lakukan{' '}
      <Text textStyle="bold" size={Size.text.body2.size}>
        Verifikasi Data Diri
      </Text>{' '}
      dahulu agar Kamu bisa mengakses LifeTag dengan mudah.
    </Text>
  ),
  verifikasiData: 'Verifikasi Data Diri Sekarang',
  copied: 'Tersalin!',
  syarat: 'Syarat & Ketentuan',
  nikmatiFitur: 'Nikmati Fitur Premium',
};
