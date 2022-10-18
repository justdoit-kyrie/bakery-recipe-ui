import moment from 'moment';
import { AppRoutes } from '~/app/routes';
import { IMAGE_TYPES } from '~/constants';

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

export const getSubDomain = () => {
  const { host, hostName } = window.location;
  return host
    .split('.')
    .slice(0, host.includes(hostName) ? -1 : -2)
    .join('');
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
