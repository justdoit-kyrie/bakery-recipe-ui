import moment from 'moment';
import { AppRoutes } from '~/app/routes';
import { GET_IMAGE_FROM_HTML_STRING, IMAGE_TYPES } from '~/constants';

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
  const imageList = content.match(GET_IMAGE_FROM_HTML_STRING);

  return Array.isArray(imageList) ? imageList[0].replace('<img src="', '').replace('">', '') : '';
};

export const getAppRoutes = () => {
  const subDomain = getSubDomain();

  const main = AppRoutes.find((route) => route.main);
  if (!main) throw new Error('must have a main route');
  if (subDomain === '') return main.router;

  const app = AppRoutes.find((route) => route.subDomain === subDomain);
  if (!app) return main.router;
  return app.router;
};

export const getSubDomain = () => {
  const host = window.location.host;
  const hostName = window.location.hostname;
  return host
    .split('.')
    .slice(0, host.includes(hostName) ? -1 : -2)
    .join('');
};
