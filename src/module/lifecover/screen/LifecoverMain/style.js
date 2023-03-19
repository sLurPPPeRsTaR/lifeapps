import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

const baseStyle = StyleSheet.create({
  title: {
    fontSize: Size.text.h5.size,
    color: Color.whiteCard.dark.color,
  },
  subtitle: {
    fontSize: Size.text.body2.size,
    color: Color.whiteCard.dark.color,
    lineHeight: 21,
    letterSpacing: 0.5,
  },
});
export default StyleSheet.create({
  root: {
    flex: 1,
  },
  rootScrollView: {
    flex: 1,
  },
  titleHeader: {
    ...baseStyle.title,
    textAlign: 'center',
    maxWidth: 200,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitleHeader: {
    ...baseStyle.subtitle,
    textAlign: 'center',
    maxWidth: 320,
  },
  titleBenefit: {
    ...baseStyle.title,
    marginBottom: 10,
    marginTop: -30,
  },
  subtitleBenefit: {
    ...baseStyle.subtitle,
    maxWidth: 315,
  },
});
