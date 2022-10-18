import { toast } from 'react-toastify';
import { default as axios } from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';

export const login = async (callback, bodyData) => {
  try {
    const { code, data, message } = await axios.post(API_PATH.auth.login, bodyData);
    if (+code === API_CODE.success) {
      typeof callback === 'function' && callback(data);
      return data;
    }
    toast.error(message);
  } catch (error) {
    console.log({ error });
  }
};

export const register = async (callback, bodyData) => {
  try {
    const { code, data, message } = await axios.post(API_PATH.auth.register, bodyData);
    if (+code === API_CODE.success) {
      typeof callback === 'function' && callback(data);
      return data;
    }
    toast.error(message);
  } catch (error) {
    console.log({ error });
  }
};
