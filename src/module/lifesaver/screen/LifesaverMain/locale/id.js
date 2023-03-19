import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

function textRed(text) {
  return (
    <Text
      textStyle="semi"
      line={22}
      color={Color.primary.light.primary60}
      size={Size.text.body2.size}>
      {text}
    </Text>
  );
}
function textItalic(text) {
  return (
    <Text textStyle="mediumItalic" line={22} size={Size.text.body2.size}>
      {text}
    </Text>
  );
}
function textBold(text) {
  return (
    <Text textStyle="semi" line={22} size={Size.text.body2.size}>
      {text}
    </Text>
  );
}
function textBoldItalic(text) {
  return (
    <Text textStyle="semiItalic" line={22} size={Size.text.body2.size}>
      {text}
    </Text>
  );
}

/* eslint-disable quotes */
export default {
  mulaiBerlangganan: 'Mulai Berlangganan',
  subscribe: 'Mulai Berlangganan',

  // nevergameover
  nevergameOverHashtag: '#NeverGameOver',
  continueHobby: 'Lanjutkan hobimu dengan rasa aman dengan proteksi LifeSAVER',

  // Lifesaver
  protectYou:
    'Melindungi kamu di segala jenis aktivitas, termasuk perjalanan dan olahraga ekstrem.',

  // total claim
  totalClaim: 'Total Claim Terbayarkan',

  // prices table
  fit: 'Fit',
  jt: 'Jt',
  bulan: 'bulan',
  lifeSaver: 'LifeSAVER',
  lifeSaverPlus: 'LifeSAVER+',
  fitPlus: 'Fit+',
  lindungiDiri: '#LindungiDiri\nsesuai pilihanmu',
  mulai: 'Mulai',
  upgrade: 'Upgrade',
  alreadyProtected: 'Kamu sudah terproteksi',
  alreadyLifesaverPlus: (
    <Text
      textStyle="semi"
      size={14}
      line={23.8}
      letterSpacing={0.5}
      align="center"
      color={Color.grayTitleButton.light.grayTitleButton}>
      Kamu Sudah Terproteksi Life
      <Text
        textStyle="semiItalic"
        size={14}
        line={23.8}
        letterSpacing={0.5}
        align="center"
        color={Color.grayTitleButton.light.grayTitleButton}>
        SAVER+
      </Text>
    </Text>
  ),

  manfaatAsuransi: 'Manfaat Asuransi',
  bln: '/bln',

  // terms and faq
  pengecualian: 'Pengecualian',
  kondisiYangSudahAda: 'Kondisi yang sudah ada sebelumnya',
  segalaPenyakit:
    'Segala penyakit, cedera maupun cacat yang sudah ada sebelumnya',
  tindakanYangDisengaja: 'Tindakan yang disengaja',
  segalaCederaAtau:
    'Segala cedera atau cacat akibat perbuatan yang disengaja seperti menyakiti diri sendiri.',
  tindakanKriminalAtau: 'Tindakan kriminal atau ilegal',
  segalaCederaAtauCacatAkibatAktivitasIlegal:
    'Segala cedera atau cacat akibat aktivitas ilegal atau kriminalitas.',
  pengecualianSelengkapnya:
    'Pengecualian selengkapnya ada di Ringkasan Informasi & Layanan (RIPLAY)',
  dalamPenggunaanCashless:
    '*Dalam pengunaan Cashless, maka Manfaat Asuransi Penggantian biaya ditetapkan masimal sebesar',
  totalMaksimumBiaya: 'Total Maksimum Biaya Pengobatan',
  butuhBantuan: 'Butuh bantuan dari IFG Life? Hubungi',
  customerCare: 'Customer Care',

  syaratDanKetentuan: 'Syarat dan Ketentuan',
  ringkasanInformasi: 'Ringkasan Informasi Produk & Layanan (RIPLAY)',

  ptAsuransiJiwa: 'PT Asuransi Jiwa IFG berizin dan diawasi oleh OJK.',

  // DIALOG
  // -- DialogCheckReferal
  kamuHarusDiundangOlehTeman: 'Kamu harus diundang oleh teman/kerabat kamu',
  andaTidakMemilikiReferal:
    'Kamu tidak memiliki referal. Ingin diingatkan saat sudah tersedia? Tekan Ingatkan.',
  punyaKode: 'Punya kode?',
  ingatkan: 'Ingatkan Saya',
  maafKamuBelumBisa: 'Maaf, Sementara Hanya untuk Akun Terundang',
  kamuBelumBisa:
    'Apakah kamu ingin diingatkan pada saat LifeSAVER sudah terbuka untuk umum?',
  tips: 'Tips: Kamu juga bisa meminta temanmu yang sudah terproteksi LifeSAVER untuk mengundangmu.',
  // -- DialogSuccessWaiting
  kembali: 'Kembali ke Beranda',
  pengingatBerhasil: 'Pengingat Berhasil!',
  nantiAkanKamiInfokan:
    'Notifikasi akan dikirimkan jika kamu sudah dapat membeli LifeSAVER.',
  // -- DialogBelumLogin
  tungguDuluKhususReferal: 'Tunggu dulu, khusus referal',
  udahPunyaReferalAtau:
    'Udah punya referal atau ingin diingatkan nanti? Silakan masuk atau buat akun kamu.',
  masuk: 'Masuk',
  belumPunyaAkun: 'Belum punya akun?',
  daftar: 'Daftar',

  // -- Dialog EKYC
  yukVerifikasiData: 'Sebelum berlangganan kamu harus Verifikasi Dulu',
  katanyaTakKenal:
    'Katanya tak kenal maka tak sayang, kenalan singkat kita bisa membuka banyak fitur spesial hanya untuk sahabat LifeFriends loh!',
  nantiDulu: 'Batalkan',
  yuk: 'Yuk!',

  selamaPerioderPromosi: '*selama periode promosi',

  // -- Dialog medical protection
  InfoProteksiMedis: 'Info Proteksi Medis',
  manfaatUtama: 'Manfaat Utama :',
  proteksiMedisAkibatKecelakaan: 'Proteksi medis akibat kecelakaan',
  sampaiDengan: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Sampai dengan {textRed('200 juta')} atau {textRed('400 juta')}, tergantung
      paket yang kamu pilih dan dapat dilakukan secara {textItalic('cashless')}{' '}
      atau{textItalic(' reimbursement')}
      {textRed('*')}.
    </Text>
  ),
  manfaatPilihan: (
    <Text textStyle="semi" line={30} size={Size.text.body2.size}>
      Manfaat Pilihan{textRed('**')}:
    </Text>
  ),
  proteksiMedisCedera: 'Proteksi medis cedera olahraga',
  sebesar: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Sebesar {textRed('20 juta')}, hanya dapat dilakukan secara
      {textItalic(' cashless')} atau {textItalic('reimbursement')}
      {textRed('*')}
    </Text>
  ),
  fisioterapi: 'Fisioterapi',
  fisioterapiSebesar: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Sebesar {textRed('10 juta')}, hanya dapat dilakukan secara{' '}
      {textItalic('cashless')}.
    </Text>
  ),
  berlakuInnerLimit: (
    <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
      {textRed('*')}Berlaku inner limit untuk metode reimbursement
    </Text>
  ),
  selamaPerioderPromosi2: (
    <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
      {textRed('**')}Manfaat pilihan berupa Proteksi Medis Cedera Olahraga dan
      Fisioterapi ditawarkan secara bundling hanya saat periode promosi.
    </Text>
  ),

  // SCROLL ITEM ONE
  startYourGameStronger: 'Start Your Day, Stronger.',
  // SCROLL ITEM TWO
  oneForAll: 'ONE FOR ALL',
  lifeSaverMelindungiKamu:
    ' melindungi kamu di segala jenis aktivitas, termasuk perjalanan dan olahraga ekstrem.',
  selainMemproteksiDiri:
    'Selain memproteksi diri sendiri, kamu juga turut berpartisipasi untuk saling memproteksi peserta yang lain.',
  aktivitasYangTerproteksi: 'Aktivitas yang terproteksi',
  // SCROLL ITEM THREE
  wellHelpYou: `WE'LL HELP YOU HEAL.`,
  denganBiayaBerlangganan: 'Dengan biaya berlangganan yang sangat terjangkau, ',
  memberikanCoverage:
    ' memberikan coverage biaya pengobatan terbaik di Indonesia saat kamu mengalami cedera berat atau ringan karena kecelakaan.',
  selainCederaKarena: 'Selain cedera karena kecelakaan, ',
  jugaMengCover: ' juga meng-cover cedera akibat aktivitas berolahraga.*',
  LihatProteksiMedis: 'Lihat proteksi medis',
  // SCROLL ITEM FOUR
  DimanapunKamu: 'Dimanapun kamu berada, ',
  SelaluSiap:
    ' selalu siap melindungi kamu. Dalam keadaan darurat, kamu dapat berobat lebih cepat dan',
  di: 'di',
  seribu: ' 1000+ Rumah Sakit dan Klinik di Indonesia.',
  apabilaDibutuhkan:
    'Apabila dibutuhkan, kamu juga bisa memanggil ambulans* dengan mudah melalui aplikasi Life by IFG.',
  DaftarRsKlinik: 'Daftar Rumah Sakit dan Klinik',

  //Pengecualian:
  OlahragaEkstrem: 'Olahraga ekstrem yang tidak tercover',

  //PriceTable:
  pilihProteksi: 'Pilih Proteksimu',
  manfaatUtama2: 'Manfaat Utama',
  ProteksiMedisKecelakaan: 'Proteksi Medis Kecelakaan',
  MeninggalCacat: 'Meninggal/Cacat Tetap',
  KecelakaanOlahragaAir: 'Kecelakaan Olahraga Air',
  ManfaatPilihan2: 'Manfaat Pilihan',
  Ambulans: 'Ambulans',
  empatSembilan: '49rb/bulan',
  sembilanSembilan: '99rb/bulan',
  klikUntukLihat: 'Klik untuk lihat manfaat lebih lengkap',
  SelamaPeriode:
    'Selama periode promo, manfaat pilihan diberikan secara bundling bersama manfaat utama',
  rp10jt: '10 Jt',
  rp20jt: '20 Jt',
  rp40jt: '40 Jt',
  rp200jt: '200 Jt',
  rp400jt: '400 Jt',

  // SCROLL ITEM TWO POPUP
  infoAktivitasTerproteksi: 'Info Aktivitas yang Terproteksi',
  Khusus: 'Khusus ',
  Air: 'Air',
  Darat: 'Darat',
  Perjalanan: 'Perjalanan',
  Udara: 'Udara',
  melindungi: ' melindungi kamu di aktivitas berikut:',

  // MODAL LIST RS
  DataRs: 'Data Rumah Sakit dan Klinik',
  DataTidakDitemukan: 'Data tidak ditemukan',
  CariBerdasarkan: 'Cari Berdasarkan Kota/Provinsi/Nama RS',
  Contoh: 'Contoh "Jakarta" atau "RS Bumi"',
  UrutkanBerdasarkan: 'Urutkan berdasarkan',
  untukPemilik: 'Untuk pemilik proteksi ',
  proteksiLifesaver:
    ', kamu dapat menemukan daftar Rumah Sakit dan Klinik terdekat jika terjadi sesuatu yang darurat. ',
  HOSPITAL: 'Rumah Sakit',
  PHARMACHY: 'Apotek',
  CLINIC: 'Klinik',
  LAB: 'Laboratorium',
  OPTIC: 'Optik',
  DENTAL: 'Klinik Gigi',
  ALL: 'Semua',

  // modal benefit information
  dialogBenefitInformation: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Khusus {textBold('Fisioterapi')} hanya bisa di claim dengan metode
      {textItalic(' cashless.')}
    </Text>
  ),
  //MODAL BENEFIT
  infoManfaat: 'Info Manfaat',
  dengan: 'Dengan ',
  klinikRekanan:
    ', kamu bisa melakukan perawatan medis tanpa menggunakan uang tunai di Rumah Sakit atau Klinik rekanan.',
  khusus2: ' Khusus ',
  hanyaBisa: ' hanya bisa diklaim dengan metode',
  metode: '',
  apabilaBiaya: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Apabila biaya perawatan tidak bisa dilayani, maka lakukan claim secara
      {textItalic(' reimburse')}, dan berlaku {textBoldItalic('inner limit')}
      {textRed('*')} yang dapat dilihat di detail manfaat dan maksimum proses
      claim adalah 30 hari.
    </Text>
  ),

  yangDapat:
    ' yang dapat dilihat di detail manfaat dan maksimum proses klaim adalah 30 hari.',
  batasan:
    'Batasan setiap manfaat dari perawatan medis yang dibayarkan oleh pihak IFG Life.',
  mekanisme: 'Mekanisme pengajuan klaim reimbursement dapat dilihat di ',

  //MODAL DAFTAR OLAHRAGA AIR
  daftarOlahragaAir: 'Daftar Olahraga Air',
  daftarOlahRagaTerproteksi: 'Daftar Olahraga Air yang terproteksi dengan ',

  //MODAL DETAIL
  batasan2:
    'Batasan setiap manfaat dari perawatan medis yang dibayarkan oleh pihak IFG Life.',

  faq: (
    <Text
      textStyle="bold"
      size={Size.text.caption1.size}
      line={21}
      align="left">
      Pertanyaan Umum Life
      <Text
        textStyle="boldItalic"
        size={Size.text.caption1.size}
        line={21}
        align="left">
        SAVER
      </Text>
    </Text>
  ),
  beliProteksiUntuk: 'Beli Proteksi Untuk Kerabatmu',
};
