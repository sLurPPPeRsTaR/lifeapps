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

  renderFotoKtpFailModal: {
    containerIcon: { flexDirection: 'row', marginVertical: 16 },
    iconGap: { marginRight: 5, width: 24, height: 24 },
    button: { marginTop: 24 },
    containerImg: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    imgSize: { width: 300, height: 300, position: 'absolute', top: -250 },
  },

  renderCompareFailModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    image: { position: 'absolute', top: -140, width: 250, height: 200 },
    title: {
      marginBottom: 8,
    },
    content: {
      marginBottom: 16,
    },
  },

  renderKtpNotValidModal: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 70,
    },
    image: { position: 'absolute', top: -140, width: 250, height: 200 },
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
