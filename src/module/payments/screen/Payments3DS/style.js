import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    width: Size.screen.width + 32,
    marginLeft: -16,
    flex: 1,
  },
  buttonDownloadContainer: {
    padding: 16,
    backgroundColor: Color.whiteCard.light.color,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 24,
  },
  bottomContainer: {
    bottom: 24,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mr16: {
    marginRight: 16,
  },
  fx1: {
    flex: 1,
  },
};
