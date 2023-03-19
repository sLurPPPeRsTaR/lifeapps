import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { api } from 'ca-bootstrap/bootstrapApi';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { CommonActions } from '@react-navigation/native';
import { BackHandler, Keyboard, Platform } from 'react-native';
import CryptoJS from 'crypto-js';
import { store } from 'ca-config/Store';
import {
  FACEBOOK_PEOPLE_API,
  GOOGLE_PEOPLE_API,
  LIFETAG_ENV,
  NAVIGATION,
} from './constant';
import { getLocation } from './location';

// const crypto = require('crypto');

export const useMount = (func) => useEffect(() => func(), []);

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function useKeyboardVisible() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const listener = useMemo(() => {
    return {
      ios: {
        show: 'keyboardWillShow',
        hide: 'keyboardWillHide',
      },
      android: {
        show: 'keyboardDidShow',
        hide: 'keyboardDidHide',
      },
    };
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      listener[Platform.OS].show,
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      listener[Platform.OS].hide,
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [listener]);
  return keyboardVisible;
}

export function useDefaultBackHandler(navigation) {
  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: NAVIGATION.TABMAIN.TabMain }],
        })
      );
    }
    return true;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    );
    return () => backHandler.remove();
  }, [goBack]);
}

const levenshtein = (a, b) => {
  const c = a.length + 1;
  const d = b.length + 1;
  const r = Array(c);
  for (let i = 0; i < c; i += 1) r[i] = Array(d);
  for (let i = 0; i < c; i += 1) r[i][0] = i;
  for (let j = 0; j < d; j += 1) r[0][j] = j;
  for (let i = 1; i < c; i += 1) {
    for (let j = 1; j < d; j += 1) {
      const s = a[i - 1] === b[j - 1] ? 0 : 1;
      r[i][j] = Math.min(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + s);
    }
  }
  return r[a.length][b.length];
};

export const matchTypoTolerance = (str1, str2, minTolerance = 3) => {
  const s1 = str1 || '';
  const s2 = str2 || '';
  const distance = levenshtein(
    s1.toLowerCase().replace(/\s/g, ''),
    s2.toLowerCase().replace(/\s/g, '')
  );
  return distance <= minTolerance;
};

export const removeColumnFromObject = (obj, columnKey) => {
  const newObj = { ...obj };
  delete newObj[columnKey];
  return newObj;
};

export const diffPolicyDueDate = (policyDueDate) => {
  return Math.ceil(
    (new Date(new Date(policyDueDate) - 1000 * 60 * 60 * 7) - new Date()) /
      (1000 * 60 * 60 * 24)
  );
};

export const diffNextBillDate = (policyDueDate, nextBillDate) => {
  return (
    (new Date(policyDueDate) - new Date(nextBillDate)) / (1000 * 60 * 60 * 24)
  );
};

export const generateCardNo = (num, pastValue) => {
  const joy = num.replace(/ /g, '').match(/.{1,4}/g);
  let join;

  const check = pastValue.replace(/ /g, '');
  if (check.length % 4 === 0 && num.includes(' ')) {
    return num;
  }
  if (joy?.length > 0) {
    join = joy?.join(' ');
  } else {
    join = '';
  }
  if (/^(?=.*\d)[\d ]+$/.test(num)) {
    return join;
  }
  if (num === '') {
    return num;
  }
  return pastValue;
};

export const formatedCardDate = (expdate, pastValue) => {
  let value = expdate;
  if (pastValue?.length === 1 && expdate?.length === 2) {
    value = `${expdate}/`;
  }

  if (expdate?.length > 5) {
    value = expdate.substring(0, 5);
  }

  const thisDate = new Date();
  const isExpMonthValid = value.split('/')[0] <= 12;
  const isFormatValid = value.split('/')[1]?.length === 2;
  const isExpValid = () => {
    if (value.split('/')[1] > thisDate.getFullYear() % 2000) {
      return true;
      // eslint-disable-next-line no-else-return
    } else if (
      // eslint-disable-next-line no-dupe-else-if
      value.split('/')[1] >= thisDate.getFullYear() % 2000 &&
      parseInt(value.split('/')[0], 10) >= thisDate.getMonth() + 1
    ) {
      return true;
    }
    return false;
  };
  if (!isExpMonthValid) {
    return {
      value,
      error: 'formatBulanTidakValid',
    };
  }
  if (!isFormatValid) {
    return {
      value,
      error: 'formatTglTidakValid',
    };
  }
  if (!isExpValid()) {
    return {
      value,
      error: 'cardExpired',
    };
  }
  return {
    value,
    error: false,
  };
};

export const getTimeLeft = (until) => {
  return {
    seconds: until % 60,
    minutes: parseInt(until / 60, 10) % 60,
    hours: parseInt(until / (60 * 60), 10) % 24,
    days: parseInt(until / (60 * 60 * 24), 10),
  };
};

export const regexName = /^[a-zA-Z']+([\s][a-zA-Z']+)*$/;
export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const regexMobile =
  /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
export const regexPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
export const regexAddress = /[^a-zA-Z 0-9\w.'/,-]/g;
export const regexNameBachelorDegree =
  // eslint-disable-next-line no-useless-escape
  /^([A-Za-z]{1,3}\.\s)*([A-Za-z'’`\.\s]+)(,\s?([A-Za-z]{1,5}|([A-Za-z]{1,5}[\.\-]\s?)+([A-Za-z]{1,5})?))*$/;
export const regexNumeric = /[^0-9]/g;
export const regexBirthPlace = /[^a-zA-Z 0-9\w'’]/g;
export const regexGlobalPhoneNumber = /^\+{0,1}[0-9]*\s*$/;
export const regexOccupation = /[^a-zA-Z/ -]/;
export const regexNumber = /^-?\d+\.?\d*$/;
export const regexWord = /^[a-zA-Z0-9_ ]*$/;
export const regexDiseaseHistory = /^[a-zA-Z0-9_\-.()'/ ]*$/;

export const setSignInSocial = async (type) => {
  if (type === 'FACEBOOK') {
    return new Promise((resolve, reject) => {
      try {
        LoginManager.logOut();
        LoginManager.logInWithPermissions([
          'public_profile',
          'email',
          'user_birthday',
        ]).then(() => {
          AccessToken.getCurrentAccessToken().then((data) => {
            api.get(FACEBOOK_PEOPLE_API + data.accessToken).then((res) => {
              const { email, userID, accessToken } = data;
              // eslint-disable-next-line max-nested-callbacks
              getLocation().then((p) => {
                resolve({ email, userID, accessToken, res, p });
              });
            });
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signOut();
  await GoogleSignin.signIn();
  const { accessToken } = await GoogleSignin.getTokens();
  const {
    data: { names, birthdays, emailAddresses },
  } = await api.get(GOOGLE_PEOPLE_API + accessToken);
  return new Promise((resolve, reject) => {
    try {
      getLocation().then((p) => {
        resolve({ names, birthdays, emailAddresses, accessToken, p });
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const setDobGoogle = (birthdays) => {
  return birthdays?.length
    ? `${birthdays[0].date.year}-${
        birthdays[0].date.month < 10
          ? String(0) + String(birthdays[0].date.month)
          : birthdays[0].date.month
      }-${
        birthdays[0].date.day < 10
          ? String(0) + String(birthdays[0].date.day)
          : birthdays[0].date.day
      }`
    : '';
};

export const encryptMpin = (payload, dataValue, action) => {
  const { deviceId } = store.getState().auth.userData;
  const { parameter, timePeriodSeconds } =
    store.getState().bootstrap.appConfig.features;
  const hash = CryptoJS.SHA256(dataValue).toString();
  const iv = CryptoJS.enc.Latin1.parse(parameter);
  const key = CryptoJS.PBKDF2(hash, deviceId, {
    iterations: 64,
    keySize: 8,
    hasher: CryptoJS.algo.SHA256,
  });
  const signature = (data) => {
    const time = Math.ceil(new Date().getTime() / 1000 / timePeriodSeconds);
    const text = CryptoJS.SHA256(
      `${hash}:${JSON.stringify(data)}:${time}`
    ).toString();
    return text;
  };
  if (action === 'VERIFY_PIN') {
    const encryptResult = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    });
    return {
      data: encryptResult.toString(),
      signature: signature(payload),
    };
  }
  if (action === 'CHANGE_PIN') {
    const encryptResult = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    });
    return {
      data: encryptResult.toString(),
      signature: signature(payload),
    };
  }
  if (action === 'CREATE_PIN') {
    const encryptResult = CryptoJS.SHA256(payload, key);
    return {
      pin: encryptResult.toString(),
      pinConfirmation: encryptResult.toString(),
    };
  }
  return {};
};

export const encryptLifetagId = (text) => {
  const { key, iv } = LIFETAG_ENV;
  const cipherText = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();
  const returnText = cipherText;
  return CryptoJS.enc.Base64.parse(returnText);
};

export const decryptLifetagId = (text) => {
  const { key, iv } = LIFETAG_ENV;
  const decr = CryptoJS.enc.Hex.parse(text);
  const cipherText = CryptoJS.enc.Base64.stringify(decr);
  return CryptoJS.AES.decrypt(cipherText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8);
};

export const getParseUrl = (url) => {
  const prefixUrl = url.split('?')[0];

  const paramArr = url.slice(url.indexOf('?') + 1).split('&');
  const params = {};
  paramArr.forEach((param) => {
    const [key, val] = param.split('=');
    params[key] = decodeURIComponent(val);
  });

  return {
    prefix: prefixUrl,
    params: params,
  };
};
