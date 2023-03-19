import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  main: {
    container: {
      flex: 1,
      backgroundColor: Color.backgroundVoucher.light.color,
    },
    header: {
      zIndex: 10,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    headerImage: {
      top: -56,
      position: 'absolute',
      width: Size.screen.width,
    },
    contentContainer: {
      flexDirection: 'column',
      paddingVertical: 16,
      borderRadius: 16,
      marginBottom: 20,
      backgroundColor: Color.whiteCard.light.color,
      width: 320,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    contentBackground: {
      height: 534,
      width: 310,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 16,
    },
    circleHalfContainer: {
      marginHorizontal: -13,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 16,
    },
    circleHalfItem: {
      backgroundColor: Color.bgCampaign.light.color,
      width: 27,
      height: 27,
      borderRadius: 13,
    },
  },
  containerScrollView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  banner: {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      aspectRatio: 277 / 115,
      width: 290,
    },
    labelContainer: {
      marginTop: 10,
      paddingHorizontal: 16,
    },
    subTitle: {
      width: 270,
      marginTop: 8,
    },
    spiralLine: {
      width: 293,
    },
  },
  descHeader: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: { width: 106, height: 19 },
    product: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    gratis: {
      backgroundColor: Color.greenActive.light.color,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 15,
    },
  },
  desc: {
    container: {
      flexDirection: 'column',
      paddingHorizontal: 24,
    },
  },
  bottom: {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 5,
      position: Size.screen.height > 770 ? 'absolute' : null,
      width: Size.screen.width,
      justifyContent: 'center',
      bottom: 20,
    },
    attentionContainer: { width: 320 },
    attentionLabel: {
      backgroundColor: Color.whiteCard.light.transparent,
      paddingVertical: 10,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textLabel: { marginLeft: 10, marginRight: 10 },
    callCenterContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  },
  dialogNotEligible: {
    imageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      top: 10,
      marginTop: -130,
    },
    image: { width: 167, height: 180 },
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      marginTop: 16,
      marginBottom: 5,
    },
    buttonContainer: { width: Size.screen.width - 32, marginTop: 24 },
  },
  dialogNotEkyc: {
    iconContainer: { alignItems: 'center', top: 60 },
    icon: {
      position: 'absolute',
      top: -260,
      width: 300,
      height: 300,
    },
    title: {},
    subtitle: { marginBottom: 24, marginTop: 10 },
    button1: { marginBottom: 16 },
  },
  w267: { width: 267 },
  flex1: {
    flex: 1,
  },
  mt16: { marginTop: 16 },
  ml10: {
    marginLeft: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt40: {
    marginTop: 40,
  },
  mt5: {
    marginTop: 5,
  },
  mt55: {
    marginTop: 55,
  },
};
