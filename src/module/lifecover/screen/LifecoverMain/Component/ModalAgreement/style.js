import { StyleSheet } from 'react-native';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';

export default StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  header: {
    width: Size.screen.width,
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
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
  mt28: {
    marginTop: 28,
  },
  mt16: {
    marginTop: 16,
  },
  mbMin16: {
    marginBottom: -16,
  },
  br16: {
    borderRadius: 16,
  },
  mr10: {
    marginRight: 10,
  },
  mt10: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
});
