import { Size } from 'ca-config/index';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    container: {
      top: 94,
      left: 24,
      right: 24,
      position: 'absolute',
      alignItems: 'center',
    },
  },
  progress: {
    container: {
      bottom: 120,
      left: 0,
      position: 'absolute',
      width: Size.screen.width - 32,
      height: 56,
      marginHorizontal: 16,
      borderRadius: 6,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    current: {
      height: 4,
      backgroundColor: Size.text.white,
      marginTop: 4,
      borderRadius: 2,
    },
  },
};
