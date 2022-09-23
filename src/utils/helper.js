import moment from 'moment';
import { IMAGE_TYPES } from '~/constants';

export const getFullYear = (min, max) => {
  const result = [];
  for (let index = min; index <= max; index++) {
    result.push(index);
  }
  return result;
};

export const imageValidatorHandler = (file) => {
  if (!IMAGE_TYPES.includes(file.type)) {
    return {
      code: 'invalid-type',
      message: 'Invalid type, please give (jpg, png, ...)',
    };
  }

  return null;
};

export const firebaseImageName = (file, userId = 'user1') =>
  `${userId}/${moment(new Date()).toDate().toISOString()}_${file.name}`;

export const getBannerFromContent = (content) => {
  const positionStart = content.indexOf('<img src="');
  const positionEnd = content.indexOf('">');
  return content.substring(positionStart, positionEnd).replace('<img src="', '');
};
