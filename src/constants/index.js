//#region routes variables
export const ROUTES_TYPE = {
  public: 0,
  private: 1,
};

export const ROUTES_PATH = {
  home: '/',
  profile: '/profile/@:id',
  postDetail: '/post/@:id',
  upload: '/upload',
  notFound: '*',
  collections: '/collections/:category',
};
//#endregion

//#region variables
export const AUTHENTICATE_FORM_TYPE = {
  login: 'login',
  register: 'register',
  getInfo: 'get_info',
  forgotPassword: 'forgot_password',
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

export const LOGOUT_TYPE = 'logoout';

//#region regex
export const PASSWORD_REGEX_FULL =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const PASSWORD_REGEX_WITHOUT_LENGTH =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].*$/;
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const INGREDIENTS_REGEX = /^[0-9]+\s{0,1}(g|kg|ml|l|mg)$/;
//#endregion

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

export const CODE_GMAIL_LENGTH = 6;

export const CONTENT_POST_LENGTH = 250;

export const IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/tiff'];

export const FIREBASE_ERR_CODE = {
  storage: {
    objectNotFound: 'storage/object-not-found',
    userCanceled: 'storage/canceled',
  },
};

export const EDITOR_EMPTY_STRING = '<p><br></p>';

export const FORM_TYPE = {
  add: 'add',
  edit: 'edit',
};

export const SELECT_TYPE = {
  single: 'dropdown',
  multi: 'multiSelect',
  autoCompleted: 'autoCompleted',
};

export const MY_POST_TYPE = {
  recent: 'recent',
  draft: 'draft',
};

export const MY_POST_DISPLAY = {
  grid: 'grid',
  list: 'list',
};

export const API_PATH = {
  users: {
    login: '/Users/login',
    register: '/Users/register',
    sendEmail: '/Users/email',
    forgotPassword: '/Users/forgot',
  },
};

export const API_CODE = {
  success: 200,
  tokenExp: 500,
  tokenInvalid: 501,
  wrongPath: 403,
  exception: 400,
};
