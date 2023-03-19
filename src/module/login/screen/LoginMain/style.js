import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  baseBackground: {
    backgroundColor: Color.main.light.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
  },
  wrapper: {
    paddingTop: 24,
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginBottom: 24,
  },
  headerTitle: {
    marginBottom: 6,
  },
  inputCard: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Color.mediumLightGray.light.mediumLightGray,
    marginBottom: 16,
    backgroundColor: Color.main.light.white,
  },
  forgotPassword: {
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingVertical: 4,
      marginBottom: 24,
      marginTop: 20,
    },
    checkbox: {
      width: 22,
      height: 22,
    },
    text: {
      marginLeft: 8,
      flex: 1,
    },
  },
  modal: {
    limit: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2,
      },
      text1: {
        marginBottom: 8,
        marginTop: 3,
      },
      text2: {
        marginBottom: 24,
      },
      icon: {
        position: 'absolute',
        top: -150,
        width: 150,
        height: 150,
        resizeMode: 'contain',
      },
    },
    successPolis: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
      },
      icon: {
        position: 'absolute',
        top: -100,
        width: 128,
        height: 146,
        resizeMode: 'contain',
      },
      title: { marginBottom: 16 },
      subtitle: { marginBottom: 24 },
      button1: { marginBottom: 16 },
    },
  },
  alertBajo: {
    shadow: {
      top: 20,
      zIndex: 10,
      width: Size.screen.width - 32,
      marginLeft: 16,
      marginBottom: 10,
    },
    container: {
      backgroundColor: Color.yellowWarning.light.color2,
      padding: 16,
      flexDirection: 'row',
      zIndex: 20,
      alignItems: 'center',
    },
    label: { marginLeft: 10, width: Size.screen.width - 90 },
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
  pb50: {
    paddingBottom: 50,
  },

  shadow: {
    shadowColor: Color.main.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  ButtonContainer: {
    text: {
      alignItems: 'center',
    },
    buttonIcon: {
      marginEnd: 18,
    },
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  mR5: { marginRight: 5 },
};
