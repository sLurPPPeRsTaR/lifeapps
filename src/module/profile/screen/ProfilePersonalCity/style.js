import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Color.gray.light.gray,
    marginVertical: 16,
  },
  text: { flex: 1, paddingBottom: 16, marginLeft: 8 },
  loading: {
    height: Size.screen.height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
