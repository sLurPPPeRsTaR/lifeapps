import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: { paddingTop: 32 },
  addressCard: {
    container: { paddingHorizontal: 12, paddingVertical: 24 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    content: {
      flexShrink: 1,
    },
    footer: { marginTop: 12 },
    containerActive: {
      borderWidth: 1,
      borderColor: Color.primary.light.primary90,
      marginBottom: 16,
      marginTop: 16,
    },
    circleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      width: 16,
      height: 16,
      borderRadius: 100,
    },
    innerCircleContainer: { width: 11, height: 11, borderRadius: 100 },
  },
  footer: {
    container: { paddingBottom: 48 },
  },
  addressNull: {
    container: {
      width: Size.screen.width - 32,
      height: Size.screen.height / 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
  },
  modal: {
    deleteSuccess: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
      },
      icon: {
        position: 'absolute',
        top: -140,
        width: 128,
        height: 146,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
    },
    deleteConfirmation: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
      },
      image: {
        position: 'absolute',
        top: -120,
        width: 145,
        height: 160,
        resizeMode: 'contain',
      },
      text: {
        marginBottom: 24,
      },
      button1: {
        marginBottom: 16,
      },
    },
  },
  lineGap: {
    height: 10,
    width: Size.screen.width,
    marginTop: 8,
    marginBottom: 24,
  },
  mb16: { marginBottom: 16 },
  pT24: { paddingTop: 24 },
  mT16: { marginTop: 16 },
  mB8: { marginBottom: 8 },
};
