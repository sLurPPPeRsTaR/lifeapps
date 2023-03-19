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
  headerTitle: {
    // marginBottom: 6,
  },
  inputCard: {
    paddingTop: 16,
    paddingBottom: 24,
    marginBottom: 40,
  },
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    marginBottom: 24,
  },
  modal: {
    container: {
      paddingTop: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
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
    // button1: { flex: 1, marginEnd: 12 },
    // button2: { flex: 1, marginStart: 12 },
  },
  footerContainer: {
    marginBottom: 48,
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
  me23: {
    marginEnd: 23,
  },
  renderInputCard: {
    isShowFloatingMsg: {
      container: { position: 'absolute', top: -45, left: -12 },
      content: { position: 'absolute', marginLeft: 15, marginTop: 10 },
    },
  },
  pB: { paddingBottom: Size.screen.height },
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
};
