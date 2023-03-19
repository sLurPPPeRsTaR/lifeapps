import { StyleSheet } from 'react-native';
import { Color, Size } from 'ca-config/index';

export default {
  base: StyleSheet.create({
    root: {
      marginTop: 16,
    },
    headerContainer: {
      position: 'absolute',
      alignItems: 'center',
      left: 0,
      right: 0,
    },
    divider: {
      height: 10,
      backgroundColor: Color.backgroundHome.light.backgroundHome,
      marginVertical: 8,
    },
  }),
  listProduct: StyleSheet.create({
    root: {
      backgroundColor: Color.whiteOpacity.light.whiteOpacity100,
      borderRadius: 16,
      borderColor: Color.lineGapHome.light.color,
      borderWidth: 2,
      padding: 10,
      marginBottom: 16,
    },
    box: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      width: 84,
      height: 84,
    },
    titleDescContainer: {
      flex: 1,
    },
    actionContainer: {
      flex: 1,
    },
    actionButton: {
      marginRight: 6,
      marginBottom: 6,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 8,
      alignSelf: 'flex-end',
    },
  }),
  swiper: StyleSheet.create({
    root: {
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    itemContainer: {
      paddingHorizontal: 8,
    },
    img: {
      borderRadius: 10,
      overflow: 'hidden',
      height: 0.25 * (Size.screen.width - 32),
      width: Size.screen.width - 32,
    },
    dotContainer: {
      paddingHorizontal: 8,
      paddingTop: 16,
      flexDirection: 'row',
    },
    dot: {
      backgroundColor: Color.backgroundHome.light.backgroundHome,
      width: 8,
      height: 8,
      borderRadius: 8,
      marginRight: 8,
    },
    dotActive: {
      backgroundColor: Color.buttonGradient.light.buttonGradient1,
    },
  }),
  produkPilihan: StyleSheet.create({
    root: {
      paddingVertical: 16,
    },
  }),
};
