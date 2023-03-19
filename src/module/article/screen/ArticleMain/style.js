import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { Platform } from 'react-native';

export default {
  pageContainer: {
    flex: 1,
    backgroundColor: Color.whiteCard.light.color,
  },
  renderArticle: {
    renderContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
    },
    imgBanner: {
      height: 78,
      aspectRatio: 1.2,
      borderRadius: 8,
    },
    badge: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 16,
      overflow: 'hidden',
    },
    titleCategory: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      backgroundColor: Color.pink.light.pink10,
      width: '100%',
      paddingVertical: 3,
      overflow: 'hidden',
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    imgHighlight: {
      width: Size.screen.width - 32,
      aspectRatio: 2,
      resizeMode: 'cover',
      borderRadius: 16,
    },
    categoryHighlight: {
      position: 'absolute',
      top: 12,
      left: 16,
      backgroundColor: Color.pink.light.pink10,
      paddingVertical: 8.5,
      paddingHorizontal: 8,
      overflow: 'hidden',
      borderRadius: 10,
    },
    dateHighlight: {
      paddingHorizontal: 16,
      position: 'absolute',
      bottom: 5,
    },
    dotContainer: {
      flexDirection: 'row',
      paddingLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 5,
    },
    dotActive: {
      width: 19,
      height: Platform.OS === 'android' ? 5 : 8,
      backgroundColor: Color.eventDotActive.light.color,
      borderRadius: 16,
      marginTop: Platform.OS === 'android' ? 2 : 0,
    },

    dotInActive: {
      color: Color.eventDotInActive.light.color,
    },
    scrollViewSize: {
      width: Size.screen.width,
      height: (Size.screen.width * 250) / 375,
    },
    bgShadow: {
      width: Size.screen.width - 32,
      aspectRatio: 2,
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      borderRadius: 16,
    },
    viewContentHighlight: {
      position: 'absolute',
      height: '45%',
      width: '100%',
      bottom: 0,
      paddingHorizontal: 16,
    },
    viewDotContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: Size.screen.width - 32,
    },
  },
  renderCategory: {
    renderContent: {
      flex: 1,
      backgroundColor: Color.whiteBackground.light.whiteBackground,
      paddingBottom: 5,
    },
  },
  renderFooterContent: { flexDirection: 'row', alignItems: 'center' },
  flexRow: { flexDirection: 'row' },
  mH5: { marginHorizontal: 5 },
  mV6: { marginVertical: 6 },
  pB30: { paddingBottom: 30 },
  mT24: { marginTop: 24 },
  mT10: { marginTop: 10 },
};
