import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import style from '../style';

export default {
  // permission
  contactPermissionTitle: 'Contacts',
  contactPermissionMessage: 'This app would like to view your contacts.',
  contactPermissionDenied: 'Permission to access contacts was denied',

  ajakTeman: 'Invite Friends',

  // renderListInvitation *
  daftarUndangan: 'Invitation List',

  // no invite *
  belumMengundang: "You haven't invited anyone yet",
  ayoUndangTeman: 'Please, invite your friends who protected too.',

  // referalHead *
  ayoSalingMelindungi: "Let's Protect Each Other!",
  selainMemproteksi:
    'In addition to protecting yourself, you also participate in protecting those closest to you.',

  // referalInfo *
  subscribe: 'Protected',
  register: 'Registered',
  shared: 'Invited',

  // referalSteps *
  caraAjak: 'How to Invite Friends',
  ajakTemanKamuUntukDaftar:
    'Invite your friends to register and verify at Life by IFG',
  pastikanTemanmuBerlangganan: (
    <Text
      textStyle="semi"
      line={20}
      size={Size.text.caption1.size}
      color={Color.neutral.light.neutral40}
      style={style.referalSteps.listItemText}>
      Make sure your friends subscribe to
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
          SAVER{' '}
        </Text>
        protection
      </Text>
    </Text>
  ),
  terimakasihSudahTurut:
    'Thank you for participating to protect the people closest to you!',
  smsMessage:
    "Let's get covered in LifeSAVER. LifeSAVER protects you in the event of a sports/travel injury. Let's subscribe ",
  gagalMendapatkanNomor: 'Failed to get registered number',

  terundangOleh: (
    <Text
      textStyle="semi"
      line={20}
      size={Size.text.caption1.size}
      color={Color.neutral.light.neutral40}
      style={style.referalSteps.listItemText}>
      Terundang Oleh
      <Text
        textStyle="semi"
        line={20}
        size={Size.text.caption1.size}
        color={Color.neutral.light.neutral40}
        style={style.referalSteps.listItemText}>
        {' '}
        Kamu dan 3 orang lainya
      </Text>
    </Text>
  ),

  diundangPada: 'Invited on ',
  nomorUndangan: 'Invitation Code',

  //trackList
  berlangganan: 'Subscribe',
  referensiKamu: 'Reference by You',
  referensiOrang: 'Reference by Others',

  ringkasan: 'Summary',
  informasiStatus: 'Status Information',
  sisaUndangan: 'Invitation Remainder',
  terproteksiDanTerdaftar: 'Invited and Registered',
  lihatSemua: 'See All',
  lihatSedikit: 'See Less',
  kuotaAjakTeman: 'Your invitation quota will be updated every week',
};
