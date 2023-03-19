import { StyleSheet } from 'react-native';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  headerTambahkan: {
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16
  },
  detailTambahkan: {
    marginLeft: 16,
    marginRight: 16
  },
  buttonTambah: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 80
  },
  buttonLanjut: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16
  },
  penerimaManfaatView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uangPertanggunganView: {
    display: 'flex',
    flexDirection: 'column',
  },
  tambahPenerimaItem: {
    height: 40,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16
  },
  tambahPenerimaItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flipTrue: {
    transform: [{ rotate: '180deg' }],
  },
  flipFalse: {
    transform: [{ rotate: '0deg' }],
  },
  mb12: {
    marginBottom: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mb24: {
    marginBottom: 24,
  },
  mb4: {
    marginBottom: 4,
  },
});
