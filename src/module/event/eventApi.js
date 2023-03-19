import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';
import URLSearchParams from 'ca-util/URLSearchParams';
import _ from 'lodash';

// EVENT DETAIL
export const getEventDetailApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetail}${
      payload?.slugId || payload?.eventId
    }?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
      },
    }
  );
};

// EVENT DETAIL
export const getEventDetailPublicApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventDetailPublic}${
      payload?.slugId || payload?.eventId
    }?language=${payload.lang}`,
    {
      headers: {
        'X-Access-Code': payload.accessCode,
      },
    }
  );
};

// EVENT QUOTA (LEFTOVER TICKET)
export const getEventQuotaApi = (payload) => {
  return api.post(API.EVENT.getEventQuota, payload);
};

// EVENT UPCOMING
export const getEventUpcomingApi = (payload) => {
  const query = new URLSearchParams();
  if (payload.lang) {
    query.append('language', payload.lang);
  }
  if (payload.category) {
    query.append('category', payload.category);
  }
  if (_.isEmpty(query?.params)) {
    return api.get(`${API.EVENT.getEventUpcoming}language=${payload}`, payload);
  }
  return api.get(`${API.EVENT.getEventUpcoming}${query.toString()}`);
};

// EVENT UPCOMING
export const getEventUpcomingPublicApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventUpcomingPublic}language=${payload}`,
    payload
  );
};

// EVENT ADD FAV
export const setEventAddFavoriteApi = (payload) => {
  return api.post(
    `${API.EVENT.setEventAddFavorite}/${payload.eventId}`,
    payload
  );
};

// EVENT RM FAV
export const setEventRmvFavoriteApi = (payload) => {
  return api.delete(
    `${API.EVENT.setEventRmvFavorite}/${payload.eventId}`,
    payload
  );
};

// EVENT FAV
export const getEventFavoriteApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventFavorite}language=${payload.lang}`,
    payload
  );
};

// EVENT USERTICKET
export const getEventUserTicketApi = (payload) => {
  return api.get(
    `${API.EVENT.getEventUserTicket}language=${payload.lang}`,
    payload
  );
};

// EVENT BUYTICKET
export const setEventBuyTicketApi = (payload) => {
  return api.post(API.EVENT.setEventBuyTicket, payload, {
    headers: {
      'X-Access-Code': payload.accessCode,
    },
  });
};

// EVENT CATEGORIES
export const getEventCategoriesAPI = () => {
  return api.get(`${API.EVENT.eventCategories}`);
};

// USER EVENT INVOICE ID
export const getUserEventInvoiceIdApi = (payload) => {
  return api.post(API.EVENT.getUserEventInvoiceId, payload);
};

// SET PAYMENT
export const setPaymentEventApi = (payload) => {
  return api.post(API.EVENT.setPaymentEvent, payload);
};

// SET CREATE BILL EVENT
export const setCreateBillEventApi = (payload) => {
  return api.post(API.EVENT.setCreateBillEvent, payload);
};
// SET VALIDATE VOUCHER CODE
export const setValidateVoucherCodeApi = (payload) => {
  console.log('payload', payload);
  return api.post(API.EVENT.setValidateVoucherCode, payload);
};

export const setValidateAccessCodeApi = (payload) => {
  return api.post(
    API.EVENT.setValidateAccessCode,
    { eventId: payload.eventId },
    { headers: { 'X-Access-Code': payload.accessCode } }
  );
};

export const setValidateRefferalCodeApi = (payload) => {
  const apiKey = '1z8E5nj9VCMMuLcQ57Q3Ef9hlgIssMEF';
  return api.post(
    API.EVENT.setValidateRefferalCode,
    { referralCode: payload.referralCode },
    {
      headers: {
        'X-Consumer-Custom-ID': {
          ekycId: payload.ekycId,
          mobilePhoneNumber: payload.mobilePhoneNumber,
        },
        apiKey: apiKey,
      },
    }
  );
};
