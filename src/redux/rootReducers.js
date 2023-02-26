import { combineReducers } from 'redux';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import menuReducer from './setting/menu/reducers';

const rootReducers = combineReducers({
  message: readMessageReducer,

  notification: readNotificationReducer,
  auth: authReducer,
  menu: menuReducer,
  ChangeLayoutMode,
});

export default rootReducers;
