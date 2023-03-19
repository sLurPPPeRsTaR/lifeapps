import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  background: {
    // width: Size.screen.width,
    // height: 264,
    height: 100,
  },
  flex: {
    flex: 1,
  },
  padder: {
    container: {
      paddingTop: 16,
    },
  },
  rusakIcon: {
    width: 200,
    height: 229,
    alignSelf: 'center',
    marginTop: Size.screen.height * 0.1,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  centerHeader: {
    alignSelf: 'center',
  },
  header: {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      height: 60,
    },
    shadow: {
      marginHorizontal: 10,
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
      width: '100%',
    },
    menuTitleActive: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1,
      borderColor: Color.redNotif.light.color,
      textAlign: 'center',
      paddingVertical: 10,
      borderRadius: 16,
      width: '33%',
    },
    menuTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 16,
      width: '33%',
      textAlign: 'center',
    },
    menuGroupingActive: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.redTitleBgNotif.light.color,
      borderWidth: 1,
      borderColor: Color.redNotif.light.color,
      textAlign: 'center',
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    menuGrouping: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      textAlign: 'center',
      borderWidth: 1,
      borderColor: Color.redNotif.light.color,
    },
    buttonGroupLeft: {
      position: 'absolute',
      left: 0,
      top: 18,
      zIndex: 1,
      padding: 6,
      backgroundColor: Color.main.light.white,
    },
    buttonGroupRight: {
      position: 'absolute',
      right: 0,
      top: 18,
      zIndex: 1,
      padding: 6,
      justifyContent: 'center',
      backgroundColor: Color.main.light.white,
    },
    iconArrow: {
      width: 15,
      height: 15,
    },
    rotateArrow: {
      transform: [{ rotate: '180 deg' }],
    },
  },

  body: {
    textRusak: {
      marginHorizontal: 75,
    },
  },

  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  pb48: { paddingBottom: 48 },
  pl10: { paddingLeft: 10 },
  my16: { marginVertical: 16 },
  mt16: { marginTop: 16 },
  ml12: { marginLeft: 6 },
  mr3: { marginRight: 6 },
};
