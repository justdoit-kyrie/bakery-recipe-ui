import { ROUTES_PATH, ROUTES_TYPE } from '~/constants';
import { HomePage, ProfilePage } from '~/features';
import { HeaderOnlyLayout } from '~/layouts';

/**
 * @param {string} type để phân loại public với private
 * @param {string} path đường dẫn trong hệ thống
 * @param {React.Component} component component sẽ render
 * @param {React.Component} layout mặc định sẽ là DefaultLaout, nếu null sẽ không sử dụng layout, nếu có layout sẽ sử dụng layout đó
 */

const publicRoutes = [
  {
    type: ROUTES_TYPE.public,
    path: ROUTES_PATH.home,
    component: HomePage,
    layout: HeaderOnlyLayout,
  },
];

const privateRoutes = [
  {
    type: ROUTES_TYPE.private,
    path: ROUTES_PATH.profile,
    component: ProfilePage,
    layout: HeaderOnlyLayout,
  },
];
export const totalRoutes = [...privateRoutes, ...publicRoutes];
