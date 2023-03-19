import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  placeCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  inputCard: {
    button: { width: 104, height: 40 },
  },
  imageContainer: {
    image: {
      marginVertical: 32,
      width: 200,
      height: 200,
    },
  },
  footer: {
    container: {
      flex: 1,
      width: Size.screen.width,
      height: 195,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 16,
      paddingBottom: 40,
      justifyContent: 'flex-end',
    },
    step: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    loading: {
      container: {
        height: 20,
        backgroundColor: Color.grayCard.light.grayCard,
        borderRadius: 12,
      },
      step: {
        height: 20,
        width: '50%',
        backgroundColor: Color.primary.light.primary90,
        borderRadius: 12,
      },
    },
  },
  modal: {
    unsuccess: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        marginBottom: 32,
        width: 170,
        height: 170,
      },
      text1: {
        marginBottom: 8,
      },
      text2: {
        marginBottom: 24,
      },
      button1: {
        marginBottom: 24,
      },
    },
    customerService: {
      container: {
        justifyContent: 'center',
        paddingTop: 20,
      },
      icon: {
        marginEnd: 8,
      },
      text1: {
        marginBottom: 6,
      },
      text2: {
        marginBottom: 20,
      },
      cardContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingStart: 4,
        paddingEnd: 8,
        borderColor: Color.grayCard.light.grayCard,
        borderWidth: 1,
        borderRadius: 8,
        height: 60,
        marginBottom: 20,
      },
    },
  },
  polisNotFoundModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 140,
      height: 140,
      resizeMode: 'contain',
      marginBottom: 8,
    },
    title: { marginBottom: 8 },
    subtitle: { marginBottom: 24 },
  },
  mb8: {
    marginBottom: 8,
  },
  mb20: {
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  mT35: {
    marginTop: 35,
  },
};
