import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

// LIFETAG PRODUCT DETAIL
export const getLifetagProductDetailApi = (payload) => {
  return api.get(
    `${API.CUSTOMER.PRODUCT.product}/${payload.id}?language=${payload.lang}`
  );
};

// LIFETAG PROFILE
export const getLifetagProfileApi = (payload) => {
  return api.get(`${API.CUSTOMER.PRODUCT.lifeTag}/${payload.id}`);
};

// LIFETAG PROFILE PUBLIC
export const getLifetagProfilePublicApi = (payload) => {
  return api.get(`${API.CUSTOMER.PRODUCT.lifeTagPublic}/${payload.id}`);
};

// LIFETAG LINK
export const setLinkLifetagApi = (payload) => {
  const { id, ...data } = payload;
  return api.post(`${API.CUSTOMER.PRODUCT.lifeTag}/${id}`, data);
};

// LIFETAG CREATE ORDER
export const setLifetagCreateOrderApi = (payload) => {
  return api.post(API.CUSTOMER.PRODUCT.order, payload);
};

// LIFETAG CURRENT SETTING
export const getLifetagCurrentSettingApi = (payload) => {
  const { id } = payload;
  return api.get(`${API.CUSTOMER.PRODUCT.lifeTag}/${id}/setting`);
};

// LIFETAG CHANGE SETTING
export const setLifetagSectionSettingApi = (payload) => {
  const { id, section } = payload;
  return api.put(`${API.CUSTOMER.PRODUCT.lifeTag}/${id}/setting/${section}`);
};

// LIFETAG LIST ORDER
export const getLifetagListOrderApi = () => {
  return api.get(API.CUSTOMER.PRODUCT.order);
};

// LIFETAG LIST ORDER BY ID
export const getLifetagDetailOrderApi = (payload) => {
  return api.get(`${API.CUSTOMER.PRODUCT.order}/${payload}`);
};

// LIFETAG FLAG
export const getLifetagFlagApi = () => {
  return api.get(API.CUSTOMER.PRODUCT.lifeTagFlag);
};

// PRODUCT LIFETAG
export const getLifetagLinkedListApi = () => {
  return api.get(API.CUSTOMER.PRODUCT.lifeTag);
};

// LIFETAG UPDATE
export const setLifetagUpdateApi = (payload) => {
  const { id, ...data } = payload;
  return api.put(`${API.CUSTOMER.PRODUCT.lifeTag}/${id}`, data);
};

// LIFETAG UNLINK
export const setLifetagUnlinkApi = (payload) => {
  const { id } = payload;
  return api.delete(`${API.CUSTOMER.PRODUCT.lifeTag}/${id}`);
};

// LIFETAG ORDER NO
export const setLifetagOrderNoApi = () => {
  return api.post(`${API.CUSTOMER.PRODUCT.order}/number`);
};

// LIFETAG UPDATE ORDER
export const setLifetagUpdateOrderApi = (payload) => {
  return api.put(`${API.CUSTOMER.PRODUCT.order}`, payload);
};

// LIFETAG OTHER INFO
export const getLifetagListOtherInfoApi = () => {
  return api.get(`${API.CUSTOMER.PRODUCT.lifeTag}/otherInfo`);
};
