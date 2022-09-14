//#region routes variables
export const ROUTES_TYPE = {
  public: 0,
  private: 1,
};

export const ROUTES_PATH = {
  home: '/',
  profile: '/profile/:id',
};
//#endregion

//#region routes variables
export const AUTHENTICATE_FORM_TYPE = {
  login: 'login',
  register: 'register',
  getInfo: 'getInfo',
};

export const OTHERS_LOGIN = {
  google: 'google',
  facebook: 'facebook',
};

export const OTHERS_LOGIN_ERROR_CODE = {
  popup_close: 'auth/popup-closed-by-user',
};
//#endregion

//#region color mode variables
export const COLOR_MODE_TYPE = {
  code: 'color',
  dark: 'dark',
  light: 'light',
};
//#endregion

//#region language variables
export const LANGUAGES = {
  code: 'language',
  English: 'en',
  ['Tiếng Việt (Việt Nam)']: 'vi',
};
//#endregion

//#region regex
export const PASSWORD_REGEX_FULL =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const PASSWORD_REGEX_WITHOUT_LENGTH =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].*$/;
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
//#endregion

//#region regex
export const DOB_DAY = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31,
];
export const DOB_MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const DOB_YEAR = [1900, new Date().getFullYear() - 1];
//#endregion
