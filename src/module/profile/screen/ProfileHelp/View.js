import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Base from 'ca-component-container/Base';
import { trans } from 'ca-util/trans';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  ArrowDown2,
  ArrowDown2White,
  Headset2,
  SearchOutline,
  Send,
} from 'ca-config/Svg';
import Padder from 'ca-component-container/Padder';
import { ProfileHelpBackground } from 'ca-config/Image';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import ListAccordion from 'ca-component-card/ListAccordion';
import { NAVIGATION } from 'ca-util/constant';
import Color from 'ca-config/Color';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import _ from 'lodash';
import Shadow from 'ca-component-container/Shadow';
import { useDefaultBackHandler } from 'ca-util/common';
import locale from './locale';
import Style from './style';

const listQuestionID = [
  {
    question: 'Apa saja persyaratan untuk mendapatkan produk LifeSAVER?',
    answer:
      'Selama program soft launching Kamu dapat menjadi Tertanggung LifeSAVER dengan kriteria: \n1. Berusia minimal 18 tahun \n2. Mendapatkan undangan dari teman yang sudah membeli LifeSAVER, cek syaratnya di IG IFG Life ya atau Kamu dapat menghubungi Call Center: 1500176 dan WhatsApp: 0811 1372 848.',
  },
  {
    question: 'Apakah saya dapat membelikan produk LifeSAVER untuk orang lain?',
    answer: 'Saat ini produk LifeSAVER dapat dibeli untuk diri sendiri',
  },
  {
    question: 'Apakah saya bisa berhenti berlangganan LifeSAVER?',
    answer:
      'Kamu bisa berhenti berlangganan melalui menu berhenti di Profil kamu. Setelah berhenti berlangganan sukses, IFG Life tidak akan menagihkan premi bulan berikutnya dan otomatis bulan berikutnya Polis berakhir',
  },
  {
    question:
      'Apakah saya dapat mengubah jenis Plan yang saya pilih diawal berlangganan?',
    answer:
      'Kamu dapat mengubah jenis plan lebih tinggi dan lebih rendah kapan saja. Untuk mendowngrade jenis plan, maka premi baru akan berlaku pada jatuh tempo berikutnya, sedangkan untuk mengupgrade plan, maka Kamu akan ditagihkan premi baru secara prorata Dan untuk jenis plan baru tidak akan diberlakukan waiting period ya.',
  },
  {
    question: 'Apakah Polis dapat langsung digunakan pada saat Polis terbit?',
    answer:
      'Manfaat Polis Kamu dapat digunakan setelah masa sebagai berikut :\n1. Meninggal Dunia akibat kecelakaan /Cacat Tetap langsung dapat digunakan \n2. Manfaat Utama Proteksi Medis dapat digunakan setelah masa Tunggu 1 X 24 Jam \n3. Manfaat Pilihan Proteksi Cedera Olahraga dapat digunakan setelah Masa Tunggu 5 X 24 Jam',
  },
  {
    question:
      'Apa beda kecelakaan dan Cedera saat melakukan Olahraga/Perjalanan?',
    answer:
      'Kecelakaan adalah suatu kejadi yang terjadi secara tiba-tiba dan tidak terduga, tanpa ada nya unsur-unsur kesengajaan. Sedangkan, cedera adalah Ketika tertanggung mengalami Cedera saat melakukan aktivitas Olahraga, Perjalanan/Trip, atau Adventure, yang memerlukan Secara Medis untuk menjalani pengobatan.',
  },
  {
    question:
      'Berapa manfaat maksimal yang untuk biaya perawatan karena kecelakaan?',
    answer:
      'Maksimal Biaya Perawatan di Rumah Sakit karena kecelakaan untuk metode cashless adalah:\n\n· LifeSAVER : sampai dengan Rp 200 juta\n\n· LifeSAVER + : sampai dengan Rp 400 juta\n\nDengan batasan kamar termurah untuk 1 ranjang per kamar.\n\nSedangkan untuk metode reimbursement adalah sesuai dengan inner limit masing-masing jenis cedera yang yang bisa dilihat didalam Polis dan Halaman Produk',
  },
  {
    question:
      'Apakah untuk manfaat biaya perawatan di Rumah Sakit dapat dilakukan hanya dengan membawa kartu peserta?',
    answer:
      'Iya betul\n\nSetelah Kamu mendaftar, maka pada aplikasi akan muncul e-card yang dapat Kamu gunakan pada saat Kamu harus berobat ke Rumah Sakit karena kecelakaan atau cedera olahraga/perjalanan.\n\nDengan claim secara cashless Kamu akan mendapatkan manfaat secara maksimal.',
    link: '[LIST PROVIDER RUMAH SAKIT]',
  },
  {
    question:
      'Apakah risiko karena saya kecelakaan di tempat kerja dapat di cover oleh produk LifeSAVER?',
    answer:
      'Mohon maaf produk LifeSAVER hanya melindungi Kamu terhadap kecelakaan pada saat beraktifitas:\n\nOlahraga\n\nOlahraga Extreme\n\nPerjalanan/trip',
  },
  {
    question: 'Apakah claim dapat dilakukan secara reimbursement?',
    answer:
      'Apabila Kamu di rawat di Rumah Sakit yang bukan provider IFG Life, maka Kamu dapat mengajukan claim secara reimbursement dengan limit untuk masing-masing cedera seperti tertera di Polis',
  },
  {
    question: 'Apa yang dimaksud dengan Emergency Transportation?',
    answer:
      'Apabila Tertanggung mengalami kondisi Gawat Darurat/membutuhkan tindakan medis segera untuk menyelematkan nyawa dan menghindari kecacatan yang disebabkan oleh kecelakaan, maka IFG Life akan memberikan pelayanan melalui penyedia jasa untuk memindahkan Tertanggung dari tempat kejadian ke fasilitas medis terdekat menggunakan Ground Ambulance',
  },
  {
    question: 'Bagaimana cara registrasi di Life by IFG?',
    answer:
      'Pilih Registrasi pada halaman Home, atau pilih Profile pada bagian kanan bawah halaman. Selanjutnya pilih Daftar dengan Google atau Daftar dengan email/nomor HP.',
  },
  {
    question: 'Bagaimana cara login?',
    answer:
      'Pilih Login pada halaman Home, atau pilih Profile pada bagian kanan bawah halaman, selanjutnya pilih Login.',
  },
  {
    question: 'Bagaimana saya dapat menghubungkan Polis yang saya miliki?',
    answer:
      'Kamu dapat mencari Polis setelah berhasil melakukan Registrasi, kemudian Kamu dapat melakukan Verifikasi Data Diri, setelah berhasil maka seluruh Polis yang Kamu miliki akan langsung terhubung dengan akun Kamu.',
  },
  {
    question: 'Bagaimana jika saya lupa password?',
    answer:
      'Pada halaman Login, pilih Reset Password. Kemudian masukkan email atau nomor HP yang terdaftar di Life by IFG. Setelah itu, Kamu akan menerima email berisi instruksi untuk reset password.',
  },
  {
    question: 'Bagaimana cara mengganti password?',
    answer:
      'Pilih menu Profile pada bagian kanan bawah halaman, kemudian pilih Keamanan. Selanjutnya pilih menu Ganti Password. Masukkan password lama, kemudian masukkan password baru dan konfirmasi password baru.',
  },
  {
    question: 'Bagaimana cara mengubah bahasa di Life by IFG?',
    answer:
      'Pilih menu Profile pada bagian kanan bawah halaman, kemudian pilih Bahasa. Selanjutnya pilih bahasa yang Kamu inginkan dan pilih tombol Perbarui. Saat ini, Life by IFG tersedia dalam bahasa Indonesia dan bahasa Inggris.',
  },
];
const listQuestionEN = [
  {
    question: 'What are the requirements to get LifeSAVER?',
    answer:
      'During the soft launching program you can become a LifeSAVER Insured with the following criteria: \n1. At least 18 years old \n2. To get invitations, check the conditions on IG IFG Life or you can contact Call Center: 1500176 and WhatsApp: 0811 1372 848.',
  },
  {
    question: 'Can I buy LifeSAVER products for other people?',
    answer:
      'Sorry, currently LifeSAVER can only be purchased as an invidual / by yourself.',
  },
  {
    question: 'Can I unsubscribe from LifeSAVER?',
    answer:
      'You can un-subscribe at any time. And at the due date of the following month, IFG Life will not charge premiums and our policy will automatically expire.',
  },
  {
    question:
      'Can I change the type of Plan I selected at the beginning of my subscription?',
    answer:
      'Of course, you can upgrade and downgrade your policy at any time. And at the due date of the following month, IFG Life will charge the premium according to your choice. And for the new type of plan, there will be no waiting period.',
  },
  {
    question:
      'Is there a waiting period? When the premium is paid and the policy is issued, can cashless be used?',
    answer:
      'Your policy will be active after waiting period as follows: \n1. Died due to accident / Permanent Disability without waiting period\n2. The main benefit of Medical Protection applies a waiting period of 1 X 24 Hours\n3. Benefits of Sports Injury Protection Options apply 5 X 24 Hours Waiting Period',
  },
  {
    question:
      'What is the difference between Accident and Injury while doing Sports/Travel?',
    answer:
      'An accident is an event that occurs suddenly and unexpectedly, without any intentional elements. Meanwhile, injury during sports or travel is when the insured suffers an injury while doing sports, travel/trip, or adventure activities, which require medically to undergo treatment.',
  },
  {
    question:
      'What is the maximum benefit for the cost of treatment due to an accident?',
    answer:
      'The maximum cost of hospitalization due to an accident for the cashless method is:\n\n• LifeSAVER : up to IDR 200 million\n\n• LifeSAVER + : up to IDR 400 million\n\nAs for the reimbursement method, it is in accordance with the inner limit of each type of injury listed in the policy.',
  },
  {
    question:
      'Can the benefit of the cost treatment at the hospital be done just by bringing a participant card?',
    answer:
      'Yes, that’s right\n\nAfter you register, the application will display an e-card that you can use when you have to go to the hospital due to an accident or sports/travel injury.\n\nBy claiming cashless you will get the maximum benefit.',
    link: '[LIST OF HOSPITAL PROVIDER]',
  },

  {
    question:
      'Does LifeSAVER cover the risk of me having an accident during/at work?',
    answer:
      'We are sorry, LifeSAVER only protect you against accidents during your activities:\n\nSports\n\nExtreme Sports\n\nTravel/trip',
  },
  {
    question: 'Can a claim be made with a reimbursement method?',
    answer:
      'If you are treated at a hospital that is not an IFG Life provider, then you can submit a claim by reimbursement with a limit for each injury as stated in the policy.',
  },
  {
    question: 'What is Emergency Transportation?',
    answer:
      'If the Insured is in an Emergency condition/needs immediate medical action and avoid disability caused by an accident, IFG Life will provide services through a service provider to transfer the Insured from the scene of the incident to the nearest medical facility using Ground Ambulance',
  },
  {
    question: 'How to create Life by IFG account?',
    answer:
      'Tap Register button on Home, or tap Profile on the bottom right of the page. You can Register via Google or email/mobile number.',
  },
  {
    question: 'How do I login to Life by IFG?',
    answer: 'Tap Login button on Home or Profile page.',
  },
  {
    question: 'How do I connect my policy?',
    answer:
      'You can search for your policies after registering and verifying your personal data. Once successful, all policies that you have will be directly linked to your account.',
  },
  {
    question: 'Lost or forgotten password?',
    answer:
      'Select Reset Password on the Login page, then enter your registered email or mobile number . You will receive an email with further instructions to reset your password.',
  },
  {
    question: 'How to change my password?',
    answer:
      'Tap Profile menu, go to Security and select Change Password. Enter your old password, new password, and confirm your new password.',
  },
  {
    question: 'How to change language?',
    answer:
      'Tap Profile menu, go to Language. You can choose the language you desire. Life by IFG available in Indonesian and English.',
  },
];

function ProfileHelp(props) {
  const { navigation, lang } = props;

  const [faqs, setFaqs] = useState(
    lang === 'id' ? listQuestionID : listQuestionEN
  );

  useDefaultBackHandler(navigation);

  function searchFilter(arr, inputKeyword) {
    return arr.filter((item) => {
      return Object.keys(item).some((prop) => {
        return (
          item[prop]
            .toString()
            .toLowerCase()
            .indexOf(inputKeyword.toString().toLowerCase()) > -1
        );
      });
    });
  }

  function renderRightHeaderContent() {
    return (
      <TouchableOpacity
        style={Style.me16}
        onPress={() => {
          navigation.navigate(NAVIGATION.PROFILE.ProfileHelpCenter);
        }}>
        <Headset2 fill={Color.main.dark.white} />
      </TouchableOpacity>
    );
  }

  function renderHeaderContainer() {
    return (
      <Shadow style={Style.mt16} borderRadius={16}>
        <View style={Style.header.container}>
          <View>
            <Image source={ProfileHelpBackground} style={Style.header.image} />
            <View style={Style.header.imageText}>
              <Text
                textStyle="bold"
                size={Size.text.body2.size}
                line={28}
                letterSpacing={0.2}
                color={Color.main.light.white}
                align="left">
                {trans(locale, lang, 'cariTahuTentang')}
              </Text>
              <Text
                textStyle="bold"
                size={Size.text.h6.size}
                line={28}
                letterSpacing={0.2}
                color={Color.main.light.white}
                align="left">
                {trans(locale, lang, 'lifeByIFG')}
              </Text>
            </View>
          </View>
          <View style={Style.header.card.container}>
            <View style={Style.header.card.card}>
              <Input
                prefixIcon={<SearchOutline width={24} height={24} />}
                placeholder={trans(locale, lang, 'pencarian')}
                onChangeText={(text) => {
                  if (text) {
                    setFaqs(
                      searchFilter(
                        lang === 'id' ? listQuestionID : listQuestionEN,
                        text
                      )
                    );
                  } else {
                    setFaqs(lang === 'id' ? listQuestionID : listQuestionEN);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Shadow>
    );
  }

  function renderContentContainer() {
    return (
      <View>
        <View style={Style.content.list.container}>
          {!_.isEmpty(faqs) ? (
            faqs.map((item) => {
              return (
                <View key={item.question} style={[Style.mb16, Style.bordered]}>
                  <ListAccordion
                    touchableType="opacity"
                    headerContainerStyle={Style.headerContainerStyle}
                    headerContainerStyleActive={
                      Style.headerContainerStyleActive
                    }
                    header={
                      <Text
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}
                        color={Color.neutral.light.neutral60}>
                        {item.question}
                      </Text>
                    }
                    headerActive={
                      <Text
                        textStyle="semi"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}
                        color={Color.main.light.white}>
                        {item.question}
                      </Text>
                    }
                    suffixIcon={<ArrowDown2 />}
                    suffixIconActive={<ArrowDown2White />}>
                    <View style={Style.contentContainerStyle}>
                      <Text
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}
                        color={Color.neutral.light.neutral60}>
                        {item.answer}
                      </Text>
                    </View>
                    <View style={Style.contentContainerStyle}>
                      <Text
                        onPress={() => {
                          navigation.navigate(NAVIGATION.HOME.HomeListRS);
                        }}
                        textStyle="medium"
                        size={Size.text.body2.size}
                        line={21}
                        letterSpacing={0.5}
                        color={Color.primary.light.primary90}>
                        {item.link}
                      </Text>
                    </View>
                  </ListAccordion>
                </View>
              );
            })
          ) : (
            <View style={Style.notFoundContainer}>
              <Text
                textStyle="medium"
                size={Size.text.body2.size}
                line={21}
                letterSpacing={0.5}
                color={Color.mediumGray.light.mediumGray}>
                {trans(locale, lang, 'pencarianTidakDitemukan')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  function renderFooterContainer() {
    return (
      <Padder style={Style.mB12}>
        <Button
          onPress={() => {
            navigation.navigate(NAVIGATION.PROFILE.ProfileFaqFeedback);
          }}
          style={Style.mb16}
          suffixIcon={<Send />}
          on>
          {trans(locale, lang, 'ajukanPertanyaan')}
        </Button>
      </Padder>
    );
  }

  return (
    <Base
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'bantuan')}
      rightHeaderContent={renderRightHeaderContent()}
      renderBottom={renderFooterContainer()}>
      <View style={Style.header.wrapper}>{renderHeaderContainer()}</View>
      <Padder>{renderContentContainer()}</Padder>
    </Base>
  );
}

export default ProfileHelp;

ProfileHelp.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
};
