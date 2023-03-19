import numbro from 'numbro';

function Numbro(locale = 'id') {
  numbro.registerLanguage({
    languageTag: 'id-ID',
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'rb',
      million: 'jt',
      billion: 'm',
      trillion: 't',
    },
    ordinal: (number) => (number === 1 ? 'pertama' : `ke${number}`),
    currency: {
      symbol: 'Rp',
      position: 'prefix',
      code: 'IDR',
    },
    currencyFormat: {
      thousandSeparated: true,
    },
    formats: {
      fourDigits: {
        totalLength: 4,
        spaceSeparated: false,
        average: false,
      },
      fullWithTwoDecimals: {
        output: 'currency',
        mantissa: 2,
        thousandSeparated: true,
        spaceSeparated: false,
      },
      fullWithTwoDecimalsNoCurrency: {
        optionalMantissa: true,
        mantissa: 2,
        thousandSeparated: true,
      },
      fullWithNoDecimals: {
        optionalMantissa: true,
        output: 'currency',
        spaceSeparated: false,
        thousandSeparated: true,
        mantissa: 2,
      },
    },
  });

  const defaultTag = locale === 'id' || locale === 'IDR' ? 'id-ID' : 'en-US';
  const fallbackTag = defaultTag === 'id-ID' ? 'en-US' : 'id-ID';

  numbro.setLanguage(defaultTag, fallbackTag);

  return numbro;
}

export function formatCurrency(props) {
  const { value, locale = 'id', mantissa = 2 } = props;
  const val = Numbro(locale);
  if (value == null) {
    return undefined;
  }
  try {
    return val(parseFloat(value)).format({
      thousandSeparated: true,
      mantissa: mantissa,
    });
  } catch (e) {
    return value;
  }
}

export function formatCurrencyId(value, locale = 'id') {
  const val = Numbro(locale);
  if (value == null) {
    return undefined;
  }
  try {
    return val(parseFloat(value)).format({
      spaceSeparated: false,
      average: true,
    });
  } catch (e) {
    return value;
  }
}

export function unformatCurrency(value, locale = 'id') {
  const val = Numbro(locale);
  if (value == null) {
    return undefined;
  }
  try {
    return val.unformat(value, {
      thousandSeparated: true,
      mantissa: 0,
    });
  } catch (e) {
    return value;
  }
}

export function formatNumber(
  value,
  lang,
  average,
  isCurrency = true,
  mantissa = 0
) {
  if (!value) {
    return '';
  }
  let currency = '';
  let num;
  numbro.setLanguage('en-US');
  const isAverage = numbro(value).format({
    spaceSeparated: false,
    average: true,
    mantissa,
  });
  const isJt = isAverage?.includes('m');
  const isRb = isAverage?.includes('k');
  const isTr = isAverage?.includes('t');
  if (average && isJt && lang === 'id') {
    currency = `Rp${isAverage?.replace('m', ' Jt')}`;
  } else if (average && isRb && lang === 'id') {
    currency = `Rp${isAverage?.replace('k', 'rb')}`;
  } else if (average && isTr && lang === 'id') {
    currency = `IDR ${isAverage.replace('t', ' Triliun')}`;
  } else if (average && isTr && lang === 'en') {
    currency = `IDR ${isAverage.replace('t', ' Trillion')}`;
  } else if (average && lang === 'en') {
    currency = `IDR ${isAverage.replace('m', ' M')}`;
  }
  if (!isAverage || isCurrency) {
    num = numbro(value).format({ thousandSeparated: true });
    currency =
      lang === 'id'
        ? `Rp ${num?.replaceAll(/,/g, '.')},-`
        : `IDR ${num?.replaceAll(/,/g, '.')},-`;
  }
  if (!isCurrency) {
    currency = currency?.replaceAll(/IDR /g, '');
    currency = currency?.replaceAll(/Rp/g, '');
  }

  return currency;
}

// export default { formatCurrency, unformatCurrency, formatCurrencyId };
