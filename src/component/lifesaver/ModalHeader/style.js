import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    width: Size.screen.width,
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  closeIcon: {
    position: 'absolute',
    left: 16,
    borderRadius: 15,
    backgroundColor: Color.lightGray.light.lightGray,
  },
  horizontalLinePadder: {
    marginVertical: 5,
    paddingHorizontal: 0,
  },
};
