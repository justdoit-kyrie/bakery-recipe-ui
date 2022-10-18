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
  const { userInfo, loading } = useSelector(selectAuth);
  const { onOpen } = useContext(ModalContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (!userInfo && location.pathname === ROUTES_PATH.common.home) {
        dispatch(failed());
        return;
      }

      if (!userInfo && location.pathname !== ROUTES_PATH.common.home) {
        onOpen();
        return navigate(ROUTES_PATH.common.home, {
          state: { from: '/privateRoute', to: location.pathname },
        });
      }

      (async () => {
        const { code, message, data } = await axiosInstance.get(
          API_PATH.auth.getProfile.replace(':id', userInfo.id)
        );

        if (+code === API_CODE.success) {
          dispatch(setUserInfo(data));
          return;
        }

        toast.error(message);
        onOpen();
        dispatch(failed());
        return navigate(ROUTES_PATH.common.home, {
          state: { from: '/privateRoute', to: location.pathname },
        });
      })();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default PrivateRoute;
