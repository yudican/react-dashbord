const actions = {
  MENU_LOADING: 'MENU_LOADING',
  MENU_SUCCESS: 'MENU_SUCCESS',
  MENU_ERROR: 'MENU_ERROR',

  menuLoading: () => {
    return {
      type: actions.MENU_LOADING,
    };
  },

  menuSuccess: (data) => {
    return {
      type: actions.MENU_SUCCESS,
      data,
    };
  },

  menuError: (err) => {
    return {
      type: actions.MENU_ERROR,
      err,
    };
  },
};

export default actions;
