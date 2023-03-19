import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  header: {
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      resizeMode: 'contain',
      alignSelf: 'center',
      width: 344,
      height: 234,
    },
    title: {
      marginBottom: 6,
    },
    subtitle: {
      marginBottom: 24,
    },
  },
  inputCard: {},
  modal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingHorizontal: 24,
    },
    icon: {
      position: 'absolute',
      top: -130,
      width: 200,
      height: 200,
      marginBottom: 24,
    },
    text1: {
      marginBottom: 8,
    },
    text2: {
      marginBottom: 24,
    },
  },
  mb28: {
    marginBottom: 28,
  },
  pb80: {
    paddingBottom: 80,
    // width: Size.screen.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: Size.screen.width,
    height: 195,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: 'flex-end',
  },
};
