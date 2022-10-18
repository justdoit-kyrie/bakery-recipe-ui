import _ from 'lodash';
import { Fragment, lazy } from 'react';
import React, { Route, Routes } from 'react-router-dom';

import { DefaultLayout, HeaderOnlyLayout } from '~/layouts';
import { ROLE, ROUTES_PATH, ROUTES_TYPE } from '~/constants';

const NotFoundPage = lazy(() => import('~/components/NotFound'));
const PrivateRoute = lazy(() => import('~/components/PrivateRoute'));

const PlanningPage = lazy(() => import('~/features/Planning'));
const UploadPage = lazy(() => import('~/features/Upload'));
const PostDetailPage = lazy(() => import('~/features/PostDetail'));
const CollectionsPage = lazy(() => import('~/features/Collections'));
const HomePage = lazy(() => import('~/features/Home'));

/**
 * @param {string} type để phân loại public với private
 * @param {string} path đường dẫn trong hệ thống
 * @param {React.Component} component component sẽ render
 * @param {React.Component} layout mặc định sẽ là DefaultLaout, nếu null sẽ không sử dụng layout, nếu có layout sẽ sử dụng layout đó
 */

const publicRoutes = {
  [ROLE.common]: [
    {
      type: ROUTES_TYPE.public,
      path: ROUTES_PATH.common.home,
      component: HomePage,
      layout: DefaultLayout,
    },
    {
      type: ROUTES_TYPE.public,
      path: ROUTES_PATH.common.notFound,
      component: NotFoundPage,
      layout: HeaderOnlyLayout,
    },
  ],
  [ROLE.user]: [
    {
      type: ROUTES_TYPE.public,
      path: ROUTES_PATH.user.postDetail,
      component: PostDetailPage,
      layout: HeaderOnlyLayout,
    },
    {
      type: ROUTES_TYPE.public,
      path: ROUTES_PATH.user.collections,
      component: CollectionsPage,
    },

    {
      type: ROUTES_TYPE.public,
      path: `${ROUTES_PATH.user.upload}/@:id`,
      component: UploadPage,
      layout: HeaderOnlyLayout,
    },
  ],
};

const privateRoutes = {
  [ROLE.common]: [],
  [ROLE.user]: [
    {
      type: ROUTES_TYPE.private,
      path: ROUTES_PATH.user.upload,
      component: UploadPage,
      layout: HeaderOnlyLayout,
    },
    {
      type: ROUTES_TYPE.private,
      path: ROUTES_PATH.user.planning,
      component: PlanningPage,
      layout: null,
    },
  ],
};

const ROUTES = _.mergeWith(publicRoutes, privateRoutes, (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

export const MainRouter = ({ ...passProps }) => (
  <Routes {...passProps}>
    {[...ROUTES[ROLE.user], ...ROUTES[ROLE.common]].map(
      ({ component, layout, path, type }, idx) => {
        const Page = component;
        let Layout = DefaultLayout;
        const WrapperComp = type === ROUTES_TYPE.private ? PrivateRoute : Fragment;

        if (layout === null) Layout = Fragment;
        else if (layout) Layout = layout;

        return (
          <Route
            key={idx}
            path={path}
            element={
              <WrapperComp>
                <Layout>
                  <Page />
                </Layout>
              </WrapperComp>
            }
          />
        );
      }
    )}
  </Routes>
);

export const AdminRouter = ({ ...passProps }) => (
  <Routes {...passProps}>
    {[...ROUTES[ROLE.admin], ...ROUTES[ROLE.common]].map(
      ({ component, layout, path, type }, idx) => {
        const Page = component;
        let Layout = DefaultLayout;
        const WrapperComp = type === ROUTES_TYPE.private ? PrivateRoute : Fragment;

        if (layout === null) Layout = Fragment;
        else if (layout) Layout = layout;

        return (
          <Route
            key={idx}
            path={path}
            element={
              <WrapperComp>
                <Layout>
                  <Page />
                </Layout>
              </WrapperComp>
            }
          />
        );
      }
    )}
  </Routes>
);

export const AppRoutes = [
  { subDomain: '', router: MainRouter, main: true },
  { subDomain: 'admin', router: AdminRouter, main: false },
];
