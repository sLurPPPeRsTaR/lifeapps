import { PermissionsAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const formattedPermission = (permission) => {
  if (permission === 'android.permission.READ_CONTACTS') {
    return '- Kontak';
  }
  if (permission === 'android.permission.CAMERA') {
    return '- Kamera';
  }
  if (permission === 'android.permission.ACCESS_FINE_LOCATION') {
    return '- Lokasi';
  }
  if (permission === 'android.permission.RECORD_AUDIO') {
    return '- Rekam Suara';
  }
  if (
    permission === 'android.permission.READ_EXTERNAL_STORAGE' ||
    permission === 'android.permission.WRITE_EXTERNAL_STORAGE'
  ) {
    return '- Storage';
  }
  return '';
};

const checkPermissions = (ps) => {
  return new Promise((resolve, reject) => {
    try {
      const permissions = PermissionsAndroid.requestMultiple(ps);
      if (permissions) {
        permissions.then(async (e) => {
          const permit = [];
          const neverAskAgain = [];
          const apiLevel = await DeviceInfo.getApiLevel();

          if (e['android.permission.CAMERA']) {
            if (
              e['android.permission.CAMERA'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.CAMERA'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.CAMERA');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.CAMERA');
              permit.push(false);
            }
          }

          if (e['android.permission.RECORD_AUDIO']) {
            if (
              e['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.RECORD_AUDIO');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.RECORD_AUDIO');
              permit.push(false);
            }
          }

          if (e['android.permission.ACCESS_FINE_LOCATION']) {
            if (
              e['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.ACCESS_FINE_LOCATION'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.ACCESS_FINE_LOCATION');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.ACCESS_FINE_LOCATION');
              permit.push(false);
            }
          }

          if (e['android.permission.READ_CONTACTS']) {
            if (
              e['android.permission.READ_CONTACTS'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.READ_CONTACTS'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.READ_CONTACTS');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.READ_CONTACTS');
              permit.push(false);
            }
          }

          if (e['android.permission.GET_ACCOUNTS']) {
            if (
              e['android.permission.GET_ACCOUNTS'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.GET_ACCOUNTS'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.GET_ACCOUNTS');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.GET_ACCOUNTS');
              permit.push(false);
            }
          }

          if (e['android.permission.READ_EXTERNAL_STORAGE']) {
            if (
              e['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.READ_EXTERNAL_STORAGE');
              permit.push(false);
            } else {
              neverAskAgain.push('android.permission.READ_EXTERNAL_STORAGE');
              permit.push(false);
            }
          }

          if (
            e['android.permission.WRITE_EXTERNAL_STORAGE'] &&
            apiLevel <= 28
          ) {
            if (
              e['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED
            ) {
              permit.push(true);
            } else if (
              e['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
              neverAskAgain.push('android.permission.WRITE_EXTERNAL_STORAGE');
              permit.push(false);
            } else {
              permit.push(false);
            }
          }

          if (permit.every((p) => p)) {
            resolve();
          } else {
            reject(new Error(JSON.stringify(neverAskAgain)));
          }
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  });
};

export { formattedPermission, checkPermissions };
