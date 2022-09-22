import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ModalContext } from '~/app/context';
import { login, selectAuth, setLoading } from '~/features/Authenticate/authSlice';
import Loading from '../Loading';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, userInfo } = useSelector(selectAuth);
  const { onOpen } = useContext(ModalContext);
  const dispatch = useDispatch();

  console.log({ location });

  useEffect(() => {
    dispatch(setLoading());
    // call api get profile

    setTimeout(() => {
      dispatch(login({ userInfo: { id: 1 } }));
    }, 3000);
  }, []);

  if (loading) return <Loading />;

  if (!userInfo) {
    onOpen();
    return <Navigate to={location.state.from} state={{ from: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
