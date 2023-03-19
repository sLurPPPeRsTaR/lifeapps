import React from 'react';
import Text from 'ca-component-generic/Text';
import style from '../style';

export default {
  headerTitle: (
    <Text textStyle="bold" style={style.titleHeader}>
      Feel Safer with Life
      <Text textStyle="boldItalic" style={style.titleHeader}>
        COVER
      </Text>
    </Text>
  ),
  headerSubtitle: (
    <Text textStyle="medium" style={style.subtitleHeader}>
      Find life insurance that suits your budget and needs
    </Text>
  ),
  benefitTitle: (
    <Text textStyle="bold" style={style.titleBenefit}>
      Life
      <Text textStyle="boldItalic" style={style.titleBenefit}>
        COVER
      </Text>{' '}
      Benefits
    </Text>
  ),
  benefitSubtitle: (
    <Text textStyle="medium" style={style.subtitleBenefit}>
      Life
      <Text textStyle="medium" style={style.subtitleBenefit}>
        COVER
      </Text>{' '}
      is term life protection with the benefit of dying due to a cause whether
      it was an accident or not an accident.
    </Text>
  ),

  manfaat: 'Benefits',
  semangatLifecover: 'Passion with LifeCOVER',
  deskripsiLifecover:
    'LifeCOVER  is term life protection with the benefit of dying due to a cause whether it was an accident or not an accident.',
  pengecualian: 'Exception',
  cobaSimulasi: 'Try the LifeCover calculation',
  hitungSimulasi: 'Check calculation',
  mulaiBerlangganan: 'Subscribe',
  syaratDanKetentuan: 'Terms and Conditions',
  ringkasanInformasi: 'Product & Service Information Summary (RIPLAY)',
  riplay: 'RIPLAY',
  butuhBantuan: 'Need help from? Please Contact',
  customerCare: 'Customer Care',
  ptAsuransiJiwa: 'PT Asuransi Jiwa IFG is licensed and supervised by OJK.',
};
