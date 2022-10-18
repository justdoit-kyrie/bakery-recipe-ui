import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const baseConfig = {
  storage,
  recoiler: autoMergeLevel2,
};

export const authConfig = {
  ...baseConfig,
  key: 'auth',
  whitelist: ['userInfo'],
};
