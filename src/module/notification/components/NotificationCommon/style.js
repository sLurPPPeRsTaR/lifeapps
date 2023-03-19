import Color from 'ca-config/Color';

export default {
  body: {
    content: {
      backgroundColor: Color.redBgNotif.light.color,
      borderBottomWidth: 0.5,
      borderColor: Color.borderButtonGray.light.borderButtonGray,
      paddingVertical: 16,
    },
    contentRead: {
      backgroundColor: Color.transparent.light.transparent,
      borderBottomWidth: 0.5,
      borderColor: Color.borderButtonGray.light.borderButtonGray,
      paddingVertical: 16,
    },
    topContent: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageNotif: { width: 24, height: 25, resizeMode: 'contain' },
    bottomContent: {
      flexDirection: 'column',
    },
    title: {
      marginLeft: 5,
    },
    titleRight: {
      marginLeft: 'auto',
    },
    caption2: {
      marginTop: 5,
    },
    indicator: {
      width: 6,
      height: 6,
      borderRadius: 6,
      marginLeft: 8,
    },
  },

  flexDirectionRow: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
};
