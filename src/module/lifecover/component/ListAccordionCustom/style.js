import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  root: {
    marginTop: 10,
    borderRadius: 16,
  },

  // eslint-disable-next-line react-native/no-color-literals
  headerContainerStyle: {
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: Color.neutral.dark.neutral80,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTextStyle: {
    maxWidth: 200,
  },
  headerIconContainer: {
    width: 50,
    marginRight: 15,
  },

  valuesContainer: {
    marginTop: 10,
    marginHorizontal: 8,
  },
});
