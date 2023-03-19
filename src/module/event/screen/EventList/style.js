import Color from 'ca-config/Color';

export default {
  padderContainer: {
    backgroundColor: Color.greyBackround.dark.greyBackground,
    flex: 1,
    paddingTop: 15,
  },

  eventFilter: {
    wrapper: {
      height: 60,
    },
    scrollViewContentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
    },
    borderWrapper: {
      borderColor: Color.landingPage.light.orange,
      borderWidth: 2,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.main.light.white,
      marginRight: 15,
    },
    activeBorderWrapper: {
      borderColor: Color.main.light.white,
      borderWidth: 2,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Color.landingPage.light.orange,
      marginRight: 15,
    },
    filter: {
      height: '100%',
      flexDirection: 'row',
      paddingHorizontal: 6,
      paddingVertical: 6,
    },
    filterText: {
      color: Color.landingPage.light.orange,
      marginLeft: 6,
    },
    button: {
      height: '95%',
      paddingHorizontal: 15,
      paddingVertical: 6,
    },
    buttonText: {
      color: Color.landingPage.light.orange,
    },
    activeButtonText: {
      color: Color.main.light.white,
    },
  },

  renderContent: {
    waveImg: {
      position: 'absolute',
      bottom: -40,
    },
  },

  mT20: { marginTop: 20 },
  mT30: { marginTop: 30 },
  pB30: { paddingBottom: 30 },
  mH20: { marginHorizontal: 20 },
  mB20: { marginBottom: 20 },
  mV16: { marginVertical: 16 },
  mT24: { marginTop: 24 },
  mB10: { marginBottom: 10 },
};
