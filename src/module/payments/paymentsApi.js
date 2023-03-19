import { api } from 'ca-bootstrap/bootstrapApi';
import { API } from 'ca-util/constant';

export const getPaymentMethodApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentMethod}`, payload);
};

export const setCreateBillApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBill}`, payload);
};

export const setCreateBillEventApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillEvent}`, payload);
};

export const setCreteBillProposalApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillProposal}`, payload);
};

export const setCreateBillSinglePaymentApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillSinglePayment}`, payload);
};

export const setCreateBillRenewalApi = (payload) => {
  return api.post(`${API.PAYMENT.setCreateBillRenewal}`, payload);
};

export const getPaymentStatusApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentStatus}`, payload);
};

export const getPaymentStatusv2Api = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentStatusv2}`, payload);
};

export const getPaymentEventStatusApi = (payload) => {
  return api.post(`${API.PAYMENT.getPaymentEventStatus}`, payload);
};

export const deletePaymentMethodApi = (payload) => {
  return api.put(`${API.PAYMENT.getPaymentMethod}`, payload);
};

export const orderPaymentMethodApi = (payload) => {
  return api.post(`${API.PAYMENT.orderPaymentMethod}`, payload);
};

export const getAddCardStatusApi = (payload) => {
  return api.get(
    `${API.PAYMENT.getPaymentStatus}?paymentId=${payload.paymentId}&invoiceId=${payload.invoiceId}`,
    payload
  );
};

export const getInvoiceMasterApi = () => {
  return api.get(`${API.PAYMENT.getInvoiceMaster}`);
};
