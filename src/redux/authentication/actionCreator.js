import Cookies from 'js-cookie';
import { message } from 'antd';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';
import { loadMenu } from '../setting/menu/actionCreator';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/auth/login', values);
      if (response.data.status === 401) {
        dispatch(loginErr('Login failed!'));
        message.error('Login failed!');
      } else {
        message.success('Login successful!');
        Cookies.set('access_token', response.data.access_token);
        Cookies.set('user', JSON.stringify(response.data.user));
        Cookies.set('logedIn', true);
        dispatch(loginSuccess(true));
        dispatch(loadMenu());
        callback();
      }
    } catch (err) {
      // const { response } = err;
      dispatch(loginErr(err));
      message.error('Login failed!');
    }
  };
};

const register = (values) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/register', values);
      if (response.data.errors) {
        dispatch(loginErr('Registration failed!'));
      } else {
        dispatch(loginSuccess(false));
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      Cookies.remove('user');
      Cookies.remove('menus');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, register };
