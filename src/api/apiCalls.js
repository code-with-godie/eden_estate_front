import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api/v1/eden_estate`,
});

export const getData = async (url, payload, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await api.get(url, payload, config);
  return res.data;
};
export const postData = async (url, payload, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await api.post(url, payload, config);
  return res.data;
};
export const updateData = async (url, payload, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await api.patch(url, payload, config);
  return res.data;
};
export const deleteData = async (url, payload, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await api.patch(url, payload, config);
  return res.data;
};
