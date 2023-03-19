import { formatCurrency } from 'ca-util/numbro';
import moment from 'moment';
import { trans } from 'ca-util/trans';
import locale from './locale';

export const eventData = (data, dataEvent, lang) => {
  const totalPrice = `Rp${formatCurrency({
    value: data?.event?.price || 0,
    mantissa: 0,
  })},-`;
  const isSameDay = moment(data?.event?.startDateTime).isSame(
    data?.event?.endDateTime,
    'day'
  );
  return [
    {
      title: trans(locale, lang, 'hargaTiket'),
      data: totalPrice,
    },
    {
      title: trans(locale, lang, 'tanggalEvent'),
      data: isSameDay
        ? moment(data?.event?.startDateTime).format('DD MMM YYYY')
        : `${moment(data?.event?.startDateTime).format('DD')}-${moment(
            data?.event?.endDateTime
          ).format('DD MMMM YYYY')}`,
    },
    {
      title: trans(locale, lang, 'waktuEvent'),
      data: `${moment(data?.event?.startDateTime).format('HH.mm')} - ${moment(
        data?.event?.endDateTime
      ).format('HH.mm')} WIB`,
    },
    {
      title: trans(locale, lang, 'lokasiEvent'),
      data: dataEvent?.location?.name,
    },
    {
      title: '',
      data: dataEvent?.location?.city,
    },
  ];
};

export const productData = (data, lang) => {
  const totalProductPrice =
    data?.product?.lifeSaver - data?.product?.discountLifeSaver;
  const totalPrice = `Rp${formatCurrency({
    value: data?.product?.lifeSaver || 0,
    mantissa: 0,
  })},-`;
  const finalPrice = `Rp${formatCurrency({
    value: totalProductPrice || 0,
    mantissa: 0,
  })},-`;
  const firstType = `${moment(data?.product?.nextBillingDate)
    .subtract(1, 'month')
    .add(7, 'hour')
    .format('DD MMM YYYY')} - ${moment(data?.product?.nextBillingDate)
    .subtract(1, 'days')
    .add(7, 'hour')
    .format('DD MMM YYYY')}`;
  const thirdType = `${moment(data?.product?.nextBillingDate)
    .subtract(1, 'months')
    .add(7, 'hour')
    .format('DD MMM YYYY')} - ${moment(data?.product?.nextBillingDate)
    .subtract(1, 'days')
    .format('DD MMM YYYY')}`;
  return [
    {
      primary: '*',
      title: 'product',
      data: totalPrice,
      finalPrice: finalPrice,
    },
    {
      primary: '**',
      title: trans(locale, lang, 'durasiProteksi'),
      data: data?.policy?.orderType === 1 ? firstType : thirdType,
    },
    {
      title: trans(locale, lang, 'jatuhTempoBerikutnya'),
      data:
        data?.policy?.orderType === 1
          ? moment(data?.product?.nextBillingDate)
              .subtract(1, 'month')
              .add(1, 'month')
              .add(7, 'hour')
              .format('DD MMM YYYY')
          : moment(data?.product?.nextBillingDate).format('DD MMM YYYY'),
    },
  ];
};

export const userInfoData = (data, lang) => [
  {
    title: trans(locale, lang, 'nik'),
    data: data?.idCardNumber,
  },
  {
    title: trans(locale, lang, 'tglLahir'),
    data: moment(data?.dob, 'DD-MM-YYYY').format('DD MMM YYYY'),
  },
];

export const totalSummaryData = (data, dataEvent, dataVoucher, lang) => {
  const totalProductPrice =
    data?.product?.lifeSaver - data?.product?.discountLifeSaver || 0;
  const eventPrice = data?.event?.price || 0;
  const discountEventPrice = data?.event?.discountTicket || 0;
  const dataVoucherNominal = dataVoucher?.discount || 0;
  return [
    {
      key: 'header',
      title: trans(locale, lang, 'ringkasanPembayaran'),
      data: '',
    },
    {
      title: `${trans(locale, lang, 'tiket')} ${dataEvent?.name}`,
      data: `Rp${formatCurrency({
        value: eventPrice,
        mantissa: 0,
      })},-`,
    },
    {
      key: 'product',
      title: trans(
        locale,
        lang,

        data?.policy?.gracePeriod ? 'perpanjangan' : 'life'
      ),
      title2: trans(
        locale,
        lang,

        data?.product?.planCode === '02' ? 'saver' : 'saverPlus'
      ),
      data:
        data?.policy?.orderType === 2
          ? ''
          : `Rp${formatCurrency({
              value: totalProductPrice,
              mantissa: 0,
            })},-`,
    },
    {
      title: `${trans(locale, lang, 'diskon')}`,
      type: 'discount',
      data: `-Rp${formatCurrency({
        value: discountEventPrice,
        mantissa: 0,
      })},-`,
    },
    {
      title:
        dataVoucherNominal === 0
          ? ''
          : `${trans(locale, lang, 'diskonVoucher')}`,
      type: 'discountVoucher',
      data:
        dataVoucherNominal === 0
          ? ''
          : `-Rp${formatCurrency({
              value: dataVoucherNominal,
              mantissa: 0,
            })},-`,
    },
    {
      key: 'info',
      title: `${trans(
        locale,
        lang,
        data?.policy?.orderType === 2 ? 'discountLS' : 'discountHasntLS'
      )}`,
      // type: 'discount',
      // data: `-Rp${formatCurrency({
      //   value: discountEventPrice,
      //   mantissa: 0,
      // })},-`,
    },
  ].filter((value) => {
    if (data?.policy?.orderType === 2) {
      return value?.key !== 'product';
    }
    return value;
  });
};

export const infoData = (data, lang) => {
  const productPrice = data?.product?.lifeSaver;
  const infoFirstType = [
    {
      content: trans(locale, lang, 'periodeProteksi'),
    },
  ];
  const infoThirdType = [
    {
      content: trans(locale, lang, 'pastikanUntuk'),
    },
    {
      content: trans(locale, lang, 'apabilaKamu'),
    },
  ];
  return [
    {
      primary: '*',
      show: data?.policy?.orderType === 1 || data?.policy?.orderType === 3,
      title: trans(locale, lang, 'informasiPolis'),
      details: [
        {
          content: `${trans(locale, lang, 'kamuAkan')} Rp${formatCurrency({
            value: productPrice,
            mantissa: 0,
          })},- ${trans(locale, lang, 'perpanjanganPolis')}`,
        },
        {
          content: trans(locale, lang, 'proteksiMedis'),
        },
        {
          content: trans(locale, lang, 'proteksiMedisCedera'),
        },
      ],
    },
    {
      primary: '**',
      show: data?.policy?.orderType === 1 || data?.policy?.orderType === 3,
      title: trans(
        locale,
        lang,
        data?.policy?.orderType === 1 ? 'infoPeriode' : 'infoPerpanjangan'
      ),
      details: data?.policy?.orderType === 1 ? infoFirstType : infoThirdType,
    },
  ];
};
