import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      theme="colored"
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
