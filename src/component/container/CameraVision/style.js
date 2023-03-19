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
  renderDocument: {
    container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    image: { width: 360, height: 248, resizeMode: 'contain' },
  },
  renderQr: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      transform: [{ rotate: '90deg' }, { scaleX: 1.25 }, { scaleY: 1.25 }],
    },
  },
  flex1: { flex: 1 },
  backgroundColorBlack: { backgroundColor: 'black' },
  marginRight16: { marginRight: 16 },
};
