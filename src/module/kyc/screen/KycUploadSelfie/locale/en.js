import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default {
  // pages title
  verifikasiWajah: 'Face Verification',

  // renderContent
  lakukanVerifikasiWajah:
    'Do a face verification to get the benefits that you can enjoy:',

  // renderSubContent
  klaimMudah: 'Easy Claim',
  prosesMenjadiLebih: 'Process becomes easier in the hospital',
  verifikasiUntukSemua: 'Verification For All Insurance',
  verifikasiYangKamu:
    'Verify what you do, as personal data used for other insurance services.',
  saatVerifikasiWajah: (
    <Text
      textStyle="medium"
      size={Size.text.caption2.size}
      color={Color.kycNotesColor.light.color}
      line={18}>
      When verifying the face, position the face as best as possible so that the
      resulting photo is attractive for your{' '}
      <Text
        textStyle="semi"
        size={Size.text.caption2.size}
        color={Color.kycNotesColor.light.color}
        line={18}>
        LifeCARD
      </Text>{' '}
      photo later.{' '}
    </Text>
  ),

  // AlertDialogue
  dataPribadiKamu: 'Your personal data will be stored and protected safely.',

  // renderBottom
  ambilGambar: 'Take Picture',
};
