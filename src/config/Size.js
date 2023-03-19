import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default {
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  isAndroid: Platform.OS !== 'ios',
  isIphoneX: isIphoneX(),
  text: {
    h1: {
      size: 48,
    },
    h2: {
      size: 40,
    },
    h3: {
      size: 36,
    },
    h4: {
      size: 28,
    },
    h5: {
      size: 24,
    },
    h6: {
      size: 18,
    },
    body1: {
      size: 16,
    },
    body2: {
      size: 14,
    },
    caption1: {
      size: 12,
    },
    caption2: {
      size: 11,
    },
    caption3: {
      size: 10,
    },
    caption4: {
      size: 8,
    },
  },
  fontFamily: {
    regular: 'Montserrat-Regular',
    medium: 'Montserrat-Medium',
    mediumItalic: 'Montserrat-MediumItalic',
    semi: 'Montserrat-SemiBold',
    semiItalic: 'Montserrat-SemiBoldItalic',
    bold: 'Montserrat-Bold',
    boldItalic: 'Montserrat-BoldItalic',
    italic: 'Montserrat-Italic',
  },
};
