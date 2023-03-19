/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';

export default {
  lifeCard: 'LifeCARD',
  kamuBelumMempunyai: "You don't have a LifeCARD.",
  kontenGagalDiTampilkan: 'Failed to Get Content',
  muatUlang: 'Refresh',

  // renderLifetagContainer
  lifetag: 'LifeTag',
  kamuBelumMemiliki: "You don't have a LifeTag yet, get your LifeTag now!",
  keadaanDaruratDitangani: 'Emergencies are handled faster with LifeTag.',
  dapatkanLifetag: 'Get LifeTag',
  hubungkanLifetag: 'Connect LifeTags',
  titleProses: 'LifeTag is being processed',
  pengiriman:
    'Your LifeTag is currently on delivery. Estimated delivery 2-4 working days, depending on your delivery area.',
  informasiKesehatan: 'Health Information',
  golonganDarah: 'Blood Type',
  alergi: 'Allergy',
  kontakDarurat: 'Emergency Contact',
  kontakDaruratInfo:
    'This emergency contact uses a hotline service to prevent unwanted things.',
  gracePeriodTitle: 'Sorry, Your Lifetag Could Not Be Processed',
  gracePeriodContent: (
    <Text align="center" textStyle="regular" line={21}>
      For getting a LifeTag, you need to extend your{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      first for optimal protection
    </Text>
  ),

  // LIFETAG COMING SOON
  comingSoonTitle: 'LifeTag Coming Soon!',
  comingSoonContent: (
    <Text align="center" textStyle="regular" line={21}>
      Let's keep to extend your{' '}
      <Text textStyle="medium" size={Size.text.caption1.size}>
        Life
        <Text textStyle="mediumItalic">SAVER</Text>
      </Text>{' '}
      so you can have more opportunity to get a LifeTag.
    </Text>
  ),
};
