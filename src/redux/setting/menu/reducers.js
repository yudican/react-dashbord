import actions from './actions';
import { getItem } from '../../../utility/localStorageControl';

const { MENU_LOADING, MENU_SUCCESS, MENU_ERROR } = actions;

const initState = {
  loading: false,
  error: null,
  menus: getItem('menus') || [],
};

/**
 *
 * @todo impure state mutation/explaination
 */
const MenuReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case MENU_LOADING:
      return {
        ...state,
        loading: true,
      };

    case MENU_SUCCESS:
      return {
        ...state,
        menus: data,
        loading: false,
      };

    case MENU_ERROR:
      return {
        ...state,
        menus: [],
        loading: false,
      };

    default:
      return state;
  }
};
export default MenuReducer;
