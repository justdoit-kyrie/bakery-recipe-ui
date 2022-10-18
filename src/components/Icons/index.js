import React from 'react';

export const FacebookLogo = ({ width, height }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M45 24.1283C45 12.4595 35.598 3 24 3C12.402 3 3 12.4595 3 24.1283C3 34.6739 10.6794 43.415 20.7188 45V30.2357H15.3867V24.1283H20.7188V19.4735C20.7188 14.1782 23.854 11.2533 28.6508 11.2533C30.9476 11.2533 33.3516 11.6659 33.3516 11.6659V16.8655H30.7036C28.095 16.8655 27.2812 18.4943 27.2812 20.1668V24.1283H33.1055L32.1744 30.2357H27.2812V45C37.3206 43.415 45 34.6739 45 24.1283Z"
      fill="#1877F2"
    />
  </svg>
);

export const EyesClose = ({ width, height, color, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    width={width}
    height={height}
    onClick={onClick}
  >
    <g
      stroke={color ? color : '#161823'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      opacity="0.5"
    >
      <path d="M2.8 7.8c2.1 1 4.5 1.6 7 1.6s4.9-.6 7-1.6M9.8 9.8v3M5.1 9.2l-1.5 2.6M14.6 9.2l1.5 2.6" />
    </g>
  </svg>
);

export const EyesOpen = ({ width, height, color, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    width={width}
    height={height}
    onClick={onClick}
  >
    <g
      stroke={color ? color : '#161823'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      opacity="0.5"
    >
      <path d="M9.8 4.8c3 0 5.3 1.7 7 5-1.7 3.3-4 5-7 5s-5.3-1.7-7-5c1.6-3.4 4-5 7-5z" />
      <path d="M9.8 11.8a2 2 0 100-4 2 2 0 000 4z" />
    </g>
  </svg>
);

export const BellIcon = ({ width = 70, height = 70 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 72 72"
    fill="rgba(22, 24, 35, .34)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.4961 70.3557C34.7809 70.7422 35.2335 70.971 35.7166 70.971C36.1997 70.971 36.6522 70.7422 36.937 70.3557L45.7854 58.5121H65.6332C67.6978 58.5121 69.376 56.834 69.376 54.7693V4.77091C69.376 2.70629 67.6978 1.02815 65.6332 1.02815H5.79989C3.73527 1.02815 2.05713 2.70629 2.05713 4.77091V54.7693C2.05713 56.834 3.73527 58.5121 5.79989 58.5121H25.6477L34.4961 70.3557ZM5.10829 4.77135C5.10829 4.38996 5.4185 4.07976 5.79989 4.07976H65.6281C66.0095 4.07976 66.3197 4.38996 66.3197 4.77135V54.7749C66.3197 55.1562 66.0095 55.4665 65.6281 55.4665H45.0175C44.5395 55.4665 44.0869 55.6902 43.7971 56.0767L35.7166 66.8981L27.6361 56.0767C27.3513 55.6902 26.8987 55.4614 26.4156 55.4614H5.79989C5.4185 55.4614 5.10829 55.1512 5.10829 54.7698V4.77135Z"
    />
    <path d="M49.6956 31.2955H21.7368C20.8926 31.2955 20.2112 30.6141 20.2112 29.7699C20.2112 28.9258 20.8926 28.2443 21.7368 28.2443H49.6956C50.5398 28.2443 51.2212 28.9258 51.2212 29.7699C51.2212 30.6141 50.5398 31.2955 49.6956 31.2955Z" />
  </svg>
);

export const UndoIcon = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
);

export const RedoIcon = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
);
