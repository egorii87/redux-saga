const initialState = {
  url: '',
  loading: false,
  error: false,
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_TABLE':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_TABLE_SUCCEEDED':
      return {
        url: action.dataTable,
        loading: false,
        error: false,
      };
    case 'REQUESTED_TABLE_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
