import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    width: Size.screen.width,
    height: 560,
  },

  cardOne: {
    container: {
      backgroundColor: Color.main.light.white,
      margin: 16,
      paddingTop: 30,
      paddingButton: 15,
      borderRadius: 25,
    },
  },

  dateContainer: {
    flexDirection: 'row',
    borderBottomColor: Color.referralPage.light.darkOrange,
    borderTopColor: Color.referralPage.light.darkOrange,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginTop: 10,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateTextContainer: {
    flex: 1,
    alignItems: 'center',
  },

  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },

  kadoImage: {
    aspectRatio: 55 / 60.25,
    width: '15%',
    height: undefined,
    marginRight: 15,
    marginBottom: 10,
  },

  lifeSaverLogo: {
    height: null,
    width: '54%',
    aspectRatio: 314 / 56,
  },
  lifeSAVERplusActive: {
    height: null,
    width: '55%',
    aspectRatio: 339 / 59,
  },
  lifeSaverPOS: {
    height: null,
    width: '55%',
    aspectRatio: 339 / 54,
  },

  upgradeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: 'red',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: Color.main.light.white,
  },

  shareContainer: {
    backgroundColor: Color.main.light.white,
    marginHorizontal: 16,
    borderRadius: 25,
  },
  shareContainerWrapper: {
    marginVertical: 25,
    marginHorizontal: 10,
  },
  shareContentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  detailPolis: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  center: {
    alignItems: 'center',
  },
  mb10: {
    marginBottom: 10,
  },
  verticalDivider: {
    backgroundColor: Color.referralPage.light.darkOrange,
    width: 1,
    height: '100%',
  },
  fxShrink: {
    flexShrink: 1,
  },
  imgBg: { width: 90, height: 100 },
};
