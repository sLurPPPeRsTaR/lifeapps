import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  imageBackground: {
    flex: 1,
    backgroundColor: Color.whiteLifesaverBg.light.color,
    marginTop: -30,
    paddingTop: 30,
  },
  mb8: {
    marginBottom: 8,
  },
  mb18: {
    marginBottom: 18,
  },
  mb32: {
    marginBottom: 32,
  },
  mr16: {
    marginRight: 16,
  },
  mt6: {
    marginTop: 6,
  },
  p8: {
    padding: 8,
  },
  pb64: { paddingBottom: 64 },
  container: {
    flex: 1,
  },
  content: {
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
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
    claimStatus: {
      position: 'absolute',
      top: 0,
      right: 0,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      backgroundColor: Color.grayBadgeClaim.light.grayBadgeClaim200,
    },
  },
  nodata: {
    flex: 1,
    paddingVertical: Size.screen.height / 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  imageRusak: {
    width: 200,
    height: 253,
  },
  infiniteScroll: {
    container: {
      flex: 1,
      paddingTop: 32,
    },
  },
  viewProgress: {
    position: 'absolute',
    bottom: 12,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  me8: { marginEnd: 8 },
};
