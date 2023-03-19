import ReactNativeBiometrics from 'react-native-biometrics';
import DeviceInfo from 'react-native-device-info';

const checkSensorTypeBiometricx = async () => {
  let sensor = '';
  try {
    const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
    sensor = biometryType;
  } catch (error) {
    sensor = '';
  }
  return sensor;
};

const checkSensorIsAvailable = async () => {
  let sensor = false;
  try {
    const { available } = await ReactNativeBiometrics.isSensorAvailable();
    sensor = available;
  } catch (error) {
    sensor = false;
  }
  return sensor;
};

const createKeyFingerPrint = async () => {
  let key = '';
  try {
    const { publicKey } = await ReactNativeBiometrics.createKeys('MANTIS_V2');
    key = publicKey;
  } catch (error) {
    key = '';
  }
  return key;
};

const loginBiometrics = async (
  onSuccess,
  onFailed,
  enableWhenSuccess = () => {},
  message,
  msgCancel
) => {
  try {
    const deviceId = DeviceInfo.getUniqueId();
    const options = {
      promptMessage: message,
      payload: deviceId,
      cancelButtonText: msgCancel,
    };
    const response = await ReactNativeBiometrics.createSignature(options);
    const { success, signature, error } = response;
    if (success) {
      onSuccess(deviceId, signature);
      enableWhenSuccess(true);
    } else {
      onFailed(error);
    }
  } catch (error) {
    onFailed(error.message);
  }
};

export {
  checkSensorTypeBiometricx,
  checkSensorIsAvailable,
  createKeyFingerPrint,
  loginBiometrics,
};
