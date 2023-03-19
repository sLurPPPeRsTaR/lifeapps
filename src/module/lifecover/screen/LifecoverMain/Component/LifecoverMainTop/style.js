import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  root: StyleSheet.create({
    container: {
      position: 'relative',
    },
  }),

  // SECTION STYLES
  header: StyleSheet.create({
    container: {
      backgroundColor: Color.red.dark.D71920,
      minHeight: 320,
      position: 'relative',
    },
    decoration: {
      position: 'absolute',
      top: 0,
      width: Size.screen.width,
      height: 267,
      resizeMode: 'cover',
    },
    padder: {
      paddingTop: 140,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
  sectionBenefit: StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 1,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Color.whiteBackground.dark.whiteBackground,
    },
    contentContainer: {
      minHeight: 740,
      flexShrink: 0,
      backgroundColor: Color.red.dark.D71920,
    },
    imageLandingContainer1: {
      position: 'relative',
      width: Size.screen.width,
      height: 386,
    },
    imageLanding1: {
      position: 'absolute',
      right: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    textContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    },
    imageDecoration1: {
      position: 'absolute',
      height: 345,
      top: -110,
      resizeMode: 'contain',
    },
    contentContainer2: {
      minHeight: 140,
      backgroundColor: Color.whiteBackground.dark.whiteBackground,
      position: 'relative',
    },
    imageLandingContainer2: {
      position: 'relative',
      width: Size.screen.width,
      height: 334,
      marginTop: -240,
    },
    imageLanding2: {
      position: 'absolute',
      right: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    imageDecorationContainer2: {
      position: 'relative',
      width: Size.screen.width,
      minHeight: 419.91,
    },
    imageDecoration2: {
      position: 'absolute',
      right: 0,
      width: Size.screen.width,
      height: 759.91,
      resizeMode: 'cover',
      flexShrink: 0,
      top: -80,
    },
    benefitListContainer: {
      position: 'relative',
      zIndex: 5,
      marginTop: -419,
      marginBottom: 45,
    },
  }),

  // COMPONENT STYLES
  benefitList: StyleSheet.create({
    padder: {
      flexShrink: 0,
    },
    title: {
      marginBottom: 30,
      marginTop: 30,
      flexShrink: 0,
    },
    listItemImage: {
      width: 50,
      height: 50,
    },
    listItemTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    listItemNumber: {
      marginRight: 10,
    },
    listItemText: {
      flexShrink: 0,
      flex: 1,
      lineHeight: 22,
      fontSize: Size.text.caption1.size,
      color: Color.neutral.light.neutral40,
    },
    helpContainer: {
      backgroundColor: Color.landingPage.dark.lightGray,
      paddingVertical: 8,
      borderRadius: 10,
      marginBottom: 10,
    },
    helpText: {
      marginBottom: 4,
    },
  }),
};
