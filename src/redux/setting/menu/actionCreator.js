import { message } from 'antd';
import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../../config/dataService/dataService';

const { menuLoading, menuSuccess, menuError } = actions;

const loadMenu = () => {
  return async (dispatch) => {
    dispatch(menuLoading());
    try {
      const response = await DataService.get('/user/menu');
      const { data } = response.data;
      Cookies.set('menus', JSON.stringify(data));
      dispatch(menuSuccess(data));
    } catch (err) {
      // const { response } = err;
      dispatch(menuError(err));
      message.error('Login failed!');
    }
  };
};

export { loadMenu };
