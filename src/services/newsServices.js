import { default as axios } from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';

export const getList = async (callback, params) => {
  try {
    const { code, data, ...pagination } = await axios.get(API_PATH.news.base, {
      params,
    });
    if (+code === API_CODE.success) {
      typeof callback === 'function' && callback(data, pagination);
      return { data, pagination };
    }
  } catch (error) {
    console.log({ error });
  }
};
