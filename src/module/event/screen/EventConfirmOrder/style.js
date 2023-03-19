import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { APP } from 'ca-util/constant';
import { Platform } from 'react-native';

export default {
  pageContainer: {
    flex: 1,
    backgroundColor: Color.whiteCard.light.color,
  },

  renderHeader: {
    header: {
      container: {
        paddingHorizontal: 16,
        width: Size.screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      animatedContainer: {
        top: -50,
        paddingTop: 50,
      },
    },
    btnBack: {
      position: 'absolute',
      left: 16,
      top: 12,
    },
  },
  renderFooter: {
    parent: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: Color.whiteCard.light.color,
    },
    contentTotal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  },
  renderLifeSaver: {
    parent: { top: -APP.header.height / 2 - 6 },
    amountLS: { flexDirection: 'row', alignItems: 'center' },
    additionalHeader: {
      backgroundColor: Color.red.light.D71920,
      height:
        Platform.OS === 'android' ? APP.header.height : APP.header.height + 100,
      paddingTop: APP.header.height * 2 + 14,
    },
    lifeSAVERwhiteContainer: {
      paddingHorizontal: 17,
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: Color.primary.light.primary90,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 5,
    },
    content: { paddingHorizontal: 17, paddingVertical: 5 },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    imgLS: { width: 80, height: 20, resizeMode: 'contain' },
    viewDivider: {
      borderBottomWidth: 0.5,
      borderBottomColor: Color.grayBorder.dark.grayBorder,
      paddingTop: 10,
    },
    infoLS: {
      header: { flexDirection: 'row', alignItems: 'center' },
      content: {
        paddingHorizontal: 8,
        flexDirection: 'row',
      },
    },
  },
  renderUserInfo: {
    header: { flexDirection: 'row', alignItems: 'center' },
    headerName: {
      borderBottomWidth: 1,
      borderBottomColor: Color.abuMuda.light.abuMuda,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
  },

  viewDivider: {
    height: 10,
    backgroundColor: Color.grayBackground.light.color,
    width: Size.screen.width,
  },

  gracePeriod: {
    warning: {
      flexDirection: 'row',
      backgroundColor: Color.yellowWarning.light.color,
      padding: 16,
      borderRadius: 12,
      marginTop: 16,
      paddingRight: 30,
      justifyContent: 'center',
    },
  },
  fontStyleItalic: { fontStyle: 'italic' },
  flexRow: { flexDirection: 'row' },
  fS1: { flexShrink: 1 },
  mT20: { marginTop: 20 },
  mT16: { marginTop: 16 },
  mT10: { marginTop: 10 },
  flex: { flex: 1 },
  mB5: { marginBottom: 5 },
  mB8: { marginBottom: 8 },
  mB16: { marginBottom: 16 },
  mB20: { marginBottom: 20 },
  mT8: { marginTop: 8 },
  mV8: { marginVertical: 8 },
  bGColor: { backgroundColor: Color.whiteBackground.light.whiteBackground },
  pV8: { paddingVertical: 8 },
  pT10: { paddingTop: 10 },
  pT16: { paddingTop: 16 },
  pV10: { paddingVertical: 10 },
  pV16: { paddingVertical: 16 },
  pB10: { paddingBottom: 10 },
  pB16: { paddingBottom: 16 },
  pH16: { paddingHorizontal: 16 },
  pH10: { paddingHorizontal: 10 },
  pB50: { paddingBottom: 50 },
  mL8: { marginLeft: 8 },
  mT6: { marginTop: 6 },
  mb10: { marginBottom: 10 },
  mL5: { marginLeft: 5 },
  mR10: { marginRight: 10 },
  mH10: { marginHorizontal: 10 },
};
