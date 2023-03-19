import {
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status !== 'granted') {
    Alert.alert('Warning','Turn on Location Services to your location.', [
      { text: 'Go to Settings', onPress: openSetting },
      { text: "Don't Use Location", onPress: () => BackHandler.exitApp() },
    ]);
  }

  return false;
};

export const hasLocationPermission = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };

  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Alert.alert('Warning', 'Turn on Location Services to your location.', [
      {
        text: 'Go to Settings',
        onPress: openSetting,
      },
      { text: "Don't Use Location", onPress: () => BackHandler.exitApp() },
    ]);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Alert.alert('Warning', 'Turn on Location Services to your location.', [
      {
        text: 'Go to Settings',
        onPress: openSetting,
      },
      { text: "Don't Use Location", onPress: () => BackHandler.exitApp() },
    ]);
  }
  return false;
};

export const getLocation = async () => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(res, rej, {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: true,
    });
  });
};
