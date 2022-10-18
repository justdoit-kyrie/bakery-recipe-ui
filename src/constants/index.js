// #region routes variables
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
    planning: '/planning',
    reviewing: '/reviewing',
    reviewingDetail: '/reviewing/:id',
  },
};
// #endregion

// #region variables
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
// #endregion

// #region color mode variables
export const COLOR_MODE_TYPE = {
  code: 'color',
  dark: 'dark',
  light: 'light',
};
// #endregion

// #region language variables
export const LANGUAGES = {
  code: 'language',
  English: 'en',
  ['Tiếng Việt (Việt Nam)']: 'vi',
};
// #endregion

export const LOGOUT_TYPE = 'logoout';

// #region regex
export const PASSWORD_REGEX_FULL =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
export const PASSWORD_REGEX_WITHOUT_LENGTH =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].*$/;
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const INGREDIENTS_REGEX = /^[0-9]+\s{0,1}$/;
export const PHONE_REGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{3,4})(?: *x(\d+))?\s*$/;
// #endregion

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

export const API_PATH = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot',
    getProfile: '/auth/:id',
  },
  users: {
    sendEmail: '/users/email',
    getProfile: '/users/getProfile',
  },
  products: {
    getList: '/products',
  },
  categories: {
    base: '/categories',
  },
  posts: {
    getList: '/posts',
    upload: '/posts',
    getDetail: '/posts/:id',
    edit: '/posts/:id',
    getByCategory: '/posts/category',
    savePost: '/repost',
    getSave: '/repost/:id',
    interactive: '/interactive',
    like: '/interactive/like',
    report: '/reports',
  },
  comment: {
    post: '/comment/cmt',
  },
  reviews: {
    base: '/reviews',
    byCategory: '/reviews/categories',
  },
  news: {
    base: '/news',
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
};

export const UPLOAD_STATUS_ENUM = ['inActive', 'active', 'draft'];

export const UPLOAD_STATUS = {
  inActive: 'inActive',
  active: 'active',
  draft: 'draft',
};

export const POST_MAX_LENGTH = 10;

export const INGREDIENTS_TYPE = ['KG', 'ML', 'UNIT'];

export const HOME_FEATURES = {
  news: 'news',
  reviewing: 'reviewing',
};

export const NO_IMAGE_URL =
  'https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=';

/**
 * list of public route in the system
 * * if page is private, when you add it to this list will not working successfully
 */
export const ROUTES_NON_BLOCK = [
  ROUTES_PATH.user.collections.replace(':category', ''),
  ROUTES_PATH.user.reviewing,
];
