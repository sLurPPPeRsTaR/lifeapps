import Color from 'ca-config/Color';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    marginTop: -30,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  listAccordion: {
    headerContainerStyle: {
      height: 41,
      paddingVertical: 0,
      paddingHorizontal: 0,
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: Color.grayBorder.light.grayBorder,
    },
    headerContainerStyleActive: {
      height: 41,
      paddingVertical: 0,
      paddingHorizontal: 0,
      alignItems: 'flex-start',
      borderBottomWidth: 0,
    },
    container: {},
    content: {
      paddingVertical: 24,
      backgroundColor: Color.main.light.white,
      borderRadius: 30,
      shadowColor: Color.main.light.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  },
  dataList: {
    grid: {
      marginHorizontal: 16,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    col: {
      key: {
        flex: 1,
        marginBottom: 2,
      },
      value: {
        flex: 1,
      },
    },
  },
  promoContainer: {
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  promoBadge: {
    backgroundColor: Color.primary.light.primary90,
    borderRadius: 16,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  looperGroupGreen: {
    position: 'absolute',
    bottom: -305,
    left: -400,
    width: 800,
    height: 400,
    resizeMode: 'cover',
  },
  flexShrink1: { flexShrink: 1 },
  mb8: { marginBottom: 8 },
  mb: (value) => {
    return { marginBottom: value };
  },
  mh: (value) => {
    return { marginHorizontal: value };
  },
  p: (value) => {
    return { padding: value };
  },
  pb: (value) => {
    return { paddingBottom: value };
  },
  mb18: { marginBottom: 18 },
  mb32: { marginBottom: 32 },
  flexDirectionRow: { flexDirection: 'row' },
  me8: { marginEnd: 8 },
  mt2: { marginTop: 2 },
  mt10: { marginTop: 10 },
  pv24: { paddingVertical: 24 },
  pv0: { paddingVertical: 0 },
  ph0: { paddingHorizontal: 0 },
  ps12: { paddingStart: 12 },
  ps26: { paddingStart: 26 },
};
