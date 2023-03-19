import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  wrapper: {
    width: Size.screen.width - 32,
    marginVertical: 10,
    alignSelf: 'center',
  },
  container: {
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInactive: {
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.gray.light.gray,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  itemSpecial: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  itemCol: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  mr4: {
    marginRight: 4,
  },
  logoSize: {
    LS02: {
      width: 65,
      height: 11,
    },
    LS03: {
      width: 73,
      height: 12.6,
    },
    LS01: {
      width: 81,
      height: 12.6,
    },
  },
};
