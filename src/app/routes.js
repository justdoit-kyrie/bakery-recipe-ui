import { NotFound as NotFoundPage } from '~/components';
import { ROUTES_PATH, ROUTES_TYPE } from '~/constants';
import { HomePage, PostDetailPage, ProfilePage, UploadPage } from '~/features';
import { DefaultLayout, HeaderOnlyLayout } from '~/layouts';

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
    layout: DefaultLayout,
  },
  {
    type: ROUTES_TYPE.public,
    path: ROUTES_PATH.profile,
    component: ProfilePage,
    layout: HeaderOnlyLayout,
  },
  {
    type: ROUTES_TYPE.public,
    path: ROUTES_PATH.upload,
    component: UploadPage,
    layout: HeaderOnlyLayout,
  },
  {
    type: ROUTES_TYPE.public,
    path: `${ROUTES_PATH.upload}/@:id`,
    component: UploadPage,
    layout: HeaderOnlyLayout,
  },
  {
    type: ROUTES_TYPE.public,
    path: ROUTES_PATH.postDetail,
    component: PostDetailPage,
    layout: HeaderOnlyLayout,
  },
  {
    type: ROUTES_TYPE.public,
    path: ROUTES_PATH.notFound,
    component: NotFoundPage,
    layout: null,
  },
];

const privateRoutes = [];
export const totalRoutes = [...privateRoutes, ...publicRoutes];
