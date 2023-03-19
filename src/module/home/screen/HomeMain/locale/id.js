import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import style from '../style';

export default {
  totalNilaiTunai: 'Total Nilai Tunai',
  cekNomorPolisKamu: 'Cek Nomor\nPolis Kamu',
  cekNomorPolis: 'Cek Nomor Polis',
  apakahKamuPerlu: 'Apakah Kamu\nPerlu\nBantuan?',
  cekBantuan: 'Cek Bantuan',
  pentingUntukmu: 'Penting Untukmu',
  lihatSemua: 'Lihat Semua',
  lihatDetailPolis: 'Polis Kamu Kosong',
  silakan: 'Silakan ',
  login: 'Login',
  atau: ' / ',
  register: 'Registrasi',
  untukMelihatPolis: 'untuk melihat polis yang Kamu miliki.',
  silakanMasukkanNomor: 'Silakan masukkan nomor polismu ',
  polisKamu: 'Polis Kamu',
  pengkinianData: 'Konfirmasi Keabsahan Penerima Manfaat',
  yukVerifikasiData: 'Verifikasi Data Dirimu Sekarang!',
  katanyaTakKenal:
    'Katanya tak kenal maka tak sayang, kenalan singkat kita bisa membuka banyak fitur spesial hanya untuk sahabat LifeFriends loh!',
  nantiDulu: 'Lewati',
  yuk: 'Yuk!',

  yukLakukanPengkinian: 'Yuk, Konfirmasi Keabsahan Penerima Manfaat Sekarang',
  pengkinianKamuTerakhir:
    'Konfirmasi Keabsahan Penerima Manfaat terakhir IFG Anuitas Prima dilakukan pada ',
  segeraLakukanPengkinian:
    '. Konfirmasi kembali agar Kamu selalu mendapatkan informasi terkini tentang polis Kamu.',
  andaBelumPernahMelakukan:
    'Kamu belum pernah melakukan konfirmasi, segera lakukan konfirmasi keabsahan penerima manfaat sekarang',
  lewatiPengkinian: 'Lewati',
  mulaiPengkinian: 'Mulai KKPM',
  // Alter Modal Success
  selamatKamuBerhasilMelakukan:
    'Selamat, Kamu berhasil melakukan konfirmasi keabsahan penerima manfaat!',
  terimaKasihTelah:
    'Terima kasih telah melakukan konfirmasi keabsahan penerima manfaat. Nikmati informasi terkini tentang polis Kamu.',
  ok: 'OK!',

  // Alter Modal Fail
  dataKamuTidak: 'Data Kamu tidak cocok dengan\nKK atau KTP',
  silahkanLakukanPengkinian:
    'Silakan lakukan konfirmasi keabsahan penerima manfaat kembali',
  ulangPengkinian: 'Konfirmasi Keabsahan Penerima Manfaat',
  manfaatBertahap: 'Manfaat Bertahap Selanjutnya',
  verifikasiSekarang:
    'Kamu belum Terverifikasi nih, Ayo Verifikasi Data Dirimu Sekarang!!',
  manfaatSelanjutnya: 'Manfaat Selanjutnya',

  // renderChangePhoneModal
  masukkanNomorPonsel: 'Masukkan Nomor Ponsel Kamu',
  ayoTingkatkanKeamanan:
    'Ayo tingkatkan keamanan akun Kamu dengan verifikasi nomor ponsel',
  nomorPonsel: 'Nomor Ponsel',
  simpan: 'Simpan',
  phoneNumberRequired: 'Nomor Ponsel wajib diisi',
  phoneNumberInvalid: 'Nomor Ponsel tidak valid',
  nomorHPTerdaftar:
    'Nomor HP Kamu sudah terdaftar, jika nomor HP tersebut milik Kamu silakan Login',
  login2: 'Login',
  kodeNegaraTidakTerdaftar: 'Maaf, kode negara tidak terdaftar',

  // renderTooFrequentlyModal
  andaTerlaluSering: 'Kamu terlalu sering meminta OTP',
  untukSementaraWaktu:
    'Untuk sementara waktu Kamu tidak dapat meminta kode OTP. Silakan tunggu selama ',
  cobaLagi: 'Coba Lagi',

  // renderMenu
  rsDanKlinik: 'RS dan Klinik',
  faq: 'Bantuan',
  lifeCard: 'LifeCARD',
  event: 'Event',

  // renderAppGuide
  appGuideLine1: 'Panduan',
  appGuideLine2: 'Aplikasi',
  appGuideLine3: 'Disini!',
  featureGuide: 'Panduan Fitur',

  // renderPolisRestructurisation
  restrukturisasiLine1: 'Informasi',
  restrukturisasiLine2: 'Restrukturisasi',
  restrukturisasiLine3: 'Polis',

  // renderContentCard
  bagaimana: 'Bagaimana',
  cara: 'Cara',
  klaim: 'Klaim?',
  klaimAsuransi: 'Klaim asuransi',
  caraKlaim: 'Klaim Asuransi',
  informasi1: 'Cara Klaim',
  restukturisasi: 'Restrukturisasi',
  polis1: 'Polis',
  restrukturisasiPolis: 'Restrukturisasi Polis',
  informasi2: 'Informasi',
  informasi3: 'Polis',

  // renderWidgetBajoRun
  terlindungiOleh: 'Selamat! Kamu sudah terlindungi oleh ',
  bebasBeraktifitas: ' Sekarang, Kamu bisa bebas beraktifitas tanpa ragu.',
  daftar: 'Daftar disini',

  // renderWidgetInvited
  mengundang: ' mengundang Kamu untuk terproteksi ',
  mulaiSekarang: 'Mulai Sekarang',

  // renderHaveNotPolisCard
  polisKamuKosong: 'Polis Kamu Kosong',
  oopsKamuBelum: 'Oops! Kamu belum memiliki polis. Yuk ',
  cariProteksi: 'cari proteksi',
  yangCocokUntuk: ' yang cocok untuk Kamu.',
  silakanVerifikasiDiri: 'Silakan Verifikasi Diri Kamu ',
  disini: 'disini',
  kontenGagalDiTampilkan: 'Konten gagal ditampilkan',
  muatUlang: 'Muat Ulang',
  invite: 'Ajak Teman',
  inviteUser: (
    <Text>
      <Text textStyle="semi" size={Size.text.caption1.size}>
        Ajak teman
      </Text>{' '}
      <Text
        textStyle="medium"
        size={Size.text.caption1.size}
        letterSpacing={0.4}>
        untuk saling terproteksi{' '}
      </Text>
      Life
      <Text textStyle="italic" fontWeight="800">
        SAVER
      </Text>
      !
    </Text>
  ),

  // renderLifecardModal
  untukKamuYang: 'Untuk Kamu yang Sudah Berlangganan',
  lifeCardDapatDiakses: 'LifeCARD dapat diakses jika berlangganan proteksi ',
  kembali: 'Kembali',
  lihatProteksiLifesaver: 'Lihat Proteksi LifeSAVER',

  // renderWidgetActivatedLifeSAVER
  selamatKamuMendapatkan: 'Selamat! Kamu mendapatkan proteksi ',
  gratisUntukSatu: ' gratis untuk satu bulan pertama. Ayo aktivasi sekarang.',
  daftarDisini: 'Daftar disini',

  // renderWidgetLifeTag
  siapDihubungkan: (
    <Text size={Size.text.caption1.size}>
      Agar aktivitas Kamu lebih aman dan nyaman, yuk hubungkan{' '}
      <Text style={style.ml10} textStyle="bold" size={Size.text.caption1.size}>
        LifeTag
      </Text>{' '}
      Kamu sekarang!
    </Text>
  ),
  hubungkanLifetag: 'Hubungkan',
  hasLiveSaver: (
    <Text size={Size.text.caption1.size}>
      Kamu sudah bisa mendapatkan{' '}
      <Text style={style.ml10} textStyle="bold" size={Size.text.caption1.size}>
        LifeTag
      </Text>
      , yuk beli sekarang!
    </Text>
  ),
  dapatkanLifetag: 'Dapatkan LifeTag',

  // renderWidgetKYC
  verifikasiSekarangKyc:
    'Kamu belum Terverifikasi nih, Ayo Verifikasi Data Dirimu Sekarang!!',
  verifikasiYuk: 'Verifikasi yuk!',
  // renderHighlightEvent
  sorotan: 'Sorotan',
  limitedEventModalTitle: 'Limited Event',
  eventIniDiperuntukan:
    'Event ini diperuntukan untuk komunitas tertentu dan bersifat privat',
  masukkanKodeEvent: 'Masukkan kode event',
  masukkanKodeDisini: 'Masukkan kode disini',
  kodeYangKamu: 'Kode yang Kamu masukkan salah',
  lanjutkan: 'Lanjutkan',
  lihatEvent: 'Lihat Event',

  // renderWidgetPayment
  selesaikanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      Tinggal selangkah lagi sebelum Kamu terproteksi{' '}
      <Text
        style={style.ml10}
        textStyle="medium"
        size={Size.text.caption1.size}>
        Life
        <Text
          style={style.ml10}
          textStyle="mediumItalic"
          size={Size.text.caption1.size}>
          SAVER
        </Text>
      </Text>
      .
    </Text>
  ),
  lihatPembayaran: 'Bayar Sekarang',

  // renderWidgetPayment mode 2
  mohonLakukanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      <Text
        style={style.ml10}
        textStyle="medium"
        size={Size.text.caption1.size}>
        Life
        <Text
          style={style.ml10}
          textStyle="mediumItalic"
          size={Size.text.caption1.size}>
          SAVER
        </Text>
      </Text>
      -mu akan segera berakhir, lakukan pembayaran sebelum tanggal{' '}
    </Text>
  ),
  ayoLanjutkan: ', ayo lanjutkan proteksi Kamu dengan klik tombol di bawah',

  // renderWidgetPayment mode 3
  segeraSelesaikanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      Lakukan pembayaran sekarang agar{' '}
      <Text
        style={style.ml10}
        textStyle="medium"
        size={Size.text.caption1.size}>
        Life
        <Text
          style={style.ml10}
          textStyle="mediumItalic"
          size={Size.text.caption1.size}>
          SAVER
        </Text>
      </Text>
      -mu aktif kembali!
    </Text>
  ),

  // renderWidgetReEkyc
  verifikasiDataDiriKamu:
    'Verifikasi data diri Kamu belum berhasil nih, lakukan verifikasi ulang!',
  verifikasiUlang: 'Verifikasi Ulang',

  // clientCode
  PHT: 'Peserta Pensiunan',
  PJD: 'Penerima Manfaat Janda/Duda',
  PDD: 'Penerima Manfaat Janda/Duda',
  PYP: 'Penerima Manfaat Yatim/Piatu',

  // TOTAL CLAIM
  periode: 'Periode',
  berlakuSeluruhProduk:
    '* Berlaku untuk seluruh Polis yang di migrasi ke IFG Life dan Produk-Produk Baru IFG Life ',

  // KKPM WIDGET
  kamuBelumMelakukan:
    'Kamu belum melakukan konfirmasi keabsahan penerima manfaat, segera lakukan konfirmasi agar manfaat',
  kamuTetapBerlanjut: 'kamu tetap berlanjut',
  // Pengkinian Widget
  pengkinianTerakhir: 'Konfirmasi keabsahan penerima manfaat terakhir',
  lakukanPengkinianData:
    ' Segera lakukan konfirmasi agar manfaat polis Kamu tetap berlanjut.',

  // renderWidgetLiveness
  lakukanVerifikasiWajah: (
    <Text
      textStyle="medium"
      size={Size.text.caption1.size - 2}
      letterSpacing={0.4}>
      Kamu sudah terproteksi{' '}
      <Text textStyle="semi" size={Size.text.caption1.size - 2}>
        Life
        <Text textStyle="semiItalic" size={Size.text.caption1.size - 2}>
          SAVER
        </Text>
      </Text>
      , yuk lakukan{' '}
      <Text textStyle="semi" size={Size.text.caption1.size - 2}>
        Verifikasi Wajah
      </Text>{' '}
      untuk memudahkanmu klaim di Rumah Sakit
    </Text>
  ),
  mulaiSekarangLiveness: 'Mulai Sekarang',

  loginCapital: 'Login',
  registerCapital: 'Register',
  or: 'atau',
  toEnjoyFullFeature: 'untuk menikmati fitur lengkap kami',

  // Articles
  lifeArticles: 'Life Articles',
  nanti: 'Nanti',
};
