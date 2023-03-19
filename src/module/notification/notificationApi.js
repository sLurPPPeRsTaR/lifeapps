import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getNotifApi = (payload) => {
  if (payload?.path === 'promo') {
    return api.get(`${API.NOTIFICATION.getNotifPromo}/${payload?.lang}`);
  }
  if (payload?.path === 'transaction') {
    return api.get(`${API.NOTIFICATION.getNotifTransaction}/${payload?.lang}`);
  }
  return api.get(`${API.NOTIFICATION.getNotif}/${payload?.lang}`);
};
export const readNotifApi = (payload) => {
  return api.put(`${API.NOTIFICATION.readNotif}/${payload}`);
};
