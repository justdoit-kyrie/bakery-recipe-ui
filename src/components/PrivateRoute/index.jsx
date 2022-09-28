import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setLoading } from '~/features/Authenticate/authSlice';
import Loading from '../Loading';

const PrivateRoute = ({ children }) => {
  const { loading, userInfo } = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      dispatch(setLoading());
      // call api get profile

      setTimeout(() => {
        dispatch(setLoading(false));
        // dispatch(login({ userInfo: { id: 1 } }));
      }, 3000);
    }
  }, []);

  if (loading) return <Loading />;

  return children;
};

export default PrivateRoute;
