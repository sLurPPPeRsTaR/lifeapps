import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  billing: {
    container: {
      marginTop: 16,
      marginBottom: 40,
    },
    warning: {
      flexDirection: 'row',
      backgroundColor: Color.yellowWarning.light.color,
      padding: 16,
      borderRadius: 16,
      marginBottom: 16,
    },
    header: { flexDirection: 'row', justifyContent: 'space-between' },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 16,
    },
    shadow: {
      marginHorizontal: 5,
      marginBottom: 16,
    },
    rightListContent: { flexDirection: 'row', alignItems: 'center' },
  },
  activtyIndicator: {
    height: Size.screen.height,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  my10: {
    marginVertical: 10,
  },
  ml5: {
    marginLeft: 5,
  },
  mb12: {
    marginBottom: 12,
  },
  mt16: {
    marginTop: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt10: { marginTop: 10 },
};
