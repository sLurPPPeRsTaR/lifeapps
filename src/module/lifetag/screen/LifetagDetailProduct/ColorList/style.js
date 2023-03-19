import Color from 'ca-config/Color';

export default {
  renderProductColor: {
    colorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flatlistContainer: {
      flex: 1,
      paddingHorizontal: 16,
      marginTop: 12,
    },
    lifetagColorContainer: {
      paddingRight: 16,
      paddingTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchableContainer: {
      borderRadius: 100,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,
    },
    circleContainer: { width: 34, height: 34, borderRadius: 66 },
    qtyContainer: {
      flexDirection: 'row',
      marginRight: 16,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: Color.lifetagQtyBgColor.light.color,
    },
    qtyMinusContainer: {
      paddingHorizontal: 8,
      backgroundColor: Color.lifetagGrayColor.light.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qtyPlusContainer: {
      paddingHorizontal: 8,
      backgroundColor: Color.lifetagGrayColor.light.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  mR8: { marginRight: 8 },
  pH8: { paddingHorizontal: 8 },
};
