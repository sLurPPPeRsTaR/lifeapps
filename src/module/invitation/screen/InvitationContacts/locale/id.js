import React from 'react';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';

export default {
  ajakTeman: 'Ajak Teman',
  // search card *
  cari: 'Cari',
  ketikNamaAtau: 'Ketik nama atau nomor HP',
  ajakTemanKamuUntukIkut: (
    <Text
      textStyle="semi"
      size={Size.text.body2.size}
      line={21}
      letterSpacing={0.5}
      align="center"
      color={Color.neutral.light.neutral80}>
      Ajak teman kamu untuk ikut terproteksi
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
  suksesMenambahUndangan: 'Sukses Menambahkan Undangan',
  kirimSms:
    'Kirim undangan ke temanmu sekarang menggunakan Whatsapp atau SMS agar temanmu juga terproteksi!',

  contactPermissionTitle: 'Kontak',
  contactPermissionMessage: 'Aplikasi ini ingin melihat kontak Anda.',
  contactPermissionDenied: 'Izin untuk mengakses kontak ditolak',
  ajakTemanmuUntukbergabung: 'Ajak temanmu untuk bergabung dengan LIFE by IFG',
  ketikNamaAtauNomorHp: 'Ketik nama atau nomor HP',
  smsMessage:
    'Ayo ikut terproteksi LifeSAVER. Krn LifeSAVER melindungi km saat tjd cedera olahraga/perjalanan. Yuk berlangganan ',
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
  send: 'Kirim',

  // flatlist
  nomorIniSudahBerlangganan: 'Nomor ini sudah terproteksi ',
  thisNumberAlreadyInvitedBut:
    'Nomor ini sudah terundang, registrasi dan belum berlangganan ',
  nomorIniSudahTerundangDan: 'Nomor ini sudah terundang dan belum registrasi',
  nomorIniSudahTerdaftarDan:
    'Nomor ini sudah terdaftar dan belum berlanggananan ',

  // error status
  gagalMengundang: 'Gagal mengundang',
  gagalMendapatkanNomor: 'Gagal mendapatkan nomor terdaftar',
  gagatMendapatkanBatas: 'Gagal mendapatkan batas invite',
  reload: 'Muat Ulang',
  batasAjakTeman: 'Kamu sudah melebihi batas ajak teman',
  minimalKarakter: 'Pencarian minimal 3 karakter',
};
