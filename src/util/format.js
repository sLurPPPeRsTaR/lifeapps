import moment from 'moment';

export function formatDate(date, lang = 'id', isShort = false) {
  if (isShort) {
    return moment(date).format('ll', lang);
  }
  return moment(date).format('LL', lang);
}

export function getTimestamp() {
  const formated = 'YYYY-MM-DD HH:mm:ss';
  const getDate = new Date();
  return moment(getDate).format(formated);
}

export function convertArrayToObject(array, key, value) {
  let object = {};
  array?.forEach((element) => {
    object = {
      ...object,
      [element[key]]: element[value],
    };
  });
  return object;
}

export function formatOrdinal(val, locale = 'id') {
  if (val === 1) {
    return locale === 'id' ? 'pertama' : 'first';
  }
  if (val === 2) {
    return locale === 'id' ? 'kedua' : 'second';
  }
  if (val === 3) {
    return locale === 'id' ? 'ketiga' : 'third';
  }
  if (val === 4) {
    return locale === 'id' ? 'keempat' : 'fourth';
  }
  if (val === 5) {
    return locale === 'id' ? 'kelima' : 'fifth';
  }
  if (val === 6) {
    return locale === 'id' ? 'keenam' : 'sixth';
  }
  if (val === 7) {
    return locale === 'id' ? 'ketujuh' : 'seventh';
  }
  if (val === 8) {
    return locale === 'id' ? 'kedelapan' : 'eighth';
  }
  if (val === 9) {
    return locale === 'id' ? 'kesembilan' : 'ninth';
  }
  if (val === 10) {
    return locale === 'id' ? 'kesepuluh' : 'tenth';
  }
  if (val === 11) {
    return locale === 'id' ? 'kesebelas' : 'eleventh';
  }
  if (val === 12) {
    return locale === 'id' ? 'kesebelas' : 'twelfth';
  }
  if (val === 13) {
    return locale === 'id' ? 'kesebelas' : 'thirteenth';
  }
  if (val === 14) {
    return locale === 'id' ? 'kesebelas' : 'fourteenth';
  }
  if (val === 15) {
    return locale === 'id' ? 'kesebelas' : 'fifteenth';
  }
  return '';
}

export function splitMonth(value) {
  const split = formatDate(new Date(value))?.split(' ');
  const month = split[1]?.substring(0, 3);
  return `${split[0]} ${month} ${split[2]}`;
}

export function formatCapitalizeEachWord(text) {
  const mySentence = text;
  if (mySentence.toLowerCase() === 'dki jakarta') {
    return 'DKI Jakarta';
  }
  return mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => {
    return letter.toUpperCase();
  });
}

export function stringValue(text) {
  let isText = '-';
  if (text?.length > 0) {
    isText = text;
  }

  return isText;
}

export function stripLeadingZeroes(s) {
  return parseInt(s, 10);
}

// format number
export const setPhoneFormat = (origin) => {
  const orgStr = origin?.replace(/\s/g, '');
  let str = origin?.replace(/\D/g, '');
  str = str?.startsWith(0) ? str.substring(1) : str;
  str = str?.startsWith('62') ? str.substring(2) : str;
  str = str?.startsWith(8) ? `+62${str}` : orgStr;
  return str;
};

export const setMaskingPhone = (origin) => {
  if (!origin) {
    return origin;
  }
  const formatted = setPhoneFormat(origin);
  const length = formatted?.length;
  const prefix = formatted.substring(0, 6);
  const masked = '*'.repeat(length - 2 - 6);
  const suffix = formatted.substring(length - 2, length);
  return `${prefix}${masked}${suffix}`;
};
