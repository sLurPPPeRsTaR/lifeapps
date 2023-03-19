import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  root: {
    height: 45,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Color.main.light.white,
    marginVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    shadowColor: Color.mediumDarkGray.light.mediumDarkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  rootHasPrefixIcon: {
    paddingLeft: 40,
  },
  rootHasSuffixIcon: {
    paddingRight: 40,
  },
  variantSelectable: {
    height: 56,
    borderColor: Color.grayInput.dark.grayInput,
    borderWidth: 1.5,
    elevation: 0,
  },
  variantSelectableActive: {
    borderColor: Color.buttonGradient.dark.buttonGradient0,
    backgroundColor: Color.red.dark.ED1C2407,
  },
  text: {
    flex: 1,
  },
  textVariantSelectable: {
    textAlign: 'center',
  },
  textVariantSelectableActive: {
    color: Color.buttonGradient.dark.buttonGradient0,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: 40,
  },
  prefixIconContainer: {
    left: 0,
  },
  suffixIconContainer: {
    right: 0,
  },
});
