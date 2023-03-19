import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    paddingVertical: 16,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  p16: {
    padding: 16,
  },
  headerStatus: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Color.whiteCard.light.color,
  },
  langgananAktif: {
    borderWidth: 1,
    borderColor: Color.greenActive.light.color,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  langgananTerminate: {
    borderWidth: 1,
    borderColor: Color.primary.light.primary90,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  unSubs: {
    borderWidth: 1,
    borderColor: Color.red.light.red90,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  langgananInActive: {
    borderWidth: 1,
    borderColor: Color.neutralLifeSaver.light.neutral40,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ml8: {
    marginLeft: 8,
  },
  durasi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  jatuhTempo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subsList: {
    container: { backgroundColor: 'transparent' },
  },
  emptySubscribe: {
    container: {
      height: Size.screen.height - 56,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 160,
      width: 200,
    },
    desc: { width: 220 },
    button: {
      bottom: 40,
      position: 'absolute',
      width: Size.screen.width,
      paddingHorizontal: 16,
    },
  },
  backgroundBottom: {
    bottom: 0,
    position: 'absolute',
    zIndex: -10,
  },
  flagUnsubscribe: {
    padding: 4,
    backgroundColor: Color.grayButton.light.grayButton,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  flagGracePeriod: {
    backgroundColor: Color.yellowWarning.light.color,
    padding: 4,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  flagLapse: {
    backgroundColor: Color.grayBackground.light.color,
    padding: 4,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  header: {
    container: {
      alignSelf: 'center',
      width: Size.screen.width - 32,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: 16,
      padding: 5,
      width: Size.screen.width - 32,
    },
    itemActive: {
      borderRadius: 8,
      padding: 8,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: Color.redTitleBgNotif.light.color,
    },
    itemInactive: {
      borderRadius: 8,
      padding: 8,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: Color.main.light.white,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 16,
      marginLeft: 16,
    },
    filterActive: {
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: Color.redTitleBgNotif.light.color,
      backgroundColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1.5,
      marginLeft: 8,
    },
    filterInactive: {
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      borderColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1.5,
      marginLeft: 8,
    },
  },
  logoSize: {
    width: 120,
    height: 20,
  },
  mb5: {
    marginBottom: 5,
  },
  mt10: {
    marginTop: 10,
  },
  my16: {
    marginVertical: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt16: {
    marginTop: 16,
  },
};
