import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import style from '../style';

export default {
  // permission *
  contactPermissionTitle: 'Contacts',
  contactPermissionMessage: 'This app would like to view your contacts.',
  contactPermissionDenied: 'Permission to access contacts was denied',

  ajakTeman: 'Ajak Teman',

  // renderListInvitation *
  daftarUndangan: 'Daftar Undangan',

  // no invite *
  belumMengundang: 'Kamu belum mengundang siapapun',
  ayoUndangTeman: 'Ayo undang temanmu agar mereka ikut terproteksi.',

  // referalHead *
  ayoSalingMelindungi: 'Ayo Saling Melindungi!',
  selainMemproteksi:
    'Selain memproteksi diri sendiri, kamu juga turut berpartisipasi untuk memproteksi orang terdekatmu.',

  // referalInfo *
  subscribe: 'Terproteksi',
  register: 'Terdaftar',
  shared: 'Terundang',

  // referalSteps *
  caraAjak: 'Cara Ajak Teman',
  ajakTemanKamuUntukDaftar:
    'Ajak teman kamu untuk daftar dan verifikasi di Life by IFG',
  pastikanTemanmuBerlangganan: (
    <Text
      textStyle="semi"
      line={20}
      size={Size.text.caption1.size}
      color={Color.neutral.light.neutral40}
      style={style.referalSteps.listItemText}>
      Pastikan temanmu berlangganan proteksi
      <Text
        textStyle="semi"
        line={20}
        size={Size.text.caption1.size}
        color={Color.neutral.light.neutral40}
        style={style.referalSteps.listItemText}>
        {' '}
        Life
        <Text
          textStyle="semiItalic"
          line={20}
          size={Size.text.caption1.size}
          color={Color.neutral.light.neutral40}
          style={style.referalSteps.listItemText}>
          SAVER
        </Text>
      </Text>
    </Text>
  ),
  terimakasihSudahTurut:
    'Terima kasih kamu sudah turut berpartisipasi untuk memproteksi orang terdekat kamu!',
  smsMessage:
    'Ayo ikut terproteksi LifeSAVER. Krn LifeSAVER melindungi km saat tjd cedera olahraga/perjalanan. Yuk berlangganan ',
  gagalMendapatkanNomor: 'Gagal mendapatkan nomor terdaftar',

  terundangOleh: (
    <Text
      textStyle="semi"
      line={20}
      size={Size.text.caption2.size}
      color={Color.neutral.light.neutral40}
      style={style.referalSteps.listItemText}>
      Terundang Oleh
      <Text
        textStyle="semi"
        line={20}
        size={Size.text.caption2.size}
        color={Color.neutral.light.neutral40}
        style={style.referalSteps.listItemText}>
        {' '}
        Kamu dan 3 orang lainya
      </Text>
    </Text>
  ),

  diundangPada: 'Diundang pada ',
  nomorUndangan: 'Kode Undangan',

  //trackList
  berlangganan: 'Berlangganan',
  referensiKamu: 'Referensi Kamu',
  referensiOrang: 'Referensi Orang Lain',

  ringkasan: 'Ringkasan',
  informasiStatus: 'Informasi Status',
  sisaUndangan: 'Sisa Undangan',
  terproteksiDanTerdaftar: 'Terundang dan Terdaftar',
  lihatSemua: 'Lihat Semua',
  lihatSedikit: 'Lihat Lebih Sedikit',
  kuotaAjakTeman: 'Kuota ajak teman kamu akan diperbaharui setiap minggunya',
};
