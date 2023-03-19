import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  mt16: { marginTop: 16 },
  mt8: { marginTop: 8 },
  mb16: { marginBottom: 16 },
  ml16: { marginLeft: 16 },
  ml8: { marginLeft: 8 },
  ml2: { marginLeft: 2 },
  pb16: { paddingBottom: 16 },
  p16: { padding: 16 },
  gap: { width: Size.screen.width, height: 10 },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
  },
  positionLeft: { display: 'flex', justifyContent: 'flex-start' },
  textWhite: { color: 'grey' },
  logo: { width: 70, height: 15 },
  items: {
    containerItems: {
      backgroundColor: 'white',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    containerImage: {
      flex: 1,
      padding: 8,
      borderRadius: 8,
      // backgroundColor: Color.grayBackground.light.color,
    },
    containerText: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 12,
      paddingRight: 6,
    },
    containerDetail: {
      flex: 5,
      paddingVertical: 8,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 16,
      backgroundColor: Color.grayBackground.light.color,
    },
    button: {
      marginTop: 8,
      marginBottom: 16,
      backgroundColor: Color.primary.light.primary90,
    },
    text: {
      fontSize: Size.text.body1.size,
    },
    containerPriceAndLogo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconArrow: {
      width: 15,
      height: 15,
      marginRight: 8,
    },
    logoContainer: { position: 'absolute', bottom: 8, right: 0 },
  },
  itemDetail: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  footer: {
    container: {
      marginVertical: 50,
      marginBottom: 16,
    },
    btn: {
      backgroundColor: Color.grayButton.dark.grayButton,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizantal: 12,
    },
  },
};
