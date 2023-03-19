import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  pageContainer: {
    flex: 1,
    backgroundColor: Color.whiteCard.light.color,
  },

  renderHeaderContainer: {
    header: {
      container: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      animatedContainer: {
        top: -50,
        paddingTop: 50,
      },
    },
    containerInverse: {
      position: 'absolute',
      backgroundColor: Color.transparent.light.transparent,
      zIndex: 1,
    },
    containerWhite: {
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.25)',
      zIndex: 1,
    },
  },

  renderImageHeader: {
    imgSize: {
      width: Size.screen.width,
      aspectRatio: 1.6,
      resizeMode: 'cover',
    },
    titleCategory: {
      position: 'absolute',
      bottom: 13,
      left: 16,
      backgroundColor: Color.pink.light.pink10,
      padding: 8,
      borderRadius: 12,
      overflow: 'hidden',
    },
  },

  renderHeaderContent: {
    viewParent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    viewContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgAuthor: {
      width: 40,
      height: 40,

      borderRadius: 50,
    },
  },
  renderContent: {
    renderBtn: {
      flex: 1,
      position: 'absolute',
      bottom: 15,
      right: 15,
      backgroundColor: Color.primary.light.primary60,
      padding: 5,
      borderRadius: 20,
    },
  },
  btnHeaderCircle: {
    backgroundColor: Color.main.light.white,
    borderRadius: 20,
  },
  flexRow: { flexDirection: 'row' },

  mV10: { marginVertical: 10 },
  mH5: { marginHorizontal: 5 },
};
