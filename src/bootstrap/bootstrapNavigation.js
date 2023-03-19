import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { NAVIGATION } from 'ca-util/constant';

export const navigationRef = createNavigationContainerRef();

export const setLogOff = () => {
  return (
    navigationRef.isReady() &&
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATION.AUTH.Auth }],
      })
    )
  );
};

export const setNavigationHome = () => {
  return (
    navigationRef.isReady() &&
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
      })
    )
  );
};

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
