import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  main: {
    padder: {
      minHeight: Size.screen.height - 56,
    },
    container: {
      marginBottom: 16,
      // position: Size.screen.height < 715 ? 'relative' : 'absolute',
      // bottom: Size.screen.height < 715 ? null : 20,
      // left: Size.screen.height < 715 ? null : 16,
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
      height: null,
      width: Size.screen.width/2,
      aspectRatio: 576/663,
    },
    image2: {
      position: 'absolute',
      top: -200,
    },
    text: {
      marginBottom: 10,
    },
  },
  reason: {
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    shadow: {
      borderWidth: 1.5,
      marginVertical: 6,
    },
    touchable: {
      width: Size.screen.width / 3.5,
      height: 40,
      flexDirection: 'row',
      borderRadius: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
    },
  },
  confirmation: {
    textContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 5,
    },
    buttonBatalkan: {
      borderColor: Color.primary.light.primary60,
      borderWidth: 1,
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
