import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    marginVertical: 40,
  },
  itemsContainer: {
    justifyContent: 'space-between',
    maxHeight: Size.screen.height - 100,
  },
  listItem: {
    height: 60,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    alignItems: 'center',
  },
  mb10: {
    marginBottom: 10,
  },
};
