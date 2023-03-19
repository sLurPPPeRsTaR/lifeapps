import Color from 'ca-config/Color';

export default {
  container: {
    paddingTop: 22,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: Color.grayBackground.light.color,
  },
  flex1: { flex: 1 },
  row: { flexDirection: 'row' },
  alignItemsCenter: { alignItems: 'center' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentSpaceBetween: { justifyContent: 'space-between' },

  shipmentStatus: {
    position: 'absolute',
    bottom: 44,
    right: 0,
    paddingVertical: 8,
    borderRadius: 12,
  },
  containerText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Margins
  mt16: { marginTop: 16 },

  mb2: { marginBottom: 2 },
  mb6: { marginBottom: 6 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mt4: { marginTop: 4 },

  ml12: { marginLeft: 12 },

  my12: { marginVertical: 12 },

  mx16: { marginHorizontal: 16 },
};
