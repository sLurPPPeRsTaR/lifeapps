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
    container: { backgroundColor: 'transparent', marginTop: 16 },
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
