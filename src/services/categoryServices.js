import { default as axios } from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';

export const getList = async (params) => {
  try {
    const { code, data } = await axios.get(API_PATH.categories.getList, {
      params,
    });
    if (+code === API_CODE.success) {
      return data;
    }
  } catch (error) {
    console.log({ error });
  }
};
