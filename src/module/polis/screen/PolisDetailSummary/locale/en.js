import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  masaBerlakuAsuransi: 'Insurance Validity Period',
  tanggalJatuhTempo: 'Due date',
  hargaPremi: 'Premium Price',
  paket: 'Package',
  diasuransikanOleh: 'Subscribe from',
  didukungOleh: 'Supported by',
  // Lifesaver
  masaTunggu: 'Benefit Waiting Period',
  upgradePaket: 'Upgrade Package',
  biayaMedisAkibat: 'Medical Expenses Due to\nAccidents (Per Case)',
  biayaMedisDanFisioterapi: 'Medical Expenses and\nPhysiotherapy ',
  biayaMedisDan: 'Medical Expenses and Physiotherapy',
  akibatCederaSaat:
    'Cause of Injury during Sports, Travel/Trip, or Adventure Activities (Per Case)',

  // Count Down Widget Grace Period
  masaTenggang: 'Grace Period',
  proteksiBerakhirPada: 'Protection ends on',

  // Alert Dialogue Grace Period
  agarTetapProteksi:
    'To stay protected, you have to change or make sure payment method can be re-debited before the date ',
  pukul: ',',
  // Info Modal Grace Period
  masaTenggangAdalah: (
    <Text color={Color.neutral.light.neutral40}>
      The grace period is an opportunity given to customers to reactivate the
      policy
      <Text textStyle="bold"> without a waiting period</Text> before the policy
      lapses or stops.
    </Text>
  ),

  debitOtomatis: 'Automatic debit is only supported by ',
  listOtomatis: 'VISA and Mastercard credit cards, and BNI debit cards.',

  ubahMetodeBayar: 'Change Payment Method',

  // Status Polis
  Active: 'Active',
  Aktif: 'Active',
  'Grace Period': 'Grace Period',

  detailBerlangganan: 'Subscription Details',
  dayUnit: 'd',
  ajakTeman: 'Invite Friend',
  untukPembayaranTanpa: 'For Cashless Payment',

  // LifeCOVER
  jumlahPenerimaManfaat: 'Number of Beneficiaries',
  penerimaManfaat: 'Beneficiary',
  penerimaManfaats: 'Beneficiaries',
};
