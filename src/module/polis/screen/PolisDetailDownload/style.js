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
  card: {
    container: {
      paddingHorizontal: 16,
    },
    dash: {
      marginVertical: 16,
    },
    downloadButton: { marginTop: 20 },
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
  alertDialogue: {
    container: {
      backgroundColor: Color.backgroundAlertDialogue.light.color,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderRadius: 16,
      padding: 12,
      marginTop: 5,
    },
    icon: {
      paddingTop: 2,
      marginRight: 8,
    },
    text: {
      bullet: {
        paddingHorizontal: 8,
        paddingTop: 6,
      },
      point: { flexDirection: 'row', flexShrink: 1 },
    },
  },
  flexShrink1: { flexShrink: 1 },
  mb16: { marginBottom: 16 },
  pt24: { paddingTop: 24 },
  pb30: { paddingBottom: 30 },
  mt40: { marginTop: 40 },
};
