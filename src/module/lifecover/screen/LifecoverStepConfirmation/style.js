import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  root: StyleSheet.create({
    container: {
      flex: 1,
    },
  }),

  header: StyleSheet.create({
    image: {
      backgroundColor: Color.landingPage.dark.red,
    },
    container: {
      position: 'absolute',
      alignItems: 'center',
      left: 0,
      right: 0,
    },
  }),

  cardSummary: StyleSheet.create({
    header: {
      paddingVertical: 24,
      paddingHorizontal: 24,
    },
    logo: {
      width: 136,
      height: 24,
      resizeMode: 'contain',
      marginRight: 30,
    },
    headerContentContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    body: {
      paddingVertical: 15,
      paddingHorizontal: 17,
    },
  }),

  item: StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    textImportant: {
      fontSize: Size.text.caption1.size,
      color: Color.landingPage.dark.red,
      lineHeight: 18,
      position: 'absolute',
      right: -10,
    },
    textGrayH6: {
      fontSize: Size.text.h6.size,
      color: Color.mediumGray.dark.mediumGray,
      lineHeight: 18,
      position: 'relative',
    },
    textGrayBody2: {
      color: Color.mediumGray.dark.mediumGray,
      lineHeight: 20,
    },
    textGrayBody1: {
      color: Color.mediumGray.dark.mediumGray,
      lineHeight: 20,
    },
    textGray: {
      fontSize: Size.text.caption1.size,
      color: Color.mediumGray.dark.mediumGray,
      lineHeight: 18,
      position: 'relative',
    },
    textDarkBody2: {
      color: Color.neutral.dark.neutral60,
      lineHeight: 20,
    },
    textDark: {
      fontSize: Size.text.caption1.size,
      color: Color.neutral.dark.neutral60,
      lineHeight: 18,
    },
    textGreenH6: {
      fontSize: Size.text.h6.size,
      color: Color.greenActive.dark.color,
      lineHeight: 29,
    },
    textGreenBody2: {
      color: Color.greenActive.dark.color,
      lineHeight: 20,
    },
  }),

  confirmation: StyleSheet.create({
    container: {
      paddingVertical: 20,
      minHeight: 120,
      backgroundColor: Color.main.light.white,
      // backgroundColor: Color.primary.dark.primary20,
    },
  }),

  mr4: {
    marginRight: 4,
  },
  mb10: {
    marginBottom: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mt5: {
    marginTop: 5,
  },
  mt20: {
    marginTop: 20,
  },
  pb20: {
    paddingBottom: 20,
  },
};
