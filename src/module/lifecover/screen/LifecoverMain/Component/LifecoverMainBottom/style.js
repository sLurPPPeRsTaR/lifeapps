import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  root: StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 5,
      backgroundColor: Color.whiteBackground.dark.transparent,
    },
  }),
  // SECTION STYLES
  sectionSlider: StyleSheet.create({
    container: {
      paddingVertical: 44,
    },
    padder: {
      paddingTop: 15,
      paddingBottom: 30,
    },
    containerDescription: {
      marginTop: 10,
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: Size.fontFamily.semi,
      fontWeight: '600',
      fontSize: 20,
      color: Color.blackHome.dark.blackHome,
      marginBottom: 8,
    },
    description: {
      fontFamily: Size.fontFamily.medium,
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 21,
      color: Color.mediumGray.dark.mediumGray,
    },
  }),
  sectionException: StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    container: {
      paddingBottom: 40,
    },
    title: {
      fontFamily: Size.fontFamily.semi,
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
      color: Color.blackHome.dark.blackHome,
      marginBottom: 20,
    },
  }),
  sectionSimulation: StyleSheet.create({
    container: {
      minHeight: 170,
      width: '100%',
      backgroundColor: Color.red.dark.D71920,
      position: 'relative',
      zIndex: 2,
    },
    containerBg: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0,
      paddingHorizontal: 16,
    },
    contentIllustration: {
      width: 183,
      height: 183,
      resizeMode: 'contain',
      position: 'relative',
      top: 25,
    },
    contentBody: {
      marginLeft: 25,
    },
    contentTitle: {
      fontFamily: Size.fontFamily.bold,
      fontSize: 14,
      fontWeight: '700',
      color: Color.whiteCard.dark.color,
      lineHeight: 20,
      maxWidth: 136,
      marginBottom: 5,
    },
    contentButton: {
      borderWidth: 1,
      borderColor: Color.whiteCard.dark.color,
      borderRadius: 8,
      paddingHorizontal: 12.5,
      paddingVertical: 4,
      color: Color.whiteCard.dark.color,
      marginTop: 10,
      display: 'flex',
      justifyContent: 'center',
    },
    contentButtonTitle: {
      fontFamily: Size.fontFamily.bold,
      fontSize: 12,
      fontWeight: '700',
      color: Color.whiteCard.dark.color,
      textAlign: 'center',
    },
  }),
  sectionFooter: StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: Color.whiteBackground.dark.whiteBackground,
      paddingTop: 50,
      paddingBottom: 30,
    },
    containerTerms: {
      paddingTop: 20,
      paddingBottom: 15,
    },
  }),

  // COMPONENT STYLES
  slider: StyleSheet.create({
    card: {
      container: {
        justifyContent: 'center',
      },
      youtubeBorder: {
        overflow: 'hidden',
        flex: 1,
        borderRadius: 12,
      },
      containerTab: {
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      image: {
        borderRadius: 16,
        width: Size.screen.width - 48,
        height: (Size.screen.width - 48) / 1.78,
      },
      imageTab: {
        borderRadius: 16,
        width: Size.screen.width / 2,
        height: Size.screen.width / 2 / 1.91,
      },
      marginCard: {
        card: {
          marginStart: 16,
        },
        lastCard: {
          marginHorizontal: 16,
        },
      },
    },
    title: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    subtitle: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
  }),
  bullet: StyleSheet.create({
    container: {
      margin: 16,
      flexDirection: 'row',
    },
    active: {
      width: 60,
      height: 8,
      backgroundColor: Color.primary.light.primary90,
      marginHorizontal: 5,
      borderRadius: 16,
    },
    inactive: {
      width: 8,
      height: 8,
      backgroundColor: Color.dotInActive.light.dotInActive,
      marginHorizontal: 5,
      borderRadius: 16,
    },
  }),
  subscribeBtnContainer: StyleSheet.create({
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  termList: StyleSheet.create({
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
