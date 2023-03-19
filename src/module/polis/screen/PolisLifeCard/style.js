import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  header: {
    container: {
      borderBottomWidth: 0.75,
      borderTopWidth: 0.75,
      borderColor: Color.grayBorder.light.grayBorder,
      marginBottom: 24,
      backgroundColor: Color.main.light.white,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
  },
  ecard: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 24,
      minHeight: Size.screen.height / 2.5,
    },
    containerNull: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Size.screen.height / 1.6,
    },
    image: { resizeMode: 'cover', borderRadius: 16 },
    imageNull: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
  },
  reloadPage: {
    container: {
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 110,
    },
  },

  renderLifetagContainer: {
    container: {
      padding: 30,
      borderRadius: 30,
      overflow: 'hidden',
    },
    imgStyle: { position: 'absolute', bottom: 0 },
    image: { width: 117, height: 121, resizeMode: 'contain' },
    image2: { width: 220, height: 220, resizeMode: 'contain' },
    image3: { width: 150, height: 150, resizeMode: 'contain' },
    textContainer: { justifyContent: 'center', alignItems: 'center' },
  },

  healthInfo: {
    container: {},
    healthInfoCard: {
      container: {
        backgroundColor: Color.main.light.white,
        borderRadius: 20,
        flexDirection: 'row',
        overflow: 'hidden',
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      linearGradient: {
        width: 100,
        height: 100,
        borderRadius: 100,
        position: 'absolute',
        top: -10,
        left: -25,
      },
      icon: {
        container: {
          flex: 1,
          width: 70,
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: { width: 56, height: 56 },
      },
    },
  },

  kontakDarurat: {
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  logo: { width: 76, height: 21, resizeMode: 'contain', marginTop: 16 },

  imgSize: { height: Size.screen.height / 1.25, position: 'absolute' },
  gapLine: { height: 10, width: Size.screen.width },
  positionAbsolute: { position: 'absolute' },
  pT24: { paddingTop: 24 },
  mB16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mT22: { marginTop: 22 },
  mT24: { marginTop: 24 },
  mT16: { marginTop: 16 },
  ml8: { marginLeft: 8 },
  mb8: { marginBottom: 8 },
};
