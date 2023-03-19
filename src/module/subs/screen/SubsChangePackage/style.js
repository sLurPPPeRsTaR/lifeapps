import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  imgBGContainer: { width: Size.screen.width, height: 560 },
  container: {
    marginBottom: 24,
    borderRadius: 24,
  },
  main: {
    padder: {
      minHeight: Size.screen.height - 56,
    },
    container: {
      marginVertical: 16,
    },
  },
  image: {
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 40,
    },
    image: {
      marginBottom: 40,
    },
    image2: {
      position: 'absolute',
      top: -200,
    },
  },
  benefit: {
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  },
  item: {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: { width: 100, height: 17, resizeMode: 'contain' },
    backgroundFrom: {
      marginTop: 10,
      borderRadius: 8,
      backgroundColor: Color.redTitleBgNotif.light.color,
      paddingHorizontal: 10,
      minWidth: 120,
      paddingVertical: 8,
    },
    backgroundTo: {
      marginTop: 10,
      borderRadius: 8,
      backgroundColor: Color.grayLine.light.color,
      paddingHorizontal: 10,
      minWidth: 120,
      paddingVertical: 8,
    },
    text: {
      alignSelf: 'center',
    },
  },
  menu: {
    container: {
      marginHorizontal: 16,
    },
    icon: {
      position: 'relative',
      alignSelf: 'center',
      zIndex: 1,
      marginBottom: -50,
      width: 50,
      height: 50,
    },
    text: {
      marginBottom: 20,
    },
    shadow: {
      borderRadius: 16,
      marginVertical: 24,
      overflow: 'hidden',
    },
    shadow2: {
      borderRadius: 16,
      marginHorizontal: 36,
      overflow: 'hidden',
      zIndex: 2,
      marginBottom: -15,
    },
    benefitItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 24,
      paddingTop: 30,
    },
  },
  bottom: {
    logoImage: {
      width: 70,
      height: 12,
      marginHorizontal: 5,
    },
    icon: {
      width: 60,
      height: 60,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 36,
      paddingBottom: 16,
      paddingHorizontal: 20,
    },
    container2: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    container3: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 16,
      paddingTop: 30,
      paddingHorizontal: 5,
    },
    container4: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    tetapBatalkan: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
  },
  mt16: {
    marginTop: 16,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  mt10: {
    marginTop: 10,
  },
  mv10: {
    marginVertical: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt15: {
    marginTop: 15,
  },
  mb30: {
    marginBottom: 30,
  },
  mb59: {
    marginBottom: 59,
  },
  mb10: {
    marginBottom: 10,
  },
  fx1: {
    flex: 1,
  },
  p3: {
    padding: 3,
  },
};
