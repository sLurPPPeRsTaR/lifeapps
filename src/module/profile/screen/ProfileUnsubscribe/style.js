import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
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
    text: {
      marginBottom: 10,
    },
  },
  benefit:{
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
  },
  banner:{
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 40,
        
      },
      image: {
        marginTop: 15,
        width: Size.screen.width-32,
        height: null,
        aspectRatio: 1080 / 482,
      }
  },
  menu: {
    shadow: {
      marginHorizontal: 16,
      marginTop: 24,
    },
    card: {
      container: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Color.grayBorder.light.grayBorder,
      },
      containerNoBorder: {
        paddingVertical: 16,
      },
      leftIcon: {
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card: {
        paddingVertical: 8,
        paddingEnd: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      content: {
        container: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  },
  bottom: {
    tetapBatalkan: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
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
};
