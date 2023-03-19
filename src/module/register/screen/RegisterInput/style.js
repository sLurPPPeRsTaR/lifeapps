import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  baseBackground: {
    backgroundColor: Color.main.light.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
  },
  headerContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    marginBottom: 24,
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
  shadow: {
    shadowOffset: { width: 0, height: 8 },
    shadowColor: Color.lightBrown.light.lightBrown,
    shadowOpacity: 0.25,
    elevation: 10,
  },
  footerContainerWrapper: {
    marginBottom: 39,
    paddingHorizontal: 20,
  },
  modal: {
    container: {
      paddingTop: 20,
    },
    icon: {
      marginBottom: 16,
      marginStart: '30%',
    },
    text1: {
      marginBottom: 6,
    },
    text2: {
      marginBottom: 24,
    },
  },

  tooFrequently: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 75,
    },
    icon: {
      width: 153,
      height: 140,
      position: 'absolute',
      top: -80,
    },
    title: {},
    subtitle: { marginTop: 8 },
    button1: {
      marginTop: 42,
      borderRadius: 16,
    },
  },
  renderInputCard: {
    isShowFloatingMsg: {
      container: { position: 'absolute', top: -45, left: -12 },
      content: {
        position: 'absolute',
        top: 10,
        left: 10,
      },
      image: { width: 262, height: 51 },
    },
  },
  TouchableWithoutFeedback: {
    container: { paddingBottom: 80 },
  },
};
