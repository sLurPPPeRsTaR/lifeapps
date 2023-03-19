import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  renderCameraContainer: {
    cameraFrame: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
  },
  renderFooterContainer: {
    container: {
      backgroundColor: 'black',
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonBlack: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'white',
      marginBottom: 16,
    },
  },

  renderLivenessFailModal: {
    containerIcon: { flexDirection: 'row', marginVertical: 16 },
    iconGap: { marginRight: 5, width: 24, height: 24 },
    button: { marginTop: 24 },
  },

  renderTimeOutModal: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    text: { marginTop: 12 },
    button: { marginTop: 24 },
    icon: {
      position: 'absolute',
      top: -170,
      width: 230,
      height: 200,
    },
  },

  renderCompareFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    image: { position: 'absolute', top: -180, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },

  flex: { flex: 1 },
  mT20: { marginTop: 20 },
};
