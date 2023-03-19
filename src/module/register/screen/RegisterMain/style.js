import Color from 'ca-config/Color';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  baseBackground: {
    backgroundColor: Color.greyBackround.light.greyBackground,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingVertical: 8.11,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 18,
  },
  captionContainer: {
    flex: 1,
    marginBottom: 24,
  },
  caption: {
    marginBottom: 8,
  },
  logo: {
    marginBottom: 4.85,
  },
  buttonIcon: {
    marginRight: 8,
  },
  mb20: {
    marginBottom: 20,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  failedModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 24,
    },
    text1: {
      marginBottom: 28,
      marginTop: 20,
    },
    text2: {
      marginBottom: 24,
    },
  },
  flex: { flex: 1 },
  mR5: { marginRight: 5 },
});
