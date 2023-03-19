import { encryptTransform } from 'redux-persist-transform-encrypt';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { PERSIST_SECRET } from 'ca-util/constant';
import AsyncStorage from '@react-native-community/async-storage';

const encryptor = encryptTransform({
  secretKey: PERSIST_SECRET,
  onError(error) {
    console.error(`createEncryptor error ${error}`);
  },
});

const authStorage = createSensitiveStorage({
  keychainService: 'authKeychain',
  sharedPreferencesName: 'custAuth',
});

const activityStorage = createSensitiveStorage({
  keychainService: 'activityKeychain',
  sharedPreferencesName: 'custActivity',
});

const PERSIST = {
  active: true,
  reducerVersion: '1.0',
  authConfig: {
    key: 'auth',
    storage: authStorage,
    transforms: [encryptor],
  },
  activityConfig: {
    key: 'activity',
    storage: activityStorage,
    transforms: [encryptor],
  },
  localConfig: {
    key: 'local',
    storage: AsyncStorage,
    transforms: [encryptor],
  },
};

export default PERSIST;
