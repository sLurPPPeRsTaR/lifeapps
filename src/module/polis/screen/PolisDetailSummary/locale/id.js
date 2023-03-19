import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  masaBerlakuAsuransi: 'Masa Berlaku Asuransi',
  tanggalJatuhTempo: 'Tanggal Jatuh Tempo',
  hargaPremi: 'Harga Premi',
  paket: 'Paket',
  diasuransikanOleh: 'Berlangganan dari',
  didukungOleh: 'Didukung oleh',
  // Lifesaver
  masaTunggu: 'Masa Tunggu Manfaat',
  upgradePaket: 'Upgrade Paket',
  biayaMedisAkibat: 'Biaya Medis Akibat\nKecelakaan (Per Kasus)',
  biayaMedisDanFisioterapi: 'Biaya Medis dan\nFisioterapi ',
  biayaMedisDan: 'Biaya Medis dan Fisioterapi',
  akibatCederaSaat:
    'Akibat Cedera saat Beraktivitas Olahraga, Perjalanan/Trip, atau Adventure (Per Kasus)',

  // Count Down Widget Grace Period
  masaTenggang: 'Masa Tenggang',
  proteksiBerakhirPada: 'Proteksi berakhir pada',

  // Alert Dialogue Grace Period
  agarTetapProteksi:
    'Agar tetap terproteksi, ubah atau pastikan metode pembayaran Kamu bisa di debet ulang sebelum tanggal ',
  pukul: ', pukul',
  // Info Modal Grace Period
  masaTenggangAdalah: (
    <Text color={Color.neutral.light.neutral40}>
      Masa tenggang adalah kesempatan yang diberikan kepada nasabah untuk
      mengaktifkan kembali polis
      <Text textStyle="bold"> tanpa masa tunggu</Text> sebelum polis tersebut
      lapse atau berhenti.
    </Text>
  ),
  debitOtomatis: 'Debit otomatis hanya berlaku untuk ',
  listOtomatis: 'kartu kredit VISA dan Mastercard, dan kartu debit BNI.',

  ubahMetodeBayar: 'Ubah Metode Pembayaran',

  // Status Polis
  Active: 'Aktif',
  Aktif: 'Aktif',
  'Grace Period': 'Masa Tenggang',

  detailBerlangganan: 'Detail Berlangganan',
  dayUnit: 'h',
  ajakTeman: 'Ajak Teman',
  untukPembayaranTanpa: 'Untuk Pembayaran Non Tunai',

  // LifeCOVER
  jumlahPenerimaManfaat: 'Jumlah Penerima Manfaat',
  penerimaManfaat: 'Penerima Manfaat',
  penerimaManfaats: 'Penerima Manfaat',
};
