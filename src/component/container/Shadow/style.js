import Color from 'ca-config/Color';

export default {
  container: {
    backgroundColor: 'transparent',
    shadowColor: Color.neutral.light.neutral10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  innerContainer: {
    backgroundColor: Color.main.light.white,
    overflow: 'hidden',
  },
};
