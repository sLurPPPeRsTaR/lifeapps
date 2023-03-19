import React from 'react';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default {
  // listSliderPairing
  howToPairing: 'More Responsive Emergency',
  contentPairing:
    'LifeTag is exclusively built for you, so emergencies can be handled quickly.',
  keadaanDaruratDitangani:
    'LifeTag is exclusively built for you, so emergencies can be handled quickly.',

  // conditionalButton
  hubungkanLifetag: 'Buy LifeTag',
  berlanggananLifeSAVER: 'Subscribe',

  // ALERTDIALOGUE
  untukMendapatkanLifeTAG: (
    <Text
      align="left"
      textStyle="regular"
      size={Size.text.caption1.size}
      line={21}
      color={Color.main.light.white}>
      To connect LifeTag, you need to subscribe{' '}
      <Text
        textStyle="medium"
        size={Size.text.caption1.size}
        color={Color.main.light.white}>
        Life
        <Text
          textStyle="mediumItalic"
          color={Color.main.light.white}
          size={Size.text.caption1.size}>
          SAVER
        </Text>
      </Text>{' '}
      so you can get more protected.
    </Text>
  ),
};
