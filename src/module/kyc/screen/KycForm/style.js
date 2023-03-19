import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  renderInputContainer: {
    rtrwWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    rtContent: { marginEnd: 14, flex: 1 },
    rwContent: { marginStart: 14, flex: 1 },
  },
  renderFooterContainer: {
    container: { paddingTop: 20, paddingBottom: 48 },
    checkBox: {
      container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 16,
      },
      checkBox: {
        width: 22,
        height: 22,
        marginEnd: 10,
        marginTop: Size.isAndroid ? 3 : 5,
      },
    },
  },

  renderKtpNotValidModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    image: { position: 'absolute', top: -160, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },

  radioButton: {
    radioButtonContainer: {
      backgroundColor: Color.main.light.white,
      width: (Size.screen.width - 56) / 2,
      height: 44,
      marginTop: 1,
      marginBottom: 2,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: Color.grayInput.light.grayInput,
      paddingHorizontal: 10,
      borderRadius: 16,
    },
    radioButtonContent: {
      width: 18,
      height: 18,
      borderWidth: 1.5,
      borderColor: Color.borderButtonGray.dark.borderButtonGray,
      borderRadius: 100,
      marginEnd: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonCircle: {
      width: 10,
      height: 10,
      borderRadius: 100,
      backgroundColor: Color.primary.light.primary90,
    },
    radioButtonInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },

  renderMartialOptModal: {
    mV16: { marginVertical: 16 },
  },

  renderKtpExistModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    image: { position: 'absolute', top: -150, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },

  mB4: { marginBottom: 4 },
  mB20: { marginBottom: 20 },
  mB16: { marginBottom: 16 },
  mT20: { marginTop: 20 },
  flexShrink1: { flexShrink: 1 },
};
