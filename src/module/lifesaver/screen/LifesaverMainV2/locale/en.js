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
  mulaiBerlangganan: 'Get Started',
  subscribe: 'Subscribe',

  // nevergameover
  nevergameOverHashtag: '#NeverGameOver',

  // prices table
  fit: 'Fit',
  lifeSaver: 'LifeSAVER',
  lifeSaverPlus: 'LifeSAVER+',
  fitPlus: 'Fit+',
  lindungiDiri: '#LindungiDiri\nsesuai pilihanmu',
  mulai: 'Mulai',
  upgrade: 'Upgrade',
  alreadyLifesaverPlus: (
    <Text
      textStyle="semi"
      size={14}
      line={23.8}
      letterSpacing={0.5}
      align="center"
      color={Color.grayTitleButton.light.grayTitleButton}>
      You're Already Protected by Life
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
  pengecualian: 'Exclusions',
  kondisiYangSudahAda: 'Pre-existing conditions',
  segalaPenyakit:
    'Segala penyakit, cedera maupun cacat yang sudah ada sebelumnya',
  tindakanYangDisengaja: 'Deliberate action',
  segalaCederaAtau:
    'Segala cedera atau cacat akibat perbuatan yang disengaja seperti menyakiti diri sendiri.',
  tindakanKriminalAtau: 'Criminal or illegal acts',
  segalaCederaAtauCacatAkibatAktivitasIlegal:
    'Segala cedera atau cacat akibat aktivitas ilegal atau kriminalitas.',
  pengecualianSelengkapnya:
    'Pengecualian selengkapnya ada di Ringkasan Informasi & Layanan (RIPLAY)',
  dalamPenggunaanCashless:
    '*Dalam pengunaan Cashless, maka Manfaat Asuransi Penggantian biaya ditetapkan masimal sebesar',
  totalMaksimumBiaya: 'Total Maksimum Biaya Pengobatan',
  butuhBantuan: 'Need help from? Please Contact',
  customerCare: 'Customer Care',

  syaratDanKetentuan: 'Terms and Conditions',
  ringkasanInformasi: 'Product & Service Information Summary (RIPLAY)',

  ptAsuransiJiwa: 'PT Asuransi Jiwa IFG is licensed and supervised by OJK.',

  // DIALOG
  // -- DialogCheckReferal
  kamuHarusDiundangOlehTeman: 'Kamu harus diundang oleh teman/kerabat kamu',
  andaTidakMemilikiReferal:
    'Kamu tidak memiliki referal. Ingin diingatkan saat sudah tersedia? Tekan Ingatkan.',
  punyaKode: 'Punya kode?',
  ingatkan: 'Remind me',
  maafKamuBelumBisa: "Sorry, You Can't Subscribe Yet",
  kamuBelumBisa:
    'Would you like to be reminded when LifeSAVER is open to the public?',
  tips: 'Tips: You can also ask your LifeSAVER protected friends to invite you.',
  // -- DialogSuccessWaiting
  kembali: 'Back to Homepage',
  pengingatBerhasil: 'Reminder Set!',
  nantiAkanKamiInfokan:
    'This notification will be sent when you capable to buy LifeSAVER. ',
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

  selamaPerioderPromosi: '*During the promotion period',

  // -- Dialog medical protection
  InfoProteksiMedis: 'Medical Protection Information',
  manfaatUtama: 'Main Benefits :',
  proteksiMedisAkibatKecelakaan: 'Medical protection due to accident',
  sampaiDengan: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Up to {textRed('IDR 200 Mio')} or {textRed('IDR 400 Mio')}, depending on
      the package you choose and can be done {textItalic('cashless')} or
      {textItalic(' reimbursement')}
      {textRed('*')}.
    </Text>
  ),
  manfaatPilihan: (
    <Text textStyle="semi" line={30} size={Size.text.body2.size}>
      Additional Benefits{textRed('**')}:
    </Text>
  ),
  proteksiMedisCedera: 'Sports Injury Medical Protection',
  sebesar: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      As much as {textRed('IDR 20 Mio')}, it can only be done
      {textItalic(' cashless')} or {textItalic('reimbursement')}
      {textRed('*')}
    </Text>
  ),
  fisioterapi: 'Physiotherapy',
  fisioterapiSebesar: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      As much as {textRed('IDR 10 Mio')}, can only be done
      {textItalic(' cashless')}.
    </Text>
  ),
  berlakuInnerLimit: (
    <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
      {textRed('*')}Inner limit applies for reimbursement method.
    </Text>
  ),
  selamaPerioderPromosi2: (
    <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
      {textRed('**')}Optional benefits in the form of medical injury protection
      due to sports and physiotherapy are offered on a bundling basis only
      during the promotion period
    </Text>
  ),

  // SCROLL ITEM ONE
  startYourDayConfidently: 'START YOUR DAY CONFIDENTLY',
  // SCROLL ITEM TWO
  oneForAll: 'ONE FOR ALL',
  lifeSaverMelindungiKamu:
    ' protects you in all kinds of activities, including travel and extreme sports.',
  selainMemproteksiDiri:
    'In addition to protecting yourself, you also participate in protecting each other participants.',
  aktivitasYangTerproteksi: 'Covered Activities',
  // SCROLL ITEM THREE
  wellHelpYou: `WE'LL HELP YOU HEAL.`,
  denganBiayaBerlangganan: 'With an affordable subscription fee, ',
  memberikanCoverage:
    ' provides you best coverage for medical expenses in Indonesia when any serious or minor injury due to an accident.',
  selainCederaKarena: 'In addition to injuries due to accidents, ',
  jugaMengCover: ' also covers injuries due to sports activities.*',
  LihatProteksiMedis: 'View medical protection',
  // SCROLL ITEM FOUR
  DimanapunKamu: 'Wherever you are, ',
  SelaluSiap:
    ' is always ready to protect you. In an emergency situation, you can get treatment immediately and ',
  di: 'in',
  seribu: ' 1000+ Hospitals and Clinics in Indonesia.',
  apabilaDibutuhkan:
    'If needed, you can also easily contact an ambulance* via the Life by IFG application.',
  DaftarRsKlinik: 'List of Hospitals and Clinics',

  //Pengecualian:
  OlahragaEkstrem: 'Uncovered extreme sports',

  //PriceTable:
  pilihProteksi: 'Choose Your Protection',
  manfaatUtama2: 'Main Benefits',
  jt: 'M',
  bulan: 'month',
  ProteksiMedisKecelakaan: 'Accident Medical Protection',
  MeninggalCacat: 'Death/Permanent Disability.',
  KecelakaanOlahragaAir: 'Water Sports Accident',
  ManfaatPilihan2: 'Additional Benefits',
  Ambulans: 'Ambulance',
  empatSembilan: '49k/month',
  sembilanSembilan: '99k/month',
  klikUntukLihat: 'Click to see more benefits',
  SelamaPeriode:
    'During the promo period, optional benefits are bundled with the main benefits',
  rp10jt: '10 M',
  rp20jt: '20 M',
  rp40jt: '40 M',
  rp200jt: '200 M',
  rp400jt: '400 M',

  // SCROLL ITEM TWO POPUP
  infoAktivitasTerproteksi: 'Protected Activity Information',
  Khusus: 'for ',
  Air: 'Water',
  Darat: 'Land',
  Perjalanan: 'Others',
  Udara: 'Air',
  melindungi: ' protects you in the following activities:',

  // MODAL LIST RS
  DataRs: 'List of Hospitals and Clinics',
  DataTidakDitemukan: 'Data not found',
  CariBerdasarkan: 'Search By City/Province/Hospital Name',
  Contoh: 'Example "Jakarta" or "RS Bumi"',
  UrutkanBerdasarkan: 'Sort by',
  proteksiLifesaver:
    ' holder, you can find a list of nearby hospitals or clinics location in case if any emergency situation.  ',
  untukPemilik: 'For ',
  HOSPITAL: 'Hospital',
  PHARMACHY: 'Pharmachy',
  CLINIC: 'Clinic',
  LAB: 'Laboratorium',
  OPTIC: 'Optic',
  DENTAL: 'Dental',
  ALL: 'All',

  // modal benefit information
  dialogBenefitInformation: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      Special for {textBold('Physiotherapy')} can only be claimed with the
      {textItalic(' cashless')} method.
    </Text>
  ),
  //MODAL BENEFIT
  infoManfaat: 'Benefit Information',
  dengan: 'Provide with ',
  klinikRekanan:
    ', you can do some treatment without cash payment at hospitals or clinics partner.',
  khusus2: ' Special ',
  hanyaBisa: ' can only be claimed with the ',
  metode: ' method.',
  apabilaBiaya: (
    <Text textStyle="medium" line={22} size={Size.text.body2.size}>
      If medical expenses are not cashless supported, you can make a claim as a
      {textItalic(' reimbursement')}, and an
      {textBoldItalic(' inner limit applies')}
      {textRed('*')} which can be seen in the details of the benefits and the
      claim process for a maximum of 30 days.
    </Text>
  ),
  yangDapat:
    ' applies which can be seen in the details of the benefits and the claim process for a maximum of 30 days.',
  batasan: 'Limit each benefit from medical care paid for by IFG Life.',
  mekanisme:
    'The mechanism for submitting reimbursement claims can be seen in the ',

  //MODAL DAFTAR OLAHRAGA AIR
  daftarOlahragaAir: 'Water Sports List',
  daftarOlahRagaTerproteksi: 'List of Water Sports protected with ',

  //MODAL DETAIL
  batasan2:
    'Limitation of each benefit from medical treatment paid by IFG Life.',

  faq: (
    <Text
      textStyle="bold"
      size={Size.text.caption1.size}
      line={21}
      align="left">
      FAQ Life
      <Text
        textStyle="boldItalic"
        size={Size.text.caption1.size}
        line={21}
        align="left">
        SAVER
      </Text>
    </Text>
  ),
};
