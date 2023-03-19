import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';

export default {
  ajakTeman: 'Invite Friends',
  // search card *
  cari: 'Search',
  ketikNamaAtau: 'Type name or mobile number',
  ajakTemanKamuUntukIkut: (
    <Text
      textStyle="semi"
      size={Size.text.body2.size}
      line={21}
      letterSpacing={0.5}
      align="center"
      color={Color.neutral.light.neutral80}>
      Invite your friends to be protected by
      <Text
        textStyle="semi"
        size={Size.text.body2.size}
        line={21}
        letterSpacing={0.5}
        align="center"
        color={Color.neutral.light.neutral80}>
        {' '}
        Life
        <Text
          textStyle="semiItalic"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          color={Color.neutral.light.neutral80}>
          SAVER
        </Text>
      </Text>
    </Text>
  ),

  // invitation success*
  suksesMenambahUndangan: 'Adding Invitations Success',
  kirimSms: 'Send invitation to your friends now using Whatsapp or SMS so your friends are protected too!',

  contactPermissionTitle: 'Contacts',
  contactPermissionMessage: 'This app would like to view your contacts.',
  contactPermissionDenied: 'Permission to access contacts was denied',
  ajakTemanmuUntukbergabung: 'Invite your friends to join LIFE by IFG',
  ketikNamaAtauNomorHp: 'Type name or mobile number',
  smsMessage: `Let's get covered in LifeSAVER. LifeSAVER protects you in the event of a sports/travel injury. Let's subscribe `,
  lifesaver: (
    <Text
      line={20}
      color={Color.primary.light.primary90}
      size={Size.text.caption2.size}>
      Life
      <Text
        textStyle="italic"
        line={20}
        color={Color.primary.light.primary90}
        size={Size.text.caption2.size}>
        SAVER
      </Text>
    </Text>
  ),
  lifesaverplus: (
    <Text
      line={20}
      color={Color.primary.light.primary90}
      size={Size.text.caption2.size}>
      Life
      <Text
        textStyle="italic"
        line={20}
        color={Color.primary.light.primary90}
        size={Size.text.caption2.size}>
        SAVER+
      </Text>
    </Text>
  ),
  lifesaverpos: (
    <Text
      line={20}
      color={Color.primary.light.primary90}
      size={Size.text.caption2.size}>
      Life
      <Text
        textStyle="italic"
        line={20}
        color={Color.primary.light.primary90}
        size={Size.text.caption2.size}>
        SAVER
      </Text>
      <Text
        line={20}
        color={Color.primary.light.primary90}
        size={Size.text.caption2.size}>
        {' '}
        POS
      </Text>
    </Text>
  ),

  // button
  send: 'Send',

  // flatlist
  nomorIniSudahBerlangganan: 'This number is protected by ',
  thisNumberAlreadyInvitedBut:
    'This number has been invited, registered and has not subscribed to ',
  nomorIniSudahTerundangDan:
    'This number has been invited and not registered yet',
  nomorIniSudahTerdaftarDan:
    'This number has been registered and not subscribed to ',

  // error status
  gagalMengundang: 'Failed to invite',
  gagalMendapatkanNomor: 'Failed to get registered number',
  gagatMendapatkanBatas: 'Failed to get invitation limit',
  reload: 'Reload',
  batasAjakTeman: `You've exceeded the limit invite friends`,
  minimalKarakter: 'Search keyword must be at least 3 characters',
};
