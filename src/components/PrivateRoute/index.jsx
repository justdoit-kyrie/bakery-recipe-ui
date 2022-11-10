import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { ModalContext } from '~/app/context';
import { API_CODE, API_PATH, ROUTES_PATH } from '~/constants';
import { failed, selectAuth, setUserInfo } from '~/features/Authenticate/authSlice';
import Loading from '../Loading';

const PrivateRoute = ({ children }) => {
  const { loading, refreshToken } = useSelector(selectAuth);
  const { onOpen } = useContext(ModalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (!refreshToken && location.pathname === ROUTES_PATH.common.home) {
        dispatch(failed());
        return;
      }

      if (!refreshToken && location.pathname !== ROUTES_PATH.common.home) {
        onOpen();
        return navigate(ROUTES_PATH.common.home, {
          state: { from: '/privateRoute', to: location.pathname },
        });
      }

      (async () => {
        const { code, message, data } = await axiosInstance.post(API_PATH.users.getProfile, {
          refreshToken,
        });

        if (+code === API_CODE.success) {
          dispatch(setUserInfo(data));
          return;
        } else {
          toast.error(message);
        }

        onOpen();
        dispatch(failed());
        return navigate(ROUTES_PATH.common.home, {
          state: { from: '/privateRoute', to: location.pathname },
        });
      })();
    } catch (error) {
      console.log({ error });
    } finally {
      dispatch(failed());
    }
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default PrivateRoute;
