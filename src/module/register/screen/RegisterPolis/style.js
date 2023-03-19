import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
    // justifyContent: 'space-between',
  },
  placeCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  imageContainer: {
    image: {
      marginVertical: 32,
      width: 190,
      height: 190,
    },
  },
  inputCard: {
    button: { width: 104, height: 40 },
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
    text: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 25,
    },
  },
  polisFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 14,
    },
    icon: {
      width: 175,
      height: 175,
      marginBottom: 8,
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
  policyFoundModal: {
    container: { paddingTop: 20, alignItems: 'center' },
    image: { width: 200, height: 200, position: 'absolute', top: -190 },
    title: { marginBottom: 8 },
    subtitle: { marginBottom: 24 },
    button1: { marginBottom: 16 },
  },
  policyNotFoundModal: {
    container: { paddingTop: 20, alignItems: 'center' },
    image: { width: 200, height: 200, position: 'absolute', top: -170 },
    title: { marginBottom: 8 },
    subtitle: { marginBottom: 24 },
    button1: { marginBottom: 16 },
  },
  tooFrequentlyModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginVertical: 16,
    },
    text1: {
      marginBottom: 8,
    },
    text2: {
      marginBottom: 24,
    },
  },
  mb8: {
    marginBottom: 8,
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
  mt16: {
    marginTop: 16,
  },
  mT35: {
    marginTop: 35,
  },
};
