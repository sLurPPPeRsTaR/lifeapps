import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import style from '../style';

export default {
  totalNilaiTunai: 'Total Nilai Tunai',
  cekNomorPolisKamu: 'Check Your\nPolicy',
  cekNomorPolis: 'Check Policy',
  apakahKamuPerlu: 'Need Any\nHelp?',
  cekBantuan: 'Check Help',
  pentingUntukmu: 'Important for you',
  lihatSemua: 'View All',
  lihatDetailPolis: 'Your Policy is Empty',
  silakan: 'Please ',
  login: 'Login',
  atau: ' / ',
  register: 'Register',
  untukMelihatPolis: 'to see your policies.',
  silakanMasukkanNomor: 'Please enter your policy number ',
  polisKamu: 'Your Policy',
  pengkinianData: 'Beneficiary Eligibility Confirmation',
  yukVerifikasiData: 'Verify Personal Data',
  katanyaTakKenal:
    'Simply upload your e-KTP, selfie and create your own PIN to unclock the extra benefits and protection for your life',
  nantiDulu: 'Skip',
  yuk: 'Verify Now',
  yukLakukanPengkinian: "Let's Confirm Beneficiary Eligibility",
  pengkinianKamuTerakhir:
    'Your last beneficiary eligibility confirmation was done on ',
  segeraLakukanPengkinian: '. Confirm now so that the policy data is updated',
  andaBelumPernahMelakukan:
    'You have never done an confirmation, please confirm beneficiary eligibility now',
  lewatiPengkinian: 'Skip',
  mulaiPengkinian: 'Start KKPM',
  // Alter Modal Success
  selamatKamuBerhasilMelakukan:
    'Congratulations, you have successfully confirmed beneficiary eligibility',
  terimaKasihTelah:
    'Thank you for confirming beneficiary eligibility. Enjoy up-to-date information about your policy.',
  ok: 'OK!',

  // Alter Modal Fail
  dataKamuTidak: 'Your data does not match your Family Card or ID Card',
  silahkanLakukanPengkinian: 'Please confirm beneficiary eligibility again',
  ulangPengkinian: 'Beneficiary Eligibility Confirmation',
  manfaatBertahap: 'Next Benefit Payment',
  verifikasiSekarang: "You are not verified yet, let's verify your data now!",
  manfaatSelanjutnya: 'Next Benefit',

  // renderChangePhoneModal
  masukkanNomorPonsel: 'Enter Your Mobile Number',
  ayoTingkatkanKeamanan:
    "Let's increase the security of your account with mobile number verification",
  nomorPonsel: 'Mobile Number',
  simpan: 'Save',
  phoneNumberRequired: 'Mobile Number is required',
  phoneNumberInvalid: 'Mobile Number is invalid',
  nomorHPTerdaftar:
    'Your mobile number is already registered, if the mobile number belongs to you, please Login',
  login2: 'Login',
  kodeNegaraTidakTerdaftar: 'Sorry, country code not listed',

  // renderTooFrequentlyModal
  andaTerlaluSering: 'Too Frequently Request OTP',
  untukSementaraWaktu:
    'You are temporarily unable to request an OTP code. Please wait for ',
  cobaLagi: 'Try Again',

  // renderMenu
  rsDanKlinik: 'Clinic and Hospital',
  faq: 'FAQ',
  lifeCard: 'LifeCARD',
  event: 'Event',

  // renderAppGuide
  appGuideLine1: 'App',
  appGuideLine2: 'Guide',
  appGuideLine3: 'Here!',
  featureGuide: 'Feature Guide',

  // renderPolisRestructurisation
  restrukturisasiLine1: 'Polis',
  restrukturisasiLine2: 'Restructurisation',
  restrukturisasiLine3: 'Information',

  // renderContentCard
  bagaimana: 'How To',
  cara: 'Claim',
  klaim: 'Insurance?',
  klaimAsuransi: 'Insurance Claim',
  caraKlaim: 'Insurance Claim',
  informasi1: 'Information',
  restukturisasi: 'Restructurisation',
  polis1: 'Policy',
  restrukturisasiPolis: 'Restructurisation Policy',
  informasi2: 'Information',
  informasi3: 'Policy',

  // renderWidgetBajoRun
  terlindungiOleh: 'Selamat! Kamu sudah terlindungi oleh ',
  bebasBeraktifitas: ' Sekarang, Kamu bisa bebas beraktifitas tanpa ragu.',
  daftar: 'Daftar disini',

  // renderWidgetInvited
  mengundang: ' invites you to be protected by ',
  mulaiSekarang: 'Start Now',

  // renderHaveNotPolisCard
  polisKamuKosong: 'Your Policy is Empty',
  oopsKamuBelum: "Oops! You don't have a policy yet. Let's ",
  cariProteksi: 'find the right protection',
  yangCocokUntuk: ' for you.',
  silakanVerifikasiDiri: 'Please Verify Yourself ',
  disini: 'here',
  kontenGagalDiTampilkan: 'Failed to Get Content',
  muatUlang: 'Refresh',
  invite: 'Invite friends',
  inviteUser: (
    <Text>
      <Text textStyle="semi" size={Size.text.caption1.size}>
        Invite friends
      </Text>{' '}
      <Text
        textStyle="medium"
        size={Size.text.caption1.size}
        letterSpacing={0.4}>
        to protect each other with{' '}
      </Text>
      Life
      <Text textStyle="italic" fontWeight="800">
        SAVER
      </Text>
      !
    </Text>
  ),

  // renderLifecardModal
  untukKamuYang: 'Subscriber Only',
  lifeCardDapatDiakses: 'LifeCARD can be accessed if subscribe ',
  kembali: 'Back',
  lihatProteksiLifesaver: 'View LifeSAVER Protection',

  // renderWidgetActivatedLifeSAVER
  selamatKamuMendapatkan: 'Congratulations! You get protection ',
  gratisUntukSatu: " free for the first month. Let's activate now.",
  daftarDisini: 'Register here',

  // renderWidgetLifeTag
  siapDihubungkan: (
    <Text size={Size.text.caption1.size}>
      To make your activities safer and more comfortable, let's connect your{' '}
      <Text style={style.ml10} textStyle="bold" size={Size.text.caption1.size}>
        LifeTag
      </Text>{' '}
      now!
    </Text>
  ),
  hubungkanLifetag: 'Connect',
  hasLiveSaver: (
    <Text size={Size.text.caption1.size}>
      You can get a{' '}
      <Text style={style.ml10} textStyle="bold" size={Size.text.caption1.size}>
        LifeTag
      </Text>
      , let's get it now!
    </Text>
  ),
  dapatkanLifetag: 'Get LifeTag',

  // renderWidgetKYC
  verifikasiSekarangKyc:
    "You are not verified yet, let's verify your data now!",
  verifikasiYuk: "Let's verify!",

  // renderHighlightEvent
  sorotan: 'Highlight',
  limitedEventModalTitle: 'Limited Event',
  eventIniDiperuntukan:
    'This event is intended for certain communities and is private',
  masukkanKodeEvent: 'Enter event code',
  masukkanKodeDisini: 'Enter the code here',
  kodeYangKamu: 'The code you entered is wrong',
  lanjutkan: 'Continue',
  lihatEvent: 'See Event',

  // renderWidgetPayment
  selesaikanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      One more step for being protected by{' '}
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
  lihatPembayaran: 'Pay Now',

  // renderWidgetPayment mode 2
  mohonLakukanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      Your{' '}
      <Text
        style={style.ml10}
        textStyle="medium"
        size={Size.text.caption1.size}>
        Life
        <Text
          style={style.ml10}
          textStyle="mediumItalic"
          size={Size.text.caption1.size}>
          SAVER{' '}
        </Text>
      </Text>
      will end soon, complete payment before
    </Text>
  ),
  ayoLanjutkan: ", let's continue your protection by clicking the button below",

  // renderWidgetPayment mode 3
  segeraSelesaikanPembayaran: (
    <Text style={style.ml10} textStyle="medium" size={Size.text.caption1.size}>
      Complete payment now to reactivate your{' '}
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
        !
      </Text>
    </Text>
  ),

  // renderWidgetReEkyc
  verifikasiDataDiriKamu:
    'Verification of your personal data has not been successful, please re-verify!',
  verifikasiUlang: 'Re-verify',

  // clientCode
  PHT: 'Retirement Participants',
  PJD: 'Widows/Widowers Beneficiary',
  PDD: 'Widows/Widowers Beneficiary',
  PYP: 'Orphan Beneficiary',

  // TOTAL CLAIM
  periode: 'Period',
  berlakuSeluruhProduk:
    '* Applied to all Policies migrated to IFG Life and all New IFG Life Products ',

  // KKPM WIDGET
  kamuBelumMelakukan:
    'You have not confirm beneficiary eligibility, please confirm beneficiary eligibility so your',
  kamuTetapBerlanjut: 'benefits can continue',
  // Pengkinian Widget
  pengkinianTerakhir: 'Last beneficiary eligibility confirmation date of',
  lakukanPengkinianData:
    ' Please, do confirmation so your policy benefits can continue.',

  // renderWidgetLiveness
  lakukanVerifikasiWajah: (
    <Text
      textStyle="medium"
      size={Size.text.caption1.size - 2}
      letterSpacing={0.4}>
      You are already protected by{' '}
      <Text textStyle="semi" size={Size.text.caption1.size - 2}>
        Life
        <Text textStyle="semiItalic" size={Size.text.caption1.size - 2}>
          SAVER
        </Text>
      </Text>
      , Let's do{' '}
      <Text textStyle="semi" size={Size.text.caption1.size - 2}>
        Face Verification
      </Text>{' '}
      to make easier for you who claim at the Hospital
    </Text>
  ),
  mulaiSekarangLiveness: 'Start Now',

  loginCapital: 'Login',
  registerCapital: 'Register',
  or: 'atau',
  toEnjoyFullFeature: 'to enjoy our full features',

  // Articles
  lifeArticles: 'Life Articles',
  nanti: 'Later',
};
