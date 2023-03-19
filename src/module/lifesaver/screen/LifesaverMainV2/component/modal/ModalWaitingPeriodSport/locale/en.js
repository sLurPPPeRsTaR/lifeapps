import React from 'react';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';

export default {
  infoMasaTunggu: 'Waiting Period Information',
  proteksiMedis: (
    <Text textStyle="medium" line={22} color={Color.neutral.light.neutral60}>
      Waiting period for sports injury protection starts
      <Text textStyle="semi" color={Color.neutral.light.neutral60}>
        {' '}
        5 days{' '}
      </Text>
      after the policy is active.
    </Text>
  ),
};
