//#region routes variables
export const ROUTES_TYPE = {
  public: 0,
  private: 1,
};

export const ROUTES_PATH = {
  common: {
    home: '/',
    notFound: '*',
  },
  user: {
    profile: '/profile/@:id',
    postDetail: '/post/@:id',
    upload: '/upload',
    collections: '/collections/:category',
    chat: '/chat',
  },
  admin: {
    statistic: '/statistic',
    users: '/users',
    posts: '/posts',
    categories: '/categories',
    ingredients: '/ingredients',
  },
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
export const INGREDIENTS_REGEX = /^[0-9]+\s{0,1}$/;
export const GET_IMAGE_FROM_HTML_STRING = /<img([\w\W]+?)>/g;
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
  save: 'save',
};

export const MY_POST_DISPLAY = {
  grid: 'grid',
  list: 'list',
};

export const API_PATH = {
  users: {
    login: '/users/login',
    register: '/users/register',
    sendEmail: '/users/email',
    forgotPassword: '/users/forgot',
    getProfile: '/users/getProfile',
    refresh: '/users/refresh',
    getByID: '/users/:id',
  },
  products: {
    getList: '/products',
  },
  categories: {
    getList: '/categories',
  },
  posts: {
    getList: '/posts',
    upload: '/posts',
    getDetail: '/posts/:id',
    edit: '/posts/:id',
    getByCategory: '/posts/category',
    getByStatus: '/posts/status',
    savePost: '/repost',
    getSave: '/repost/:id',
    interactive: '/interactive',
    like: '/interactive/like',
    report: '/reports',
  },
  comment: {
    post: '/comment/cmt',
  },
  reports: {
    getList: '/reports',
  },
  repost: {
    getList: '/repost/:id',
  },
};

export const API_CODE = {
  success: 200,
  fail: 202,
  tokenExp: 500,
  tokenInvalid: 501,
  wrongPath: 403,
  exception: 400,
};

export const GENDER_ENUM = ['male', 'female'];

export const ROLE = {
  common: 'common',
  user: 'user',
  admin: 'admin',
};

export const UPLOAD_STATUS_ENUM = ['inActive', 'active', 'draft'];

export const UPLOAD_STATUS = {
  inActive: 'inActive',
  active: 'active',
  draft: 'draft',
};

export const POST_MAX_LENGTH = 10;

export const INGREDIENTS_TYPE = ['KG', 'ML', 'UNIT'];

export const LOCAL_STORAGE_KEY = {
  accessToken: 'persist:auth',
};

/**
 * list of public route in the system
 * * if page type is private, when you add it to this list will not working successfully
 */
export const ROUTES_NON_BLOCK = [
  ROUTES_PATH.user.collections.replace(':category', ''),
  ROUTES_PATH.user.postDetail.replace('@:id', ''),
];

export const NO_IMAGE_URL =
  'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

export const INGREDIENTS_UNIT_TYPE = [
  {
    name: 'kg',
    value: 0,
  },
  {
    name: 'ml',
    value: 1,
  },
  {
    name: 'unit',
    value: 2,
  },
];
